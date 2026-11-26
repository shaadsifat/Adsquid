import { works, workFilters, services } from '../data.mjs';
import workCopy from '../content/works.mjs';
import { icon, btn, eyebrow, breadcrumbSchema, serviceBySlug, serviceUrl, subUrl, esc, abs } from '../lib.mjs';
import { pageHero, lightbox } from './parts.mjs';
import { heroArt } from './art.mjs';

const workSrc = (w, size = '') => `/assets/images/work/${w.slug}${size}.webp`;
export const workUrl = (w) => `/work/${w.slug}/`;
const subOf = (w) => {
  const [sv, sb] = workCopy[w.slug].sub.split('/');
  const s = services.find((x) => x.slug === sv);
  return { s, x: s.subs.find((y) => y.slug === sb) };
};

// One portfolio tile: links to the project's own page.
export function workTile(w, { headingTag = 'h3' } = {}) {
  const s = serviceBySlug(w.service);
  return `<figure class="work-tile reveal" id="${w.slug}" data-filter="${w.filter}">
  <a class="work-open" href="${workUrl(w)}" aria-label="Open the ${esc(w.title)} project">
    <span class="work-media"><img src="${workSrc(w, '-640')}" srcset="${workSrc(w, '-640')} 640w, ${workSrc(w)} 1280w" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" width="1280" height="715" alt="${esc(w.title)}: ${esc(s.name.toLowerCase())} by Adsquid" loading="lazy" decoding="async"></span>
    <span class="work-go" aria-hidden="true">${icon('arrow-up-right')}</span>
  </a>
  <figcaption><span class="work-cat mono">${esc(s.name)}</span><${headingTag} class="work-title"><a href="${workUrl(w)}">${esc(w.title)}</a></${headingTag}></figcaption>
</figure>`;
}

export function workIndex() {
  const crumbs = [{ name: 'Work', path: '/work/' }];
  const count = (id) => (id === 'all' ? works.length : works.filter((w) => w.filter === id).length);
  const body = `
${pageHero({
  crumbs,
  h1: 'Our work: design, website and software portfolio',
  display: 'Work we are<br class="br-m"> proud of.', // fixed break on phones, so the font swap cannot re-wrap it
  sentence: 'Brand identities, social content, websites and software made by Teamsquid for clients around the world.',
  cls: 'hero-type',
  visual: heroArt(['gallery', { images: ['custom-website-design', 'social-media-post-design', 'logo-design-branding'].map((slug) => `/assets/images/work/${slug}-640.webp`), chip: ['layout-grid', `${works.length} projects`], tags: [['gem', 'Brand'], ['image', 'Visual'], ['monitor-smartphone', 'Website'], ['cpu', 'Software']] }]),
})}
<section class="section work-index" aria-label="Portfolio">
  <div class="container">
    <div class="filters" role="toolbar" aria-label="Filter by service">
      ${workFilters.map((f, i) => `<button class="chip" type="button" data-filter="${f.id}" aria-pressed="${i === 0}">${f.name}<span class="chip-count">${count(f.id)}</span></button>`).join('')}
    </div>
    <div class="work-grid">${works.map((w) => workTile(w, { headingTag: 'h2' })).join('')}</div>
    <p class="empty-state" hidden>No projects in this category yet.</p>
  </div>
</section>`;
  return {
    path: '/work/',
    title: 'Our Work | Design, Website & Software Portfolio | Adsquid',
    desc: 'Brand identities, social media designs, websites and software dashboards made by the Adsquid team. Open any project to see the full details.',
    schema: [
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Adsquid portfolio',
        url: abs('/work/'),
        hasPart: works.map((w) => ({ '@type': 'CreativeWork', name: w.title, url: abs(workUrl(w)), image: abs(workSrc(w)) })),
      },
    ],
    body,
  };
}

