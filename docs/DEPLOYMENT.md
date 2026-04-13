# 배포 가이드

서울 지하철 트래커 배포 방법을 설명합니다.

## 사전 요구사항

- Node.js 18 이상
- npm 9 이상
- 서울 공개데이터 API 키 (https://data.seoul.go.kr/)

---

## 로컬 개발 환경

### 1. 저장소 클론

```bash
git clone https://github.com/piza123400/seoul-subway-tracker.git
cd seoul-subway-tracker
```

### 2. 백엔드 설정

```bash
cd backend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
```

`.env` 파일을 열어 API 키를 입력합니다:

```env
SEOUL_API_KEY=여기에_API_키_입력
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8000
```

### 3. 백엔드 서버 실행

```bash
# 백엔드 디렉토리에서
npm start

# 또는 개발 모드 (자동 재시작)
npm run dev
```

서버가 `http://localhost:3000` 에서 시작됩니다.

### 4. 프론트엔드 실행

별도의 HTTP 서버를 사용합니다:

```bash
# 프로젝트 루트 디렉토리에서
python -m http.server 8000

# 또는 Node.js를 사용하는 경우
npx serve . -p 8000
```

브라우저에서 `http://localhost:8000` 을 열면 됩니다.

---

## API 키 발급 방법

1. [서울 열린데이터 광장](https://data.seoul.go.kr/) 접속
2. 회원가입 및 로그인
3. **지하철 실시간 도착정보** API 검색
4. **인증키 신청** 클릭
5. 발급된 키를 `backend/.env` 파일의 `SEOUL_API_KEY`에 입력

---

## 서버 상태 확인

```bash
curl http://localhost:3000/health
# 응답: {"status":"ok"}

curl http://localhost:3000/api/realtime?limit=5
# 응답: 실시간 도착정보 JSON
```

---

## 운영 환경 배포

### 환경 변수 설정

운영 환경에서는 다음 환경 변수를 설정합니다:

```env
SEOUL_API_KEY=실제_API_키
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### PM2를 이용한 백엔드 실행

```bash
npm install -g pm2

cd backend
pm2 start src/server.js --name seoul-subway-backend
pm2 save
pm2 startup
```

### Nginx 프록시 설정 예시

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 프론트엔드 정적 파일
    location / {
        root /var/www/seoul-subway-tracker;
        index index.html;
    }

    # 백엔드 API 프록시
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 문제 해결

### API 키 오류

```
오류: API 키가 설정되지 않았습니다
```

→ `backend/.env` 파일에 `SEOUL_API_KEY`가 올바르게 설정되어 있는지 확인하세요.

### CORS 오류

```
Access to fetch at 'http://localhost:3000' from origin 'http://localhost:8000' has been blocked
```

→ `backend/.env` 파일의 `CORS_ORIGIN` 값이 프론트엔드 주소와 일치하는지 확인하세요.

### 실시간 데이터 없음

서울 지하철 운행 시간(05:00~24:00) 이외에는 실시간 데이터가 없을 수 있습니다.
