/**
 * 서울 지하철 트래커 – app.js
 * 지하철 노선/역 데이터 및 모든 UI 로직을 포함합니다.
 */

// ── 데이터 ────────────────────────────────────────────────────────────────────

const LINES = [
  {
    id: 'line1',
    name: '1호선',
    color: '#0052A4',
    stations: [
      'Soyosan', 'Dongducheon', 'Bosan', 'Dongducheon-Jungangno',
      'Jihaeng', 'Deokhye', 'Deokjeong', 'Yangju', 'Nokyang', 'Uijeongbu',
      'Hoeryong', 'Uijeongbu-Bukbu', 'Seongbuk', 'Dobongsan', 'Mangwol',
      'Dobong', 'Banghak', 'Kwangwoon University', 'Cheongnyangni',
      'Hoegi', 'Sinimun', 'Jegi-dong', 'Dongmyo', 'Sindang', 'City Hall',
      'Seoul Station', 'Namyeong', 'Yongsan', 'Noryangjin', 'Daebang',
      'Sindorim', 'Guro', 'Geumcheon-gu Office', 'Seoksu', 'Gwangmyeong',
      'Suwon', 'Pyeongtaek', 'Asan', 'Cheonan'
    ]
  },
  {
    id: 'line2',
    name: '2호선',
    color: '#00A84D',
    stations: [
      'Siheung', 'Sindorim', 'Mullae', 'Yeongdeungpo-gu Office',
      'Dangsan', 'Hapjeong', 'Hongik University', 'Sinchon', 'Ewha Womans University',
      'Edae-ap', 'Ahyeon', 'Chungjeongno', 'City Hall', 'Euljiro 1-ga',
      'Euljiro 3-ga', 'Euljiro 4-ga', 'Dongdaemun History & Culture Park',
      'Sindang', 'Sangwangsimni', 'Wangsimni', 'Seongsu', 'Konkuk University',
      'Guui', 'Gangbyeon', 'Jamsil-naru', 'Jamsil', 'Jamsil-saenae',
      'Sports Complex', 'Samseong', 'Yeoksam', 'Gangnam', 'Yangjae',
      'Yangjae Citizen\'s Forest', 'Seocho', 'Express Bus Terminal',
      'Bangbae', 'Sadang', 'Nakseongdae', 'Seoul National University',
      'Bongcheon', 'Sillim', 'Sindaebang', 'Guro Digital Complex'
    ]
  },
  {
    id: 'line3',
    name: '3호선',
    color: '#EF7C1C',
    stations: [
      'Daehwa', 'Juyeop', 'Jeongbalsan', 'Madu', 'Hwajeong', 'Wonheung',
      'Neunggok', 'Sinwon', 'Gupabal', 'Yeonsinnae', 'Bulgwang', 'Eungam',
      'Nokbeon', 'Jeungsan', 'Mapo', 'Ahyeon', 'Dongnimmun', 'Gyeongbokgung', 'Anguk',
      'Jongno 3-ga', 'Euljiro 3-ga', 'Chungmuro', 'Dongdaemun History & Culture Park',
      'Yaksu', 'Apgujeong', 'Sinsa', 'Jamwon',
      'Express Bus Terminal', 'Nambu Bus Terminal', 'Yangjae', 'Maehon',
      'Yangjae Citizen\'s Forest', 'Ogeum', 'Bokjeong', 'Suseo', 'Garak Market',
      'Ga-cheong', 'Chunghyeon'
    ]
  },
  {
    id: 'line4',
    name: '4호선',
    color: '#00A5DE',
    stations: [
      'Danggogae', 'Dobongsan', 'Ssangmun', 'Suyu', 'Mia', 'Miasageori',
      'Gireum', 'Sungsin Women\'s University', 'Hansung University',
      'Hyehwa', 'Dongdaemun', 'Dongdaemun History & Culture Park',
      'Chungmuro', 'Myeongdong', 'Hoehyeon', 'Seoul Station',
      'Sookmyung Women\'s University', 'Samgakji', 'Ichon',
      'Dongjak', 'Chongshin University', 'Sadeung', 'Namtaeryeong',
      'Seonbawi', 'Yangjae', 'Sadang', 'Namhansanseong', 'Sanbon',
      'Sudo', 'Ansan', 'Oido'
    ]
  },
  {
    id: 'line5',
    name: '5호선',
    color: '#996CAC',
    stations: [
      'Banghwa', 'Gonghang Market', 'Sinbanghwa', 'Magok', 'Balhyeon',
      'Hwagok', 'Ujangsan', 'Banghak', 'Omokgyo', 'Yangcheon-gu Office',
      'Sinjeong', 'Mokdong', 'Kkachisan', 'Yeongdeungpo-gu Office',
      'Yeongdeungpo Market', 'Yeouido', 'Yeouinaru', 'Mapo', 'Gongdeok',
      'Aerogil', 'Chungjeongno', 'Seodaemun', 'Gwanghwamun', 'Jonggak',
      'Jongno 3-ga', 'Euljiro 4-ga', 'Dongdaemun History & Culture Park',
      'Cheonggu', 'Sindang', 'Majang', 'Wangsimni', 'Haengdang',
      'Dapsimni', 'Yongdap', 'Gwangnaru', 'Achasan', 'Children\'s Grand Park',
      'Gunja', 'Amsa', 'Macheon', 'Bangi', 'Ojangdong', 'Gangdong-gu Office',
      'Cheonho', 'Gangdong', 'Gildong', 'Gungnaeri'
    ]
  },
  {
    id: 'line6',
    name: '6호선',
    color: '#CD7C2F',
    stations: [
      'Eungam', 'Bulgwang', 'Yeonsinnae', 'Gusan', 'Sinjeong', 'Mapo-gu Office',
      'Mangwon', 'Hapjeong', 'Sangsu', 'Gwanghungchang', 'Daeheung',
      'Gongdeok', 'Hyochang Park', 'Samgakji', 'Noksapyeong', 'Itaewon',
      'Hangang-jin', 'Cheongdam', 'Sinnonhyeon',
      'Nonhyeon', 'Beotigogae', 'Digital Media City',
      'Dokbawi', 'Seokgye', 'Nangok', 'Achasan', 'Guui'
    ]
  },
  {
    id: 'line7',
    name: '7호선',
    color: '#747F00',
    stations: [
      'Jangsam', 'Gwanaksan', 'Cheolsan', 'Gwangmyeongsageori',
      'Onsu', 'Cheonwang', 'Chunaap', 'Dobong-gu', 'Nowon',
      'Hagye', 'Junggye', 'Gongreung', 'Taereung', 'Meokgol', 'Yongma',
      'Sangbong', 'Myeongil', 'Gunnae', 'Children\'s Grand Park',
      'Konkuk University', 'Ttukseom Resort', 'Cheongdam', 'Gangnam-gu Office',
      'Hak-dong', 'Nonhyeon', 'Express Bus Terminal', 'Naebang',
      'Bangbae', 'Isu', 'Sindaebang-samgeori', 'Boramae', 'Sinpung',
      'Daerim', 'Gasan Digital Complex', 'Gwangmyeong-sageori', 'Gwangmyeong'
    ]
  },
  {
    id: 'line8',
    name: '8호선',
    color: '#E51C23',
    stations: [
      'Amsa', 'Mongchontoseong', 'Ogeum', 'Garak Market', 'Munjeong',
      'Jamsil', 'Sports Complex', 'Seokchon Lake', 'Seokchon',
      'Song-pa', 'Macheon', 'Moran', 'Sanghyeon',
      'Doan', 'Sujin', 'Bokjeong', 'Namhansanseong', 'Sanseong'
    ]
  },
  {
    id: 'line9',
    name: '9호선',
    color: '#BDB427',
    stations: [
      'Gaehwa', 'Gimpo Intl Airport', 'Sinbanghwa', 'Yangcheon Hyanggyo',
      'Gayang', 'Jeungmi', 'Deungchon', 'Yeomchang', 'Banghwa',
      'Yangcheon Sageori', 'Susaek', 'Gimpo Airport Station',
      'Heohyeon', 'Kkachisan', 'Seonyu Island', 'Dangsan', 'Guuido',
      'Hanshin University', 'National Assembly', 'Yeouido',
      'Saetgang', 'Noryangjin', 'Nodeul', 'Heukseok', 'Dongjak',
      'Express Bus Terminal', 'Sinnonhyeon', 'Eonchungno', 'Samseong (COEX)',
      'Bongeunsa', 'Sports Complex', 'Samjeon', 'Maehon', 'Bogae',
      'Dunchon Ogeori', 'Hanjeon', 'Gangdong'
    ]
  }
];

