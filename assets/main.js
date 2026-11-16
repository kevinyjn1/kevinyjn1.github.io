/* =================================================================
   main.js — everything that moves on the site.
   Each block below is independent; if a page doesn't have the
   element a block needs, that block just skips itself.
   ================================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- theme toggle (dark / light, remembered) ---------- */
(function theme() {
  const btn = document.querySelector('.theme-btn');
  const root = document.documentElement;
  const paint = () => { if (btn) btn.textContent = root.dataset.theme === 'light' ? '☾' : '☀'; };
  paint();
  if (!btn) return;
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    paint();
  });
})();

/* ---------- nav: frosted after scrolling, scroll progress bar ---------- */
(function nav() {
  const nav = document.querySelector('nav');
  const bar = document.querySelector('.progress');
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    if (bar) {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  const btn = document.querySelector('.menu-btn');
  const links = document.getElementById('nl');
  if (btn && links) {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // highlight the section you're reading
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }
})();

/* ---------- fade things up as they scroll into view ---------- */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); revealObserver.unobserve(e.target); }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
window.__revealObserver = revealObserver;   // blog.js uses this

/* ---------- typing rotator in the hero ---------- */
(function rotator() {
  const el = document.querySelector('.rotator');
  if (!el) return;
  const words = JSON.parse(el.dataset.words || '[]');
  if (!words.length) return;
  if (reduceMotion) { el.textContent = words[0]; return; }
  let w = 0, i = 0, deleting = false;
  const tick = () => {
    const word = words[w];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let wait = deleting ? 30 : 65;
    if (!deleting && i === word.length) { deleting = true; wait = 1800; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; wait = 300; }
    setTimeout(tick, wait);
  };
  tick();
})();

/* ---------- count-up numbers ---------- */
(function counters() {
  const nums = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => entries.forEach(e => {
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

/* ---------- project cards: mouse glow + filters ---------- */
(function cards() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
  const filters = document.querySelectorAll('.filter');
  const all = [...document.querySelectorAll('.proj-grid .card')];
  const matches = (c, k) => k === 'all' || (c.dataset.cat || '').split(' ').includes(k);
  filters.forEach(f => {
    const s = document.createElement('span');
    s.className = 'n'; s.textContent = all.filter(c => matches(c, f.dataset.filter)).length;
    f.appendChild(s);
    f.addEventListener('click', () => {
      filters.forEach(x => x.classList.toggle('on', x === f));
      all.forEach(c => c.classList.toggle('hide', !matches(c, f.dataset.filter)));
    });
  });
})();

/* ---------- project cards: play a short clip while hovered ---------- */
(function hoverClips() {
  if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.card').forEach(card => {
    const v = card.querySelector('video[data-src]');
    if (!v) return;
    card.addEventListener('pointerenter', () => {
      if (!v.src) v.src = v.dataset.src;
      v.classList.add('on'); v.play().catch(() => {});
    });
    card.addEventListener('pointerleave', () => { v.classList.remove('on'); v.pause(); });
  });
})();

/* ---------- portrait tilts toward the mouse ---------- */
(function tilt() {
  const p = document.querySelector('.portrait');
  if (!p || reduceMotion) return;
  p.addEventListener('pointermove', e => {
    const r = p.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    p.style.setProperty('--ry', `${x * 10}deg`);
    p.style.setProperty('--rx', `${-y * 10}deg`);
  });
  p.addEventListener('pointerleave', () => { p.style.setProperty('--rx', '0deg'); p.style.setProperty('--ry', '0deg'); });
})();

/* ---------- copy email button ---------- */
(function copyEmail() {
  const btn = document.querySelector('.copy-email');
  const toast = document.querySelector('.toast');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try { await navigator.clipboard.writeText(email); } catch (e) { location.href = 'mailto:' + email; return; }
    if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1600); }
  });
})();

/* ---------- hero: a 3D point cloud that morphs between shapes ----------
   Sphere -> torus -> double helix -> sphere ... It rotates slowly and
   leans toward your mouse. Plain canvas, no libraries.              */
