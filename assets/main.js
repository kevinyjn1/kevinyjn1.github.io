/* =================================================================
   Kevin Na: site behavior
   - page fades in once it's loaded
   - the home page's moving point cloud (the "field")
   - sections fade in once as you reach them
   - project footage plays when it scrolls into view (or on hover)
   - the light that follows your cursor on tiles and cards
   - number count-ups (used on the OneFlip page)
   - copy-email button
   ================================================================= */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* entrance */
requestAnimationFrame(() => document.documentElement.classList.add('ready'));

/* ---------- THE FIELD ----------
   About 1,500 points start as random noise and travel in straight lines
   to a 3D shape, then on to the next shape: the idea behind rectified flow.
   Points near your cursor get pushed aside.
   To change the shapes, edit SHAPES below. */
(function field() {
  const cvs = document.querySelector('.field');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  const small = innerWidth < 700;
  const N = small ? 700 : 1500;
  const TAU = Math.PI * 2;
  const rnd = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); };

  const SHAPES = [
    // a trefoil knot, drawn as a thick tube of points
    i => { const t = (i / N) * TAU, r = 0.055;
           const x = Math.sin(t) + 2 * Math.sin(2 * t), y = Math.cos(t) - 2 * Math.cos(2 * t), z = -Math.sin(3 * t);
           return [x / 2.6 + rnd() * r, y / 2.6 + rnd() * r, z / 2.6 + rnd() * r]; },
    // a sphere, points spread evenly
    i => { const k = i + .5, phi = Math.acos(1 - 2 * k / N), th = Math.PI * (1 + Math.sqrt(5)) * k;
           return [Math.cos(th) * Math.sin(phi), Math.cos(phi), Math.sin(th) * Math.sin(phi)]; },
    // a rippled sheet, like a depth camera's view of a surface
    i => { const s = Math.ceil(Math.sqrt(N)), gx = (i % s) / s * 1.9 - .95, gz = Math.floor(i / s) / s * 1.9 - .95;
           return [gx, .24 * Math.sin(gx * 4) * Math.cos(gz * 3.2), gz]; },
  ];

  const from = new Float32Array(N * 3), to = new Float32Array(N * 3), cur = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) from[i] = rnd() * 1.4;
  let shape = 0;
  const setTarget = s => { for (let i = 0; i < N; i++) { const p = SHAPES[s](i); to[i * 3] = p[0]; to[i * 3 + 1] = p[1]; to[i * 3 + 2] = p[2]; } };
  setTarget(0);

  // glowing dot sprites: maize (near), pale blue (middle) and blue (far)
  const sprite = (r, g, b) => {
    const c = document.createElement('canvas'); c.width = c.height = 32;
    const x = c.getContext('2d'), gr = x.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, `rgba(${r},${g},${b},1)`); gr.addColorStop(.25, `rgba(${r},${g},${b},.55)`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    x.fillStyle = gr; x.fillRect(0, 0, 32, 32); return c;
  };
  const NEAR = sprite(255, 210, 60), MID = sprite(190, 208, 255), FAR = sprite(95, 135, 255);

  let W, H, dpr;
  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cvs.clientWidth; H = cvs.clientHeight;
    cvs.width = W * dpr; cvs.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size(); addEventListener('resize', size);

  const mouse = { x: -9999, y: -9999, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { const r = cvs.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; });
  addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const FLOW = 2600, HOLD = 6500;
  let t0 = performance.now(), rot = 0, tilt = .35, yaw = 0, running = true;

  function draw(now) {
    const wide = W > 900;
    const cx = wide ? W * .7 : W * .5, cy = wide ? H * .5 : H * .3;
    const scale = Math.min(W, H) * (wide ? .3 : .34);
    let p = Math.min(1, (now - t0) / FLOW);
    if (reduceMotion) p = 1;
    const e = ease(p);
    for (let i = 0; i < N * 3; i++) cur[i] = from[i] + (to[i] - from[i]) * e;   // a straight line from start to target
    if (!reduceMotion && now - t0 > FLOW + HOLD) {                               // move on to the next shape
      from.set(cur); shape = (shape + 1) % SHAPES.length; setTarget(shape); t0 = now;
    }
    rot += reduceMotion ? 0 : .0025;
    yaw += (mouse.tx * .6 - yaw) * .04; tilt += ((.35 + mouse.ty * .5) - tilt) * .04;
    const ca = Math.cos(rot + yaw), sa = Math.sin(rot + yaw), ct = Math.cos(tilt), st = Math.sin(tilt);

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < N; i++) {
      let x = cur[i * 3], y = cur[i * 3 + 1], z = cur[i * 3 + 2];
      const x1 = x * ca + z * sa, z1 = -x * sa + z * ca;            // spin around the vertical axis
      const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;          // tilt toward you
      const persp = 3 / (3 + z2);
      let sx = cx + x1 * scale * persp, sy = cy + y2 * scale * persp;
      const dx = sx - mouse.x, dy = sy - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 16000) { const d = Math.sqrt(d2) || 1, f = (1 - d / 126) * 34; sx += dx / d * f; sy += dy / d * f; }
      const near = (1 - z2) / 2;                                    // 0 far .. 1 near
      const s = (2.2 + near * 3.4) * persp;
      ctx.globalAlpha = .25 + near * .6;
      ctx.drawImage(near > .66 ? NEAR : near > .42 ? MID : FAR, sx - s * 2, sy - s * 2, s * 4, s * 4);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (running && !reduceMotion) requestAnimationFrame(draw);
  }

  // only animate while the hero is on screen and the tab is visible
  let inView = true;
  const update = () => {
    const was = running; running = inView && !document.hidden;
    if (running && !was && !reduceMotion) requestAnimationFrame(draw);
  };
  new IntersectionObserver(([en]) => { inView = en.isIntersecting; update(); }).observe(cvs);
  document.addEventListener('visibilitychange', update);
  requestAnimationFrame(draw);
})();

/* reveal on scroll (blog.js also uses this) */
const revealObserver = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); revealObserver.unobserve(e.target); }
}), { rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
window.__revealObserver = revealObserver;

/* project footage: plays while a tile or card is on screen.
   Clips are small (under 200 KB each). */
(function clips() {
  if (reduceMotion) return;
  const boxes = [...document.querySelectorAll('.tile, .card')].filter(b => b.querySelector('video[data-src]'));
  const play = b => { const v = b.querySelector('video'); if (!v.src) v.src = v.dataset.src; v.play().then(() => b.classList.add('playing')).catch(() => {}); };
  const stop = b => { const v = b.querySelector('video'); v.pause(); b.classList.remove('playing'); };
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? play(e.target) : stop(e.target)), { threshold: .45 });
  boxes.forEach(b => io.observe(b));
})();

/* the light that follows your cursor */
(function glow() {
  if (!matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.tile, .card').forEach(el => el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));
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
