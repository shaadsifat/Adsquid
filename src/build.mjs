// Adsquid static site builder. No dependencies: `node src/build.mjs`.
// Output goes to /dist. Upload the contents of /dist to public_html (or Netlify / Cloudflare Pages).
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from './config.mjs';
import { services, adPages, work } from './data.mjs';
import { configureLayout, renderPage } from './layout.mjs';
import { homePage } from './pages/home.mjs';
import { servicesHub, servicePage, adPage } from './pages/services.mjs';
import { workIndex, casePage } from './pages/work.mjs';
import { blogIndex, categoryPage, postPage } from './pages/blog.mjs';
import { aboutPage, auditPage, contactPage, careersPage, privacyPage, termsPage, notFoundPage } from './pages/company.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Options: --out=<folder> (default dist), --base=/Adsquid (serve from a sub-folder, e.g. GitHub Pages),
//          --noindex (preview copies: keep search engines out)
const arg = (k) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').split('=')[1] || '';
const BASE = arg('base').replace(/\/+$/, '');
const NOINDEX = process.argv.includes('--noindex');
const DIST = join(ROOT, arg('out') || 'dist');
// Prefix every root-relative URL with BASE (attributes, srcsets, CSS url()).
const withBase = (txt) =>
  !BASE
    ? txt
    : txt
        .replace(/(\s(?:href|src|poster|data-src|data-href|action))="\/(?!\/)/g, `$1="${BASE}/`)
        .replace(/(\s(?:srcset|imagesrcset))="([^"]*)"/g, (m, a, v) => `${a}="${v.replace(/(^|,\s*)\//g, `$1${BASE}/`)}"`)
        .replace(/url\(\/(?!\/)/g, `url(${BASE}/`);
const IMAGES = join(ROOT, 'images');
const STATIC = join(ROOT, 'static');

// 1. Clean output, copy static code assets and images (mapping from ADSQUID-IMAGES-README.txt section 1).
// Empty /dist instead of deleting it, so an Explorer window or terminal open in it doesn't block the build.
mkdirSync(DIST, { recursive: true });
for (const f of readdirSync(DIST)) rmSync(join(DIST, f), { recursive: true, force: true });
cpSync(STATIC, DIST, { recursive: true });
const imageMap = {
  ads: 'assets/images/ads',
  blog: 'assets/images/blog',
  brand: 'assets/images/brand',
  home: 'assets/images/home',
  mockups: 'assets/images/mockups',
  pages: 'assets/images/pages',
  services: 'assets/images/services',
  textures: 'assets/images/textures',
  team: 'assets/images/team',
  video: 'assets/video',
};
for (const [from, to] of Object.entries(imageMap)) {
  if (existsSync(join(IMAGES, from))) cpSync(join(IMAGES, from), join(DIST, to), { recursive: true });
}
for (const f of readdirSync(join(IMAGES, 'favicons'))) cpSync(join(IMAGES, 'favicons', f), join(DIST, f));

// 2. Footer wordmark: tight viewBox + outline version generated from the real logo SVG.
let wordmark;
{
  const src = readFileSync(join(IMAGES, 'brand/logo/adsquid-wordmark.svg'), 'utf8');
  const ds = [...src.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]);
  const nums = ds.join(' ').match(/-?\d*\.?\d+/g).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    x0 = Math.min(x0, nums[i]); x1 = Math.max(x1, nums[i]);
    y0 = Math.min(y0, nums[i + 1]); y1 = Math.max(y1, nums[i + 1]);
  }
  const pad = 4;
  const vb = `${(x0 - pad).toFixed(1)} ${(y0 - pad).toFixed(1)} ${(x1 - x0 + pad * 2).toFixed(1)} ${(y1 - y0 + pad * 2).toFixed(1)}`;
  const paths = ds.map((d) => `<path d="${d}"/>`).join('');
  const out = (attrs) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid meet"><g fill-rule="evenodd" ${attrs}>${paths}</g></svg>`;
  writeFileSync(join(DIST, 'assets/images/brand/logo/adsquid-wordmark-outline.svg'), out('fill="none" stroke="#D6B4FF" stroke-opacity=".45" stroke-width="1.6" vector-effect="non-scaling-stroke"'));
  writeFileSync(join(DIST, 'assets/images/brand/logo/adsquid-wordmark-tight.svg'), out('fill="#000"'));
  wordmark = { w: Math.round(x1 - x0 + pad * 2), h: Math.round(y1 - y0 + pad * 2) };
}

// 3. Asset versioning (?v=hash) for long-term caching.
const hashes = {};
const version = (p) => {
  if (!hashes[p]) hashes[p] = createHash('md5').update(readFileSync(join(DIST, p))).digest('hex').slice(0, 8);
  return `${p}?v=${hashes[p]}`;
};
const minifyCss = (css) =>
  css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
// Split homepage-only critical CSS (marked @home-only-start/end) before minifying strips the marker comments.
const HOME_RE = /\/\*\s*@home-only-start\s*\*\/([\s\S]*?)\/\*\s*@home-only-end\s*\*\//g;
const rawCritical = readFileSync(join(DIST, 'assets/css/critical.css'), 'utf8');
const criticalHome = minifyCss([...rawCritical.matchAll(HOME_RE)].map((m) => m[1]).join(' '));
writeFileSync(join(DIST, 'assets/css/critical.css'), rawCritical.replace(HOME_RE, ''));
for (const f of ['critical.css', 'main.css']) {
  const p = join(DIST, 'assets/css', f);
  // critical.css is inlined into the HTML, which gets the base prefix as a whole: prefix main.css only
  const css = minifyCss(readFileSync(p, 'utf8'));
  writeFileSync(p, f === 'main.css' ? withBase(css) : css);
}
if (BASE) {
  const mf = join(DIST, 'site.webmanifest');
  writeFileSync(mf, readFileSync(mf, 'utf8').replace(/"\/(?!\/)/g, `"${BASE}/`));
}
writeFileSync(join(DIST, '.nojekyll'), ''); // GitHub Pages: serve files as-is
// Critical CSS is inlined per page (criticalHome is added on the homepage only).
const critical = readFileSync(join(DIST, 'assets/css/critical.css'), 'utf8');
rmSync(join(DIST, 'assets/css/critical.css'));
configureLayout({ version, critical, criticalHome, wordmark, basePath: BASE, noindex: NOINDEX });

// 4. Blog posts: src/content/posts/*.html with a JSON front matter comment.
const POSTS_DIR = join(ROOT, 'src/content/posts');
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const posts = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.html') && !f.startsWith('_'))
  .map((f) => {
    const raw = readFileSync(join(POSTS_DIR, f), 'utf8');
    const m = raw.match(/^<!--\s*(\{[\s\S]*?\})\s*-->/);
    if (!m) throw new Error(`Missing front matter in ${f}`);
    const meta = JSON.parse(m[1]);
    if (meta.draft) return null;
    if (!services.find((s) => s.slug === meta.category)) throw new Error(`Unknown category "${meta.category}" in ${f}`);
    const toc = [];
    const html = raw
      .slice(m[0].length)
      .trim()
      .replace(/<h2>([\s\S]*?)<\/h2>/g, (_, t) => {
        const id = slugify(t);
        toc.push({ id, text: t.replace(/<[^>]+>/g, '') });
        return `<h2 id="${id}">${t}</h2>`;
      });
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return { slug: f.replace(/\.html$/, ''), ...meta, html, toc, words, readingMins: Math.max(1, Math.round(words / 220)) };
  })
  .filter(Boolean)
  .sort((a, b) => b.date.localeCompare(a.date));
const ctx = { posts };

// 5. Pages.
const pages = [
  homePage(ctx),
  servicesHub(),
  ...services.map((s) => servicePage(s, ctx)),
  ...adPages.map((a) => adPage(a, ctx)),
  workIndex(),
  ...work.map(casePage),
  blogIndex(ctx),
  ...services.map((s) => categoryPage(s, ctx)),
  ...posts.map((p) => postPage(p, ctx)),
  aboutPage(),
  auditPage(),
  contactPage(),
  careersPage(),
  privacyPage(),
  termsPage(),
  notFoundPage(),
];

const problems = [];
for (const p of pages) {
  if (p.desc.length > 160 || p.desc.length < 70) problems.push(`desc length ${p.desc.length}: ${p.path}`);
  if (/—/.test(p.body) || /—/.test(p.title)) problems.push(`long dash found: ${p.path}`);
  const html = withBase(renderPage(p));
  const out = p.path.endsWith('.html') ? join(DIST, p.path) : join(DIST, p.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${h1s} h1 tags: ${p.path}`);
}

// 6. sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex);
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${p.lastmod || today}</lastmod></url>`).join('\n')}
</urlset>
`
);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

// 7. Report.
const dirSize = (d) => readdirSync(d).reduce((t, f) => { const p = join(d, f); const s = statSync(p); return t + (s.isDirectory() ? dirSize(p) : s.size); }, 0);
console.log(`Built ${pages.length} pages (${indexable.length} in sitemap), ${posts.length} posts. dist = ${(dirSize(DIST) / 1048576).toFixed(1)} MB`);
console.log(`critical.css inline: ${(Buffer.byteLength(critical) / 1024).toFixed(1)} KB (+${(Buffer.byteLength(criticalHome) / 1024).toFixed(1)} KB on home), main.css: ${(statSync(join(DIST, 'assets/css/main.css')).size / 1024).toFixed(1)} KB`);
if (problems.length) {
  console.warn('\nChecks:\n  ' + problems.join('\n  '));
}
