# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal portfolio site for Kevin Na (CS @ University of Michigan). No build system — plain HTML, CSS, and vanilla JS. Deployed as a GitHub Pages user site at `kevinyjn1.github.io`.

## File structure

```
index.html          # main portfolio page
blog.html           # blog listing page
assets/
  style.css         # all styles (Tesla-inspired monochrome design)
  main.js           # nav scroll behavior + scroll-reveal observer
  blog.js           # POSTS registry + renderPostList() function
posts/
  welcome.html
  conformal-prediction.html
resume.pdf          # served statically
```

## Design system

- **Colors**: `--ink` (#171a20), `--bg` (#fff), `--dark` (#0d0d0d) — monochrome only
- **Type**: Oswald (display/headings), Inter Tight (body), JetBrains Mono (meta/code)
- **Nav**: transparent over dark hero, transitions to frosted glass on scroll (`.scrolled` class toggled by `main.js`)
- **Animations**: `.reveal` elements fade up on scroll via IntersectionObserver; hero elements use CSS `fade-up` keyframe

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
