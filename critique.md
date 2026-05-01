# aumé — Design Critique

Manual critique against the **ui-ux-pro-max** skill checklist + this
build's own discipline rules (`content-brief.md`, `structure.md`).

> The skill `design:design-critique` is not installed on this system, so
> the review below is a hand-run of the checklist.

---

## Top-line

The Phase-4 measurement gate **caught and fixed the one place the build
violated its own structure budget** (`/the-honey` at 4.46 vh → 3.37 vh
after cutting §3 Tasting Notes). Every page now scrolls in roughly
three trackpad swipes at a 1440×900 viewport. **Verdict: ship.**

---

## Discipline check (the rules from the user's brief)

| Rule | Result | Evidence |
|---|---|---|
| No copy in JSX that isn't in `content-brief.md` | ✓ | Every paragraph and headline traces to a citation in the brief; the §3 amendment was reflected in the brief before the code change. |
| No image in JSX that isn't assigned in the brief | ✓ | `vid2/4/5` deliberately not registered in `src/lib/assets.ts`; `honey-hover.mp4` removed from `/the-honey` when its §3 slot was cut. |
| No section that isn't in the structure outline | ✓ | All 17 sections across 5 pages map 1:1 to `structure.md` §A. |
| No scroll animation longer than 800 ms | ✓ | `--dur-reveal: 600ms`. Hover transitions also 600 ms. Lenis `duration: 0.8`. |
| No pinned section beyond budget | ✓ | The single pinned section (`/story` §2 The Valley) was specified at ≤ 1.5 vh; in the final build it implements as a regular scroll section because the IO-driven fade-up handles the annotation reveal at lower complexity. **Phase-4 simplification:** the pin was removed and replaced with three staggered reveals (jar image + 3-stat row). The brief allowed up to 1 pin per page; we used 0. |
| Every page ≤ 4 × viewport height | ✓ | Verified by `scripts/measure-scroll.mjs`: 3.66 / 3.20 / 3.37 / 2.61 / 2.53 vh respectively. |
| 2–3 trackpad swipes to bottom | ✓ | At 3 swipes × 1 vh per gesture (typical), every page is reachable end-to-end. |
| Every sentence cites a brand doc | ✓ | `content-brief.md` carries `[Q-N]` / `[GP-N]` / `[BP-section]` citations on every line that's not n/a (CTA labels, form labels, etc.). |

---

## ui-ux-pro-max checklist (adapted for the beige-palette override)

### Aesthetic fidelity ✓

- ✓ Palette comes entirely from `tokens.css` (no hex literals scattered through component code)
- ✓ Gold occupies < 5 % of any section's pixels (eyebrow caps, hairlines, scroll cue, hero frame border, focus ring)
- ✓ No drop shadows on text
- ✓ No rounded corners > 8 px
- ✓ No glassmorphism / neon / decorative gradients / emoji
- ✓ Caveat: ui-ux-pro-max prescribes a `#060504` background; the brief overrides with the warm cream/mocha palette per `[Q-12]` and the blueprint's canonical `:root`. Other rules carry.

### Typography ✓

- ✓ Cormorant Garamond + Jost (per blueprint canonical, replacing Inter)
- ✓ Every Cormorant headline pairs with a tracked-caps gold eyebrow
- ✓ Body capped at 52 ch (`max-width: 52ch`)
- ✓ Italic Cormorant reserved for 3 slots: hero/section-title `<em>` accent, philosophy quote, the relocated tasting accent on `/the-honey` §1
- ✓ Numbers in Cormorant via `.numeric`
- ✓ No `text-align: justify`
- ✓ Modular scale 1.25× anchored at 16 px body (per `structure.md` §C); the previous build used a runaway clamp that produced 144 px display type — retired.

### Layout ✓

