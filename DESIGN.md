# Design notes

Read this before changing how the site looks, so it stays one site and not a pile of effects.

## The message

**Kevin Na builds AI for the physical world, and it already works.**
Papers under review, first places, and robots and boards that actually run.

## Who reads it

1. **Recruiters.** They have about 20 seconds. They need the name, what he does, the strongest results and the resume button, all above the fold.
2. **PhD admissions and professors.** They read the research section: labs, advisors, papers and what *he* did on each.

## Principles

- **Lead with proof.** The hero's right column (the "ledger") holds the four strongest results. Keep it to four.
- **Real footage, not decoration.** The hero film and every picture are his own project footage. No stock images, no generated art.
- **Dark and quiet, one accent.** Warm black, cream text, maize yellow used only for small marks (a dot, a date, a label). No gradients on text, no glow.
- **Editorial, not cards.** Selected work alternates left and right like a magazine. Smaller builds are plain index rows.
- **Motion with a reason.** Things fade in once, footage plays on hover. Nothing follows the cursor. Visitors who turn off motion in their system settings get none.
- **Honest wording.** Under review says under review. Co-author says co-author.

## Tokens (top of `assets/style.css`)

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#0b0a09` | page background |
| `--ink` | `#ece7de` | main text |
| `--ink-soft` | `#b4ada1` | body text |
| `--accent` | `#ffcb05` | Michigan maize, small marks only |
| `--display` | Instrument Serif | big headlines |
| `--sans` | Geist | everything else |
| `--mono` | Geist Mono | labels, dates, small caps |

## The hero film

`assets/hero.mp4` is a 15-second loop cut from `projects/mbot`, `projects/hydrosense`, the SmolVLA demo and `projects/ambientMNIST` footage. The page turns it grayscale and warm, so any clip works. To swap a clip, re-cut it with ffmpeg at 1024x576 and keep it under about 1 MB. `assets/hero.jpg` is the still shown before it loads.
