// Small HTML helpers shared by every page template.
import { readFileSync } from 'node:fs';
import { site } from './config.mjs';
import { services, team } from './data.mjs';

const ICONS = JSON.parse(readFileSync(new URL('./icons.json', import.meta.url), 'utf8'));
const BRANDS = JSON.parse(readFileSync(new URL('./brands.json', import.meta.url), 'utf8'));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const abs = (p) => site.url + p;

// Lucide line icon (1.5px stroke, decorative).
export function icon(name, cls = '') {
  const body = ICONS[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="i${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// Official brand mark (Simple Icons, CC0). Dark brand colours switch to white on Night.
export function brand(slug, { mono = false, size = 24 } = {}) {
  const b = BRANDS[slug];
  if (!b) throw new Error(`Unknown brand: ${slug}`);
  const n = parseInt(b.hex, 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  const fill = mono ? 'currentColor' : lum < 0.25 ? '#FFFFFF' : `#${b.hex}`;
  return `<svg class="brand" width="${size}" height="${size}" viewBox="0 0 24 24" role="img" aria-label="${esc(b.title)}"><path fill="${fill}" d="${b.path}"/></svg>`;
}
export const brandTitle = (slug) => BRANDS[slug]?.title || slug;

// 16:9 renders: name.webp 1920x1072, -1280, -768 (see ADSQUID-IMAGES-README.txt).
export function img16(name, { alt = '', cls = '', sizes = '100vw', priority = false, placeholder = false } = {}) {
  const b = `/assets/images/${name}`;
  return `<img src="${b}.webp" srcset="${b}-768.webp 768w, ${b}-1280.webp 1280w, ${b}.webp 1920w" sizes="${sizes}" width="1920" height="1072" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${priority ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${placeholder ? ' data-placeholder' : ''}>`;
}

// 1:1 service objects: obj-*.webp 1024, -640, -320.
export function objImg(key, { sizes = '320px', alt = '', cls = '' } = {}) {
  const b = `/assets/images/services/obj-${key}`;
  return `<img src="${b}-640.webp" srcset="${b}-320.webp 320w, ${b}-640.webp 640w, ${b}.webp 1024w" sizes="${sizes}" width="640" height="640" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} loading="lazy" decoding="async">`;
}

export function teamImg(m, { sizes = '(min-width: 1024px) 25vw, 50vw', eager = false } = {}) {
  const b = `/assets/images/team/${m.photo}`;
  return `<img src="${b}.webp" srcset="${b}-320.webp 320w, ${b}.webp 640w" sizes="${sizes}" width="640" height="800" alt="${esc(m.name)}, ${esc(m.role)} at Adsquid"${eager ? '' : ' loading="lazy"'} decoding="async">`;
}

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);
export const serviceUrl = (s) => `/services/${s.slug}/`;
export const subUrl = (s, x) => `/services/${s.slug}/${x.slug}/`;
// Per-service art: obj-<key> thumbnails, page hero and blog cover (a service can override hero/cover).
export const heroOf = (s) => s.hero || `services/hero-${s.key}`;
export const coverOf = (s) => s.cover || `blog/cover-${s.key}`;
// Sub-service anchor on the service page (mega menu and infographic link straight to it).
export const subId = (x) => 'sub-' + x.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Hexagon icon badge (service icons in menus, infographic and cards).
export const hexIcon = (name, cls = '') => `<span class="hex${cls ? ' ' + cls : ''}" aria-hidden="true">${icon(name)}</span>`;
// A sub-service mark: brand logo when it is a platform, otherwise a line icon.
export const subMark = (x, size = 20) => (x.brand ? brand(x.brand, { size }) : icon(x.icon));

export function btn(href, label, { variant = 'primary', iconName = 'arrow-right', cls = '', attrs = '' } = {}) {
  const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
  return `<a class="btn btn-${variant}${cls ? ' ' + cls : ''}" href="${esc(href)}"${ext}${attrs ? ' ' + attrs : ''}><span>${label}</span>${iconName ? icon(iconName) : ''}</a>`;
}

export const waLink = (text = 'Hi Adsquid, I would like to talk about growing my business.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export function waBtn(label = 'WhatsApp us', cls = '') {
  return `<a class="btn btn-wa${cls ? ' ' + cls : ''}" href="${waLink()}" target="_blank" rel="noopener">${brand('whatsapp', { mono: true, size: 20 })}<span>${label}</span></a>`;
}

export function eyebrow(text, num) {
  return `<span class="eyebrow">${num ? `<span class="eyebrow-num">${num}</span> / ` : ''}${text}</span>`;
}

export function sectionHead({ num, label, title, text, center = false, tag = 'h2', id = '' }) {
  return `<div class="sec-head${center ? ' center' : ''}">
    ${label ? eyebrow(label, num) : ''}
    <${tag} class="h2"${id ? ` id="${id}"` : ''} data-split>${title}</${tag}>
    ${text ? `<p class="sec-lead reveal">${text}</p>` : ''}
  </div>`;
}

export function faqBlock(items, { title = 'Questions, answered.', num } = {}) {
  return `<section class="section faq" aria-labelledby="faq-title">
  <div class="container narrow">
    <div class="sec-head">${eyebrow('FAQ', num)}<h2 class="h2" id="faq-title" data-split>${title}</h2></div>
    <div class="faq-list">
      ${items
        .map(
          (f) => `<details class="faq-item reveal">
        <summary><span>${esc(f.q)}</span>${icon('plus', 'faq-icon')}</summary>
        <div class="faq-a"><p>${esc(f.a)}</p></div>
      </details>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;
}

// The one closing call-to-action section of every page (layout.mjs adds it after the page body).
export function ctaBand({ eyebrow: eb = 'Ready to grow?', title = 'Your brand could be next.', text = 'Start with a free audit. We will show you where the growth is hiding.' } = {}) {
  return `<section class="cta-band" aria-labelledby="cta-band-title">
  <canvas class="trails" data-trails data-density="1.4" data-speed="0.9" data-opacity="0.7" aria-hidden="true"></canvas>
  <div class="container cta-band-inner">
    <div class="cta-band-text">
      <p class="eyebrow">${eb}</p>
      <h2 class="h2 cta-band-title" id="cta-band-title" data-split>${title}</h2>
      <p class="reveal">${text}</p>
    </div>
    <div class="btns reveal">
      ${btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' })}
      ${waBtn()}
    </div>
  </div>
</section>`;
}

export function breadcrumbs(trail) {
  // trail: [{name, path}] excluding Home
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items
    .map((c, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(c.name)}</li>`
        : `<li><a href="${c.path}">${esc(c.name)}</a></li>`
    )
    .join('')}</ol></nav>`;
}

export function breadcrumbSchema(trail) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function orgSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': abs('/#organization'),
    name: site.name,
    url: abs('/'),
    logo: abs('/assets/images/brand/logo/adsquid-logo-1200.png'),
    image: abs('/assets/images/brand/og-default.jpg'),
    description: site.tagline,
    email: site.email,
    telephone: site.phoneHref,
    foundingDate: site.founded,
    priceRange: '৳৳',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: site.hoursSpec.days, opens: site.hoursSpec.opens, closes: site.hoursSpec.closes },
    ],
    areaServed: 'Worldwide',
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'customer service', telephone: site.phoneHref, email: site.email, areaServed: 'Worldwide', availableLanguage: ['English', 'Bengali'] },
    ],
    location: (site.offices || []).map((o) => ({
      '@type': 'Place',
      name: `Adsquid ${o.head ? 'Head Office' : o.label || 'Office'}, ${o.city}`,
      address: { '@type': 'PostalAddress', ...o.schema },
    })),
    knowsAbout: services.map((s) => s.name),
    employee: team.map((t) => ({
      '@type': 'Person',
      name: t.name,
      jobTitle: t.role,
      image: abs(`/assets/images/team/${t.photo}.webp`),
      ...(t.linkedin ? { sameAs: [t.linkedin] } : {}),
      worksFor: { '@id': abs('/#organization') },
    })),
    sameAs,
  };
}

