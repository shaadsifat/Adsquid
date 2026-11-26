// Offices page hero: a real 3D dotted globe (drawn by static/assets/js/globe.js on a canvas).
// The continents are ~6,400 evenly spread points on a sphere (Fibonacci lattice). Here, at build time, each
// point is tested against the land outlines of the world map, and the result ships as a tiny bit mask
// (about 1 KB), so the browser only has to rebuild the points and draw them.
import { esc } from '../lib.mjs';
import { LAND_POLYS } from './worldmap.mjs';

const N = 6400;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

// point-in-polygon (even-odd), polygons are [[lng, lat], ...]
const inside = (lng, lat, poly) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};

let mask = '';
function landMask() {
  if (mask) return mask;
  const bytes = new Uint8Array(Math.ceil(N / 8));
  for (let i = 0; i < N; i++) {
    const y = 1 - ((i + 0.5) * 2) / N;
    const lat = (Math.asin(y) * 180) / Math.PI;
    let lng = ((GOLDEN * i) % (2 * Math.PI)) * (180 / Math.PI);
    if (lng > 180) lng -= 360;
    let n = 0;
    for (const p of LAND_POLYS) if (inside(lng, lat, p)) n++;
    if (n % 2) bytes[i >> 3] |= 1 << (i & 7);
  }
  mask = Buffer.from(bytes).toString('base64');
  return mask;
}

export function globeArt(offices) {
  const data = {
    n: N,
    mask: landMask(),
    offices: offices.map((o) => {
      const g = o.head && o.geo ? o.geo : o.mapPos || o.geo;
      return { lat: g.lat, lng: g.lng, code: o.code, name: o.nation || o.country, city: o.city, head: !!o.head };
    }),
  };
  const label = `Globe with the Adsquid offices: ${offices.map((o) => `${o.nation || o.country} (${o.head ? 'head office, ' : ''}${o.city})`).join(', ')}`;
  return `<div class="art gx" role="img" aria-label="${esc(label)}" data-globe="${esc(JSON.stringify(data))}">
    <span class="gx-glow" aria-hidden="true"></span>
    <span class="gx-ball" aria-hidden="true"></span>
    <canvas class="gx-canvas" aria-hidden="true"></canvas>
    ${data.offices.map((o, i) => `<span class="gx-label${o.head ? ' head' : ''}" data-i="${i}" aria-hidden="true"><em>${esc(o.code)}</em>${esc(o.name)}</span>`).join('')}
    <div class="gx-chips" aria-hidden="true">${data.offices.map((o, i) => `<span class="gx-chip${o.head ? ' head' : ''}" data-i="${i}" title="${esc(o.name)}: ${o.head ? 'head office, ' : ''}${esc(o.city)}"><em>${esc(o.code)}</em>${esc(o.name)}</span>${o.head ? '<i class="gx-br"></i>' : ''}`).join('')}</div>
  </div>`;
}
