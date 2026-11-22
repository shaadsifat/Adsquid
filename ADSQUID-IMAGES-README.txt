ADSQUID WEBSITE - IMAGE, VIDEO AND FRAME HANDOFF
For: the Claude that builds the site locally
Read together with: Adsquid_Website_Plan__Google_Flow_Prompts.docx (the plan)
Last updated: 23 Nov 2026

This file explains every visual asset that has been made for the site:
where it goes, what it is for, how to load it, and where it differs from
the plan. When this file and the plan disagree about an image, follow
this file (it records decisions made after the plan was written).


====================================================================
1. FOLDER SETUP (do this first)
====================================================================

The owner has one folder called "images" with these subfolders:

  ads  blog  brand  frames  home  mockups  pages  services  textures  video

Move them into the project like this (matches the plan's file tree):

  images/ads        ->  /assets/images/ads/
  images/blog       ->  /assets/images/blog/
  images/brand      ->  /assets/images/brand/
  images/home       ->  /assets/images/home/
  images/mockups    ->  /assets/images/mockups/
  images/pages      ->  /assets/images/pages/
  images/services   ->  /assets/images/services/
  images/textures   ->  /assets/images/textures/
  images/frames     ->  /assets/frames/          (contains hero/0001-0120.webp)
  images/video      ->  /assets/video/
  images/brand/logo ->  /assets/images/brand/logo/   (logo files, section 13)
  images/favicons/* ->  website ROOT (/favicon.ico etc., not inside /assets)

All paths below are written relative to /assets/.

Do not rename files. Do not re-compress them: they are already WebP,
sized and within budget.


====================================================================
2. FILE NAMING AND SIZES
====================================================================

Every 16:9 image exists in three widths:

  name.webp        1920 x 1072   (main file)
  name-1280.webp   1280 x 715
  name-768.webp     768 x 429

Note: the height is 1072, not 1080. The source renders were 2576x1438
(ratio 1.791). Use these exact numbers in width/height attributes.

Exceptions:
  brand/key-hero-mark-mobile.webp   1080 x 1935  (+ -720.webp: 720 x 1290)
  services/obj-*.webp               1024 x 1024  (+ -640, -320 squares)
  brand/og-default.jpg / .webp      1200 x 630   (one size only)
  brand/key-hero-poster.webp        1920 x 1080  (one size, exact 16:9)
  frames/hero/0001-0120.webp        1280 x 720
  video/cta-portal-loop-poster.webp 1280 x 720

Standard markup for any 16:9 image below the fold:

  <img src="/assets/images/home/home-02-noise.webp"
       srcset="/assets/images/home/home-02-noise-768.webp 768w,
               /assets/images/home/home-02-noise-1280.webp 1280w,
               /assets/images/home/home-02-noise.webp 1920w"
       sizes="100vw" width="1920" height="1072"
       alt="" loading="lazy" decoding="async">

Decorative backgrounds get alt="". Images that carry meaning (mockups
with real screenshots, team photos) get real alt text.


====================================================================
3. BRAND COLORS (for overlays, cards, SVG and canvas work)
====================================================================

  Violet   #8800D4   Lilac  #D6B4FF   Night  #07050D
  Graphite #120E1C   Cyan   #22E3D3 (tiny accents only)   Mist #B9B3C9

Every image was generated in this palette on a near-black background,
so all section backgrounds should be Night (#07050D) to blend with the
image edges.


====================================================================
4. COMPLETE INVENTORY (main file name; sizes are for the 1920 version)
====================================================================

--- brand/ ---------------------------------------------------------
key-hero-poster.webp     46 KB  DESKTOP HERO IMAGE. First frame of the V1
                                push-in video. Shown immediately, then
                                replaced by the scroll frame sequence.
                                <link rel="preload"> + fetchpriority="high".
key-hero-mark.webp       51 KB  K1, the approved key visual (glass squid
                                logo sculpture, right side, empty dark left
                                half). Use as the desktop hero for visitors
                                with prefers-reduced-motion, and as the
                                fallback if frames are disabled.
key-hero-mark-mobile.webp 53 KB K1m, 9:16. MOBILE HERO IMAGE. Sculpture in
                                the upper half, bottom 45% empty for headline
                                and buttons. Preload on mobile.
key-hero-plate.webp      16 KB  K2, the hero background with no sculpture
                                (violet disc + floor grid). Only needed if
                                the real-time Three.js mark is built later.
                                The disc is at exactly the same place as in
                                K1: centre x 70.4%, y 48.3%, diameter 40.5%
                                of image width.
og-default.jpg           66 KB  Social share image. Use the JPG in og:image
                                (WhatsApp/LinkedIn/Facebook handle JPG best).
                                Left half is empty for a logo added in code
                                if wanted.
og-default.webp          28 KB  Same image as WebP, if needed elsewhere.

--- home/ (homepage chapters, see plan "Homepage scroll story") ----
home-02-noise.webp       51 KB  H2, chapter 01 "The problem". Grey cards in
                                chaos, one violet line cutting through. A big
                                blurred card sits top-left near the headline:
                                add a left fade overlay (section 6).
home-03-network.webp     49 KB  H3, chapter 02 "Many arms". Hub + 7 empty
                                sockets. The V2 line animation is built in SVG
                                on top of this image (section 8).
home-04-process.webp     35 KB  H4, chapter 03 "Process". Five glass platforms
                                rising lower-left to upper-right, joined by one
                                glowing line. Put the 5 step labels in the
                                empty upper-left and lower-right corners.
home-05-proof.webp       31 KB  H5, chapter 04 "Proof". Five rising glass
                                columns on the right. Upper-left is empty for
                                "Numbers, not noise." and the counters.
home-09-cta-portal.webp 112 KB  H6, chapter 09 "Final CTA". Light portal with
                                a calm darker centre (~60% of frame height)
                                for the form. Poster for the V3 loop. Put the
                                form on a dark glass card (section 6).

--- services/ ------------------------------------------------------
obj-digital-ads.webp     29 KB  S1 target + arrow + rising line
obj-social-media.webp    17 KB  S2 phone + heart/chat/bell
obj-seo.webp             18 KB  S3 magnifier over rising blocks
obj-graphic-design.webp  17 KB  S4 pen tool + bezier curve + artboard
obj-content.webp         31 KB  S5 cinema lens + play button + film strip
obj-website.webp         25 KB  S6 browser window + cursor
obj-software.webp        28 KB  S7 chip on a glass board
                                Square objects on dark backgrounds, one family.
                                Use -640 on chapter 02 service cards and
                                service listings, -320 for mega menu hover
                                thumbnails.
hero-digital-ads.webp    52 KB  SH1  /services/digital-ads-management/
hero-social-media.webp   26 KB  SH2  /services/social-media-management/
hero-seo.webp            25 KB  SH3  /services/seo/
hero-graphic-design.webp 25 KB  SH4  /services/graphic-design/
hero-content.webp        29 KB  SH5  /services/content-development/
hero-website.webp        24 KB  SH6  /services/website-development/
hero-software.webp       75 KB  SH7  /services/software-development/
                                Service page heroes: object on the right,
                                left ~55% calm and dark for the headline.

--- ads/ (sub-pages of Digital Ads) --------------------------------
hero-meta-ads.webp       37 KB  AD1  two phones + targeting rings
hero-google-ads.webp     22 KB  AD2  search bar + result cards
hero-tiktok-ads.webp     24 KB  AD3  vertical frames fanned out + play button
hero-youtube-ads.webp    22 KB  AD4  video player panel + progress bar
                                No platform logos are in these images on
                                purpose. Add the official Meta / Google /
                                TikTok / YouTube logos as small SVG badges in
                                code next to the headline.

--- pages/ ---------------------------------------------------------
hero-about.webp          73 KB  P1  /about/  light corridor, small squid at
                                the vanishing point (right). Left side dark.
hero-free-audit.webp     29 KB  P2  /free-audit/  dashboard + magnifier
hero-contact.webp        22 KB  P3  /contact/  glass speech bubble with a
                                signal line entering from the left edge
hero-careers.webp        37 KB  P4  /careers/  parallel strokes, one short
                                bright stroke joining
404-signal-lost.webp     33 KB  P5  /404.html  broken glitchy logo, centred.
                                Place the 404 text above or below it, not on it.

--- blog/ (one cover per category = per service) -------------------
cover-digital-ads.webp   28 KB  /blog/category/digital-ads-management/
cover-social-media.webp  16 KB  /blog/category/social-media-management/
cover-seo.webp           19 KB  /blog/category/seo/
cover-graphic-design.webp 20 KB /blog/category/graphic-design/
cover-content.webp       27 KB  /blog/category/content-development/
cover-website.webp       14 KB  /blog/category/website-development/
cover-software.webp      24 KB  /blog/category/software-development/
                                Each post uses its category's cover (plan:
                                "Cover image (B1-B7 by category)"). Object
                                small on the right, left 60% empty for a
                                title. Same violet gradient on all seven.

--- mockups/ (for case studies) ------------------------------------
laptop-phone.webp        28 KB  M1  laptop + phone, both screens pure white
three-phones.webp        16 KB  M2  three phones, screens pure white
poster-frames.webp       19 KB  M3  three frames, artwork areas pure white
                                Screens are blank so real work can be placed
                                on them. Composite screenshots in an image
                                editor (or with a Python/PIL perspective
                                transform) and save as a new file per case
                                study, e.g. images/work/[slug]-mockup.webp.
                                Until then, show them as they are with
                                data-placeholder.

--- textures/ ------------------------------------------------------
grid-floor.webp          45 KB  T1  perspective grid floor with a soft
                                horizon glow. Chapter 05 (client logo
                                marquee) and other section backgrounds.
light-trails.webp        53 KB  T2  diagonal violet/lilac/white trails on PURE
                                BLACK. Made for mix-blend-mode: screen
                                (black disappears). Also the visual reference
                                for the V4 canvas animation.
violet-gradient.webp     11 KB  T3  soft blurred violet gradient, darkest at
                                the edges. Generic section background. Add a
                                light CSS grain layer if banding shows on
                                large screens.

--- frames/hero/ ---------------------------------------------------
0001.webp ... 0120.webp  ~25 KB each, 3.2 MB total, 1280 x 720
                                V1 desktop hero push-in, scroll-scrubbed.
                                Frame 0001 = key-hero-poster.webp, so the
                                hand-off from poster to canvas is seamless.

--- video/ ---------------------------------------------------------
cta-portal-loop.mp4      1.5 MB 6.4 s, 1280x720, H.264, no audio, faststart.
                                V3. Already a seamless loop (the end
                                crossfades into the start).
cta-portal-loop-poster.webp 56 KB  First frame of the loop.


====================================================================
5. LOADING RULES (performance budget from the plan)
====================================================================

- Only the hero image is preloaded:
    desktop: brand/key-hero-poster.webp
    mobile:  brand/key-hero-mark-mobile-720.webp (1080 for 3x screens)
  Use <picture> with a media query so each device downloads only its own
  hero.
- Everything else: loading="lazy" + srcset + width/height.
- First screen cost is about 50 KB of images (budget: 150 KB). A full
  homepage scroll on a phone is roughly 250-300 KB of images.
- Hero frames (3.2 MB): desktop only (min-width: 1024px), start loading
  after the window "load" event, and skip entirely when
  navigator.connection.saveData is true or prefers-reduced-motion is set.
- CTA video (1.5 MB): preload="none"; start it with an
  IntersectionObserver when chapter 09 is near the viewport. On mobile
  and with save-data, show only the poster.
- Pause every animation (canvas, video) when its section is off screen.


====================================================================
6. REUSABLE CSS FOR IMAGE SECTIONS
====================================================================

Hero image anchoring (desktop): the sculpture is on the right, so on
narrower laptops crop from the left:
  .hero-media img { object-fit: cover; object-position: right center; }

Mobile hero (K1m) text area fade:
  .hero-mobile::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 50%,
                rgba(7,5,13,.85) 68%, #07050D 80%);
  }

Left-side headline fade (H2 and any hero where text needs contrast):
  .fade-left::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(7,5,13,.7), transparent 45%);
  }

CTA form card over H6 / V3:
  .cta-form {
    background: rgba(7,5,13,.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(214,180,255,.2);
    border-radius: 20px;
  }

Light trails overlay (T2):
  .trails-overlay {
    position: absolute; inset: 0;
    background: url(/assets/images/textures/light-trails.webp) center/cover;
    mix-blend-mode: screen; opacity: .5; pointer-events: none;
  }

Mobile hero scroll zoom (replaces any mobile video, see section 9):
  scale K1m from 1 to about 1.15 with scroll progress (GSAP ScrollTrigger
  scrub), transform only.


====================================================================
7. V1 HERO FRAME PLAYER (desktop)
====================================================================

- Canvas sized to the hero, drawing frames/hero/0001-0120.webp by scroll
  progress (frames.js in the plan's file tree).
- Show key-hero-poster.webp as an <img> first; swap to the canvas once
  frames 1-10 are decoded; keep loading the rest in the background.
- Draw with "cover" behaviour anchored right-centre (same as the poster)
  so nothing shifts at the swap.
- The clip pushes in until the tentacles fill the screen: this is the
  intended hand-off into chapter 01 ("on scroll the camera pushes in and
  the trails stretch down into chapter 01").
- Frames are 1280 px wide (the source video was 720p), not 1600 as the
  plan says. If the owner later supplies a 1080p version, re-extract with:
    ffmpeg -i hero-push-in-1080.mp4 -an -vf "fps=120/7.9167,scale=1600:-2"
      -c:v libwebp -quality 72 frames/hero/%04d.webp
- No mobile frame sequence (overrides the plan's "60 frames at 900px").


====================================================================
8. V2 NETWORK ANIMATION (chapter 02) - BUILT IN SVG, NOT VIDEO
====================================================================

The Veo video for V2 was rejected (it did not match H3 and had a stray
light beam). Build it as an SVG layer on top of home-03-network.webp.

Alignment: give the image object-fit: cover and the SVG
viewBox="0 0 2576 1438" preserveAspectRatio="xMidYMid slice" in the same
box. Then these coordinates (measured on the original 2576x1438 render)
line up at every screen size.

  Hub:            cx 1288  cy 740  r 89
  Socket TOP:     cx 1287  cy 251  r 100
  Socket R1:      cx 2051  cy 463  r 92   (upper right)
  Socket R2:      cx 2254  cy 718  r 92   (middle right)
  Socket R3:      cx 2050  cy 975  r 92   (lower right)
  Socket L3:      cx  523  cy 977  r 92   (lower left)
  Socket L2:      cx  321  cy 719  r 92   (middle left)
  Socket L1:      cx  525  cy 463  r 92   (upper left)

Approximate line paths (hub edge to socket edge; fine-tune by eye with
a temporary visible stroke):
  TOP: M1288 651 L1288 354
  R1:  M1376 672 L1576 672 C1660 672 1690 464 1790 464 L1958 464
  R2:  M1376 718 L2162 718
  R3:  M1376 770 L1576 770 C1660 770 1690 975 1790 975 L1958 975
  L3:  M1200 770 L1000 770 C 916 770  886 977  786 977 L 616 977
  L2:  M1200 718 L 413 718
  L1:  M1200 672 L1000 672 C 916 672  886 464  786 464 L 616 464

Behaviour (chapter is pinned; 7 service cards scroll sideways):
- Each path is a glowing violet/lilac stroke drawn with
  stroke-dasharray/dashoffset as its service card arrives; when the line
  completes, its socket gets a brighter violet ring (SVG circle with a
  blur filter) and stays lit.
- Suggested order = clockwise, matching card order:
    TOP Digital Ads, R1 Social Media, R2 SEO, R3 Graphic Design,
    L3 Content, L2 Website, L1 Software
- Optional: place each service object (obj-*-320.webp) inside its socket
  once lit, small (about 70% of the socket diameter).
- Known image detail: the TOP line in the render is slightly thinner than
  the others; the SVG stroke drawn on top hides this.


====================================================================
9. V3 AND V4
====================================================================

V3 CTA portal loop (chapter 09) - DONE, use video/cta-portal-loop.mp4:
  <video class="cta-bg" autoplay muted loop playsinline preload="none"
         poster="/assets/video/cta-portal-loop-poster.webp">
    <source src="/assets/video/cta-portal-loop.mp4" type="video/mp4">
  </video>
  The plan also asks for a WebM copy. It is optional (MP4 plays
  everywhere). If ffmpeg is available:
    ffmpeg -i cta-portal-loop.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0
      cta-portal-loop.webm

V4 ambient light trails - BUILT IN CANVAS, NOT VIDEO (Veo result rejected:
it started empty and could not loop):
- A small canvas script, about 30 trails, rounded line caps, colours
  #8800D4, #D6B4FF and a few white, moving lower-left to upper-right at
  45 degrees, varied length/thickness/opacity, a few blurred for depth,
  each trail fading at its tail and re-entering when it leaves the frame.
- Use texture T2 (light-trails.webp) as the look reference.
- Parameters per section: density, speed, opacity.
- Pause when off screen; draw one static frame for
  prefers-reduced-motion; cap devicePixelRatio at 2.

Mobile hero video: none. Use K1m + CSS/GSAP scroll zoom (section 6).
The two 9:16 Veo attempts were rejected.


====================================================================
10. DIFFERENCES FROM THE PLAN (decided and approved)
====================================================================

- Desktop hero uses key-hero-poster.webp + 120 frames (V1). The real-time
  Three.js mark is optional/later (needs the logo SVG). K2 plate is kept
  for that.
- Hero frames are 1280 px (720p source), not 1600 px.
- No mobile frame sequence; mobile hero is the K1m still with scroll zoom.
- V2 and V4 are code (SVG / canvas), not video.
- V3 is MP4 only (WebM optional).
- H3 has 3 sockets left, 3 right and 1 on top (the plan said 3 left /
  4 right). Total is still 7, one per service.
- K1 sculpture is about 65% of frame height (plan said 55%); approved.
- K1m sculpture is about 60% of frame width (plan said 40%); approved.
- P4 Careers shows 5 long strokes + 1 short (plan said 7 + 1); approved.
- SH5 Content hero: the lens has no play button and the film strip is a
  round band. SH6 Website hero: the browser shows one large panel instead
  of three cards. Both approved.
- S4 pen tool has four anchor squares; S7 chip has more than four traces
  per side. Both approved.


====================================================================
11. STILL NEEDED BEFORE LAUNCH (not images Claude can generate)
====================================================================

- (DONE) Logo SVG and favicon set: see section 13.
- Real client logos (placeholders per the plan until then).
- Team photos (reuse old site photos until new shoots).
- Case study screenshots to composite into the mockups.
- Verified counter numbers (100+ clients, since 2015, 24/7) - the plan
  marks these "to verify".
Mark every placeholder with data-placeholder as the plan says.


====================================================================
12. NOT PART OF THE SITE
====================================================================

The Flow ingredient files (ING-1 purple circle mark, ING-2 white strokes
on black), the raw 2K JPG renders and the rejected videos are production
files only. Do not upload them to the site.


====================================================================
13. LOGO AND FAVICONS
====================================================================

Traced to clean vectors from the owner's logo PNG and the 1494 px
favicon PNG (the squid matches the original artwork at 99.6%).
Logo layout: violet circle (#8800D4) with a white squid, then the
"ADSQUID" wordmark. The squid is one continuous stroke (hook + head +
S-curve), three straight tentacles and two eye dots.

--- /assets/images/brand/logo/ ------------------------------------
adsquid-logo-on-dark.svg   USE THIS ON THE SITE (dark backgrounds):
                           violet circle, white squid, WHITE wordmark.
                           Violet text on Night has weak contrast (~2.8:1),
                           so the header and footer use this version.
adsquid-logo.svg           Original colours: violet circle + violet
                           wordmark. For light backgrounds (print, PDFs,
                           email signatures, the light Google Business
                           card).
adsquid-logo-white.svg     All white, squid knocked out of the circle.
                           For placing over photos or the violet colour.
adsquid-mark.svg           Circle + squid only (avatars, small spaces,
                           mobile header if the full logo doesn't fit).
adsquid-mark-strokes.svg   White squid only, transparent. Source shape for
                           the optional Three.js 3D mark (extrude it) and
                           for overlays.
adsquid-wordmark.svg       "ADSQUID" text only, violet (recolour with CSS
                           fill if inlined).
adsquid-mark-draw.svg      ANIMATED MARK: the squid strokes draw themselves
                           in over ~1.6 s, then the eyes fade in (plan:
                           "strokes draw in on load (1.2s)"). Pure SVG +
                           CSS, respects prefers-reduced-motion. The visible
                           shape is the exact logo; wide hidden centerline
                           strokes in a mask reveal it, so it ends pixel-
                           identical to adsquid-mark.svg. To replay or
                           trigger it from JS, inline the SVG and toggle a
                           class that restarts the CSS animation.
*.png / *.webp             Raster copies: logo variants at 1200/600/300 px
                           wide, mark at 1024/512/256 px. For places that
                           can't take SVG (some email clients, social
                           profiles). On the website itself, use the SVGs.

Header markup (inline or <img>; width/height keep layout stable):
  <a href="/" class="logo" aria-label="Adsquid home">
    <img src="/assets/images/brand/logo/adsquid-logo-on-dark.svg"
         width="160" height="48" alt="Adsquid">
  </a>
  The logo's aspect ratio is 1221:367 (about 3.33:1).

JSON-LD Organization "logo": use an absolute URL to
  /assets/images/brand/logo/adsquid-logo-1200.png
  (Google wants a raster logo here, on a light or transparent background).

--- website ROOT (from the favicons folder) -----------------------
favicon.ico              16/32/48 px, for old browsers and the default
                         /favicon.ico request
favicon.svg              modern browsers (scales perfectly)
favicon-32.png, favicon-16.png
apple-touch-icon.png     180 px, solid violet square (iOS turns
                         transparency black, so there is none)
icon-192.png, icon-512.png       for the web app manifest
icon-maskable-512.png    Android adaptive icon (squid inside the safe zone)
site.webmanifest         already filled in (name, icons, Night theme colour)

Put this in the <head> of every page:
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#07050D">

The owner's original favicon PNG (purple-fav.png) and logo PNG are the
masters these were made from; keep them in a design folder, not on the
site.
