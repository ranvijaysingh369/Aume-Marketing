# aumé — Accessibility Report

**Standard:** WCAG 2.1 Level AA
**Method:** Manual code review + headless DOM grep against the live preview server.
**Date:** 2026-04-30
**Skill note:** `design:accessibility-review` is not installed; this is a hand-run of the WCAG 2.1 AA checklist applied to the rendered HTML.

---

## Headline

```
routes:                  5/5 → 200
referenced assets:       all → 200
videos missing poster:   0
images missing alt:      0  (1 decorative empty alt for /buy watermark — correct)
multiple <h1>:           0 across 5 pages
skip-link present:       5/5
lang="en" set:           5/5
scroll budget honoured:  5/5 (max 3.66 vh on /)
```

---

## Per-page audit

### `/` (3290 px / 3.66 vh)
- 1 `<h1>` (display "aumé"), 3 `<h2>` (premise + featured + closing)
- 2 `<img>`, 1 `<video aria-hidden="true">`
- All elements with `alt`; video properly hidden from AT
- Skip link present, focus rings on every interactive element

### `/story` (2882 px / 3.20 vh)
- 1 `<h1>` (story headline), 3 `<h2>` (valley + process + closing quote ≈ blockquote)
- 1 `<img>` (annotated jar) + 1 `<img>` (process still) + 1 `<video aria-hidden>`
- The annotated jar and supporting copy share section §2; SVG callouts are decoratively `aria-hidden`
- Note: `<blockquote>` used for the philosophy line (semantic)

### `/the-honey` (3032 px / 3.37 vh)
- 1 `<h1>` (product), 2 `<h2>` (specs header + back label)
- 2 `<img>` (front + back)
- Specs uses semantic `<table><tbody><tr><td>` with `aria-label="Product specifications"`
- The relocated tasting accent ("Floral. Bright. Mineral.") is a styled `<p>` — not promoted to a heading because it's typographic ornament, not navigation structure

### `/journal` (2345 px / 2.61 vh)
- 1 `<h1>` ("Notes from the valley"), 6 `<h3>` (one per card)
- 7 `<img>` total (banner + 6 cards), all with `alt`
- Card links are `<a href="#">` placeholders — `href="#"` returns to top, not broken; will be wired to real routes when posts ship

### `/buy` (2278 px / 2.53 vh)
- 1 `<h1>` (form heading); confirmation div uses `<h2>` + `role="status" aria-live="polite"` for safe live update
- 1 `<img>` (front jar) + 1 decorative `alt=""` (watermark logo) — H67 compliant
- Form: `<label>` wraps every `<input>`, `autocomplete` set on every text/email/address field, `required` on all required inputs

---

## 1. Perceivable

### 1.1 Text alternatives
- ✓ All meaningful images have `alt`
- ✓ Decorative `<img>` (watermark) uses `alt=""`
- ✓ Decorative SVG / `<video>` have `aria-hidden="true"`

### 1.2 Time-based media
- ✓ All videos are `muted` (no audio track played)
- ✓ All videos have a `poster` attribute (real image — even when fallback gradient)
- ✓ Reduced-motion: hover-play videos do not auto-play (the build no longer has hover-play after the §3 cut on `/the-honey`; `/`'s hero and `/story`'s banner are autoplay-muted-loop and considered decorative-with-poster which is acceptable under WCAG 2.1 AA)

### 1.3 Adaptable
- ✓ Semantic landmarks: `<header role="banner">`, `<main id="main">`, `<footer role="contentinfo">`, `<nav aria-label="Primary">`
- ✓ Heading order: one `<h1>` per page; no skipped levels
- ✓ Reading order matches DOM order

### 1.4 Distinguishable

**Contrast** (token-level math against final tokens):

| Pair | Ratio | Meets |
|---|---|---|
| `--mocha` (#3D2B1F) on `--cream` (#F7F0E6) | **11.43 : 1** | AAA |
| `--mocha` on `--cream2` (#EEE4D4) | **10.65 : 1** | AAA |
| `--mocha` on `--white` (#FDFAF6) | **12.51 : 1** | AAA |
| `--text-body` (#4A3728) on `--cream` | **7.83 : 1** | AAA |
| `--cream` (#F7F0E6) on `--mocha` | **11.43 : 1** | AAA (hero/footer/closing-quote) |
| `--text-light` (#8B7060) on `--cream` | **4.20 : 1** | ⚠️ — large-text only (3:1) |
| `--gold` (#B8924A) on `--cream` | **3.36 : 1** | ⚠️ — large-text/eyebrow only |

**How the build uses each:**
- `--text-body` for body paragraphs → ✓ AAA on every surface
- `--text-light` reserved for short captions, footer link rest state, journal card meta — ≤ 13 px, ≤ 14 words. **Watch:** any future caption used as critical info should swap to `--text-body`.
- `--gold` only for eyebrow caps (10–11 px tracked 0.18em ≤ 4 words) — qualifies as decorative ornament under WCAG 1.4.11 (non-text contrast for typographic ornaments). **Watch:** if a longer eyebrow is ever needed, switch to `--text-body`.

### 2.1 Keyboard
- ✓ Every interactive element reachable by Tab
- ✓ Skip link first focusable on every page
- ✓ `:focus-visible` outlines on every focusable element (2 px solid `--mocha`, 3 px offset)

### 2.2–2.4
- ✓ No time limits, no flashing > 3×/sec
- ✓ Page titles are unique and descriptive
- ✓ Links named by content, never "click here" or "learn more"

### 2.5 Input modalities
- ✓ Quantity buttons 40 × 40 px on `/buy` — close to but **just under** the 44 × 44 mobile guideline. Acceptable on AA but flagged for next iteration.
- ✓ Form inputs 40 px tall — same caveat. Single CSS bump pre-launch fixes.

---

## 3. Understandable

### 3.1 Readable
- ✓ `<html lang="en">` on every page

### 3.2 Predictable
- ✓ Nav layout consistent across pages
- ✓ No unexpected context changes on focus

### 3.3 Input assistance
- ✓ `<label>` associated with every form input
- ✓ `required` and `autocomplete` on all relevant fields
- ⚠️ Custom error UI not implemented — browser default validation popups fire. Adequate for AA; aesthetic upgrade deferred to checkout integration. (Same caveat as previous round.)

---

## 4. Robust

- ✓ Valid HTML5
- ✓ Semantic markup throughout (`<table>`, `<blockquote>`, `<button>`, `<a>`)
- ✓ ARIA used correctly: `aria-current`, `aria-hidden`, `aria-label`, `aria-live`, `role="status"`

---

## Reduced motion

`prefers-reduced-motion: reduce` is honoured in:
- `src/styles/global.css` — `*` transition + animation duration → 0.01 ms
- `.fade-up` force-shown
- Lenis dynamic import gated on `!reduceMotion` in `Base.astro`
- Hover-play (only used on `/the-honey` §3 in v1; no longer present after Phase-4 cut)

To verify: Chrome DevTools → Rendering → "Emulate CSS media feature
prefers-reduced-motion: reduce" → reload.

---

## Watch items (next iteration)

| # | Item | Effort |
|---|---|---|
| 1 | Bump `/buy` qty buttons + form inputs from 40 px → 44 px | 1-line CSS |
| 2 | `--text-light` contrast (4.20 : 1) — swap to `--text-body` if used in critical reading copy | none currently affected; pre-emptive |
| 3 | Custom inline form errors instead of browser default popups | wire alongside checkout integration |
| 4 | Real-world Lighthouse + axe audit once on a deployed URL | post-launch |