(function field() {
  const canvas = document.getElementById('field');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const N = innerWidth < 760 ? 560 : 1100;
  let W, H, DPR, cx, cy, scale;

  const resize = () => {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const wide = W > 900;
    cx = wide ? W * 0.74 : W * 0.62;
    cy = wide ? H * 0.48 : H * 0.30;
    scale = Math.min(W, H) * (wide ? 0.30 : 0.34);
  };
  resize();
  addEventListener('resize', resize);

  // each shape is N points [x, y, z] roughly inside [-1, 1]
  const golden = Math.PI * (3 - Math.sqrt(5));
  const sphere = Array.from({ length: N }, (_, i) => {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = golden * i;
    return [Math.cos(t) * r, y, Math.sin(t) * r];
  });
  const torus = Array.from({ length: N }, (_, i) => {
    const u = (i / N) * Math.PI * 2 * 23, v = (i / N) * Math.PI * 2;
    return [(.72 + .3 * Math.cos(u)) * Math.cos(v), .3 * Math.sin(u), (.72 + .3 * Math.cos(u)) * Math.sin(v)];
  });
  const helix = Array.from({ length: N }, (_, i) => {
    const strand = i % 3, t = (i / N) * Math.PI * 7 - Math.PI * 3.5, y = t / 3.6;
    if (strand === 2) { const k = ((i * 7919) % 200) / 100 - 1; return [Math.cos(t) * .55 * k, y, Math.sin(t) * .55 * k]; }
    const a = t + strand * Math.PI;
    return [Math.cos(a) * .55, y, Math.sin(a) * .55];
  });
  const shapes = [sphere, torus, helix];

  const pts = sphere.map(p => p.slice());
  let from = 0, to = 0, morphT = 1, lastSwitch = performance.now();
  let rotY = 0, tx = 0, ty = 0, mx = 0, my = 0, px = -9999, py = -9999;
  const rotX0 = -0.35;
  const offX = new Float32Array(N), offY = new Float32Array(N);   // scatter offsets
  let burst = 0;                                                   // click shockwave

  addEventListener('pointermove', e => {
    mx = e.clientX / innerWidth - .5;
    my = e.clientY / innerHeight - .5;
    const r = canvas.getBoundingClientRect();
    px = e.clientX - r.left; py = e.clientY - r.top;
  }, { passive: true });
  document.addEventListener('pointerleave', () => { px = py = -9999; });
  canvas.closest('.hero')?.addEventListener('pointerdown', e => {
    if (e.target.closest('a, button')) return;
    burst = 1;
  });

  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  let colA = css('--accent') || '#ffcb05', colB = css('--ink') || '#eceef4';
  new MutationObserver(() => { colA = css('--accent'); colB = css('--ink'); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  const draw = now => {
    requestAnimationFrame(draw);
    if (!visible || document.hidden) return;

    if (!reduceMotion && now - lastSwitch > 6500) {
      from = to; to = (to + 1) % shapes.length; morphT = 0; lastSwitch = now;
    }
    if (morphT < 1) morphT = Math.min(1, morphT + 0.011);
    const k = ease(morphT), A = shapes[from], B = shapes[to];

    if (!reduceMotion) rotY += 0.0028;
    tx += (mx * 0.9 - tx) * 0.05; ty += (my * 0.6 - ty) * 0.05;
    const ry = rotY + tx, rx = rotX0 + ty;
    const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx);

    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < N; i++) {
      const p = pts[i], a = A[i], b = B[i];
      p[0] = a[0] + (b[0] - a[0]) * k;
      p[1] = a[1] + (b[1] - a[1]) * k;
      p[2] = a[2] + (b[2] - a[2]) * k;
      let x = p[0] * cY - p[2] * sY, z = p[0] * sY + p[2] * cY, y = p[1];
      const y2 = y * cX - z * sX; z = y * sX + z * cX; y = y2;
      const persp = 2.6 / (2.6 + z);
      const depth = (1 - z) / 2;                 // 0 = far, 1 = near
      const hot = i % 7 === 0;
      ctx.globalAlpha = 0.10 + depth * 0.75;
      ctx.fillStyle = hot ? colA : colB;
      const s = (hot ? 2.3 : 1.4) * persp;
      let sx = cx + x * scale * persp, sy = cy + y * scale * persp;
      // dots scatter away from the mouse, then drift back
      const dx = sx - px, dy = sy - py, d2 = dx * dx + dy * dy, R = 120;
      let gx = 0, gy = 0;
      if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 46; gx = dx / d * f; gy = dy / d * f; }
      if (burst > 0) { const d = Math.hypot(sx - cx, sy - cy) || 1; gx += (sx - cx) / d * burst * 140; gy += (sy - cy) / d * burst * 140; }
      offX[i] += (gx - offX[i]) * 0.12; offY[i] += (gy - offY[i]) * 0.12;
      ctx.fillRect(sx + offX[i], sy + offY[i], s, s);
    }
    ctx.globalAlpha = 1;
    if (burst > 0) burst = Math.max(0, burst - 0.04);
  };
  requestAnimationFrame(draw);
})();

