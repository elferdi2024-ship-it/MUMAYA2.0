/* ───────────────────────────────────────────────────────────────────────────
   MU MAYA S21 — Countdown Timer
   Target: Jueves 5 Abril 2025 · 18:00 hs GMT-3
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  // Target date: April 5, 2025 at 18:00 GMT-3
  const TARGET_DATE = new Date('2025-04-05T18:00:00-03:00');

  function updateCountdown() {
    const now = new Date();
    const diff = TARGET_DATE - now;

    const countdownEls = {
      d: document.querySelectorAll('[data-cd="d"]'),
      h: document.querySelectorAll('[data-cd="h"]'),
      m: document.querySelectorAll('[data-cd="m"]'),
      s: document.querySelectorAll('[data-cd="s"]')
    };

    // If countdown has ended
    if (diff <= 0) {
      // Show "ACTIVO" state
      Object.values(countdownEls).flat().forEach(el => {
        if (el) {
          el.textContent = '00';
          el.classList.add('live');
        }
      });

      // Optional: Add live indicator
      const liveIndicator = document.querySelector('.countdown-live');
      if (liveIndicator) {
        liveIndicator.style.display = 'flex';
      }

      return;
    }

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Format with leading zeros
    const format = (num) => String(num).padStart(2, '0');

    // Update all countdown elements
    if (countdownEls.d.length) {
      countdownEls.d.forEach(el => el.textContent = format(days));
    }
    if (countdownEls.h.length) {
      countdownEls.h.forEach(el => el.textContent = format(hours));
    }
    if (countdownEls.m.length) {
      countdownEls.m.forEach(el => el.textContent = format(minutes));
    }
    if (countdownEls.s.length) {
      countdownEls.s.forEach(el => el.textContent = format(seconds));
    }
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
