/* ═══════════════════════════════════════════════════════════
   MU MAYA S21 — CORE.JS
   Three.js + Lenis + GSAP + ScrollTrigger + Partículas 3D
   ═══════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────
   1. NAV SCROLL — Glass effect on scroll
   ─────────────────────────────────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;
  
  function onScroll() {
    const current = window.scrollY;
    
    if (current > 44) {
      nav.classList.add('solid');
    } else {
      nav.classList.remove('solid');
    }
    
    lastScroll = current;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ───────────────────────────────────────────────────────────
   2. MOBILE DRAWER
   ─────────────────────────────────────────────────────────── */
function toggleDrawer() {
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-overlay');
  
  if (!drawer || !overlay) return;
  
  const isOpen = drawer.classList.contains('open');
  
  if (isOpen) {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  } else {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close drawer on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.nav-overlay');
  if (overlay) {
    overlay.addEventListener('click', toggleDrawer);
  }
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.querySelector('.nav-drawer');
      if (drawer?.classList.contains('open')) {
        toggleDrawer();
      }
    }
  });
});

/* ───────────────────────────────────────────────────────────
   3. SCROLL REVEAL — Intersection Observer
   ─────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.07,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ───────────────────────────────────────────────────────────
   4. SMOOTH SCROLL — Anchor links
   ─────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ───────────────────────────────────────────────────────────
   5. ONLINE COUNTER — Fluctuating players
   ─────────────────────────────────────────────────────────── */
function initOnlineCounter() {
  let count = 1312;
  const counters = document.querySelectorAll('[data-online]');
  if (!counters.length) return;

  function updateCounter() {
    const change = Math.floor(Math.random() * 13) - 6; // -6 to +6
    count = Math.max(900, Math.min(1700, count + change));
    
    counters.forEach(el => {
      el.textContent = count.toLocaleString();
    });
  }

  setInterval(updateCounter, 4500);
}

/* ───────────────────────────────────────────────────────────
   6. ACTIVE NAV LINK — Based on current page
   ─────────────────────────────────────────────────────────── */
function initActiveNav() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('current');
    }
  });
}

/* ───────────────────────────────────────────────────────────
   7. LENIS SMOOTH SCROLL — Premium smooth scrolling
   ─────────────────────────────────────────────────────────── */
function initLenis() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded, using native scroll');
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Sync with GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  window.lenis = lenis;
}

/* ───────────────────────────────────────────────────────────
   8. THREE.JS PARTICLES — 3D Floating Particles
   ─────────────────────────────────────────────────────────── */
function initParticles3D() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, skipping particles');
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle colors (Maya palette)
  const colors = [
    new THREE.Color(0xC49030), // gold
    new THREE.Color(0xD03030), // blood
    new THREE.Color(0x3AAA4A), // jade
    new THREE.Color(0x3A9090), // teal
  ];

  // Create particles
  const particleCount = 80;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colorsArray = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;

    const color = colors[Math.floor(Math.random() * colors.length)];
    colorsArray[i * 3] = color.r;
    colorsArray[i * 3 + 1] = color.g;
    colorsArray[i * 3 + 2] = color.b;

    sizes[i] = Math.random() * 0.5 + 0.2;

    velocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02 - 0.01,
      z: (Math.random() - 0.5) * 0.02,
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Shader material for glowing particles
  const material = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 30;

  // Animation
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.001;

    const positions = geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      // Wrap around
      if (positions[i * 3] > 50) positions[i * 3] = -50;
      if (positions[i * 3] < -50) positions[i * 3] = 50;
      if (positions[i * 3 + 1] > 50) positions[i * 3 + 1] = -50;
      if (positions[i * 3 + 1] < -50) positions[i * 3 + 1] = 50;
      if (positions[i * 3 + 2] > 30) positions[i * 3 + 2] = -70;
      if (positions[i * 3 + 2] < -70) positions[i * 3 + 2] = 30;
    }

    geometry.attributes.position.needsUpdate = true;

    // Gentle rotation
    particles.rotation.y = time * 0.05;
    particles.rotation.x = Math.sin(time * 0.1) * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ───────────────────────────────────────────────────────────
   9. THREE.JS HERO — Maya Pyramid Wireframe
   ─────────────────────────────────────────────────────────── */
