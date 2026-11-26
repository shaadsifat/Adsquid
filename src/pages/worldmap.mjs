// A stylised dotted world map (equirectangular, drawn in code: no map service, no tracking).
// Land is a dot pattern clipped to simplified continent outlines; continents with an office light up,
// each office gets a pin and an animated flight path joins them. Used on /offices/.
import { esc } from '../lib.mjs';

const X = (lon) => ((lon + 180) / 360) * 1000;
const Y = (lat) => ((90 - lat) / 180) * 500;
const path = (pts) => 'M' + pts.map(([lo, la]) => `${X(lo).toFixed(1)} ${Y(la).toFixed(1)}`).join('L') + 'Z';

const NA = [[-168, 65.5], [-162, 70], [-150, 71], [-140, 69.5], [-128, 70], [-115, 68], [-95, 72], [-85, 70], [-80, 64], [-75, 62], [-65, 60], [-60, 55], [-56, 52], [-60, 47], [-66, 44], [-70, 42], [-74, 40], [-76, 37], [-75.5, 35], [-78, 33], [-81, 31], [-80, 27], [-80.5, 25.2], [-82, 27], [-83, 29.5], [-86, 30.3], [-89, 30], [-90, 29], [-94, 29.5], [-97, 27.5], [-97.5, 24], [-97, 21], [-94, 18.5], [-91, 18.5], [-90.5, 21], [-87, 21.5], [-88, 18], [-88, 15.8], [-84, 15.8], [-83.5, 11], [-82, 9], [-79.5, 9.3], [-77.5, 8.5], [-79, 8], [-81, 7.5], [-83.5, 8.5], [-86, 11], [-88, 13.3], [-92, 14.5], [-95, 16], [-97, 15.8], [-100, 17], [-105, 19.5], [-106, 22.5], [-110, 23.2], [-112, 26], [-114, 29], [-117, 32.5], [-120.5, 34.5], [-122.5, 37.5], [-124, 40.5], [-124.5, 43], [-124, 47], [-125, 49], [-128, 51], [-131, 54], [-134, 57], [-137, 58.5], [-140, 60], [-146, 61], [-150, 59.5], [-154, 57.5], [-158, 56], [-162, 55], [-164, 54.5], [-160, 57.5], [-158, 58.8], [-162, 60], [-165, 62], [-166, 64.5]];
const HUDSON = [[-95, 58], [-88, 56], [-80, 55], [-78, 60], [-82, 63], [-90, 64], [-94, 61]];
const GREENLAND = [[-73, 78], [-60, 82], [-30, 83.5], [-20, 81], [-18, 76], [-22, 70], [-30, 68], [-40, 65], [-43, 60], [-48, 61], [-52, 65], [-55, 70], [-58, 75], [-66, 76.5]];
const CUBA = [[-85, 21.9], [-82, 23.2], [-80, 23.1], [-77.5, 21.8], [-74.2, 20.2], [-77.7, 19.9], [-80, 21.7], [-84, 21.5]];
const HISPANIOLA = [[-74.5, 18.3], [-72.8, 19.9], [-70, 19.7], [-68.4, 18.5], [-71.4, 17.6], [-74.4, 18.1]];
const SA = [[-77.5, 8.5], [-75, 10.8], [-72, 12], [-68, 10.6], [-63, 10.7], [-60, 8.5], [-57, 6], [-52, 4.5], [-50, 1.5], [-50, -0.5], [-44, -2.5], [-40, -3], [-35, -5.5], [-35, -9], [-37, -12], [-39, -17], [-40, -21], [-43, -23], [-46, -24], [-48.5, -27], [-48.5, -29], [-51, -31.5], [-53, -34], [-57, -35], [-57, -38], [-62, -39], [-63, -41], [-65, -43], [-67, -46], [-66, -48], [-69, -51], [-68.5, -53], [-71, -54], [-74, -52], [-75, -48], [-74, -44], [-73.5, -40], [-73.5, -37], [-72, -33], [-71.5, -30], [-71, -25], [-70.5, -21], [-70.3, -18], [-72, -16.5], [-75, -15], [-76.5, -13], [-78, -10], [-79.5, -7], [-81, -5], [-80, -3], [-80.5, -1], [-80, 1], [-79, 2], [-78, 4], [-77.3, 6.5]];
const AFRICA = [[-17, 21], [-17, 14.7], [-16.5, 12.5], [-15, 11], [-13.5, 9.5], [-12, 7.5], [-8, 4.5], [-4, 5.2], [0, 5.5], [2, 6.2], [5, 5.5], [6, 4.3], [8.5, 4.5], [9.5, 3], [9.5, 1], [9, -1], [11.5, -3], [12, -6], [13, -9], [13.5, -12], [12.5, -16], [11.8, -17.5], [14, -22], [15, -27], [17, -30], [18.3, -33.5], [19.5, -34.8], [22, -34], [25, -34], [27, -33.5], [30, -31], [32.5, -28.5], [33, -25.5], [35.5, -24], [35, -20], [37, -17.5], [40.5, -15], [40.5, -10.5], [39.5, -7], [39, -4.5], [41, -1.5], [43, 0.5], [46, 2.5], [49, 6], [51, 10.5], [51.2, 12], [48, 11.2], [44, 10.5], [43.2, 11.8], [42, 15], [40, 16], [39, 17.5], [37.5, 19], [37, 21], [35.5, 23.5], [35, 25.5], [33.5, 28], [32.5, 29.8], [32.3, 31.2], [30, 31.4], [28, 31], [25, 31.6], [22, 32.8], [20, 31], [18, 30.5], [15.5, 31.5], [13, 32.8], [11, 33.2], [10, 35], [11, 36.8], [9.5, 37.3], [7, 37], [3, 36.8], [-1, 35.2], [-5.5, 35.8], [-6, 35], [-8, 33], [-9.5, 31.5], [-10, 29.5], [-13, 27.7], [-14.5, 26], [-16, 24], [-16.5, 22.5]];
const MADAGASCAR = [[44, -25], [43.5, -22], [44, -17], [46.5, -15.5], [49.5, -12], [50.4, -15.5], [49.5, -18], [47.5, -24.5], [45.5, -25.5]];
const EURASIA = [[-9, 37], [-9.5, 39], [-9, 42.5], [-8, 43.7], [-2, 43.4], [-1.5, 46], [-2.5, 47.5], [-4.5, 48.5], [-1.5, 49.6], [1.5, 50.5], [3, 51.2], [4.5, 52.5], [5, 53.4], [8.5, 53.8], [8.5, 55.5], [8.2, 57], [10.5, 57.7], [10.5, 56], [12.5, 55.6], [12.5, 54.5], [14, 54], [18, 54.8], [21, 55.2], [21, 57], [23.5, 59], [28, 59.5], [29, 60.2], [25, 60.3], [22, 60.5], [21.5, 63], [25, 65], [24, 66], [21, 64.5], [18, 62.5], [17.5, 61], [19, 60], [18.5, 58.5], [16.5, 56.2], [14.5, 56], [12.5, 56.4], [11, 58.5], [10.7, 59.5], [8, 58.2], [5.5, 58.8], [5, 61.5], [6.5, 62.8], [11, 64.8], [14, 67.5], [16, 68.5], [19, 69.8], [25, 71], [28, 71], [32, 69.8], [33, 69.3], [40, 67.8], [41, 66.5], [36, 66.7], [35, 64.5], [37.5, 64.2], [40.5, 64.6], [44, 66], [44, 68.4], [46, 68.3], [53, 68.8], [55, 68.5], [60, 69], [65, 69.5], [68, 70.5], [67, 72.5], [70, 73.5], [72, 72.8], [73, 71.5], [75, 72.8], [80, 72.4], [83, 70.5], [87, 74], [100, 77], [105, 77.7], [112, 76.5], [113, 73.5], [120, 73], [128, 72.8], [131, 71], [140, 72.5], [150, 71.5], [160, 70], [170, 70], [180, 68.8], [180, 65], [175, 63], [170, 60], [163, 59.5], [163, 56], [160, 53], [156, 51], [156, 57], [154, 59.3], [148, 59.4], [141, 59], [137, 54.5], [141, 53], [141, 49], [140, 46], [138, 43], [132, 43], [129, 40.5], [129.5, 35], [126.5, 34.5], [126, 37], [125, 39.5], [121.5, 40], [121, 38.8], [118, 38.5], [118, 37.3], [121, 37], [122, 35], [120.5, 34], [121.8, 31], [122, 29.8], [121, 28], [119.5, 26], [117.5, 24], [114, 22.3], [110.5, 21], [108, 21.5], [106.5, 20], [105.6, 18.5], [107, 17], [108.8, 15.3], [109.3, 12], [107.5, 10.5], [106, 9], [104.8, 8.6], [105, 10.4], [103, 11], [101, 12.6], [100, 13.5], [99.5, 10.5], [100.5, 7.5], [101.5, 6.5], [103.4, 4], [104.2, 1.3], [103.5, 1.2], [101, 2.8], [100.3, 5.5], [98.3, 8], [98.5, 10], [98.7, 13.5], [97.7, 16.5], [95.5, 15.8], [94.3, 16.2], [94.5, 18.8], [93, 20], [92.3, 21.4], [91.8, 22.6], [90.5, 22.4], [89, 21.8], [87, 21.5], [86.5, 20], [85, 19.3], [82.3, 16.6], [80.2, 15.5], [80, 13], [79.8, 10.3], [77.5, 8], [76.3, 9.5], [74.8, 12.8], [73.4, 16], [72.8, 19], [72.5, 21.4], [70.5, 20.8], [68.8, 22.3], [68.5, 23.8], [66.5, 25.4], [64.5, 25.2], [61.5, 25.2], [58, 25.6], [56.4, 26.7], [54.6, 26.3], [51.6, 27.8], [50.2, 30.1], [48.2, 29.8], [47.7, 28.5], [49, 27], [50.2, 26.2], [51.6, 25], [51.5, 24.2], [54, 24.1], [56.2, 26], [56.5, 24.5], [58.7, 23.5], [59.8, 22.3], [58.5, 20.5], [57.7, 18.9], [55.3, 17.6], [52.2, 15.9], [49.5, 14.8], [45, 12.9], [43.5, 12.7], [42.8, 14.8], [42.7, 16.5], [41.2, 18.6], [39.2, 21.4], [38.4, 23.7], [37.3, 25.4], [35.6, 27.9], [34.6, 28.1], [34.2, 31.3], [34.9, 32.9], [35.9, 35.5], [36.2, 36.6], [35, 36.8], [32.5, 36.1], [30.5, 36.5], [28, 36.7], [27.2, 38], [26.3, 39.5], [26, 40.6], [24, 40.8], [22.7, 38.5], [21.5, 37], [20.2, 39.5], [19.3, 41.8], [16, 43.5], [13.7, 45.2], [12.3, 45.3], [12.6, 44], [14, 42], [16, 41.2], [18, 40.3], [16.5, 38.5], [15.7, 38], [16.1, 39.5], [15.4, 40.2], [12.5, 41.8], [10.5, 43], [8.8, 44.4], [6.8, 43.2], [4, 43.5], [3.2, 42], [0.9, 41], [-0.3, 39.4], [0.2, 38.7], [-0.7, 37.6], [-2.2, 36.7], [-4.4, 36.7], [-5.6, 36], [-6.3, 36.9], [-7.4, 37.2]];
const CASPIAN = [[47, 45], [50, 46.5], [53, 45], [53.5, 40], [52.8, 37], [50, 37.4], [49, 38.5], [49.5, 40.5], [47.5, 42.5]];
const BLACKSEA = [[28, 41.5], [28, 44], [30.5, 46.5], [33, 46], [36, 45.3], [38, 47], [40, 46], [41.5, 41.5], [38, 41], [35, 42], [31, 41.2]];
const GB = [[-5.7, 50], [1.5, 51], [1.7, 52.8], [0, 53.5], [-0.5, 54.5], [-1.6, 55.6], [-2, 57.6], [-3, 58.6], [-5, 58.6], [-6.2, 57], [-5.6, 55.4], [-4.8, 54.7], [-3.4, 54.4], [-3.1, 53.3], [-4.7, 52.8], [-5.3, 51.8], [-3.1, 51.2], [-5.7, 50.1]];
const IRELAND = [[-10, 51.6], [-6, 52.2], [-6, 54], [-7.6, 55.2], [-10, 54.2]];
const ICELAND = [[-24, 64.5], [-22, 66.4], [-16, 66.5], [-13.5, 65], [-18.7, 63.4]];
const JAPAN = [[130, 31.3], [131.6, 33.6], [133.5, 34], [135, 33.6], [137, 34.6], [140, 35], [140.9, 37], [141.8, 39.5], [141.4, 41.4], [141.2, 41.8], [145.5, 43.3], [144.5, 44], [141.7, 45.4], [140.3, 43.3], [139.8, 40.5], [139.5, 38], [136.5, 37], [133, 35.5], [130.8, 34.3]];
const SRILANKA = [[79.8, 6], [81.8, 7.5], [80.2, 9.8], [79.7, 8.2]];
const LUZON = [[120, 18.5], [122.2, 18.5], [122, 14], [124, 13.8], [123, 12.5], [120.6, 14.5]];
const MINDANAO = [[122, 8], [126, 7], [126.5, 9.4], [124, 9]];
const SUMATRA = [[95.3, 5.6], [97.5, 5.2], [100.4, 2], [104, -1], [106, -3], [106, -6], [102.3, -4], [100.3, -1], [98, 1.8]];
const JAVA = [[105.2, -6.8], [108, -6.3], [111, -6.4], [114.5, -7.7], [108.3, -7.8], [105.4, -6.9]];
const BORNEO = [[108.9, 1.6], [111, 2.4], [113, 3.2], [115.5, 5.5], [117.3, 7], [119, 5.3], [117.6, 4], [118.5, 1], [116.5, -1.8], [116.2, -4], [114.5, -3.6], [111.6, -3.5], [110.2, -2.9], [109, -0.5]];
const SULAWESI = [[120, 0.9], [124.9, 1.6], [121, -1], [122.5, -4.6], [120.4, -5.5], [119.4, -3.4], [118.8, -1.5]];
const NEWGUINEA = [[131, -1], [134, -0.9], [141, -2.6], [145.6, -5], [147.5, -6.2], [150.7, -10.6], [147, -10.1], [141, -9.1], [137.9, -8.4], [138.6, -6.7], [133.7, -3.8], [132, -2.8]];
const AUSTRALIA = [[113.6, -22], [114.2, -26.3], [115, -30.5], [115.7, -33.6], [118, -35], [122.2, -34], [124, -33], [126, -32.3], [129, -31.6], [131.2, -31.5], [134.2, -32.8], [135.6, -34.8], [137.8, -32.8], [137.5, -35.6], [139.6, -37.3], [141, -38.1], [144, -38.3], [146.3, -39], [147.9, -37.9], [150, -37.4], [151.3, -34], [153.1, -30.5], [153.5, -28.2], [153, -25.4], [150.8, -22.7], [149, -20.5], [146.3, -19], [145.3, -15.3], [143.5, -14], [142.5, -10.7], [141.6, -12.8], [141.5, -15.4], [140.6, -17.6], [139.2, -17.4], [135.9, -15.2], [135.5, -14.5], [136.8, -12.2], [134.2, -12], [132.6, -11.5], [130.1, -12.8], [129.4, -15], [127.4, -14.2], [125.1, -14.7], [123.6, -16.8], [122.2, -18.3], [121, -19.6], [118.9, -20.3], [117, -20.6], [114.6, -21.8]];
const TASMANIA = [[144.6, -40.7], [148.3, -40.9], [148, -43.2], [146.6, -43.6], [145.2, -42.2]];
const NZ_N = [[172.7, -34.4], [174.6, -36.1], [176, -37.6], [178.5, -37.7], [177.9, -39.2], [176.9, -39.4], [175.2, -41.6], [174.6, -41.3], [175, -39.9], [173.8, -39.2], [174.6, -37.3]];
const NZ_S = [[172.8, -40.5], [174.3, -41.7], [173.2, -43], [171.2, -44.5], [170.6, -45.9], [169.3, -46.6], [166.5, -46.2], [166.7, -45.1], [168.4, -44.1], [170.6, -42.8], [171.6, -41.7]];

