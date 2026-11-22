import { work, workFilters } from '../data.mjs';
import { img16, icon, btn, eyebrow, ctaBand, breadcrumbSchema, serviceBySlug, serviceUrl, esc, abs } from '../lib.mjs';
import { pageHero, heroPreload } from './parts.mjs';

export function workCard(w, { tilt = false, headingTag = 'h3' } = {}) {
  return `<article class="card work-card reveal"${tilt ? ' data-tilt' : ''} data-filters="${w.filters.join(' ')}" data-placeholder>
  <a href="/work/${w.slug}/" class="card-link">
    <span class="work-cover">${img16(w.cover, { sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', alt: `${w.client} project cover` })}<span class="sample-tag mono">SAMPLE</span></span>
    <span class="work-meta mono">${esc(w.industry)}</span>
    <${headingTag} class="work-client">${esc(w.client)}</${headingTag}>
    <span class="work-result">${esc(w.result)}</span>
  </a>
</article>`;
}

export function workIndex() {
  const crumbs = [{ name: 'Work', path: '/work/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'Digital marketing case studies',
  display: 'Work that<br> moved numbers.',
  sentence: 'Campaigns, websites and content we built for brands in Bangladesh, with the numbers behind them.',
  cls: 'hero-type',
  extra: `<svg class="hero-signal" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true"><path class="glow" d="M0 150 H560 L600 110 H1200"/><path d="M0 150 H560 L600 110 H1200"/></svg>`,
})}
<section class="section work-index" aria-label="Projects">
  <div class="container">
    <div class="filters" role="toolbar" aria-label="Filter by service">
      ${workFilters.map((f, i) => `<button class="chip" type="button" data-filter="${f.id}" aria-pressed="${i === 0}">${f.name}</button>`).join('')}
    </div>
    <p class="note" data-placeholder>Sample projects shown while real case studies are prepared.</p>
    <div class="cards-3 work-grid">${work.map((w) => workCard(w, { tilt: true, headingTag: 'h2' })).join('')}</div>
    <p class="empty-state" hidden>No projects in this category yet.</p>
  </div>
</section>
${ctaBand({ title: 'Your brand could be next.', text: 'Start with a free audit. We will show you where the growth is hiding.' })}`;
  return {
    path: '/work/',
    title: 'Our Work | Case Studies | Adsquid',
    desc: 'Real campaigns, websites and content we built for brands in Bangladesh, with the numbers behind them.',
    schema: [breadcrumbSchema(crumbs)],
    body,
  };
}

export function casePage(w) {
  const path = `/work/${w.slug}/`;
  const crumbs = [
    { name: 'Work', path: '/work/' },
    { name: w.client, path },
  ];
  const idx = work.indexOf(w);
  const next = work[(idx + 1) % work.length];
  const svcs = w.services.map(serviceBySlug);
  const gallery = ['mockups/laptop-phone', 'mockups/three-phones', 'mockups/poster-frames'];

  const body = `
${pageHero({
  crumbs,
  h1: w.client,
  display: esc(w.headline),
  sentence: esc(w.challenge),
  cls: 'hero-small',
  extra: `<ul class="tags"><li>${esc(w.industry)}</li>${svcs.map((s) => `<li><a href="${serviceUrl(s)}">${s.short}</a></li>`).join('')}<li>${w.year}</li></ul>`,
})}
<div class="container case-cover">${img16(w.cover, { priority: true, sizes: '(min-width: 1280px) 1200px, 100vw', alt: `${w.client} project visual` })}</div>
<div class="sample-banner" data-placeholder><div class="container">${icon('sparkles')} This is a SAMPLE case study. Replace it with a real project before launch.</div></div>

<section class="section" aria-labelledby="ch-title">
  <div class="container case-grid">
    <div>
      ${eyebrow('Challenge', '01')}
      <h2 class="h3-lg" id="ch-title">${esc(w.challenge)}</h2>
    </div>
    <div>
      ${eyebrow('What we did', '02')}
      <ul class="check-list">${w.did.map((d) => `<li>${icon('check')}<span>${esc(d)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="res-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Results', '03')}<h2 class="h2" id="res-title" data-split>The numbers.</h2></div>
    <dl class="result-nums">${w.numbers.map((n) => `<div class="card reveal"><dd class="big-num">${esc(n.value)}</dd><dt>${esc(n.label)}</dt></div>`).join('')}</dl>
  </div>
</section>

<section class="section" aria-label="Gallery">
  <div class="container">
    ${eyebrow('Visuals', '04')}
    <div class="gallery">${gallery.map((g) => `<figure class="reveal">${img16(g, { sizes: '(min-width: 1024px) 50vw, 100vw', alt: 'Project mockup placeholder', placeholder: true })}</figure>`).join('')}</div>
  </div>
</section>

<section class="section section-tight">
  <div class="container narrow">
    <figure class="testimonial reveal" data-placeholder>
      <blockquote><p>"${esc(w.quote.text)}"</p></blockquote>
      <figcaption><strong>${esc(w.quote.name)}</strong><span>${esc(w.quote.role)}, ${esc(w.client)}</span></figcaption>
    </figure>
  </div>
</section>

<section class="section" aria-label="Next project">
  <div class="container">
    <a class="next-project card" href="/work/${next.slug}/">
      <span class="next-media">${img16(next.cover, { sizes: '100vw', alt: '' })}</span>
      <span class="next-text"><span class="eyebrow">Next project</span><span class="h2">${esc(next.client)}</span><span class="work-result">${esc(next.result)}</span></span>
      ${icon('arrow-right', 'next-arrow')}
    </a>
  </div>
</section>
${ctaBand()}`;

  return {
    path,
    title: `${w.client}: ${w.result} | Adsquid Work`,
    desc: `${w.headline} ${w.challenge}`.slice(0, 155),
    noindex: true, // SAMPLE: remove when real
    ogImage: `/assets/images/${w.cover}-1280.webp`,
    schema: [
      breadcrumbSchema(crumbs),
      { '@context': 'https://schema.org', '@type': 'CreativeWork', name: `${w.client}: ${w.headline}`, about: w.industry, creator: { '@id': abs('/#organization') }, url: abs(path), dateCreated: w.year },
    ],
    body,
  };
}
