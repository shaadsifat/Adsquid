# Adsquid website (adsquidbd.com)

Static HTML/CSS/JS site, built from the plan in `Adsquid Website Plan & Google Flow Prompts.docx`
and the asset notes in `ADSQUID-IMAGES-README.txt`. No framework, no database, no npm install.

## Commands

```bash
node src/build.mjs     # build everything into /dist (about 1 second)
node serve.mjs         # preview at http://localhost:8080 (clean URLs + 404 page)
```

Or just double-click **`preview.bat`** (builds, opens the browser, serves). Opening `dist/index.html`
directly from disk does not work: the site uses root paths (`/assets/...`) and clean URLs, which need a server.

**GitHub Pages preview link:** double-click **`publish-pages.bat`**. It builds a copy for
`https://shaadsifat.github.io/Adsquid/` (`node src/build.mjs --base=/Adsquid --out=build-pages --noindex`)
and pushes it to the `gh-pages` branch. One-time setup on GitHub: Settings > Pages > Source "Deploy from a branch",
Branch `gh-pages`, folder `/ (root)`, Save. The preview copy is `noindex` so Google keeps indexing only adsquidbd.com.

URL switches for previewing:
- `?placeholders` outlines every element still marked `data-placeholder`.
- `?motion` forces animations on for the whole tab, even when Windows "Show animations" is off
  (that setting makes browsers request reduced motion, and the site then shows its still version). `?motion=off` clears it.

**To publish:** upload the *contents* of `/dist` to `public_html` (cPanel), or drag `/dist` into
Netlify / Cloudflare Pages. `dist/.htaccess` already handles HTTPS, www, caching, compression,
old-URL redirects and the 404 page.

## Folder map

| Path | What it is |
| --- | --- |
| `images/` | The original image handoff (source of truth; copied into `dist/assets/...` by the build, never renamed or recompressed). `images/team/` = team photos taken from the old site. |
| `static/` | Hand-written code copied as-is: `assets/css`, `assets/js`, `assets/vendor` (GSAP, ScrollTrigger, Lenis), `assets/fonts` (self-hosted WOFF2), `.htaccess`. |
| `src/config.mjs` | Phone, email, address, hours, social links, **form endpoint**, **analytics IDs**. |
| `src/data.mjs` | All page copy: 7 services, 4 ad pages, sample case studies, team, counters, FAQs. |
| `src/content/posts/` | Blog posts (one `.html` file each). `_template.html` explains how to add one. |
| `src/pages/*.mjs` | Page templates (home, services, work, blog, company pages). |
| `src/layout.mjs` | `<head>`, header, mega menu, mobile menu, footer (written into every page). |
| `src/build.mjs` | The builder: pages, sitemap.xml, robots.txt, asset versioning, checks. |
| `dist/` | Generated site. Do not edit by hand; it is wiped on every build. |

## Common jobs

- **New blog post:** copy `src/content/posts/_template.html` to `src/content/posts/<slug>.html`, fill in the JSON, remove `"draft": true`, build. It appears on /blog/, its category page, related posts, the homepage (if newest) and the sitemap.
- **Real case study:** edit the entry in `work` in `src/data.mjs` (client, numbers, quote, cover), then delete `noindex: true` in `casePage()` in `src/pages/work.mjs` and the SAMPLE tag / banner.
- **Turn on forms:** create a free Formspree or Web3Forms form and paste its endpoint into `formEndpoint` in `src/config.mjs`. Until then, forms open WhatsApp with the visitor's details filled in.
- **Turn on analytics:** fill `analytics.gtm` / `ga4` / `metaPixel` in `src/config.mjs`. They load after the page `load` event; form submits push `generate_lead` / `Lead`.
- **Change menu, footer or contact details:** edit `src/layout.mjs` or `src/config.mjs`, build. Every page updates.

## How the homepage motion works

- **00 Hero:** the octopus mascot (`images/brand/hero-mascot*.webp`, cleaned from `hero-img.png`) sits right of the text on desktop and above it on phones. It pops in, floats, glints, has floating status chips, tilts toward the cursor in 3D (chips move more for depth) and hops when clicked. Its CSS is inlined on the homepage only. Fonts: Raleway (headings) and Open Sans (everything else), self-hosted.
- **01:** the violet line draws and the three grey cards snap into a row.
- **02 (pinned):** SVG lines drawn over `home-03-network`, using the socket coordinates from the image README. Each socket lights up and shows its service object as its card slides in.
- **03 to 09:** step chips light up, counters roll, bars rise (clip reveal), logo marquee, light-trail canvases (V4, built in code), CTA video (V3, loaded only near view, desktop only).
- **Reduced motion:** no Lenis, no pins, no scrubbing. Everything is shown in its final state.

## Motion and performance rules (keep these when adding effects)

- Per-frame work only changes `transform` and `opacity`, written directly on the element that moves
  (never a CSS variable on a parent: variables inherit, so the whole subtree gets re-styled every frame).
- Anything that fades or moves every frame gets `will-change` so it has its own GPU layer.
- No `backdrop-filter` over moving content (video, parallax, scrolling cards); it re-blurs every frame.
- Canvases (shooting stars, cursor) draw at 1x and pause when off screen; stars are pre-drawn sprites.
- Everything visible in the first screen is styled by the inlined critical CSS, and below-the-hero content
  is hidden until `main.css` loads, so nothing jumps (layout shift is ~0 on every page, even on slow 3G).
- Reduced motion (or no JavaScript) gets the complete, still version of every page.

## Before launch: still to do (search `data-placeholder` and `CONFIRM`)

1. Real client logos (the marquee, About wall) and permission to show them.
2. Real case studies (6 SAMPLE pages are `noindex` and outlined as placeholders).
3. Testimonials and verified counters (100+ clients, since 2015, 24/7). Also the timeline years on /about/.
4. Confirm the service items marked CONFIRM, pricing ("from ৳X"), office hours and audit reply time.
5. Formspree/Web3Forms endpoint and the GTM / GA4 / Pixel IDs.
6. New team photos. The current ones come from the old site; Fuad's original is only 288px, so it looks soft.
7. Have the Privacy Policy and Terms drafts reviewed.
8. Write the rest of the 21 planned posts (3 are written: Facebook ads cost, website cost, local SEO). Check their price ranges against your own data.
9. Google Search Console + Bing Webmaster, submit `/sitemap.xml`. Add any other old URLs to `.htaccess`.
