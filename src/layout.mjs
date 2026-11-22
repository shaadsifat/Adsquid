// Page shell: <head>, header + mega menu, mobile menu, footer.
// Header and footer are written into every HTML file at build time
// (never injected by JavaScript), so all menu links are crawlable.
import { site, year } from './config.mjs';
import { groups, services, adPages } from './data.mjs';
import { esc, abs, icon, brand, btn, waLink, objImg, serviceUrl } from './lib.mjs';

let assetVersion = (p) => p;
let criticalCss = '';
let wm = { w: 1200, h: 240 };
let base = '';
let forceNoindex = false;
export function configureLayout({ version, critical, wordmark, basePath = '', noindex = false }) {
  assetVersion = version;
  criticalCss = critical;
  if (wordmark) wm = wordmark;
  base = basePath;
  forceNoindex = noindex;
}

const navLinks = [
  { name: 'Work', path: '/work/' },
  { name: 'About', path: '/about/' },
  { name: 'Blog', path: '/blog/' },
  { name: 'Contact', path: '/contact/' },
];

function megaMenu() {
  const col = (g) => `<div class="mega-col">
        <p class="mega-group">${g.name}</p>
        <ul>
          ${services
            .filter((s) => s.group === g.id)
            .map(
              (s) => `<li>
            <a class="mega-link" href="${serviceUrl(s)}">
              <span class="mega-thumb">${objImg(s.key, { sizes: '56px' })}</span>
              <span><span class="mega-name">${s.name}</span><span class="mega-pitch">${s.pitch}</span></span>
            </a>
            ${
              s.slug === 'digital-ads-management'
                ? `<ul class="mega-sub">${adPages.map((a) => `<li><a href="/services/digital-ads-management/${a.slug}/">${a.name}</a></li>`).join('')}</ul>`
                : ''
            }
          </li>`
            )
            .join('')}
        </ul>
      </div>`;
  return `<div class="mega" id="mega-menu">
    <div class="container mega-inner">
      ${groups.map(col).join('')}
      <div class="mega-feature">
        <p class="eyebrow">Free audit</p>
        <p class="mega-feature-title">Find your growth leaks.</p>
        <p class="mega-feature-text">We review your ads, page and website, then send a 1-page plan.</p>
        ${btn('/free-audit/', 'Get a free audit')}
        <a class="mega-all" href="/services/">All services ${icon('arrow-right')}</a>
      </div>
    </div>
  </div>`;
}

