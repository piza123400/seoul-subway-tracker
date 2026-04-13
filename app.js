/**
 * Seoul Subway Tracker – app.js
 * Contains subway line/station data and all UI logic.
 */

// ── Data ─────────────────────────────────────────────────────────────────────

const LINES = [
  {
    id: 'line1',
    name: 'Line 1',
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
    name: 'Line 2',
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
    name: 'Line 3',
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
    name: 'Line 4',
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
    name: 'Line 5',
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
    name: 'Line 6',
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
    name: 'Line 7',
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
    name: 'Line 8',
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
    name: 'Line 9',
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

// Build a lookup: station name -> lines
const stationLineMap = {};
LINES.forEach(line => {
  line.stations.forEach(station => {
    if (!stationLineMap[station]) stationLineMap[station] = [];
    stationLineMap[station].push(line);
  });
});

// Transfer stations (appear on 2+ lines)
const transferStations = new Set(
  Object.entries(stationLineMap)
    .filter(([, lines]) => lines.length > 1)
    .map(([name]) => name)
);

function escapeAttr(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
function escapeText(s) { return s.replace(/&/g, '&amp;'); }

let activeLines = new Set(LINES.map(l => l.id));
let selectedStation = null;

// ── DOM helpers ──────────────────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

// ── Render line filter pills ─────────────────────────────────────────────────

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

// ── Render subway map ────────────────────────────────────────────────────────

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
      // Track segment before the station
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

// ── Show station info ────────────────────────────────────────────────────────

function showStation(stationName) {
  selectedStation = stationName;
  const lines = stationLineMap[stationName] || [];
  const infoSection = $('station-info');
  const card = $('station-card');

  const badgesHtml = lines
    .map(l => `<span class="badge" style="background:${l.color}">${l.name}</span>`)
    .join('');

  // Adjacent stations
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
    ${transferStations.has(stationName) ? '<p style="color:#e67e22;font-size:0.85rem;margin-bottom:0.6rem">⚡ Transfer Station</p>' : ''}
    <p class="connections-label">Adjacent stations:</p>
    <div class="connections-list">${adjHtml || '<span style="color:#888;font-size:0.85rem">None</span>'}</div>
  `;

  card.querySelectorAll('.conn-item[data-station]').forEach(el => {
    el.addEventListener('click', () => showStation(el.dataset.station));
  });

  infoSection.style.display = '';
  infoSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Search ───────────────────────────────────────────────────────────────────

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
    resultsEl.innerHTML = '<div style="padding:0.75rem 1rem;color:#888;">No stations found.</div>';
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

// ── Init ─────────────────────────────────────────────────────────────────────

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

  // Close results when clicking outside
  document.addEventListener('click', e => {
    const t = e.target;
    if (!t.closest('.search-box') && !t.closest('.search-results')) {
      $('search-results').classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