// 역명 -> 노선 목록 매핑 테이블 생성
const stationLineMap = {};
LINES.forEach(line => {
  line.stations.forEach(station => {
    if (!stationLineMap[station]) stationLineMap[station] = [];
    stationLineMap[station].push(line);
  });
});

// 환승역 (2개 이상 노선 운행)
const transferStations = new Set(
  Object.entries(stationLineMap)
    .filter(([, lines]) => lines.length > 1)
    .map(([name]) => name)
);

function escapeAttr(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
function escapeText(s) { return s.replace(/&/g, '&amp;'); }

let activeLines = new Set(LINES.map(l => l.id));
let selectedStation = null;

// ── DOM 헬퍼 ─────────────────────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

// ── 노선 필터 버튼 렌더링 ─────────────────────────────────────────────────────

function renderLineFilters() {
  const container = $('line-filters');
  container.innerHTML = '';
  LINES.forEach(line => {
    const pill = document.createElement('div');
    pill.className = 'line-pill' + (activeLines.has(line.id) ? '' : ' inactive');
    pill.style.backgroundColor = line.color;
    pill.innerHTML = `<span>${line.name}</span>`;
    pill.addEventListener('click', () => toggleLine(line.id));
    container.appendChild(pill);
  });
}

function toggleLine(lineId) {
  if (activeLines.has(lineId)) {
    activeLines.delete(lineId);
  } else {
    activeLines.add(lineId);
  }
  renderLineFilters();
  renderMap();
}

// ── 노선도 렌더링 ─────────────────────────────────────────────────────────────

function renderMap() {
  const container = $('subway-map');
  container.innerHTML = '';

  LINES.forEach(line => {
    if (!activeLines.has(line.id)) return;

    const row = document.createElement('div');
    row.className = 'line-row';

    const label = document.createElement('div');
    label.className = 'line-label';
    label.style.backgroundColor = line.color;
    label.textContent = line.name;
    row.appendChild(label);

    const track = document.createElement('div');
    track.className = 'stations-track';

    line.stations.forEach((station, i) => {
      // 역 사이 선 렌더링
      if (i > 0) {
        const seg = document.createElement('div');
        seg.className = 'track-line';
        seg.style.backgroundColor = line.color;
        track.appendChild(seg);
      }

      const node = document.createElement('div');
      node.className = 'station-node' + (transferStations.has(station) ? ' transfer' : '');

      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.backgroundColor = line.color;

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = station;

      node.appendChild(dot);
      node.appendChild(name);
      node.title = station;
      node.addEventListener('click', () => showStation(station));
      track.appendChild(node);
    });

    row.appendChild(track);
    container.appendChild(row);
  });
}

// ── 역 정보 표시 ─────────────────────────────────────────────────────────────

function showStation(stationName) {
  selectedStation = stationName;
  const lines = stationLineMap[stationName] || [];
  const infoSection = $('station-info');
  const card = $('station-card');

  const badgesHtml = lines
    .map(l => `<span class="badge" style="background:${l.color}">${l.name}</span>`)
    .join('');

  // 인접 역 계산
  const adjacents = new Set();
  lines.forEach(line => {
    const idx = line.stations.indexOf(stationName);
    if (idx > 0) adjacents.add(line.stations[idx - 1]);
    if (idx < line.stations.length - 1) adjacents.add(line.stations[idx + 1]);
  });

  const adjHtml = [...adjacents]
    .map(s => `<span class="conn-item" data-station="${escapeAttr(s)}">${escapeText(s)}</span>`)
    .join('');

  card.innerHTML = `
    <h3>${stationName}</h3>
    <div class="lines-row">${badgesHtml}</div>
    ${transferStations.has(stationName) ? '<p style="color:#e67e22;font-size:0.85rem;margin-bottom:0.6rem">⚡ 환승역</p>' : ''}
    <p class="connections-label">인접 역:</p>
    <div class="connections-list">${adjHtml || '<span style="color:#888;font-size:0.85rem">없음</span>'}</div>
  `;

  card.querySelectorAll('.conn-item[data-station]').forEach(el => {
    el.addEventListener('click', () => showStation(el.dataset.station));
  });

  infoSection.style.display = '';
  infoSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── 검색 ─────────────────────────────────────────────────────────────────────

function getAllStations() {
  return Object.keys(stationLineMap);
}

function renderSearchResults(query) {
  const resultsEl = $('search-results');
  if (!query.trim()) {
    resultsEl.classList.add('hidden');
    return;
  }
  const q = query.toLowerCase();
  const matches = getAllStations()
    .filter(s => s.toLowerCase().includes(q))
    .slice(0, 10);

  if (matches.length === 0) {
    resultsEl.innerHTML = '<div style="padding:0.75rem 1rem;color:#888;">검색 결과가 없습니다.</div>';
    resultsEl.classList.remove('hidden');
    return;
  }

  resultsEl.innerHTML = matches.map(station => {
    const lines = stationLineMap[station];
    const badges = lines
      .map(l => `<span class="result-line-badge" style="background:${l.color}">${l.name}</span>`)
      .join('');
    return `
      <div class="search-result-item" data-station="${station}">
        <span class="result-station-name">${station}</span>
        <span style="display:flex;gap:4px;flex-wrap:wrap;">${badges}</span>
      </div>`;
  }).join('');

  resultsEl.classList.remove('hidden');

  resultsEl.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      showStation(item.dataset.station);
      $('station-search').value = item.dataset.station;
      resultsEl.classList.add('hidden');
    });
  });
}

