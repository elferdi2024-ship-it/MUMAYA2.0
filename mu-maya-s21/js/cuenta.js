/* ═══════════════════════════════════════════════════════════
   MU MAYA S21 — CUENTA.JS
   Validación de formularios, toggle login/registro, password strength
   ═══════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────
// Tab Switching
// ───────────────────────────────────────────────────────────
function initAuthTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  const successMsg = document.getElementById('success-message');
  
  // Check URL hash on load
  const hash = window.location.hash;
  if (hash === '#registro') {
    switchTab('registro');
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
  
  function switchTab(tabName) {
    // Update tabs
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    
    // Update forms
    forms.forEach(f => f.classList.remove('active'));
    document.getElementById(`${tabName}-form`)?.classList.add('active');
    
    // Hide success message
    successMsg?.classList.remove('visible');
    
    // Update URL hash
    window.location.hash = tabName;
  }
}

// ───────────────────────────────────────────────────────────
// Password Strength Calculator
// ───────────────────────────────────────────────────────────
function calculatePasswordStrength(password) {
  let score = 0;
  
  // Length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  
  // Character types
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  return score;
}

function getPasswordStrengthLabel(score) {
  if (score <= 2) return { label: 'Débil', class: 'weak' };
  if (score <= 5) return { label: 'Media', class: 'medium' };
  return { label: 'Fuerte', class: 'strong' };
}

function initPasswordStrength() {
  const passwordInput = document.getElementById('registro-password');
  const strengthFill = document.getElementById('strength-fill');
  const strengthText = document.getElementById('strength-text');
  
  if (!passwordInput || !strengthFill || !strengthText) return;
  
  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    if (password.length === 0) {
      strengthFill.className = 'strength-fill';
      strengthFill.style.width = '0';
      strengthText.className = 'strength-text';
      strengthText.textContent = '';
      return;
    }
    
    const score = calculatePasswordStrength(password);
    const strength = getPasswordStrengthLabel(score);
    
    strengthFill.className = `strength-fill ${strength.class}`;
    strengthText.className = `strength-text ${strength.class}`;
    strengthText.textContent = strength.label;
  });
}

// ───────────────────────────────────────────────────────────
// Form Validation
// ───────────────────────────────────────────────────────────
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateUsername(username) {
  const re = /^[a-zA-Z0-9]{3,16}$/;
  return re.test(username);
}

function showError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  
  if (input) input.classList.add('error');
  if (error) error.classList.add('visible');
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  
  if (input) input.classList.remove('error');
  if (error) error.classList.remove('visible');
}

function clearAllErrors(form) {
  form.querySelectorAll('.form-error').forEach(e => e.classList.remove('visible'));
  form.querySelectorAll('.form-input').forEach(i => {
    i.classList.remove('error');
    i.classList.add('success');
  });
}

// ───────────────────────────────────────────────────────────
// Login Form Handler
// ───────────────────────────────────────────────────────────
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  
  // Real-time validation
  usernameInput?.addEventListener('blur', () => {
    if (usernameInput.value.trim().length === 0) {
      showError('login-username', 'login-username-error');
    } else {
      clearError('login-username', 'login-username-error');
    }
  });
  
  passwordInput?.addEventListener('blur', () => {
    if (passwordInput.value.length === 0) {
      showError('login-password', 'login-password-error');
    } else {
      clearError('login-password', 'login-password-error');
    }
  });
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate username
    if (usernameInput.value.trim().length === 0) {
      showError('login-username', 'login-username-error');
      isValid = false;
    } else {
      clearError('login-username', 'login-username-error');
    }
    
    // Validate password
    if (passwordInput.value.length === 0) {
      showError('login-password', 'login-password-error');
      isValid = false;
    } else {
      clearError('login-password', 'login-password-error');
    }
    
    if (!isValid) return;
    
    // Simulate login
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <i data-lucide="loader" width="16" height="16" style="margin-right: 8px; animation: spin 1s linear infinite;"></i>
      Iniciando sesión...
    `;
    submitBtn.disabled = true;
    lucide.createIcons();
    
    setTimeout(() => {
      // Simulate success
      submitBtn.innerHTML = `
        <i data-lucide="check" width="16" height="16" style="margin-right: 8px;"></i>
        ¡Bienvenido!
      `;
      submitBtn.style.background = 'linear-gradient(135deg, var(--jade4), var(--jade3))';
      
      setTimeout(() => {
        // Redirect or reload
        alert('Login exitoso (demo). En producción, aquí redirigirías al dashboard.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 1000);
    }, 1500);
  });
}

// ───────────────────────────────────────────────────────────
// Registro Form Handler
// ───────────────────────────────────────────────────────────
function initRegistroForm() {
  const form = document.getElementById('registro-form');
  if (!form) return;
  
  const usernameInput = document.getElementById('registro-username');
  const emailInput = document.getElementById('registro-email');
  const passwordInput = document.getElementById('registro-password');
  const confirmInput = document.getElementById('registro-confirm');
  const termsInput = document.getElementById('registro-terms');
  
  // Real-time validation
  usernameInput?.addEventListener('blur', () => {
    if (!validateUsername(usernameInput.value.trim())) {
      showError('registro-username', 'registro-username-error');
    } else {
      clearError('registro-username', 'registro-username-error');
    }
  });
  
  emailInput?.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value.trim())) {
      showError('registro-email', 'registro-email-error');
    } else {
      clearError('registro-email', 'registro-email-error');
    }
  });
  
  passwordInput?.addEventListener('blur', () => {
    if (passwordInput.value.length < 8) {
      showError('registro-password', 'registro-password-error');
    } else {
      clearError('registro-password', 'registro-password-error');
    }
  });
  
  confirmInput?.addEventListener('blur', () => {
    if (confirmInput.value !== passwordInput.value || confirmInput.value.length === 0) {
      showError('registro-confirm', 'registro-confirm-error');
    } else {
      clearError('registro-confirm', 'registro-confirm-error');
    }
  });
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate username
    if (!validateUsername(usernameInput.value.trim())) {
      showError('registro-username', 'registro-username-error');
      isValid = false;
    } else {
      clearError('registro-username', 'registro-username-error');
    }
    
    // Validate email
    if (!validateEmail(emailInput.value.trim())) {
      showError('registro-email', 'registro-email-error');
      isValid = false;
    } else {
      clearError('registro-email', 'registro-email-error');
    }
    
    // Validate password
    if (passwordInput.value.length < 8) {
      showError('registro-password', 'registro-password-error');
      isValid = false;
    } else {
      clearError('registro-password', 'registro-password-error');
    }
    
    // Validate confirm
    if (confirmInput.value !== passwordInput.value || confirmInput.value.length === 0) {
      showError('registro-confirm', 'registro-confirm-error');
      isValid = false;
    } else {
      clearError('registro-confirm', 'registro-confirm-error');
    }
    
    // Validate terms
    if (!termsInput.checked) {
      alert('Debés aceptar los Términos de Servicio para continuar');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Simulate registration
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <i data-lucide="loader" width="16" height="16" style="margin-right: 8px; animation: spin 1s linear infinite;"></i>
      Creando cuenta...
    `;
    submitBtn.disabled = true;
    lucide.createIcons();
    
    setTimeout(() => {
      // Show success message
      form.style.display = 'none';
      const successMsg = document.getElementById('success-message');
      const successEmail = document.getElementById('success-email');
      
      if (successEmail) successEmail.textContent = emailInput.value;
      if (successMsg) successMsg.classList.add('visible');
      
      // Clear form
      form.reset();
      document.getElementById('strength-fill').className = 'strength-fill';
      document.getElementById('strength-text').textContent = '';
    }, 2000);
  });
}

// ───────────────────────────────────────────────────────────
// Add spin animation
// ───────────────────────────────────────────────────────────
function addSpinAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// ───────────────────────────────────────────────────────────
// Initialize
// ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  addSpinAnimation();
  initAuthTabs();
  initPasswordStrength();
  initLoginForm();
  initRegistroForm();
});