// About and Contact pages say what they are, and point to the organisation
export function pageTypeSchema(type, path, name) {
  return { '@context': 'https://schema.org', '@type': type, '@id': abs(path), url: abs(path), name, about: { '@id': abs('/#organization') }, mainEntity: { '@id': abs('/#organization') } };
}

export function serviceSchema({ name, desc, path, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: serviceType || name,
    description: desc,
    url: abs(path),
    provider: { '@id': abs('/#organization'), '@type': 'Organization', name: site.name, url: abs('/') },
    areaServed: 'Worldwide',
  };
}

// A thin rounded line with 45-degree bends, drawn on scroll (stroke-dashoffset).
export function signalLine(cls = '') {
  return `<svg class="signal-line${cls ? ' ' + cls : ''}" viewBox="0 0 1200 52" preserveAspectRatio="none" aria-hidden="true"><path class="glow" d="M26 26 H1174"/><path d="M26 26 H1174"/></svg>`;
}

// Wrap each word of a display line in masks for a CSS word-by-word reveal. Text stays real HTML (SEO-safe).
export function splitWords(html) {
  let i = 0;
  // keep line breaks (also <br class="..."> for breaks that only apply on some screens) as they are
  return html
    .split(/(<br\b[^>]*>)/)
    .map((part) =>
      /^<br/.test(part)
        ? part
        : part.replace(/[^\s<>]+/g, (w) => `<span class="ws"><span style="--i:${i++}">${w}</span></span>`)
    )
    .join('');
}

// Client logo (white on transparent, 238x92).
export function clientLogo(c, { hidden = false } = {}) {
  return `<span class="client-logo"${hidden ? ' aria-hidden="true"' : ''}><img src="/assets/images/clients/${c.logo}.webp" width="238" height="92" alt="${hidden ? '' : esc(c.name) + ' logo'}" loading="lazy" decoding="async"></span>`;
}

export function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
