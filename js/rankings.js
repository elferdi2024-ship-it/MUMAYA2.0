/* filepath: js/rankings.js */

// ========================================
// CLASS IMAGE MAPPING
// ========================================
const ClassImages = {
    'BK': 'assets/images/ranking/BK.png',
    'DK': 'assets/images/ranking/BK.png',
    'DW': 'assets/images/ranking/DARK WIZARD.png',
    'ELF': 'assets/images/ranking/ELF.png',
    'MG': 'assets/images/ranking/MG.png',
    'DL': 'assets/images/ranking/DL.png',
    'SU': 'assets/images/ranking/SUMM.png',
    'RF': 'assets/images/ranking/RAGE FIGTHER.png',
    'GL': 'assets/images/ranking/GROW LANCER.png',
    'CR': 'assets/images/ranking/GUN CRUSHER.png',
    'LE': 'assets/images/ranking/SLAYER.png',
    'ILL': 'assets/images/ranking/ALCHE.png',
    'RW': 'assets/images/ranking/RUNE.png',
};

// Class name to code mapping
const ClassNamesToCode = {
    'Dragon Knight': 'BK',
    'Blade Knight': 'BK',
    'BK': 'BK',
    'DK': 'DK',
    'Dark Knight': 'DK',
    'Soul Master': 'DW',
    'Dark Wizard': 'DW',
    'DW': 'DW',
    'Wizard': 'DW',
    'High Elf': 'ELF',
    'Fairy Elf': 'ELF',
    'Elf': 'ELF',
    'ELF': 'ELF',
    'Magic Gladiator': 'MG',
    'Gladiator': 'MG',
    'MG': 'MG',
    'Dark Lord': 'DL',
    'Lord Emperor': 'DL',
    'DL': 'DL',
    'Summoner': 'SU',
    'Dimension Master': 'SU',
    'SU': 'SU',
    'Rage Fighter': 'RF',
    'RF': 'RF',
    'Grow Lancer': 'GL',
    'GL': 'GL',
    'Lancer': 'GL',
    'Gun Crusader': 'CR',
    'Crusader': 'CR',
    'CR': 'CR',
    'Slayer': 'LE',
    'LE': 'LE',
    'Alchemist': 'ILL',
    'ILL': 'ILL',
    'Rune Wizard': 'RW',
    'RW': 'RW',
};

/**
 * Get class image path from class name or code
 * @param {string} className - Class name or code (e.g., 'Dragon Knight', 'BK', 'DW')
 * @returns {string} - Image path for the class
 */
function getClassImage(className) {
    if (!className) return 'assets/images/ranking/KUNDUM.png'; // Default image

    // Try direct lookup first
    if (ClassImages[className.toUpperCase()]) {
        return ClassImages[className.toUpperCase()];
    }

    // Try to map class name to code
    const code = ClassNamesToCode[className.toUpperCase()];
    if (code && ClassImages[code]) {
        return ClassImages[code];
    }

    // Default fallback
    return 'assets/images/ranking/KUNDUM.png';
}

/**
 * Get class code from class name
 * @param {string} className - Class name
 * @returns {string} - Class code
 */
function getClassCode(className) {
    if (!className) return 'KUNDUM';

    const upperName = className.toUpperCase();
    if (ClassNamesToCode[upperName]) {
        return ClassNamesToCode[upperName];
    }

    // Check if it's already a code
    if (ClassImages[upperName]) {
        return upperName;
    }

    return 'KUNDUM';
}

/**
 * Create class icon HTML element
 * @param {string} className - Class name or code
 * @param {number} size - Icon size in pixels (default: 32)
 * @returns {string} - HTML img tag
 */
function createClassIcon(className, size = 32) {
    const imagePath = getClassImage(className);
    const classCode = getClassCode(className);
    return `<img src="${imagePath}" alt="${className}" class="class-icon class-icon-${classCode.toLowerCase()}" style="width: ${size}px; height: ${size}px;" title="${className}">`;
}

