import { site } from '../config.mjs';
import { services, works, team, counters, whyUs, whyPromises, processSteps, clients } from '../data.mjs';
import { esc, icon, img16, teamImg, btn, eyebrow, serviceUrl, serviceBySlug, orgSchema, clientLogo, abs, brand, splitWords, hexIcon } from '../lib.mjs';
import { postCard } from './blog.mjs';
import { workUrl } from './work.mjs';
import { lightbox } from './parts.mjs';

// Platform tops on home-04-process, in % of the image box.
const PLATFORMS = [
  [23.2, 63.7],
  [37.8, 50.1],
  [51.8, 36.6],
  [65.8, 23.8],
  [78.8, 11.7],
];

const CHAPTERS = ['Hero', 'Problem', 'Services', 'Process', 'Proof', 'Clients', 'Why us', 'Team', 'Blog', 'Audit'];

const pad = (n) => String(n).padStart(2, '0');

// The eight services as an infographic: four cards each side of a hexagon hub, wired to it (wires drawn by main.js).
export function servicesInfographic({ headingTag = 'h3' } = {}) {
  const half = Math.ceil(services.length / 2);
  const card = (s, i) => `<li class="info-card ${i < half ? 'l' : 'r'}" data-info="${i}" style="--i:${i}">
          <a href="${serviceUrl(s)}">
            ${hexIcon(s.icon, 'info-hex')}
            <span class="info-text">
              <span class="info-num mono">${pad(i + 1)}</span>
              <${headingTag} class="info-name">${s.name}</${headingTag}>
              <span class="info-subs">${s.subs.map((x) => esc(x.title)).join(' <i>&middot;</i> ')}</span>
            </span>
          </a>
        </li>`;
  return `<div class="info" data-infographic>
      <svg class="info-wires" aria-hidden="true"></svg>
      <ul class="info-col info-left">
        ${services.slice(0, half).map((s, i) => card(s, i)).join('')}
      </ul>
      <div class="info-hub" aria-hidden="true">
        <span class="hub-ring"></span><span class="hub-ring r2"></span><span class="hub-orbit"><i></i></span>
        <span class="hub-hex">
          <span class="hub-face hub-home on"><img src="/assets/images/brand/logo/adsquid-mark.svg" width="64" height="64" alt="" loading="lazy"><b>${services.length} services</b><small>One team</small></span>
          ${services.map((s, i) => `<span class="hub-face" data-face="${i}">${icon(s.icon)}<b>${s.name}</b><small>${s.pitch}</small></span>`).join('')}
        </span>
      </div>
      <ul class="info-col info-right">
        ${services.slice(half).map((s, i) => card(s, i + half)).join('')}
      </ul>
    </div>`;
}

