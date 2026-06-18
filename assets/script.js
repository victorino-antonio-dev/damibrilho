/* ===== DAMIBRILHO WEBSITE – script.js ===== */

/* --- Scroll Reveal --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* --- Header scroll shadow --- */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 40);
  highlightNav();
}, { passive: true });

/* --- Active nav link on scroll --- */
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* --- Mobile menu toggle --- */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

/* Close mobile menu on outside click */
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* --- FAQ accordion --- */
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* --- WhatsApp form submit --- */
function sendWhatsApp() {
  const name     = document.getElementById('f-name').value.trim();
  const phone    = document.getElementById('f-phone').value.trim();
  const service  = document.getElementById('f-service').value;
  const location = document.getElementById('f-location').value.trim();
  const msg      = document.getElementById('f-msg').value.trim();

  if (!name) { alert('Por favor, preencha o seu nome.'); return; }

  let text = `Olá DamiBrilho!%0A%0ANome: ${encodeURIComponent(name)}`;
  if (phone)    text += `%0ATelefone: ${encodeURIComponent(phone)}`;
  if (service)  text += `%0AServiço: ${encodeURIComponent(service)}`;
  if (location) text += `%0ALocalização: ${encodeURIComponent(location)}`;
  if (msg)      text += `%0AMensagem: ${encodeURIComponent(msg)}`;

  window.open(`https://wa.me/244930583649?text=${text}`, '_blank');
}

/* --- Smooth close mobile menu on link click --- */
document.querySelectorAll('.mobile-menu a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* --- Lazy load images --- */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* --- Price row hover feedback --- */
document.querySelectorAll('.price-row').forEach(row => {
  row.addEventListener('mouseenter', () => row.style.paddingLeft = '28px');
  row.addEventListener('mouseleave', () => row.style.paddingLeft = '');
});

/* --- Back to top on logo click --- */
document.querySelectorAll('.logo-wrap').forEach(logo => {
  logo.addEventListener('click', (e) => {
    if (window.scrollY > 100) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

/* --- Init --- */
highlightNav();