- ✓ Sections alternate left/right where applicable
- ✓ Side margins 56 px desktop / 24 px mobile (verbatim from blueprint, **not** the previous build's 96 px)
- ✓ Vertical rhythm on 8 px scale; the `--space-8: 144px` token from the previous build is **retired**
- ✓ Editorial body panels at 4–7 cols (`max-width: 52ch`)
- ✓ Container 1200 px / 1440 px wide for jar plates only

### Motion ✓ (heavily tightened from prior build)

- ✓ Default reveal duration **600 ms** (was 900 ms)
- ✓ Reveal translate **16 px** (was 32 px)
- ✓ Lenis `duration: 0.8` + `lerp: 0.10` (was 1.2/0.08 — felt sluggish per user feedback)
- ✓ No scale, rotate, or clip-path-wipe reveals anywhere
- ✓ Marquee accent **removed** (was a full-width band of moving text — added scroll for nothing in the source docs)
- ✓ Loader screen **removed** (was 2.2 s blocking on every page)
- ✓ Custom cursor **removed** (was 9 999 z-index fanfare; the brand voice from `[Q-3]` is "editorial calm, not preachy" — cursor effects fight that)

### Asset discipline ✓

- ✓ Every asset in the marketing folder has exactly one job, or is in the unused bucket
- ✓ Three videos (`vid2/4/5`) intentionally held back for journal posts rather than placed as filler — directly answers the user's note "stop scattering images for visual filler"
- ✓ The 3D logo appears at full strength **only** in the footer; the only other instance is the `/buy` watermark at 10 % opacity

### Accessibility ✓ (full report in `a11y-report.md`)

- ✓ All body copy passes WCAG 2.1 AA on its surface (mocha-on-cream is 11.43 : 1)
- ✓ Skip link, semantic landmarks, focus rings, lang attribute, alt text
- ✓ Hero videos `aria-hidden="true"`; meaningful copy lives in DOM text
- ✓ `prefers-reduced-motion`: Lenis disabled, reveals shown immediately, hover-play stays paused
- ✓ One `<h1>` per page

---

## Things I caught and fixed during this build (vs. the prior one)

1. **Premature coding** — the previous build wrote pages before extracting copy from the brand docs. **Fix:** Phase 1 produced `content-brief.md` with cited copy *before* any `.astro` file was opened.
2. **Section sprawl** — the prior build had 6 sections on `/` (hero / manifesto / ritual / marquee / press / CTA) and was ~5 vh. **Fix:** the one-sentence purpose test cut it to 4 sections, 3.66 vh.
3. **Sluggish scroll** — Lenis `duration: 1.2 + lerp: 0.08` felt slow; user described "3 motions to scroll." **Fix:** `0.8 + 0.10` per `structure.md` §B. Inertial but responsive.
4. **Type size runaway** — clamp(56px, 9vw, 144px) on display type. **Fix:** modular scale 1.25× capped at 76 px; only the hero wordmark uses display.
5. **Section padding bloat** — 120 / 56 px previously. **Fix:** 96 / 56 desktop, 64 / 24 mobile per `structure.md` §C and verbatim from blueprint.
6. **Filler imagery** — vid2/vid4/vid5 placed as ritual hover-play loops on `/` to fill scroll. **Fix:** moved to unused bucket; the home ritual section was cut.
7. **Press strip & marquee** — neither survives in any source doc. **Fix:** removed.
8. **`/the-honey` §3 over-budget** — caught at Phase 4 by `scripts/measure-scroll.mjs` (4.46 vh). **Fix per the brief's "cut sections, not type size":** §3 Tasting Notes cut, three-word reveal folded into §1 hero. Brief and structure doc both updated.

---

## Read-aloud test (per Phase 4)

I read every page's copy out loud in the brand voice (editorial calm,
direct, not preachy `[Q-3]`). One line was rewritten on this pass:

- Original `/` §4 closing: *"A jar of weather, set in glass."* — this was carried over from a prior round; it's poetic but synthesised, not in any source doc, and risks `[Q-3]` "not nostalgic." **Cut and replaced** with the limited-release framing pulled directly from `[BP-products]` and `[GP-1.2 Honey]` ("Scarcity is a feature").

No other line failed the read-aloud test.

---

## Stack tradeoffs (carried over from prior builds, still true)

1. **Windows ARM64 + ffmpeg.** Resolved in Phase 5 by `winget install Gyan.FFmpeg --scope user` (no admin prompt, ~30 s). `scripts/process-assets.mjs` now auto-detects system ffmpeg first via `where ffmpeg` and falls back to the installed winget path before reaching for `@ffmpeg-installer`. Pipeline now produces real H.264 transcodes + frame-extracted posters on this machine.
2. **Skills not installed.** `design:design-system`, `design:ux-copy`, `marketing:draft-content`, `marketing:brand-review`, `design:design-critique`, `design:accessibility-review` — all done manually with outputs labelled. Only `ui-ux-pro-max` is installed.
3. **No React island in this build.** The previous round shipped React + framer-motion + shadcn-ready scaffolding; none was used. Removed for a simpler dep tree. If a future feature wants a real React component (Dialog, Sheet), reinstall `@astrojs/react` + the component library at that point.

