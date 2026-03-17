/* ═══════════════════════════════════════════════════════════
   MU MAYA S21 — RANKINGS.JS
   Datos y lógica de tablas de rankings
   ═══════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────
// DATOS DE EJEMPLO — Jugadores
// ───────────────────────────────────────────────────────────
const playersData = [
  { rank: 1, name: 'DarkSlayer', class: 'DK', level: 1601, resets: 999, guild: 'MAYA', pvp: 2847, trend: 'up' },
  { rank: 2, name: 'ShadowElf', class: 'ELF', level: 1598, resets: 987, guild: 'AZTEC', pvp: 2156, trend: 'up' },
  { rank: 3, name: 'FireKnight', class: 'DK', level: 1590, resets: 956, guild: 'MAYA', pvp: 1923, trend: 'down' },
  { rank: 4, name: 'IncaWizard', class: 'DW', level: 1585, resets: 934, guild: 'SUN', pvp: 1756, trend: 'same' },
  { rank: 5, name: 'MayaHunter', class: 'ELF', level: 1580, resets: 912, guild: 'QUETZAL', pvp: 1689, trend: 'up' },
  { rank: 6, name: 'BloodMage', class: 'MG', level: 1575, resets: 890, guild: 'AZTEC', pvp: 1534, trend: 'down' },
  { rank: 7, name: 'TemplarCR', class: 'CR', level: 1570, resets: 867, guild: 'MAYA', pvp: 1421, trend: 'up' },
  { rank: 8, name: 'SummonQueen', class: 'SU', level: 1565, resets: 845, guild: 'SUN', pvp: 1298, trend: 'same' },
  { rank: 9, name: 'RageFist', class: 'RF', level: 1560, resets: 823, guild: 'QUETZAL', pvp: 1187, trend: 'up' },
  { rank: 10, name: 'LordDark', class: 'DL', level: 1555, resets: 801, guild: 'AZTEC', pvp: 1076, trend: 'down' },
  { rank: 11, name: 'GoldenArch', class: 'ELF', level: 1550, resets: 789, guild: 'MAYA', pvp: 967, trend: 'up' },
  { rank: 12, name: 'SoulMaster', class: 'DW', level: 1545, resets: 767, guild: 'SUN', pvp: 892, trend: 'same' },
  { rank: 13, name: 'BladeKnight', class: 'DK', level: 1540, resets: 745, guild: 'QUETZAL', pvp: 834, trend: 'down' },
  { rank: 14, name: 'Illusionist', class: 'IL', level: 1535, resets: 723, guild: 'AZTEC', pvp: 776, trend: 'up' },
  { rank: 15, name: 'GlowMage', class: 'GL', level: 1530, resets: 701, guild: 'MAYA', pvp: 723, trend: 'up' },
];

// ───────────────────────────────────────────────────────────
// DATOS DE EJEMPLO — Guilds
// ───────────────────────────────────────────────────────────
const guildsData = [
  { rank: 1, name: 'MAYA', leader: 'DarkSlayer', members: 87, points: 1250000, castle: true, trend: 'same' },
  { rank: 2, name: 'AZTEC', leader: 'ShadowHunter', members: 82, points: 1180000, castle: false, trend: 'up' },
  { rank: 3, name: 'QUETZAL', leader: 'FeatheredSerpent', members: 76, points: 1050000, castle: false, trend: 'down' },
  { rank: 4, name: 'SUN', leader: 'IncaEmperor', members: 71, points: 920000, castle: false, trend: 'up' },
  { rank: 5, name: 'JADE', leader: 'JadeWarrior', members: 68, points: 850000, castle: false, trend: 'same' },
  { rank: 6, name: 'BLOOD', leader: 'BloodPriest', members: 64, points: 780000, castle: false, trend: 'down' },
  { rank: 7, name: 'GOLD', leader: 'GoldKing', members: 59, points: 710000, castle: false, trend: 'up' },
  { rank: 8, name: 'STORM', leader: 'StormBringer', members: 55, points: 640000, castle: false, trend: 'same' },
  { rank: 9, name: 'PHOENIX', leader: 'PhoenixRising', members: 51, points: 570000, castle: false, trend: 'up' },
  { rank: 10, name: 'TITAN', leader: 'TitanForce', members: 48, points: 500000, castle: false, trend: 'down' },
];

// ───────────────────────────────────────────────────────────
// DATOS DE EJEMPLO — PvP
// ───────────────────────────────────────────────────────────
const pvpData = [
  { rank: 1, name: 'DarkSlayer', class: 'DK', kills: 2847, deaths: 412, guild: 'MAYA' },
  { rank: 2, name: 'ShadowElf', class: 'ELF', kills: 2156, deaths: 523, guild: 'AZTEC' },
  { rank: 3, name: 'FireKnight', class: 'DK', kills: 1923, deaths: 489, guild: 'MAYA' },
  { rank: 4, name: 'IncaWizard', class: 'DW', kills: 1756, deaths: 567, guild: 'SUN' },
  { rank: 5, name: 'MayaHunter', class: 'ELF', kills: 1689, deaths: 445, guild: 'QUETZAL' },
  { rank: 6, name: 'BloodMage', class: 'MG', kills: 1534, deaths: 612, guild: 'AZTEC' },
  { rank: 7, name: 'TemplarCR', class: 'CR', kills: 1421, deaths: 398, guild: 'MAYA' },
  { rank: 8, name: 'SummonQueen', class: 'SU', kills: 1298, deaths: 534, guild: 'SUN' },
  { rank: 9, name: 'RageFist', class: 'RF', kills: 1187, deaths: 478, guild: 'QUETZAL' },
  { rank: 10, name: 'LordDark', class: 'DL', kills: 1076, deaths: 423, guild: 'AZTEC' },
];

// ───────────────────────────────────────────────────────────
// DATOS DE EJEMPLO — Resets
// ───────────────────────────────────────────────────────────
const resetData = [
  { rank: 1, name: 'DarkSlayer', class: 'DK', resets: 999, level: 1601, guild: 'MAYA', trend: 'same' },
  { rank: 2, name: 'ShadowElf', class: 'ELF', resets: 987, level: 1598, guild: 'AZTEC', trend: 'up' },
  { rank: 3, name: 'FireKnight', class: 'DK', resets: 956, level: 1590, guild: 'MAYA', trend: 'down' },
  { rank: 4, name: 'IncaWizard', class: 'DW', resets: 934, level: 1585, guild: 'SUN', trend: 'same' },
  { rank: 5, name: 'MayaHunter', class: 'ELF', resets: 912, level: 1580, guild: 'QUETZAL', trend: 'up' },
  { rank: 6, name: 'BloodMage', class: 'MG', resets: 890, level: 1575, guild: 'AZTEC', trend: 'same' },
  { rank: 7, name: 'TemplarCR', class: 'CR', resets: 867, level: 1570, guild: 'MAYA', trend: 'up' },
  { rank: 8, name: 'SummonQueen', class: 'SU', resets: 845, level: 1565, guild: 'SUN', trend: 'down' },
  { rank: 9, name: 'RageFist', class: 'RF', resets: 823, level: 1560, guild: 'QUETZAL', trend: 'same' },
  { rank: 10, name: 'LordDark', class: 'DL', resets: 801, level: 1555, guild: 'AZTEC', trend: 'up' },
];

// ───────────────────────────────────────────────────────────
// DATOS DE EJEMPLO — Speed Server
// ───────────────────────────────────────────────────────────
const speedData = [
  { rank: 1, name: 'NewWarrior', class: 'CR', level: 800, time: '2d 4h 32m', status: 'completed' },
  { rank: 2, name: 'SpeedDemon', class: 'DK', level: 798, time: '2d 6h 15m', status: 'active' },
  { rank: 3, name: 'FastElf', class: 'ELF', level: 785, time: '2d 8h 45m', status: 'active' },
  { rank: 4, name: 'QuickMage', class: 'DW', level: 772, time: '2d 10h 20m', status: 'active' },
  { rank: 5, name: 'RushKnight', class: 'DK', level: 756, time: '2d 12h 50m', status: 'active' },
  { rank: 6, name: 'BlazeFist', class: 'RF', level: 743, time: '2d 14h 30m', status: 'active' },
  { rank: 7, name: 'FlashLord', class: 'DL', level: 728, time: '2d 16h 10m', status: 'active' },
  { rank: 8, name: 'SwiftSumm', class: 'SU', level: 715, time: '2d 18h 40m', status: 'active' },
  { rank: 9, name: 'RapidGlow', class: 'GL', level: 698, time: '2d 20h 25m', status: 'active' },
  { rank: 10, name: 'NitroIll', class: 'IL', level: 682, time: '2d 22h 55m', status: 'active' },
];

// ───────────────────────────────────────────────────────────
// Class Icons Mapping
// ───────────────────────────────────────────────────────────
const classIcons = {
  'DK': 'sword',
  'DW': 'sparkles',
  'ELF': 'crosshair',
  'MG': 'zap',
  'DL': 'moon',
  'SU': 'sun',
  'RF': 'fist-raised',
  'GL': 'flame',
  'LE': 'flame',
  'CR': 'crown',
  'IL': 'eye',
};

const classColors = {
  'DK': '#D03030',
  'DW': '#D4C4A0',
  'ELF': '#3A9090',
  'MG': '#D8A840',
  'DL': '#7A6E50',
  'SU': '#ECC860',
  'RF': '#A89060',
  'GL': '#B02424',
  'LE': '#D03030',
  'CR': '#C49030',
  'IL': '#3A9090',
};

// ───────────────────────────────────────────────────────────
// Render Functions
// ───────────────────────────────────────────────────────────

function getTrendIcon(trend) {
  if (trend === 'up') return '<i data-lucide="trending-up" width="14" height="14" class="trend up"></i>';
  if (trend === 'down') return '<i data-lucide="trending-down" width="14" height="14" class="trend down"></i>';
  return '<i data-lucide="minus" width="14" height="14" class="trend same"></i>';
}

function renderPlayers() {
  const tbody = document.getElementById('players-body');
  if (!tbody) return;
  
  tbody.innerHTML = playersData.map(player => `
    <tr>
      <td><span class="rank-number rank-${player.rank <= 3 ? player.rank : ''}">${player.rank}</span></td>
      <td>
        <div class="player-name">
          <span class="player-avatar">${player.name.charAt(0)}</span>
          ${player.name}
        </div>
      </td>
      <td>
        <span class="class-icon" style="color: ${classColors[player.class] || 'inherit'}">
          <i data-lucide="${classIcons[player.class] || 'user'}" width="20" height="20"></i>
        </span>
        ${player.class}
      </td>
      <td><span class="stat-badge">${player.level.toLocaleString()}</span></td>
      <td><span class="stat-badge">${player.resets}</span></td>
      <td><span class="guild-tag">${player.guild}</span></td>
      <td><span class="stat-badge">${player.pvp.toLocaleString()}</span></td>
      <td>${getTrendIcon(player.trend)}</td>
    </tr>
  `).join('');
}

function renderGuilds() {
  const tbody = document.getElementById('guilds-body');
  if (!tbody) return;
  
  tbody.innerHTML = guildsData.map(guild => `
    <tr>
      <td><span class="rank-number rank-${guild.rank <= 3 ? guild.rank : ''}">${guild.rank}</span></td>
      <td>
        <div class="player-name">
          ${guild.name}
          ${guild.castle ? '<span class="guild-tag" style="background: var(--blood4); border-color: var(--blood4); color: white;">CASTLE</span>' : ''}
        </div>
      </td>
      <td>${guild.leader}</td>
      <td><span class="stat-badge">${guild.members}</span></td>
      <td><span class="stat-badge">${guild.points.toLocaleString()}</span></td>
      <td>${guild.castle ? '✅' : '—'}</td>
      <td>${getTrendIcon(guild.trend)}</td>
    </tr>
  `).join('');
}

function renderPvP() {
  const tbody = document.getElementById('pvp-body');
  if (!tbody) return;
  
  tbody.innerHTML = pvpData.map(player => {
    const kd = (player.kills / player.deaths).toFixed(2);
    return `
    <tr>
      <td><span class="rank-number rank-${player.rank <= 3 ? player.rank : ''}">${player.rank}</span></td>
      <td>
        <div class="player-name">
          <span class="player-avatar">${player.name.charAt(0)}</span>
          ${player.name}
        </div>
      </td>
      <td>
        <span class="class-icon" style="color: ${classColors[player.class] || 'inherit'}">
          <i data-lucide="${classIcons[player.class] || 'user'}" width="20" height="20"></i>
        </span>
        ${player.class}
      </td>
      <td><span class="stat-badge" style="color: var(--blood4);">${player.kills.toLocaleString()}</span></td>
      <td><span class="stat-badge" style="color: var(--ash);">${player.deaths.toLocaleString()}</span></td>
      <td><span class="stat-badge">${kd}</span></td>
      <td><span class="guild-tag">${player.guild}</span></td>
    </tr>
  `}).join('');
}

function renderResets() {
  const tbody = document.getElementById('reset-body');
  if (!tbody) return;
  
  tbody.innerHTML = resetData.map(player => `
    <tr>
      <td><span class="rank-number rank-${player.rank <= 3 ? player.rank : ''}">${player.rank}</span></td>
      <td>
        <div class="player-name">
          <span class="player-avatar">${player.name.charAt(0)}</span>
          ${player.name}
        </div>
      </td>
      <td>
        <span class="class-icon" style="color: ${classColors[player.class] || 'inherit'}">
          <i data-lucide="${classIcons[player.class] || 'user'}" width="20" height="20"></i>
        </span>
        ${player.class}
      </td>
      <td><span class="stat-badge" style="color: var(--gold3);">${player.resets}</span></td>
      <td><span class="stat-badge">${player.level}</span></td>
      <td><span class="guild-tag">${player.guild}</span></td>
      <td>${getTrendIcon(player.trend)}</td>
    </tr>
  `).join('');
}

function renderSpeed() {
  const tbody = document.getElementById('speed-body');
  if (!tbody) return;
  
  tbody.innerHTML = speedData.map(player => `
    <tr>
      <td><span class="rank-number rank-${player.rank <= 3 ? player.rank : ''}">${player.rank}</span></td>
      <td>
        <div class="player-name">
          <span class="player-avatar">${player.name.charAt(0)}</span>
          ${player.name}
        </div>
      </td>
      <td>
        <span class="class-icon" style="color: ${classColors[player.class] || 'inherit'}">
          <i data-lucide="${classIcons[player.class] || 'user'}" width="20" height="20"></i>
        </span>
        ${player.class}
      </td>
      <td><span class="stat-badge">${player.level}</span></td>
      <td>${player.time}</td>
      <td>
        <span style="color: ${player.status === 'completed' ? 'var(--jade4)' : 'var(--gold3)'}; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.08em;">
          ${player.status === 'completed' ? '✅ COMPLETADO' : '🔄 EN PROGRESO'}
        </span>
      </td>
    </tr>
  `).join('');
}

// ───────────────────────────────────────────────────────────
// Animate Stats Counters
// ───────────────────────────────────────────────────────────
function animateStats() {
  const stats = {
    'total-players': 8547,
    'total-guilds': 156,
    'total-pvp': 12847,
    'max-reset': 999,
  };
  
  Object.entries(stats).forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, 30);
  });
}

// ───────────────────────────────────────────────────────────
// Tab Switching
// ───────────────────────────────────────────────────────────
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');
      
      // Add active to selected
      btn.classList.add('active');
      document.getElementById(`${tabId}-content`).style.display = 'block';
      
      // Re-render icons after tab switch
      setTimeout(() => lucide.createIcons(), 50);
    });
  });
}

// ───────────────────────────────────────────────────────────
// Update Last Update Time
// ───────────────────────────────────────────────────────────
function updateLastUpdateTime() {
  const el = document.getElementById('last-update-time');
  if (!el) return;
  
  const now = new Date();
  const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  el.textContent = timeString;
}

// ───────────────────────────────────────────────────────────
// Initialization
// ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Render all tables
  renderPlayers();
  renderGuilds();
  renderPvP();
  renderResets();
  renderSpeed();
  
  // Animate stats
  setTimeout(animateStats, 500);
  
  // Init tabs
  initTabs();
  
  // Update time
  updateLastUpdateTime();
  
  // Auto-refresh every 60 seconds
  setInterval(() => {
    renderPlayers();
    renderGuilds();
    renderPvP();
    renderResets();
    renderSpeed();
    updateLastUpdateTime();
  }, 60000);
});