// One page per portfolio piece: the image, what it shows and the service behind it.
export function workPage(w) {
  const c = workCopy[w.slug];
  const s = serviceBySlug(w.service);
  const { s: ps, x } = subOf(w);
  const path = workUrl(w);
  const crumbs = [
    { name: 'Work', path: '/work/' },
    { name: w.title, path },
  ];
  const i = works.indexOf(w);
  const prev = works[(i - 1 + works.length) % works.length];
  const next = works[(i + 1) % works.length];
  const related = [...works.filter((y) => y !== w && y.filter === w.filter), ...works.filter((y) => y !== w && y.filter !== w.filter)].slice(0, 3);

  const body = `
${pageHero({
  crumbs,
  h1: c.h1,
  display: `${esc(w.title)}.`,
  sentence: c.sentence,
  cls: 'hero-small hero-work',
  extra: `<ul class="tags"><li><a href="${serviceUrl(s)}">${esc(s.name)}</a></li>${c.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`,
})}
<div class="container work-shot">
  <figure>
    <button class="work-shot-view" type="button" data-lightbox data-src="${workSrc(w)}" data-title="${esc(w.title)}" data-cat="${esc(s.name)}" aria-label="View ${esc(w.title)} full screen">
      <img src="${workSrc(w)}" srcset="${workSrc(w, '-640')} 640w, ${workSrc(w)} 1280w" sizes="(min-width: 1180px) 1100px, 100vw" width="1280" height="715" alt="${esc(w.title)}: ${esc(c.sentence)}" fetchpriority="high" decoding="async">
      <span class="work-zoom" aria-hidden="true">${icon('maximize-2')}</span>
    </button>
  </figure>
</div>

<section class="section" aria-labelledby="about-work">
  <div class="container longform">
    <div class="longform-main">
      <h2 class="h3-lg" id="about-work">About this project</h2>
      <div class="prose-sm reveal">${c.about.map((p) => `<p>${p}</p>`).join('')}</div>
      <h2 class="h3-lg">How we approach projects like this</h2>
      <div class="prose-sm reveal"><p>${c.approach}</p><p>Want something similar? See our <a href="${subUrl(ps, x)}">${esc(x.title.toLowerCase())} service</a> or the full <a href="${serviceUrl(ps)}">${esc(ps.name.toLowerCase())}</a> page.</p></div>
    </div>
    <aside class="side-card card reveal" aria-label="Project details">
      <p class="eyebrow">Project details</p>
      <dl class="work-facts">
        <div><dt>Service</dt><dd><a href="${serviceUrl(s)}">${esc(s.name)}</a></dd></div>
        <div><dt>Speciality</dt><dd><a href="${subUrl(ps, x)}">${esc(x.title)}</a></dd></div>
        <div><dt>Studio</dt><dd>Adsquid, Dhaka</dd></div>
      </dl>
      <p class="eyebrow">What we delivered</p>
      <ul class="check-list">${c.delivered.map((d) => `<li>${icon('check')}<span>${d}</span></li>`).join('')}</ul>
      ${btn('/free-audit/', 'Start a similar project', { cls: 'btn-block' })}
    </aside>
  </div>
</section>

<nav class="section section-tight work-pager" aria-label="More projects">
  <div class="container work-pager-inner">
    ${[['prev', prev, 'Previous project', 'arrow-left'], ['next', next, 'Next project', 'arrow-right']]
      .map(
        ([cls, y, label, ic]) => `<a class="pager ${cls}" href="${workUrl(y)}">
      <span class="pager-media"><img src="${workSrc(y, '-640')}" width="640" height="357" alt="" loading="lazy" decoding="async"></span>
      <span class="pager-text"><small>${cls === 'prev' ? icon(ic) : ''}${label}${cls === 'next' ? icon(ic) : ''}</small><b>${esc(y.title)}</b><em>${esc(serviceBySlug(y.service).name)}</em></span>
    </a>`
      )
      .join('')}
  </div>
</nav>

<section class="section" aria-labelledby="more-work">
  <div class="container">
    <div class="sec-head split"><div>${eyebrow('More work')}<h2 class="h2" id="more-work" data-split>You might also like.</h2></div>${btn('/work/', 'All work', { variant: 'ghost' })}</div>
    <div class="work-grid">${related.map((y) => workTile(y)).join('')}</div>
  </div>
</section>
${lightbox()}`;

  return {
    path,
    title: `${w.title} | ${s.name} Portfolio | Adsquid`,
    desc: c.desc,
    ogImage: workSrc(w),
    preload: [`<link rel="preload" as="image" imagesrcset="${workSrc(w, '-640')} 640w, ${workSrc(w)} 1280w" imagesizes="(min-width: 1180px) 1100px, 100vw" fetchpriority="high">`],
    cta: { eyebrow: 'Like this work?', title: 'Your brand could be next.', text: 'Tell us what you need. Start with a free audit and a clear plan.' },
    schema: [
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: w.title,
        headline: c.h1,
        description: c.desc,
        image: abs(workSrc(w)),
        url: abs(path),
        genre: s.name,
        keywords: c.tags.join(', '),
        creator: { '@id': abs('/#organization'), '@type': 'Organization', name: 'Adsquid' },
      },
    ],
    body,
  };
}
