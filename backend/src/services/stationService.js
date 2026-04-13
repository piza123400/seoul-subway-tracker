'use strict';

// 역 데이터 파일 로드
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../../data/stations.json');
const stations = JSON.parse(fs.readFileSync(filePath, 'utf8')).stations;

// 전체 역 목록 반환
function getAll() {
  return stations;
}

// 호선 ID로 역 필터링
function getByLine(subwayId) {
  return stations.filter(s => s.subway_id === String(subwayId));
}

// 역명으로 검색 (부분 일치)
function getByName(name) {
  const query = name.trim();
  return stations.filter(s => s.station_name.includes(query));
}

module.exports = { getAll, getByLine, getByName };
