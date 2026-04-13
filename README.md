# 서울 지하철 트래커 🚇

서울 지하철 노선 및 실시간 도착정보를 제공하는 웹 애플리케이션입니다.

## 주요 기능

- **노선 개요** – 서울 주요 9개 노선을 공식 색상으로 표시
- **인터랙티브 노선도** – 역 노드 클릭 시 상세 정보 표시
- **역 검색** – 자동완성 기능을 포함한 즉시 검색
- **환승역 표시** – 환승역은 주황색 링으로 강조 표시
- **인접 역 정보** – 각 역 카드에서 인접 역으로 이동 가능
- **노선 필터** – 개별 노선을 켜고 끄기 가능
- **실시간 도착정보** – 서울 공개데이터 API를 통한 실시간 정보 (3초 갱신)

## 프로젝트 구조

```
seoul-subway-tracker/
├── index.html          # 애플리케이션 메인 화면
├── style.css           # 스타일시트 (Noto Sans KR 폰트 포함)
├── app.js              # 역/노선 데이터 및 UI 로직
├── README.md           # 프로젝트 설명서
└── backend/
    ├── src/
    │   ├── server.js               # Express 서버 진입점
    │   ├── app.js                  # API 라우터
    │   └── services/
    │       ├── stationService.js   # 역 데이터 서비스
    │       └── realTimeService.js  # 실시간 도착정보 서비스
    ├── data/
    │   └── stations.json           # 역 데이터
    ├── .env.example                # 환경 변수 예시
    └── package.json
```

## 설치 및 실행

### 프론트엔드 (정적 파일)

```bash
# 브라우저에서 바로 열기
open index.html

# 또는 간단한 HTTP 서버 실행
python -m http.server 8000
```

### 백엔드 서버

```bash
cd backend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 SEOUL_API_KEY 입력

# 서버 시작
npm start
```

## 🎯 실시간 도착정보 API

서울 공개데이터에서 제공하는 실시간 지하철 도착정보를 사용합니다.

### API 설정

1. https://data.seoul.go.kr/ 에서 API 키 발급
2. `backend/.env` 파일에 `SEOUL_API_KEY` 추가
3. 서버 재시작
4. `/api/realtime` 엔드포인트 사용 가능

### 사용 예시

```bash
curl http://localhost:3000/api/realtime?limit=50
```

응답: 실시간 도착정보 JSON

## 데이터 필드 설명

| 필드 | 설명 |
|------|------|
| subwayId | 지하철 호선 ID |
| statnNm | 지하철 역명 |
| trainLineNm | 도착지방면 |
| barvlDt | 열차 도착까지 시간 (초) |
| updnLine | 상행/하행 구분 |
| arvlMsg2 | 첫번째 도착 메시지 |
| arvlMsg3 | 두번째 도착 메시지 |
| btrainNo | 열차번호 |
| recptnDt | 정보 수신 시각 |

## 환경 변수

| 변수 | 설명 | 기본값 |
|------|------|--------|
| SEOUL_API_KEY | 서울 공개데이터 API 키 | – |
| PORT | 서버 포트 | 3000 |
| NODE_ENV | 실행 환경 | development |
| CORS_ORIGIN | 허용할 프론트엔드 주소 | http://localhost:8000 |

## API 엔드포인트

| 엔드포인트 | 설명 |
|-----------|------|
| GET /api/stations | 전체 역 목록 조회 |
| GET /api/stations?line=1001 | 호선별 역 조회 |
| GET /api/stations?name=강남 | 역명 검색 |
| GET /api/subway | 시뮬레이션 도착정보 |
| GET /api/realtime | 실시간 도착정보 (최대 100개) |
| GET /api/realtime?limit=50 | 실시간 도착정보 (개수 지정) |
| GET /health | 서버 상태 확인 |

## 에러 처리

모든 에러는 한글로 처리됩니다:
- `"API 키가 설정되지 않았습니다"` – API 키 미설정 시
- `"실시간 도착정보를 불러올 수 없습니다"` – 네트워크 오류 시
- `"서울 공개데이터 API 오류가 발생했습니다"` – API 서버 오류 시
- `"데이터 파싱 오류가 발생했습니다"` – XML 파싱 실패 시

## 데이터

역 목록은 `backend/data/stations.json`에 저장되어 있으며, 서울 지하철 1~9호선을 포함합니다.

