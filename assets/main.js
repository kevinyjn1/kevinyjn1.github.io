/* =================================================================
   Kevin Na: site behavior (small on purpose)
   - page fades in once it's loaded
   - mobile menu
   - sections fade in once as you reach them
   - project footage plays when you hover a card
   - number count-ups (used on the OneFlip page)
   - copy-email button
   ================================================================= */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* entrance */
requestAnimationFrame(() => document.documentElement.classList.add('ready'));

/* mobile menu */
(function menu() {
  const side = document.querySelector('.side'), btn = document.querySelector('.menu-btn');
  if (!side || !btn) return;
  btn.addEventListener('click', () => {
    const open = side.classList.toggle('open');
    btn.textContent = open ? 'Close' : 'Menu';
    btn.setAttribute('aria-expanded', open);
  });
})();

/* reveal on scroll (blog.js also uses this) */
const revealObserver = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); revealObserver.unobserve(e.target); }
}), { rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
window.__revealObserver = revealObserver;

/* project footage on hover: <video data-src="..."> inside a .card */
(function hoverClips() {
  if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.card').forEach(c => {
    const v = c.querySelector('video[data-src]');
    if (!v) return;
    c.addEventListener('pointerenter', () => {
      if (!v.src) v.src = v.dataset.src;
      c.classList.add('playing'); v.play().catch(() => {});
    });
    c.addEventListener('pointerleave', () => { c.classList.remove('playing'); v.pause(); });
  });
})();

/* count-ups: <span data-count="48" data-suffix="%"> */
(function counters() {
  const nums = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || '';
    io.unobserve(el);
    if (reduceMotion) { el.textContent = end + suffix; return; }
    const t0 = performance.now(), dur = 1200;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }));
  nums.forEach(n => io.observe(n));
})();

/* copy email */
(function copyEmail() {
  const toast = document.querySelector('.toast');
  document.querySelectorAll('[data-email]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.email); } catch (e) { return; }
    if (toast) { toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 1600); }
  }));
})();
