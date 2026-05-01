# aumé — Asset Audit

The disciplined version: every marketing-folder file accounted for, with
exactly one job per asset (or flagged unused / archived). Mirrors
`content-brief.md` §D and adjusted for the Phase-4 cut on `/the-honey`.

---

## 1. Marketing-folder manifest

`C:\Users\rskal\OneDrive\Documents\Claude\Projects\Aume Marketing\`

| File | Source bytes | Site role | Status |
|---|---|---|---|
| `Aume Final Logo 3d.jpg` | 2.1 MB | Footer (every page, 80 px) + `/buy` watermark close (240 px @ 10 % opacity) | ✓ used |
| `aume honey no text.png` | 5.7 MB | `/` §2 the premise · `/story` §3 the process · `/journal` cards 3 + 6 | ✓ used |
| `honey front and back.jpeg` | 142 KB | `/story` §2 annotated jar · `/journal` card 5 | ✓ used |
| `honey front and back.jpeg` (front crop) | derived | `/` §3 the honey · `/the-honey` §1 hero · `/journal` card 2 · `/buy` §1 product | ✓ used |
| `honey front and back.jpeg` (back crop) | derived | `/the-honey` §3 back label · `/journal` card 4 | ✓ used |
| `vid1.png` | 1.2 MB | `/journal` §1 hero banner + card 1 | ✓ used |
| `dancer honey.mp4` | 2.3 MB | `/` §1 framed hero | ✓ used |
| `honey hover.mp4` | 1.9 MB | `/story` §1 banner only (was also on `/the-honey` §3 — cut in Phase 4) | ✓ used (one place) |
| `vid2.mp4` | 3.7 MB | **unused — reserved for journal posts** | held |
| `vid 4.mp4` | 3.8 MB | **unused — reserved for journal posts** | held |
| `vid 5.mp4` | 5.3 MB | **unused — reserved for journal posts** | held |
| `honey front and back - Copy.jpeg` | 142 KB | duplicate of `honey front and back.jpeg` | excluded |
| `aume_brand_questionnaire_filled.docx` | 18 KB | source for `content-brief.md` citations | reference only |
| `aume_game_plan_v2_updated.docx` | 2.1 MB | source for `content-brief.md` citations (canonical) | reference only |
| `aume_website_blueprint.html` | 50 KB | source for palette + type + copy | reference only |
| `aume_game_plan_FINAL.docx` | 2.1 MB | superseded by `_v2_updated` | archive |
| `aume_game_plan_v2.docx` | 2.1 MB | superseded | archive |
| `aume_game_plan.docx` | 47 KB | superseded | archive |
| `aume_day_plan.docx` | 2.1 MB | operational, not site-relevant | archive |
| `design for aume website.md` | 1.2 KB | not aumé content (mis-named CSS-frequency artifact from another site) | exclude |
| `CLAUDE.md` | 821 B | "AI Policy Ops" notes — different project entirely | exclude |

---

## 2. Filename reconciliation (original → kebab-case in `public/`)

The source folder is **untouched.** The pipeline copies + renames on the
way into `public/assets/`.

| original | kebab-case path |
|---|---|
| `Aume Final Logo 3d.jpg` | `/assets/images/aume-final-logo-3d.{webp,jpg}` |
| `aume honey no text.png` | `/assets/images/aume-honey-no-text.{webp,jpg}` |
| `honey front and back.jpeg` | `/assets/images/honey-front-and-back.{webp,jpg}` |
| `honey front and back.jpeg` (front crop) | `/assets/images/honey-front.{webp,jpg}` |
| `honey front and back.jpeg` (back crop) | `/assets/images/honey-back.{webp,jpg}` |
| `vid1.png` | `/assets/images/vid-1.{webp,jpg}` |
| `dancer honey.mp4` | `/assets/video/dancer-honey.mp4` (+ `-720.mp4`, + `poster-dancer-honey.jpg`) |
| `honey hover.mp4` | `/assets/video/honey-hover.mp4` (+ `-720.mp4`, + `poster-honey-hover.jpg`) |
| `vid2.mp4`, `vid 4.mp4`, `vid 5.mp4` | **not processed** — only ingested when a journal post earns them |

---

## 3. Per-page asset placement (matches the rendered build)

### `/` (3290 px / 3.66 vh)
| Section | Asset | Job |
|---|---|---|
| §1 Hero | `dancer-honey.mp4` (framed) | atmosphere |
| §2 Premise | `aume-honey-no-text.webp` | contrast |
| §3 The honey | `honey-front.webp` | illustrate |
| §4 Closing CTA | none | — |
| Footer | `aume-final-logo-3d.webp` (80 px) | identity |

### `/story` (2882 px / 3.20 vh)
| Section | Asset | Job |
|---|---|---|
| §1 Hero banner | `honey-hover.mp4` (full-bleed + overlay) | atmosphere |
| §2 Valley + 3 stats | `honey-front-and-back.webp` | illustrate |
| §3 Process | `aume-honey-no-text.webp` | contrast |
| §4 Closing quote | none (mocha bg + italic Cormorant) | — |
| Footer | `aume-final-logo-3d.webp` | identity |

### `/the-honey` (3032 px / 3.37 vh — after Phase-4 cut)
| Section | Asset | Job |
|---|---|---|
| §1 Product hero (with tasting accent inline) | `honey-front.webp` (1:1 plate) | illustrate |
| §2 Specifications | none | — |
| §3 Back label | `honey-back.webp` | illustrate |
| Footer | `aume-final-logo-3d.webp` | identity |

### `/journal` (2345 px / 2.61 vh)
| Section | Asset | Job |
|---|---|---|
| §1 Hero banner | `vid-1.webp` (full-bleed + overlay) | atmosphere |
| §2 6-card grid | `vid-1`, `honey-front`, `honey-no-text`, `honey-back`, `honey-front-and-back`, `honey-no-text` | illustrate / atmosphere |
| Footer | `aume-final-logo-3d.webp` | identity |

### `/buy` (2278 px / 2.53 vh)
| Section | Asset | Job |
|---|---|---|
| §1 Product + form | `honey-front.webp` (sticky) | illustrate |
| §2 Trust strip | none | — |
| §3 Watermark close | `aume-final-logo-3d.webp` (240 px @ 10 %) | atmosphere |
| Footer | `aume-final-logo-3d.webp` (80 px @ 100 %) | identity |

---

## 4. Reserved-but-unused assets (next iteration)

The brief is explicit: assets without a job sit in the unused bucket
rather than getting scattered for visual filler.

| Asset | Held for | Suggested placement when used |
|---|---|---|
| `vid2.mp4` | Journal post on **process** ("Why we strain through linen") | inline within the post body, hover-to-play, max 720 px |
| `vid 4.mp4` | Journal post on **bloom** ("The forty-day rhododendron") | section opener, autoplay-muted-loop |
| `vid 5.mp4` | Journal post on **provenance** ("Meeting the harvester") | inline with caption |

The previous build had these three videos placed on `/`'s ritual three-up.
None survived the one-sentence test against the home page narrative.
Removing them shortened `/` from ~5 viewports to 3.66.

---

## 5. Bytes shipped

| Asset | Source | Output (smaller of webp/jpg) | Reduction |
|---|---|---|---|
| `aume-final-logo-3d` | 2.10 MB | 39 KB (webp) | **98 % ↓** |
| `aume-honey-no-text` | 5.72 MB | 99 KB (webp) | **98 % ↓** |
| `honey-front-and-back` | 142 KB | 106 KB (webp) | 25 % ↓ |
| `vid-1` | 1.27 MB | 96 KB (webp) | **92 % ↓** |
| `dancer-honey.mp4` | 2.30 MB | 2.30 MB (passthrough — see ARM64 caveat) | — |
| `honey-hover.mp4` | 1.89 MB | 1.89 MB (passthrough) | — |

The previous build placed three additional videos on `/` (~12 MB extra).
This build's home page ships **2.3 MB of video + ~250 KB of images**.

---

## 6. ARM64 caveat (carry-over from prior build)

`@ffmpeg-installer/ffmpeg` does not ship a Windows ARM64 binary. The
pipeline detects this and:
- Image processing (sharp): runs unchanged.
- Video transcode + 720p variant: skipped; raw MP4 copied through.
- Posters: generated as warm-tinted radial-gradient SVG fallbacks.

All source videos are already < 8 MB so they meet the brief's threshold
served as-is. On x64/Linux/macOS the pipeline auto-detects ffmpeg and
runs the full transcode pass; no code change required.
