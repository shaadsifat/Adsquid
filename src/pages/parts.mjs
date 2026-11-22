import { breadcrumbs, img16, esc, splitWords } from '../lib.mjs';

export function heroPreload(name) {
  const b = `/assets/images/${name}`;
  return `<link rel="preload" as="image" imagesrcset="${b}-768.webp 768w, ${b}-1280.webp 1280w, ${b}.webp 1920w" imagesizes="100vw" fetchpriority="high">`;
}

// Inner page hero: small H1 keyword (eyebrow style), big display line, one sentence, buttons.
export function pageHero({ crumbs, h1, display, sentence, image, imageAlt = '', buttons = '', extra = '', cls = '' }) {
  return `<section class="page-hero${image ? '' : ' no-media'}${cls ? ' ' + cls : ''}">
  ${image ? `<div class="page-hero-media">${img16(image, { priority: true, alt: imageAlt })}</div>` : `<canvas class="trails hero-trails" data-trails data-fade="left" data-density="1.8" data-speed="0.8" data-opacity="0.85" aria-hidden="true"></canvas>`}
  <div class="container page-hero-content">
    ${crumbs ? breadcrumbs(crumbs) : ''}
    <h1 class="eyebrow hero-eyebrow">${esc(h1)}</h1>
    <p class="display hero-display">${splitWords(display)}</p>
    ${sentence ? `<p class="hero-lead">${sentence}</p>` : ''}
    ${extra}
    ${buttons ? `<div class="btns hero-btns">${buttons}</div>` : ''}
  </div>
</section>`;
}
