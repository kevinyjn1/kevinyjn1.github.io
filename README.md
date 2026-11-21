# kevinyjn1.github.io

Kevin Na's personal site. Plain HTML, CSS and JavaScript: no build step.
GitHub Pages publishes whatever is on the `main` branch.

Why it looks the way it does: see [DESIGN.md](DESIGN.md).

## The pages

| Page | File |
|---|---|
| Home | `index.html` |
| Research (labs and papers) | `research.html` |
| Projects (all cards) | `projects.html` |
| About, timeline, skills, contact | `about.html` |
| One page per project | `projects/<name>.html` |

## How to edit it

Every section starts with a comment like `<!-- ============ PAPERS ============ -->`, so search for the section name.

| I want to change... | Open this file | Look for |
|---|---|---|
| The one-line intro | `index.html` | `class="lede"` |
| The big headline | `index.html` | the `<h1>` in HERO. Words inside `<em>` turn maize |
| The four highlights | `index.html` | SIGNALS, one `<li>` each |
| The three "what I work on" rows | `index.html` | THREE THREADS |
| The picture tiles on the home page | `index.html` | SELECTED WORK. Add `wide` to a tile's class to make it two columns wide |
| Add a paper | `research.html` | copy one `<article class="paper reveal">…</article>` |
| Add a project | `projects.html` | copy one `<a class="card reveal">…</a>` |
| Add a job or award | `about.html` | TIMELINE, copy one `<li>`. Add `class="honor"` for an award |
| Skills | `about.html` | "Tools I use", one `<span>` each |
| Colors and fonts | `assets/style.css` | the `:root` block at the top |
| Animations | `assets/main.js` | each effect is its own commented block |
| The moving point cloud | `assets/main.js` | THE FIELD. The shapes are in `SHAPES` |
| Resume | replace `resume.pdf` with the new file, same name |

**The corners, the bottom menu and the footer are copied into every page.** If you change a link in them (say, a new LinkedIn URL), change it in every `.html` file. Your editor's "find and replace in files" does this in one go.

A project's picture is `assets/thumbs/<name>.webp`, and the clip that plays when it's on screen is `assets/clips/<name>.mp4`. Keep clips short and small (under about 200 KB).

## Preview on your laptop

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish

Commit and push to `main`. The live site updates in about a minute.