function header(path) {
  const cur = (p) => (path.startsWith(p) ? ' aria-current="page"' : '');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a href="/" class="logo" aria-label="Adsquid home"><img src="/assets/images/brand/logo/adsquid-logo-on-dark.svg" width="160" height="48" alt="Adsquid"></a>
    <nav class="nav" aria-label="Main">
      <ul class="nav-list">
        <li class="has-mega">
          <button class="nav-link mega-toggle" type="button" aria-expanded="false" aria-controls="mega-menu"${path.startsWith('/services/') ? ' data-current' : ''}>Services ${icon('chevron-down', 'chev')}</button>
          ${megaMenu()}
        </li>
        ${navLinks.map((l) => `<li><a class="nav-link" href="${l.path}"${cur(l.path)}>${l.name}</a></li>`).join('\n        ')}
      </ul>
    </nav>
    ${btn('/free-audit/', 'Get a free audit', { cls: 'btn-sm header-cta btn-magnetic', iconName: '' })}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu"><span class="bars" aria-hidden="true"></span><span class="sr-only">Menu</span></button>
  </div>
</header>
<div class="progress" aria-hidden="true"><span></span></div>
<div class="mobile-menu" id="mobile-menu" hidden>
  <canvas class="trails" data-trails data-density="0.7" data-speed="0.6" data-opacity="0.5" aria-hidden="true"></canvas>
  <img class="m-mark" src="/assets/images/brand/logo/adsquid-mark-strokes.svg" width="320" height="320" alt="" aria-hidden="true" loading="lazy">
  <nav class="container mobile-inner" aria-label="Mobile">
    <p class="m-eyebrow mono"><span></span>Menu</p>
    <ul class="m-list">
      <li class="m-item m-has-sub">
        <button class="m-link m-toggle" type="button" aria-expanded="false" aria-controls="m-services"><span class="m-num mono">01</span><span class="m-label">Services</span><span class="m-plus" aria-hidden="true"></span></button>
        <div class="m-sub" id="m-services">
          <div class="m-sub-inner">
            <ul class="m-svc">${services.map((s) => `<li><a href="${serviceUrl(s)}"><span class="m-thumb">${objImg(s.key, { sizes: '44px' })}</span><span>${s.short}</span></a></li>`).join('')}</ul>
            <a class="m-all" href="/services/">All services ${icon('arrow-right')}</a>
          </div>
        </div>
      </li>
      ${navLinks.map((l, i) => `<li class="m-item"><a class="m-link" href="${l.path}"><span class="m-num mono">${String(i + 2).padStart(2, '0')}</span><span class="m-label">${l.name}</span>${icon('arrow-up-right', 'm-arrow')}</a></li>`).join('')}
    </ul>
    <div class="m-cta">
      <a class="btn btn-primary btn-block" href="/free-audit/"><span>Get a free audit</span>${icon('arrow-right')}</a>
      <div class="m-quick">
        <a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${brand('whatsapp', { mono: true, size: 20 })}<span>WhatsApp</span></a>
        <a class="btn btn-ghost" href="tel:${site.phoneHref}">${icon('phone')}<span>Call us</span></a>
      </div>
    </div>
    <div class="m-foot">
      <a href="mailto:${site.email}">${site.email}</a>
      <span>${site.address.street}, ${site.address.locality}</span>
    </div>
  </nav>
</div>`;
}

function footer() {
  const svcLink = (slug) => {
    const s = services.find((x) => x.slug === slug);
    return `<li><a href="${serviceUrl(s)}">${s.short === 'Content' ? 'Content Development' : s.short === 'Website' ? 'Website Development' : s.short === 'Software' ? 'Software Development' : s.short}</a></li>`;
  };
  const socials = [
    site.social.facebook && ['facebook', site.social.facebook],
    site.social.linkedin && ['linkedin', site.social.linkedin],
    site.social.instagram && ['instagram', site.social.instagram],
    site.social.youtube && ['youtube', site.social.youtube],
    site.social.tiktok && ['tiktok', site.social.tiktok],
    ['whatsapp', waLink()],
  ].filter(Boolean);
  return `<footer class="site-footer">
  <canvas class="trails" data-trails data-density="1.1" data-speed="0.8" data-opacity="0.6" aria-hidden="true"></canvas>
  <div class="container">
    <div class="footer-cta">
      <p class="footer-cta-title">Ready to grow?</p>
      <div class="btns">
        ${btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' })}
        <a class="btn btn-ghost" href="${waLink()}" target="_blank" rel="noopener">${brand('whatsapp', { mono: true, size: 20 })}<span>WhatsApp</span></a>
      </div>
    </div>
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo" aria-label="Adsquid home"><img src="/assets/images/brand/logo/adsquid-logo-on-dark.svg" width="160" height="48" alt="Adsquid" loading="lazy"></a>
        <p>${site.tagline} We plan, create and run ads, social, SEO, design, content, websites and software for brands across Bangladesh.</p>
        <p>One in-house team and clear monthly reports, so you know what your marketing brings back.</p>
        <ul class="socials">${socials.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener" aria-label="Adsquid on ${n[0].toUpperCase() + n.slice(1)}">${brand(n, { mono: true, size: 20 })}</a></li>`).join('')}</ul>
      </div>
      <div>
        <p class="footer-h">Services</p>
        <ul>
          <li><a href="/services/digital-ads-management/">Digital Ads Management</a></li>
          ${svcLink('graphic-design')}
          ${svcLink('content-development')}
          ${svcLink('website-development')}
          ${svcLink('software-development')}
        </ul>
      </div>
      <div>
        <p class="footer-h">Company</p>
        <ul>
          <li><a href="/about/">About</a></li>
          <li><a href="/work/">Work</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/careers/">Careers</a></li>
          <li><a href="/free-audit/">Free Audit</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-h">Contact</p>
        <ul class="footer-contact">
          <li><a href="tel:${site.phoneHref}">${icon('phone')}<span>${site.phone}</span></a></li>
          <li><a href="mailto:${site.email}">${icon('mail')}<span>${site.email}</span></a></li>
          <li>${icon('map-pin')}<span>${site.address.street}, ${site.address.locality} ${site.address.postalCode}</span></li>
          <li>${icon('clock')}<span>${site.hours}</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="wordmark" data-wordmark aria-hidden="true">
    <img class="wordmark-outline" src="/assets/images/brand/logo/adsquid-wordmark-outline.svg" alt="" width="${wm.w}" height="${wm.h}" loading="lazy">
    <div class="wm-lit"><div class="wm-mask"><span></span></div></div>
    <div class="wm-mask wm-spot"><span></span></div>
    <span class="wm-star"></span>
  </div>
  <div class="container footer-bottom">
    <p class="copy">Copyright &copy; <span class="js-year">${year}</span> | All rights are reserved by Adsquid <span class="legal"><a href="/privacy-policy/">Privacy Policy</a> &middot; <a href="/terms/">Terms</a> &middot; <a href="/sitemap.xml">Sitemap</a></span></p>
    <p class="credit">Design &amp; Developed by <strong>Shaad Sifat</strong></p>
  </div>
</footer>`;
}

/**
 * page: { path, title, desc, body, ogImage, ogType, schema: [], noindex, preload: [], bodyClass, scripts: [] }
 */
export function renderPage(page) {
  const canonical = abs(page.path === '/404.html' ? '/404.html' : page.path);
  const og = abs(page.ogImage || '/assets/images/brand/og-default.jpg');
  const schemas = (page.schema || []).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  const preloads = (page.preload || []).join('\n');
  const scripts = ['/assets/vendor/gsap.min.js', '/assets/vendor/ScrollTrigger.min.js', '/assets/vendor/lenis.min.js', '/assets/js/main.js', ...(page.scripts || [])]
    .map((s) => `<script src="${assetVersion(s)}" defer></script>`)
    .join('\n');
  const cfg = { base, form: site.formEndpoint, wa: site.whatsapp, gtm: site.analytics.gtm, ga4: site.analytics.ga4, pixel: site.analytics.metaPixel };

  return `<!doctype html>
<html lang="en-BD" id="top">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
<link rel="canonical" href="${canonical}">
${page.noindex || forceNoindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="Adsquid">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_BD">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#07050D">
<link rel="preload" href="/assets/fonts/montserrat-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
${preloads}
<style>${criticalCss}</style>
<link rel="preload" href="${assetVersion('/assets/css/main.css')}" as="style">
<link rel="stylesheet" href="${assetVersion('/assets/css/main.css')}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${assetVersion('/assets/css/main.css')}"></noscript>
<script>document.documentElement.classList.add('js');try{var q=location.search;if(/[?&]motion=off/.test(q))sessionStorage.removeItem('adsq-motion');else if(/[?&]motion/.test(q))sessionStorage.setItem('adsq-motion','1');if(sessionStorage.getItem('adsq-motion'))document.documentElement.classList.add('force-motion')}catch(e){if(/[?&]motion(?!=off)/.test(location.search))document.documentElement.classList.add('force-motion')}window.ADSQ=${JSON.stringify(cfg)};</script>
${scripts}
${schemas}
</head>
<body class="${page.bodyClass || ''}">
${header(page.path)}
<main id="main">
${page.body}
</main>
${footer()}
<div class="cursor" aria-hidden="true"><span class="cursor-pos"><span class="cursor-body"><span class="cursor-dance"><img src="/assets/images/brand/logo/adsquid-mark-strokes.svg" width="34" height="34" alt="" decoding="async"></span></span><span class="cursor-label"></span></span><span class="cursor-dot"></span></div>
</body>
</html>
`;
}
