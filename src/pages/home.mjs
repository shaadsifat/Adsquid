import { site } from '../config.mjs';
import { services, groups, work, team, counters, whyUs, processSteps, clientsPlaceholder, freeAudit } from '../data.mjs';
import { esc, icon, img16, objImg, teamImg, btn, eyebrow, serviceUrl, orgSchema, clientLogo, abs, brand, splitWords } from '../lib.mjs';
import { postCard } from './blog.mjs';
import { workCard } from './work.mjs';

// Sockets measured on the 2576x1438 render of home-03-network (README section 8).
// Order = clockwise = service order in data.mjs.
const SOCKETS = [
  { id: 'top', cx: 1287, cy: 251, r: 100, d: 'M1288 651 L1288 354' },
  { id: 'r1', cx: 2051, cy: 463, r: 92, d: 'M1376 672 L1576 672 C1660 672 1690 464 1790 464 L1958 464' },
  { id: 'r2', cx: 2254, cy: 718, r: 92, d: 'M1376 718 L2162 718' },
  { id: 'r3', cx: 2050, cy: 975, r: 92, d: 'M1376 770 L1576 770 C1660 770 1690 975 1790 975 L1958 975' },
  { id: 'l3', cx: 523, cy: 977, r: 92, d: 'M1200 770 L1000 770 C 916 770 886 977 786 977 L 616 977' },
  { id: 'l2', cx: 321, cy: 719, r: 92, d: 'M1200 718 L 413 718' },
  { id: 'l1', cx: 525, cy: 463, r: 92, d: 'M1200 672 L1000 672 C 916 672 886 464 786 464 L 616 464' },
];

// Platform tops on home-04-process, in % of the image box.
const PLATFORMS = [
  [23.2, 63.7],
  [37.8, 50.1],
  [51.8, 36.6],
  [65.8, 23.8],
  [78.8, 11.7],
];

const CHAPTERS = ['Hero', 'Problem', 'Services', 'Process', 'Proof', 'Clients', 'Why us', 'Team', 'Blog', 'Audit'];

const side = (s) => (s.id === 'top' ? 'top' : s.id[0] === 'r' ? 'right' : 'left');

function networkVisual() {
  return `<div class="net-stage">
      <div class="net-box">
        ${img16('home/home-03-network', { sizes: '(min-width: 1024px) 70vw, 100vw' })}
        <svg class="net-svg" viewBox="0 0 2576 1438" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          ${SOCKETS.map((s, i) => `<g class="net-arm" data-arm="${i}"><path class="net-glow" d="${s.d}" pathLength="1"/><path class="net-line" d="${s.d}" pathLength="1"/><path class="net-flow" d="${s.d}" pathLength="1"/></g>`).join('')}
        </svg>
        <span class="net-hub" aria-hidden="true"></span>
        ${SOCKETS.map(
          (s, i) => `<button class="net-node" type="button" data-node="${i}" style="left:${((s.cx / 2576) * 100).toFixed(2)}%;top:${((s.cy / 1438) * 100).toFixed(2)}%;--size:${(((s.r * 2) / 2576) * 100).toFixed(2)}%" aria-label="Show ${esc(services[i].name)}">
          <img src="/assets/images/services/obj-${services[i].key}-320.webp" width="320" height="320" alt="" loading="lazy" decoding="async">
          <span class="net-tag ${side(s)}">${esc(services[i].short)}</span>
        </button>`
        ).join('')}
      </div>
    </div>`;
}

