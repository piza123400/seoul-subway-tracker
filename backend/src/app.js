'use strict';

const express = require('express');
const cors = require('cors');
const stationService = require('./services/stationService');
const realTimeService = require('./services/realTimeService');

const app = express();

// CORS 설정 – 프론트엔드 주소 허용
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8000'
}));
app.use(express.json());

// GET /api/stations
// 쿼리 파라미터:
//   ?line=1001  – 호선 ID로 필터링
//   ?name=강남  – 역명으로 검색 (한글)
app.get('/api/stations', (req, res) => {
  try {
    const { line, name } = req.query;

    if (line) {
      return res.json({ success: true, data: stationService.getByLine(line) });
    }
    if (name) {
      return res.json({ success: true, data: stationService.getByName(name) });
    }
    return res.json({ success: true, data: stationService.getAll() });
  } catch (err) {
    console.error('/api/stations 오류:', err);
    return res.status(500).json({ success: false, message: '서버 내부 오류가 발생했습니다' });
  }
});

// GET /api/subway
// 역 목록을 기반으로 시뮬레이션된 도착 데이터 반환
// 쿼리 파라미터:
//   ?lineId=1001  – 호선 ID로 필터링
//   ?station=강남 – 역명으로 필터링
app.get('/api/subway', (req, res) => {
  try {
    const { lineId, station } = req.query;

    let stations;
    if (lineId) {
      stations = stationService.getByLine(lineId);
    } else if (station) {
      stations = stationService.getByName(station);
    } else {
      stations = stationService.getAll();
    }

    const data = stations.map(s => ({
      trainNo: `${s.subway_id}K${Math.floor(Math.random() * 900) + 100}`,
      subwayId: s.subway_id,
      statnId: s.station_id,
      statnNm: s.station_name,
      lineName: s.line_name,
      barvlDt: String(Math.floor(Math.random() * 180) + 30),
      updnLine: Math.random() > 0.5 ? '상행' : '하행'
    }));

    return res.json({ success: true, data });
  } catch (err) {
    console.error('/api/subway 오류:', err);
    return res.status(500).json({ success: false, message: '서버 내부 오류가 발생했습니다' });
  }
});

// GET /api/realtime
// 서울 공개데이터 API에서 실시간 지하철 도착정보 조회
// 쿼리 파라미터:
//   ?limit=50 – 반환할 최대 개수 (기본값: 100)
app.get('/api/realtime', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 100);
    const data = await realTimeService.getRealtimeArrivals(1, limit);
    return res.json({ success: true, data });
  } catch (err) {
    console.error('/api/realtime 오류:', err.message);
    return res.status(500).json({ success: false, message: err.message || '실시간 도착정보를 불러올 수 없습니다' });
  }
});

// 헬스 체크
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
