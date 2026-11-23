// Builds the GitHub Pages copy (served from /Adsquid/) and publishes it to the gh-pages branch
// as a normal commit on top of the existing branch (no force push).
// Usage: node src/publish-pages.mjs   (or double-click publish-pages.bat)
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, readdirSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });
const out = (cmd, cwd) => execSync(cmd, { cwd }).toString().trim();
const REPO = out('git remote get-url origin', ROOT);

run('node src/build.mjs --base=/Adsquid --out=build-pages --noindex', ROOT);

const tmp = mkdtempSync(join(tmpdir(), 'adsquid-pages-'));
try {
  run(`git clone --quiet --depth 1 --branch gh-pages ${REPO} .`, tmp);
  for (const f of readdirSync(tmp)) if (f !== '.git') rmSync(join(tmp, f), { recursive: true, force: true });
  cpSync(join(ROOT, 'build-pages'), tmp, { recursive: true });
  run('git add -A', tmp);
  if (out('git status --porcelain', tmp)) {
    run('git commit --quiet -m "Publish site"', tmp);
    run('git push --quiet origin gh-pages', tmp);
    console.log('\nPublished: https://shaadsifat.github.io/Adsquid/');
  } else {
    console.log('\nNothing changed since the last publish.');
  }
} finally {
  try { rmSync(tmp, { recursive: true, force: true }); } catch { /* temp folder, safe to leave */ }
}
