'use strict';

const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../../data/stations.json');
const stations = JSON.parse(fs.readFileSync(filePath, 'utf8')).stations;

function getAll() {
  return stations;
}

function getByLine(subwayId) {
  return stations.filter(s => s.subway_id === String(subwayId));
}

function getByName(name) {
  const query = name.trim();
  return stations.filter(s => s.station_name.includes(query));
}

module.exports = { getAll, getByLine, getByName };
