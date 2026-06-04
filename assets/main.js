/* nav: transparent over hero, frosted after scroll */
const nav = document.querySelector('nav');
const hero = document.querySelector('.hero');

function syncNav() {
  if (!hero) { nav.classList.add('scrolled'); return; }
  if (hero.getBoundingClientRect().bottom <= 0) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', syncNav, { passive: true });
syncNav();

/* mobile menu: close on link click */
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    const nl = document.getElementById('nl');
    if (nl) nl.classList.remove('open');
  })
);

/* scroll reveal */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
window.__revealObserver = revealObserver;
