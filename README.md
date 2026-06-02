# KC Cabinetry - Conscious Carpentry LLC

A static marketing site for KC Cabinetry, a custom finish cabinetry business serving Overland Park, Mission Hills, and greater Kansas City.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Restoration showcase, hero reel, smart storage, project gallery, renovation detail strip, and lookbook capture |
| `transitional.html` | Transitional style landing page with mixed materials, hidden storage, gallery, and lookbook capture |
| `calculator.html` | 5-step project cost estimator with lead capture |
| `assessment.html` | Refacing vs. replacing quiz with lead capture |
| `privacy.html` | Basic privacy policy |
| `terms.html` | Basic website terms |

## Enhancements Added
- Supplied KC Cabinetry logo added to `assets/images/brand/logo-cabinetry.png`.
- Renovation detail photos added to `assets/images/renovation/` and surfaced on the homepage.
- Footer policy links now point to real local pages.
- Mobile visitors get a fixed tap-to-call button.
- Forms now save the last 50 submissions to browser `localStorage` as `kcCabinetryLeads` while still showing the front-end confirmation.
- Accessibility polish: skip link, focus states, mobile nav `aria-expanded`, improved lightbox alt text, Escape handling, and scroll locking.
- SEO basics: theme color, Open Graph image, Twitter card, and `robots.txt`.

## Run Locally
Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Still Needed Before Launch
1. Connect forms to a real CRM or email endpoint such as Formspree, Netlify Forms, HubSpot, Mailchimp, or a small backend.
2. Replace the CSS hero slideshow with the final 15-second transformation video when available.
3. Swap any thumbnail gallery images for high-resolution originals as you collect them.
4. Add the official BBB seal only if you have approval and the correct brand asset.
5. Add the final production domain to analytics, Search Console, and any sitemap you generate.
