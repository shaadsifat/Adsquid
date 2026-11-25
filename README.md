# Adsquid website (adsquidbd.com)

Static HTML/CSS/JS site with one small PHP file for the forms. No framework, no database, no npm install.
The live site is meant for **https://adsquidbd.com** on normal PHP hosting (cPanel, hPanel or DirectAdmin).

- [Commands](#commands)
- [Hosting on adsquidbd.com, step by step](#hosting-on-adsquidbdcom-step-by-step)
- [How the forms work](#how-the-forms-work)
- [Folder map](#folder-map)
- [Common jobs](#common-jobs)
- [Before launch](#before-launch-still-to-do)

## Commands

```bash
node src/build.mjs     # build everything into /dist (about 2 seconds)
node serve.mjs         # preview at http://localhost:8080 (clean URLs + 404 page)
```

Or double-click **`preview.bat`** (builds, opens the browser, serves). Opening `dist/index.html`
straight from disk does not work: the site uses root paths (`/assets/...`) and clean URLs, which need a server.
The preview server also answers form posts like the real PHP handler, so you can test the forms locally (nothing is emailed).

**GitHub Pages preview link:** double-click **`publish-pages.bat`**. It builds a copy for
`https://shaadsifat.github.io/Adsquid/` (`node src/build.mjs --base=/Adsquid --out=build-pages --noindex`)
and pushes it to the `gh-pages` branch. One-time setup on GitHub: Settings > Pages > Source "Deploy from a branch",
Branch `gh-pages`, folder `/ (root)`, Save. The preview copy is `noindex`, so Google only indexes adsquidbd.com.
GitHub Pages cannot run PHP, so on the preview the forms hand the details over to WhatsApp instead.

URL switches for previewing:
- `?placeholders` outlines every element still marked `data-placeholder`.
- `?motion` forces animations on for the tab, even when Windows "Show animations" is off
  (that setting makes browsers ask for reduced motion, and the site then shows its still version). `?motion=off` clears it.

---

## Hosting on adsquidbd.com, step by step

### 1. What you need

| Item | Notes |
| --- | --- |
| A hosting plan | Any Linux shared hosting with **cPanel** (or Hostinger hPanel / DirectAdmin), **PHP 7.4 or newer** (8.1+ recommended), free SSL and email accounts. No database needed. The site is about 11 MB, so the smallest plan is enough. |
| The domain | Login for the company where **adsquidbd.com** is registered. |
| On your computer | [Node.js](https://nodejs.org) 18 or newer (LTS) and this repository (`git clone https://github.com/shaadsifat/Adsquid.git`, or "Code > Download ZIP" on GitHub). |

### 2. Point the domain to the hosting

**If you bought the domain together with the hosting**, it is usually connected already. Skip to step 3.

**If the domain is registered somewhere else**, choose one of these:

- **Option A: change the nameservers (simplest).** The hosting welcome email lists two nameservers,
  for example `ns1.yourhost.com` and `ns2.yourhost.com`. At your domain registrar open adsquidbd.com >
  Nameservers > Custom, enter both, and save.
  This moves *all* DNS records to the hosting. If you already use email on adsquidbd.com elsewhere
  (for example Google Workspace or Zoho), first copy those MX and TXT records into cPanel > **Zone Editor**.
- **Option B: keep DNS at the registrar.** Add an **A record** for `@` pointing to the server IP
  (cPanel shows it in the right sidebar as "Shared IP Address"), and a **CNAME** for `www` pointing to `adsquidbd.com`.

DNS changes take from a few minutes up to 24 to 48 hours. You can watch them at [dnschecker.org](https://dnschecker.org).

**If adsquidbd.com is not the main domain of your hosting account:** cPanel > **Domains** > Create A New Domain >
`adsquidbd.com`. Note its document root (for example `public_html/adsquidbd.com`) and upload there instead of `public_html` in step 5.

### 3. Turn on HTTPS (free SSL)

cPanel > **SSL/TLS Status** > tick `adsquidbd.com` and `www.adsquidbd.com` > **Run AutoSSL**.
(hPanel: Security > SSL > Install.) Wait until both show a green padlock.

Do this before uploading: the site's `.htaccess` sends every visitor to `https://adsquidbd.com`,
so without a certificate the browser shows a warning.

### 4. Build the website files

```bash
cd Adsquid
node src/build.mjs
```

This creates the **`dist`** folder (about 91 pages). That folder is the whole website.
Do not upload `build-pages` (that is the GitHub preview copy, hidden from Google).

Make a zip of what is *inside* `dist`, including the hidden `.htaccess` files:

```powershell
tar -a -cf adsquid-site.zip -C dist .
```

### 5. Upload

1. **Back up the old site first:** cPanel > **File Manager** > `public_html` > Select All > **Compress** > download the zip.
2. Delete the old website files in `public_html` (keep the `.well-known` and `cgi-bin` folders if they exist).
3. In `public_html` click **Upload**, choose `adsquid-site.zip`, then right-click it > **Extract** into `/public_html`, and delete the zip.
4. File Manager > **Settings** (top right) > tick **Show Hidden Files (dotfiles)**. Check that you now have:

```
public_html/
  .htaccess          <- HTTPS, redirects, caching, 404 page
  index.html
  404.html
  assets/
  api/
    .htaccess        <- keeps the mail settings private
    send.php         <- the form handler
    mail-config.example.php
  about/  blog/  services/  work/ ...
```

If you see `public_html/dist/index.html`, the files are one folder too deep: move the contents of `dist` up into `public_html`.

### 6. Make the forms send email

1. **Create the mailboxes:** cPanel > **Email Accounts** > Create
   - `info@adsquidbd.com`: where form messages arrive (skip it if your mail already lives in Google Workspace or similar);
   - `no-reply@adsquidbd.com`: the sender the website uses. Give it a strong password.
2. **Stop the emails going to spam:** cPanel > **Email Deliverability** > adsquidbd.com > **Repair** (or "Install the suggested record")
   for both **SPF** and **DKIM**. If you also send from Google Workspace, keep a single SPF record that includes both
   (for example `v=spf1 +a +mx include:_spf.google.com ~all`).
3. **Add the mail login:** File Manager > `public_html/api` > right-click `mail-config.example.php` > **Copy** to
   `mail-config.php` (same folder) > right-click the copy > **Edit**, and fill in:
   - `to`: where messages go (several addresses: separate with commas);
   - `from` and `smtp.user`: `no-reply@adsquidbd.com`;
   - `smtp.pass`: that mailbox's password;
   - `smtp.host` and `port`: shown in Email Accounts > `no-reply@` > **Connect Devices** ("Outgoing Server", usually `mail.adsquidbd.com`, port 465).

   Save. `mail-config.php` holds a password: it is in `.gitignore` (never goes to GitHub), and `api/.htaccess` stops anyone opening it in a browser.
   Without this file the forms still work through the server's built-in PHP `mail()`, but those emails are more likely to land in spam.
4. **Check PHP:** cPanel > **MultiPHP Manager** (or "Select PHP Version") > adsquidbd.com on PHP **8.1 or newer**.
5. **Test** on https://adsquidbd.com/contact/: send a message with your own email. You should see
   "Thank you!" on the page and get the email within a minute (check spam the first time). Test the free audit page and the homepage form too.

**A backup of every message** is saved privately (outside the website folder) in
`/home/<your-cpanel-user>/adsquid-leads/leads-YYYY-MM.csv`, so no lead is lost even if an email fails.
The `emailed` column says `yes`, or shows the error.

**If a form says "Something went wrong":**

| What you see | Fix |
| --- | --- |
| `error_log` in `public_html/api` mentions `(hidden) -> 535` | Wrong SMTP username or password in `mail-config.php`. |
| `connect failed` | Try `'port' => 587` with `'secure' => 'tls'`, or ask the host which SMTP port is open. |
| `mail() returned false` (no config file) | The host blocks PHP mail: add `mail-config.php` with SMTP (step 6.3). |
| "This form only works on adsquidbd.com" | You are testing on another domain: add it to `'allowedHosts'` in `mail-config.php`. |
| "You have sent several messages in a few minutes" | Spam limit: 6 messages per visitor per 10 minutes. Wait a little. |
| Page shows the PHP code or downloads `send.php` | PHP is not enabled for the domain: ask the host or pick a PHP version in cPanel. |

### 7. Check the live site

- [ ] https://adsquidbd.com loads with a padlock.
- [ ] `http://adsquidbd.com` and `https://www.adsquidbd.com` both end up on `https://adsquidbd.com`.
- [ ] A wrong address (for example `/abc`) shows the "Signal lost" 404 page.
- [ ] Old addresses redirect: `/about-us`, `/contact-us`, `/portfolio`.
- [ ] https://adsquidbd.com/api/mail-config.php shows **403 Forbidden** (the settings stay private).
- [ ] All three forms send an email.
- [ ] Open the site on a phone.

### 8. Google, Bing and analytics

1. **Google Search Console:** Add property > **Domain** > `adsquidbd.com` > verify with the TXT record it gives you
   (cPanel > Zone Editor > Add Record > TXT). Then Sitemaps > submit `sitemap.xml`, and URL Inspection > Request indexing for the homepage.
2. **Bing Webmaster Tools:** sign in and choose "Import from Google Search Console".
3. **Google Business Profile:** use exactly the same name, address and phone as the site
   (Section-15, Mirpur, Dhaka-1216, +880 1888 055 999) and link to https://adsquidbd.com.
4. **Analytics (optional):** fill `analytics.gtm` / `ga4` / `metaPixel` in `src/config.mjs`, build and upload.
   They load after the page has finished loading; form sends push `generate_lead` (GA4) and `Lead` (Pixel).
   The Privacy Policy promises to ask EU and UK visitors for consent before these cookies are set, so add a cookie consent banner (or a consent mode setup in GTM) before you switch them on.

### 9. Updating the site later

1. Make your changes (see [Common jobs](#common-jobs)) and run `node src/build.mjs`.
2. Zip `dist` again (step 4), upload it to `public_html` and **Extract**, choosing to overwrite.
   CSS and JS links carry a version number, so visitors get the new files straight away.
3. `api/mail-config.php` is not part of `dist`, so extracting over the old files keeps it. If you ever empty
   `public_html` completely, create it again (step 6.3).
4. Save your changes to GitHub: `git add -A`, `git commit -m "..."`, `git push`.

**Other hosts:** Hostinger hPanel and DirectAdmin have the same tools under similar names (File Manager, SSL, Email Accounts).
Static-only hosts (Netlify, Cloudflare Pages, Vercel, GitHub Pages) cannot run PHP: there, put a Formspree or Web3Forms
endpoint in `formEndpoint` in `src/config.mjs` instead of `/api/send.php`.

---

## How the forms work

The three forms (homepage audit, `/free-audit/`, `/contact/`) post to `/api/send.php`:

1. The browser checks the required fields, then sends the form in the background and shows "Thank you!" on the page.
   Without JavaScript the form still posts normally and lands on `/thank-you/` (not indexed by Google).
2. `send.php` blocks spam (a hidden "fax" field people never fill, a minimum time on the page, a per-visitor limit, and only accepting posts from adsquidbd.com),
   cleans every field, and requires a name plus a phone, WhatsApp number or email.
3. It emails a formatted message to `info@adsquidbd.com` (with one-tap WhatsApp and Call links for the number)
   and sets the visitor's email as Reply-To, then saves the private CSV backup.

Settings live in `public_html/api/mail-config.php` on the server (template: `static/api/mail-config.example.php`).

## Folder map

| Path | What it is |
| --- | --- |
| `images/` | Image source files, copied into `dist/assets/...` by the build. `images/team/` = team portraits (serial 01-08), `images/clients/` = client logos, `images/work/` = portfolio pieces, `images/brand/` = logos and mascot (master files the site does not use are kept here but left out of the upload). |
| `static/` | Hand-written code copied as-is: `assets/css`, `assets/js`, `assets/vendor` (GSAP, ScrollTrigger, Lenis), `api/` (form handler), `.htaccess`. |
| `src/config.mjs` | Phone, email, offices, hours, social links, form endpoint, analytics IDs. |
| `src/data.mjs` | Page copy: 8 services with their sub-services, portfolio, clients, team, counters, timeline, FAQs. |
| `src/content/posts/` | Blog posts (one `.html` file each). `_template.html` explains how to add one. |
| `src/content/legal.mjs` | Privacy Policy and Terms and Conditions text. |
| `src/pages/*.mjs` | Page templates (home, services, work, blog, company pages, hero art, offices world map). |
| `src/layout.mjs` | `<head>`, header, mega menu, mobile menu, footer (written into every page). |
| `src/build.mjs` | The builder: pages, sitemap.xml, robots.txt, asset versioning, checks, and it leaves unused images out of `dist`. |
| `dist/` | The generated website. Do not edit by hand; it is rebuilt every time. |

## Common jobs

- **New blog post:** copy `src/content/posts/_template.html` to `src/content/posts/<slug>.html`, fill in the JSON, remove `"draft": true`, build. It appears on /blog/, in related posts, on the homepage (if newest) and in the sitemap.
- **Add portfolio work:** save the image as `images/work/<slug>.webp` (1280px wide) plus `<slug>-640.webp`, then add `{ slug, title, service, filter }` to `works` in `src/data.mjs` (`also` lists other service pages that should show it).
- **Add a client logo:** save a white-on-transparent logo as `images/clients/<slug>.webp` (238x92) and add it to `clients` in `src/data.mjs`.
- **Team change:** save the portrait as `images/team/<slug>.webp` (640x800) and `<slug>-320.webp`, then edit `team` in `src/data.mjs`. The list order is the serial number shown on the cards.
- **Services:** each service in `src/data.mjs` has `subs` (sub-services). They feed the mega menu, the infographic, the service page cards and the footer, so one edit updates everything.
- **Add an office:** add an entry to `offices` in `src/config.mjs` (copy the USA one). `region` lights up its continent on the /offices/ world map (`asia`, `north-america`; more can be added in `src/pages/worldmap.mjs`) and `mapPos` places its pin.
- **Change the legal pages:** edit `src/content/legal.mjs` and the date in `legalUpdated` (`src/config.mjs`).
- **Change menu, footer or contact details:** edit `src/layout.mjs` or `src/config.mjs`, build. Every page updates.

## How the homepage motion works

- **00 Hero:** the octopus mascot sits right of the text on desktop and above it on phones. It pops in, floats, glints, has floating status chips, tilts toward the cursor in 3D and hops when clicked. Its CSS is inlined on the homepage only. Font: Montserrat everywhere (headings 700, body 400, labels 600), from Google Fonts with a metric-matched Arial fallback so nothing moves when it loads.
- **01:** the three grey cards snap into a row.
- **02:** the eight-service infographic: four cards each side of a hexagon hub, wired to it with dotted lines (drawn by `main.js` from the real card positions). It tours the services slowly; hover or focus picks one. Also used on /services/.
- **04 Proof:** a 3D film reel of six works. On desktop it turns with the scroll and settles on the nearest work when scrolling stops; it can also be dragged. Click a frame to open the full-screen viewer.
- **03 to 09:** step chips light up, counters roll, bars rise, logo marquee, light-trail canvases, CTA video (loaded only near view, desktop only).
- **Reduced motion:** no smooth scrolling, no scrubbing, no tour. Everything is shown in its final state.

## Motion and performance rules (keep these when adding effects)

- Per-frame work only changes `transform` and `opacity`, written directly on the element that moves
  (never a CSS variable on a parent: variables inherit, so the whole subtree gets re-styled every frame).
- Anything that fades or moves every frame gets `will-change` so it has its own GPU layer.
- No `backdrop-filter` over moving content (video, parallax, scrolling cards); it re-blurs every frame.
- Canvases (shooting stars, cursor) draw at 1x and pause when off screen; stars are pre-drawn sprites.
- Everything visible in the first screen is styled by the inlined critical CSS, and below-the-hero content
  is hidden until `main.css` loads, so nothing jumps (layout shift is about 0 on every page, even on slow connections).
- The main hero text and images start their entrance already partly visible, so browsers count them as painted at once (good LCP).
- ScrollTrigger measures the page once on load; avoid extra `ScrollTrigger.refresh()` calls, each one re-measures the whole page.
- Reduced motion (or no JavaScript) gets the complete, still version of every page.

## Before launch: still to do

1. Permission from each client to show their logo and work.
2. Case studies with real numbers and client quotes (the portfolio shows images only; there are no testimonials yet).
3. Pricing ("from ৳X"), office hours and audit reply time (search `CONFIRM`).
4. Set up the form mailboxes and `mail-config.php` on the hosting (step 6 above), then test all three forms.
5. Have a lawyer review `src/content/legal.mjs`, and confirm the retention periods, payment terms and notice periods match how you work.
6. GTM / GA4 / Pixel IDs, plus a cookie consent banner before switching them on.
7. Google Search Console + Bing Webmaster, submit `/sitemap.xml`. Add any other old URLs to `.htaccess`.
