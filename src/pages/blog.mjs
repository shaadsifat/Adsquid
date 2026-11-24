import { services, team } from '../data.mjs';
import { img16, icon, btn, eyebrow, hexIcon, faqBlock, breadcrumbSchema, faqSchema, serviceBySlug, serviceUrl, coverOf, esc, abs, fmtDate, teamImg } from '../lib.mjs';
import { pageHero, heroPreload } from './parts.mjs';
import { heroArt } from './art.mjs';


const cover = (p) => coverOf(serviceBySlug(p.category));

// Each service gets its own cover colour on blog cards.
const HUE = { 'ads-campaign': 272, 'social-media-marketing': 300, 'brand-identity-design': 285, 'graphic-design': 325, 'video-production': 250, 'website-development': 200, seo: 165, 'software-development': 225 };
const authorOf = (p) => team.find((m) => m.name === p.author) || team[0];

export function postCard(p, { headingTag = 'h3' } = {}) {
  const s = serviceBySlug(p.category);
  const a = authorOf(p);
  return `<article class="card post-card reveal">
  <a href="/blog/${p.slug}/" class="card-link">
    <span class="pc-art" style="--h:${HUE[s.slug] || 272}" aria-hidden="true"><span class="pc-grid"></span>${hexIcon(s.icon, 'pc-hex')}<span class="pc-cat">${esc(s.short)}</span><span class="pc-mins mono">${p.readingMins} min read</span></span>
    <span class="pc-body">
      <${headingTag} class="post-title">${esc(p.title)}</${headingTag}>
      <span class="pc-desc">${esc(p.description)}</span>
      <span class="pc-author"><img src="/assets/images/team/${a.photo}-320.webp" width="40" height="40" alt="" loading="lazy" decoding="async"><span><b>${esc(a.name)}</b><small><time datetime="${p.date}">${fmtDate(p.date)}</time></small></span>${icon('arrow-up-right', 'pc-go')}</span>
    </span>
  </a>
</article>`;
}


export function blogIndex({ posts }) {
  const crumbs = [{ name: 'Blog', path: '/blog/' }];
  const body = `
${pageHero({
  crumbs,
  h1: 'Digital marketing blog for Bangladesh',
  display: 'Tips that pay back.',
  sentence: 'Practical guides on ads, social media, SEO, design, video, websites and software, written by the people who do the work.',
  cls: 'hero-type',
  visual: heroArt(['editor', { avatars: team.slice(0, 5).map((m) => `/assets/images/team/${m.photo}-320.webp`), chips: [['list-checks', 'Checklists'], ['calculator', 'Real cost examples']] }]),
})}
<section class="section section-tight" aria-label="Articles">
  <div class="container">
    <div class="blog-bar reveal">
      <p class="blog-count"><b>${posts.length}</b> practical guides</p>
      <div class="blog-team">${[...new Set(posts.map((x) => x.author))].map((n) => team.find((m) => m.name === n)).filter(Boolean).map((m) => `<img src="/assets/images/team/${m.photo}-320.webp" width="38" height="38" alt="${esc(m.name)}" title="${esc(m.name)}, ${esc(m.role)}" loading="lazy" decoding="async">`).join('')}<span>Written by our specialists</span></div>
    </div>
    <div class="cards-3 stagger blog-grid">${posts.map((p) => postCard(p, { headingTag: 'h2' })).join('')}</div>
  </div>
</section>`;
  return {
    path: '/blog/',
    title: 'Adsquid Blog | Digital Marketing Tips for Bangladesh',
    desc: 'Practical guides on ads, social media, SEO, design and websites for businesses in Bangladesh.',
    schema: [breadcrumbSchema(crumbs)],
    body,
  };
}


