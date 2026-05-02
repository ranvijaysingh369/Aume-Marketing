#!/usr/bin/env node
/**
 * Capture the v2 hero AT REST — after the rise/hairline/tag
 * choreography has fully landed (~5s). Used to verify the lockup
 * actually paints, since perf-trace.mjs grabs it mid-rise per the
 * §7.7 brief instruction.
 */
import { chromium } from 'playwright';
import path from 'node:path';

const PORT = process.env.PORT || 4321;
const URL = `http://127.0.0.1:${PORT}/v2/`;
const OUT = path.resolve('docs/screenshots/v2-hero-final.png');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });
try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
// Choreography ends ~4.5s; wait 5.2s for stable composite
await page.waitForTimeout(5200);
await page.screenshot({ path: OUT, fullPage: false });
await browser.close();
console.log(`v2 hero (post-animation) → ${OUT}`);
