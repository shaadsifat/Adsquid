import { site, legalUpdated } from '../config.mjs';
import { services, team, values, timeline, careers, freeAudit, clients } from '../data.mjs';
import {
  img16, icon, btn, waBtn, waLink, eyebrow, faqBlock, breadcrumbSchema, faqSchema, orgSchema, teamImg, clientLogo, esc, brand,
} from '../lib.mjs';
import { pageHero, heroPreload, heroIcon, teamFan } from './parts.mjs';

export function aboutPage() {
  const crumbs = [{ name: 'About', path: '/about/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'About Adsquid',
  display: 'We are Teamsquid.',
  sentence: 'Marketers, designers and developers from Dhaka, growing brands in five countries since 2015.',
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
    desc: 'Meet Teamsquid: the marketers, designers and developers behind Adsquid, growing brands in five countries since 2015.',
    cta: { eyebrow: 'Ready to grow?', title: 'Let us grow together.', text: 'Start with a free audit. Meet the team on a short call.' },
    schema: [breadcrumbSchema(crumbs), orgSchema()],
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
  image: 'pages/hero-free-audit',
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
        ${freeAudit.next.map((n, i) => `<li${i === 0 ? ' data-placeholder' : ''}><span class="step-dot mono">${i + 1}</span><div><strong>${n.title}</strong><span>${n.text}</span></div></li>`).join('')}
      </ol>
    </div>
    <form class="form card glass" data-form="free-audit" novalidate>
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
    preload: [heroPreload('pages/hero-free-audit')],
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
  image: 'pages/hero-contact',
  buttons: waBtn('Chat on WhatsApp', 'btn-magnetic') + btn(`tel:${site.phoneHref}`, site.phone, { variant: 'ghost', iconName: 'phone' }),
})}

<section class="section" aria-labelledby="msg-title">
  <div class="container contact-grid">
    <form class="form card glass" data-form="contact" novalidate>
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
        <li>${icon('map-pin')}<div><span class="mono">Office</span><address>${site.address.street}, ${site.address.locality} ${site.address.postalCode}, Bangladesh</address></div></li>
        <li>${icon('clock')}<div><span class="mono">Office hours</span><span data-placeholder>${site.hours}</span></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section section-tight" aria-label="Map">
  <div class="container">
    <div class="map" data-map="${esc(site.mapEmbed)}">
      <button class="map-load" type="button">${icon('map')}<span>Show office on Google Maps</span></button>
    </div>
  </div>
</section>`;
  return {
    path: '/contact/',
    title: 'Contact Adsquid | Digital Marketing Agency Dhaka',
    desc: 'Call, WhatsApp or message us. Office in Mirpur-6, Dhaka. We reply fast.',
    cta: { title: 'Prefer a free audit first?', text: 'Send your page or website link. We reply with a 1-page plan.' },
    preload: [heroPreload('pages/hero-contact')],
    schema: [breadcrumbSchema(crumbs), orgSchema()],
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
  image: 'pages/hero-careers',
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
    preload: [heroPreload('pages/hero-careers')],
    schema: [breadcrumbSchema(crumbs)],
    body,
  };
}

function legal({ path, name, title, desc, sections }) {
  const crumbs = [{ name, path }];
  const body = `
${pageHero({ crumbs, h1: name, display: name + '.', sentence: `Last updated: ${legalUpdated}.`, cls: 'hero-type hero-small', visual: heroIcon('legal') })}
<section class="section section-tight">
  <div class="container narrow prose">
    <p class="draft-note" data-placeholder>Draft text. Have it reviewed and approved by the agency before launch.</p>
    ${sections.map(([h, ps]) => `<h2>${h}</h2>${ps.map((p) => `<p>${p}</p>`).join('')}`).join('\n')}
  </div>
</section>`;
  return { path, title, desc, schema: [breadcrumbSchema(crumbs)], body };
}

export function privacyPage() {
  return legal({
    path: '/privacy-policy/',
    name: 'Privacy Policy',
    title: 'Privacy Policy | Adsquid',
    desc: 'How Adsquid collects, uses and protects the information you share through our website, forms and WhatsApp.',
    sections: [
      ['Who we are', [`Adsquid is a digital marketing agency based in ${site.address.street}, ${site.address.locality}, Bangladesh. You can reach us at <a href="mailto:${site.email}">${site.email}</a>.`]],
      ['What we collect', ['When you fill in a form, we collect the details you enter: for example your name, business name, phone or WhatsApp number, email, website link, budget range and message.', 'Like most websites, we also collect basic usage data through analytics tools: pages visited, device type, approximate location and how you arrived on the site.']],
      ['How we use it', ['We use your details only to reply to you, prepare a free audit or proposal you asked for, and provide our services. We do not sell your data.']],
      ['Cookies and analytics', ['We may use Google Analytics, Google Tag Manager and the Meta Pixel to understand how the site is used and to measure our own advertising. You can block cookies in your browser settings at any time.']],
      ['Sharing', ['We share data only with tools that help us run the business (such as our form provider and email), and only as needed. We may disclose information if the law requires it.']],
      ['How long we keep it', ['We keep enquiry data for as long as needed to respond and follow up, and client data for the length of our work together plus any period required by law.']],
      ['Your choices', [`You can ask us to see, correct or delete the information we hold about you. Email <a href="mailto:${site.email}">${site.email}</a>.`]],
      ['Changes', ['We may update this policy. The date at the top shows the latest version.']],
    ],
  });
}

export function termsPage() {
  return legal({
    path: '/terms/',
    name: 'Terms',
    title: 'Terms of Use | Adsquid',
    desc: 'The terms that apply when you use the Adsquid website. Service agreements with clients are covered by separate contracts.',
    sections: [
      ['About these terms', ['These terms apply to your use of this website. Work we do for clients is covered by a separate written agreement or proposal.']],
      ['Website content', ['All text, images, graphics and code on this site belong to Adsquid or are used with permission. Please do not copy or reuse them without written consent.']],
      ['Free audit', ['The free audit is a no-obligation review. Its recommendations are general advice based on the information available to us and do not guarantee specific results.']],
      ['Results', ['Portfolio pieces and figures on this site describe past work for specific clients. Results depend on many factors, including budget, product, market and timing, and are not a promise of future performance.']],
      ['Third-party links', ['This site links to other websites such as Facebook, LinkedIn and WhatsApp. We are not responsible for their content or privacy practices.']],
      ['Liability', ['We work to keep this site accurate and available, but it is provided as is. Adsquid is not liable for losses arising from use of this website.']],
      ['Governing law', ['These terms are governed by the laws of Bangladesh. Disputes fall under the courts of Dhaka.']],
      ['Contact', [`Questions about these terms: <a href="mailto:${site.email}">${site.email}</a>.`]],
    ],
  });
}

export function notFoundPage() {
  const body = `
<section class="nf">
  <div class="nf-media">${img16('pages/404-signal-lost', { priority: true, sizes: '100vw' })}</div>
  <div class="container nf-content">
    <p class="mono nf-code">404</p>
    <h1 class="display">Signal lost.</h1>
    <p class="hero-lead">This page swam away.</p>
    <div class="btns">${btn('/', 'Go home', { iconName: 'arrow-right' })}${btn('/services/', 'See services', { variant: 'ghost' })}</div>
  </div>
</section>`;
  return {
    path: '/404.html',
    title: 'Signal lost (404) | Adsquid',
    desc: 'This page does not exist or has moved. Go back home or browse our services.',
    noindex: true,
    cta: false,
    bodyClass: 'page-404',
    body,
  };
}
