# kc-console: the KC Cabinetry console page

This is the KC Cabinetry site in the "console" layout: one screen at a time, clicked through and never scrolled. It's delivered as **one Squarespace Code Block**. The structure and behaviour follow `bayou-site/docs/CONSOLE_PATTERN_BRIEF.md`; the brand is Jim's (Georgia/system fonts, walnut, charcoal and oak colours, his emblem, photos and copy). Everything is scoped under `.kc` / `#kc`.

## Commands
- `npm run build` builds the files listed under Output.
- `npm test` opens every screen, tab and form step at 8 window sizes and writes `test-results/fit-report.md` and screenshots. It uses the installed Microsoft Edge.
- `node tests/extra-check.mjs "<full path>/dist"` checks three things: it stays in the page inside an iframe (the editor), takes over the full window at the top level, and works without JavaScript.

## Source
| File | What it is |
|---|---|
| `src/config.mjs` | Image host address, phone, email, credit link, and the craft **videos** list (empty means no Videos screen) |
| `src/markup.mjs` | All markup |
| `src/kc.css` | Layout, height tiers and components |
| `src/kc.js` | Screens, tabs, sliders, photo viewer, SAMPLE estimator, assessment, 3-step form (opens an email), copy buttons, click-to-load YouTube |
| `src/REPO_README.md` | Template for the KC_Cabinetry repo's README |
| `media/` | The images (copied from `squarespace-live/assets/`) |
| `GO_LIVE.md` | Step-by-step go-live instructions |

## Output (`dist/`)
- `kc-console-codeblock.html`: paste into the Code Block.
- `preview.html` / `preview-videos.html`: local previews. The second one is a test with the Videos screen switched on.
- `repo/`: upload these files to github.com/aj-insight-dev/KC_Cabinetry.

## Decisions
- **The form opens the visitor's own email app** (option C). There's no back end and nothing is stored. Moving to the Cloudflare Worker later (option A) means changing the `submit` handler in `kc.js`.
- **Prices** are labelled SAMPLE and blurred until revealed. They're illustration only.
- **Left off for now:** BBB and "since 2009" (waiting for Jim to confirm), and Conscious Carpentry.
