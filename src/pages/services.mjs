import { services, groups, works } from '../data.mjs';
import { serviceCopy, subCopy } from '../content/services/index.mjs';
import {
  icon, brand, brandTitle, objImg, btn, waBtn, eyebrow, sectionHead, faqBlock, signalLine,
  breadcrumbSchema, faqSchema, serviceSchema, serviceUrl, subUrl, heroOf, subMark, esc,
} from '../lib.mjs';
import { pageHero, lightbox } from './parts.mjs';
import { heroArt } from './art.mjs';
import { postCard } from './blog.mjs';
import { workTile } from './work.mjs';
import { servicesInfographic } from './home.mjs';

// Signature hero art for each main service: its sub-services orbit the service icon.
const SIG = {
  'ads-campaign': [['activity', 'Pixel + CAPI tracking'], ['trending-up', 'Weekly tests running']],
  'social-media-marketing': [['calendar', '30-day content plan'], ['message-circle', 'Fast inbox replies']],
  'brand-identity-design': [['palette', 'Colour system'], ['book-marked', 'Brand book ready']],
  'graphic-design': [['layers', 'Every size, every platform'], ['zap', '24-48h turnaround']],
  'video-production': [['circle-play', 'Hook in one second'], ['smartphone', '9:16, 1:1 and 16:9']],
  'website-development': [['gauge', 'Fast on mobile data'], ['shield-check', 'SSL, backups, updates']],
  seo: [['search', 'Keywords mapped'], ['map-pin', 'Local map pack']],
  'software-development': [['layout-dashboard', 'Live dashboards'], ['refresh-cw', 'Weekly demos']],
};
const sigFor = (s) => ['signature', { core: s.icon, nodes: s.subs.map((x) => (x.brand ? `brand:${x.brand}` : x.icon)), cards: SIG[s.slug] }];

export function serviceCard(s, { headingTag = 'h3' } = {}) {
  return `<article class="card svc-tile reveal">
  <a href="${serviceUrl(s)}" class="card-link">
    <span class="svc-tile-media">${objImg(s.key, { sizes: '(min-width: 1024px) 280px, 45vw' })}</span>
    <${headingTag} class="svc-tile-name">${s.name}</${headingTag}>
    <p>${s.pitch}</p>
    <p class="svc-tile-subs">${s.subs.map((x) => esc(x.title)).join(' · ')}</p>
    <span class="more">Explore ${icon('arrow-right')}</span>
  </a>
</article>`;
}

function stepsOnLine(steps) {
  return `<div class="steps-line">
    ${signalLine('draw-on-scroll')}
    <ol class="steps-4">
      ${steps.map((s, i) => `<li class="step reveal"><span class="step-dot mono">${String(i + 1).padStart(2, '0')}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}
    </ol>
  </div>`;
}

function toolsRow(tools) {
  return `<ul class="tools">${tools.map((t) => `<li title="${esc(brandTitle(t))}">${brand(t, { size: 32 })}<span>${esc(brandTitle(t))}</span></li>`).join('')}</ul>`;
}

const paras = (list) => list.map((p) => `<p>${p}</p>`).join('');
const relatedWorks = (slug) => works.filter((w) => w.service === slug || (w.also || []).includes(slug));

// The quote box: how pricing works (no placeholder prices).
function quoteCard(what) {
  return `<section class="section section-tight">
  <div class="container">
    <div class="pricing card reveal">
      <div><p class="eyebrow">Pricing</p><p class="pricing-title">A clear quote, in writing, before work starts.</p><p>${what} is priced on scope: what you need, how much of it and how fast. Start with a free audit and we send a fixed monthly fee or project price, with no hidden charges and no long lock-in.</p></div>
      ${btn('/contact/', 'Get a quote', { variant: 'ghost' })}
    </div>
  </div>
</section>`;
}

function workSection(list, title, num) {
  return list.length
    ? `<section class="section" aria-labelledby="proof-title">
  <div class="container">
    <div class="sec-head split"><div>${eyebrow('Our work', num)}<h2 class="h2" id="proof-title" data-split>${title}</h2></div>${btn('/work/', 'All work', { variant: 'ghost' })}</div>
    <div class="work-grid">${list.slice(0, 3).map((w) => workTile(w)).join('')}</div>
  </div>
  ${lightbox()}
