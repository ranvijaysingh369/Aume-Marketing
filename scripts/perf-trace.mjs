#!/usr/bin/env node
/**
 * scripts/perf-trace.mjs
 *
 * Phase-5 perf verification — instrumented in-page rather than via
 * Chrome's tracing protocol so it works on every Playwright build.
 *
 *   1. Boots headless Chromium at 1440×900, dpr 1
 *   2. Per route:
 *      - Installs a PerformanceObserver for `longtask` entries
 *      - Counts requestAnimationFrame callbacks during a 5-second
 *        smooth scroll top→bottom + 5-second bottom→top
 *      - Measures FCP / LCP via PerformanceObserver
 *   3. Saves a viewport screenshot of the home hero
 */
import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 4321;
const BASE = `http://127.0.0.1:${PORT}`;
const ROUTES = ['/', '/story', '/the-honey', '/buy', '/v2/', '/v2/the-ghee'];
const VIEWPORT = { width: 1440, height: 900 };
const OUT_DIR = path.resolve('docs/screenshots');
await fs.mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
});

const summary = [];

for (const route of ROUTES) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  await page.waitForTimeout(400);

  if (route === '/') {
    await page.screenshot({ path: path.join(OUT_DIR, 'home-hero.png'), fullPage: false });
  }
  if (route === '/v2/') {
    // Catch the wordmark mid-rise (~1.6 s into the choreography)
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT_DIR, 'v2-hero.png'), fullPage: false });
    // Scroll into the honey tile and capture
    const vh = VIEWPORT.height;
    await page.evaluate((y) => window.scrollTo(0, y), vh);
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT_DIR, 'v2-honey-tile.png'), fullPage: false });
    // Ghee tile
    await page.evaluate((y) => window.scrollTo(0, y), vh * 2);
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT_DIR, 'v2-ghee-tile.png'), fullPage: false });
    // Closing tagline
    await page.evaluate((y) => window.scrollTo(0, y), vh * 3);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, 'v2-tagline.png'), fullPage: false });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
  }
  if (route === '/v2/the-ghee') {
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'v2-the-ghee.png'), fullPage: false });
  }

  // Install perf hooks in the page
  await page.evaluate(() => {
    window.__perf = { longTasks: 0, longTaskMs: 0, frames: 0, lcpMs: null, fcpMs: null };
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__perf.longTasks++;
          window.__perf.longTaskMs += e.duration;
        }
      }).observe({ entryTypes: ['longtask'] });
    } catch {}
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) window.__perf.lcpMs = e.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === 'first-contentful-paint') window.__perf.fcpMs = e.startTime;
        }
      }).observe({ type: 'paint', buffered: true });
    } catch {}
    let raf;
    const tick = () => { window.__perf.frames++; raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  });

  const t0 = Date.now();
  // 5-second scroll top → bottom
  const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
  const steps = 50;
  const stepMs = 100;
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((totalH * i) / steps));
    await page.waitForTimeout(stepMs);
  }
  // 5-second scroll bottom → top
  for (let i = steps - 1; i >= 0; i--) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((totalH * i) / steps));
    await page.waitForTimeout(stepMs);
  }
  const elapsedMs = Date.now() - t0;

  const perf = await page.evaluate(() => ({ ...window.__perf }));
  const fps = (perf.frames / (elapsedMs / 1000)).toFixed(1);

  summary.push({
    route,
    longTasks: perf.longTasks,
    longTaskMs: perf.longTaskMs.toFixed(0),
    fps,
    fcpMs: perf.fcpMs?.toFixed(0) ?? '–',
    lcpMs: perf.lcpMs?.toFixed(0) ?? '–',
  });

  await page.close();
}

await browser.close();

console.log('\n=== Perf trace summary (1440×900, dpr 1, 10s scroll: down + up) ===\n');
console.log('  route          long>50ms   tot-task-ms     fps     FCP-ms   LCP-ms');
console.log('  ----------     ---------   -----------     -----   ------   ------');
for (const r of summary) {
  console.log(
    `  ${r.route.padEnd(13)}   ${String(r.longTasks).padStart(8)}    ${String(r.longTaskMs).padStart(9)}     ${String(r.fps).padStart(5)}    ${String(r.fcpMs).padStart(5)}    ${String(r.lcpMs).padStart(5)}`
  );
}
const fails = summary.filter((s) => Number(s.longTasks) > 0 || Number(s.fps) < 55);
console.log('');
if (fails.length === 0) {
  console.log('All routes: 0 long tasks > 50 ms, ≥55 fps. ✓');
} else {
  console.log(`${fails.length} route(s) flagged.`);
}
console.log(`\nHero screenshot → ${path.join(OUT_DIR, 'home-hero.png')}`);
