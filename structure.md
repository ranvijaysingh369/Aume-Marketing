# aumé — Structure & Animation Discipline

> Phase-2 deliverable. The single source of truth for **how things are
> laid out, sized, and animated**. Read together with `content-brief.md`.
>
> Hard rule from the brief: **no page exceeds 4 × 100vh of total scroll
> height.** Verified post-build by a headless browser measuring
> `document.documentElement.scrollHeight`.

---

## A. Scroll budget

Each page's section count and target height. **The numbers below are
ceilings. If a page exceeds them, sections come out — not type size.**

### Reference: 1440 × 900 desktop viewport
- 1 viewport = 900 px
- 4-viewport ceiling = 3600 px
- Footer is part of the budget (charged at ~0.5 viewport per page).

### `/` home — 4 sections
| Section | Height | Notes |
|---|---|---|
| 1. Hero (framed video) | 1.00 vh | Capped at `min(80vh, 900px - 64px*2 padding)`. The 80vh figure is the visual stage; total section height including 64 px cream surround is 1.0 vh. |
| 2. The premise | 0.70 vh | Two-column: copy ~52ch + jar at 40 % column width. |
| 3. The honey (featured product) | 0.80 vh | Copy + front-half jar + price + 2 CTAs. |
| 4. Closing CTA | 0.50 vh | Eyebrow + headline + 2-line body + 2 CTAs. |
| Footer | 0.45 vh | Compact: 2-row grid + bottom strip. |
| **Total** | **3.45 vh** | **under budget** |

### `/story` — 4 sections
| Section | Height | Notes |
|---|---|---|
| 1. Hero banner (video w/ overlay) | 0.85 vh | Headline only, no body paragraph. |
| 2. The valley (annotated jar + 3 stats) | 1.00 vh | This is the page's pinned section (see §B). |
| 3. The process (3 steps, single jar still) | 0.85 vh | |
| 4. Closing philosophy quote | 0.40 vh | One quote, no eyebrow, mocha bg. |
| Footer | 0.45 vh | |
| **Total** | **3.55 vh** | **under budget** |

### `/the-honey` — 3 sections (was 4; §3 tasting cut in Phase 4)
| Section | Height | Notes |
|---|---|---|
| 1. Product hero (copy + 1:1 jar plate + price + tasting accent + CTAs) | 1.05 vh | Tasting accent ("Floral. Bright. Mineral.") moved from cut §3 into hero. |
| 2. Specifications (table) | 0.70 vh | 7 rows. No body paragraph. |
| 3. Back label (back-half jar + provenance copy) | 0.85 vh | Renumbered from §4. |
| Footer | 0.45 vh | |
| **Measured** | **3.37 vh (3032 px)** | **under budget** |

> **Phase-4 amendment.** The original outline had 4 sections totalling
> 3.60 vh. After build, headless measurement showed 4.46 vh — overshoot
> caused by the 4:5 hero plate + duplicate lead paragraph + a 4th section
> with low information density. Per the brief's rule ("cut sections, not
> type size"), §3 *Tasting Notes* was removed; its 3-word headline was
> folded into §1 as a typographic accent under the price. `honey-hover.mp4`
> was reassigned to `/story` §1 only.

### `/journal` — 2 sections
| Section | Height | Notes |
|---|---|---|
| 1. Hero banner (`vid1.png` + headline + 1-line lead) | 0.60 vh | |
| 2. Six-card grid (3 cols × 2 rows desktop) | 1.50 vh | 4:5 aspect cards + spacing. |
| Footer | 0.45 vh | |
| **Total** | **2.55 vh** | **well under budget** |

### `/buy` — 3 sections
| Section | Height | Notes |
|---|---|---|
| 1. Product + form (sticky left, scroll right) | 1.60 vh | Form is the tallest content; image is sticky so the visual is always anchored. |
| 2. Trust strip (3 columns) | 0.40 vh | |
| 3. Watermark close (faded logo + caption) | 0.40 vh | |
| Footer | 0.45 vh | |
| **Total** | **2.85 vh** | **well under budget** |

---

## B. Animation budget

### Smooth scroll: **none. Native scroll only.**
Phase 5 removed Lenis entirely. The duration-0.8 / lerp-0.10 config was still
adding latency on Windows + decoded a 1080p hero video at the same time,
which produced jank. Native scroll is faster and matches OS behaviour.
- Lenis import is removed from `Base.astro`.
- The `lenis` npm dep can be dropped if no other code uses it.

### Pinned (scroll-scrubbed) sections — **none, site-wide**
Phase 5 removed every pin. The home page never had one. `/story`'s prior
plan for a pinned annotation reveal collapsed to a one-shot fade-up at
threshold 0.3 — visually equivalent at this scale, costs zero scroll
listeners. No pin, no scrub, no progress-driven timelines anywhere.

### Parallax
**None.** Phase 5 removed the allowance entirely — the home page hero is
fixed-position-instead-of-parallax, which delivers the same "stays in
place while content scrolls over it" effect with zero scroll listeners.

### Reveals
Every reveal is the same primitive:

