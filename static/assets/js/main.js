/* Adsquid main.js: Lenis, header, menus, scroll progress, reveals, counters, tilt, spotlight,
   magnetic buttons, cursor, light-trail canvases, page-hero parallax, FAQ accordion, marquee,
   carousels, forms, filters, map, analytics.
   Everything is progressive: the page is complete without this file.
   Performance rule: per-frame work only touches transform / opacity (GPU), never layout. */
(() => {
  'use strict';
  const d = document;
  const root = d.documentElement;
  const cfg = window.ADSQ || (window.ADSQ = {});
  // ?motion in the URL forces animation on (preview aid for PCs with Windows animations turned off)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches && !root.classList.contains('force-motion');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const motion = hasGsap && !reduce;

  root.classList.add(reduce ? 'no-motion' : 'motion');
  if (/[?&]placeholders/.test(location.search)) root.classList.add('show-placeholders');
  cfg.reduce = reduce;
  cfg.saveData = saveData;

  /* ---------- Copyright year: the HTML already has it (for SEO); keep it current on every visit ---------- */
  const yr = String(new Date().getFullYear());
  $$('.js-year').forEach((el) => { if (el.textContent !== yr) el.textContent = yr; });

  /* ---------- Smooth scroll (Lenis) + ScrollTrigger ---------- */
  let lenis = null;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (!reduce && window.Lenis) {
    // Vertical wheel always goes through Lenis (also over the team carousel, which only scrolls sideways); the open mega menu scrolls natively.
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, prevent: (node) => !!(node.classList && node.classList.contains('mega')) });
    lenis.updateClassName = () => {}; // no lenis-* classes on <html> (nothing uses them; avoids root class churn)
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  cfg.lenis = lenis;
  const scrollToY = (y, opts = {}) => (lenis ? lenis.scrollTo(y, { duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts }) : scrollTo({ top: typeof y === 'number' ? y : y.getBoundingClientRect().top + scrollY - 80, behavior: reduce ? 'auto' : 'smooth' }));
  cfg.scrollTo = scrollToY;

  d.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const el = id === '#top' || id === '#' ? root : $(id);
    if (!el) return;
    e.preventDefault();
    scrollToY(el === root ? 0 : el, { offset: el === root ? 0 : -80 });
    if (el !== root && el.matches('section, [tabindex]')) el.setAttribute('tabindex', '-1'), el.focus({ preventScroll: true });
  });

  /* ---------- Header (glass on scroll, hide on scroll down) + progress line ---------- */
  const header = $('[data-header]');
  const bar = $('.progress span');
  let lastY = scrollY, ticking = false, maxY = 1;
  const measureMax = () => { maxY = Math.max(1, root.scrollHeight - innerHeight); };
  measureMax();
  addEventListener('resize', measureMax, { passive: true });
  addEventListener('load', measureMax);
  hasGsap && ScrollTrigger.addEventListener('refresh', measureMax);
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    const menuOpen = d.body.classList.contains('menu-open') || $('.mega.open');
    if (!menuOpen && y > 240 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 240) header.classList.remove('is-hidden');
    if (bar) bar.style.transform = `scaleX(${clamp(y / maxY, 0, 1).toFixed(4)})`;
    lastY = y;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Mega menu ---------- */
  const megaBtn = $('.mega-toggle');
  const mega = $('#mega-menu');
  if (megaBtn && mega) {
    let hoverTimer;
    const setMega = (open) => {
      megaBtn.setAttribute('aria-expanded', String(open));
      mega.classList.toggle('open', open);
      if (open) header.classList.remove('is-hidden');
    };
    // Click opens the menu (a second click keeps it open); it closes on mouse leave, Esc, focus leaving or a click outside.
    megaBtn.addEventListener('click', () => setMega(true));
    if (finePointer) {
      const li = megaBtn.parentElement;
      li.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(() => setMega(true), 80); });
      li.addEventListener('mouseleave', () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(() => setMega(false), 220); });
    }
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mega.classList.contains('open')) { setMega(false); megaBtn.focus(); } });
    d.addEventListener('click', (e) => { if (!e.target.closest('.has-mega')) setMega(false); });
    mega.addEventListener('focusout', (e) => { if (!e.relatedTarget || !e.relatedTarget.closest('.has-mega')) setMega(false); });
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('.menu-toggle');
  const mMenu = $('#mobile-menu');
  if (menuBtn && mMenu) {
    const staged = $$('.m-eyebrow, .m-list > li, .m-cta, .m-foot', mMenu);
    const subBtn = $('.m-toggle', mMenu);
    let hideTimer;
    const setSub = (open) => { if (!subBtn) return; subBtn.closest('.m-item').classList.toggle('open', open); subBtn.setAttribute('aria-expanded', String(open)); };
    const setMenu = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      d.body.classList.toggle('menu-open', open);
      clearTimeout(hideTimer);
      if (open) {
        mMenu.hidden = false;
        // rows rise in one after another, right after the circle opens from the toggle
        staged.forEach((el, i) => (el.style.transitionDelay = `${0.22 + i * 0.05}s`));
        requestAnimationFrame(() => requestAnimationFrame(() => mMenu.classList.add('open')));
        lenis && lenis.stop();
        header.classList.remove('is-hidden');
      } else {
        staged.forEach((el) => (el.style.transitionDelay = '0s'));
        mMenu.classList.remove('open');
        hideTimer = setTimeout(() => { mMenu.hidden = true; setSub(false); }, reduce ? 0 : 700);
        lenis && lenis.start();
      }
    };
    subBtn && subBtn.addEventListener('click', () => setSub(subBtn.getAttribute('aria-expanded') !== 'true'));
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    mMenu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mMenu.hidden) { setMenu(false); menuBtn.focus(); } });
    matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));
  }

  /* ---------- Reveals (staggered per batch) + line-by-line headings ---------- */
  const revealIO = 'IntersectionObserver' in window && !reduce
    ? new IntersectionObserver((entries) => {
        // order by on-screen position using the rects the observer already computed (no forced layout)
        const batch = entries.filter((en) => en.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left).map((en) => en.target);
        batch.forEach((el, i) => {
          revealIO.unobserve(el);
          if (i && !el.matches('[data-split]')) {
            el.style.transitionDelay = `${Math.min(i, 6) * 0.08}s`;
            setTimeout(() => (el.style.transitionDelay = ''), 1200 + i * 80);
          }
          el.classList.add('in');
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    : null;
  const reveal = (el) => (revealIO ? revealIO.observe(el) : el.classList.add('in'));
  $$('.reveal').forEach(reveal);

  function splitLines(el) {
    const parts = [];
    el.childNodes.forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t || /^\s+$/.test(t)) return;
          const s = d.createElement('span');
          s.textContent = t;
          parts.push(s);
        });
      } else if (n.nodeName === 'BR') parts.push(d.createElement('br'));
      else parts.push(n.cloneNode(true));
    });
    el.textContent = '';
    parts.forEach((p, i) => { if (i && p.nodeName !== 'BR' && parts[i - 1].nodeName !== 'BR') el.append(' '); el.append(p); });
    const lines = [];
    let top = null;
    [...el.children].forEach((c) => {
      if (c.nodeName === 'BR') { top = null; return; }
      if (top === null || Math.abs(c.offsetTop - top) > 6) { lines.push([]); top = c.offsetTop; }
      lines[lines.length - 1].push(c);
    });
    el.textContent = '';
    lines.forEach((words, i) => {
      const mask = d.createElement('span');
      mask.className = 'line-mask';
      const inner = d.createElement('span');
      inner.className = 'line-inner';
      inner.style.transitionDelay = `${i * 0.09}s`;
      words.forEach((w, j) => { if (j) inner.append(' '); inner.append(w); });
      mask.append(inner);
      el.append(mask);
    });
  }
  if (!reduce && revealIO) {
    (d.fonts ? d.fonts.ready : Promise.resolve()).then(() => {
      $$('[data-split]').forEach((el) => {
        const label = el.textContent.replace(/\s+/g, ' ').trim();
        splitLines(el);
        el.setAttribute('aria-label', label);
        reveal(el);
      });
      if (hasGsap && d.readyState === 'complete') ScrollTrigger.refresh();
    });
  }

  /* ---------- Counters: data-count numbers and big result numbers ("4.2x", "-38%", "1.4s") ---------- */
  const countUp = (el, from, to, fmt) => {
    const t0 = performance.now(), dur = 1700;
    const step = (t) => {
      const k = clamp((t - t0) / dur, 0, 1);
      el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = fmt(from);
    requestAnimationFrame(step);
  };
  const countIO = 'IntersectionObserver' in window && !reduce
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          countIO.unobserve(en.target);
          const el = en.target;
          if (el.dataset.count) {
            const to = +el.dataset.count;
            countUp(el, el.hasAttribute('data-plain') ? to - 25 : 0, to, (v) => Math.round(v));
          } else {
            const m = el.textContent.trim().match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
            if (!m) return;
            const dec = (m[2].split('.')[1] || '').length;
            countUp(el, 0, parseFloat(m[2]), (v) => m[1] + v.toFixed(dec) + m[3]);
          }
        });
      }, { threshold: 0.6 })
    : null;
  if (countIO) $$('[data-count], .big-num').forEach((el) => countIO.observe(el));

  /* ---------- Tilt cards, card spotlight, magnetic buttons (fine pointers only) ---------- */
  if (finePointer && !reduce) {
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = 'transform .12s linear, border-color .3s, box-shadow .3s';
        el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transition = 'transform .6s cubic-bezier(.215,.61,.355,1)'; el.style.transform = ''; });
    });
    let spotCard = null, spotEv = null, spotRaf = 0;
    d.addEventListener('pointermove', (e) => {
      spotCard = e.target.closest && e.target.closest('.card');
      spotEv = e;
      if (spotCard && !spotRaf) spotRaf = requestAnimationFrame(() => {
        spotRaf = 0;
        if (!spotCard) return;
        const r = spotCard.getBoundingClientRect();
        spotCard.style.setProperty('--mx', `${(spotEv.clientX - r.left).toFixed(0)}px`);
        spotCard.style.setProperty('--my', `${(spotEv.clientY - r.top).toFixed(0)}px`);
      });
    }, { passive: true });
    $$('.btn-magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = clamp((e.clientX - r.left - r.width / 2) * 0.22, -10, 10);
        const y = clamp((e.clientY - r.top - r.height / 2) * 0.35, -8, 8);
        el.style.transition = 'transform .15s ease-out';
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1.2)'; el.style.transform = ''; });
    });
  }

  /* ---------- Cursor: a tiny squid that hops after the pointer on a spring (squash and stretch) ----------
     A small dot stays exactly on the pointer for precise clicks; the squid follows with a bouncy lag,
     stretches along its speed, squashes on click and turns to swim the way it is heading. */
  if (finePointer && !reduce && innerWidth >= 768) {
    const wrap = $('.cursor');
    const dot = $('.cursor-dot');
    const pos = $('.cursor-pos');
    const body = $('.cursor-body');
    const label = $('.cursor-label');
    if (wrap && pos && body) {
      root.classList.add('has-cursor');
      const LABELS = [
        ['.work-open', 'View'],
        ['.post-card', 'Read'],
        ['.svc-tile, .info-card, .platform', 'Open'],
        ['.car-track, .reel-stage', 'Drag'],
      ];
      const DEG = 180 / Math.PI;
      let mx = -100, my = -100, x = -100, y = -100, vx = 0, vy = 0, rot = 0, press = 0, down = false;
      let running = false, last = 0, idleTimer = 0;
      const angDiff = (a, b) => ((a - b + 540) % 360) - 180;
      // idle wander: a smooth, non-repeating path around the pointer (sum of slow sines with random phases)
      let idle = false, idleT = 0, ramp = 0, ph = [0, 0, 0, 0];
      const wander = (dt) => {
        idleT += dt;
        ramp = Math.min(1, ramp + dt * 0.8);
        const ox = Math.sin(idleT * 0.7 + ph[0]) * 26 + Math.sin(idleT * 1.3 + ph[1]) * 12;
        const oy = Math.cos(idleT * 0.55 + ph[2]) * 20 + Math.sin(idleT * 1.1 + ph[3]) * 10;
        return [ox * ramp, oy * ramp];
      };
      const loop = (t) => {
        const f = Math.min(3, ((t - (last || t)) / 1000) * 60) || 1; // frames elapsed at 60 fps
        last = t;
        let tx = mx, ty = my;
        if (idle) { const [ox, oy] = wander(f / 60); tx += ox; ty += oy; }
        // spring: lags a little behind the pointer (catches up in ~0.5 s) with a soft overshoot "hop"
        vx = (vx + (tx - x) * 0.065 * f) * Math.pow(0.79, f);
        vy = (vy + (ty - y) * 0.065 * f) * Math.pow(0.79, f);
        x += vx * f;
        y += vy * f;
        const speed = Math.hypot(vx, vy);
        const stretch = Math.min(speed * 0.055, 0.55);
        const ang = Math.atan2(vy, vx) * DEG;
        // the logo squid heads up-right (-45deg): turn it to face where it swims, settle upright at rest
        const swimming = speed > (idle ? 0.12 : 1.5);
        const target = swimming ? ang + 45 : 0;
        rot += angDiff(target, rot) * Math.min(1, (swimming ? (idle ? 0.06 : 0.2) : 0.07) * f);
        press += ((down ? 1 : 0) - press) * Math.min(1, 0.35 * f);
        pos.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        body.style.transform = `rotate(${ang.toFixed(1)}deg) scale(${(1 + stretch + press * 0.18).toFixed(3)}, ${(1 - stretch * 0.5 - press * 0.28).toFixed(3)}) rotate(${(-ang).toFixed(1)}deg) rotate(${rot.toFixed(1)}deg)`;
        const settled = !idle && Math.abs(mx - x) < 0.1 && Math.abs(my - y) < 0.1 && speed < 0.02 && Math.abs(rot) < 0.3 && Math.abs(press - (down ? 1 : 0)) < 0.01;
        if (settled) { running = false; return; }
        requestAnimationFrame(loop);
      };
      const start = () => { if (!running) { running = true; last = 0; requestAnimationFrame(loop); } };
      addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        if (mx < -50) { x = e.clientX; y = e.clientY; }
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        wrap.classList.remove('is-out', 'is-idle');
        idle = false; ramp = 0;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          // after 2 s still: swim off a little and wander around the pointer
          idle = true; idleT = 0; ramp = 0;
          ph = ph.map(() => Math.random() * Math.PI * 2);
          wrap.classList.add('is-idle');
          start();
        }, 2000);
        start();
      }, { passive: true });
      addEventListener('touchstart', () => wrap.classList.add('is-out'), { passive: true });
      d.addEventListener('pointerover', (e) => {
        const el = e.target;
        if (!el.closest) return;
        const text = el.closest('input, textarea, select, [contenteditable]');
        const plainLink = el.closest('.tc-in, .car-btn, .btn');
        const lab = !plainLink && LABELS.find(([sel]) => el.closest(sel));
        const link = el.closest('a, button, summary, label, [role="button"]');
        wrap.classList.toggle('is-text', !!text);
        wrap.classList.toggle('is-view', !text && !!lab);
        wrap.classList.toggle('is-link', !text && !lab && !!link);
        if (lab) label.textContent = lab[1];
      });
      addEventListener('pointerdown', () => { down = true; idle = false; wrap.classList.remove('is-idle'); start(); });
      addEventListener('pointerup', () => { down = false; start(); });
      d.addEventListener('mouseout', (e) => { if (!e.relatedTarget) wrap.classList.add('is-out'); });
    }
  }

  /* ---------- Shooting stars canvas (V4, built in code): fall from the top-right to the bottom-left ---------- */
  const PALETTE = [[136, 0, 212], [214, 180, 255], [168, 85, 247], [255, 255, 255]];
  // one small glow sprite, reused for every star head (much cheaper than per-star gradients)
  const glow = d.createElement('canvas');
  glow.width = glow.height = 32;
  {
    const g = glow.getContext('2d');
    const rg = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(0.25, 'rgba(232,212,255,.75)');
    rg.addColorStop(1, 'rgba(168,85,247,0)');
    g.fillStyle = rg;
    g.fillRect(0, 0, 32, 32);
  }
  // Each star (tail + glowing head) is drawn once into a small cached sprite; frames just stamp sprites.
  const sprites = new Map();
  const LEN_B = [70, 120, 180, 240, 320, 420];
  const W_B = [1, 1.8, 2.6];
  const starSprite = (li, wi, ci) => {
    const key = li * 100 + wi * 10 + ci;
    let sp = sprites.get(key);
    if (sp) return sp;
    const L = LEN_B[li], W = W_B[wi], pad = 18;
    const span = L * Math.SQRT1_2;
    const size = Math.ceil(span + pad * 2);
    const c = d.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const hx = pad, hy = size - pad, tx = pad + span, ty = size - pad - span; // head bottom-left, tail top-right
    const [r, gg, b] = PALETTE[ci];
    const grad = g.createLinearGradient(hx, hy, tx, ty);
    grad.addColorStop(0, `rgba(${r},${gg},${b},1)`);
    grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
    g.lineCap = 'round';
    g.strokeStyle = grad;
    if (wi === 2) { g.globalAlpha = 0.3; g.lineWidth = W * 5; g.beginPath(); g.moveTo(hx, hy); g.lineTo(tx, ty); g.stroke(); g.globalAlpha = 1; }
    g.lineWidth = W;
    g.beginPath(); g.moveTo(hx, hy); g.lineTo(tx, ty); g.stroke();
    const hs = 6 + W * 5;
    g.drawImage(glow, hx - hs / 2, hy - hs / 2, hs, hs);
    sp = { c, pad, size, len: L };
    sprites.set(key, sp);
    return sp;
  };
  function Trails(canvas) {
    const ctx = canvas.getContext('2d');
    const density = +canvas.dataset.density || 1;
    const speed = +canvas.dataset.speed || 1;
    const opacity = +canvas.dataset.opacity || 0.6;
    const fadeLeft = canvas.dataset.fade === 'left';
    let w = 0, h = 0, trails = [], raf = 0, visible = false, last = 0;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const R = Math.SQRT1_2;
    // Rotated frame: "a" runs along the 45-degree diagonal (positive = up-right), "b" across it.
    // Screen spans a in [-h*R, w*R] and b in [0, (w+h)*R]. Stars move towards negative "a" (down-left).
    const spawn = (t, initial) => {
      const fast = Math.random() < 0.15;
      t.sp = starSprite(fast ? 4 + (Math.random() < 0.5 ? 1 : 0) : Math.floor(rnd(0, 4)), Math.floor(rnd(0, 3)), Math.random() < 0.18 ? 3 : Math.floor(rnd(0, 3)));
      t.al = rnd(0.3, 1) * opacity;
      t.v = rnd(70, 150) * speed * (fast ? 2.6 : 1);
      t.b = rnd(0, (w + h) * R);
      t.a = initial ? rnd(-h * R, w * R + t.sp.len) : w * R + rnd(0, 300);
      return t;
    };
    const resize = () => {
      // 1x is plenty for soft light lines and keeps the canvas cheap on integrated GPUs
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = w; canvas.height = h;
      const n = Math.round(30 * density * clamp(r.width / 1280, 0.5, 1.4) * clamp(r.height / 700, 0.6, 1.3));
      trails = Array.from({ length: n }, () => spawn({}, true));
      if (reduce) draw(0);
    };
    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);
      for (const t of trails) {
        t.a -= t.v * dt;
        if (t.a + t.sp.len < -h * R - 10) { spawn(t, false); continue; }
        const x = (t.a + t.b) * R, y = (t.b - t.a) * R; // head
        let al = t.al;
        if (fadeLeft) al *= clamp((x / w - 0.2) / 0.45, 0, 1);
        if (al < 0.01) continue;
        ctx.globalAlpha = al;
        ctx.drawImage(t.sp.c, x - t.sp.pad, y - (t.sp.size - t.sp.pad));
      }
      ctx.globalAlpha = 1;
    };
    const loop = (now) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      draw(dt);
      if (visible) raf = requestAnimationFrame(loop);
    };
    let rt, sized = false;
    new ResizeObserver(() => { if (!sized) { sized = true; resize(); return; } clearTimeout(rt); rt = setTimeout(resize, 100); }).observe(canvas);
    if (!reduce) {
      new IntersectionObserver(([en]) => {
        visible = en.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) { last = 0; raf = requestAnimationFrame(loop); }
      }).observe(canvas);
      d.addEventListener('visibilitychange', () => { if (d.hidden) cancelAnimationFrame(raf); else if (visible) { last = 0; raf = requestAnimationFrame(loop); } });
    }
  }
  $$('canvas[data-trails]').forEach((c) => Trails(c));

  /* ---------- Scroll-drawn lines, steps, timeline, footer wordmark ---------- */
  $$('.steps-line').forEach((sl) => {
    const svg = $('.signal-line', sl);
    const steps = $$('.step', sl);
    sl.classList.add('js-steps');
    if (motion) {
      ScrollTrigger.create({
        trigger: sl, start: 'top 82%', end: 'top 36%', scrub: true,
        onUpdate: (s) => {
          const p = s.progress;
          svg && svg.style.setProperty('--draw', (1 - p).toFixed(3));
          steps.forEach((st, i) => st.classList.toggle('on', p >= (i + 0.15) / steps.length));
        },
      });
    } else {
      svg && svg.style.setProperty('--draw', 0);
      steps.forEach((st) => st.classList.add('on'));
    }
  });
  const wmBox = $('[data-wordmark]');
  const wmFill = wmBox && $('.wm-lit span', wmBox);
  const wmStar = wmBox && $('.wm-star', wmBox);
  if (motion) {
    $$('.draw-on-scroll').filter((el) => !el.closest('.steps-line')).forEach((el) => {
      gsap.fromTo(el, { '--draw': 1 }, { '--draw': 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: true } });
    });
    $$('.hero-signal').forEach((el) => gsap.fromTo(el, { '--draw': 1 }, { '--draw': 0, duration: 1.6, ease: 'power3.inOut', delay: 0.4 }));
    $$('.timeline').forEach((el) => {
      gsap.fromTo($('.timeline-line span', el), { scaleY: 0 }, { scaleY: 1, transformOrigin: '50% 0%', ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: true } });
    });
    if (wmBox) {
      // the comet rides the edge of the light: letters fill behind it as the footer scrolls in
      let wmW = wmBox.offsetWidth;
      ScrollTrigger.create({
        trigger: wmBox, start: 'top 92%', end: 'bottom 99%', scrub: 0.5,
        onRefresh: () => (wmW = wmBox.offsetWidth),
        onUpdate: (s) => {
          const p = s.progress;
          wmFill.style.transform = `translateX(${((p - 1) * 101).toFixed(2)}%)`;
          wmStar.style.transform = `translate3d(${(p * wmW).toFixed(1)}px, 0, 0)`;
          wmStar.style.opacity = p > 0.01 && p < 0.985 ? '1' : '0';
          wmBox.classList.toggle('lit', p >= 0.985);
        },
      });
      new IntersectionObserver(([en]) => wmBox.classList.toggle('vis', en.isIntersecting)).observe(wmBox);
      if (finePointer) {
        const spot = $('.wm-spot span', wmBox);
        const lit = $('.wm-lit', wmBox);
        gsap.set(wmBox, { transformPerspective: 1100 });
        const rx = gsap.quickTo(wmBox, 'rotationX', { duration: 0.9, ease: 'power3' });
        const ry = gsap.quickTo(wmBox, 'rotationY', { duration: 0.9, ease: 'power3' });
        const lx = gsap.quickTo(lit, 'x', { duration: 0.9, ease: 'power3' });
        const ly = gsap.quickTo(lit, 'y', { duration: 0.9, ease: 'power3' });
        let box = null;
        wmBox.addEventListener('pointerenter', () => { box = wmBox.getBoundingClientRect(); wmBox.classList.add('hover'); });
        wmBox.addEventListener('pointermove', (e) => {
          if (!box) box = wmBox.getBoundingClientRect();
          const px = e.clientX - box.left, py = e.clientY - box.top;
          const nx = px / box.width - 0.5, ny = py / box.height - 0.5;
          spot.style.setProperty('--sx', `${px.toFixed(0)}px`);
          spot.style.setProperty('--sy', `${(py - box.height / 2).toFixed(0)}px`);
          ry(nx * 10); rx(-ny * 9); lx(nx * 14); ly(ny * 8);
        });
        wmBox.addEventListener('pointerleave', () => { box = null; wmBox.classList.remove('hover'); rx(0); ry(0); lx(0); ly(0); });
      }
    }
  } else {
    $$('.draw-on-scroll, .hero-signal').forEach((el) => el.style.setProperty('--draw', 0));
    $$('.timeline').forEach((el) => el.style.setProperty('--p', 1));
    if (wmBox) { wmFill.style.transform = 'none'; wmBox.classList.add('lit'); }
  }

  /* ---------- Inner page hero: scroll parallax + gentle mouse drift ---------- */
  const ph = $('.page-hero');
  if (ph && motion) {
    const media = $('.page-hero-media', ph);
    const content = $('.page-hero-content', ph);
    const wide = matchMedia('(min-width: 900px)').matches;
    if (media && wide) gsap.to(media, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: ph, start: 'top top', end: 'bottom top', scrub: true } });
    if (content) gsap.to(content, { y: -50, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: ph, start: 'top top', end: 'bottom top', scrub: true } });
    if (media && wide && finePointer) {
      gsap.set(media, { scale: 1.05 });
      const xTo = gsap.quickTo(media, 'x', { duration: 1.2, ease: 'power3' });
      const yTo = gsap.quickTo(media, 'y', { duration: 1.2, ease: 'power3' });
      ph.addEventListener('pointermove', (e) => { xTo(-(e.clientX / innerWidth - 0.5) * 26); yTo(-(e.clientY / innerHeight - 0.5) * 16); });
      ph.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    }
  }

  /* ---------- FAQ: smooth open / close ---------- */
  $$('.faq-item').forEach((det) => {
    const sum = $('summary', det);
    const body = $('.faq-a', det);
    if (!sum || !body || !body.animate) return;
    sum.addEventListener('click', (e) => {
      if (reduce) return;
      e.preventDefault();
      if (det.dataset.anim) return;
      det.dataset.anim = '1';
      const ease = 'cubic-bezier(.215,.61,.355,1)';
      if (det.open) {
        const h = body.offsetHeight;
        body.animate([{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: ease }).onfinish = () => { det.open = false; delete det.dataset.anim; };
      } else {
        det.open = true;
        const h = body.offsetHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 420, easing: ease }).onfinish = () => { delete det.dataset.anim; measureMax(); };
      }
    });
  });

  /* ---------- Client marquee: speeds up with scroll velocity ---------- */
  const mq = $('.marquee');
  if (mq && !reduce) {
    mq.classList.add('js-marquee');
    const rows = $$('.marquee-inner', mq).map((el, i) => ({ el, dir: i % 2 ? 1 : -1, x: 0, w: 1 }));
    const measure = () => rows.forEach((r) => {
      const gap = parseFloat(getComputedStyle(r.el).columnGap) || 0;
      r.w = (r.el.scrollWidth + gap) / 2;
      r.x = r.dir > 0 ? -r.w : 0;
    });
    measure();
    addEventListener('resize', measure, { passive: true });
    let vis = false, hover = false, raf = 0, last = 0, boost = 0;
    const tick = (t) => {
      const dt = Math.min(0.05, (t - (last || t)) / 1000);
      last = t;
      const v = lenis ? Math.abs(lenis.velocity) : 0;
      boost += (Math.min(v * 7, 260) - boost) * 0.08;
      const speed = (hover ? 10 : 42) + boost;
      rows.forEach((r) => {
        r.x += r.dir * speed * dt;
        if (r.x <= -r.w) r.x += r.w;
        if (r.x > 0) r.x -= r.w;
        r.el.style.transform = `translate3d(${r.x.toFixed(2)}px,0,0)`;
      });
      if (vis) raf = requestAnimationFrame(tick);
    };
    new IntersectionObserver(([en]) => {
      vis = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (vis) { last = 0; raf = requestAnimationFrame(tick); }
    }).observe(mq);
    mq.addEventListener('mouseenter', () => (hover = true));
    mq.addEventListener('mouseleave', () => (hover = false));
  }

  /* ---------- Carousels (team): swipe, drag, buttons, autoplay, inner parallax ---------- */
  $$('[data-carousel]').forEach((car) => {
    const track = $('.car-track', car);
    const slides = [...track.children];
    const cur = $('.car-cur', car);
    const barEl = $('.car-bar', car);
    const [prev, next] = $$('.car-btn', car);
    if (!slides.length) return;
    let step = 1, offs = [], base = 0, half = 0, idx = -1, raf = 0, lastTouch = 0, visible = false;
    const imgs = slides.map((s) => $('img', s));
    const barI = $('i', barEl);
    const measure = () => {
      offs = slides.map((s) => s.offsetLeft + s.offsetWidth / 2);
      step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
      base = track.offsetLeft;
      half = track.clientWidth / 2;
      update();
    };
    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const lastIdx = () => Math.min(slides.length - 1, Math.round(maxScroll() / step));
    const update = () => {
      raf = 0;
      const sl = track.scrollLeft;
      const max = maxScroll();
      const i = clamp(Math.round(sl / step), 0, slides.length - 1);
      if (i !== idx) {
        idx = i;
        slides.forEach((s, j) => s.classList.toggle('active', j === i));
        cur.textContent = String(i + 1).padStart(2, '0');
      }
      const frac = max ? sl / max : 0;
      barI.style.transform = `scaleX(${(1 / slides.length + frac * (1 - 1 / slides.length)).toFixed(3)})`;
      prev.disabled = sl < 4;
      next.disabled = sl > max - 4;
      if (!reduce) {
        // each photo drifts against the scroll direction inside its frame
        imgs.forEach((im, j) => im && (im.style.transform = `translate3d(${(-((offs[j] - base - sl - half) / (half * 2)) * 36).toFixed(1)}px,0,0)`));
      }
    };
    track.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', measure, { passive: true });
    const go = (i) => track.scrollTo({ left: clamp(i, 0, lastIdx()) * step, behavior: reduce ? 'auto' : 'smooth' });
    const touched = () => (lastTouch = Date.now());
    prev.addEventListener('click', () => { touched(); go(idx - 1); });
    next.addEventListener('click', () => { touched(); go(idx + 1); });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); touched(); go(idx + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); touched(); go(idx - 1); }
    });
    track.addEventListener('wheel', touched, { passive: true });
    track.addEventListener('touchstart', touched, { passive: true });
    track.addEventListener('dragstart', (e) => e.preventDefault());

    // mouse drag
    let down = false, moved = false, startX = 0, startSL = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startSL = track.scrollLeft; touched();
    });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('dragging'); }
      if (moved) track.scrollLeft = startSL - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      const done = () => track.classList.remove('dragging');
      track.scrollTo({ left: clamp(Math.round(track.scrollLeft / step), 0, lastIdx()) * step, behavior: 'smooth' });
      'onscrollend' in window ? track.addEventListener('scrollend', done, { once: true }) : setTimeout(done, 700);
      setTimeout(() => (moved = false), 0);
    });
    track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

    // autoplay: only while visible, paused on hover / focus / recent interaction
    if (!reduce) {
      let hovering = false;
      car.addEventListener('mouseenter', () => (hovering = true));
      car.addEventListener('mouseleave', () => (hovering = false));
      new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.4 }).observe(car);
      setInterval(() => {
        if (!visible || hovering || d.hidden || car.contains(d.activeElement) || Date.now() - lastTouch < 7000) return;
        go(idx >= lastIdx() ? 0 : idx + 1);
      }, 3600);
    }
    measure();
    addEventListener('load', measure);
  });

  /* ---------- Work filters ---------- */
  const filterBar = $('.filters');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const b = e.target.closest('[data-filter]');
      if (!b) return;
      const f = b.dataset.filter;
      $$('[data-filter]', filterBar).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      let shown = 0;
      $$('.work-grid .work-tile').forEach((c) => {
        const on = f === 'all' || c.dataset.filter === f;
        c.classList.toggle('hide', !on);
        if (on) { shown++; c.classList.add('in'); }
      });
      const empty = $('.empty-state');
      if (empty) empty.hidden = shown > 0;
      hasGsap && ScrollTrigger.refresh();
    });
  }

  /* ---------- Portfolio lightbox: arrows, keys, swipe; plain image links without JS ---------- */
  const lb = $('.lightbox');
  const lbLinks = $$('[data-lightbox]');
  if (lb && lb.showModal && lbLinks.length) {
    const img = $('.lb-img', lb), name = $('.lb-name', lb), cat = $('.lb-cat', lb), count = $('.lb-count', lb), goLink = $('.lb-go', lb);
    let list = lbLinks, at = 0, opener = null;
    const show = (k) => {
      at = (k + list.length) % list.length;
      const a = list[at];
      img.src = a.dataset.src || a.getAttribute('href');
      if (goLink) { goLink.hidden = !a.dataset.href; if (a.dataset.href) goLink.href = a.dataset.href; }
      img.alt = a.dataset.title;
      name.textContent = a.dataset.title;
      cat.textContent = a.dataset.cat;
      count.textContent = `${at + 1} / ${list.length}`;
      img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
      const nx = list[(at + 1) % list.length];
      if (nx) new Image().src = nx.dataset.src || nx.getAttribute('href'); // preload the next one
    };
    lbLinks.forEach((a) => a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      opener = a;
      list = lbLinks.filter((x) => !x.closest('.hide'));
      show(list.indexOf(a));
      lb.showModal();
      lenis && lenis.stop();
    }));
    $('.lb-prev', lb).addEventListener('click', () => show(at - 1));
    $('.lb-next', lb).addEventListener('click', () => show(at + 1));
    $('.lb-close', lb).addEventListener('click', () => lb.close());
    lb.addEventListener('close', () => { lenis && lenis.start(); opener && opener.focus({ preventScroll: true }); });
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-stage')) lb.close(); });
    lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(at - 1); else if (e.key === 'ArrowRight') show(at + 1); });
    let sx = null;
    lb.addEventListener('pointerdown', (e) => { sx = e.clientX; });
    lb.addEventListener('pointerup', (e) => {
      if (sx !== null && e.pointerType !== 'mouse' && Math.abs(e.clientX - sx) > 50) show(at + (e.clientX < sx ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- Eight-services infographic: wires from the hub to every card, a slow tour, hover focus ---------- */
  $$('[data-infographic]').forEach((info) => {
    const svg = $('.info-wires', info);
    const hub = $('.info-hub', info);
    const cards = $$('.info-card', info);
    const faces = $$('.hub-face[data-face]', info);
    const homeFace = $('.hub-home', info);
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, cls, attrs = {}) => {
      const el = d.createElementNS(NS, tag);
      el.setAttribute('class', cls);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      svg.appendChild(el);
      return el;
    };
    const wires = cards.map(() => mk('path', 'wire'));
    const pulses = cards.map(() => mk('path', 'wire-pulse', { pathLength: 1 }));
    const ends = cards.map(() => mk('circle', 'wire-end', { r: 4.5 }));
    // layout position inside the infographic (offsets ignore the entrance transforms)
    const pos = (el) => { let x = 0, y = 0; while (el && el !== info) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return { x, y }; };
    const draw = () => {
      if (getComputedStyle(svg).display === 'none') return;
      svg.setAttribute('viewBox', `0 0 ${info.clientWidth} ${info.clientHeight}`);
      const h = pos(hub);
      const cx = h.x + hub.offsetWidth / 2, cy = h.y + hub.offsetHeight / 2, R = hub.offsetWidth * 0.41;
      cards.forEach((c, i) => {
        const o = pos(c);
        const left = c.classList.contains('l');
        const ax = left ? o.x + c.offsetWidth : o.x;
        const ay = o.y + c.offsetHeight / 2;
        const ex = ax + (left ? 26 : -26);
        const ang = Math.atan2(ay - cy, ex - cx);
        const sx = cx + R * Math.cos(ang), sy = cy + R * Math.sin(ang);
        const dd = `M${sx.toFixed(1)} ${sy.toFixed(1)} L${ex.toFixed(1)} ${ay.toFixed(1)} L${ax.toFixed(1)} ${ay.toFixed(1)}`;
        wires[i].setAttribute('d', dd);
        pulses[i].setAttribute('d', dd);
        ends[i].setAttribute('cx', ax.toFixed(1));
        ends[i].setAttribute('cy', ay.toFixed(1));
      });
    };
    let cur = -2, timer = 0, hovering = false, inview = false;
    const set = (i) => {
      if (i === cur) return;
      cur = i;
      cards.forEach((c, j) => c.classList.toggle('on', j === i));
      [wires, pulses, ends].forEach((g) => g.forEach((w, j) => w.classList.toggle('on', j === i)));
      faces.forEach((f, j) => f.classList.toggle('on', j === i));
      if (homeFace) homeFace.classList.toggle('on', i < 0);
    };
    const stop = () => { clearInterval(timer); timer = 0; };
    const play = () => {
      stop();
      if (!reduce && inview && !hovering) timer = setInterval(() => set(cur + 1 >= cards.length ? -1 : cur + 1), 2400);
    };
    cards.forEach((c, i) => {
      c.addEventListener('pointerenter', () => { hovering = true; stop(); set(i); });
      c.addEventListener('focusin', () => { hovering = true; stop(); set(i); });
    });
    info.addEventListener('pointerleave', () => { hovering = false; set(-1); play(); });
    info.addEventListener('focusout', (e) => { if (!info.contains(e.relatedTarget)) { hovering = false; set(-1); play(); } });
    set(-1);
    draw();
    if ('ResizeObserver' in window) {
      let raf = 0;
      new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }).observe(info);
    }
    if (d.fonts) d.fonts.ready.then(draw);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        inview = en.isIntersecting;
        info.classList.toggle('inview', inview);
        if (inview) info.classList.add('in');
        if (inview) play(); else stop();
      }, { threshold: 0.2 }).observe(info);
    } else info.classList.add('in', 'inview');
  });

  /* ---------- Blog: active table-of-contents link ---------- */
  const toc = $('.toc');
  if (toc && 'IntersectionObserver' in window) {
    const links = new Map($$('a', toc).map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { links.forEach((a) => a.classList.remove('on')); links.get(en.target.id)?.classList.add('on'); }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    $$('.prose h2[id]').forEach((h) => io.observe(h));
  }

  /* ---------- Map: load the iframe only when asked ---------- */
  /* ---------- Offices: live local time and open / closed status for each city ---------- */
  const tzEls = $$('[data-tz]');
  if (tzEls.length && window.Intl) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const tick = () => {
      const now = new Date();
      tzEls.forEach((el) => { el.textContent = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: el.dataset.tz }).format(now).toLowerCase(); });
      $$('[data-tz-open]').forEach((el) => {
        const parts = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23', timeZone: el.dataset.tzOpen }).formatToParts(now);
        const wd = days.indexOf(parts.find((x) => x.type === 'weekday').value);
        const h = +parts.find((x) => x.type === 'hour').value;
        const m = +parts.find((x) => x.type === 'minute').value;
        let open;
        if (el.dataset.periods) {
          // live hours from Google Maps: [openDay, openMinute, closeDay, closeMinute] in minutes of the week
          const week = 7 * 1440, t = wd * 1440 + h * 60 + m;
          open = JSON.parse(el.dataset.periods).some(([od, om, cd, cm]) => {
            if (cd === null) return true;
            const s = od * 1440 + om;
            let e = cd * 1440 + cm;
            if (e <= s) e += week;
            return (t >= s && t < e) || (t + week >= s && t + week < e);
          });
        } else {
          const [o, c] = el.dataset.hours.split('-').map(Number);
          open = el.dataset.days.split(',').map(Number).includes(wd) && h >= o && h < c;
        }
        el.textContent = open ? 'Open now' : 'Closed now';
        el.classList.toggle('is-open', open);
      });
    };
    tick();
    setInterval(tick, 30000);
    d.addEventListener('adsq:hours', tick);
  }

  /* ---------- Head office hours follow the Google Maps listing (api/hours.php) ---------- */
  const liveHours = $$('[data-hours-live]');
  if (liveHours.length && cfg.hours && !/\.github\.io$/.test(location.hostname)) {
    const getHours = () => fetch((cfg.base || '') + cfg.hours, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((h) => {
        if (!h || !h.ok) return;
        if (h.text) liveHours.forEach((el) => { el.textContent = h.text; });
        if (Array.isArray(h.periods) && h.periods.length) {
          $$('[data-tz-open]').forEach((el) => { el.dataset.periods = JSON.stringify(h.periods); });
          d.dispatchEvent(new Event('adsq:hours'));
        }
      })
      .catch(() => {});
    'requestIdleCallback' in window ? requestIdleCallback(getHours, { timeout: 2500 }) : setTimeout(getHours, 1200);
  }

  /* ---------- Forms: posted to /api/send.php (PHP on the hosting), WhatsApp hand-over on preview copies ---------- */
  const track = (name) => {
    window.dataLayer && window.dataLayer.push({ event: 'generate_lead', form_name: name });
    window.fbq && window.fbq('track', 'Lead', { content_name: name });
  };
  const opened = performance.now();
  $$('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.form-status', form);
      const name = form.dataset.form;
      let ok = true;
      $$('input, select, textarea', form).forEach((f) => {
        const field = f.closest('.field');
        const bad = !f.checkValidity() || (f.required && !f.value.trim()) || (f.type === 'tel' && f.value && f.value.replace(/\D/g, '').length < 10);
        field && field.classList.toggle('invalid', bad);
        f.setAttribute('aria-invalid', String(bad));
        if (bad && ok) { ok = false; f.focus(); }
      });
      const setStatus = (msg, cls) => { if (status) { status.innerHTML = msg; status.className = `form-status ${cls}`; } };
      if (!ok) return setStatus('Please fill in the highlighted fields.', 'err');

      const data = new FormData(form);
      data.set('form', name);
      data.set('page', location.pathname);
      data.set('_e', ((performance.now() - opened) / 1000).toFixed(1));
      const btn = $('button[type="submit"]', form);
      const endpoint = cfg.form && !/\.github\.io$/.test(location.hostname) ? (cfg.form.startsWith('/') ? (cfg.base || '') + cfg.form : cfg.form) : '';
      if (endpoint) {
        btn && (btn.disabled = true);
        setStatus('Sending...', '');
        let msg = '';
        try {
          const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          const out = await res.json().catch(() => ({}));
          if (!res.ok || out.ok === false) { msg = out.message || ''; throw new Error(res.status); }
          form.classList.add('sent');
          setStatus(out.message || 'Thank you! We will reply within one working day.', 'ok');
          track(name);
        } catch (err) {
          btn && (btn.disabled = false);
          const wa = `<a href="https://wa.me/${cfg.wa}" target="_blank" rel="noopener">message us on WhatsApp</a>`;
          setStatus(msg && !/WhatsApp/.test(msg) ? `${msg}` : `Something went wrong. Please ${wa}.`, 'err');
        }
        return;
      }
      // No endpoint configured yet: hand the details over to WhatsApp.
      const lines = [];
      data.forEach((v, k) => { if (v && !['form', 'page', '_form', '_e', 'fax'].includes(k)) lines.push(`${k[0].toUpperCase() + k.slice(1)}: ${v}`); });
      const title = { 'free-audit': 'Free audit request', 'home-audit': 'Free audit request', contact: 'New message' }[name] || 'Website enquiry';
      const text = `${title} (adsquidbd.com)\n\n${lines.join('\n')}`;
      window.open(`https://wa.me/${cfg.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setStatus('Opening WhatsApp with your details. Press send there and we will reply fast.', 'ok');
      track(name);
    });
    form.addEventListener('input', (e) => {
      const field = e.target.closest('.field');
      if (field && field.classList.contains('invalid') && e.target.checkValidity()) field.classList.remove('invalid');
    });
  });

  /* ---------- Analytics: loaded after the page "load" event ---------- */
  addEventListener('load', () => {
    const go = () => {
      const add = (src) => { const s = d.createElement('script'); s.async = true; s.src = src; d.head.append(s); };
      if (cfg.gtm) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        add(`https://www.googletagmanager.com/gtm.js?id=${cfg.gtm}`);
      }
      if (cfg.ga4) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', cfg.ga4);
        add(`https://www.googletagmanager.com/gtag/js?id=${cfg.ga4}`);
      }
      if (cfg.pixel) {
        const f = (window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); });
        f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
        window._fbq = f;
        add('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', cfg.pixel);
        fbq('track', 'PageView');
      }
    };
    'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 3000 }) : setTimeout(go, 1500);
  });
})();
