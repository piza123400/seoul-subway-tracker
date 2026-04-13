# API 문서

서울 지하철 트래커 백엔드 API 명세서입니다.

## 기본 정보

- **기본 URL**: `http://localhost:3000`
- **응답 형식**: JSON
- **인코딩**: UTF-8

---

## 엔드포인트

### 역 목록 조회

```
GET /api/stations
```

**설명**: 전체 역 목록을 조회합니다. 쿼리 파라미터로 필터링 가능합니다.

**쿼리 파라미터**:

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| line | string | 호선 ID로 필터링 (예: `1001`) |
| name | string | 역명으로 검색 (예: `강남`) |

**응답 예시**:

```json
{
  "success": true,
  "data": [
    {
      "station_id": "1001000133",
      "station_name": "강남",
      "subway_id": "1002",
      "line_name": "2호선"
    }
  ]
}
```

---

### 시뮬레이션 도착정보

```
GET /api/subway
```

**설명**: 역 데이터를 기반으로 시뮬레이션된 도착정보를 반환합니다.

**쿼리 파라미터**:

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| lineId | string | 호선 ID로 필터링 |
| station | string | 역명으로 필터링 |

**응답 예시**:

```json
{
  "success": true,
  "data": [
    {
      "trainNo": "1002K123",
      "subwayId": "1002",
      "statnId": "1001000133",
      "statnNm": "강남",
      "lineName": "2호선",
      "barvlDt": "120",
      "updnLine": "상행"
    }
  ]
}
```

---

### 실시간 도착정보

```
GET /api/realtime
```

**설명**: 서울 공개데이터 API에서 가져온 실시간 지하철 도착정보입니다.

> ⚠️ 이 엔드포인트를 사용하려면 `SEOUL_API_KEY` 환경 변수를 설정해야 합니다.

**쿼리 파라미터**:

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| limit | number | 100 | 반환할 최대 개수 (최대 100) |

**응답 예시**:

```json
{
  "success": true,
  "data": [
    {
      "subwayId": "1008",
      "statnNm": "별내",
      "trainLineNm": "별내행 - 별내방면",
      "barvlDt": "0",
      "updnLine": "상행",
      "arvlMsg2": "별내 출발",
      "arvlMsg3": "별내",
      "btrainNo": "8312",
      "recptnDt": "2026-04-14 23:58:27"
    }
  ]
}
```

**응답 필드 설명**:

| 필드 | 타입 | 설명 |
|------|------|------|
| subwayId | string | 지하철 호선 ID |
| statnNm | string | 지하철 역명 |
| trainLineNm | string | 도착지방면 |
| barvlDt | string | 열차 도착까지 시간 (초) |
| updnLine | string | 상행/하행 구분 |
| arvlMsg2 | string | 첫번째 도착 메시지 |
| arvlMsg3 | string | 두번째 도착 메시지 |
| btrainNo | string | 열차번호 |
| recptnDt | string | 정보 수신 시각 |

**에러 응답 예시**:

```json
{
  "success": false,
  "message": "API 키가 설정되지 않았습니다"
}
```

---

### 서버 상태 확인

```
GET /health
```

**설명**: 서버 상태를 확인합니다.

**응답 예시**:

```json
{
  "status": "ok"
}
```

---

## 에러 코드

| HTTP 상태 | 메시지 | 원인 |
|-----------|--------|------|
| 500 | API 키가 설정되지 않았습니다 | `SEOUL_API_KEY` 미설정 |
| 500 | 실시간 도착정보를 불러올 수 없습니다 | 네트워크 오류 |
| 500 | 서울 공개데이터 API 오류가 발생했습니다 | API 서버 오류 |
| 500 | 데이터 파싱 오류가 발생했습니다 | XML 파싱 실패 |
| 500 | 서버 내부 오류가 발생했습니다 | 기타 서버 오류 |
