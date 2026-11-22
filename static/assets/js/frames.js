/* V1 hero frame player: draws frames/hero/0001-00NN.webp on a canvas by scroll progress.
   Desktop only, loaded after window "load", skipped for save-data / reduced motion (see home.js).
   - Draws "contain" anchored right-centre, exactly like the poster <img> (object-fit: contain), so the swap is seamless.
   - Blends the two nearest frames, so the push-in glides instead of stepping frame to frame.
   - Only the first `use` frames are loaded: the last part of the clip is a blurry extreme close-up. */
(() => {
  'use strict';
  const pad = (n) => String(n).padStart(4, '0');

  function create(canvas, { use = 88, posX = 1, src = (i) => `${(window.ADSQ && window.ADSQ.base) || ''}/assets/frames/hero/${pad(i)}.webp`, firstBatch = 8, onReady } = {}) {
    const ctx = canvas.getContext('2d', { alpha: false });
    const frames = new Array(use);
    let progress = 0, drawnKey = '', raf = 0, ready = false, dead = false, cw = 0, ch = 0;

    const decode = async (i) => {
      try {
        const res = await fetch(src(i + 1));
        const blob = await res.blob();
        frames[i] = 'createImageBitmap' in window
          ? await createImageBitmap(blob)
          : await new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no; im.src = URL.createObjectURL(blob); });
      } catch (e) { /* a missing frame falls back to its neighbour */ }
    };

    const size = () => {
      const r = canvas.getBoundingClientRect();
      // Frames are 1280 px wide: drawing above 1x adds cost, not detail.
      cw = canvas.width = Math.max(1, Math.round(r.width));
      ch = canvas.height = Math.max(1, Math.round(r.height));
      ctx.imageSmoothingQuality = 'high';
      drawnKey = '';
      schedule();
    };

    const nearest = (i) => {
      for (let k = 0; k < use; k++) {
        if (frames[i - k]) return frames[i - k];
        if (frames[i + k]) return frames[i + k];
      }
      return null;
    };

    const paint = (img, alpha) => {
      const s = Math.min(cw / img.width, ch / img.height);
      const dw = img.width * s, dh = img.height * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - dw) * posX, (ch - dh) / 2, dw, dh); // same as object-position: <posX> center
    };

    const draw = () => {
      raf = 0;
      const f = Math.min(use - 1, Math.max(0, progress * (use - 1)));
      const i = Math.floor(f);
      const t = f - i;
      const a = frames[i] || nearest(i);
      if (!a) return;
      const b = t > 0.02 && frames[i + 1];
      const key = `${i}|${b ? t.toFixed(2) : 0}|${cw}`;
      if (key === drawnKey) return;
      drawnKey = key;
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#07050D'; // page background where the frame does not reach
      ctx.fillRect(0, 0, cw, ch);
      paint(a, 1);
      if (b) paint(b, t);
      ctx.globalAlpha = 1;
    };
    const schedule = () => { if (!raf && !dead) raf = requestAnimationFrame(draw); };

    (async () => {
      const order = [...Array(use).keys()];
      await Promise.all(order.slice(0, firstBatch).map(decode));
      if (dead) return;
      ready = true;
      size();
      onReady && onReady();
      const rest = order.slice(firstBatch);
      const worker = async () => { while (rest.length && !dead) { await decode(rest.shift()); drawnKey = ''; schedule(); } };
      await Promise.all([worker(), worker(), worker(), worker()]);
    })();

    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => ready && size(), 120); }, { passive: true });

    return {
      setProgress(p) { if (p === progress) return; progress = p; if (ready) schedule(); },
      get ready() { return ready; },
      destroy() { dead = true; },
    };
  }

  window.AdsqFrames = { create };
})();
