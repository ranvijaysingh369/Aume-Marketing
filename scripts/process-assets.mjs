#!/usr/bin/env node
/* ============================================================
 * scripts/process-assets.mjs
 *
 * Predev / prebuild asset pipeline.
 *
 *   1. Reads source files from the marketing folder
 *   2. Renames to kebab-case on copy (originals untouched)
 *   3. Optimizes images via `sharp` (resize + .webp + .jpg fallback)
 *   4. Compresses every video via fluent-ffmpeg (CRF 23, preset slow,
 *      no audio, ≤1920×1080) + a 720p mobile variant
 *   5. Extracts a poster.jpg from frame at 0.5s for every video
 *   6. Fails loudly on missing source
 *
 * Sources:
 *   C:/Users/rskal/OneDrive/Documents/Claude/Projects/Aume Marketing
 * Targets:
 *   public/assets/{images,video}
 *
 * Only assets that earn a job in content-brief.md §D appear below.
 * vid-2 / vid-4 / vid-5 are NOT processed — they're reserved for
 * future journal posts and live in the source folder until then.
 * ============================================================ */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/* ffmpeg loader — try in order:
 *   1. system PATH ffmpeg (winget-installed Gyan.FFmpeg picks this up)
 *   2. known winget user-scope path on Windows
 *   3. @ffmpeg-installer/ffmpeg (only ships some platforms; skipped on win32-arm64)
 * Falls back to passthrough copy if all three fail.
 */
import { execSync } from 'node:child_process';
import os from 'node:os';

let ffmpeg = null, FFMPEG_AVAILABLE = false, FFMPEG_FAILURE_REASON = null;

function trySystemFfmpeg() {
  try {
    const cmd = process.platform === 'win32' ? 'where ffmpeg' : 'which ffmpeg';
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim().split(/\r?\n/)[0];
    return out || null;
  } catch { return null; }
}
function tryWingetFfmpeg() {
  if (process.platform !== 'win32') return null;
  const wingetGlob = path.join(os.homedir(), 'AppData', 'Local', 'Microsoft', 'WinGet', 'Packages');
  try {
    const dirs = execSync(`dir "${wingetGlob}" /b 2>nul`, { shell: 'cmd.exe' }).toString().split(/\r?\n/);
    for (const d of dirs) {
      if (d.toLowerCase().includes('gyan.ffmpeg')) {
        // Recurse one level to find ffmpeg-*-full_build/bin/ffmpeg.exe
        const full = path.join(wingetGlob, d);
        const inner = execSync(`dir "${full}" /b /ad 2>nul`, { shell: 'cmd.exe' }).toString().split(/\r?\n/);
        for (const sub of inner) {
          const candidate = path.join(full, sub, 'bin', 'ffmpeg.exe');
          if (fsExistsSync(candidate)) return candidate;
        }
      }
    }
  } catch { /* nothing */ }
  return null;
}
function fsExistsSync(p) { try { return require('node:fs').statSync(p).isFile(); } catch { return false; } }

