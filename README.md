# Adsquid website (adsquidbd.com)

Static HTML/CSS/JS website with one small PHP file for the forms. No database, nothing to install on the hosting.

- [Put the website live (cPanel, no command line)](#put-the-website-live-cpanel-no-command-line)
- [Updating the website later](#updating-the-website-later)
- [How the forms work](#how-the-forms-work)
- [For developers](#for-developers)
- [Before launch](#before-launch-still-to-do)

> **About "noindex":** the GitHub Pages preview (`shaadsifat.github.io/Adsquid`) has `noindex` on every page on purpose,
> so Google never lists the test copy. The real website in `adsquid-website.zip` is open to Google
> (`index, follow`). Only the 404 page and the form thank-you page are `noindex`, which is correct for those two.

---

## Put the website live (cPanel, no command line)

This guide is for **shared hosting with cPanel**, where adsquidbd.com is added as an **extra domain** next to the
domains already on your account. Everything is done by clicking, in your browser.

### The only file you upload: `adsquid-website.zip`

It is the finished website (all 91 pages, images, the form handler and the `.htaccess` settings), already built and
ready. It sits in the main folder of this project and is updated every time the website is rebuilt.

- **On this computer:** `F:\2.Personal\8.AdSquid\adsquid-website.zip`
- **From GitHub:** open https://github.com/shaadsifat/Adsquid, click **`adsquid-website.zip`**, then the
  **Download** button (the arrow icon, "Download raw file") on the right.

Do not upload the other folders of this project (`src`, `images`, `static`...): they are the source the website is built from, not the website.

### Step 1: Point adsquidbd.com to your hosting

Use the same nameservers as the other domains on your hosting account (they are in your hosting welcome email,
or ask your host's support).

1. Log in where **adsquidbd.com** is registered.
2. Open the domain > **Nameservers** (sometimes under "DNS" or "Manage") > choose **Custom nameservers**.
3. Enter the two nameservers of your hosting (for example `ns1.yourhost.com` and `ns2.yourhost.com`) and save.

It can take from a few minutes up to 24 hours. You can check progress at [dnschecker.org](https://dnschecker.org) (type `adsquidbd.com`, choose "NS").

> If you already receive email on @adsquidbd.com somewhere else (for example Google Workspace), note its MX and TXT
> records before changing nameservers, and add them again in cPanel > **Zone Editor** after step 2.

### Step 2: Add adsquidbd.com to cPanel

1. cPanel > **Domains** > **Create A New Domain**.
2. **Domain:** `adsquidbd.com`
3. **Untick** "Share document root (/home/*user*/public_html) with ...". The website needs its own folder.
4. **Document Root:** keep what cPanel suggests (usually `adsquidbd.com`, which is the folder `/home/user/adsquidbd.com`).
5. Click **Submit**.

On older cPanel the same thing is under **Domains > Addon Domains**: New Domain Name `adsquidbd.com`, leave the
Document Root it fills in, **Add Domain**.

Write down the Document Root folder. Below it is called **the site folder**.

### Step 3: Turn on HTTPS (free SSL)

1. cPanel > **Security** > **SSL/TLS Status**.
2. Tick `adsquidbd.com` and `www.adsquidbd.com` > **Run AutoSSL**.
3. Wait until both show a green padlock (a few minutes; it only works once step 1 has finished).

Do this before uploading: the website sends every visitor to `https://adsquidbd.com`, so without a certificate browsers show a warning.

### Step 4: Upload the website

1. cPanel > **File Manager** > **Settings** (top right) > tick **Show Hidden Files (dotfiles)** > Save.
2. Open **the site folder** (for example `adsquidbd.com`).
   If it holds files from an old website: select them all > **Compress** > download that zip as a backup, then **Delete**
   the old files (keep `.well-known` and `cgi-bin` if they are there).
3. Click **Upload** > choose `adsquid-website.zip` > wait for 100% > click "Go Back to ...".
4. Right-click `adsquid-website.zip` > **Extract** > make sure the path is the site folder > **Extract File(s)**.
5. Right-click `adsquid-website.zip` > **Delete** (it is no longer needed on the server).
6. Check that the site folder now looks like this (files directly inside it, not in an extra sub-folder):

```
adsquidbd.com/            <- the site folder
  .htaccess               <- HTTPS, redirects, caching, 404 page
  index.html
  404.html
  robots.txt, sitemap.xml
  api/
    .htaccess             <- keeps the mail settings private
    send.php              <- the form handler
    mail-config.example.php
  assets/  about/  blog/  contact/  offices/  services/  work/ ...
```

Open https://adsquidbd.com: the website should appear.

### Step 5: Make the forms send email

1. **Create the sender mailbox:** cPanel > **Email Accounts** > **Create**.
   Your account has several domains, so pick **adsquidbd.com** in the Domain list.
   Username `no-reply`, a strong password > **Create**.
   Also create `info` if you want to read the form messages on this hosting (skip it if info@adsquidbd.com already lives in Google Workspace or similar).
2. **Keep the emails out of spam:** cPanel > **Email Deliverability** > the row for `adsquidbd.com` > **Repair**
   (or "Install the suggested record") for SPF and DKIM.
3. **Find the mail server details:** Email Accounts > `no-reply@adsquidbd.com` > **Connect Devices**. Note the
   **Outgoing Server** (for example `mail.adsquidbd.com`) and the **SMTP Port** (usually 465).
4. **Add the mail login to the website:** File Manager > the site folder > `api`:
   - right-click `mail-config.example.php` > **Edit** > select all the text and copy it > Close;
   - click **+ File** (top left) > New File Name `mail-config.php` > Create New File;
   - right-click `mail-config.php` > **Edit** > paste the text, then change:
   - `'to'` : the address that receives the messages, for example `info@adsquidbd.com` (several: separate with commas);
   - `'from'` and `'user'` : `no-reply@adsquidbd.com`;
   - `'pass'` : the no-reply mailbox password;
   - `'host'` and `'port'` : the Outgoing Server and SMTP Port from point 3.

   Click **Save Changes**. This file holds a password: it is never part of the zip or of GitHub, and the website blocks anyone from opening it.
5. **PHP version:** cPanel > **MultiPHP Manager** > tick `adsquidbd.com` > choose **PHP 8.1** or newer > Apply.
6. **Test:** on https://adsquidbd.com/contact/ send a message with your own email address. The page says "Thank you!"
   and the email arrives within a minute (check the spam folder the first time). Test https://adsquidbd.com/free-audit/ and the form at the bottom of the homepage too.

**Backup of every message:** each form message is also saved privately in File Manager > **Home** (the house icon)
> `adsquid-leads` > `leads-YYYY-MM.csv` (right-click > Download, opens in Excel). The `emailed` column says `yes`, or
shows why an email failed, so no lead is ever lost. This folder is outside all your websites, so no one can open it from the web.
(On the few hosts that do not allow this, the backup goes to `api/private-leads` in the site folder instead, locked the same way.)

**If something goes wrong:**

| What you see | What to do |
| --- | --- |
| A form says "Something went wrong" | Open the site folder > `api` > `error_log` (or cPanel > **Errors**) and see the table rows below. |
| `error_log` shows `(hidden) -> 535` | Wrong mailbox password or username in `mail-config.php`. |
| `error_log` shows `connect failed` | In `mail-config.php` try `'port' => 587` and `'secure' => 'tls'`, or ask your host which SMTP port is open. |
| `mail() returned false` | You have not created `mail-config.php` yet and the host blocks PHP's built-in mail: do step 5.4. |
| "This form only works on adsquidbd.com" | You are testing on a different address (for example a temporary cPanel link): open the site at https://adsquidbd.com. |
| "You have sent several messages in a few minutes" | Spam protection: 6 messages per visitor per 10 minutes. Wait a little. |
| **500 Internal Server Error** on every page | Edit `.htaccess` in the site folder, put `#` in front of the line `Options -Indexes`, Save, reload. |
| The browser warns the site is not secure | AutoSSL has not finished (step 3). Wait, then run it again. |
| The browser downloads `send.php` or shows PHP code | PHP is off for this domain: pick a PHP version in MultiPHP Manager (step 5.5). |

### Step 6: Check the live website

- [ ] https://adsquidbd.com opens with a padlock.
- [ ] `http://adsquidbd.com` and `https://www.adsquidbd.com` both end up on `https://adsquidbd.com`.
- [ ] A wrong address (for example https://adsquidbd.com/abc) shows the "Signal lost" 404 page.
- [ ] Old addresses still work and redirect: `/about-us`, `/contact-us`, `/portfolio`.
- [ ] https://adsquidbd.com/api/mail-config.php shows **403 Forbidden** (your password stays private).
- [ ] All three forms send an email.
- [ ] The website looks right on a phone.

### Step 7: Google and Bing

1. **Google Search Console** (search.google.com/search-console): Add property > **Domain** > `adsquidbd.com`.
   Copy the TXT record it shows, then cPanel > **Zone Editor** > `adsquidbd.com` > **+ Add Record** > type **TXT**,
   paste it, Save, and click Verify in Search Console (it can take a few minutes).
   Then **Sitemaps** > enter `sitemap.xml` > Submit, and **URL Inspection** > `https://adsquidbd.com/` > Request indexing.
2. **Bing Webmaster Tools** (bing.com/webmasters): sign in > **Import from Google Search Console**.
3. **Google Business Profile:** use exactly the same name, address and phone as the website
   (Section-15, Mirpur, Dhaka-1216, +880 1888 055 999) and add the link https://adsquidbd.com.

---

## Updating the website later

1. After the website is changed and rebuilt, the new `adsquid-website.zip` is on GitHub (and in the project folder).
2. Download it, then in File Manager open the site folder > **Upload** it > right-click > **Extract** into the site folder.
   The new files replace the old ones.
3. Delete the zip from the server.

Your `api/mail-config.php` is not in the zip, so it stays as it is. If you ever empty the site folder completely,
create it again (step 5.4). Pages that were removed from the website stay on the server until you delete them; for
a full clean refresh, delete everything in the site folder except `api/mail-config.php` and `.well-known`, then extract the new zip.

---

## How the forms work

The three forms (homepage audit, `/free-audit/`, `/contact/`) send to `/api/send.php`:

1. The browser checks the required fields, sends the form in the background and shows "Thank you!" on the page.
   Without JavaScript the form still works and lands on `/thank-you/`.
2. `send.php` blocks spam (a hidden field people never fill, a minimum time on the page, a limit per visitor, and only
   accepting messages sent from adsquidbd.com), cleans every field, and needs a name plus a phone, WhatsApp number or email.
3. It emails a formatted message (with one-tap WhatsApp and Call links) and sets the visitor's email as Reply-To,
   then saves the private CSV backup in your hosting home folder.

Settings: `api/mail-config.php` on the server (template: `static/api/mail-config.example.php`).
On the GitHub Pages preview, which cannot run PHP, the forms hand the details over to WhatsApp instead.

---

## For developers

### Commands

```bash
node src/build.mjs     # build the website into /dist and adsquid-website.zip (about 2 seconds)
node serve.mjs         # preview at http://localhost:8080 (clean URLs, 404 page, test form replies)
```

Or double-click **`preview.bat`** (builds, opens the browser, serves). Opening `dist/index.html` straight from disk does
not work: the site uses root paths (`/assets/...`) and clean URLs, which need a server. The preview server answers form
posts like the real PHP handler (nothing is emailed).

After a build, commit `adsquid-website.zip` together with the code so the owner can download the latest version from GitHub.

**GitHub Pages preview:** double-click **`publish-pages.bat`**. It builds a `noindex` copy for
`https://shaadsifat.github.io/Adsquid/` (`node src/build.mjs --base=/Adsquid --out=build-pages --noindex`) and pushes it
to the `gh-pages` branch (Settings > Pages > Source "Deploy from a branch", Branch `gh-pages`, folder `/ (root)`).

URL switches for previewing:
- `?placeholders` outlines every element still marked `data-placeholder`.
- `?motion` forces animations on for the tab, even when Windows "Show animations" is off. `?motion=off` clears it.

Static-only hosts (Netlify, Cloudflare Pages, Vercel) cannot run PHP: there, put a Formspree or Web3Forms endpoint in
`formEndpoint` in `src/config.mjs` instead of `/api/send.php`.

### Folder map

| Path | What it is |
| --- | --- |
| `adsquid-website.zip` | The finished website, ready to upload (made by the build). |
| `images/` | Image source files, copied into the website by the build. `images/team/` = team portraits (serial 01-08), `images/clients/` = client logos, `images/work/` = portfolio pieces, `images/brand/` = logos and mascot (master files the site does not use are kept here but left out of the website). |
| `static/` | Hand-written code copied as-is: `assets/css`, `assets/js`, `assets/vendor` (GSAP, ScrollTrigger, Lenis), `api/` (form handler), `.htaccess`. |
| `src/config.mjs` | Phone, email, offices, hours, social links, form endpoint, analytics IDs. |
| `src/data.mjs` | Page copy: 8 services with their sub-services, portfolio, clients, team, counters, timeline, FAQs. |
| `src/content/posts/` | Blog posts (one `.html` file each). `_template.html` explains how to add one. |
| `src/content/legal.mjs` | Privacy Policy and Terms and Conditions text. |
| `src/pages/*.mjs` | Page templates (home, services, work, blog, company pages, hero art, offices world map). |
| `src/layout.mjs` | `<head>`, header, mega menu, mobile menu, footer (written into every page). |
| `src/build.mjs` | The builder: pages, sitemap.xml, robots.txt, asset versioning, checks, leaves unused images out, makes the zip. |
| `dist/` | The generated website (the same files as the zip). Do not edit by hand. |

### Common jobs

- **New blog post:** copy `src/content/posts/_template.html` to `src/content/posts/<slug>.html`, fill in the JSON, remove `"draft": true`, build.
- **Add portfolio work:** save the image as `images/work/<slug>.webp` (1280px wide) plus `<slug>-640.webp`, then add `{ slug, title, service, filter }` to `works` in `src/data.mjs`.
- **Add a client logo:** save a white-on-transparent logo as `images/clients/<slug>.webp` (238x92) and add it to `clients` in `src/data.mjs`.
- **Team change:** save the portrait as `images/team/<slug>.webp` (640x800) and `<slug>-320.webp`, then edit `team` in `src/data.mjs`. The list order is the serial number shown on the cards.
- **Services:** each service in `src/data.mjs` has `subs`. They feed the mega menu, the infographic, the service pages and the footer.
- **Add an office:** add an entry to `offices` in `src/config.mjs` (copy the USA one). `region` lights up its continent on the /offices/ world map (`asia`, `north-america`; more can be added in `src/pages/worldmap.mjs`) and `mapPos` places its pin.
- **Legal pages:** edit `src/content/legal.mjs` and the date in `legalUpdated` (`src/config.mjs`).
- **Analytics:** fill `analytics.gtm` / `ga4` / `metaPixel` in `src/config.mjs`. They load after the page has loaded; form sends push `generate_lead` / `Lead`. Add a cookie consent banner first: the Privacy Policy promises to ask EU and UK visitors before these cookies are set.

### Motion and performance rules (keep these when adding effects)

- Per-frame work only changes `transform` and `opacity`, written directly on the element that moves.
- Anything that fades or moves every frame gets `will-change` so it has its own GPU layer.
- No `backdrop-filter` over moving content; it re-blurs every frame.
- Canvases (shooting stars, cursor) draw at 1x and pause when off screen.
- First-screen content is styled by the inlined critical CSS, and below-the-hero content is hidden until `main.css` loads, so nothing jumps (layout shift is about 0 on every page).
- Hero text and images start their entrance already partly visible, so browsers count them as painted at once (good LCP).
- ScrollTrigger measures the page once on load; avoid extra `ScrollTrigger.refresh()` calls.
- Reduced motion (or no JavaScript) gets the complete, still version of every page.

---

## Before launch: still to do

1. Permission from each client to show their logo and work.
2. Case studies with real numbers and client quotes (there are no testimonials yet).
3. Pricing ("from ৳X"), office hours and audit reply time (search `CONFIRM` in `src`).
4. On the hosting: create the mailboxes and `mail-config.php` (step 5), then test all three forms.
5. Have a lawyer review `src/content/legal.mjs`, and confirm the retention periods, payment terms and notice periods match how you work.
6. GTM / GA4 / Pixel IDs, plus a cookie consent banner before switching them on.
7. Google Search Console + Bing Webmaster (step 7). Add any other old URLs to `.htaccess`.
