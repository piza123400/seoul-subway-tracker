'use strict';

const express = require('express');
const cors = require('cors');
const stationService = require('./services/stationService');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8000'
}));
app.use(express.json());

// GET /api/stations
// Query params:
//   ?line=1001   – filter by subway_id
//   ?name=강남   – search by station name (Korean)
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
    console.error('Error in /api/stations:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/subway
// Returns a sampled list of stations as simulated arrival data.
// Query params:
//   ?lineId=1001  – filter by subway_id
//   ?station=강남 – filter by station name
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
    console.error('Error in /api/subway:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
