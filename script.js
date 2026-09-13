const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const emailLink = document.getElementById('emailLink');
const email = atob(emailLink.dataset.email);
emailLink.addEventListener('click', (e) => {
  e.preventDefault();
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
  window.location.href = `mailto:${email}`;
});

const hero = document.getElementById('hero');
const cursorGlow = document.getElementById('cursorGlow');

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  cursorGlow.style.left = `${e.clientX - rect.left}px`;
  cursorGlow.style.top = `${e.clientY - rect.top}px`;
});
