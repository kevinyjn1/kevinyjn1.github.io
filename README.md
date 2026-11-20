# kevinyjn1.github.io

Kevin Na's personal site. Plain HTML, CSS and JavaScript: no build step.
GitHub Pages publishes whatever is on the `main` branch.

Why it looks the way it does: see [DESIGN.md](DESIGN.md).

## How to edit it

Every section of `index.html` starts with a comment like `<!-- ============ RESEARCH ============ -->`, so search for the section name.

| I want to change... | Open this file | Look for |
|---|---|---|
| The one-line intro | `index.html` | `class="lede"` |
| The four highlights next to my name | `index.html` | `class="ledger"`, one `<li>` each |
| Add a paper | `index.html` | copy one `<article class="paper reveal">…</article>` block |
| Add a big project | `index.html` | copy one `<article class="work reveal">…</article>` block. Add `flip` to the class to put the picture on the right |
| Add a small project | `index.html` | copy one `<div class="row reveal">…</div>` block in MORE BUILDS |
| Add a job or award | `index.html` | copy one `<div class="step reveal">…</div>` in PATH. Add `honor` to the class for an award |
| Colors and fonts | `assets/style.css` | the `:root` block at the top |
| Animations | `assets/main.js` | each effect is its own commented block |
| Resume | replace `resume.pdf` with the new file, same name |
| The hero video | replace `assets/hero.mp4` (and `assets/hero.jpg`, its still) |

A big project's picture is `assets/thumbs/<name>.webp`, and the clip that plays on hover is `assets/clips/<name>.mp4`.

## Preview on your laptop

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish

Commit and push to `main`. The live site updates in about a minute.
