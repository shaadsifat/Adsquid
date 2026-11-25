import { site, legalUpdated } from '../config.mjs';
import { services, team, values, timeline, careers, freeAudit, clients } from '../data.mjs';
import {
  img16, icon, btn, waBtn, waLink, eyebrow, faqBlock, breadcrumbSchema, faqSchema, orgSchema, pageTypeSchema, teamImg, clientLogo, esc, brand, abs,
} from '../lib.mjs';
import { pageHero, teamFan } from './parts.mjs';
import { privacy, terms } from '../content/legal.mjs';
import { heroArt } from './art.mjs';
import { worldMap, regionName } from './worldmap.mjs';
const teamPhoto = (m) => `img:/assets/images/team/${m.photo}-320.webp`;

export function aboutPage() {
  const crumbs = [{ name: 'About', path: '/about/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'About Adsquid',
  display: 'We are Teamsquid.',
  sentence: 'Marketers, designers and developers from Dhaka, growing brands worldwide since 2015.',
  cls: 'hero-oneline hero-team',
  visual: teamFan(),
  buttons: btn('/free-audit/', 'Work with us', { cls: 'btn-magnetic' }) + btn('/careers/', 'Join the team', { variant: 'ghost' }),
})}

<section class="section" aria-labelledby="story-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Our story', '01')}<h2 class="h2" id="story-title" data-split>From one ad account to eight services.</h2></div>
    <ol class="timeline">
      <span class="timeline-line" aria-hidden="true"><span></span></span>
      ${timeline.map((t) => `<li class="tl-item reveal"><span class="tl-year mono">${t.year}</span><h3>${t.title}</h3><p>${t.text}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section grid-bg" aria-labelledby="values-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Values', '02')}<h2 class="h2" id="values-title" data-split>What we stand for.</h2></div>
    <div class="cards-4">${values.map((v) => `<article class="card line-card reveal"><span class="card-line" aria-hidden="true"></span>${icon(v.icon, 'card-icon')}<h3>${v.title}</h3><p>${v.text}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="team-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Team', '03')}<h2 class="h2" id="team-title" data-split>The people behind your growth.</h2></div>
    <ul class="team-grid">
      ${team
        .map(
          (m, i) => `<li class="member reveal"><figure>${teamImg(m)}<span class="member-num mono">${String(i + 1).padStart(2, '0')}</span><figcaption><strong>${esc(m.name)}</strong><span>${esc(m.role)}</span>${
            m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener" aria-label="${esc(m.name)} on LinkedIn">${brand('linkedin', { mono: true, size: 18 })}</a>` : ''
          }</figcaption></figure></li>`
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="wall-title">
  <div class="container">
    <div class="sec-head center">${eyebrow('Clients', '04')}<h2 class="h2" id="wall-title" data-split>Brands that trust us.</h2></div>
    <div class="logo-wall">${clients.map((c) => clientLogo(c)).join('')}</div>
  </div>
</section>`;
  return {
    path: '/about/',
    title: 'About Adsquid | Meet Teamsquid',
    desc: 'Meet Teamsquid: the marketers, designers and developers behind Adsquid, growing brands all over the world since 2015.',
    cta: { eyebrow: 'Ready to grow?', title: 'Let us grow together.', text: 'Start with a free audit. Meet the team on a short call.' },
    schema: [breadcrumbSchema(crumbs), orgSchema(), pageTypeSchema('AboutPage', '/about/', 'About Adsquid')],
    body,
  };
}

function field(id, label, input) {
  return `<div class="field"><label for="${id}">${label}</label>${input}</div>`;
}

export function auditPage() {
  const crumbs = [{ name: 'Free Audit', path: '/free-audit/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'Free digital marketing audit',
  display: 'Find your growth leaks. Free.',
  sentence: 'We review your ads, social pages and website, then send a 1-page plan to fix the leaks.',
  cls: 'hero-type',
  visual: heroArt(['audit', { items: [['target', 'Ads account check'], ['message-circle', 'Page and content'], ['gauge', 'Website speed'], ['search', 'SEO scan'], ['list-checks', '1-page action plan']] }]),
  buttons: btn('#audit-form', 'Start my audit', { cls: 'btn-magnetic' }) + waBtn('Ask on WhatsApp'),
})}

<section class="section" aria-labelledby="get-title">
  <div class="container">
    <div class="sec-head">${eyebrow('What you get', '01')}<h2 class="h2" id="get-title" data-split>Four checks. One clear plan.</h2></div>
    <div class="cards-4">${freeAudit.get.map((g) => `<article class="card reveal">${icon(g.icon, 'card-icon')}<h3>${g.title}</h3><p>${g.text}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section audit-form-section" id="audit-form" aria-labelledby="form-title">
  <div class="container audit-grid">
    <div>
      ${eyebrow('Your details', '02')}
      <h2 class="h2" id="form-title" data-split>Tell us where to look.</h2>
      <p class="sec-lead">Takes one minute. No payment, no contract.</p>
      <ol class="next-steps">
        ${freeAudit.next.map((n, i) => `<li><span class="step-dot mono">${i + 1}</span><div><strong>${n.title}</strong><span>${n.text}</span></div></li>`).join('')}
      </ol>
    </div>
    <form class="form card glass" data-form="free-audit" action="${site.formEndpoint || '/api/send.php'}" method="post" novalidate>
      <div class="hp" aria-hidden="true"><label>Leave this field empty <input name="fax" tabindex="-1" autocomplete="off"></label></div><input type="hidden" name="_form" value="free-audit">
      <div class="form-row">
        ${field('a-name', 'Your name', '<input id="a-name" name="name" autocomplete="name" required>')}
        ${field('a-biz', 'Business name', '<input id="a-biz" name="business" autocomplete="organization" required>')}
      </div>
      <div class="form-row">
        ${field('a-wa', 'WhatsApp number', '<input id="a-wa" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" placeholder="01XXX-XXXXXX" required>')}
        ${field('a-link', 'Website or page link', '<input id="a-link" name="link" type="text" inputmode="url" placeholder="yourbrand.com" required>')}
      </div>
      <div class="form-row">
        ${field('a-budget', 'Monthly ad budget', `<select id="a-budget" name="budget" required><option value="">Choose one</option>${freeAudit.budgets.map((b) => `<option>${esc(b)}</option>`).join('')}</select>`)}
        ${field('a-goal', 'Main goal', `<select id="a-goal" name="goal" required><option value="">Choose one</option>${freeAudit.goals.map((b) => `<option>${esc(b)}</option>`).join('')}</select>`)}
      </div>
      <button class="btn btn-primary btn-block" type="submit"><span>Get my free audit</span>${icon('arrow-right')}</button>
      <p class="form-fine">We only use your details to prepare your audit.</p>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
${faqBlock(freeAudit.faq, { num: '03', title: 'Before you ask.' })}`;
  return {
    path: '/free-audit/',
    title: 'Free Digital Marketing Audit | Adsquid',
    desc: 'Get a free review of your ads, social pages and website, plus a 1-page plan to fix the leaks.',
    cta: false,
    schema: [breadcrumbSchema(crumbs), faqSchema(freeAudit.faq)],
    body,
  };
}

export function contactPage() {
  const crumbs = [{ name: 'Contact', path: '/contact/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'Contact Adsquid',
  display: "Let's talk.",
  sentence: 'Call, WhatsApp or send a message. We reply fast.',
  cls: 'hero-type',
  visual: heroArt(['chat', { avatar: '/assets/images/brand/logo/adsquid-mark.svg', messages: [['in', 'Hi! We need more orders from Facebook.'], ['out', 'Happy to help. Can you share your page link?'], ['in', 'Sure, here it is.'], ['out', 'Thanks! Your free audit is on the way.']], chips: [['phone', 'Call our hotline'], ['map-pin', 'Mirpur, Dhaka'], ['mail', 'Email us']] }]),
  buttons: waBtn('Chat on WhatsApp', 'btn-magnetic') + btn(`tel:${site.phoneHref}`, site.phone, { variant: 'ghost', iconName: 'phone' }),
})}

<section class="section" aria-labelledby="msg-title">
  <div class="container contact-grid">
    <form class="form card glass" data-form="contact" action="${site.formEndpoint || '/api/send.php'}" method="post" novalidate>
      <div class="hp" aria-hidden="true"><label>Leave this field empty <input name="fax" tabindex="-1" autocomplete="off"></label></div><input type="hidden" name="_form" value="contact">
      <h2 class="h3-lg" id="msg-title">Send a message</h2>
      <div class="form-row">
        ${field('c-name', 'Name', '<input id="c-name" name="name" autocomplete="name" required>')}
        ${field('c-email', 'Email', '<input id="c-email" name="email" type="email" autocomplete="email" required>')}
      </div>
      <div class="form-row">
        ${field('c-phone', 'Phone', '<input id="c-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel">')}
        ${field('c-svc', 'Service', `<select id="c-svc" name="service"><option value="">Choose one</option>${services.map((s) => `<option>${s.name}</option>`).join('')}<option>Something else</option></select>`)}
      </div>
      ${field('c-msg', 'Message', '<textarea id="c-msg" name="message" rows="5" required></textarea>')}
      <button class="btn btn-primary btn-block" type="submit"><span>Send message</span>${icon('send')}</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
    <div class="contact-side">
      <a class="wa-big" href="${waLink()}" target="_blank" rel="noopener">${brand('whatsapp', { mono: true, size: 36 })}<span><strong>WhatsApp us</strong><span>Fastest reply, usually within the hour.</span></span>${icon('arrow-up-right')}</a>
      <ul class="contact-list">
        <li>${icon('phone')}<div><span class="mono">Hotline</span><a href="tel:${site.phoneHref}">${site.phone}</a></div></li>
        <li>${icon('mail')}<div><span class="mono">Email</span><a href="mailto:${site.email}">${site.email}</a></div></li>
        <li>${icon('map-pin')}<div><span class="mono">Head office</span><address>${site.address.street}, ${site.address.locality}-${site.address.postalCode}, Bangladesh</address><a class="more-link" href="/offices/">All our offices ${icon('arrow-right')}</a></div></li>
        <li>${icon('clock')}<div><span class="mono">Office hours</span><span>${site.hours}</span></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section section-tight" aria-label="Map">
  <div class="container">
    <div class="map-head"><div>${eyebrow('Head office')}<p class="map-title">${site.address.street}, ${site.address.locality}-${site.address.postalCode}</p></div><div class="btns">${btn(site.mapLink, 'Get directions', { variant: 'ghost', iconName: 'navigation' })}${btn('/offices/', 'All offices', { variant: 'ghost', iconName: 'arrow-right' })}</div></div>
    <div class="map map-live"><iframe src="${esc(site.mapEmbed)}" title="Adsquid head office, Section-15, Mirpur, Dhaka on Google Maps" width="600" height="450" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
  </div>
</section>`;
  return {
    path: '/contact/',
    title: 'Contact Adsquid | Digital Marketing Agency Dhaka',
    desc: 'Call, WhatsApp or message us. Head office in Mirpur, Dhaka, plus a US office in Kissimmee, Florida. We reply fast.',
    cta: { title: 'Prefer a free audit first?', text: 'Send your page or website link. We reply with a 1-page plan.' },
    schema: [breadcrumbSchema(crumbs), orgSchema(), pageTypeSchema('ContactPage', '/contact/', 'Contact Adsquid')],
    body,
  };
}

// Offices: every location from site.offices, with a live local time, opening status and map.
function officeCard(o, i) {
  const tag = o.head ? `<span class="office-tag head">${icon('star')}Head Office</span>` : `<span class="office-tag">${esc(o.label || 'Office')}</span>`;
  return `<article class="office reveal${o.head ? ' is-head' : ''}" id="office-${o.id}" data-code="${esc(o.code)}">
    <div class="office-info">
      <div class="office-top"><span class="office-code">${esc(o.code)}</span>${tag}</div>
      <h3 class="office-city">${esc(o.city)}</h3>
      <p class="office-country">${esc(o.country)}</p>
      <address class="office-addr">${icon('map-pin')}<span>${o.lines.map(esc).join('<br>')}</span></address>
      <dl class="office-meta">
        <div><dt>${icon('clock')}Local time</dt><dd><span class="office-time" data-tz="${o.tz}">--:--</span><small class="office-tz">${esc(o.tzName)}</small>${o.openDays ? ` <em class="office-open" data-tz-open="${o.tz}" data-days="${o.openDays.join(',')}" data-hours="${o.opens}-${o.closes}"></em>` : ''}</dd></div>
        ${o.hours ? `<div><dt>${icon('calendar')}Office hours</dt><dd>${esc(o.hours)}</dd></div>` : `<div><dt>${icon('globe')}Time zone</dt><dd>${esc(o.tzName)}</dd></div>`}
      </dl>
      <div class="btns">${btn(o.mapLink, 'Get directions', { iconName: 'navigation' })}${o.head ? btn(`tel:${site.phoneHref}`, 'Call us', { variant: 'ghost', iconName: 'phone' }) : btn(`mailto:${site.email}`, 'Email us', { variant: 'ghost', iconName: 'mail' })}</div>
    </div>
  </article>`;
}

export function officesPage() {
  const crumbs = [{ name: 'Offices', path: '/offices/' }];
  const offices = site.offices;
  const n = offices.length;
  const body = `
${pageHero({
  crumbs,
  h1: 'Adsquid offices in Dhaka and the USA',
  display: 'Come say hello.',
  sentence: `Our head office is in Mirpur, Dhaka, with a second office in Kissimmee, Florida. Visit us, call or send a WhatsApp message.`,
  cls: 'hero-type',
  visual: heroArt(['globe', { pins: offices.map((o) => [o.pin[0], o.pin[1], o.city.split(',')[0], o.head ? 'Head office' : o.country]) }]),
  buttons: btn('#offices', 'See our offices', { cls: 'btn-magnetic', iconName: 'map-pin' }) + waBtn('WhatsApp us'),
})}
<section class="section" id="offices" aria-labelledby="offices-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Our offices', String(n).padStart(2, '0'))}<h2 class="h2" id="offices-title" data-split>${n === 2 ? 'Two offices.' : `${n} offices.`} One team.</h2><p class="sec-lead reveal">Strategy, design and development happen at our head office in Dhaka. Our US office keeps us close to clients in North America.</p></div>
    <div class="offices">
      ${offices.map(officeCard).join('\n      ')}
      <article class="office-next reveal">
        <span class="hex" aria-hidden="true">${icon('globe')}</span>
        <div><h3>Your city could be next.</h3><p>We already work with brands all over the world, and more offices are on the way. Wherever you are, our team is one message away.</p></div>
        ${btn('/contact/', 'Talk to us', { variant: 'ghost' })}
      </article>
    </div>
  </div>
</section>
<section class="section coverage" aria-labelledby="coverage-title">
  <div class="container">
    <div class="sec-head center">${eyebrow('Coverage', '03')}<h2 class="h2" id="coverage-title" data-split>From Dhaka to the world.</h2><p class="sec-lead reveal">Two offices on two continents, serving clients all over the world. Dhaka and Florida are 10 to 11 hours apart, so work keeps moving while one side sleeps.</p></div>
    <div class="wmap-wrap reveal">${worldMap(offices.map((o) => ({ ...o, geo: o.mapPos || o.geo })))}</div>
    <ul class="cov-stats">
      <li class="reveal"><b>${String(n).padStart(2, '0')}</b><span>Offices</span></li>
      <li class="reveal"><b>${String(new Set(offices.map((o) => o.region)).size).padStart(2, '0')}</b><span>Continents</span></li>
      <li class="reveal"><b>Global</b><span>Service area</span></li>
      <li class="reveal"><b>50+</b><span>Clients worldwide</span></li>
    </ul>
    <ul class="cov-regions">${offices.map((o) => `<li class="reveal${o.head ? ' head' : ''}"><span class="cov-dot"></span><span><b>${esc(regionName(o.region))}</b><small>${o.head ? 'Head office' : esc(o.label || 'Office')}: ${esc(o.city)}</small></span></li>`).join('')}<li class="reveal"><span class="cov-dot dim"></span><span><b>Everywhere else</b><small>Served remotely by both offices</small></span></li></ul>
  </div>
</section>
<section class="section section-tight" aria-label="Reach us">
  <div class="container reach">
    <a class="reach-card card reveal" href="${waLink()}" target="_blank" rel="noopener"><span class="reach-ic wa">${brand('whatsapp', { mono: true, size: 24 })}</span><span><b>WhatsApp</b><small>Fastest reply, usually within the hour</small></span>${icon('arrow-up-right')}</a>
    <a class="reach-card card reveal" href="tel:${site.phoneHref}"><span class="reach-ic">${icon('phone')}</span><span><b>${site.phone}</b><small>Hotline, ${esc(site.hours)} (Dhaka time)</small></span>${icon('arrow-up-right')}</a>
    <a class="reach-card card reveal" href="mailto:${site.email}"><span class="reach-ic">${icon('mail')}</span><span><b>${site.email}</b><small>For proposals, briefs and partnerships</small></span>${icon('arrow-up-right')}</a>
  </div>
</section>`;
  return {
    path: '/offices/',
    title: 'Our Offices: Dhaka Head Office & USA | Adsquid',
    desc: 'Visit Adsquid: head office in Section-15, Mirpur, Dhaka-1216, Bangladesh, and a US office in Kissimmee, Florida. Directions, maps and local times.',
    cta: { eyebrow: 'Visit or message', title: 'Let us talk about your growth.', text: 'Book a visit, a call or start with a free audit.' },
    schema: [
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': abs('/#organization'),
        name: site.name,
        url: abs('/'),
        location: offices.map((o) => ({
          '@type': 'Place',
          name: `Adsquid ${o.head ? 'Head Office' : o.label || 'Office'}, ${o.city}`,
          address: { '@type': 'PostalAddress', ...o.schema },
          ...(o.geo ? { geo: { '@type': 'GeoCoordinates', latitude: o.geo.lat, longitude: o.geo.lng } } : {}),
          hasMap: o.mapLink,
        })),
      },
    ],
    body,
  };
}

export function careersPage() {
  const crumbs = [{ name: 'Careers', path: '/careers/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'Careers at Adsquid',
  display: 'Join Teamsquid.',
  sentence: 'Marketers, designers and developers who like to see their work move numbers.',
  cls: 'hero-type',
  visual: heroArt(['signature', { core: 'rocket', nodes: team.map(teamPhoto), cards: [['graduation-cap', 'Learn every week'], ['users', 'Small, close team']] }]),
  buttons: btn(`mailto:${site.email}?subject=CV%20for%20Adsquid`, 'Send your CV', { cls: 'btn-magnetic', iconName: 'mail' }),
})}
<section class="section" aria-labelledby="why-title">
  <div class="container">
    <div class="sec-head">${eyebrow('Why work here', '01')}<h2 class="h2" id="why-title" data-split>Grow with us.</h2></div>
    <div class="cards-4">${careers.why.map((w) => `<article class="card line-card reveal"><span class="card-line" aria-hidden="true"></span>${icon(w.icon, 'card-icon')}<h3>${w.title}</h3><p>${w.text}</p></article>`).join('')}</div>
  </div>
</section>
<section class="section" aria-labelledby="roles-title">
  <div class="container narrow">
    <div class="sec-head">${eyebrow('Open roles', '02')}<h2 class="h2" id="roles-title" data-split>Open roles.</h2></div>
    ${
      careers.roles.length
        ? `<ul class="roles">${careers.roles.map((r) => `<li class="card role"><div><h3>${esc(r.title)}</h3><span class="mono">${esc(r.type)} &middot; ${esc(r.location)}</span></div>${btn(`mailto:${site.email}?subject=${encodeURIComponent('Application: ' + r.title)}`, 'Apply', { variant: 'ghost' })}</li>`).join('')}</ul>`
        : `<div class="card no-roles reveal"><h3>No open roles right now.</h3><p>Good people are always welcome. Send your CV and portfolio to <a href="mailto:${site.email}">${site.email}</a> and we will reach out when a seat opens.</p>${btn(`mailto:${site.email}?subject=CV%20for%20Adsquid`, 'Send your CV', { iconName: 'mail' })}</div>`
    }
  </div>
</section>`;
  return {
    path: '/careers/',
    title: 'Careers at Adsquid | Join Teamsquid in Dhaka',
    desc: 'Work with a Dhaka team of marketers, designers and developers. See open roles at Adsquid or send your CV.',
    cta: { eyebrow: 'Hiring or not', title: 'Good people are always welcome.', text: 'Want to work with us as a client instead? Start with a free audit.' },
    schema: [breadcrumbSchema(crumbs)],
    body,
  };
}

// Legal pages: summary box, "On this page" list, numbered sections (content in src/content/legal.mjs)
function legal({ path, name, title, desc, doc, art }) {
  const crumbs = [{ name, path }];
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const block = (b) => (typeof b === 'string' ? `<p>${b}</p>` : b[0] === 'ul' ? `<ul>${b[1].map((li) => `<li>${li}</li>`).join('')}</ul>` : `<h3>${b[1]}</h3>`);
  const body = `
${pageHero({ crumbs, h1: name, display: name + '.', sentence: `Last updated: ${legalUpdated}.`, cls: 'hero-type hero-small', visual: heroArt(art) })}
<section class="section section-tight legal" aria-label="${esc(name)}">
  <div class="container post-layout">
    <aside class="toc" aria-label="On this page">
      <p class="eyebrow">On this page</p>
      <ol>${doc.sections.map(([h], i) => `<li><a href="#${slug(h)}">${i + 1}. ${h}</a></li>`).join('')}</ol>
    </aside>
    <div class="prose">
      <div class="legal-summary"><p class="legal-summary-title">The short version</p><ul>${doc.summary.map((x) => `<li>${x}</li>`).join('')}</ul></div>
      ${doc.sections.map(([h, blocks], i) => `<h2 id="${slug(h)}"><span class="legal-n">${String(i + 1).padStart(2, '0')}</span>${h}</h2>${blocks.map(block).join('')}`).join('\n      ')}
    </div>
  </div>
</section>`;
  return { path, title, desc, schema: [breadcrumbSchema(crumbs)], body };
}

export function privacyPage() {
  return legal({
    path: '/privacy-policy/',
    name: 'Privacy Policy',
    art: ['radar', { core: 'shield-check', blips: [['lock', 'Secure'], ['eye', 'Transparent'], ['user-check', 'Your rights'], ['file-text', 'Clear terms']] }],
    title: 'Privacy Policy | Adsquid Digital Marketing Agency',
    desc: 'What Adsquid collects through its website, forms and WhatsApp, how we use and protect it, cookies, and your privacy rights wherever you live.',
    doc: privacy,
  });
}

export function termsPage() {
  return legal({
    path: '/terms/',
    name: 'Terms and Conditions',
    art: ['stack', { items: [['handshake', 'Fair use'], ['file-text', 'Clear rules'], ['shield-check', 'Your protection']] }],
    title: 'Terms and Conditions | Adsquid Digital Marketing Agency',
    desc: 'The terms for using adsquidbd.com and working with Adsquid: proposals, payment, ad budgets, ownership of work, revisions, results and cancellation.',
    doc: terms,
  });
}

export function thankYouPage() {
  const body = `
<section class="nf">
  <div class="container nf-content">
    <p class="mono nf-code">Sent</p>
    <h1 class="display">Thank you.</h1>
    <p class="hero-lead">Your message reached our team in Dhaka. We reply within one working day, usually much sooner.</p>
    <div class="btns">${btn('/work/', 'See our work', { iconName: 'arrow-right' })}${waBtn('WhatsApp us now')}</div>
  </div>
</section>`;
  return {
    path: '/thank-you/',
    title: 'Thank you | Adsquid',
    desc: 'Thank you for contacting Adsquid. Our team in Dhaka will reply within one working day, usually much sooner.',
    noindex: true,
    cta: false,
    bodyClass: 'page-404',
    body,
  };
}

const NF_CSS = '.nf-404{position:relative;overflow:hidden;padding:calc(var(--header-h) + 20px) 0 64px}.nf-404::before{content:"";position:absolute;inset:0;background:radial-gradient(46% 38% at 50% 30%,rgba(136,0,212,.3),transparent 70%);pointer-events:none}.nf-404 .nf-content{order:0;gap:16px}.nf-scene{position:relative;display:grid;place-items:center;width:100%;height:clamp(230px,30vw,380px)}.nf-ring{position:absolute;left:50%;top:50%;width:clamp(150px,20vw,250px);aspect-ratio:1;margin:calc(clamp(150px,20vw,250px)/-2) 0 0 calc(clamp(150px,20vw,250px)/-2);border-radius:50%;border:1px solid rgba(214,180,255,.4);opacity:0;animation:nf-ping 4.8s cubic-bezier(.2,.6,.3,1) infinite;will-change:transform,opacity}.nf-ring.r2{animation-delay:1.6s}.nf-ring.r3{animation-delay:3.2s}.nf-digits{position:relative;z-index:2;display:flex;align-items:center;gap:clamp(6px,1.6vw,22px);font-family:var(--f-head);font-weight:800;font-size:clamp(6.5rem,3rem + 13vw,14rem);line-height:.82;letter-spacing:-.05em;user-select:none}.nf-digits b{color:transparent;background:linear-gradient(180deg,#FBF6FF 8%,#C084FC 52%,#6B0FB3 100%);-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 18px 36px rgba(136,0,212,.5));animation:nf-tilt 6s ease-in-out infinite}.nf-digits b:last-child{animation-delay:-3s}.nf-o{position:relative;display:grid;place-items:center;width:.74em;height:.74em;border-radius:50%;overflow:hidden;border:.06em solid #A855F7;background:radial-gradient(circle,rgba(136,0,212,.4),rgba(10,6,20,.95) 72%);box-shadow:0 0 0 1px rgba(214,180,255,.35),0 0 70px rgba(168,85,247,.55),inset 0 0 40px rgba(136,0,212,.6)}.nf-o::before{content:"";position:absolute;inset:-2px;border-radius:50%;background:conic-gradient(from 0deg,rgba(233,213,255,.6),rgba(168,85,247,.15) 16%,transparent 28%);animation:nf-spin 3s linear infinite;will-change:transform}.nf-o::after{content:"";position:absolute;inset:18%;border-radius:50%;border:1px dashed rgba(214,180,255,.35)}.nf-o img{position:relative;z-index:1;width:44%;height:auto;filter:drop-shadow(0 8px 16px rgba(0,0,0,.6));animation:nf-bob 3.4s ease-in-out infinite}.nf-blip{position:absolute;z-index:1;width:8px;height:8px;border-radius:50%;background:#F1E4FF;box-shadow:0 0 12px 3px rgba(168,85,247,.9);opacity:0;animation:nf-blip 4.8s ease-in-out infinite}.nf-blip.b1{left:14%;top:24%}.nf-blip.b2{right:12%;top:58%;animation-delay:1.6s}.nf-blip.b3{left:24%;bottom:6%;animation-delay:3.2s}.nf-blip.b4{right:22%;top:8%;animation-delay:2.4s}.nf-bubble{position:absolute;bottom:-6%;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;border:1px solid rgba(214,180,255,.45);background:radial-gradient(circle at 32% 30%,rgba(255,255,255,.45),transparent 58%);opacity:0;animation:nf-rise var(--d) linear var(--dl) infinite;will-change:transform,opacity}.nf-404 .nf-code{display:inline-flex;align-items:center;gap:10px;padding:7px 14px;border-radius:999px;border:1px solid rgba(214,180,255,.28);background:rgba(136,0,212,.12);font-size:.75rem;letter-spacing:.18em;text-transform:uppercase}.nf-404 .nf-code i{width:7px;height:7px;border-radius:50%;background:#FCA5A5;box-shadow:0 0 10px #F87171;animation:nf-dot 1.4s ease-in-out infinite}.nf-404 .hero-lead{max-width:34em;margin:0 auto}.nf-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:min(900px,100%);margin:26px auto 0;text-align:left}.nf-link{display:grid;gap:4px;align-content:start;padding:16px 18px;border-radius:18px;border:1px solid var(--line);background:rgba(18,14,28,.72);transition:border-color .3s,transform .3s var(--ease),background-color .3s}.nf-link:hover,.nf-link:focus-visible{border-color:rgba(168,85,247,.6);background:rgba(34,20,58,.85);transform:translateY(-3px)}.nf-link .i{width:22px;height:22px;color:var(--lilac);margin-bottom:6px}.nf-link b{color:#fff;font-size:1rem;font-weight:700}.nf-link small{color:var(--mist);font-size:.8125rem;line-height:1.45}@media (min-width:900px){.nf-links{grid-template-columns:repeat(4,minmax(0,1fr))}}@keyframes nf-ping{0%{transform:scale(.55);opacity:.9}100%{transform:scale(2.7);opacity:0}}@keyframes nf-spin{to{transform:rotate(360deg)}}@keyframes nf-bob{50%{transform:translateY(-8%) rotate(-6deg)}}@keyframes nf-tilt{50%{transform:translateY(-4%) rotate(-2deg)}}@keyframes nf-blip{0%,64%,100%{opacity:0;transform:scale(.3)}72%{opacity:1;transform:scale(1)}86%{opacity:.4;transform:scale(1.6)}}@keyframes nf-rise{0%{transform:translate3d(0,0,0);opacity:0}12%{opacity:.85}100%{transform:translate3d(16px,calc(-1 * clamp(240px,34vw,420px)),0);opacity:0}}@keyframes nf-dot{50%{opacity:.35}}@media (prefers-reduced-motion:reduce){.nf-404 *,.nf-404 *::before{animation:none!important}.nf-ring,.nf-bubble,.nf-blip{display:none}}';

export function notFoundPage() {
  const bubbles = [[8, 10, 7, 0], [18, 6, 9, 2.2], [31, 12, 8, 4.1], [44, 5, 10, 1.1], [57, 9, 7.5, 3.3], [69, 14, 9.5, 0.6], [80, 7, 8, 2.8], [91, 11, 10.5, 4.6]];
  const links = [
    ['/services/', 'layers', 'Services', 'Ads, social, design, video, web and software.'],
    ['/work/', 'briefcase', 'Our work', 'Branding, posts, websites and apps we made.'],
    ['/blog/', 'book-open', 'Blog', 'Guides on ads, SEO and growth in Bangladesh.'],
    ['/contact/', 'message-circle', 'Contact', 'Call, WhatsApp or visit our Dhaka office.'],
  ];
  const body = `
<section class="nf nf-404">
  <div class="container nf-content">
    <div class="nf-scene" aria-hidden="true">
      <span class="nf-ring"></span><span class="nf-ring r2"></span><span class="nf-ring r3"></span>
      ${bubbles.map(([x, s, d, dl]) => `<span class="nf-bubble" style="--x:${x}%;--s:${s}px;--d:${d}s;--dl:${dl}s"></span>`).join('')}
      <span class="nf-blip b1"></span><span class="nf-blip b2"></span><span class="nf-blip b3"></span><span class="nf-blip b4"></span>
      <div class="nf-digits"><b>4</b><span class="nf-o"><img src="/assets/images/brand/logo/adsquid-mark.svg" width="120" height="120" alt="" decoding="async"></span><b>4</b></div>
    </div>
    <p class="mono nf-code"><i></i>Error 404 &middot; Page not found</p>
    <h1 class="display">Signal lost.</h1>
    <p class="hero-lead">This page swam off or never existed. Our sonar is still searching. Meanwhile, here is where you can go.</p>
    <div class="btns">${btn('/', 'Back to home', { iconName: 'arrow-right' })}${waBtn('Ask us on WhatsApp')}</div>
    <nav class="nf-links" aria-label="Popular pages">${links.map(([href, ic, t, p]) => `<a class="nf-link" href="${href}">${icon(ic)}<b>${t}</b><small>${p}</small></a>`).join('')}</nav>
  </div>
</section>`;
  return {
    path: '/404.html',
    title: 'Signal lost (404) | Adsquid',
    desc: 'This page does not exist or has moved. Go back home or browse our services.',
    noindex: true,
    cta: false,
    bodyClass: 'page-404',
    css: NF_CSS,
    body,
  };
}
