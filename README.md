# KC_Cabinetry: image host for the KC Cabinetry console

Updated 2026-10-10.

This repository now has one job: to serve the images used by the KC Cabinetry console page on Squarespace (kansascitycabinetry.com). GitHub Pages publishes them at:

`https://aj-insight-dev.github.io/KC_Cabinetry/media/<file name>`

The site itself is a single Squarespace Code Block built from `Jim Website/kc-console` (run `node scripts/build.mjs`, then paste `dist/kc-console-codeblock.html`). Nothing in this repo runs on the site except these images.

**This repo is public.** Only images and this README belong here: no customer details, real pricing rules, passwords or keys.

## What changed in this update
- Added `media/` with the eleven KC Cabinetry images used by the console (listed below).
- Replaced this README. The old README described a static site whose forms only saved answers in the visitor's own browser; that site never sent leads anywhere.
- The old pages are now **legacy and not used**. They are still published at the repo root until they are deleted (see below).

## Every file in the repo

### Used by the console
| File | Size |
|---|---|
| `media/bath.jpg` | 95 KB |
| `media/blue_bar.jpg` | 108 KB |
| `media/carousel.jpg` | 154 KB |
| `media/featured_oak.png` | 2114 KB |
| `media/gray_bar.jpg` | 94 KB |
| `media/kc-emblem.png` | 81 KB |
| `media/pantry.jpg` | 169 KB |
| `media/sage.jpg` | 156 KB |
| `media/spice.jpg` | 124 KB |
| `media/warm_oak.jpg` | 151 KB |
| `media/white_shaker.jpg` | 14 KB |
| `README.md` | this file |
| `.github/workflows/static.yml` | publishes the repo to GitHub Pages on every push to `main` |

### Legacy (not used; safe to delete)
| File | What it was |
|---|---|
| `index.html` | old home page (its form never sent anything) |
| `transitional.html` | old style landing page (its form never sent anything) |
| `calculator.html` | old 5-step cost estimator (its form never sent anything) |
| `assessment.html` | old refacing vs. replacing quiz (its form never sent anything) |
| `future.html` | old concept page |
| `privacy.html`, `terms.html` | old policy pages for the static site |
| `main.js` | script for the old pages |
| `portfolio-05.jpg` | old image (not used by the console) |
| `favicon.ico`, `favicon.svg` | old site icons |
| `robots.txt` | old crawler rules |

## Notes
- `white_shaker.jpg` is only 238 x 237 pixels and looks soft at large sizes. Replace it with a larger copy under the same name when one is available; no code change is needed.
- `featured_oak.png` is about 2 MB. A JPEG copy would load faster; if one is added, change the file name in `kc-console/src/markup.mjs` and rebuild.
- To add a craft video: put its poster image in `media/`, add the video to `videos` in `kc-console/src/config.mjs`, rebuild, re-paste the Code Block and upload the poster here.
