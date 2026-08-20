const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('#navMenu a');
const backToTop = document.getElementById('backToTop');
const brandHome = document.getElementById('brandHome');
const cursorGlow = document.getElementById('cursorGlow');

function closeMenu() {
  navMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

backToTop.addEventListener('click', scrollToTop);
brandHome.addEventListener('click', scrollToTop);

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
} else {
  cursorGlow.style.display = 'none';
}