</section>`
    : '';
}

function postsSection(relPosts, s, title = 'Learn before you hire.') {
  return relPosts.length
    ? `<section class="section" aria-labelledby="posts-title">
  <div class="container">
    <div class="sec-head split"><div>${eyebrow('From the blog')}<h2 class="h2" id="posts-title" data-split>${title}</h2></div>${btn('/blog/', 'All articles', { variant: 'ghost' })}</div>
    <div class="cards-3 stagger">${relPosts.map((p) => postCard(p)).join('')}</div>
  </div>
</section>`
    : '';
}

export function servicesHub() {
  const crumbs = [{ name: 'Services', path: '/services/' }];
  const ads = services.find((s) => s.slug === 'ads-campaign');
  const body = `
${pageHero({
  crumbs,
  h1: 'Digital marketing services in Bangladesh',
  display: 'Eight arms. One team.',
  sentence: 'Marketing, creative and technology services that plug into each other, so nothing gets lost between agencies.',
  cls: 'hero-type',
  visual: heroArt(['signature', { core: 'workflow', nodes: services.map((s) => s.icon), cards: [['layers', 'Eight services'], ['users', 'One in-house team']] }]),
  buttons: btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' }) + btn('/work/', 'See our work', { variant: 'ghost', iconName: 'arrow-up-right' }),
})}
<section class="section section-tight" aria-label="Our eight services">
  <div class="container">${servicesInfographic()}</div>
</section>
${groups
  .map(
    (g, gi) => `<section class="section" aria-labelledby="g-${g.id}">
  <div class="container">
    <div class="sec-head">${eyebrow(g.name, String(gi + 1).padStart(2, '0'))}<h2 class="h2" id="g-${g.id}" data-split>${
      { marketing: 'Get seen. Get chosen.', creative: 'Make them stop.', technology: 'Build what sells.' }[g.id]
    }</h2></div>
    <div class="cards-3">${services.filter((s) => s.group === g.id).map((s) => serviceCard(s)).join('')}</div>
  </div>
</section>`
  )
  .join('\n')}
<section class="section" aria-labelledby="ads-children">
  <div class="container">
    <div class="sec-head">${eyebrow('Ad platforms')}<h2 class="h2" id="ads-children" data-split>Every platform your buyers use.</h2></div>
    <div class="platform-row">
      ${ads.subs.map((x) => `<a class="card platform reveal" href="${subUrl(ads, x)}"><span class="platform-logos">${brand(x.brand, { size: 28 })}</span><span class="platform-name">${x.title}</span><span class="platform-line">${esc(subCopy[`${ads.slug}/${x.slug}`].display)}</span>${icon('arrow-up-right', 'svc-arrow')}</a>`).join('')}
    </div>
  </div>
</section>`;
  return {
    path: '/services/',
    title: 'Digital Marketing Services in Bangladesh | Adsquid',
    desc: 'Ads campaigns, social media, brand, visual and video content, websites, SEO and software. Eight services from one team, working as one.',
    schema: [breadcrumbSchema(crumbs)],
    body,
  };
}

export function servicePage(s, { posts }) {
  const crumbs = [
    { name: 'Services', path: '/services/' },
    { name: s.name, path: serviceUrl(s) },
  ];
  const c = serviceCopy[s.slug];
  const relPosts = posts.filter((p) => p.category === s.slug).slice(0, 3);

  const body = `
${pageHero({
  crumbs,
  h1: s.h1,
  display: s.display,
  sentence: s.sentence,
  cls: 'hero-type',
  visual: heroArt(sigFor(s)),
  buttons: btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' }) + waBtn('Ask on WhatsApp'),
})}