export function postPage(p, { posts }) {
  const s = serviceBySlug(p.category);
  const path = `/blog/${p.slug}/`;
  const crumbs = [
    { name: 'Blog', path: '/blog/' },
    { name: p.title, path },
  ];
  const author = authorOf(p);
  const related = [...posts.filter((x) => x !== p && x.category === p.category), ...posts.filter((x) => x !== p && x.category !== p.category)].slice(0, 3);
  const ctaBox = `<aside class="cta-box">
    <p class="eyebrow">${esc(s.name)}</p>
    <p class="cta-box-title">${esc(s.pitch)}</p>
    <p>Want us to do this for you? Start with a free audit.</p>
    <div class="btns">${btn('/free-audit/', 'Get a free audit')}${btn(serviceUrl(s), `See ${s.short} service`, { variant: 'ghost' })}</div>
  </aside>`;
  const content = p.html.includes('<!-- cta -->') ? p.html.replace('<!-- cta -->', ctaBox) : p.html + ctaBox;
  const share = encodeURIComponent(abs(path));

  const body = `
<article class="post">
  <header class="post-hero">
    <div class="container narrow">
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li></ol></nav>
      <a class="chip chip-cat" href="${serviceUrl(s)}">${s.name}</a>
      <h1 class="post-h1">${esc(p.title)}</h1>
      <div class="byline">
        <img src="/assets/images/team/${author.photo}-320.webp" width="48" height="48" alt="" class="avatar">
        <div><strong>${esc(author.name)}</strong><span>${esc(author.role)}</span></div>
        <span class="mono byline-meta"><time datetime="${p.date}">${fmtDate(p.date)}</time>${p.updated ? ` &middot; Updated <time datetime="${p.updated}">${fmtDate(p.updated)}</time>` : ''} &middot; ${p.readingMins} min read</span>
      </div>
    </div>
    <div class="container post-cover-wrap">${img16(cover(p), { priority: true, sizes: '(min-width: 1200px) 1100px, 100vw', alt: `${s.name} article cover` })}</div>
  </header>
  <div class="container post-layout">
    <aside class="toc" aria-label="On this page">
      <p class="eyebrow">On this page</p>
      <ol>${p.toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol>
    </aside>
    <div class="prose">
      ${content}
    </div>
  </div>
</article>
${p.faq?.length ? faqBlock(p.faq) : ''}
<section class="section section-tight">
  <div class="container narrow">
    <div class="author-box card">
      ${teamImg(author, { sizes: '96px' })}
      <div><p class="eyebrow">Written by</p><p class="author-name">${esc(author.name)}</p><p>${esc(author.role)} at Adsquid. Works with Bangladeshi brands on ${esc(s.name.toLowerCase())} every day.</p>${author.linkedin ? `<a href="${author.linkedin}" target="_blank" rel="noopener">LinkedIn ${icon('arrow-up-right')}</a>` : ''}</div>
    </div>
    <div class="share"><span class="mono">Share</span>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${share}" target="_blank" rel="noopener">Facebook</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${share}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://wa.me/?text=${share}" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </div>
</section>
${related.length ? `<section class="section" aria-labelledby="rel-title"><div class="container"><div class="sec-head">${eyebrow('Keep reading')}<h2 class="h2" id="rel-title">Related articles.</h2></div><div class="cards-3 stagger">${related.map((r) => postCard(r)).join('')}</div></div></section>` : ''}`;

  return {
    path,
    title: `${p.title} | Adsquid Blog`,
    desc: p.description,
    ogType: 'article',
    lastmod: p.updated || p.date,
    ogImage: `/assets/images/${cover(p)}-1280.webp`,
    preload: [heroPreload(cover(p))],
    schema: [
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        image: abs(`/assets/images/${cover(p)}.webp`),
        datePublished: p.date,
        dateModified: p.updated || p.date,
        mainEntityOfPage: abs(path),
        articleSection: s.name,
        author: { '@type': 'Person', name: author.name, jobTitle: author.role, image: abs(`/assets/images/team/${author.photo}.webp`), sameAs: author.linkedin ? [author.linkedin] : undefined },
        publisher: { '@id': abs('/#organization'), '@type': 'Organization', name: 'Adsquid', logo: { '@type': 'ImageObject', url: abs('/assets/images/brand/logo/adsquid-logo-1200.png') } },
      },
      ...(p.faq?.length ? [faqSchema(p.faq)] : []),
    ],
    body,
  };
}
