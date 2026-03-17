/* MU MAYA S21 — Index JavaScript
   Efectos visuales: embers, runas flotantes, animaciones GSAP OPTIMIZADAS */

function buildEmbers() {
  const embersContainer = document.getElementById('embers');
  if (!embersContainer) return;
  embersContainer.innerHTML = '';
  if (typeof motionAllowed === 'function' && !motionAllowed()) return;

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

function clearEmbers() {
  const embersContainer = document.getElementById('embers');
  if (embersContainer) embersContainer.innerHTML = '';
}

function buildRunes() {
  const runesContainer = document.getElementById('runes');
  if (!runesContainer) return;
  runesContainer.innerHTML = '';
  if (typeof motionAllowed === 'function' && !motionAllowed()) return;

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

function clearRunes() {
  const runesContainer = document.getElementById('runes');
  if (runesContainer) runesContainer.innerHTML = '';
}

function initGsapAnimations() {
  if ((typeof motionAllowed === 'function' && !motionAllowed()) || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-el', {
    y: 10,
    opacity: 0,
    stagger: 0.06,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.05
  });

  gsap.from('.statsbar', {
    y: 15,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out',
    delay: 0.25
  });

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

  gsap.utils.toArray('.rate-value').forEach((el) => {
    const finalValue = el.innerText;
    const numericValue = parseInt(finalValue.replace(/\D/g, '')) || 0;

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

    gsap.to(el, {
      innerText: numericValue,
      duration: 2,
      snap: { innerText: 1 },
      modifiers: {
        innerText: value => {
          if (finalValue.includes('x')) return Math.floor(value) + 'x';
          return Math.floor(value).toLocaleString();
        }
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true
      }
    });
  });

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

    siegeStats.forEach(stat => {
      const valueEl = stat.querySelector('.siege-stat-value');
      if (valueEl) {
        const finalValue = valueEl.innerText;
        const numericValue = parseInt(finalValue.replace(/\D/g, '')) || 0;

        gsap.to(valueEl, {
          innerText: numericValue,
          duration: 1.5,
          snap: { innerText: 1 },
          modifiers: {
            innerText: value => {
              if (finalValue.includes('h')) return Math.floor(value) + 'h';
              return Math.floor(value);
            }
          },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            once: true
          }
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  buildEmbers();
  buildRunes();
  initGsapAnimations();

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// Expose helpers for motion toggle
window.buildEmbers = buildEmbers;
window.clearEmbers = clearEmbers;
window.buildRunes = buildRunes;
window.clearRunes = clearRunes;
window.initGsapAnimations = initGsapAnimations;
