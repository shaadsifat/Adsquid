/* Homepage scroll story (chapters 00-09). The services infographic (02) lives in main.js.
   Per-frame work is transform / opacity / stroke-dashoffset only, and every write is skipped
   when the value has not changed. */
(() => {
  'use strict';
  const d = document;
  const root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const cfg = window.ADSQ || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches && !root.classList.contains('force-motion');
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const motion = hasGsap && !reduce;
  const desktop = matchMedia('(min-width: 1024px)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- 09 CTA video (V3): only near the viewport, never on phones / save-data ---------- */
  const video = $('.cta-video');
  if (video && 'IntersectionObserver' in window) {
    const allowed = !saveData && !reduce && matchMedia('(min-width: 768px)').matches;
    let loaded = false;
    new IntersectionObserver(([en]) => {
      if (!allowed) return;
      if (en.isIntersecting) {
        if (!loaded) { const s = $('source', video); s.src = s.dataset.src; video.load(); loaded = true; }
        video.play().catch(() => {});
      } else if (loaded) video.pause();
    }, { rootMargin: '200px 0px' }).observe(video);
  }

  if (!motion) {
    // Reduced motion: everything shown in its final state.
    $$('.plat-chip, .p-step').forEach((el) => el.classList.add('on'));
    $$('.noise-card').forEach((c) => c.classList.add('snapped'));
    $$('.cta-line').forEach((el) => el.style.setProperty('--draw', 0));
    return;
  }

  /* ---------- Chapter rail ---------- */
  const rail = $('.rail');
  if (rail) {
    const links = $$('[data-rail]', rail);
    $$('[data-chapter]').forEach((sec) => {
      const i = +sec.dataset.chapter;
      ScrollTrigger.create({
        trigger: sec, start: 'top 55%', end: 'bottom 55%',
        onToggle: (self) => self.isActive && links.forEach((l, j) => l.classList.toggle('on', j === i)),
      });
    });
    const railFill = $('.rail-fill', rail);
    ScrollTrigger.create({ trigger: d.body, start: 'top top', end: 'bottom bottom', onUpdate: (s) => (railFill.style.transform = `scaleY(${s.progress.toFixed(4)})`) });
    ScrollTrigger.create({ trigger: '.site-footer', start: 'top 80%', onToggle: (s) => rail.classList.toggle('hide', s.isActive) });
  }

  /* ---------- 00 Hero: the octopus follows the cursor a little (3D tilt, chips at more depth), hops on click ---------- */
  const hero = $('.hero-home');
  const art = $('.hero-art');
  const stage = $('.art-stage');
  if (hero && art && stage) {
    const hop = $('.art-hop', art);
    const img = $('.art-img', art);
    if (img && hop) {
      img.addEventListener('click', () => { hop.classList.remove('hop'); void hop.offsetWidth; hop.classList.add('hop'); });
      hop.addEventListener('animationend', () => hop.classList.remove('hop'));
    }
    if (finePointer) {
      gsap.set(stage, { transformPerspective: 1000 });
      const rx = gsap.quickTo(stage, 'rotationX', { duration: 1, ease: 'power3' });
      const ry = gsap.quickTo(stage, 'rotationY', { duration: 1, ease: 'power3' });
      const sx = gsap.quickTo(stage, 'x', { duration: 1.2, ease: 'power3' });
      const sy = gsap.quickTo(stage, 'y', { duration: 1.2, ease: 'power3' });
      const chips = $$('.art-chip', art).map((c) => ({
        d: +c.dataset.depth || 2,
        x: gsap.quickTo(c, 'x', { duration: 1.1, ease: 'power3' }),
        y: gsap.quickTo(c, 'y', { duration: 1.1, ease: 'power3' }),
      }));
      hero.addEventListener('pointermove', (e) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        ry(nx * 14); rx(-ny * 10); sx(nx * 22); sy(ny * 14);
        chips.forEach((c) => { c.x(nx * 10 * c.d); c.y(ny * 8 * c.d); });
      });
      hero.addEventListener('pointerleave', () => { rx(0); ry(0); sx(0); sy(0); chips.forEach((c) => { c.x(0); c.y(0); }); });
    }
    // Scrolling away: the mascot rises a little slower and fades, the text lifts.
    gsap.to(art, { yPercent: -12, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-content', { y: -50, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: hero, start: desktop ? 'top top' : 'center top', end: 'bottom top', scrub: true } });
    gsap.to('.scroll-cue', { opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '+=120', scrub: true } });
  }

  /* ---------- 01 The problem: the line cuts through, cards snap into a row ---------- */
  const noise = $('.ch-noise');
  if (noise) {
    const nCards = $$('.noise-card', noise);
    const scatter = [
      { x: -50, y: 80, rotation: -13 },
      { x: 30, y: -70, rotation: 10 },
      { x: 70, y: 60, rotation: -8 },
    ];
    nCards.forEach((c, i) => gsap.set(c, { ...scatter[i % 3], opacity: 0.5 }));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: noise, start: 'top 70%', end: 'center 50%', scrub: 0.5,
        onUpdate: (s) => nCards.forEach((c, i) => c.classList.toggle('snapped', s.progress > 0.45 + i * 0.15)),
      },
    });
    tl.to(nCards, { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'power3.out', duration: 0.6, stagger: 0.15 }, 0.25);
    gsap.fromTo($('.ch-bg img', noise), { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.02, ease: 'none', scrollTrigger: { trigger: noise, start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- 03 Process: steps light up as the line climbs ---------- */
  const proc = $('.process-box');
  if (proc) {
    const chips = $$('.plat-chip', proc);
    const steps = $$('.p-step', proc);
    let lastK = -1;
    ScrollTrigger.create({
      trigger: proc, start: 'top 70%', end: 'bottom 75%', scrub: true,
      onUpdate: (s) => {
        const k = Math.floor(s.progress * 5.4);
        if (k === lastK) return;
        lastK = k;
        chips.forEach((c, i) => c.classList.toggle('on', i < k));
        steps.forEach((c, i) => c.classList.toggle('on', i < k));
      },
    });
    const pm = $('.process-media img', proc);
    if (pm) gsap.fromTo(pm, { scale: 1.08, yPercent: 3 }, { scale: 1, yPercent: -3, ease: 'none', scrollTrigger: { trigger: proc, start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- 04 Proof: bars rise out of the floor ---------- */
  const proofImg = $('.proof-bg img');
  if (proofImg) {
    gsap.fromTo(proofImg, { yPercent: 30, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.ch-proof', start: 'top 90%', end: 'top 15%', scrub: true } });
  }

  /* ---------- 05 Clients: grid floor glides ---------- */
  const floor = $('.clients-bg img');
  if (floor) gsap.fromTo(floor, { yPercent: 8, scale: 1.1 }, { yPercent: -4, scale: 1, ease: 'none', scrollTrigger: { trigger: '.ch-clients', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* ---------- 09 CTA: fly into the portal, the signal line enters it ---------- */
  const cta = $('.ch-cta');
  if (cta) {
    gsap.fromTo('.cta-media', { scale: 1.4 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: cta, start: 'top bottom', end: 'center center', scrub: true } });
    gsap.fromTo('.cta-line', { '--draw': 1 }, { '--draw': 0, ease: 'none', scrollTrigger: { trigger: cta, start: 'top 70%', end: 'center 55%', scrub: true } });
    gsap.from('.cta-form', { y: 70, opacity: 0, scale: 0.96, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: cta, start: 'top 55%' } });
  }

  // Recalculate every trigger in page order once this file's triggers exist.
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
})();