// ── 실시간 도착정보 ───────────────────────────────────────────────────────────

// 백엔드 API 주소
const BACKEND_URL = 'http://localhost:3000';

/**
 * 실시간 도착정보를 백엔드에서 조회하여 화면에 표시합니다.
 */
async function fetchRealtimeData() {
  const statusEl = $('realtime-status');
  const listEl = $('realtime-list');

  try {
    const response = await fetch(`${BACKEND_URL}/api/realtime?limit=20`);
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || '실시간 도착정보를 불러올 수 없습니다');
    }

    const data = result.data || [];
    const now = new Date().toLocaleTimeString('ko-KR');

    if (data.length === 0) {
      statusEl.textContent = `마지막 업데이트: ${now} · 도착정보 없음`;
      listEl.innerHTML = '<div style="color:#888;font-size:0.88rem;padding:0.5rem 0;">현재 도착 예정 열차 정보가 없습니다.</div>';
      return;
    }

    statusEl.textContent = `마지막 업데이트: ${now} · ${data.length}개 열차 정보`;

    // 도착정보 카드 렌더링
    listEl.innerHTML = data.map(item => {
      const barvlSec = parseInt(item.barvlDt, 10);
      const arrivalText = isNaN(barvlSec)
        ? item.barvlDt
        : barvlSec === 0
          ? '곧 도착'
          : `${barvlSec}초 후`;

      return `
        <div class="realtime-card">
          <div class="station-name">🚉 ${item.statnNm}</div>
          <div class="line-name">노선: ${item.trainLineNm}</div>
          <div class="arrival-time">도착: ${arrivalText}</div>
          <div class="arrival-msg">${item.arvlMsg2}</div>
          <div class="arrival-msg">${item.arvlMsg3}</div>
          <div><span class="direction">${item.updnLine}</span></div>
        </div>`;
    }).join('');

  } catch (err) {
    console.error('실시간 도착정보 조회 실패:', err.message);
    statusEl.textContent = '실시간 정보를 불러올 수 없습니다 (백엔드 서버 연결 필요)';
    listEl.innerHTML = `<div style="color:#c0392b;font-size:0.85rem;padding:0.5rem 0;">
      ⚠️ 백엔드 서버(${BACKEND_URL})에 연결할 수 없습니다.<br>
      서버를 실행하고 SEOUL_API_KEY를 설정해 주세요.
    </div>`;
  }
}

// ── 초기화 ────────────────────────────────────────────────────────────────────

function init() {
  renderLineFilters();
  renderMap();

  const searchInput = $('station-search');
  const searchBtn = $('search-btn');

  searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $('search-results').classList.add('hidden');
    }
  });

  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (!q) return;
    const match = getAllStations().find(s => s.toLowerCase() === q.toLowerCase());
    if (match) {
      showStation(match);
      $('search-results').classList.add('hidden');
    } else {
      renderSearchResults(q);
    }
  });

  // 검색창 외부 클릭 시 결과 숨기기
  document.addEventListener('click', e => {
    const t = e.target;
    if (!t.closest('.search-box') && !t.closest('.search-results')) {
      $('search-results').classList.add('hidden');
    }
  });

  // 실시간 도착정보 초기 로드 및 3초마다 갱신
  fetchRealtimeData();
  setInterval(fetchRealtimeData, 3000);
}

document.addEventListener('DOMContentLoaded', init);

