/* shared site behavior: mobile menu close + scroll-reveal */
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    const nl = document.getElementById('nl');
    if (nl) nl.classList.remove('open');
  })
);

window.__revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => window.__revealObserver.observe(el));
