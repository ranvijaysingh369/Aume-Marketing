#!/usr/bin/env node
/**
 * scripts/measure-scroll.mjs
 *
 * Phase 4 verification (structure.md hard rule).
 *
 * For each route at viewport 1440×900:
 *   - launch Chromium headless
 *   - navigate to the route
 *   - measure document.documentElement.scrollHeight after fonts/images settle
 *   - compare against ceiling = 4 × 900 = 3600 px
 *
 * Fail loudly if any page exceeds the budget.
 *
 * Usage: PORT=4321 node scripts/measure-scroll.mjs
 */
import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const BASE = `http://127.0.0.1:${PORT}`;
const ROUTES = ['/', '/story', '/the-honey', '/buy'];
const VIEWPORT = { width: 1440, height: 900 };
const CEILING = 4 * VIEWPORT.height; // 3600

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT });
const page = await ctx.newPage();

const results = [];
for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  // Give fonts a beat (Cormorant + Jost both load via Google Fonts)
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  await page.waitForTimeout(400);
  const dim = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
  }));
  const viewports = (dim.scrollHeight / dim.clientHeight).toFixed(2);
  const status = dim.scrollHeight <= CEILING ? 'OK' : 'OVER BUDGET';
  results.push({ route, ...dim, viewports, status });
}

await browser.close();

console.log('=== Scroll budget audit ===');
console.log('Viewport: 1440 × 900   Ceiling: 4 × 900 = 3600 px\n');
console.log('  route          scrollHeight   viewports   status');
console.log('  ----------     ------------   ---------   ------');
for (const r of results) {
  console.log(
    `  ${r.route.padEnd(13)}   ${String(r.scrollHeight).padStart(11)}    ${String(r.viewports).padStart(7)}   ${r.status}`
  );
}

const fails = results.filter((r) => r.status !== 'OK');
if (fails.length) {
  console.error(`\n${fails.length} page(s) exceed the 4-viewport budget. Cut sections.`);
  process.exit(1);
}
console.log('\nAll pages under 4 viewports. ✓');
