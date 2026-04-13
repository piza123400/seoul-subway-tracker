'use strict';

// 서울 공개데이터 API를 통해 실시간 지하철 도착정보를 조회하는 서비스
const fetch = require('node-fetch');
const xml2js = require('xml2js');

// 서울 공개데이터 실시간 도착정보 API 기본 URL
const BASE_URL = 'http://swopenAPI.seoul.go.kr/api/subway';

/**
 * 서울 공개데이터 API에서 실시간 지하철 도착정보를 조회합니다.
 * @param {number} start - 조회 시작 인덱스
 * @param {number} end - 조회 종료 인덱스
 * @returns {Promise<Array>} 실시간 도착정보 배열
 */
async function getRealtimeArrivals(start = 1, end = 100) {
  const apiKey = process.env.SEOUL_API_KEY;

  // API 키 미설정 시 에러 처리
  if (!apiKey || apiKey === 'YOUR_SEOUL_SUBWAY_API_KEY' || apiKey === 'YOUR_API_KEY_HERE') {
    throw new Error('API 키가 설정되지 않았습니다');
  }

  const url = `${BASE_URL}/${apiKey}/xml/realtimeStationArrival/ALL/${start}/${end}`;

  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error('서울 공개데이터 API 요청 실패:', err.message);
    throw new Error('실시간 도착정보를 불러올 수 없습니다');
  }

  if (!response.ok) {
    console.error('서울 공개데이터 API 응답 오류:', response.status, response.statusText);
    throw new Error('서울 공개데이터 API 오류가 발생했습니다');
  }

  const xmlText = await response.text();

  let parsed;
  try {
    parsed = await xml2js.parseStringPromise(xmlText, { explicitArray: false });
  } catch (err) {
    console.error('XML 파싱 오류:', err.message);
    throw new Error('데이터 파싱 오류가 발생했습니다');
  }

  // 응답 구조 검증
  const root = parsed && parsed.realtimeStationArrival;
  if (!root) {
    throw new Error('데이터 파싱 오류가 발생했습니다');
  }

  // API 레벨 에러코드 확인
  if (root.RESULT && root.RESULT.CODE !== 'INFO-000') {
    const msg = (root.RESULT && root.RESULT.MESSAGE) || '서울 공개데이터 API 오류가 발생했습니다';
    throw new Error(msg);
  }

  // 도착정보 행 정규화 (단일 항목도 배열로 처리)
  const rows = root.row ? (Array.isArray(root.row) ? root.row : [root.row]) : [];

  // 필요한 필드만 추출하여 반환
  return rows.map(row => ({
    subwayId: row.subwayId || '',
    statnNm: row.statnNm || '',
    trainLineNm: row.trainLineNm || '',
    barvlDt: row.barvlDt || '',
    updnLine: row.updnLine || '',
    arvlMsg2: row.arvlMsg2 || '',
    arvlMsg3: row.arvlMsg3 || '',
    btrainNo: row.btrainNo || '',
    recptnDt: row.recptnDt || ''
  }));
}

module.exports = { getRealtimeArrivals };
