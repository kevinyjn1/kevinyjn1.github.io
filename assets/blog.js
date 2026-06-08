/* =================================================================
   blog.js — post registry.
   TO ADD A NEW POST:
     1. Copy posts/welcome.html → posts/your-slug.html and edit it.
     2. Add one entry to POSTS below (newest first).
   ================================================================= */

const POSTS = [
  // Add posts here
];

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderPostList(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = POSTS.map(p => `
    <a class="post-item reveal" href="${p.file}">
      <div class="pdate">${fmtDate(p.date)}</div>
      <h3>${p.title}</h3>
      <p>${p.blurb}</p>
      <span class="arrow">Read →</span>
    </a>
  `).join('');
  document.querySelectorAll('.reveal').forEach(n =>
    window.__revealObserver && window.__revealObserver.observe(n)
  );
}
