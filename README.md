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
| The four highlights | `index.html` | `class="proof"`, one `<li>` each |
| The three projects on the home page | `index.html` | RECENT WORK |
| Add a paper | `research.html` | copy one `<article class="paper reveal">…</article>` |
| Add a project | `projects.html` | copy one `<a class="card reveal">…</a>` |
| Add a job or award | `about.html` | TIMELINE, copy one `<li>`. Add `class="honor"` for an award |
| Skills | `about.html` | SKILLS, one `<span>` each |
| Colors and fonts | `assets/style.css` | the `:root` block at the top |
| Animations | `assets/main.js` | each effect is its own commented block |
| Resume | replace `resume.pdf` with the new file, same name |
| Pictures in the moving strip | `assets/strip/` and the FOOTAGE STRIP comment in `index.html` |

**The sidebar is copied into every page.** If you change a link in it (say, a new LinkedIn URL), change it in every `.html` file. Your editor's "find and replace in files" does this in one go.

A project card's picture is `assets/thumbs/<name>.webp`, and the clip that plays on hover is `assets/clips/<name>.mp4`.

## Preview on your laptop

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish

Commit and push to `main`. The live site updates in about a minute.