<section class="section" aria-labelledby="about-title">
  <div class="container longform">
    <div class="longform-main">
      <p class="intro reveal">${s.intro}</p>
      <h2 class="h3-lg" id="about-title">${c.about[0]}</h2>
      <div class="prose-sm reveal">${paras(c.about.slice(1))}</div>
    </div>
    <aside class="side-card card reveal" aria-label="${esc(s.name)} services">
      <p class="eyebrow">${esc(s.name)} services</p>
      <ul class="side-links">${s.subs.map((x) => `<li><a href="${subUrl(s, x)}"><span class="side-mark">${subMark(x, 18)}</span><span>${x.title}</span>${icon('arrow-right')}</a></li>`).join('')}</ul>
      ${btn('/free-audit/', 'Get a free audit', { cls: 'btn-block' })}
    </aside>
  </div>
</section>

<section class="section" aria-labelledby="problem-title">
  <div class="container">
    ${sectionHead({ num: '01', label: 'The problem', title: 'Sound familiar?', id: 'problem-title' })}
    <div class="cards-3">
      ${s.problems.map((p) => `<article class="card pain reveal">${icon('x', 'pain-x')}<h3>${p.title}</h3><p>${p.text}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="what-title">
  <div class="container">
    <div class="sec-head">${eyebrow('What we do', '02')}<h2 class="h2" id="what-title" data-split>What's included.</h2><p class="sec-lead reveal">Every ${esc(s.name.toLowerCase())} service has its own page with the full details.</p></div>
    <div class="cards-3 subs">
      ${s.subs
        .map(
          (x) => `<a class="card sub reveal card-link" href="${subUrl(s, x)}"><span class="sub-mark">${subMark(x, 26)}</span><h3>${x.title}</h3><p>${x.text}</p><span class="more">Learn more ${icon('arrow-right')}</span></a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section grid-bg" aria-labelledby="why-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Why Adsquid', '03')}<h2 class="h2" id="why-title" data-split>Why brands choose us for ${esc(s.short.toLowerCase())}.</h2></div>
    <div class="cards-2x2">${c.why.map(([ic, t, p]) => `<article class="card line-card reveal"><span class="card-line" aria-hidden="true"></span>${icon(ic, 'card-icon')}<h3>${t}</h3><p>${p}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="how-title">
  <div class="container">
    <div class="sec-head">${eyebrow('How it works', '04')}<h2 class="h2" id="how-title" data-split>Four steps. No guesswork.</h2></div>
    ${stepsOnLine(s.steps)}
  </div>
</section>

<section class="section section-tight" aria-labelledby="tools-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Tools and platforms', '05')}<h2 class="h3-lg" id="tools-title">The stack behind the work.</h2></div>
    ${toolsRow(s.tools)}
  </div>
</section>

${workSection(relatedWorks(s.slug), `Recent ${esc(s.name.toLowerCase())} work.`, '06')}
${quoteCard(s.name)}
${faqBlock(s.faq, { num: '07' })}
${postsSection(relPosts, s)}

<section class="section section-tight"><div class="container"><p class="eyebrow">Other services</p><ul class="chip-row">${services.filter((x) => x !== s).map((x) => `<li><a class="chip" href="${serviceUrl(x)}">${x.name}</a></li>`).join('')}</ul></div></section>`;

  return {
    path: serviceUrl(s),
    title: s.title,
    desc: s.desc,
    schema: [breadcrumbSchema(crumbs), serviceSchema({ name: s.name, desc: s.desc, path: serviceUrl(s), serviceType: s.name }), faqSchema(s.faq)],
    body,
  };
}

// One page per sub-service (e.g. /services/ads-campaign/google-ads/). Copy: src/content/services/<service>.mjs
export function subPage(s, x, { posts }) {
  const c = subCopy[`${s.slug}/${x.slug}`];
  if (!c) throw new Error(`Missing copy for ${s.slug}/${x.slug}`);
  const path = subUrl(s, x);
  const crumbs = [
    { name: 'Services', path: '/services/' },
    { name: s.name, path: serviceUrl(s) },
    { name: x.title, path },
  ];
  const siblings = s.subs.filter((y) => y !== x);
  const relPosts = posts.filter((p) => p.category === s.slug).slice(0, 3);
  const isAds = s.slug === 'ads-campaign';
  const faq = c.faq.map(([q, a]) => ({ q, a }));
  const setup = [
    { title: 'Tracking', text: 'Pixel, events API and GA4 tested before a single taka is spent.' },
    { title: 'Audiences', text: 'Buyer, lookalike and retargeting audiences built from your data.' },
    { title: 'Creatives', text: 'Platform-native creatives, several angles per campaign.' },
    { title: 'Testing', text: 'Weekly tests on hooks, offers and audiences. Losers cut fast.' },
  ];

  const body = `
${pageHero({
  crumbs,
  h1: c.h1,
  display: c.display,
  sentence: c.sentence,
  cls: 'hero-type',
  visual: heroArt(c.art),
  extra: c.brands ? `<ul class="badges" aria-label="Platforms">${c.brands.map((b) => `<li>${brand(b, { size: 22 })}<span>${esc(brandTitle(b))}</span></li>`).join('')}</ul>` : '',
  buttons: btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' }) + waBtn('Ask on WhatsApp'),
})}

<section class="section" aria-labelledby="what-title">
  <div class="container longform">
    <div class="longform-main">
      <p class="intro reveal">${c.intro}</p>
      <h2 class="h3-lg" id="what-title">${c.what[0]}</h2>
      <div class="prose-sm reveal">${paras(c.what.slice(1))}</div>
    </div>
    <aside class="side-card card reveal" aria-label="More ${esc(s.name)} services">
      <p class="eyebrow">Part of ${esc(s.name)}</p>
      <a class="side-parent" href="${serviceUrl(s)}">${icon(s.icon)}<span><b>${esc(s.name)}</b><small>${esc(s.pitch)}</small></span></a>
      <ul class="side-links">${siblings.map((y) => `<li><a href="${subUrl(s, y)}"><span class="side-mark">${subMark(y, 18)}</span><span>${y.title}</span>${icon('arrow-right')}</a></li>`).join('')}</ul>
    </aside>
  </div>
</section>

<section class="section" aria-labelledby="inc-title">
  <div class="container">
    <div class="sec-head">${eyebrow("What's included", '01')}<h2 class="h2" id="inc-title" data-split>${c.featuresTitle || 'What you get.'}</h2></div>
    <div class="cards-3 subs">${c.features.map(([ic, t, p]) => `<article class="card sub reveal"><span class="sub-mark">${subMark({ icon: ic.startsWith('brand:') ? undefined : ic, brand: ic.startsWith('brand:') ? ic.slice(6) : undefined }, 26)}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section grid-bg" aria-labelledby="who-title">
  <div class="container who">
    <div>
      ${eyebrow("Who it's for", '02')}
      <h2 class="h2" id="who-title" data-split>${c.who[0]}</h2>
      <p class="sec-lead reveal">${c.who[1]}</p>
    </div>
    <ul class="check-list big reveal">${c.who[2].map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="how-title">
  <div class="container">
    <div class="sec-head">${eyebrow(isAds ? 'Our setup checklist' : 'How we work', '03')}<h2 class="h2" id="how-title" data-split>${isAds ? 'Every account starts here.' : 'Four steps. No guesswork.'}</h2></div>
    ${stepsOnLine(isAds ? setup : s.steps)}
  </div>
</section>

${workSection(relatedWorks(s.slug), 'Work from our studio.', '04')}
${quoteCard(x.title)}
${faqBlock(faq, { num: '05' })}
${postsSection(relPosts, s, 'Read before you spend.')}

<section class="section section-tight">
  <div class="container">
    <p class="eyebrow">More ${esc(s.name.toLowerCase())} services</p>
    <ul class="chip-row">
      <li><a class="chip" href="${serviceUrl(s)}">All ${esc(s.name.toLowerCase())}</a></li>
      ${siblings.map((y) => `<li><a class="chip" href="${subUrl(s, y)}">${y.title}</a></li>`).join('')}
    </ul>
  </div>
</section>`;

  return {
    path,
    title: c.title,
    desc: c.desc,
    cta: c.cta,
    schema: [
      breadcrumbSchema(crumbs),
      serviceSchema({ name: c.h1.replace(/ in Bangladesh$/i, ''), desc: c.desc, path, serviceType: `${x.title} (${s.name})` }),
      faqSchema(faq),
    ],
    body,
  };
}
