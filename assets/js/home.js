/* Homepage scroll story (chapters 00-09). Pinned sections: hero (desktop) and chapter 02 (desktop).
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

  /* ---------- 02 Many arms: shared state ---------- */
  const armsSec = $('.ch-arms');
  const arms = $$('.net-arm');
  const nodes = $$('.net-node');
  const cards = $$('.svc-card');
  const n = arms.length;
  const armK = new Array(n).fill(-1);
  const meta = { cur: $('.arms-cur'), name: $('.arms-name'), bar: $('.arms-bar') };
  const names = nodes.map((nd) => $('.net-tag', nd).textContent);
  const progs = cards.map((c) => $('.svc-prog i', c));
  const metaBarI = meta.bar && $('i', meta.bar);
  let active = -1;

  const setArm = (i, k) => {
    k = Math.round(k * 400) / 400;
    if (armK[i] === k) return;
    armK[i] = k;
    const off = String(1 - k);
    $$('.net-glow, .net-line', arms[i]).forEach((p) => (p.style.strokeDashoffset = off));
    const lit = k >= 1;
    if (lit && !arms[i].classList.contains('lit')) setTimeout(() => arms[i].classList.add('pulsed'), 1000);
    if (!lit) arms[i].classList.remove('pulsed');
    arms[i].classList.toggle('lit', lit);
    nodes[i].classList.toggle('lit', lit);
    if (progs[i]) progs[i].style.transform = `scaleX(${k})`;
  };
  const setActive = (i) => {
    if (i === active) return;
    active = i;
    arms.forEach((a, j) => a.classList.toggle('active', j === i));
    nodes.forEach((nd, j) => nd.classList.toggle('active', j === i));
    cards.forEach((c, j) => { c.classList.toggle('on', j === i); c.classList.toggle('past', j < i); });
    if (meta.cur) meta.cur.textContent = String(i + 1).padStart(2, '0');
    if (meta.name) meta.name.textContent = names[i];
  };
  if (armsSec && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => armsSec.classList.toggle('inview', en.isIntersecting)).observe(armsSec);
  }
  const tilt = (el, area, max = 7) => {
    const rx = gsap.quickTo(el, 'rotationX', { duration: 1.1, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 1.1, ease: 'power3' });
    area.addEventListener('pointermove', (e) => {
      const r = area.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * max);
      rx(-((e.clientY - r.top) / r.height - 0.5) * max * 0.7);
    });
    area.addEventListener('pointerleave', () => { rx(0); ry(0); });
  };

  if (!motion) {
    // Reduced motion: everything lit, sockets still work as shortcuts.
    arms.forEach((a, i) => setArm(i, 1));
    setActive(0);
    $$('.plat-chip, .p-step').forEach((el) => el.classList.add('on'));
    $$('.noise-card').forEach((c) => c.classList.add('snapped'));
    $$('.noise-line, .cta-line').forEach((el) => el.style.setProperty('--draw', 0));
    const track = $('.arms-track');
    nodes.forEach((nd, i) => nd.addEventListener('click', () => {
      setActive(i);
      track && track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft });
    }));
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
    tl.fromTo($('.noise-line', noise), { '--draw': 1 }, { '--draw': 0, ease: 'none', duration: 1 }, 0);
    tl.to(nCards, { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'power3.out', duration: 0.6, stagger: 0.15 }, 0.25);
    gsap.fromTo($('.ch-bg img', noise), { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.02, ease: 'none', scrollTrigger: { trigger: noise, start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- 02 Many arms ---------- */
  if (armsSec && desktop) {
    // Pinned: each line draws to its socket while its card slides into place.
    armsSec.classList.add('pinned');
    const track = $('.arms-track', armsSec);
    const span = n + 0.4; // a little rest after the last arm
    let step = 356;
    const measure = () => { step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 356; };
    let lastX = null, lastBar = null;
    const render = (p) => {
      const pos = p * span;
      for (let i = 0; i < n; i++) setArm(i, clamp((pos - i) / 0.85, 0, 1));
      const x = (clamp(pos - 0.9, 0, n - 1) * step).toFixed(1);
      if (x !== lastX) { track.style.transform = `translate3d(${-x}px,0,0)`; lastX = x; }
      setActive(clamp(Math.floor(pos), 0, n - 1));
      const b = (Math.min(pos, n) / n).toFixed(3);
      if (b !== lastBar) { metaBarI.style.transform = `scaleX(${b})`; lastBar = b; }
    };
    const st = ScrollTrigger.create({
      trigger: armsSec, start: 'top top', end: () => `+=${Math.round(innerHeight * 3)}`, pin: true, pinSpacer: $('.arms-spacer'), scrub: 0.4, invalidateOnRefresh: true,
      onRefresh: measure,
      onUpdate: (self) => render(self.progress),
    });
    measure();
    render(0);
    // Click a socket: glide to the point where that arm is drawn and its card sits in place.
    nodes.forEach((nd, i) => nd.addEventListener('click', () => {
      const target = st.start + ((i + 0.9) / span) * (st.end - st.start);
      cfg.scrollTo ? cfg.scrollTo(target, { duration: 1.2 + Math.abs(i - active) * 0.08 }) : scrollTo({ top: target, behavior: 'smooth' });
    }));
    if (finePointer) tilt($('.net-box', armsSec), $('.arms-visual', armsSec), 7);
  } else if (armsSec) {
    // Phones / tablets: lines draw in once, cards are a swipe carousel synced with the sockets.
    const track = $('.arms-track', armsSec);
    const go = (i) => track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
    ScrollTrigger.create({
      trigger: $('.net-box', armsSec), start: 'top 75%', once: true,
      onEnter: () => arms.forEach((a, i) => gsap.to({ k: 0 }, { k: 1, duration: 0.7, delay: i * 0.16, ease: 'power2.out', onUpdate() { setArm(i, this.targets()[0].k); } })),
    });
    setActive(0);
    nodes.forEach((nd, i) => nd.addEventListener('click', () => { setActive(i); go(i); }));
    let raf = 0;
    track.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const stepW = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
        setActive(clamp(Math.round(track.scrollLeft / stepW), 0, n - 1));
      });
    }, { passive: true });
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

  // Triggers from main.js (footer, reveals) were created before the pins above: recalculate in page order.
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
})();