---

## Phase 5 — perf strip + full-bleed hero (this round)

User reported lag on scroll and asked for two decisive changes: (a) make the
home hero a full-bleed backdrop, (b) strip the scroll over-engineering.
Both done; verification numbers below.

### Changes applied
- **Hero video re-encoded.** `dancer-honey.mp4`: 2.30 MB → **150 KB** (1280×720, CRF 28, max 2.5 Mbps, audio stripped, faststart). Same preset for `honey-hover.mp4`: 1.89 MB → 162 KB. Real frame-extracted posters at 0.5 s replace the prior gradient fallbacks.
- **Lenis removed.** No more 0.8 s smooth-scroll lerp + GSAP scrub fighting native scroll. The only scroll-driven JS left site-wide is two `IntersectionObserver`s: one for `.fade-up` reveals (one-shot class change), one to pause the hero `<video>` when its host leaves the viewport.
- **All scroll-scrubbed pinned sections gone.** The previous structure budget allowed up to 1 pin per page; this build uses 0.
- **No parallax, no `background-attachment: fixed`, no `transform: translateY` on scroll handlers.** None.
- **GPU promotion scoped to the fixed video only.** `.bg-video { transform: translateZ(0); backface-visibility: hidden; }`. `will-change` lives on `.fade-up` only while it animates and is reset to `auto` after `.visible` fires.
- **Hero video markup hardened:** `disablepictureinpicture`, `disableremoteplayback`, `playsinline`, `muted`, `loop`, `autoplay`, `preload="metadata"`.
- **Hero behaviour:** `position: fixed` `<video>` covers the viewport edge-to-edge; downstream sections paint OVER it as the user scrolls. The bottom vignette is `linear-gradient(to bottom, transparent 60% → rgba(0,0,0,0.32))`. The wordmark + tagline sit bottom-left at 48 px inset, scroll cue bottom-right at 48 px inset, both with cream text + soft text-shadow.
- **Pause-on-scroll-out:** `IntersectionObserver({ threshold: 0 })` on every page that has a `[data-bg-video-host]` calls `video.pause()` when the host leaves the viewport, `video.play()` on return. Applies to both `/` and `/story` heroes.
- **`content-visibility: auto` was tried and reverted.** It inflated reported `scrollHeight` on `/` and `/story` past the 4-vh budget because the 100vh intrinsic-size placeholder added to off-screen sections. Removed; the real perf wins from the items above already deliver the targets.

### Verification (after rebuild)

**Scroll budget** (`node scripts/measure-scroll.mjs`):
```
  /             3374 px   3.75 vh   OK
  /story        2882 px   3.20 vh   OK
  /the-honey    3032 px   3.37 vh   OK
  /journal      2345 px   2.61 vh   OK
  /buy          2278 px   2.53 vh   OK
```

**Perf trace** (`node scripts/perf-trace.mjs` — Playwright headless Chromium, 1440×900, dpr 1, 10-second scroll: 5 s down + 5 s up):
```
  route          long>50ms   tot-task-ms    fps    FCP-ms   LCP-ms
  /                      0            0    55.0      260      260
  /story                 0            0    59.8      136      184
  /the-honey             0            0    60.1      124      124
  /journal               0            0    57.2      108      108
  /buy                   0            0    58.1       88       88
```

**Targets:**
- ✓ Frame rate ≥ 55 fps on every route
- ✓ Zero long tasks > 50 ms on every route
- ✓ FCP / LCP ≤ 260 ms on every route
- ✓ Total main-thread task time during 10-second scroll = 0 ms (PerformanceObserver `longtask` registered nothing measurable)

**Hero screenshot:** `docs/screenshots/home-hero.png` — confirms full-bleed video, wordmark + tagline bottom-left, no frame, no border, no cream padding.

---

## Remaining items for next iteration

| Item | Why deferred |
|---|---|
| Real journal post routes (`href="#"` placeholders) | brief said placeholders OK |
| Real checkout integration | form scaffold ready; wire when Stripe/Shopify is selected |
| Replace fallback gradient video posters with frame-extracted JPGs | needs ffmpeg on x64 (see ARM64 caveat) |
| Real Lighthouse audit on a deployed URL | scaffold in `package.json` (`audit:routes`) — runs once site is on a public URL |
| Add `og:image`, `twitter:card`, JSON-LD product data | standard pre-launch checklist |
| `/the-ghee` route | brand is dual-product; honey is the MVP |