try {
  const sysPath = trySystemFfmpeg() || tryWingetFfmpeg();
  if (sysPath) {
    const { default: ff } = await import('fluent-ffmpeg');
    ff.setFfmpegPath(sysPath);
    // ffprobe usually sits next to ffmpeg
    const probePath = sysPath.replace(/ffmpeg(\.exe)?$/, 'ffprobe$1');
    ff.setFfprobePath(probePath);
    ffmpeg = ff;
    FFMPEG_AVAILABLE = true;
    console.log(`[asset pipeline] using system ffmpeg: ${sysPath}`);
  } else {
    const [{ default: ffStatic }, { default: fpStatic }, { default: ff }] = await Promise.all([
      import('@ffmpeg-installer/ffmpeg'),
      import('@ffprobe-installer/ffprobe'),
      import('fluent-ffmpeg'),
    ]);
    ff.setFfmpegPath(ffStatic.path);
    ff.setFfprobePath(fpStatic.path);
    ffmpeg = ff;
    FFMPEG_AVAILABLE = true;
    console.log('[asset pipeline] using @ffmpeg-installer binary');
  }
} catch (err) {
  FFMPEG_FAILURE_REASON = err?.message || String(err);
  console.warn('[asset pipeline] ffmpeg unavailable — skipping transcode/poster extraction. Reason:', FFMPEG_FAILURE_REASON);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = String.raw`C:\Users\rskal\OneDrive\Documents\Claude\Projects\Aume Marketing`;
const OUT_IMG = path.join(ROOT, 'public', 'assets', 'images');
const OUT_VID = path.join(ROOT, 'public', 'assets', 'video');

const IMAGES = [
  { src: 'Aume Final Logo 3d.jpg', id: 'aume-final-logo-3d', longest: 1200, role: 'logo' },
  // Two product photos, each with a distinct job (see src/lib/assets.ts)
  { src: 'hf_20260501_043643_a2959d2a-0872-4201-a628-f438cc22ea37.png', id: 'honey-jar', longest: 1600, role: 'photo' },
  { src: 'honey front and back.jpeg', id: 'honey-front-and-back', longest: 2000, role: 'photo' },
];

const VIDEOS = [
  { src: 'dancer honey.mp4',         id: 'dancer-honey' },
  { src: 'honey hover.mp4',          id: 'honey-hover'  },
  { src: 'honey drinking flower.mp4', id: 'honey-drinking-flower' },
];

async function ensureDir(p) { await fs.mkdir(p, { recursive: true }); }
async function fileSize(p)  { try { return (await fs.stat(p)).size; } catch { return null; } }
async function exists(p)    { try { await fs.access(p); return true; } catch { return false; } }
async function assertExists(p, label) {
  if (!await exists(p)) throw new Error(`[asset pipeline] missing ${label}: ${p}`);
}

/* On CI / Render / any machine that doesn't have the local marketing
 * folder, gracefully no-op: the committed public/assets/ outputs are
 * canonical, so the build doesn't need to re-process anything. */
const SRC_AVAILABLE = await exists(SRC);
if (!SRC_AVAILABLE) {
  console.log(`[asset pipeline] source folder not present (${SRC}) — assuming committed public/assets/ are canonical and skipping. This is expected on CI / hosting build VMs.`);
  process.exit(0);
}

async function processImage(entry) {
  const srcPath = path.join(SRC, entry.src);
  await assertExists(srcPath, `image ${entry.src}`);
  const buf = await fs.readFile(srcPath);
  const meta = await sharp(buf).metadata();
  const longest = Math.max(meta.width, meta.height);
  const targetW = longest > entry.longest
    ? (meta.width >= meta.height
        ? entry.longest
        : Math.round(meta.width * (entry.longest / meta.height)))
    : meta.width;

  await sharp(buf).resize({ width: targetW, withoutEnlargement: true })
    .webp({ quality: 82 }).toFile(path.join(OUT_IMG, `${entry.id}.webp`));
  await sharp(buf).resize({ width: targetW, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true }).toFile(path.join(OUT_IMG, `${entry.id}.jpg`));

  if (entry.cropHalves) {
    const halfW = Math.floor(meta.width / 2);
    const cropOpts = (left) => ({ left, top: 0, width: halfW, height: meta.height });
    for (const [side, opts] of [['front', cropOpts(0)], ['back', cropOpts(halfW)]]) {
      await sharp(buf).extract(opts)
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 82 }).toFile(path.join(OUT_IMG, `honey-${side}.webp`));
      await sharp(buf).extract(opts)
        .resize({ width: 1400, withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true }).toFile(path.join(OUT_IMG, `honey-${side}.jpg`));
    }
  }
  return { id: entry.id, sourceBytes: buf.length, dim: `${meta.width}×${meta.height}` };
}

function probe(p) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(p, (err, data) => err ? reject(err) : resolve(data));
  });
}
/* Phase-5 perf preset: 1280×720, CRF 28, max 2.5 Mbps, audio stripped.
 * Single 720p variant serves both desktop and mobile — at backdrop scale
 * the visible quality difference between 1080 and 720 is invisible. */
