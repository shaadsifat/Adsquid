import { breadcrumbs, img16, esc, splitWords, icon, teamImg } from '../lib.mjs';
import { team } from '../data.mjs';

// Full-screen image viewer (opened by main.js for any [data-lightbox] element on the page).
export function lightbox() {
  return `<dialog class="lightbox" aria-label="Image viewer">
  <div class="lb-top"><div class="lb-title"><span class="lb-cat"></span><b class="lb-name"></b></div><div class="lb-actions"><a class="btn btn-primary btn-sm lb-go" href="/work/"><span>View project</span>${icon('arrow-up-right')}</a><button class="lb-btn lb-close" type="button" aria-label="Close">${icon('x')}</button></div></div>
  <div class="lb-stage"><button class="lb-btn lb-prev" type="button" aria-label="Previous">${icon('arrow-left')}</button><img class="lb-img" src="data:," width="1280" height="715" alt=""><button class="lb-btn lb-next" type="button" aria-label="Next">${icon('arrow-right')}</button></div>
  <div class="lb-nav"><span class="lb-count"></span></div>
</dialog>`;
}

export function heroPreload(name) {
  const b = `/assets/images/${name}`;
  return `<link rel="preload" as="image" imagesrcset="${b}-768.webp 768w, ${b}-1280.webp 1280w, ${b}.webp 1920w" imagesizes="100vw" fetchpriority="high">`;
}

// Workflow visual for text-only heroes: a hexagon core with four steps orbiting it, joined by a flowing loop.
const FLOWS = {
  work: { core: 'layout-grid', steps: [['lightbulb', 'Idea'], ['pen-tool', 'Design'], ['rocket', 'Launch'], ['trending-up', 'Grow']] },
  network: { core: 'workflow', steps: [['megaphone', 'Ads'], ['palette', 'Creative'], ['code', 'Tech'], ['search', 'SEO']] },
  blog: { core: 'book-open', steps: [['lightbulb', 'Learn'], ['list-checks', 'Plan'], ['rocket', 'Apply'], ['trending-up', 'Grow']] },
  legal: { core: 'shield-check', steps: [['file-text', 'Clear'], ['eye', 'Open'], ['handshake', 'Fair'], ['badge-check', 'Safe']] },
};
export function heroIcon(kind = 'work') {
  const f = FLOWS[kind] || FLOWS.work;
  return `<div class="flow" aria-hidden="true">
      <svg class="flow-svg" viewBox="0 0 400 400">
        <circle class="flow-orbit" cx="200" cy="200" r="150"/>
        <circle class="flow-run" cx="200" cy="200" r="150" pathLength="100"/>
        <circle class="flow-orbit inner" cx="200" cy="200" r="96"/>
        ${[0, 1, 2, 3].map((i) => `<path class="flow-spoke" d="M200 200 L${200 + 150 * Math.cos(((i * 90 - 135) * Math.PI) / 180)} ${200 + 150 * Math.sin(((i * 90 - 135) * Math.PI) / 180)}" pathLength="1"/>`).join('')}
      </svg>
      <span class="flow-glow"></span>
      <span class="flow-core hex">${icon(f.core)}</span>
      ${f.steps.map(([ic, label], i) => `<span class="flow-step s${i}" style="--i:${i}"><span class="flow-dot">${icon(ic)}</span><span class="flow-label">${String(i + 1).padStart(2, '0')} ${label}</span></span>`).join('')}
    </div>`;
}

// About hero: the real team, fanned out (order 01-07).
export function teamFan() {
  // serial 01 in front, then pairs on either side: 06 04 02 01 03 05 07
  return `<div class="fan" aria-label="Teamsquid">
      ${team
        .map((m, i) => {
          const k = i === 0 ? 0 : (i % 2 ? -1 : 1) * Math.ceil(i / 2);
          // with an even team size, shift by half a step so the fan stays centred
          const o = k + (team.length % 2 === 0 ? 0.5 : 0);
          return `<figure class="fan-card${k < 0 ? ' fl' : k > 0 ? ' fr' : ' fc'}" style="--o:${o};--a:${Math.abs(o)};--z:${10 - Math.abs(k)}">${teamImg(m, { sizes: '180px', eager: true })}<b class="fan-num">${String(i + 1).padStart(2, '0')}</b><figcaption>${esc(m.name)}<span>${esc(m.role)}</span></figcaption></figure>`;
        })
        .join('')}
    </div>`;
}

// Inner page hero: small H1 keyword (eyebrow style), big display line, one sentence, buttons.
// image = full-bleed render behind the text; visual = HTML art on the right (text-only heroes).
export function pageHero({ crumbs, h1, display, sentence, image, imageAlt = '', buttons = '', extra = '', cls = '', visual = '' }) {
  const content = `${crumbs ? breadcrumbs(crumbs) : ''}
    <h1 class="eyebrow hero-eyebrow">${esc(h1)}</h1>
    <p class="display hero-display">${splitWords(display)}</p>
    ${sentence ? `<p class="hero-lead">${sentence}</p>` : ''}
    ${extra}
    ${buttons ? `<div class="btns hero-btns">${buttons}</div>` : ''}`;
  return `<section class="page-hero${image ? '' : ' no-media'}${visual ? ' has-visual' : ''}${cls ? ' ' + cls : ''}">
  ${image ? `<div class="page-hero-media">${img16(image, { priority: true, alt: imageAlt })}</div>` : `<canvas class="trails hero-trails" data-trails data-fade="left" data-density="1.8" data-speed="0.8" data-opacity="0.85" aria-hidden="true"></canvas>`}
  ${
    visual
      ? `<div class="container page-hero-grid">
    <div class="page-hero-visual">${visual}</div>
    <div class="page-hero-content">
    ${content}
    </div>
  </div>`
      : `<div class="container page-hero-content">
    ${content}
  </div>`
  }
</section>`;
}