function initHeroPyramid() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, skipping pyramid');
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Create stepped pyramid (7 levels)
  const pyramidGroup = new THREE.Group();
  
  const levels = 7;
  for (let i = 0; i < levels; i++) {
    const size = 15 - i * 1.8;
    const height = 2;
    const geometry = new THREE.BoxGeometry(size, height, size);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ 
      color: 0xC49030,
      transparent: true,
      opacity: 0.15 - i * 0.015,
    });
    const lines = new THREE.LineSegments(edges, material);
    lines.position.y = i * height - levels;
    pyramidGroup.add(lines);
  }

  pyramidGroup.position.y = 5;
  pyramidGroup.rotation.y = Math.PI / 4;
  scene.add(pyramidGroup);

  camera.position.z = 25;
  camera.position.y = -5;

  // Animation
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.0005;

    pyramidGroup.rotation.y += 0.001;
    pyramidGroup.position.y = 5 + Math.sin(time) * 0.5;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ───────────────────────────────────────────────────────────
   10. GSAP ANIMATIONS — Hero entrance + ScrollTrigger
   ─────────────────────────────────────────────────────────── */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  // Hero entrance animation
  const heroElements = document.querySelectorAll('.hero-el');
  if (heroElements.length) {
    gsap.from(heroElements, {
      y: 32,
      opacity: 0,
      stagger: 0.12,
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  // Stat counters animation
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length) {
    statValues.forEach(stat => {
      const target = parseFloat(stat.textContent.replace(/,/g, ''));
      if (isNaN(target)) return;
      
      gsap.to(stat, {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat.closest('.stats-bar') || stat.parentElement,
          start: 'top 80%',
        },
        onUpdate: function() {
          stat.textContent = Math.round(this.targets()[0].textContent).toLocaleString();
        }
      });
    });
  }

  // Cards reveal animation
  const cards = document.querySelectorAll('.card, .news-card, .reward-card, .glass-card');
  if (cards.length) {
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      scale: 0.96,
      stagger: 0.08,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: 'top 75%',
      },
    });
  }

  // Milestone bar fill
  const milestoneFill = document.querySelector('.milestone-fill');
  if (milestoneFill) {
    gsap.to(milestoneFill, {
      width: milestoneFill.getAttribute('data-progress') || '75%',
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.milestone-track',
        start: 'top 70%',
      },
    });
  }
}

/* ───────────────────────────────────────────────────────────
   11. SPLIT TYPE — Text reveal animations
   ─────────────────────────────────────────────────────────── */
function initSplitType() {
  if (typeof SplitType === 'undefined') {
    console.warn('SplitType not loaded');
    return;
  }

  const titles = document.querySelectorAll('.split-title, .hero-title');
  if (!titles.length) return;

  titles.forEach(title => {
    const split = new SplitType(title, { types: 'chars' });
    
    gsap.from(split.chars, {
      opacity: 0,
      y: 40,
      rotateX: -90,
      stagger: 0.03,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 0.3,
    });
  });
}

/* ───────────────────────────────────────────────────────────
   12. ACCORDION — FAQ interactions
   ─────────────────────────────────────────────────────────── */
function initAccordion() {
  const accordions = document.querySelectorAll('.accordion-item');
  if (!accordions.length) return;

  accordions.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      accordions.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ───────────────────────────────────────────────────────────
   13. MAGNETIC BUTTONS — Hover effect
   ─────────────────────────────────────────────────────────── */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-speed-cta, .btn-p, .btn-o');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/* ───────────────────────────────────────────────────────────
   INITIALIZATION
   ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  initNavScroll();
  initScrollReveal();
  initSmoothScroll();
  initOnlineCounter();
  initActiveNav();
  initAccordion();
  
  // Enhanced features (with fallbacks)
  initLenis();
  initParticles3D();
  initHeroPyramid();
  initGSAP();
  initSplitType();
  initMagneticButtons();

  // Expose toggleDrawer globally for HTML onclick
  window.toggleDrawer = toggleDrawer;
});

/* ───────────────────────────────────────────────────────────
   UTILITY — Debounce for resize events
   ─────────────────────────────────────────────────────────── */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
