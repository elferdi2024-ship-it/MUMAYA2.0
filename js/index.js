/* ───────────────────────────────────────────────────────────────────────────
   MU MAYA S21 — Index JavaScript
   Efectos visuales: embers, runas flotantes, animaciones GSAP OPTIMIZADAS
   ─────────────────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // ── EMBERS (Partículas de fuego ascendentes) - OPTIMIZADO ───────────────
  const embersContainer = document.getElementById('embers');

  if (embersContainer) {
    const emberCount = 10;

    for (let i = 0; i < emberCount; i++) {
      const ember = document.createElement('div');
      ember.className = 'ember';
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.animationDelay = `${i * 0.4}s`;
      ember.style.animationDuration = `${3 + Math.random() * 2}s`;
      const size = 2 + Math.random() * 3;
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      embersContainer.appendChild(ember);
    }
  }

  // ── RUNAS FLOTANTES - OPTIMIZADO ────────────────────────────────────────
  const runesContainer = document.getElementById('runes');

  if (runesContainer) {
    const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];
    const runeCount = 6;

    for (let i = 0; i < runeCount; i++) {
      const rune = document.createElement('div');
      rune.className = 'rune';
      rune.textContent = runeSymbols[Math.floor(Math.random() * runeSymbols.length)];
      rune.style.left = `${10 + Math.random() * 80}%`;
      rune.style.top = `${20 + Math.random() * 60}%`;
      rune.style.animationDelay = `${i * 1.5}s`;
      rune.style.fontSize = `${16 + Math.random() * 12}px`;
      rune.style.transform = `rotate(${Math.random() * 360}deg)`;
      runesContainer.appendChild(rune);
    }
  }

  // ── GSAP ANIMACIONES - OPTIMIZADAS ──────────────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance - rápido y suave
    gsap.from('.hero-el', {
      y: 10,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.05
    });

    // Stats bar
    gsap.from('.statsbar', {
      y: 15,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.25
    });

    // Scroll reveal - una sola vez
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.from(el, {
        y: 12,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        }
      });
    });

    // Rate values
    gsap.utils.toArray('.rate-value').forEach((el) => {
      gsap.from(el, {
        scale: 0.85,
        opacity: 0,
        duration: 0.35,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true
        }
      });
    });

    // Class chips
    const classChips = document.querySelectorAll('.class-chip');
    if (classChips.length) {
      gsap.from(classChips, {
        y: 8,
        opacity: 0,
        stagger: { amount: 0.25, grid: [4, 4] },
        duration: 0.25,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.classes-grid',
          start: 'top 80%',
          once: true
        }
      });
    }

    // Countdown units
    const cdUnits = document.querySelectorAll('.cd-unit');
    if (cdUnits.length) {
      gsap.from(cdUnits, {
        y: 12,
        opacity: 0,
        stagger: 0.06,
        duration: 0.35,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.speed-countdown',
          start: 'top 85%',
          once: true
        }
      });
    }

    // Crusader image
    const crusaderImg = document.querySelector('.crusader-img');
    if (crusaderImg) {
      gsap.from(crusaderImg, {
        scale: 0.92,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.crusader-section',
          start: 'top 75%',
          once: true
        }
      });
    }

    // Siege stats
    const siegeStats = document.querySelectorAll('.siege-stat');
    if (siegeStats.length) {
      gsap.from(siegeStats, {
        y: 15,
        opacity: 0,
        stagger: 0.06,
        duration: 0.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.siege-stats',
          start: 'top 80%',
          once: true
        }
      });
    }
  }

  // ── INICIALIZAR ICONOS LUCIDE ───────────────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