// ========================================
// MOCK DATA
// ========================================
const mockPlayers = [
    { rank: 1, name: 'MayaWarrior', class: 'Dragon Knight', level: 950, resets: 50, guild: 'MayaElite', pvp: 1250, trend: 'up' },
    { rank: 2, name: 'EliteElf', class: 'High Elf', level: 948, resets: 48, guild: 'DivineForce', pvp: 980, trend: 'same' },
    { rank: 3, name: 'Zezinho', class: 'Soul Master', level: 945, resets: 45, guild: 'BrazilPower', pvp: 1100, trend: 'up' },
    { rank: 4, name: 'DarkLord99', class: 'Lord Emperor', level: 940, resets: 42, guild: 'MayaElite', pvp: 890, trend: 'down' },
    { rank: 5, name: 'SummonerX', class: 'Dimension Master', level: 938, resets: 40, guild: 'ShadowGuild', pvp: 750, trend: 'up' },
    { rank: 6, name: 'GladiatorMax', class: 'Magic Gladiator', level: 935, resets: 38, guild: 'TitanForce', pvp: 920, trend: 'same' },
    { rank: 7, name: 'RageFighter', class: 'Rage Fighter', level: 932, resets: 36, guild: 'BloodArena', pvp: 1050, trend: 'up' },
    { rank: 8, name: 'GunCrusader', class: 'Gun Crusader', level: 930, resets: 35, guild: 'DivineForce', pvp: 880, trend: 'down' },
    { rank: 9, name: 'SlayerKing', class: 'Slayer', level: 928, resets: 34, guild: 'ShadowGuild', pvp: 790, trend: 'up' },
    { rank: 10, name: 'AlchemistPro', class: 'Alchemist', level: 925, resets: 32, guild: 'MayaElite', pvp: 650, trend: 'same' },
];

const mockGuilds = [
    { rank: 1, name: 'MayaElite', leader: 'MayaWarrior', members: 50, points: 125000, castle: true, trend: 'up' },
    { rank: 2, name: 'DivineForce', leader: 'EliteElf', members: 48, points: 118000, castle: false, trend: 'up' },
    { rank: 3, name: 'BrazilPower', leader: 'Zezinho', members: 45, points: 110000, castle: false, trend: 'same' },
    { rank: 4, name: 'ShadowGuild', leader: 'DarkLord99', members: 42, points: 98000, castle: false, trend: 'down' },
    { rank: 5, name: 'TitanForce', leader: 'GladiatorMax', members: 40, points: 92000, castle: false, trend: 'up' },
];

const mockPvP = [
    { rank: 1, name: 'MayaWarrior', class: 'Dragon Knight', kills: 1250, deaths: 320, kd: 3.91, guild: 'MayaElite' },
    { rank: 2, name: 'Zezinho', class: 'Soul Master', kills: 1100, deaths: 350, kd: 3.14, guild: 'BrazilPower' },
    { rank: 3, name: 'RageFighter', class: 'Rage Fighter', kills: 1050, deaths: 400, kd: 2.63, guild: 'BloodArena' },
    { rank: 4, name: 'EliteElf', class: 'High Elf', kills: 980, deaths: 280, kd: 3.50, guild: 'DivineForce' },
    { rank: 5, name: 'GladiatorMax', class: 'Magic Gladiator', kills: 920, deaths: 380, kd: 2.42, guild: 'TitanForce' },
];

const mockResets = [
    { rank: 1, name: 'MayaWarrior', class: 'Dragon Knight', resets: 50, level: 950, guild: 'MayaElite', trend: 'up' },
    { rank: 2, name: 'EliteElf', class: 'High Elf', resets: 48, level: 948, guild: 'DivineForce', trend: 'same' },
    { rank: 3, name: 'Zezinho', class: 'Soul Master', resets: 45, level: 945, guild: 'BrazilPower', trend: 'up' },
    { rank: 4, name: 'DarkLord99', class: 'Lord Emperor', resets: 42, level: 940, guild: 'MayaElite', trend: 'down' },
    { rank: 5, name: 'SummonerX', class: 'Dimension Master', resets: 40, level: 938, guild: 'ShadowGuild', trend: 'up' },
];

