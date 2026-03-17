/* ───────────────────────────────────────────────────────────────────────────
   MU MAYA S21 — Core JavaScript
   Nav scroll, drawer, reveal, particles, smooth scroll
   ─────────────────────────────────────────────────────────────────────────── */

// Add JS class to html element
document.documentElement.classList.add('js');

const motionToggleBtn = document.querySelector('.motion-toggle');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let userMotionChoice = localStorage.getItem('motion') || 'on';

function setMotionState(state) {
  const isOff = state === 'off';
  document.documentElement.dataset.motion = isOff ? 'off' : 'on';
  if (motionToggleBtn) {
    motionToggleBtn.setAttribute('aria-pressed', isOff ? 'true' : 'false');
    motionToggleBtn.textContent = `Animaciones: ${isOff ? 'OFF' : 'ON'}`;
  }

  if (isOff) {
    // Detener animaciones JS/CSS y limpiar estilos transitorios
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
    if (typeof gsap !== 'undefined') {
      gsap.killTweensOf('*');
      gsap.globalTimeline.clear();
    }
    const resetSelectors = [
      '.hero-el', '.statsbar', '.reveal', '.rate-value', '.class-chip', '.cd-unit',
      '.crusader-img', '.crusader-cta', '.crusader-stat', '.siege-stat', '.news-card',
      '.speed-point', '.download-step', '.feature-item'
    ];
    document.querySelectorAll(resetSelectors.join(',')).forEach(el => {
      el.style.removeProperty('transform');
      el.style.removeProperty('opacity');
      el.style.removeProperty('transition-delay');
      el.style.removeProperty('animation');
    });
    // Limpiar elementos decorativos con animación
    const clearNodes = selector => document.querySelectorAll(selector).forEach(n => n.remove());
    clearNodes('#embers .ember');
    clearNodes('#runes .rune');
  } else {
    // Rehidratar decorativos y animaciones cuando se vuelve a activar
    if (typeof buildEmbers === 'function') buildEmbers();
    if (typeof buildRunes === 'function') buildRunes();
    if (typeof initGsapAnimations === 'function') initGsapAnimations();
  }

  if (isOff && typeof cancelAnimationFrame !== 'undefined' && animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  } else if (!isOff && !animationId && canvas) {
    initParticles();
    animateParticles();
  }
}

function motionAllowed() {
  return document.documentElement.dataset.motion !== 'off';
}

function toggleMotion() {
  const next = motionAllowed() ? 'off' : 'on';
  userMotionChoice = next;
  localStorage.setItem('motion', next);
  setMotionState(next);
}

prefersReduced.addEventListener('change', (e) => {
  const stored = localStorage.getItem('motion');
  if (stored) {
    setMotionState(stored);
  } else {
    setMotionState(e.matches ? 'off' : 'on');
  }
});

/* ── NAV SCROLL ────────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (window.scrollY > 44) {
    nav.classList.add('solid');
  } else {
    nav.classList.remove('solid');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // Check on load

/* ── MOBILE DRAWER ─────────────────────────────────────────────────────── */
const drawer = document.getElementById('drawer');

function toggleDrawer() {
  drawer.classList.toggle('open');
  const isOpen = drawer.classList.contains('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  const toggler = document.querySelector('.nav-tog');
  if (toggler) toggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Close drawer on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) {
    toggleDrawer();
  }
});

/* ── SCROLL REVEAL ─────────────────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.07,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ── SMOOTH SCROLL ─────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── CANVAS PARTICLES ──────────────────────────────────────────────────── */
let canvas = document.getElementById('particles');
let ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
let animationId = null;

// Particle colors (gold, blood, jade, teal)
const colors = [
  'rgba(196, 144, 48, 0.6)',
  'rgba(192, 48, 48, 0.5)',
  'rgba(42, 170, 74, 0.5)',
  'rgba(42, 144, 144, 0.5)'
];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.dx = (Math.random() - 0.5) * 0.4;
    this.dy = -Math.random() * 0.4 - 0.2; // Float upward
    this.alpha = Math.random() * 0.5 + 0.2;
    this.alphaChange = Math.random() * 0.003 + 0.001;
    this.alphaDirection = 1;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Alpha fade in/out
    if (this.alphaDirection === 1) {
      this.alpha += this.alphaChange;
      if (this.alpha >= 0.7) this.alphaDirection = -1;
    } else {
      this.alpha -= this.alphaChange;
      if (this.alpha <= 0.1) this.alphaDirection = 1;
    }

    // Reset if out of bounds
    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
      this.reset();
      this.y = canvas.height + 10;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particles = [];
  const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 25000));

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  animationId = requestAnimationFrame(animateParticles);
}

// inicializar estado de movimiento
setMotionState(userMotionChoice === 'off' || prefersReduced.matches ? 'off' : 'on');

// Initialize particles
if (canvas && motionAllowed()) {
  initParticles();
  animateParticles();

  // Resize handler
  window.addEventListener('resize', () => {
    if (!motionAllowed()) return;
    if (animationId) cancelAnimationFrame(animationId);
    initParticles();
    animateParticles();
  }, { passive: true });
}

/* ── ONLINE COUNTER ────────────────────────────────────────────────────── */
let onlineCount = 1312;
const onlineEls = document.querySelectorAll('[data-online]');

setInterval(() => {
  const delta = Math.floor(Math.random() * 13) - 6; // -6 to +6
  onlineCount = Math.max(900, Math.min(1700, onlineCount + delta));

  onlineEls.forEach(el => {
    if (!motionAllowed()) {
      el.textContent = onlineCount.toLocaleString();
      el.style.transition = 'none';
      el.style.opacity = '1';
      return;
    }
    // Fade out/in effect on update
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '0.5';

    setTimeout(() => {
      el.textContent = onlineCount.toLocaleString();
      el.style.opacity = '1';
    }, 150);
  });
}, 4500);

/* ── ACTIVE NAV LINK ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  // Update nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('current');
    }
  });

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