// Regions an office can light up.
const REGIONS = {
  'north-america': { name: 'North America', d: [NA, HUDSON, GREENLAND, CUBA, HISPANIOLA].map(path).join(''), from: -180, to: -20 },
  asia: { name: 'Asia', d: [EURASIA, CASPIAN, BLACKSEA, JAPAN, SRILANKA, LUZON, MINDANAO, SUMATRA, JAVA, BORNEO, SULAWESI].map(path).join(''), from: 42, to: 180 },
  oceania: { name: 'Oceania', d: [AUSTRALIA, TASMANIA, NZ_N, NZ_S, NEWGUINEA].map(path).join(''), from: 110, to: 180 },
};
// The same outlines also feed the 3D globe on /offices/ (src/pages/globe.mjs). Overlaps (Caspian, Black Sea,
// Hudson Bay) are holes: a point is land when it falls inside an odd number of outlines.
export const LAND_POLYS = [NA, HUDSON, GREENLAND, CUBA, HISPANIOLA, SA, AFRICA, MADAGASCAR, EURASIA, CASPIAN, BLACKSEA, GB, IRELAND, ICELAND, JAPAN, SRILANKA, LUZON, MINDANAO, SUMATRA, JAVA, BORNEO, SULAWESI, NEWGUINEA, AUSTRALIA, TASMANIA, NZ_N, NZ_S];
const LAND = LAND_POLYS.map(path).join('');

