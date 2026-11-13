// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNav();
});

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;
  sections.forEach(sec => {
    const link = navLinks.querySelector(`a[href="#${sec.id}"]`);
    if (!link) return;
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PARTICLE CANVAS =====
const canvas  = document.getElementById('particleCanvas');
const ctx     = canvas.getContext('2d');
let particles = [];
let W, H;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);
resize();

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function createParticle() {
  return {
    x:     randomBetween(0, W),
    y:     randomBetween(0, H),
    size:  randomBetween(1, 2.5),
    speedX: randomBetween(-0.3, 0.3),
    speedY: randomBetween(-0.6, -0.15),
    alpha:  randomBetween(0.2, 0.7),
    decay:  randomBetween(0.002, 0.005),
  };
}

for (let i = 0; i < 90; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p, idx) => {
    p.x     += p.speedX;
    p.y     += p.speedY;
    p.alpha -= p.decay;
    if (p.alpha <= 0 || p.y < -10) particles[idx] = createParticle();

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle   = '#E32636';
    ctx.beginPath();
    ctx.rect(p.x, p.y, p.size, p.size);
    ctx.fill();
    ctx.restore();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