const mockSpeed = [
    { rank: 1, name: 'SpeedKing', class: 'Gun Crusader', level: 950, time: '2h 15m', status: 'finished' },
    { rank: 2, name: 'FastElf', class: 'High Elf', level: 950, time: '2h 28m', status: 'finished' },
    { rank: 3, name: 'QuickDW', class: 'Soul Master', level: 950, time: '2h 35m', status: 'finished' },
    { rank: 4, name: 'RushBK', class: 'Dragon Knight', level: 945, time: 'En progreso', status: 'playing' },
    { rank: 5, name: 'SpeedyMG', class: 'Magic Gladiator', level: 940, time: 'En progreso', status: 'playing' },
];

// ========================================
// RENDER FUNCTIONS
// ========================================

function renderPlayersTable(data) {
    const tbody = document.getElementById('players-body');
    if (!tbody) return;

    tbody.innerHTML = data.map((player, index) => {
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        const trendIcon = player.trend === 'up' ? '↑' : player.trend === 'down' ? '↓' : '→';
        const trendClass = player.trend === 'up' ? 'trend up' : player.trend === 'down' ? 'trend down' : 'trend same';

        return `
        <tr class="animate-on-scroll">
            <td>
                ${index < 3
                ? `<span class="rank-medal ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}">${index + 1}</span>`
                : `<span class="rank-number ${rankClass}">${player.rank}</span>`
            }
            </td>
            <td>
                <div class="player-name">
                    ${createClassIcon(player.class, 28)}
                    <span>${player.name}</span>
                </div>
            </td>
            <td>${player.class}</td>
            <td><span class="stat-badge">${player.level}</span></td>
            <td><span class="stat-badge" style="color: hsl(var(--accent));">${player.resets}</span></td>
            <td><span class="guild-tag">${player.guild}</span></td>
            <td><span class="stat-badge">${player.pvp}</span></td>
            <td><span class="${trendClass}">${trendIcon}</span></td>
        </tr>
    `}).join('');
}

function renderGuildsTable(data) {
    const tbody = document.getElementById('guilds-body');
    if (!tbody) return;

    tbody.innerHTML = data.map((guild, index) => {
        const trendIcon = guild.trend === 'up' ? '↑' : guild.trend === 'down' ? '↓' : '→';
        const trendClass = guild.trend === 'up' ? 'trend up' : guild.trend === 'down' ? 'trend down' : 'trend same';

        return `
        <tr class="animate-on-scroll">
            <td>
                ${index < 3
                ? `<span class="rank-medal ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}">${index + 1}</span>`
                : `<span class="rank-number">${guild.rank}</span>`
            }
            </td>
            <td>
                <strong style="color: ${guild.castle ? 'hsl(var(--accent))' : 'var(--bone)'}">${guild.name}</strong>
                ${guild.castle ? '<span style="margin-left: 8px; color: hsl(var(--accent));">👑</span>' : ''}
            </td>
            <td>${guild.leader}</td>
            <td><span class="stat-badge">${guild.members}</span></td>
            <td><span class="stat-badge">${guild.points.toLocaleString()}</span></td>
            <td>${guild.castle ? '<span style="color: hsl(var(--success));">Sí</span>' : 'No'}</td>
            <td><span class="${trendClass}">${trendIcon}</span></td>
        </tr>
    `}).join('');
}

