/* =================================================================
   Kevin Na: site behavior (small on purpose)
   - header turns solid after you scroll
   - mobile menu
   - sections fade in once as you reach them
   - project footage plays when you hover it
   - hero footage plays unless the visitor prefers less motion
   - number count-ups (used on the OneFlip page)
   - copy-email button
   ================================================================= */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* header */
(function header() {
  const top = document.querySelector('.top');
  if (!top) return;
  const onScroll = () => top.classList.toggle('scrolled', scrollY > 40);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  const btn = document.querySelector('.menu-btn'), links = document.querySelector('.links');
  if (btn && links) {
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.textContent = open ? 'Close' : 'Menu';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); btn.textContent = 'Menu';
    }));
  }

  // highlight the section you're in
  const navLinks = [...document.querySelectorAll('.links a[href^="#"]')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
})();

/* reveal on scroll (blog.js also uses this) */
const revealObserver = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); revealObserver.unobserve(e.target); }
}), { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
window.__revealObserver = revealObserver;

/* hero footage */
(function hero() {
  const v = document.querySelector('.hero-media video');
  if (!v) return;
  if (reduceMotion) { v.removeAttribute('autoplay'); v.pause(); return; }
  v.play().catch(() => {});
  // pause when scrolled away, to save battery
  new IntersectionObserver(([e]) => e.isIntersecting ? v.play().catch(() => {}) : v.pause()).observe(v);
})();

/* project footage on hover */
(function hoverClips() {
  if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.work').forEach(w => {
    const f = w.querySelector('.frame'), v = f && f.querySelector('video[data-src]');
    if (!v) return;
    w.addEventListener('pointerenter', () => {
      if (!v.src) v.src = v.dataset.src;
      f.classList.add('playing'); v.play().catch(() => {});
    });
    w.addEventListener('pointerleave', () => { f.classList.remove('playing'); v.pause(); });
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
