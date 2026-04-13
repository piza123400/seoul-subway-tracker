'use strict';

// 환경 변수 로드
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