function transcode(input, output, { maxW = 1280, maxH = 720, crf = 28, preset = 'slow', maxBitrate = '2500k' } = {}) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .videoCodec('libx264')
      .outputOptions([
        `-preset ${preset}`, `-crf ${crf}`,
        `-maxrate ${maxBitrate}`, `-bufsize ${parseInt(maxBitrate)*2}k`,
        '-pix_fmt yuv420p', '-movflags +faststart',
        `-vf scale=w='min(${maxW},iw)':h='min(${maxH},ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`,
      ])
      .noAudio()
      .on('end', resolve).on('error', reject)
      .save(output);
  });
}
function extractPoster(input, output, atSeconds = 0.5) {
  return new Promise((resolve, reject) => {
    ffmpeg(input).seekInput(atSeconds).frames(1).outputOptions(['-q:v 3'])
      .on('end', resolve).on('error', reject).save(output);
  });
}
async function fallbackPoster(outPath, idHint) {
  const w = 1920, h = 1080;
  const tint = idHint.includes('dancer') || idHint.includes('hover')
    ? { r: 184, g: 146, b: 74 } : { r: 92, g: 64, b: 51 };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><radialGradient id="g" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="rgb(${tint.r},${tint.g},${tint.b})"/><stop offset="100%" stop-color="rgb(61,43,31)"/></radialGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`;
  await sharp(Buffer.from(svg)).blur(60).jpeg({ quality: 75, progressive: true }).toFile(outPath);
}

async function processVideo(entry) {
  const srcPath = path.join(SRC, entry.src);
  await assertExists(srcPath, `video ${entry.src}`);
  const sourceBytes = (await fs.stat(srcPath)).size;
  let durationSec = 0;
  if (FFMPEG_AVAILABLE) {
    const meta = await probe(srcPath);
    durationSec = parseFloat(meta.format?.duration ?? '0');
  }

  const fullOut = path.join(OUT_VID, `${entry.id}.mp4`);
  const mobileOut = path.join(OUT_VID, `${entry.id}-720.mp4`);
  const posterOut = path.join(OUT_IMG, `poster-${entry.id}.jpg`);

  if (FFMPEG_AVAILABLE) {
    await transcode(srcPath, fullOut);                // default: 720p CRF 28, 2.5Mbps
    await fs.copyFile(fullOut, mobileOut);            // mobile = same file (perf preset is invisible at backdrop scale)
    const at = Math.min(0.5, Math.max(0.05, durationSec / 2));
    await extractPoster(srcPath, posterOut, at);
    const buf = await fs.readFile(posterOut);
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true }).toFile(posterOut);
  } else {
    await fs.copyFile(srcPath, fullOut);
    await fs.copyFile(srcPath, mobileOut);
    await fallbackPoster(posterOut, entry.id);
  }
  return { id: entry.id, sourceBytes, transcoded: FFMPEG_AVAILABLE };
}

async function main() {
  const t0 = Date.now();
  console.log('[asset pipeline] starting…');
  await ensureDir(OUT_IMG);
  await ensureDir(OUT_VID);

  for (const entry of IMAGES) {
    const cached = path.join(OUT_IMG, `${entry.id}.webp`);
    if (await fileSize(cached)) { console.log(`  [skip] ${entry.id}`); continue; }
    console.log(`  [img] ${entry.id} ← ${entry.src}`);
    await processImage(entry);
  }
  for (const entry of VIDEOS) {
    const cached = path.join(OUT_VID, `${entry.id}.mp4`);
    if (await fileSize(cached)) { console.log(`  [skip] ${entry.id}`); continue; }
    console.log(`  [vid] ${entry.id} ← ${entry.src}${FFMPEG_AVAILABLE ? ' (transcode)' : ' (passthrough)'}`);
    await processVideo(entry);
  }
  console.log(`[asset pipeline] done in ${((Date.now()-t0)/1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error('[asset pipeline] FAILED');
  console.error(err);
  process.exit(1);
});
