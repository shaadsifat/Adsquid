import { services, groups, adPages, work } from '../data.mjs';
import {
  icon, brand, brandTitle, objImg, btn, waBtn, eyebrow, sectionHead, faqBlock, ctaBand, signalLine,
  breadcrumbSchema, faqSchema, serviceSchema, serviceUrl, esc,
} from '../lib.mjs';
import { pageHero, heroPreload } from './parts.mjs';
import { postCard } from './blog.mjs';
import { workCard } from './work.mjs';

export function serviceCard(s, { headingTag = 'h3' } = {}) {
  return `<article class="card svc-tile reveal">
  <a href="${serviceUrl(s)}" class="card-link">
    <span class="svc-tile-media">${objImg(s.key, { sizes: '(min-width: 1024px) 280px, 45vw' })}</span>
    <${headingTag} class="svc-tile-name">${s.name}</${headingTag}>
    <p>${s.pitch}</p>
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

const confirmAttr = (x) => (x.confirm ? ' data-placeholder data-confirm' : '');

export function servicesHub() {
  const crumbs = [{ name: 'Services', path: '/services/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'Digital marketing services in Bangladesh',
  display: 'Seven arms.<br> One team.',
  sentence: 'Marketing, creative and technology services that plug into each other, so nothing gets lost between agencies.',
  image: 'home/home-03-network',
  buttons: btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' }) + btn('/work/', 'See our work', { variant: 'ghost', iconName: 'arrow-up-right' }),
})}
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
      ${adPages.map((a) => `<a class="card platform reveal" href="/services/digital-ads-management/${a.slug}/"><span class="platform-logos">${a.brands.slice(0, 1).map((b) => brand(b, { size: 28 })).join('')}</span><span class="platform-name">${a.name}</span><span class="platform-line">${a.display}</span>${icon('arrow-up-right', 'svc-arrow')}</a>`).join('')}
    </div>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/services/',
    title: 'Digital Marketing Services in Bangladesh | Adsquid',
    desc: 'Ads, social media, SEO, graphic design, content, websites and software. Seven services from one Dhaka team, working as one.',
    preload: [heroPreload('home/home-03-network')],
    schema: [breadcrumbSchema(crumbs)],
    body,
  };
}

export function servicePage(s, { posts }) {
  const crumbs = [
    { name: 'Services', path: '/services/' },
    { name: s.name, path: serviceUrl(s) },
  ];
  const related = work.filter((w) => w.services.includes(s.slug)).slice(0, 3);
  const relPosts = posts.filter((p) => p.category === s.slug).slice(0, 3);
  const isAds = s.slug === 'digital-ads-management';

  const body = `
${pageHero({
  crumbs,
  h1: s.h1,
  display: s.display,
  sentence: s.sentence,
  image: `services/hero-${s.key}`,
  buttons: btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' }) + waBtn('Ask on WhatsApp'),
})}

<section class="section" aria-labelledby="problem-title">
  <div class="container">
    <p class="intro reveal">${s.intro}</p>
    ${sectionHead({ num: '01', label: 'The problem', title: 'Sound familiar?', id: 'problem-title' })}
    <div class="cards-3">
      ${s.problems.map((p) => `<article class="card pain reveal">${icon('x', 'pain-x')}<h3>${p.title}</h3><p>${p.text}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="what-title">
  <div class="container">
    <div class="sec-head">${eyebrow('What we do', '02')}<h2 class="h2" id="what-title" data-split>What's included.</h2></div>
    <div class="cards-3 subs">
      ${s.subs
        .map((x) => {
          const inner = `${icon(x.icon, 'card-icon')}<h3>${x.title}</h3><p>${x.text}</p>${x.href ? `<span class="more">${x.title} page ${icon('arrow-right')}</span>` : ''}`;
          return x.href
            ? `<a class="card sub reveal card-link" href="${x.href}"${confirmAttr(x)}>${inner}</a>`
            : `<article class="card sub reveal"${confirmAttr(x)}>${inner}</article>`;
        })
        .join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="how-title">
  <div class="container">
    <div class="sec-head">${eyebrow('How it works', '03')}<h2 class="h2" id="how-title" data-split>Four steps. No guesswork.</h2></div>
    ${stepsOnLine(s.steps)}
  </div>
</section>

<section class="section section-tight" aria-labelledby="tools-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Tools we use', '04')}<h2 class="h3-lg" id="tools-title">The stack behind the work.</h2></div>
    ${toolsRow(s.tools)}
  </div>
</section>

${
  related.length
    ? `<section class="section" aria-labelledby="proof-title">
  <div class="container">
    <div class="sec-head split"><div>${eyebrow('Proof', '05')}<h2 class="h2" id="proof-title" data-split>Work that moved numbers.</h2></div>${btn('/work/', 'All work', { variant: 'ghost' })}</div>
    <div class="cards-3">${related.map((w) => workCard(w, { tilt: true })).join('')}</div>
    <figure class="testimonial reveal" data-placeholder>
      <blockquote><p>"Sample testimonial. Replace with a real quote from a ${esc(s.short.toLowerCase())} client before launch."</p></blockquote>
      <figcaption><strong>Client name</strong><span>Role, Company</span></figcaption>
    </figure>
  </div>
</section>`
    : ''
}

<section class="section section-tight">
  <div class="container">
    <div class="pricing card reveal" data-placeholder>
      <div><p class="eyebrow">Pricing</p><p class="pricing-title">Custom quote, built around your goals.</p><p>Packages from ৳X / month. Tell us what you need and get a clear, fixed scope.</p></div>
      ${btn('/contact/', 'Get a quote', { variant: 'ghost' })}
    </div>
  </div>
</section>

${faqBlock(s.faq, { num: '06' })}
${ctaBand()}

${
  relPosts.length
    ? `<section class="section" aria-labelledby="posts-title">
  <div class="container">
    <div class="sec-head split"><div>${eyebrow('From the blog')}<h2 class="h2" id="posts-title" data-split>Learn before you hire.</h2></div>${btn(`/blog/category/${s.slug}/`, `${s.short} articles`, { variant: 'ghost' })}</div>
    <div class="cards-3 stagger">${relPosts.map((p) => postCard(p)).join('')}</div>
  </div>
</section>`
    : ''
}

${
  isAds
    ? ''
    : `<section class="section section-tight"><div class="container"><p class="eyebrow">Other services</p><ul class="chip-row">${services.filter((x) => x !== s).map((x) => `<li><a class="chip" href="${serviceUrl(x)}">${x.name}</a></li>`).join('')}</ul></div></section>`
}`;

  return {
    path: serviceUrl(s),
    title: s.title,
    desc: s.desc,
    preload: [heroPreload(`services/hero-${s.key}`)],
    schema: [breadcrumbSchema(crumbs), serviceSchema({ name: s.name, desc: s.desc, path: serviceUrl(s), serviceType: s.name }), faqSchema(s.faq)],
    body,
  };
}

export function adPage(a, { posts }) {
  const parent = services[0];
  const path = `/services/digital-ads-management/${a.slug}/`;
  const crumbs = [
    { name: 'Services', path: '/services/' },
    { name: parent.name, path: serviceUrl(parent) },
    { name: a.name, path },
  ];
  const caseStudy = work.find((w) => w.services.includes('digital-ads-management'));
  const relPosts = posts.filter((p) => p.category === 'digital-ads-management').slice(0, 3);
  const audiences = [
    { icon: 'shopping-cart', title: 'E-commerce', text: 'Online stores and Facebook shops that need more orders at a lower cost.' },
    { icon: 'map-pin', title: 'Local business', text: 'Restaurants, clinics, salons and showrooms that need calls and visits.' },
    { icon: 'briefcase', title: 'B2B', text: 'Service and B2B companies that need qualified leads, not clicks.' },
  ];
  const checklist = [
    { icon: 'activity', title: 'Tracking', text: 'Pixel, events API and GA4 tested before a single taka is spent.' },
    { icon: 'users', title: 'Audiences', text: 'Buyer, lookalike and retargeting audiences built from your data.' },
    { icon: 'image', title: 'Creatives', text: 'Platform-native creatives, several angles per campaign.' },
    { icon: 'sliders-horizontal', title: 'Testing', text: 'Weekly tests on hooks, offers and audiences. Losers cut fast.' },
  ];

  const body = `
${pageHero({
  crumbs,
  h1: a.h1,
  display: a.display,
  sentence: a.sentence,
  image: `ads/hero-${a.key}`,
  extra: `<ul class="badges" aria-label="Platforms">${a.brands.map((b) => `<li>${brand(b, { size: 22 })}<span>${esc(brandTitle(b))}</span></li>`).join('')}</ul>`,
  buttons: btn('/free-audit/', 'Get a free ads audit', { cls: 'btn-magnetic' }) + waBtn('Ask on WhatsApp'),
})}

<section class="section" aria-labelledby="types-title">
  <div class="container">
    <p class="intro reveal">${a.intro}</p>
    <div class="sec-head">${eyebrow('Campaign types', '01')}<h2 class="h2" id="types-title" data-split>Campaigns we run.</h2></div>
    <div class="cards-3 subs">${a.types.map((t) => `<article class="card sub reveal"${confirmAttr(t)}>${icon(t.icon, 'card-icon')}<h3>${t.title}</h3><p>${t.text}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="for-title">
  <div class="container">
    <div class="sec-head">${eyebrow("Who it's for", '02')}<h2 class="h2" id="for-title" data-split>Built for businesses like yours.</h2></div>
    <div class="cards-3">${audiences.map((t) => `<article class="card reveal">${icon(t.icon, 'card-icon')}<h3>${t.title}</h3><p>${t.text}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="setup-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Our setup checklist', '03')}<h2 class="h2" id="setup-title" data-split>Every account starts here.</h2></div>
    <div class="steps-line">
      ${signalLine('draw-on-scroll')}
      <ol class="steps-4">${checklist.map((c, i) => `<li class="step reveal"><span class="step-dot mono">${String(i + 1).padStart(2, '0')}</span><h3>${c.title}</h3><p>${c.text}</p></li>`).join('')}</ol>
    </div>
  </div>
</section>

${
  caseStudy
    ? `<section class="section" aria-labelledby="result-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Results', '04')}<h2 class="h2" id="result-title" data-split>${esc(caseStudy.headline)}</h2></div>
    <div class="result-strip card reveal" data-placeholder>
      ${caseStudy.numbers.map((n) => `<div><span class="big-num">${n.value}</span><span>${n.label}</span></div>`).join('')}
      ${btn(`/work/${caseStudy.slug}/`, 'Read the case', { variant: 'ghost' })}
    </div>
  </div>
</section>`
    : ''
}

<section class="section section-tight">
  <div class="container">
    <div class="pricing card reveal" data-placeholder>
      <div><p class="eyebrow">Management fee</p><p class="pricing-title">A flat monthly fee. Ad spend stays in your account.</p><p>You pay ${esc(a.name.replace(' Ads', ''))} directly for ads. Our fee covers strategy, creatives, setup, testing and reports. From ৳X / month.</p></div>
      ${btn('/contact/', 'Get a quote', { variant: 'ghost' })}
    </div>
  </div>
</section>

${faqBlock(a.faq, { num: '05' })}
${ctaBand({ title: 'Is your ad money leaking?', text: 'Get a free ads audit: tracking, structure, creatives and wasted spend.' })}

<section class="section section-tight">
  <div class="container">
    <p class="eyebrow">More ad platforms</p>
    <ul class="chip-row">
      <li><a class="chip" href="${serviceUrl(parent)}">All digital ads</a></li>
      ${adPages.filter((x) => x !== a).map((x) => `<li><a class="chip" href="/services/digital-ads-management/${x.slug}/">${x.name}</a></li>`).join('')}
    </ul>
  </div>
</section>

${
  relPosts.length
    ? `<section class="section" aria-labelledby="posts-title"><div class="container"><div class="sec-head">${eyebrow('From the blog')}<h2 class="h2" id="posts-title" data-split>Read before you spend.</h2></div><div class="cards-3 stagger">${relPosts.map((p) => postCard(p)).join('')}</div></div></section>`
    : ''
}`;

  return {
    path,
    title: a.title,
    desc: a.desc,
    preload: [heroPreload(`ads/hero-${a.key}`)],
    schema: [breadcrumbSchema(crumbs), serviceSchema({ name: a.name, desc: a.desc, path, serviceType: `${a.name} management` }), faqSchema(a.faq)],
    body,
  };
}
