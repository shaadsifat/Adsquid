// Local preview server for /dist with clean URLs and the 404 page.
// Usage: node serve.mjs   (then open http://localhost:8080)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const PORT = +process.env.PORT || 8080;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};

createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/\\/g, '/');
  if (p.includes('..')) return res.writeHead(400).end();
  let file = join(DIST, p);
  try {
    const s = await stat(file);
    if (s.isDirectory()) {
      if (!p.endsWith('/')) return res.writeHead(301, { Location: p + '/' }).end();
      file = join(file, 'index.html');
    }
    const body = await readFile(file);
    const range = req.headers.range;
    const type = TYPES[extname(file)] || 'application/octet-stream';
    if (range && type.startsWith('video')) {
      const [a, b] = range.replace('bytes=', '').split('-');
      const start = +a, end = b ? +b : body.length - 1;
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      return res.end(body.subarray(start, end + 1));
    }
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' }).end(body);
  } catch {
    const nf = await readFile(join(DIST, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(nf);
  }
}).listen(PORT, () => console.log(`Adsquid preview: http://localhost:${PORT}`));