// view: latitudes 76N to 56S
const VB = { x: 0, y: Y(76), w: 1000, h: Y(-56) - Y(76) };
const pct = (lon, lat) => [((X(lon) - VB.x) / VB.w) * 100, ((Y(lat) - VB.y) / VB.h) * 100];

// Label placement: each label tries eight spots around its pin and takes the first one that touches no flight
// path, no other pin, no other label and stays inside the map. Done for the desktop labels (code + country) and
// for the small phone labels (code only), at the map sizes where they are the largest relative to the map.
const POSITIONS = ['b', 'r', 'bl', 'br', 'l', 'a', 'al', 'ar'];
function rectAt(x, y, w, h, g, pos) {
  const d = g * 0.6;
  switch (pos) {
    case 'b': return [x - w / 2, y + g, x + w / 2, y + g + h];
    case 'a': return [x - w / 2, y - g - h, x + w / 2, y - g];
    case 'r': return [x + g, y - h / 2, x + g + w, y + h / 2];
    case 'l': return [x - g - w, y - h / 2, x - g, y + h / 2];
    case 'bl': return [x - d - w, y + d, x - d, y + d + h];
    case 'br': return [x + d, y + d, x + d + w, y + d + h];
    case 'al': return [x - d - w, y - d - h, x - d, y - d];
    default: return [x + d, y - d - h, x + d + w, y - d]; // ar
  }
}
function placeLabels(pins, arcPts, sizeOf, scales, gapPx) {
  const out = new Map();
  const placed = [];
  const order = [...pins].sort((a, b) => (b.o.head ? 1 : 0) - (a.o.head ? 1 : 0));
  for (const p of order) {
    const ok = (pos, s) => {
      const [w, h] = sizeOf(p.o).map((v) => v * s);
      const r = rectAt(p.x, p.y, w, h, gapPx * s, pos);
      const pad = 3 * s;
      if (r[0] < VB.x - 4 || r[2] > VB.x + VB.w + 4 || r[1] < VB.y - 4 || r[3] > VB.y + VB.h + 4) return false;
      for (const [x, y] of arcPts) if (x > r[0] - pad && x < r[2] + pad && y > r[1] - pad && y < r[3] + pad) return false;
      for (const q of pins) if (q !== p && q.x > r[0] - 8 * s && q.x < r[2] + 8 * s && q.y > r[1] - 8 * s && q.y < r[3] + 8 * s) return false;
      for (const [o, rs] of placed) if (o !== p) { const t = rs[s]; if (t && r[0] < t[2] + pad && r[2] > t[0] - pad && r[1] < t[3] + pad && r[3] > t[1] - pad) return false; }
      return true;
    };
    const pos = POSITIONS.find((ps) => scales.every((s) => ok(ps, s))) || POSITIONS.find((ps) => ok(ps, scales[0])) || 'b';
    const rects = {};
    for (const s of scales) { const [w, h] = sizeOf(p.o).map((v) => v * s); rects[s] = rectAt(p.x, p.y, w, h, gapPx * s, pos); }
    placed.push([p, rects]);
    out.set(p, pos);
  }
  return out;
}