function renderPvPTable(data) {
    const tbody = document.getElementById('pvp-body');
    if (!tbody) return;

    tbody.innerHTML = data.map((player, index) => `
        <tr class="animate-on-scroll">
            <td>
                ${index < 3
            ? `<span class="rank-medal ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}">${index + 1}</span>`
            : `<span class="rank-number">${player.rank}</span>`
        }
            </td>
            <td>
                <div class="player-name">
                    ${createClassIcon(player.class, 28)}
                    <span>${player.name}</span>
                </div>
            </td>
            <td>${player.class}</td>
            <td><span class="stat-badge" style="color: hsl(var(--error));">${player.kills}</span></td>
            <td><span class="stat-badge">${player.deaths}</span></td>
            <td><span class="stat-badge" style="color: hsl(var(--primary));">${player.kd.toFixed(2)}</span></td>
            <td><span class="guild-tag">${player.guild}</span></td>
        </tr>
    `).join('');
}

function renderResetsTable(data) {
    const tbody = document.getElementById('reset-body');
    if (!tbody) return;

    tbody.innerHTML = data.map((player, index) => {
        const trendIcon = player.trend === 'up' ? '↑' : player.trend === 'down' ? '↓' : '→';
        const trendClass = player.trend === 'up' ? 'trend up' : player.trend === 'down' ? 'trend down' : 'trend same';

        return `
        <tr class="animate-on-scroll">
            <td>
                ${index < 3
                ? `<span class="rank-medal ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}">${index + 1}</span>`
                : `<span class="rank-number">${player.rank}</span>`
            }
            </td>
            <td>
                <div class="player-name">
                    ${createClassIcon(player.class, 28)}
                    <span>${player.name}</span>
                </div>
            </td>
            <td>${player.class}</td>
            <td><span class="stat-badge" style="color: hsl(var(--accent)); font-size: 20px;">${player.resets}</span></td>
            <td><span class="stat-badge">${player.level}</span></td>
            <td><span class="guild-tag">${player.guild}</span></td>
            <td><span class="${trendClass}">${trendIcon}</span></td>
        </tr>
    `}).join('');
}

function renderSpeedTable(data) {
    const tbody = document.getElementById('speed-body');
    if (!tbody) return;

    tbody.innerHTML = data.map((player, index) => `
        <tr class="animate-on-scroll">
            <td>
                ${index < 3
            ? `<span class="rank-medal ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}">${index + 1}</span>`
            : `<span class="rank-number">${player.rank}</span>`
        }
            </td>
            <td>
                <div class="player-name">
                    ${createClassIcon(player.class, 28)}
                    <span>${player.name}</span>
                </div>
            </td>
            <td>${player.class}</td>
            <td><span class="stat-badge">${player.level}</span></td>
            <td><span class="stat-badge">${player.time}</span></td>
            <td>
                <span class="status-dot ${player.status === 'finished' ? 'online' : 'offline'}"></span>
                ${player.status === 'finished' ? 'Completado' : 'Jugando'}
            </td>
        </tr>
    `).join('');
}

// ========================================
// TABS FUNCTIONALITY
// ========================================
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetContent = document.getElementById(`${tabId}-content`);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================
function animateCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }
    }, 16);
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Setup tabs
    setupTabs();

    // Render initial tables
    renderPlayersTable(mockPlayers);
    renderGuildsTable(mockGuilds);
    renderPvPTable(mockPvP);
    renderResetsTable(mockResets);
    renderSpeedTable(mockSpeed);

    // Animate stats
    setTimeout(() => {
        animateCounter('total-players', 1312);
        animateCounter('total-guilds', 87);
        animateCounter('total-pvp', 5420);
        animateCounter('max-reset', 50);
    }, 500);

    // Set last update time
    const updateTime = document.getElementById('last-update-time');
    if (updateTime) {
        const now = new Date();
        updateTime.textContent = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    }
});

// Export functions for external use
window.MUmaya = {
    getClassImage,
    getClassCode,
    createClassIcon,
    renderPlayersTable,
    renderGuildsTable,
    renderPvPTable,
    renderResetsTable,
    renderSpeedTable,
};
