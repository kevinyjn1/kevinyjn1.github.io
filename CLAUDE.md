# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal portfolio site for Kevin Na (CS @ University of Michigan). No build system — plain HTML, CSS, and vanilla JS. Deployed as a GitHub Pages user site at `kevinyjn1.github.io`.

## File structure

```
index.html, research.html, projects.html, about.html   # main pages
projects/*.html     # one write-up per project
blog.html           # blog listing page
assets/
  style.css         # all styles; tokens in :root
  main.js           # hero point cloud, reveals, clips, cursor glow, copy email
  blog.js           # POSTS registry + renderPostList() function
  thumbs/, clips/   # project pictures and short clips
resume.pdf          # served statically
```

## Design system

See DESIGN.md. Dark only. Bricolage Grotesque + JetBrains Mono, maize and blue accents.
The top corners, bottom dock and footer are copied into every page.
Never list a MICCAI paper; the lab is "COG Lab (Corso Group)"; keep paper roles exactly as written.

## Adding a blog post

1. Copy `posts/welcome.html` → `posts/your-slug.html`
2. Edit the title, date, and content inside `<article class="article">`
3. Add an entry to the `POSTS` array in `assets/blog.js` (newest first)

## Local development

Open `index.html` directly in a browser, or serve with:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

The repo is named `kevinyjn1.github.io`. Push to `main` and GitHub Pages serves the root automatically (no `/docs` folder or branch needed).