export function worldMap(offices) {
  const lit = [...new Set(offices.map((o) => o.region))];
  const pins = offices.map((o) => ({ o, x: X(o.geo.lng), y: Y(o.geo.lat) }));
  const head = pins.find((p) => p.o.head) || pins[0];
  // flight paths from the head office out to each office: higher for longer trips, never above the top of the map
  const arcPts = [];
  const arcs = pins.filter((p) => p !== head).map((p) => {
    const dist = Math.hypot(p.x - head.x, p.y - head.y);
    const mx = (p.x + head.x) / 2;
    const my = Math.max(VB.y + 18, Math.min(p.y, head.y) - dist * 0.32);
    for (let i = 1; i < 60; i++) {
      const t = i / 60, u = 1 - t;
      arcPts.push([u * u * head.x + 2 * u * t * mx + t * t * p.x, u * u * head.y + 2 * u * t * my + t * t * p.y]);
    }
    return `M${head.x.toFixed(1)} ${head.y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  });
  // label sizes in CSS pixels (see .wm-label in main.css); map units per pixel at the tightest widths
  const deskSize = (o) => [37 + (o.nation || o.country).length * 6.9 + (o.head ? 27 : 0), 24];
  const phoneSize = () => [30, 18];
  const desk = placeLabels(pins, arcPts, deskSize, [1.1, 1.6], 10);
  const phone = placeLabels(pins, arcPts, phoneSize, [3.2], 7);
  return `<div class="wmap" role="img" aria-label="World map: ${esc(offices.map((o) => `${o.head ? 'head office' : 'office'} in ${o.city}, ${o.country}`).join('; '))}">
  <svg class="wmap-svg" viewBox="${VB.x} ${VB.y.toFixed(1)} ${VB.w} ${VB.h.toFixed(1)}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs>
      <pattern id="wmDot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.45" fill="rgba(214,180,255,.26)"/></pattern>
      <pattern id="wmLit" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.9" fill="#B57BFF"/></pattern>
      <clipPath id="wmLand" clip-rule="evenodd"><path clip-rule="evenodd" d="${LAND}"/></clipPath>
      ${lit.map((r) => `<clipPath id="wm-${r}" clip-rule="evenodd"><path clip-rule="evenodd" d="${REGIONS[r].d}"/></clipPath>`).join('')}
      <radialGradient id="wmGlow"><stop offset="0" stop-color="#A855F7" stop-opacity=".4"/><stop offset="1" stop-color="#A855F7" stop-opacity="0"/></radialGradient>
    </defs>
    <rect x="0" y="0" width="1000" height="500" fill="url(#wmDot)" clip-path="url(#wmLand)"/>
    ${lit.map((r) => `<g clip-path="url(#wm-${r})"><rect class="wm-lit" x="${X(REGIONS[r].from).toFixed(1)}" y="0" width="${(X(REGIONS[r].to) - X(REGIONS[r].from)).toFixed(1)}" height="500" fill="url(#wmLit)"/></g>`).join('')}
    ${pins.map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.o.head ? 62 : 46}" fill="url(#wmGlow)"/>`).join('')}
    ${arcs.map((d, i) => `<path class="wm-arc" d="${d}" pathLength="1" style="transition-delay:${(0.2 + i * 0.18).toFixed(2)}s"/><path class="wm-comet" d="${d}" pathLength="1" style="animation-delay:${(i * 0.9).toFixed(1)}s"/>`).join('')}
    ${pins.map((p, i) => `<g class="wm-pin${p.o.head ? ' head' : ''}"><circle class="wm-ring" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.o.head ? 7 : 5}" style="animation-delay:-${(i * 0.7).toFixed(1)}s"/><circle class="wm-core" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.o.head ? 7 : 5}"/></g>`).join('')}
  </svg>
  ${pins.map((p) => { const [l, t] = pct(p.o.geo.lng, p.o.geo.lat); return `<span class="wm-label d-${desk.get(p)} m-${phone.get(p)}${p.o.head ? ' head' : ''}" style="left:${l.toFixed(2)}%;top:${t.toFixed(2)}%" title="${esc(p.o.nation || p.o.country)}: ${p.o.head ? `Head office, ${esc(p.o.city)}` : esc(p.o.city)}"><b><em>${esc(p.o.code)}</em>${esc(p.o.nation || p.o.country)}</b><small>${p.o.head ? `Head office, ${esc(p.o.city)}` : esc(p.o.city)}</small><i aria-hidden="true">${esc(p.o.code)}</i></span>`; }).join('')}
</div>`;
}

export const regionName = (r) => REGIONS[r]?.name || r;