export function homePage({ posts }) {
  const featured = work.slice(0, 3);
  const latest = posts.slice(0, 3);
  const half = Math.ceil(clientsPlaceholder.length / 2);

  const body = `
<nav class="rail" aria-label="Chapters">
  <span class="rail-track"><span class="rail-fill"></span></span>
  <ol>${CHAPTERS.map((c, i) => `<li><a href="#ch-${String(i).padStart(2, '0')}" data-rail="${i}"><span class="rail-num">${String(i).padStart(2, '0')}</span><span class="rail-label">${c}</span></a></li>`).join('')}</ol>
</nav>

<div class="hero-spacer">
<section class="hero hero-home" id="ch-00" data-chapter="0">
  <div class="hero-media">
    <picture>
      <source media="(max-width: 767px)" srcset="/assets/images/brand/key-hero-mark-mobile-720.webp 720w, /assets/images/brand/key-hero-mark-mobile.webp 1080w" sizes="100vw" width="720" height="1290">
      <img class="hero-poster" src="/assets/images/brand/key-hero-poster.webp" width="1920" height="1080" alt="Glass Adsquid squid mark glowing in front of a violet disc" fetchpriority="high" decoding="async">
    </picture>
    <canvas class="hero-canvas" aria-hidden="true"></canvas>
    <span class="hero-edge" aria-hidden="true"></span>
    <span class="hero-fade" aria-hidden="true"></span>
  </div>
  <div class="container hero-content">
    <h1 class="eyebrow hero-eyebrow">Digital marketing agency in Dhaka</h1>
    <p class="display hero-display">${splitWords('Reach every<br> customer.')}</p>
    <p class="hero-lead">Ads, content, SEO and tech under one roof. One <span class="nowrap">in-house</span> Dhaka team that plans, creates and grows your brand, with clear numbers every month.</p>
    <div class="btns hero-btns">
      ${btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' })}
      ${btn('/work/', 'See our work', { variant: 'ghost', iconName: 'arrow-up-right' })}
    </div>
  </div>
  <a class="scroll-cue" href="#ch-01" aria-label="Scroll to the next chapter"><span></span></a>
</section>
</div>

<section class="ch ch-noise" id="ch-01" data-chapter="1" aria-labelledby="noise-title">
  <span class="ch-edge" aria-hidden="true"></span>
  <div class="ch-bg fade-left">${img16('home/home-02-noise')}</div>
  <div class="container">
    <div class="sec-head">
      ${eyebrow('The problem', '01')}
      <h2 class="h2 h2-xl" id="noise-title" data-split>Most brands shout.<br> Few get heard.</h2>
    </div>
    <div class="noise-stage">
      <svg class="noise-line" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path class="glow" d="M0 170 H380 L470 80 H1200"/><path d="M0 170 H380 L470 80 H1200"/></svg>
      <ul class="noise-cards">
        <li class="noise-card"><span class="mono">ERR 01</span><strong>Feeds are full.</strong><span>Your post is one of thousands today.</span></li>
        <li class="noise-card"><span class="mono">ERR 02</span><strong>Budgets leak.</strong><span>Boosts without tracking burn money.</span></li>
        <li class="noise-card"><span class="mono">ERR 03</span><strong>Results stay flat.</strong><span>Same posts, same ads, same numbers.</span></li>
      </ul>
    </div>
  </div>
</section>

<div class="arms-spacer">
<section class="ch ch-arms" id="ch-02" data-chapter="2" aria-labelledby="arms-title">
  <div class="arms-pin">
    <canvas class="trails" data-trails data-density="0.7" data-speed="0.6" data-opacity="0.55" aria-hidden="true"></canvas>
    <div class="container arms-head">
      <div class="arms-title">
        ${eyebrow('Many arms', '02')}
        <h2 class="h2" id="arms-title" data-split>Many arms. One goal.</h2>
        <p class="sec-lead reveal">Seven services that work as one team. Tap an arm to jump to it.</p>
      </div>
      <div class="arms-meta mono" aria-live="polite"><b class="arms-cur">01</b><span>/ 07</span><span class="arms-bar"><i></i></span><span class="arms-name">${esc(services[0].short)}</span></div>
    </div>
    <div class="arms-visual">${networkVisual()}</div>
    <div class="arms-track-wrap">
      <ol class="arms-track">
        ${services
          .map(
            (s, i) => `<li class="svc-card" data-card="${i}">
          <a href="${serviceUrl(s)}">
            <span class="svc-prog" aria-hidden="true"><i></i></span>
            <span class="svc-thumb">${objImg(s.key, { sizes: '(min-width: 1024px) 96px, 120px', alt: '' })}</span>
            <span class="svc-text">
              <span class="svc-group mono">${String(i + 1).padStart(2, '0')} &middot; ${groups.find((g) => g.id === s.group).name}</span>
              <span class="svc-name">${s.name}</span>
              <span class="svc-pitch">${s.pitch}</span>
            </span>
            ${icon('arrow-up-right', 'svc-arrow')}
          </a>
        </li>`
          )
          .join('')}
      </ol>
    </div>
  </div>
</section>
</div>

<section class="ch ch-process" id="ch-03" data-chapter="3" aria-labelledby="process-title">
  <div class="container">
    <div class="process-box">
      <div class="process-media">
        ${img16('home/home-04-process')}
        ${PLATFORMS.map(([x, y], i) => `<span class="plat-chip" data-step="${i}" style="left:${x}%;top:${y}%">${String(i + 1).padStart(2, '0')}</span>`).join('')}
      </div>
      <div class="process-head">
        ${eyebrow('Process', '03')}
        <h2 class="h2" id="process-title" data-split>How we grow brands.</h2>
      </div>
      <ol class="process-steps">
        ${processSteps.map((s, i) => `<li class="p-step" data-step="${i}"><span class="mono">${String(i + 1).padStart(2, '0')}</span><span><strong>${s.title}:</strong> ${s.text}</span></li>`).join('')}
      </ol>
    </div>
  </div>
</section>

<section class="ch ch-proof" id="ch-04" data-chapter="4" aria-labelledby="proof-title">
  <div class="proof-bg">${img16('home/home-05-proof')}</div>
  <div class="container">
    <div class="proof-head">
      ${eyebrow('Proof', '04')}
      <h2 class="h2 h2-xl" id="proof-title" data-split>Numbers,<br> not noise.</h2>
      <dl class="counters">
        ${counters
          .map(
            (c) => `<div class="counter"${c.verify ? ' data-placeholder' : ''}><dt>${c.label}</dt><dd><span data-count="${c.value}"${c.plain ? ' data-plain' : ''}>${c.value}</span>${c.suffix}</dd></div>`
          )
          .join('')}
      </dl>
    </div>
    <div class="cards-3 proof-cards">
      ${featured.map((w) => workCard(w, { tilt: true })).join('')}
    </div>
  </div>
</section>

<section class="ch ch-clients" id="ch-05" data-chapter="5" aria-labelledby="clients-title">
  <div class="clients-bg">${img16('textures/grid-floor')}</div>
  <div class="container">
    <div class="sec-head center">${eyebrow('Clients', '05')}<h2 class="h2" id="clients-title" data-split>Brands that trust us.</h2></div>
  </div>
  <div class="marquee" aria-label="Client logos">
    <div class="marquee-row"><div class="marquee-inner">${[...clientsPlaceholder.slice(0, half), ...clientsPlaceholder.slice(0, half)].map((c, i) => (i >= half ? clientLogo(c).replace('<span class="client-logo"', '<span class="client-logo" aria-hidden="true"') : clientLogo(c))).join('')}</div></div>
    <div class="marquee-row reverse"><div class="marquee-inner">${[...clientsPlaceholder.slice(half), ...clientsPlaceholder.slice(half)].map((c, i) => (i >= half ? clientLogo(c).replace('<span class="client-logo"', '<span class="client-logo" aria-hidden="true"') : clientLogo(c))).join('')}</div></div>
  </div>
</section>

<section class="ch ch-why grid-bg" id="ch-06" data-chapter="6" aria-labelledby="why-title">
  <canvas class="trails" data-trails data-density="0.9" data-speed="0.7" data-opacity="0.45" aria-hidden="true"></canvas>
  <div class="container">
    <div class="sec-head">${eyebrow('Why Adsquid', '06')}<h2 class="h2" id="why-title" data-split>Why teams pick us.</h2></div>
    <div class="cards-2x2">
      ${whyUs.map((w) => `<article class="card line-card reveal"><span class="card-line" aria-hidden="true"></span>${icon(w.icon, 'card-icon')}<h3>${w.title}</h3><p>${w.text}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="ch ch-team" id="ch-07" data-chapter="7" aria-labelledby="team-title">
  <div class="container">
    <div class="sec-head split">
      <div>${eyebrow('Team', '07')}<h2 class="h2" id="team-title" data-split>Meet Teamsquid.</h2><p class="sec-lead reveal">The people behind your growth.</p></div>
      ${btn('/about/', 'About the team', { variant: 'ghost' })}
    </div>
  </div>
  <div class="carousel" data-carousel aria-roledescription="carousel" aria-label="Team members">
    <ul class="car-track" tabindex="0">
      ${team
        .map(
          (m, i) => `<li class="tc-card" aria-roledescription="slide" aria-label="${i + 1} of ${team.length}">
        <figure>
          ${teamImg(m, { sizes: '(min-width: 1024px) 330px, 72vw' })}
          <span class="tc-num mono">${String(i + 1).padStart(2, '0')}</span>
          <figcaption><strong>${esc(m.name)}</strong><span>${esc(m.role)}</span></figcaption>
          ${m.linkedin ? `<a class="tc-in" href="${m.linkedin}" target="_blank" rel="noopener" aria-label="${esc(m.name)} on LinkedIn">${brand('linkedin', { mono: true, size: 18 })}</a>` : ''}
        </figure>
      </li>`
        )
        .join('')}
    </ul>
    <div class="container car-ui">
      <span class="car-count mono"><b class="car-cur">01</b> / ${String(team.length).padStart(2, '0')}</span>
      <span class="car-bar" aria-hidden="true"><i></i></span>
      <button class="car-btn" type="button" data-dir="-1" aria-label="Previous team member">${icon('arrow-right', 'flip')}</button>
      <button class="car-btn" type="button" data-dir="1" aria-label="Next team member">${icon('arrow-right')}</button>
    </div>
  </div>
</section>

<section class="ch ch-blog" id="ch-08" data-chapter="8" aria-labelledby="blog-title">
  <div class="container">
    <div class="sec-head split">
      <div>${eyebrow('Blog', '08')}<h2 class="h2" id="blog-title" data-split>Fresh from the blog.</h2></div>
      ${btn('/blog/', 'All articles', { variant: 'ghost' })}
    </div>
    <div class="cards-3 stagger">${latest.map((p) => postCard(p)).join('')}</div>
  </div>
</section>

<section class="ch ch-cta" id="ch-09" data-chapter="9" aria-labelledby="cta-title">
  <div class="cta-media">
    <video class="cta-video" muted loop playsinline preload="none" poster="/assets/video/cta-portal-loop-poster.webp" width="1280" height="720" aria-hidden="true">
      <source data-src="/assets/video/cta-portal-loop.mp4" type="video/mp4">
    </video>
  </div>
  <svg class="cta-line" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true"><path class="glow" d="M0 150 H240 L300 90 H600"/><path d="M0 150 H240 L300 90 H600"/></svg>
  <div class="container cta-wrap">
    <div class="cta-form glass">
      ${eyebrow('Free audit', '09')}
      <h2 class="h2" id="cta-title">Find your growth leaks.</h2>
      <p>Free audit of your ads, page and website.</p>
      <form class="form" data-form="home-audit" novalidate>
        <div class="field"><label for="h-name">Name</label><input id="h-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="h-wa">WhatsApp number</label><input id="h-wa" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" placeholder="01XXX-XXXXXX" required></div>
        <div class="field"><label for="h-link">Website or page link</label><input id="h-link" name="link" type="text" inputmode="url" placeholder="facebook.com/yourpage" required></div>
        <div class="field"><label for="h-svc">Service</label><select id="h-svc" name="service" required><option value="">Choose one</option>${services.map((s) => `<option>${s.name}</option>`).join('')}<option>Not sure yet</option></select></div>
        <button class="btn btn-primary btn-block" type="submit"><span>Get my free audit</span>${icon('arrow-right')}</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`;

  return {
    path: '/',
    title: 'Adsquid | Digital Marketing Agency in Dhaka, Bangladesh',
    ogTitle: 'Adsquid: Reach every customer.',
    desc: 'Ads, social media, SEO, design, content, websites and software from one Dhaka team. Get a free audit today.',
    bodyClass: 'page-home',
    preload: [
      '<link rel="preload" as="image" href="/assets/images/brand/key-hero-poster.webp" media="(min-width: 768px)" fetchpriority="high">',
      '<link rel="preload" as="image" imagesrcset="/assets/images/brand/key-hero-mark-mobile-720.webp 720w, /assets/images/brand/key-hero-mark-mobile.webp 1080w" imagesizes="100vw" media="(max-width: 767px)" fetchpriority="high">',
    ],
    scripts: ['/assets/js/frames.js', '/assets/js/home.js'],
    schema: [
      orgSchema(),
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs('/#website'), name: 'Adsquid', url: abs('/'), publisher: { '@id': abs('/#organization') }, inLanguage: 'en-BD' },
    ],
    body,
  };
}