```css
.fade-up {
  opacity: 0;
  transform: translateY(16px);          /* was 32px — tightened */
  transition:
    opacity 600ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- **Duration: 600 ms** (was 900 ms). Comfortably under the 800 ms ceiling.
- **Translate: 16 px** (was 32 px). Per brief.
- **No scale.** No rotate. **No clip-path wipes.** Confirmed once during code review.
- **Stagger:** 80 ms between siblings for a small group (2–4 items). Cap stagger at 240 ms total — beyond that the page feels slow.
- **Trigger:** `IntersectionObserver` at threshold 0.12, observed once, unobserved on first reveal.

### Hover-play video (only used on `/the-honey` §3)
- Desktop: `mouseenter` → `play()`; `mouseleave` → `pause(); currentTime = 0`.
- Touch / mobile: stays paused with poster shown. **No** intersection-once auto-play (the previous build did this — it surprises the visitor). The poster image carries the section.
- Reduced-motion: paused, poster shown.

### Animation budget summary
- **Total reveal motion per page:** ≤ 1.5 seconds wall-clock from page-load, even if the user pauses partway down.
- **Total scroll-driven motion:** the one pinned section on `/story` + Lenis smoothing. Everything else is static.

---

## C. Type & spacing scale

### Modular type scale — 1.25× ratio
Anchor: 16 px body. Rounded to whole pixels.

| Step | px | Used as |
|---|---|---|
| -1 | 13 | caption / footer copy |
| 0 | 16 | body |
| +1 | 20 | lead / pull-quote (small) |
| +2 | 25 | h3 / product attribute / spec value |
| +3 | 31 | h2 (mobile) / pull-quote (large) |
| +4 | 39 | h1 (mobile) / h2 (desktop) |
| +5 | 49 | h1 (desktop) |
| +6 | 61 | display (mobile) |
| +7 | 76 | display (desktop) — hero wordmark only |

**Off-scale, fixed:** eyebrow / button labels at **11 px** (tracked 0.18em ALL CAPS — they read as ornaments, not text).

CSS exposure:

```css
:root {
  --t-caption:  13px;
  --t-body:     16px;
  --t-lead:     20px;
  --t-h3:       25px;
  --t-h2:       clamp(31px, 3.2vw, 39px);
  --t-h1:       clamp(39px, 4.5vw, 49px);
  --t-display:  clamp(61px, 8vw, 76px);
  --t-eyebrow:  11px;
}
```

> One scale, two anchors (mobile + desktop). No more `clamp(56px, 9vw, 144px)` runaway.

### Line-heights
| Role | line-height |
|---|---|
| display + h1 + h2 | 1.10 |
| h3 | 1.20 |
| lead | 1.45 |
| body | 1.65 |
| caption | 1.5 |
| eyebrow | 1 |

### Letter-spacing
| Role | tracking |
|---|---|
| display + h1 | 0 |
| h2 + h3 | 0 |
| lead | 0 |
| body | 0 |
| eyebrow / button label | 0.18 em |
| caption | 0.04 em |

### Section padding (vertical)
**Verbatim from brief:** 96 px desktop, 64 px mobile. **Not** 120 / 56.

```css
:root {
  --pad-section-y: 96px;   /* desktop */
  --pad-section-x: 56px;
}
@media (max-width: 900px) {
  :root {
    --pad-section-y: 64px; /* mobile */
    --pad-section-x: 24px;
  }
}
```

The previous build had `120px / 56px / 24px`. Reduced to bring 4 desktop
sections under 4 viewports comfortably.

### Spacing scale (8 px base)
| Token | px |
|---|---|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 16 |
| `--space-4` | 24 |
| `--space-5` | 40 |
| `--space-6` | 64 |
| `--space-7` | 96 |

Notice: **no `--space-8: 144`**. The previous build used 144 px gaps in
several places. Cut. Anything that used 144 will use 96.

### Container widths
- `--container-narrow`: 720 px (long-form reading; not used in MVP)
- `--container`:        1200 px (default)
- `--container-wide`:   1440 px (jar plates only)

### Grid
12 columns. Outer margin = `--pad-section-x`. Gutter = 24 px.
Editorial body panels span 4–7 columns (max ~52 ch).

---

## D. What this discipline rules out

To make the budgets above stick, the previous build's ornaments are gone:

- ❌ Loader screen (was 2.2 s blocking — costs 8 % of an attention budget for nothing the brand needs).
- ❌ Marquee accent strip (was a full-width band of moving text between sections — added 0.3 vh of scroll for a flourish that isn't in any source doc).
- ❌ "Featured in" press strip (italics in gold listing Vogue / Kinfolk / etc — unsourced and IP-adjacent; no equivalent line in `[BP]` or `[GP]`).
- ❌ Stats band as its own section on `/story` (folded *into* §2 The Valley as a 3-stat row — saves ~0.6 vh).
- ❌ Three-column ritual hover-play videos on `/` (didn't survive the one-sentence test against the home page's narrative).
- ❌ Bundle strip on `/` (the home page is already selling the honey in §3; selling a bundle on top muddies the narrative — the bundle goes on `/the-ghee` when that page exists).
- ❌ Philosophy section as its own viewport on `/story` (compressed into the closing line — same quote, 1/3 the scroll).
- ❌ Subscribe / newsletter section (deferred to a sticky footer module post-launch).
- ❌ Testimonials grid (deferred — no real testimonials yet; the blueprint's were placeholders).

The result is a site that **reads in 2–3 trackpad swipes per page**, with
every section earning the distance it occupies.
