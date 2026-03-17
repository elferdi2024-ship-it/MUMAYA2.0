/* ───────────────────────────────────────────────────────────────────────────
   MU MAYA S21 — Index JavaScript
   Efectos visuales: embers, runas flotantes, animaciones GSAP
   ─────────────────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // ── EMBERS (Partículas de fuego ascendentes) ─────────────────────────────
  const embersContainer = document.getElementById('embers');

  if (embersContainer) {
    const emberCount = 15;

    for (let i = 0; i < emberCount; i++) {
      createEmber(embersContainer, i);
    }
  }

  function createEmber(container, index) {
    const ember = document.createElement('div');
    ember.className = 'ember';

    // Posición horizontal aleatoria
    ember.style.left = `${Math.random() * 100}%`;

    // Retraso escalonado para que no suban todas juntas
    ember.style.animationDelay = `${index * 0.3}s`;

    // Duración ligeramente variable
    ember.style.animationDuration = `${3 + Math.random() * 2}s`;

    // Tamaño variable
    const size = 2 + Math.random() * 3;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;

    container.appendChild(ember);
  }

  // ── RUNAS FLOTANTES ─────────────────────────────────────────────────────
  const runesContainer = document.getElementById('runes');

  if (runesContainer) {
    // Símbolos rúnicos estilo MU
    const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];
    const runeCount = 12;

    for (let i = 0; i < runeCount; i++) {
      createRune(runesContainer, runeSymbols, i);
    }
  }

  function createRune(container, symbols, index) {
    const rune = document.createElement('div');
    rune.className = 'rune';
    rune.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Posición aleatoria
    rune.style.left = `${10 + Math.random() * 80}%`;
    rune.style.top = `${20 + Math.random() * 60}%`;

    // Retraso escalonado
    rune.style.animationDelay = `${index * 0.8}s`;

    // Tamaño variable
    const size = 16 + Math.random() * 12;
    rune.style.fontSize = `${size}px`;

    // Rotación inicial aleatoria
    rune.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(rune);
  }

  // ── GSAP ANIMACIONES ────────────────────────────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada del hero
    gsap.from('.hero-el', {
      y: 24,
      opacity: 0,
      stagger: 0.14,
      duration: 1.3,
      ease: 'power3.out',
      delay: 0.1
    });

    // Animación de stats bar
    gsap.from('.statsbar', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.8
    });

    // Animación de secciones al hacer scroll
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Animación de rate values
    gsap.utils.toArray('.rate-value').forEach(el => {
      gsap.from(el, {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%'
        }
      });
    });

    // Animación de class chips en stagger
    const classChips = document.querySelectorAll('.class-chip');
    if (classChips.length) {
      gsap.from(classChips, {
        y: 20,
        opacity: 0,
        stagger: {
          amount: 0.5,
          grid: [4, 4]
        },
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.classes-grid',
          start: 'top 80%'
        }
      });
    }

    // Animación de countdown units
    const cdUnits = document.querySelectorAll('.cd-unit');
    if (cdUnits.length) {
      gsap.from(cdUnits, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.speed-countdown',
          start: 'top 85%'
        }
      });
    }

    // Animación de crusader image
    const crusaderImg = document.querySelector('.crusader-img');
    if (crusaderImg) {
      gsap.from(crusaderImg, {
        scale: 0.8,
        opacity: 0,
        rotationY: 15,
        duration: 1.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.crusader-section',
          start: 'top 75%'
        }
      });
    }

    // Animación de siege stats
    const siegeStats = document.querySelectorAll('.siege-stat');
    if (siegeStats.length) {
      gsap.from(siegeStats, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.siege-stats',
          start: 'top 80%'
        }
      });
    }
  }

  // ── EFECTO PARALLAX EN HERO ─────────────────────────────────────────────
  const heroSection = document.querySelector('.hero-index');

  if (heroSection && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = document.querySelector('.hero-content');

      if (heroContent && scrolled < window.innerHeight) {
        // Parallax suave en el contenido del hero
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
      }

      // Parallax en las pirámides
      const pyramids = document.querySelectorAll('.pyramid-left, .pyramid-right');
      pyramids.forEach(pyramid => {
        pyramid.style.transform = `translateY(${scrolled * 0.15}px) ${pyramid.classList.contains('pyramid-right') ? 'scaleX(-1)' : ''}`;
      });
    }, { passive: true });
  }

  // ── EFECTO HOVER EN NAV LOGO ────────────────────────────────────────────
  const navLogo = document.querySelector('.nav-logo');

  if (navLogo) {
    navLogo.addEventListener('mouseenter', () => {
      gsap.to(navLogo, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    navLogo.addEventListener('mouseleave', () => {
      gsap.to(navLogo, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }

  // ── EFECTO MAGNÉTICO EN BOTONES ─────────────────────────────────────────
  const buttons = document.querySelectorAll('.btn-p, .btn-o, .speed-cta-btn, .crusader-cta');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // ── INICIALIZAR ICONOS LUCIDE ───────────────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
