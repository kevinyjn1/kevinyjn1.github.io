# Design notes

Read this before changing how the site looks, so it stays one site and not a pile of effects.

## The message

**Kevin Na builds AI for the physical world, and it already works.**
Papers under review, first places, and robots and boards that actually run.

## Who reads it

1. **Recruiters.** About 20 seconds. They need the name, what he does, the strongest results and the resume button. The resume is in the sidebar on every page and in the hero.
2. **PhD admissions and professors.** They read the Research page: labs, advisors, papers and what *he* did on each.

## Direction

Kevin pointed to jinwookshin.com as the feel he wants. What we took from it (ideas, not code or text):

- **A fixed sidebar that is the identity.** Name, one-line role, round photo, page links, Resume / GitHub / LinkedIn, an "open to" status. It never scrolls away. On phones it turns into a rounded bar with a Menu button.
- **A light, airy page next to a deep color.** The contrast between the navy sidebar and the soft off-white page is the "aura", instead of darkness.
- **A friendly, big serif greeting.** "Hello, I'm Kevin Na." with the name as the loudest thing on the page.
- **A short home page.** Hero, four highlights, three recent projects, a strip of real footage. Details live on Research, Projects and About.
- **Picture-first cards.** Rounded image, small colored tags, serif title, one line.

What makes it his and not a copy: Michigan colors (navy sidebar, maize highlighter under his name, maize buttons), his own robot footage in the strip, and a highlights row up top because his message is impact.

## Rules

- One accent: maize. On white it's only a fill (buttons, highlighter, dots), never thin text. Small colored text uses `--gold-ink`.
- Two fonts: Fraunces (headings) and Manrope (everything else).
- Real footage only. Projects without footage get a small drawn diagram, not stock art.
- Motion with a reason: a fade-in once, footage plays on hover, the strip drifts. Visitors who turn off motion get none.
- Honest wording. Under review says under review. Co-author says co-author.

## Tokens (top of `assets/style.css`)

| Token | Value | Used for |
|---|---|---|
| `--navy` | `#00274c` | sidebar, headings, the name |
| `--maize` | `#ffcb05` | buttons, highlighter, dots |
| `--gold-ink` | `#8a6200` | small colored labels and tags |
| `--bg` | `#f6f7fa` | page background |
| `--ink` / `--ink-soft` | `#0f1b2d` / `#4d5b72` | text |
| `--display` | Fraunces | headings |
| `--sans` | Manrope | everything else |
