// ===== TAB SWITCHING =====
function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById('panel-' + tabName).classList.add('active');
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Auto-switch tab based on URL query param
const params = new URLSearchParams(window.location.search);
if (params.get('tab') === 'signup') switchTab('signup');

// Switch to signup tab if nav Sign Up button clicked
const navSignupBtn = document.getElementById('navSignupBtn');
if (navSignupBtn) {
  navSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('signup');
  });
}

// ===== PASSWORD TOGGLE =====
document.querySelectorAll('.toggle-pw').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById(btn.dataset.target);
    const icon  = btn.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
});

// ===== LOGIN FORM =====
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.innerHTML = 'Signing in… <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;
});

// ===== SIGNUP FORM =====
document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  const pwInput  = document.getElementById('signup-password');
  const cpwInput = document.getElementById('signup-confirm');
  if (pwInput.value !== cpwInput.value) {
    cpwInput.style.borderColor = 'var(--red)';
    cpwInput.focus();
    return;
  }
  cpwInput.style.borderColor = '';
  const btn = e.target.querySelector('.btn-submit');
  btn.innerHTML = 'Creating account… <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;
});
