# KC_Cabinetry: image host for the KC Cabinetry console

Updated 2026-10-10.

This repository now has one job: to serve the images used by the KC Cabinetry console page on Squarespace (kansascitycabinetry.com). GitHub Pages publishes them at:

`https://aj-insight-dev.github.io/KC_Cabinetry/<file name>`

The site itself is a single Squarespace Code Block built from `Jim Website/kc-console` (run `node scripts/build.mjs`, then paste `dist/kc-console-codeblock.html`). Nothing in this repo runs on the site except these images.

**This repo is public.** Only images and this README belong here: no customer details, real pricing rules, passwords or keys.

## What changed in this update
- The eleven KC Cabinetry images used by the console sit at the repo root (listed below).
- `featured_oak.png` (2.1 MB) was replaced by `featured_oak.jpg` (190 KB). The PNG is no longer used and can be deleted.
- Branch `media` and pull request #6 (an earlier attempt to add a `media/` folder) are not needed; close the PR and delete the branch.
- Replaced this README. The old README described a static site whose forms only saved answers in the visitor's own browser; that site never sent leads anywhere.
- The old pages are now **legacy and not used**. They are still published at the repo root until they are deleted (see below).

## Every file in the repo

### Used by the console
| File | Size |
|---|---|
| `bath.jpg` | 95 KB |
| `blue_bar.jpg` | 108 KB |
| `carousel.jpg` | 154 KB |
| `featured_oak.jpg` | 192 KB |
| `gray_bar.jpg` | 94 KB |
| `kc-emblem.png` | 81 KB |
| `pantry.jpg` | 169 KB |
| `sage.jpg` | 156 KB |
| `spice.jpg` | 124 KB |
| `warm_oak.jpg` | 151 KB |
| `white_shaker.jpg` | 14 KB |
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
| `featured_oak.png` | replaced by `featured_oak.jpg` |
| `favicon.ico`, `favicon.svg` | old site icons |
| `robots.txt` | old crawler rules |

## Notes
- `white_shaker.jpg` is only 238 x 237 pixels and looks soft at large sizes. Replace it with a larger copy under the same name when one is available; no code change is needed.
- To add a craft video: upload its poster image to the repo root, add the video to `videos` in `kc-console/src/config.mjs`, rebuild, re-paste the Code Block and upload the poster here.
