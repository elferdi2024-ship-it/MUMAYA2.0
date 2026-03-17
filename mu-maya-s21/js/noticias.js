/* ═══════════════════════════════════════════════════════════
   MU MAYA S21 — NOTICIAS.JS
   Filtros, load more y newsletter
   ═══════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────
// Datos de noticias adicionales (para load more)
// ───────────────────────────────────────────────────────────
const additionalNews = [
  {
    id: 7,
    category: 'patch',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    title: 'Hotfix 21.3.1: Corrección de bugs críticos',
    excerpt: 'Solucionamos problemas de conexión en Castle Siege y ajustamos el drop rate en Kanturu.',
    date: 'Marzo 5, 2025',
  },
  {
    id: 8,
    category: 'event',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80',
    title: 'Evento Golden Invasion: Sábado 22 de Marzo',
    excerpt: 'Los monstruos dorados invaden el continente. Doble drop y EXP durante 4 horas.',
    date: 'Marzo 3, 2025',
  },
  {
    id: 9,
    category: 'speed',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&q=80',
    title: 'Fecha oficial de apertura del Speed Server',
    excerpt: 'Confirmamos el 5 de Abril a las 18:00 hs GMT-3. Preparate para la competencia.',
    date: 'Marzo 1, 2025',
  },
  {
    id: 10,
    category: 'siege',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80',
    title: 'Resultados Castle Siege: Guild MAYA campeona',
    excerpt: 'La guild MAYA se corona campeona tras una batalla épica contra AZTEC.',
    date: 'Febrero 28, 2025',
  },
  {
    id: 11,
    category: 'patch',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    title: 'Preview 21.4: Nueva clase en camino',
    excerpt: 'Adelantamos detalles de la próxima actualización mayor que llega en Mayo.',
    date: 'Febrero 25, 2025',
  },
  {
    id: 12,
    category: 'event',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80',
    title: 'Evento de Carnaval: Máscaras y premios exclusivos',
    excerpt: 'Participá del evento temático y obtené items cosméticos únicos.',
    date: 'Febrero 20, 2025',
  },
];

// ───────────────────────────────────────────────────────────
// Filtros de categorías
// ───────────────────────────────────────────────────────────
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card-large, .news-card-small');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter news cards
      newsCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          
          // Animate in
          gsap.fromTo(card, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ───────────────────────────────────────────────────────────
// Load More functionality
// ───────────────────────────────────────────────────────────
let loadedCount = 7;
let isLoading = false;

function initLoadMore() {
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!loadMoreBtn) return;
  
  loadMoreBtn.addEventListener('click', loadMoreNews);
}

function loadMoreNews() {
  if (isLoading) return;
  isLoading = true;
  
  const loadMoreBtn = document.getElementById('load-more-btn');
  const newsGrid = document.querySelector('.news-grid');
  
  // Show loading state
  loadMoreBtn.innerHTML = `
    <i data-lucide="loader" width="16" height="16" style="margin-right: 8px; vertical-align: middle; animation: spin 1s linear infinite;"></i>
    Cargando...
  `;
  lucide.createIcons();
  
  // Simulate API call
  setTimeout(() => {
    const newsToLoad = additionalNews.slice(0, 3);
    
    newsToLoad.forEach((news, index) => {
      const article = document.createElement('article');
      article.className = 'news-card-small';
      article.setAttribute('data-category', news.category);
      article.style.display = 'none';
      
      const categoryDot = getCategoryDot(news.category);
      
      article.innerHTML = `
        <img src="${news.image}" alt="${news.title}" class="news-image-small">
        <div class="news-category">
          ${categoryDot}
          ${getCategoryName(news.category)}
        </div>
        <h3 class="news-title">${news.title}</h3>
        <div class="news-meta" style="margin-top: auto; padding-top: 12px;">
          <span class="t-caption">${news.date}</span>
        </div>
      `;
      
      newsGrid.appendChild(article);
      
      // Animate in
      gsap.fromTo(article,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: 'power2.out',
          delay: index * 0.1,
          onComplete: () => {
            article.style.display = 'flex';
            article.style.flexDirection = 'column';
          }
        }
      );
    });
    
    loadedCount += 3;
    isLoading = false;
    
    // Update button or hide
    if (loadedCount >= additionalNews.length + 7) {
      loadMoreBtn.innerHTML = `
        <i data-lucide="check" width="16" height="16" style="margin-right: 8px; vertical-align: middle;"></i>
        Todas las noticias cargadas
      `;
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.6';
      loadMoreBtn.style.cursor = 'not-allowed';
    } else {
      loadMoreBtn.innerHTML = `
        Cargar más noticias
        <i data-lucide="arrow-down" width="16" height="16" style="margin-left: 8px; vertical-align: middle;"></i>
      `;
    }
    
    lucide.createIcons();
  }, 1200);
}

function getCategoryDot(category) {
  const dots = {
    speed: '<span class="news-dot speed"></span>',
    siege: '<span class="news-dot siege"></span>',
    patch: '<span class="news-dot patch"></span>',
    event: '<span class="news-dot event"></span>',
    maintenance: '<span class="news-dot patch"></span>',
  };
  return dots[category] || '<span class="news-dot patch"></span>';
}

function getCategoryName(category) {
  const names = {
    speed: 'Speed Server',
    siege: 'Castle Siege',
    patch: 'Patch Notes',
    event: 'Eventos',
    maintenance: 'Mantenimiento',
  };
  return names[category] || category;
}

// ───────────────────────────────────────────────────────────
// Newsletter Form
// ───────────────────────────────────────────────────────────
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = form.querySelector('.newsletter-input');
    const email = emailInput.value;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate email
    if (!isValidEmail(email)) {
      showNotification('Por favor ingresá un email válido', 'error');
      return;
    }
    
    // Show loading state
    submitBtn.innerHTML = `
      <i data-lucide="loader" width="16" height="16" style="margin-right: 8px; animation: spin 1s linear infinite;"></i>
      Enviando...
    `;
    lucide.createIcons();
    
    // Simulate API call
    setTimeout(() => {
      showNotification('¡Gracias por suscribirte! Revisá tu email para confirmar.', 'success');
      form.reset();
      
      submitBtn.innerHTML = `
        <i data-lucide="check" width="16" height="16" style="margin-right: 8px;"></i>
        ¡Suscrito!
      `;
      
      setTimeout(() => {
        submitBtn.innerHTML = 'Suscribirme';
      }, 3000);
    }, 1500);
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ───────────────────────────────────────────────────────────
// Notification Toast
// ───────────────────────────────────────────────────────────
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 16px 24px;
    background: ${type === 'success' ? 'var(--jade3)' : type === 'error' ? 'var(--blood3)' : 'var(--stone3)'};
    border: 1px solid ${type === 'success' ? 'var(--b-jade)' : type === 'error' ? 'var(--b-blood)' : 'var(--b-stone)'};
    color: var(--bone);
    font-family: var(--ff-ui);
    font-size: var(--text-sm);
    border-radius: 4px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideInRight 0.4s var(--transition);
  `;
  
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
  
  toast.innerHTML = `
    <i data-lucide="${icon}" width="20" height="20" style="color: ${type === 'success' ? 'var(--jade4)' : type === 'error' ? 'var(--blood4)' : 'var(--gold3)'}"></i>
    ${message}
  `;
  
  document.body.appendChild(toast);
  lucide.createIcons();
  
  // Auto remove
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.4s var(--transition)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ───────────────────────────────────────────────────────────
// Initialize
// ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initLoadMore();
  initNewsletter();
});
