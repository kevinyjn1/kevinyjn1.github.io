# kevinyjn1.github.io

Kevin Na's personal site. Plain HTML, CSS and JavaScript: no build step.
GitHub Pages publishes whatever is on the `main` branch.

## How to edit it

| I want to change... | Open this file | Look for |
|---|---|---|
| Any text on the homepage | `index.html` | the section's comment, like `<!-- ============ NEWS ============ -->` |
| Add a news line | `index.html` | copy one `<div class="tl-item reveal">…</div>` block and edit it (add `past` to the class for older items) |
| Add a paper | `index.html` | copy one `<article class="pub reveal">…</article>` block |
| Add a project card | `index.html` | copy one `<article class="card …">` block; `data-cat` picks which filter buttons show it (`robotics`, `ml`, `embedded`, `design`) |
| The words the hero types out | `index.html` | `data-words='[...]'` on the `rotator` line |
| The green "Open to…" line | `index.html` | `status-pill` |
| Colors | `assets/style.css` | the `:root` block at the top (`--accent` is the maize yellow) |
| Animations | `assets/main.js` | each effect is its own commented block |
| Resume | replace `resume.pdf` with the new file, same name |

A project card's picture is `assets/thumbs/<name>.webp`, and the clip that plays on hover is `assets/clips/<name>.mp4`. A card without them uses a text "glyph" instead (see OneFlip).

## Preview on your laptop

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish

Commit and push to `main`. The live site updates in about a minute.
