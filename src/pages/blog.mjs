import { services, team } from '../data.mjs';
import { img16, icon, btn, eyebrow, faqBlock, breadcrumbSchema, faqSchema, serviceBySlug, serviceUrl, coverOf, esc, abs, fmtDate, teamImg } from '../lib.mjs';
import { pageHero, heroPreload, heroIcon } from './parts.mjs';

const cover = (p) => coverOf(serviceBySlug(p.category));

export function postCard(p, { large = false, headingTag = 'h3' } = {}) {
  const s = serviceBySlug(p.category);
  return `<article class="card post-card reveal${large ? ' post-large' : ''}">
  <a href="/blog/${p.slug}/" class="card-link">
    <span class="post-cover">${img16(cover(p), { sizes: large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', alt: '' })}<span class="post-cover-title" aria-hidden="true">${esc(s.short)}</span></span>
    <span class="post-meta mono"><span class="cat">${esc(s.short)}</span> &middot; ${p.readingMins} min read</span>
    <${headingTag} class="post-title">${esc(p.title)}</${headingTag}>
    ${large ? `<p>${esc(p.description)}</p>` : ''}
  </a>
</article>`;
}

function categoryChips(active) {
  return `<ul class="chip-row cats" aria-label="Categories">
    <li><a class="chip" href="/blog/"${!active ? ' aria-current="page"' : ''}>All</a></li>
    ${services.map((s) => `<li><a class="chip" href="/blog/category/${s.slug}/"${active === s.slug ? ' aria-current="page"' : ''}>${s.short}</a></li>`).join('')}
  </ul>`;
}

export function blogIndex({ posts }) {
  const crumbs = [{ name: 'Blog', path: '/blog/' }];
  const [first, ...rest] = posts;
  const body = `
${pageHero({
  crumbs,
  h1: 'Digital marketing blog for Bangladesh',
  display: 'Tips that pay back.',
  sentence: 'Practical guides on ads, social media, SEO, design and websites for growing businesses.',
  cls: 'hero-type',
  visual: heroIcon('blog'),
})}
<section class="section section-tight" aria-label="Articles">
  <div class="container">
    ${categoryChips()}
    ${first ? `<div class="featured">${postCard(first, { large: true, headingTag: 'h2' })}</div>` : '<p>New articles coming soon.</p>'}
    <div class="cards-3 stagger">${rest.map((p) => postCard(p, { headingTag: 'h2' })).join('')}</div>
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

export function categoryPage(s, { posts }) {
  const path = `/blog/category/${s.slug}/`;
  const crumbs = [
    { name: 'Blog', path: '/blog/' },
    { name: s.short, path },
  ];
  const list = posts.filter((p) => p.category === s.slug);
  const body = `
${pageHero({
  crumbs,
  h1: `${s.name} articles`,
  display: `${s.short}, explained.`,
  sentence: `Guides and answers about ${s.name.toLowerCase()} for businesses in Bangladesh.`,
  image: coverOf(s),
  buttons: btn(serviceUrl(s), `Our ${s.short.toLowerCase()} service`, { variant: 'ghost' }),
})}
<section class="section section-tight" aria-label="Articles">
  <div class="container">
    ${categoryChips(s.slug)}
    ${list.length ? `<div class="cards-3 stagger">${list.map((p) => postCard(p, { headingTag: 'h2' })).join('')}</div>` : `<p class="empty">New ${esc(s.short)} articles are on the way. Meanwhile, see <a href="${serviceUrl(s)}">our ${esc(s.name)} service</a>.</p>`}
  </div>
</section>`;
  return {
    path,
    title: `${s.name} Articles | Adsquid Blog`,
    desc: `Guides and answers about ${s.name.toLowerCase()} for businesses in Bangladesh, from the Adsquid team in Dhaka.`.slice(0, 155),
    preload: [heroPreload(coverOf(s))],
    schema: [breadcrumbSchema(crumbs)],
    noindex: list.length === 0,
    body,
  };
}

export function postPage(p, { posts }) {
  const s = serviceBySlug(p.category);
  const path = `/blog/${p.slug}/`;
  const crumbs = [
    { name: 'Blog', path: '/blog/' },
    { name: s.short, path: `/blog/category/${s.slug}/` },
    { name: p.title, path },
  ];
  const author = team.find((m) => m.name === p.author) || team[0];
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
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li><li><a href="/blog/category/${s.slug}/">${s.short}</a></li></ol></nav>
      <a class="chip chip-cat" href="/blog/category/${s.slug}/">${s.short}</a>
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
