import { works, workFilters } from '../data.mjs';
import { icon, breadcrumbSchema, serviceBySlug, esc, abs } from '../lib.mjs';
import { pageHero, heroIcon } from './parts.mjs';

const workSrc = (w, size = '') => `/assets/images/work/${w.slug}${size}.webp`;

// One portfolio piece: opens full size in the lightbox (main.js); still a plain link to the image without JS.
export function workTile(w, { headingTag = 'h3' } = {}) {
  const s = serviceBySlug(w.service);
  return `<figure class="work-tile reveal" id="${w.slug}" data-filter="${w.filter}">
  <a class="work-open" href="${workSrc(w)}" data-lightbox data-title="${esc(w.title)}" data-cat="${esc(s.name)}" aria-label="View ${esc(w.title)} full size">
    <span class="work-media"><img src="${workSrc(w, '-640')}" srcset="${workSrc(w, '-640')} 640w, ${workSrc(w)} 1280w" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" width="1280" height="715" alt="${esc(w.title)}: ${esc(s.name.toLowerCase())} by Adsquid" loading="lazy" decoding="async"></span>
    <span class="work-zoom" aria-hidden="true">${icon('maximize-2')}</span>
  </a>
  <figcaption><span class="work-cat mono">${esc(s.name)}</span><${headingTag} class="work-title">${esc(w.title)}</${headingTag}></figcaption>
</figure>`;
}

// Full-size viewer for the tiles on a page (opened by main.js).
export function lightbox() {
  return `<dialog class="lightbox" aria-label="Portfolio viewer">
  <div class="lb-top"><div class="lb-title"><span class="lb-cat"></span><b class="lb-name"></b></div><button class="lb-btn lb-close" type="button" aria-label="Close">${icon('x')}</button></div>
  <div class="lb-stage"><img class="lb-img" src="data:," width="1280" height="715" alt=""></div>
  <div class="lb-nav"><button class="lb-btn lb-prev" type="button" aria-label="Previous work">${icon('arrow-left')}</button><span class="lb-count"></span><button class="lb-btn lb-next" type="button" aria-label="Next work">${icon('arrow-right')}</button></div>
</dialog>`;
}

export function workIndex() {
  const crumbs = [{ name: 'Work', path: '/work/' }];
  const count = (id) => (id === 'all' ? works.length : works.filter((w) => w.filter === id).length);
  const body = `
${pageHero({
  crumbs,
  h1: 'Our work: design, website and software portfolio',
  display: 'Work we are proud of.',
  sentence: 'Brand identities, social content, websites and software made by Teamsquid for clients around the world.',
  cls: 'hero-type',
  visual: heroIcon('work'),
})}
<section class="section work-index" aria-label="Portfolio">
  <div class="container">
    <div class="filters" role="toolbar" aria-label="Filter by service">
      ${workFilters.map((f, i) => `<button class="chip" type="button" data-filter="${f.id}" aria-pressed="${i === 0}">${f.name}<span class="chip-count">${count(f.id)}</span></button>`).join('')}
    </div>
    <div class="work-grid">${works.map((w) => workTile(w, { headingTag: 'h2' })).join('')}</div>
    <p class="empty-state" hidden>No projects in this category yet.</p>
  </div>
</section>
${lightbox()}`;
  return {
    path: '/work/',
    title: 'Our Work | Design, Website & Software Portfolio | Adsquid',
    desc: 'Brand identities, social media designs, websites and software dashboards made by the Adsquid team.',
    schema: [
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Adsquid portfolio',
        url: abs('/work/'),
        creator: { '@id': abs('/#organization') },
        image: works.map((w) => ({ '@type': 'ImageObject', name: w.title, contentUrl: abs(workSrc(w)), width: 1280, height: 715 })),
      },
    ],
    body,
  };
}
