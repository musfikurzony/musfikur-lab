#!/usr/bin/env node
/**
 * Deployment guard.
 *
 * Runs after `npm run build` and before `wrangler pages deploy`. It confirms
 * the export is genuinely static and complete, so a broken deploy is caught
 * on your machine rather than discovered on the live site.
 *
 * `output: 'export'` already fails the build on most server-side features, so
 * this is the second line of defence, checking the things a successful build
 * would not notice: a missing page, a dropped _redirects file, or a stray
 * Worker artefact from a dependency.
 *
 * Run it on its own any time:  npm run check:static
 */

import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
const problems = [];

/* -- 1. The export exists ------------------------------------------------ */

if (!existsSync(OUT)) {
  console.error(
    `\n  ✗ No ./${OUT} folder.\n    Run "npm run build" first — that is what creates it.\n`,
  );
  process.exit(1);
}

/* -- 2. Required files are present --------------------------------------- */

const required = [
  ['index.html', 'the homepage'],
  ['404.html', 'the not-found page'],
  ['_redirects', 'the /projects → /lab redirect'],
  ['_headers', 'security and cache headers'],
];

for (const [file, why] of required) {
  if (!existsSync(join(OUT, file))) {
    problems.push(`Missing ${file} — ${why}. Is it still in /public?`);
  }
}

/* -- 3. Nothing server-side crept in ------------------------------------- */

const serverArtefacts = [
  ['_worker.js', 'a Cloudflare Worker'],
  ['_middleware.js', 'Pages middleware'],
  ['functions', 'a Pages Functions directory'],
];

for (const [name, what] of serverArtefacts) {
  if (existsSync(join(OUT, name))) {
    problems.push(
      `Found ${name} — that is ${what}. This project is configured for a pure ` +
        `static deploy, so something has introduced a server-side feature. ` +
        `See the notes at the top of wrangler.toml.`,
    );
  }
}

/* -- 4. CSS and JS actually built ---------------------------------------- */

const staticDir = join(OUT, '_next', 'static');
if (!existsSync(staticDir)) {
  problems.push('No _next/static folder — the build produced no assets.');
} else {
  const cssDir = join(staticDir, 'css');
  const hasCss =
    existsSync(cssDir) &&
    readdirSync(cssDir).some((file) => file.endsWith('.css'));
  if (!hasCss) {
    problems.push('No stylesheet in _next/static/css — the site would render unstyled.');
  }
}

/* -- 5. Report ------------------------------------------------------------ */

function countFiles(dir) {
  let total = 0;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    total += statSync(path).isDirectory() ? countFiles(path) : 1;
  }
  return total;
}

if (problems.length > 0) {
  console.error('\n  Static export check failed:\n');
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error('');
  process.exit(1);
}

console.log(
  `\n  ✓ Static export looks good — ${countFiles(OUT)} files in ./${OUT}, ` +
    `no server-side artefacts.\n`,
);
