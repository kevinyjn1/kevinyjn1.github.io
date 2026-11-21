# Design notes

Read this before changing how the site looks, so it stays one site and not a pile of effects.

## The message

**Kevin Na builds AI for the physical world, and it already works.**
Papers under review, first places, and robots and boards that actually run.

## Who reads it

1. **Recruiters.** About 20 seconds. They need the name, what he does, the strongest results and the resume. The resume button sits in the top right corner of every page and in the hero.
2. **PhD admissions and professors.** They read the Research page: labs, advisors, papers and what *he* did on each.

## Direction: "a live signal"

The site should feel like looking at a sensor feed from one of his robots: dark, glowing, alive.

- **The hero is a moving point cloud.** About 1,500 points start as noise and travel in straight lines to a 3D shape, then on to the next one. That is the idea behind rectified flow, one of his own projects, so the effect means something. Points move out of the way of your cursor. A small "fig. 0" caption says what it is.
- **Aura from light, not from color blocks.** A near-black page with two slow glows (blue and maize) and a little film grain. Tiles and cards light up under your cursor.
- **Big, tight type.** Bricolage Grotesque for headings and text, JetBrains Mono for small labels, like readouts on an instrument.
- **No sidebar, no top bar.** His initials sit in the top left, the resume in the top right, and the menu is a floating dock at the bottom of the screen. That is also easier to reach with a thumb on a phone.
- **Organized by what he works on.** The home page has three threads (robot learning, surgical video AI, embedded ML), each linking to its projects, then a bento grid of picture tiles whose footage plays as you scroll past.

Kevin pointed to jinwookshin.com and uynitsuj.github.io as sites he likes. We took ideas, not layout, code or words: a short, confident home page and real results up top from the first; dark mode, moving visuals in the hero and plain honest paper listings from the second. The layout, the point cloud, the dock and the thread structure are this site's own.

## Rules

- Two accents: maize (warm, for things to press and for highlights) and blue (the glow, and small labels). Nothing else.
- Real footage only. Projects without footage get a small drawn diagram, not stock art.
- Motion with a reason: the point cloud, a fade-in once, footage while it's on screen, the cursor light. Visitors who turn off motion get a still page.
- Honest wording. Under review says under review. Co-author says co-author.

## Tokens (top of `assets/style.css`)

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#06070b` | page background |
| `--ink` / `--ink-soft` | `#edf0f6` / `#a4acbd` | text |
| `--maize` | `#ffcb05` | buttons, highlights, the near points in the cloud |
| `--blue` | `#6f97ff` | glows, small labels, the far points in the cloud |
| `--display`, `--sans` | Bricolage Grotesque | headings and text |
| `--mono` | JetBrains Mono | small labels |