/* =================================================================
   EXTRA MOTION
   Patterns borrowed from well-loved portfolios: a custom cursor,
   a mouse spotlight, letter-by-letter titles, scramble text,
   magnetic buttons and scroll-linked effects.
   ================================================================= */
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- hero name: split into letters that rise in ---------- */
(function splitTitle() {
  const h = document.querySelector('.split');
  if (!h) return;
  let i = 0;
  h.querySelectorAll('.line').forEach(line => {
    const text = line.textContent; line.textContent = '';
    [...text].forEach(c => {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i++);
      line.appendChild(s);
    });
  });
  requestAnimationFrame(() => h.classList.add('go'));
})();

/* ---------- custom cursor + page spotlight ---------- */
(function cursor() {
  const spot = document.querySelector('.spotlight');
  if (!finePointer || reduceMotion) return;
  const dot = document.createElement('div'), ring = document.createElement('div');
  dot.className = 'cursor-dot'; ring.className = 'cursor-ring';
  ring.innerHTML = '<span>VIEW</span>';
  document.body.append(dot, ring);
  document.documentElement.classList.add('has-cursor');
  let x = -100, y = -100, rx = -100, ry = -100;
  addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (spot) { spot.style.setProperty('--sx', x + 'px'); spot.style.setProperty('--sy', y + 'px'); }
    const card = e.target.closest('.card');
    ring.classList.toggle('view', !!(card && card.querySelector('a.cover')));
    ring.classList.toggle('link', !card && !!e.target.closest('a, button'));
  }, { passive: true });
  addEventListener('pointerdown', () => ring.classList.add('down'));
  addEventListener('pointerup', () => ring.classList.remove('down'));
  document.addEventListener('pointerleave', () => { x = y = -100; dot.style.transform = 'translate3d(-100px,-100px,0)'; });
  (function loop() {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  })();
})();

/* ---------- magnetic buttons: they lean toward the cursor ---------- */
(function magnetic() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll('.btn, .nav-cta, .theme-btn, .filter').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
})();

/* ---------- section titles decode like a terminal ---------- */
(function scramble() {
  const glyphs = '!<>-_\\/[]{}=+*^?#01';
  const titles = document.querySelectorAll('.section-title');
  if (reduceMotion || !titles.length) return;
  const run = el => {
    const final = el.textContent;
    el.dataset.scrambling = '';
    let frame = 0;
    const total = 26;
    const tick = () => {
      let out = '';
      for (let i = 0; i < final.length; i++) {
        const settleAt = (i / final.length) * total * 0.7 + 6;
        if (frame >= settleAt || final[i] === ' ') out += final[i];
        else out += `<span class="scr">${glyphs[(Math.random() * glyphs.length) | 0].replace('<', '&lt;').replace('>', '&gt;')}</span>`;
      }
      el.innerHTML = out;
      if (++frame <= total) requestAnimationFrame(tick);
      else { el.textContent = final; delete el.dataset.scrambling; }
    };
    tick();
  };
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
  }), { threshold: 0.6 });
  titles.forEach(t => io.observe(t));
})();

/* ---------- scroll-linked: hero drifts away, timeline fills, marquee leans ---------- */
(function scrollFx() {
  if (reduceMotion) return;
  const heroWrap = document.querySelector('.hero .wrap');
  const canvas = document.getElementById('field');
  const tl = document.querySelector('.timeline');
  const track = document.querySelector('.marquee-track');
  let lastY = scrollY, skew = 0, ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    if (heroWrap && y < vh * 1.2) {
      const p = Math.min(1, y / vh);
      heroWrap.style.transform = `translateY(${y * 0.25}px)`;
      heroWrap.style.opacity = String(1 - p * 1.1);
      if (canvas) canvas.style.transform = `translateY(${y * 0.45}px) scale(${1 + p * 0.15})`;
    }
    if (tl) {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      tl.style.setProperty('--tl', p.toFixed(3));
    }
    if (track) {
      skew += ((y - lastY) * 0.15 - skew) * 0.3;
      skew = Math.max(-8, Math.min(8, skew));
      track.style.setProperty('--skew', skew.toFixed(2) + 'deg');
      clearTimeout(update.t); update.t = setTimeout(() => track.style.setProperty('--skew', '0deg'), 120);
    }
    lastY = y;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();
