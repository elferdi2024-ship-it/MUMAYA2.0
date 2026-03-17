/* ═══════════════════════════════════════════════════════════
   MU MAYA S21 — COUNTDOWN.JS
   Universal countdown timer with data attributes
   ═══════════════════════════════════════════════════════════ */

/**
 * Initialize countdown timers on the page
 * Looks for elements with data-cd attributes:
 *   data-cd="d" → days
 *   data-cd="h" → hours
 *   data-cd="m" → minutes
 *   data-cd="s" → seconds
 * 
 * Target date is set via data-target attribute on the container
 * Format: ISO 8601 (e.g., "2025-04-05T21:00:00-03:00")
 */

function initCountdown() {
  // Find all countdown containers
  const countdowns = document.querySelectorAll('[data-countdown]');
  
  if (!countdowns.length) return;

  countdowns.forEach(container => {
    const targetStr = container.getAttribute('data-target');
    if (!targetStr) {
      console.warn('Countdown missing data-target attribute');
      return;
    }

    const targetDate = new Date(targetStr);
    if (isNaN(targetDate.getTime())) {
      console.warn('Invalid countdown target date:', targetStr);
      return;
    }

    // Get display elements
    const daysEl = container.querySelector('[data-cd="d"]');
    const hoursEl = container.querySelector('[data-cd="h"]');
    const minsEl = container.querySelector('[data-cd="m"]');
    const secsEl = container.querySelector('[data-cd="s"]');

    // Update function
    function update() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        // Countdown finished - show "ACTIVO"
        container.classList.add('live');
        
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        
        // Optional: show "LIVE" message
        const liveMsg = container.querySelector('.live-message');
        if (liveMsg) {
          liveMsg.style.display = 'flex';
        }
        
        return;
      }

      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update display with zero-padding
      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Initial update
    update();

    // Update every second
    const interval = setInterval(update, 1000);

    // Store interval for cleanup if needed
    container._countdownInterval = interval;
  });
}

/**
 * Create a countdown with custom formatting
 * @param {string} targetStr - Target date in ISO format
 * @param {Object} options - Display options
 * @returns {Object} API with update/cleanup methods
 */
function createCountdown(targetStr, options = {}) {
  const {
    daysEl = null,
    hoursEl = null,
    minsEl = null,
    secsEl = null,
    onTick = null,
    onComplete = null,
  } = options;

  const targetDate = new Date(targetStr);
  if (isNaN(targetDate.getTime())) {
    console.error('Invalid target date:', targetStr);
    return null;
  }

  let completed = false;
  let interval = null;

  function tick() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      completed = true;
      
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      
      if (onComplete) onComplete();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');

    if (onTick) onTick({ days, hours, minutes, seconds, distance });
  }

  // Start immediately
  tick();
  interval = setInterval(tick, 1000);

  return {
    update: tick,
    cleanup: () => {
      if (interval) clearInterval(interval);
    },
    isCompleted: () => completed,
    getDistance: () => {
      const now = new Date().getTime();
      return Math.max(0, targetDate.getTime() - now);
    },
  };
}

/**
 * Format a time distance into human-readable string
 * @param {number} distance - Milliseconds
 * @returns {string} Formatted string
 */
function formatDistance(distance) {
  if (distance <= 0) return '¡Ahora!';

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.join(' ') || '< 1m';
}

/**
 * Format date for display (Spanish)
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDateES(date) {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('es-ES', options);
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', initCountdown);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initCountdown, createCountdown, formatDistance, formatDateES };
}