export function homePage({ posts }) {
  // The six pieces on the Proof film reel.
  const reel = ['custom-website-design', 'social-media-post-design', 'logo-design-branding', 'burger-social-media', 'software-dashboard', 'fashion-branding-design'].map((slug) => works.find((w) => w.slug === slug));
  const latest = posts.slice(0, 3);
  const half = Math.ceil(clients.length / 2);
  const row = (list) => [...list, ...list].map((c, i) => clientLogo(c, { hidden: i >= list.length })).join('');

  const body = `
<nav class="rail" aria-label="Chapters">
  <span class="rail-track"><span class="rail-fill"></span></span>
  <ol>${CHAPTERS.map((c, i) => `<li><a href="#ch-${String(i).padStart(2, '0')}" data-rail="${i}"><span class="rail-num">${String(i).padStart(2, '0')}</span><span class="rail-label">${c}</span></a></li>`).join('')}</ol>
</nav>

<section class="hero hero-home" id="ch-00" data-chapter="0">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="container hero-grid">
    <div class="hero-art">
      <div class="art-stage">
        <span class="art-glow" aria-hidden="true"></span>
        <span class="art-ring" aria-hidden="true"></span>
        <span class="art-ring art-ring-2" aria-hidden="true"></span>
        <span class="art-shadow" aria-hidden="true"></span>
        <div class="art-float">
          <div class="art-hop">
            <div class="art-pop">
              <img class="art-img" src="/assets/images/brand/hero-mascot.webp" srcset="/assets/images/brand/hero-mascot-480.webp 480w, /assets/images/brand/hero-mascot.webp 720w" sizes="(min-width: 960px) 46vw, 88vw" width="720" height="475" alt="The Adsquid octopus at work: laptop, pencil, phone and a cup of coffee" fetchpriority="high" decoding="async" draggable="false">
              <span class="art-shine" aria-hidden="true"></span>
            </div>
          </div>
        </div>
        <div class="art-chip c1" data-depth="2.4" aria-hidden="true"><div class="chip-body"><span class="chip-ic">${icon('target')}</span><span><b>Campaign live</b><small>Meta + Google</small></span><i class="chip-dot"></i></div></div>
        <div class="art-chip c2" data-depth="3.2" aria-hidden="true"><div class="chip-body"><span class="chip-ic">${icon('shopping-cart')}</span><span><b>New order</b><small>just now</small></span></div></div>
        <div class="art-chip c3" data-depth="1.8" aria-hidden="true"><div class="chip-body"><span class="chip-ic">${icon('calendar')}</span><span><b>Post scheduled</b><small>Today, 7 pm</small></span></div></div>
        <span class="art-spark k1" aria-hidden="true"></span><span class="art-spark k2" aria-hidden="true"></span><span class="art-spark k3" aria-hidden="true"></span><span class="art-spark k4" aria-hidden="true"></span><span class="art-spark k5" aria-hidden="true"></span>
      </div>
    </div>
    <div class="hero-content">
      <h1 class="eyebrow hero-eyebrow">Digital marketing agency in Dhaka</h1>
      <p class="display hero-display">${splitWords('Reach every<br> customer.')}</p>
      <p class="hero-lead">Ads, content, SEO and tech under one roof. One <span class="nowrap">in-house</span> team from Dhaka that plans, creates and grows brands worldwide, with clear numbers every month.</p>
      <div class="btns hero-btns">
        ${btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' })}
        ${btn('/work/', 'See our work', { variant: 'ghost', iconName: 'arrow-up-right' })}
      </div>
    </div>
  </div>
  <a class="scroll-cue" href="#ch-01" aria-label="Scroll to the next chapter"><span></span></a>
</section>

<section class="ch ch-noise" id="ch-01" data-chapter="1" aria-labelledby="noise-title">
  <div class="ch-bg fade-left">${img16('home/home-02-noise')}</div>
  <div class="container">
    <div class="sec-head">
      ${eyebrow('The problem', '01')}
      <h2 class="h2 h2-xl" id="noise-title" data-split>Most brands shout.<br> Few get heard.</h2>
    </div>
    <div class="noise-stage">
      <ul class="noise-cards">
        <li class="noise-card"><span class="mono">ERR 01</span><strong>Feeds are full.</strong><span>Your post is one of thousands today.</span></li>
        <li class="noise-card"><span class="mono">ERR 02</span><strong>Budgets leak.</strong><span>Boosts without tracking burn money.</span></li>
        <li class="noise-card"><span class="mono">ERR 03</span><strong>Results stay flat.</strong><span>Same posts, same ads, same numbers.</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="ch ch-arms" id="ch-02" data-chapter="2" aria-labelledby="arms-title">
  <canvas class="trails" data-trails data-density="0.7" data-speed="0.6" data-opacity="0.55" aria-hidden="true"></canvas>
  <div class="container">
    <div class="sec-head center">
      ${eyebrow('Eight services', '02')}
      <h2 class="h2" id="arms-title" data-split>Many arms. One goal.</h2>
      <p class="sec-lead reveal">Eight services that work as one team, so nothing gets lost between agencies.</p>
    </div>
    ${servicesInfographic()}
  </div>
</section>

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

<div class="proof-spacer">
<section class="ch ch-proof" id="ch-04" data-chapter="4" aria-labelledby="proof-title">
  <div class="container proof-wrap">
    <div class="proof-top">
      <div class="proof-head">
        ${eyebrow('Proof', '04')}
        <h2 class="h2" id="proof-title" data-split>Numbers, not noise.</h2>
      </div>
      <dl class="counters">
        ${counters
          .map(
            (c) => `<div class="counter"><dt>${c.label}</dt><dd><span data-count="${c.value}"${c.plain ? ' data-plain' : ''}>${c.value}</span>${c.suffix}</dd></div>`
          )
          .join('')}
      </dl>
    </div>
    <div class="reel" data-reel>
      <div class="reel-stage">
        <div class="reel-ring">
          ${reel
            .map(
              (w, i) => `<div class="reel-frame" style="--k:${i}" data-k="${i}">
            <button class="reel-open" type="button" data-lightbox data-src="/assets/images/work/${w.slug}.webp" data-title="${esc(w.title)}" data-cat="${esc(serviceBySlug(w.service).name)}" data-href="${workUrl(w)}" aria-label="View ${esc(w.title)} full screen">
              <span class="reel-holes" aria-hidden="true"></span>
              <img src="/assets/images/work/${w.slug}-640.webp" srcset="/assets/images/work/${w.slug}-640.webp 640w, /assets/images/work/${w.slug}.webp 1280w" sizes="(min-width: 1024px) 720px, 82vw" width="1280" height="715" alt="${esc(w.title)}" loading="lazy" decoding="async" draggable="false">
              <span class="reel-holes bottom" aria-hidden="true"></span>
              <span class="reel-zoom" aria-hidden="true">${icon('maximize-2')}</span>
            </button>
            <a class="reel-go" href="${workUrl(w)}" aria-label="Open the ${esc(w.title)} project">${icon('arrow-up-right')}</a>
            <span class="reel-shade" aria-hidden="true"></span>
          </div>`
            )
            .join('')}
        </div>
      </div>
      <div class="reel-meta">
        <div class="reel-caps" aria-live="polite">
          ${reel.map((w, i) => `<p class="reel-cap${i === 0 ? ' on' : ''}" data-k="${i}"><span class="mono">${pad(i + 1)} / ${pad(reel.length)} &middot; ${esc(serviceBySlug(w.service).name)}</span><a href="${workUrl(w)}">${esc(w.title)} ${icon('arrow-up-right')}</a></p>`).join('')}
        </div>
        <div class="reel-nav">
          <ol class="reel-dots">${reel.map((w, i) => `<li><button type="button" data-k="${i}" aria-label="Show ${esc(w.title)}"${i === 0 ? ' aria-current="true"' : ''}><span></span></button></li>`).join('')}</ol>
          ${btn('/work/', 'See all our work', { variant: 'ghost', iconName: 'arrow-up-right' })}
        </div>
      </div>
    </div>
  </div>
  ${lightbox()}
</section>
</div>

<section class="ch ch-clients" id="ch-05" data-chapter="5" aria-labelledby="clients-title">
  <div class="clients-bg">${img16('textures/grid-floor')}</div>
  <div class="container">
    <div class="sec-head center">${eyebrow('Clients', '05')}<h2 class="h2" id="clients-title" data-split>Brands that trust us.</h2><p class="sec-lead reveal">50+ clients all over the world.</p></div>
  </div>
  <div class="marquee" aria-label="Client logos">
    <div class="marquee-row"><div class="marquee-inner">${row(clients.slice(0, half))}</div></div>
    <div class="marquee-row reverse"><div class="marquee-inner">${row(clients.slice(half))}</div></div>
  </div>
</section>

<section class="ch ch-why grid-bg" id="ch-06" data-chapter="6" aria-labelledby="why-title">
  <canvas class="trails" data-trails data-density="0.9" data-speed="0.7" data-opacity="0.45" aria-hidden="true"></canvas>
  <div class="container">
    <div class="why-grid">
      <div class="why-intro">
        ${eyebrow('Why Adsquid', '06')}
        <h2 class="h2" id="why-title" data-split>Why teams pick us.</h2>
        <p class="sec-lead reveal">Since 2015 we have run ads, content, websites and software for 50+ brands. The reason they stay is simple: one team that owns the result, explains every number and moves fast.</p>
        <ul class="why-promises reveal">${whyPromises.map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('')}</ul>
        <div class="btns reveal">${btn('/free-audit/', 'Get a free audit', { cls: 'btn-magnetic' })}${btn('/about/', 'Meet the team', { variant: 'ghost' })}</div>
      </div>
      <div class="why-cards">
        ${whyUs.map((w, i) => `<article class="card line-card why-card reveal"><span class="card-line" aria-hidden="true"></span><span class="why-top">${icon(w.icon, 'card-icon')}<span class="why-num mono">${pad(i + 1)}</span></span><h3>${w.title}</h3><p>${w.text}</p></article>`).join('')}
      </div>
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
          <span class="tc-num mono">${pad(i + 1)}</span>
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
      <form class="form" data-form="home-audit" action="${site.formEndpoint || '/api/send.php'}" method="post" novalidate>
        <div class="hp" aria-hidden="true"><label>Leave this field empty <input name="fax" tabindex="-1" autocomplete="off"></label></div><input type="hidden" name="_form" value="home-audit">
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
    desc: 'Ads, social media, brand, visual and video content, websites, SEO and software from one team. Get a free audit today.',
    cta: false,
    bodyClass: 'page-home',
    preload: [
      '<link rel="preload" as="image" imagesrcset="/assets/images/brand/hero-mascot-480.webp 480w, /assets/images/brand/hero-mascot.webp 720w" imagesizes="(min-width: 960px) 46vw, 88vw" fetchpriority="high">',
    ],
    scripts: ['/assets/js/home.js'],
    schema: [
      orgSchema(),
      { '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs('/#website'), name: 'Adsquid', url: abs('/'), publisher: { '@id': abs('/#organization') }, inLanguage: 'en-BD' },
    ],
    body,
  };
}
