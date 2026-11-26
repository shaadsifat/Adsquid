// Animated hero art for pages without a 3D render. Ten archetypes, each fed with page-specific
// icons, labels, brand marks and colours, so no two pages look the same. Pure HTML + CSS (main.css,
// "Hero art"); decorative only (aria-hidden). Usage: heroArt(['brand', { brand: 'facebook', chips: [...] }]).
import { icon, brand, esc } from '../lib.mjs';
import { readFileSync } from 'node:fs';

const BRANDS = JSON.parse(readFileSync(new URL('../brands.json', import.meta.url), 'utf8'));
const pad = (n) => String(n + 1).padStart(2, '0');
// A mark is a line icon, "brand:<slug>" (official logo) or "img:<url>" (a photo, e.g. a team portrait).
const mark = (v, size = 26, mono = false) =>
  !v ? icon('sparkles')
    : v.startsWith('brand:') ? brand(v.slice(6), { size, mono })
    : v.startsWith('img:') ? `<img src="${v.slice(4)}" width="${size}" height="${size}" alt="" decoding="async">`
    : icon(v);
// Brand colour, lifted to a readable accent when the brand colour is near-black (X, Threads, TikTok).
const accentOf = (slug) => {
  const hex = BRANDS[slug]?.hex || 'A855F7';
  const n = parseInt(hex, 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.2 ? '#A855F7' : `#${hex}`;
};

const ARCH = {
  // Hexagon core, four steps on an orbit, a comet running the loop.
  orbit: ({ core = 'workflow', steps = [] }) => `
    <svg class="flow-svg" viewBox="0 0 400 400">
      <circle class="flow-orbit" cx="200" cy="200" r="150"/>
      <circle class="flow-orbit inner" cx="200" cy="200" r="96"/>
      ${[0, 1, 2, 3].map((i) => `<path class="flow-spoke" d="M200 200 L${(200 + 150 * Math.cos(((i * 90 - 135) * Math.PI) / 180)).toFixed(1)} ${(200 + 150 * Math.sin(((i * 90 - 135) * Math.PI) / 180)).toFixed(1)}" pathLength="1"/>`).join('')}
    </svg>
    <span class="flow-glow"></span>
    <span class="flow-core hex">${mark(core, 40, true)}</span>
    ${steps.map(([ic, label], i) => `<span class="flow-step s${i}"><span class="flow-dot">${mark(ic)}</span><span class="flow-label">${pad(i)} ${esc(label)}</span></span>`).join('')}`,

  // Honeycomb: a core hexagon ringed by six, lighting up one after another.
  hive: ({ core = 'hexagon', icons = [] }) => `
    <span class="hv-glow"></span>
    <span class="hv hv-c">${mark(core, 38, true)}</span>
    ${icons.slice(0, 6).map((ic, i) => `<span class="hv hv-${i}" style="--i:${i}">${mark(ic)}</span>`).join('')}
    <span class="hv hv-ghost g0"></span><span class="hv hv-ghost g1"></span><span class="hv hv-ghost g2"></span>`,

  // Three glass cards stacked in isometric space, each with an icon, a label and a filling bar.
  stack: ({ items = [] }) => `
    <span class="stk-shadow"></span>
    <div class="stk-plane">
      ${items.slice(0, 3).map(([ic, label], i) => `<div class="stk-card k${i}"><span class="stk-ic">${mark(ic, 22)}</span><b>${esc(label)}</b><i class="stk-bar"><i></i></i><i class="stk-line"></i><i class="stk-line short"></i></div>`).join('')}
    </div>`,

  // Radar: rings, a rotating sweep, blips that light up as the sweep passes.
  radar: ({ core = 'radar', blips = [] }) => `
    <span class="rd-ring r1"></span><span class="rd-ring r2"></span><span class="rd-ring r3"></span>
    <span class="rd-cross"></span>
    <span class="rd-sweep"></span>
    <span class="rd-core">${mark(core, 30, true)}</span>
    ${blips.slice(0, 4).map(([ic, label], i) => `<span class="rd-blip b${i}"><span class="rd-dot">${mark(ic, 18)}</span><em>${esc(label)}</em></span>`).join('')}`,

  // Browser window with a live-building layout, a phone beside it, a cursor that clicks.
  device: ({ layout = 'site', badge = 'sparkles', label = '' }) => {
    const body = {
      site: '<span class="dv-hero"></span><span class="dv-row"><i></i><i></i><i></i></span><span class="dv-btn"></span>',
      shop: '<span class="dv-grid"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="dv-btn"></span>',
      dash: '<span class="dv-side"></span><span class="dv-kpis"><i></i><i></i><i></i></span><span class="dv-bars"><i></i><i></i><i></i><i></i><i></i><i></i></span>',
      blog: '<span class="dv-hero thin"></span><span class="dv-post"><i></i><i></i></span><span class="dv-post"><i></i><i></i></span><span class="dv-post"><i></i><i></i></span>',
      news: '<span class="dv-ticker"></span><span class="dv-news"><i class="big"></i><i></i><i></i><i></i></span>',
      learn: '<span class="dv-video"></span><span class="dv-list"><i></i><i></i><i></i></span><span class="dv-progress"><i></i></span>',
      folio: '<span class="dv-masonry"><i></i><i></i><i></i><i></i><i></i></span>',
      pos: '<span class="dv-tiles"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="dv-receipt"><i></i><i></i><i></i><i></i></span>',
      give: '<span class="dv-hero"></span><span class="dv-meter"><i></i></span><span class="dv-btn wide"></span>',
    }[layout];
    return `
    <span class="dv-glow"></span>
    <div class="dv-win dv-${layout}"><div class="dv-bar"><i></i><i></i><i></i><span class="dv-url"></span></div><div class="dv-body">${body}<span class="dv-shine"></span></div></div>
    <div class="dv-phone"><span class="dv-notch"></span><span class="dv-ph-a"></span><span class="dv-ph-b"></span><span class="dv-ph-c"></span></div>
    <span class="dv-badge">${mark(badge, 22)}${label ? `<em>${esc(label)}</em>` : ''}</span>
    <span class="dv-cursor">${icon('mouse-pointer-2')}</span>`;
  },

  // A results card: bars rise, a trend line draws, two chips float beside it.
  chart: ({ icon: ic = 'trending-up', label = 'Growth', chips = [] }) => `
    <span class="ch-glow"></span>
    <div class="ch-card">
      <div class="ch-head"><span class="ch-ic">${mark(ic, 18, true)}</span><b>${esc(label)}</b><i class="ch-live"></i></div>
      <div class="ch-plot">
        <span class="ch-grid"></span>
        <span class="ch-bars">${[34, 48, 40, 58, 66, 61, 82].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</span>
        <svg class="ch-line" viewBox="0 0 300 120" preserveAspectRatio="none"><path pathLength="1" d="M4 104 C40 96 58 80 92 84 S150 62 176 58 S232 40 256 26 L296 12"/></svg>
      </div>
    </div>
    ${chips.slice(0, 2).map(([c, l], i) => `<span class="ch-chip c${i}">${mark(c, 16)}<em>${esc(l)}</em></span>`).join('')}`,

  // A platform badge in its own colour, rings pulsing outward, three action chips around it.
  brand: ({ brand: slug = 'facebook', chips = [] }) => `
    <span class="ba-glow"></span>
    <span class="ba-ring r1"></span><span class="ba-ring r2"></span><span class="ba-orbit"><i></i></span>
    <span class="ba-pulse"></span><span class="ba-pulse p2"></span>
    <span class="ba-core">${brand(slug, { size: 64, mono: true })}</span>
    ${chips.slice(0, 3).map(([c, l], i) => `<span class="ba-chip k${i}">${mark(c, 16)}<em>${esc(l)}</em></span>`).join('')}`,

  // Colour swatches fanning out, a type specimen tile and a pen drawing a bezier curve.
  swatch: ({ colors = ['#8800D4', '#A855F7', '#D6B4FF', '#22E3D3'], names = [], mark: m = 'pen-tool', text = 'Aa' }) => `
    <span class="sw-glow"></span>
    ${colors.slice(0, 4).map((c, i) => `<span class="sw-card k${i}" style="--c:${c}"><i></i><em>${esc(names[i] || c)}</em></span>`).join('')}
    <span class="sw-type"><b>${esc(text)}</b><i></i><i class="short"></i></span>
    <svg class="sw-curve" viewBox="0 0 200 120"><path pathLength="1" d="M10 100 C60 10 120 10 190 70"/><rect x="4" y="94" width="12" height="12" rx="2"/><rect x="184" y="64" width="12" height="12" rx="2"/></svg>
    <span class="sw-pen">${mark(m, 22)}</span>`,

  // A film strip rolling behind a hexagon play button, with a timeline that fills.
  film: ({ icons = [], vertical = false, label = '' }) => {
    const frames = icons.slice(0, 5);
    const strip = [...frames, ...frames].map((ic) => `<i>${mark(ic, 20)}</i>`).join('');
    return `
    <span class="fm-glow"></span>
    <div class="fm-strip${vertical ? ' vertical' : ''}"><div class="fm-track">${strip}</div></div>
    <span class="fm-play hex">${icon('play')}</span>
    <span class="fm-time"><i></i>${label ? `<em>${esc(label)}</em>` : ''}</span>`;
  },

  // A network: a core node wired to five modules, pulses travelling along the links.
  nodes: ({ core = 'network', items = [] }) => {
    const P = [[50, 12], [86, 34], [80, 80], [20, 80], [14, 34]];
    const links = P.map(([x, y]) => `<path pathLength="1" d="M200 200 L${x * 4} ${y * 4}"/>`).join('') +
      P.map(([x, y], i) => { const [x2, y2] = P[(i + 1) % 5]; return `<path class="ring" pathLength="1" d="M${x * 4} ${y * 4} L${x2 * 4} ${y2 * 4}"/>`; }).join('');
    return `
    <svg class="nd-svg" viewBox="0 0 400 400">${links}</svg>
    <span class="nd-glow"></span>
    <span class="nd nd-core hex">${mark(core, 34, true)}</span>
    ${items.slice(0, 5).map(([ic, label], i) => `<span class="nd n${i}" style="left:${P[i][0]}%;top:${P[i][1]}%"><span class="nd-dot">${mark(ic, 18)}</span><em>${esc(label)}</em></span>`).join('')}`;
  },
  // Signature (main pages and main services): a glass hexagon core, the page's sub-services orbiting it,
  // two floating status cards and twinkling sparks.
  signature: ({ core = 'sparkles', nodes = [], cards = [] }) => {
    const n = nodes.length;
    return `
    <span class="sig-glow"></span>
    <span class="sig-ring r1"></span><span class="sig-ring r2"></span>
    <div class="sig-orbit">${nodes
      .map((v, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return `<span class="sig-node${v.startsWith('img:') ? ' photo' : ''}" style="left:${(50 + 50 * Math.cos(a)).toFixed(2)}%;top:${(50 + 50 * Math.sin(a)).toFixed(2)}%">${mark(v, v.startsWith('img:') ? 64 : 22)}</span>`;
      })
      .join('')}</div>
    <span class="sig-core"><span class="sig-core-in">${mark(core, 56, true)}</span><span class="sig-scan"></span></span>
    ${cards.slice(0, 2).map(([ic, label], i) => `<div class="sig-card c${i}"><span class="sig-ic">${mark(ic, 18, true)}</span><span><b>${esc(label)}</b><i class="sig-bar"><i></i></i></span></div>`).join('')}
    <span class="sig-spark k0"></span><span class="sig-spark k1"></span><span class="sig-spark k2"></span><span class="sig-spark k3"></span>`;
  },

  // Contact: a phone with a live chat that types itself, and contact chips around it.
  chat: ({ messages = [], chips = [], name = 'Adsquid', avatar = '' }) => `
    <span class="cht-glow"></span>
    <div class="cht-phone">
      <div class="cht-top"><span class="cht-av">${avatar ? `<img src="${avatar}" width="34" height="34" alt="">` : icon('message-circle')}</span><span><b>${esc(name)}</b><small>online</small></span></div>
      <div class="cht-body">
        ${messages.slice(0, 4).map(([who, t], i) => `<p class="cht-msg ${who}" style="--d:${i}">${esc(t)}</p>`).join('')}
        <span class="cht-typing"><i></i><i></i><i></i></span>
      </div>
      <div class="cht-input"><i></i>${icon('send')}</div>
    </div>
    ${chips.slice(0, 3).map(([c, l], i) => `<span class="cht-chip k${i}">${mark(c, 16, true)}<em>${esc(l)}</em></span>`).join('')}`,

  // Free audit: a report card ticking off its checks, and a score ring that fills.
  audit: ({ title = 'Growth audit', items = [], score = 'Plan' }) => `
    <span class="au-glow"></span>
    <div class="au-card">
      <div class="au-head"><span class="au-ic">${icon('scan-search')}</span><span><b>${esc(title)}</b><small>Free, 1-page plan</small></span></div>
      <ul class="au-list">${items.slice(0, 5).map(([ic, t], i) => `<li style="--d:${i}"><span class="au-mark">${icon(ic)}</span><span class="au-t">${esc(t)}</span><span class="au-ok">${icon('check')}</span></li>`).join('')}</ul>
    </div>
    <div class="au-score"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="50"/><circle class="fg" cx="60" cy="60" r="50" pathLength="1"/></svg><b>${esc(score)}</b><small>ready</small></div>`,

  // Blog: an article writing itself, with the team's faces as authors.
  editor: ({ avatars = [], chips = [] }) => `
    <span class="ed-glow"></span>
    <div class="ed-doc">
      <span class="ed-cover">${icon('book-open')}</span>
      <span class="ed-title"></span><span class="ed-title short"></span>
      <span class="ed-line" style="--d:0"></span><span class="ed-line" style="--d:1"></span><span class="ed-line" style="--d:2"></span><span class="ed-line short" style="--d:3"></span>
    </div>
    <div class="ed-authors">${avatars.slice(0, 5).map((a) => `<img src="${a}" width="40" height="40" alt="" decoding="async">`).join('')}<em>Written by Teamsquid</em></div>
    ${chips.slice(0, 2).map(([c, l], i) => `<span class="ed-chip k${i}">${mark(c, 16, true)}<em>${esc(l)}</em></span>`).join('')}`,

  // Work: real portfolio pieces in browser-style frames, cycling front to back in 3D, with category tags.
  gallery: ({ images = [], chip, tags = [] }) => `
    <span class="gl-glow"></span><span class="gl-ring"></span>
    <div class="gl-stack">${images.slice(0, 3).map((src, i) => `<figure class="gl-card k${i}"><span class="gl-bar"><i></i><i></i><i></i><b></b></span><img src="${src}" width="640" height="357" alt="" decoding="async"></figure>`).join('')}</div>
    ${tags.slice(0, 4).map(([ic, l], i) => `<span class="gl-tag t${i}">${mark(ic, 15, true)}<em>${esc(l)}</em></span>`).join('')}
    ${chip ? `<span class="gl-chip">${mark(chip[0], 16, true)}<em>${esc(chip[1])}</em></span>` : ''}
    <span class="sig-spark k0"></span><span class="sig-spark k1"></span><span class="sig-spark k2"></span>`,

  // Offices: a slowly turning wireframe globe, a pin per office and a flight arc joining them.
};


export function heroArt(spec) {
  if (!spec) return '';
  const [type, params = {}] = spec;
  const build = ARCH[type];
  if (!build) throw new Error(`Unknown hero art: ${type}`);
  const accent = params.accent || (type === 'brand' ? accentOf(params.brand) : '');
  return `<div class="art art-${type}${type === 'orbit' ? ' flow' : ''}" aria-hidden="true"${accent ? ` style="--ac:${accent}"` : ''}>${build(params)}</div>`;
}
