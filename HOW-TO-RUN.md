# How to run this site

This folder is the complete aumé Astro site.

## To view the pre-built static site immediately
Open `dist/index.html` in a browser, or:
```bash
cd dist && python -m http.server 4321
# then visit http://localhost:4321
```

## To run the dev server / rebuild
```bash
npm install      # one-time, ~45s, ~500MB of node_modules
npm run dev      # http://localhost:4321 with HMR
npm run build    # regenerates dist/
npm run preview  # serves dist/ on http://127.0.0.1:4321
```

## To re-run the asset pipeline
```bash
node scripts/process-assets.mjs
# Re-encodes videos and re-optimises images from the canonical
# marketing-folder source files. Auto-detects ffmpeg from PATH or the
# winget install location on Windows.
```

## To re-verify scroll budget + perf trace (needs Playwright)
```bash
npx playwright install chromium  # one-time, ~150MB
npm run preview &
node scripts/measure-scroll.mjs
node scripts/perf-trace.mjs
```

## What's in this folder

- `src/` — Astro pages, components, layouts, styles, asset registry
- `public/assets/` — optimized images and videos served at build time
- `scripts/` — asset pipeline + headless verification scripts
- `docs/` — design tokens, handoff, critique, a11y, manifest, screenshots
- `dist/` — built static site (regenerable via `npm run build`)
- `content-brief.md` / `structure.md` / `asset-audit.md` / `critique.md` / `a11y-report.md` — process & deliverable docs

`node_modules/` is intentionally excluded — run `npm install` to recreate.
