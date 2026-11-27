/* Offices page hero: a 3D dotted globe with the Adsquid offices.
   The land points come from a bit mask built by src/pages/globe.mjs. The globe turns slowly (like the Earth,
   west to east), can be dragged, and the country chips turn it to an office. Light runs along curved paths
   from the head office to every other office. It only draws while on screen; with reduced motion it is still. */
(() => {
  const box = document.querySelector('.gx[data-globe]');
  const canvas = box && box.querySelector('.gx-canvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const data = JSON.parse(box.dataset.globe);
  const root = document.documentElement;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches && !root.classList.contains('force-motion');
  const D2R = Math.PI / 180;
  const TAU = Math.PI * 2;
  const GOLDEN = Math.PI * (3 - Math.sqrt(5));
  const CX = 0.5, CY = 0.43, RR = 0.39; // globe centre and radius as parts of the box: keep in step with .gx-ball

  // Land points (unit vectors) rebuilt from the mask
  const bin = atob(data.mask);
  const land = [];
  for (let i = 0; i < data.n; i++) {
    if (!(bin.charCodeAt(i >> 3) & (1 << (i & 7)))) continue;
    const y = 1 - ((i + 0.5) * 2) / data.n;
    const r = Math.sqrt(1 - y * y);
    land.push(r * Math.cos(GOLDEN * i), y, r * Math.sin(GOLDEN * i));
  }
  const pts = new Float32Array(land);
  const vec = (lat, lng) => [Math.cos(lat * D2R) * Math.cos(lng * D2R), Math.sin(lat * D2R), Math.cos(lat * D2R) * Math.sin(lng * D2R)];
  const offices = data.offices.map((o, i) => ({
    ...o,
    v: vec(o.lat, o.lng),
    label: box.querySelector(`.gx-label[data-i="${i}"]`),
    chip: box.querySelector(`.gx-chip[data-i="${i}"]`),
    sx: 0, sy: 0, z: -1,
  }));
  const head = offices.find((o) => o.head) || offices[0];

  // Flight paths: great circles from the head office, lifted above the surface (higher for longer trips)
  const SEG = 64;
  const arcs = offices.filter((o) => o !== head).map((o, k) => {
    const a = head.v, b = o.v;
    const om = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
    const so = Math.sin(om) || 1;
    const lift = 0.05 + 0.2 * (om / Math.PI);
    const p = new Float32Array((SEG + 1) * 3);
    for (let s = 0; s <= SEG; s++) {
      const t = s / SEG, f1 = Math.sin((1 - t) * om) / so, f2 = Math.sin(t * om) / so, h = 1 + lift * Math.sin(Math.PI * t);
      p[s * 3] = (f1 * a[0] + f2 * b[0]) * h;
      p[s * 3 + 1] = (f1 * a[1] + f2 * b[1]) * h;
      p[s * 3 + 2] = (f1 * a[2] + f2 * b[2]) * h;
    }
    return { p, offset: k * 0.23, sx: new Float32Array(SEG + 1), sy: new Float32Array(SEG + 1), dz: new Float32Array(SEG + 1) };
  });

  // View: the longitude/latitude at the centre of the globe
  let lon0 = head.lng + 28, lat0 = 16;
  let W = 0, H = 0, dpr = 1, R = 0, cx = 0, cy = 0, born = 0;
  let cl = 1, sl = 0, cp = 1, sp = 0;
  const setView = () => { cl = Math.cos(lon0 * D2R); sl = Math.sin(lon0 * D2R); cp = Math.cos(lat0 * D2R); sp = Math.sin(lat0 * D2R); };

  const FILLS = ['rgba(214,180,255,.07)', 'rgba(214,180,255,.3)', 'rgba(222,196,255,.55)', 'rgba(240,228,255,.9)'];
  const draw = (now) => {
    if (!W) return;
    setView();
    ctx.clearRect(0, 0, W, H);

    // land dots: faint on the far side, brighter and a little bigger toward the middle
    const paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    const r0 = 0.95 * dpr;
    for (let i = 0; i < pts.length; i += 3) {
      const x = pts[i], y = pts[i + 1], z = pts[i + 2];
      const X = z * cl - x * sl, Z = x * cl + z * sl;
      const Y = y * cp - Z * sp, Z2 = y * sp + Z * cp;
      const sx = cx + R * X, sy = cy - R * Y;
      const b = Z2 < 0 ? 0 : Z2 < 0.35 ? 1 : Z2 < 0.7 ? 2 : 3;
      const rad = b === 0 ? r0 * 0.75 : r0 * (0.85 + 0.55 * Z2);
      paths[b].moveTo(sx + rad, sy);
      paths[b].arc(sx, sy, rad, 0, TAU);
    }
    for (let b = 0; b < 4; b++) { ctx.fillStyle = FILLS[b]; ctx.fill(paths[b]); }

    // flight paths: drawn in once, then a bright light travels each one
    const t = now / 1000;
    const grow = still ? 1 : Math.min(1, (now - born) / 1600);
    // (kept inside the outline of the globe, and faded toward its edge so nothing pokes out)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.02, 0, TAU);
    ctx.clip();
    ctx.lineCap = 'round';
    const fade = (z) => Math.max(0, Math.min(1, (z - 0.02) * 3.5));
    for (const a of arcs) {
      for (let s = 0; s <= SEG; s++) {
        const x = a.p[s * 3], y = a.p[s * 3 + 1], z = a.p[s * 3 + 2];
        const X = z * cl - x * sl, Z = x * cl + z * sl;
        const Y = y * cp - Z * sp, Z2 = y * sp + Z * cp;
        a.sx[s] = cx + R * X;
        a.sy[s] = cy - R * Y;
        a.dz[s] = fade(Z2);
      }
      const end = Math.round(SEG * grow);
      ctx.lineWidth = 1.1 * dpr;
      for (let s = 1; s <= end; s++) {
        const f = Math.min(a.dz[s], a.dz[s - 1]);
        if (f <= 0) continue;
        ctx.beginPath();
        ctx.moveTo(a.sx[s - 1], a.sy[s - 1]);
        ctx.lineTo(a.sx[s], a.sy[s]);
        ctx.strokeStyle = `rgba(214,180,255,${(0.4 * f).toFixed(2)})`;
        ctx.stroke();
      }
      if (still || grow < 1) continue;
      const u = (t / 3.4 + a.offset) % 1;
      const hi = Math.floor(u * SEG), lo = Math.max(1, hi - 11);
      for (let s = lo; s <= hi; s++) {
        const f = Math.min(a.dz[s], a.dz[s - 1]);
        if (f <= 0) continue;
        const k = (s - lo + 1) / (hi - lo + 1);
        ctx.beginPath();
        ctx.moveTo(a.sx[s - 1], a.sy[s - 1]);
        ctx.lineTo(a.sx[s], a.sy[s]);
        ctx.strokeStyle = `rgba(255,255,255,${(k * 0.95 * f).toFixed(2)})`;
        ctx.lineWidth = (1 + k * 1.4) * dpr;
        ctx.stroke();
      }
    }
    ctx.restore();

    // offices: pin with a soft glow and a slow ripple; the label follows the pin and fades near the edge
    let best = null;
    for (const o of offices) {
      const [x, y, z] = o.v;
      const X = z * cl - x * sl, Z = x * cl + z * sl;
      const Y = y * cp - Z * sp, Z2 = y * sp + Z * cp;
      o.sx = cx + R * X;
      o.sy = cy - R * Y;
      o.z = Z2;
      if (!best || Z2 > best.z) best = o;
      if (Z2 > 0) {
        const k = (o.head ? 1.3 : 1) * dpr;
        if (!still) {
          const ph = (t * 0.55 + (o.lng + 180) / 160) % 1;
          ctx.beginPath();
          ctx.arc(o.sx, o.sy, (4 + ph * 13) * k, 0, TAU);
          ctx.strokeStyle = `rgba(214,180,255,${((1 - ph) * 0.65 * Z2).toFixed(2)})`;
          ctx.lineWidth = 1.2 * dpr;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(o.sx, o.sy, 7 * k, 0, TAU);
        ctx.fillStyle = `rgba(168,85,247,${(0.38 * Z2).toFixed(2)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(o.sx, o.sy, 3.2 * k, 0, TAU);
        ctx.fillStyle = o.head ? '#ffffff' : '#DDB8FF';
        ctx.fill();
      }
      if (o.label) {
        o.label.style.opacity = Math.max(0, Math.min(1, (Z2 - 0.1) / 0.2)).toFixed(2);
        o.label.style.transform = `translate3d(${(o.sx / dpr).toFixed(1)}px,${(o.sy / dpr).toFixed(1)}px,0)`;
      }
    }
    placeLabels();
    offices.forEach((o) => o.chip && o.chip.classList.toggle('on', o === best));
  };

  // Labels never cover a flight path or another pin: keep the current side while it is free,
  // otherwise slide to the first free side (below, right, left, above).
  const SIDES = {
    b: (w, h) => [-w / 2, 11, '-50% 11px'],
    r: (w, h) => [11, -h / 2, '11px -50%'],
    l: (w, h) => [-11 - w, -h / 2, 'calc(-100% - 11px) -50%'],
    a: (w, h) => [-w / 2, -11 - h, '-50% calc(-100% - 11px)'],
  };
  const ORDER = ['b', 'r', 'l', 'a'];
  const measure = () => offices.forEach((o) => { if (o.label) { o.w = o.label.offsetWidth; o.h = o.label.offsetHeight; } });
  const blocked = (o, side) => {
    const x = o.sx / dpr, y = o.sy / dpr;
    const [dx, dy] = SIDES[side](o.w, o.h);
    const x0 = x + dx - 3, y0 = y + dy - 3, x1 = x + dx + o.w + 3, y1 = y + dy + o.h + 3;
    for (const a of arcs) {
      for (let s = 0; s <= SEG; s++) {
        if (a.dz[s] <= 0.05) continue;
        const px = a.sx[s] / dpr, py = a.sy[s] / dpr;
        if (px > x0 && px < x1 && py > y0 && py < y1) return true;
      }
    }
    for (const q of offices) {
      if (q === o || q.z <= 0) continue;
      const px = q.sx / dpr, py = q.sy / dpr;
      if (px > x0 - 6 && px < x1 + 6 && py > y0 - 6 && py < y1 + 6) return true;
      if (q.side && q.z > 0.1 && q.w) { // another visible label
        const [qx, qy] = SIDES[q.side](q.w, q.h);
        const a0 = px + qx, b0 = py + qy;
        if (x0 < a0 + q.w && x1 > a0 && y0 < b0 + q.h && y1 > b0) return true;
      }
    }
    return false;
  };
  const placeLabels = () => {
    for (const o of offices) {
      if (!o.label || o.z <= 0.1) continue;
      if (!o.w) measure();
      if (o.side && !blocked(o, o.side)) continue;
      const side = ORDER.find((s) => !blocked(o, s)) || o.side || 'b';
      if (side !== o.side) { o.side = side; o.label.style.translate = SIDES[side](o.w, o.h)[2]; }
    }
  };
  if (document.fonts) document.fonts.ready.then(measure);

  // Size: follow the box (the canvas is drawn at up to 2x for sharp dots)
  const resize = () => {
    const r = box.getBoundingClientRect();
    if (!r.width) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = canvas.width = Math.round(r.width * dpr);
    H = canvas.height = Math.round(r.height * dpr);
    R = RR * r.width * dpr;
    cx = CX * r.width * dpr;
    cy = CY * r.width * dpr; // from the width: on phones the box is taller, with the chips below the globe
    draw(performance.now());
  };
  new ResizeObserver(resize).observe(box);

  // Motion: slow turn, drag with inertia, chips glide to an office
  let raf = 0, last = 0, visible = false, dragging = false, vel = 0, idleUntil = 0, tween = null, px = 0, py = 0, pt = 0;
  const SPEED = -5; // degrees per second
  const shortest = (d) => ((((d + 180) % 360) + 360) % 360) - 180;
  const loop = (now) => {
    const dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    if (tween) {
      const k = Math.min(1, (now - tween.start) / tween.dur), e = 1 - Math.pow(1 - k, 3);
      lon0 = tween.lon + tween.dl * e;
      lat0 = tween.lat + (tween.lat1 - tween.lat) * e;
      if (k >= 1) tween = null;
    } else if (!dragging) {
      if (Math.abs(vel) > 0.5) { lon0 += vel * dt; vel *= Math.pow(0.05, dt); }
      else if (now > idleUntil) lon0 += SPEED * dt;
      if (now > idleUntil) lat0 += (16 - lat0) * Math.min(1, dt * 0.6);
    }
    draw(now);
    raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
  };
  const start = () => { if (!raf && !still && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(loop); } };

  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !born) born = performance.now(); start(); }).observe(box);
  document.addEventListener('visibilitychange', start);

  const goTo = (o) => {
    const lat1 = Math.max(-35, Math.min(45, o.lat * 0.7));
    if (still) { lon0 = o.lng; lat0 = lat1; draw(performance.now()); return; }
    tween = { start: performance.now(), dur: 1200, lon: lon0, dl: shortest(o.lng - lon0), lat: lat0, lat1 };
    idleUntil = performance.now() + 5000;
    vel = 0;
    start();
  };
  offices.forEach((o) => o.chip && o.chip.addEventListener('click', () => goTo(o)));

  canvas.addEventListener('pointerdown', (e) => {
    dragging = true; tween = null; vel = 0;
    px = e.clientX; py = e.clientY; pt = performance.now();
    canvas.setPointerCapture(e.pointerId);
    box.classList.add('grab');
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const perPx = 57.3 / (R / dpr || 1); // one globe radius of drag turns it about one radian
    const dx = e.clientX - px, dy = e.clientY - py;
    px = e.clientX; py = e.clientY;
    lon0 -= dx * perPx;
    if (e.pointerType === 'mouse') lat0 = Math.max(-50, Math.min(60, lat0 + dy * perPx));
    vel = (-dx * perPx) / Math.max(0.008, (now - pt) / 1000);
    pt = now;
    if (still) draw(now);
  });
  const release = () => {
    if (!dragging) return;
    dragging = false;
    box.classList.remove('grab');
    if (performance.now() - pt > 80) vel = 0;
    idleUntil = performance.now() + 2500;
    start();
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
})();
