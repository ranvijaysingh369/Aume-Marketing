# aumé v2 — Session Handoff Brief

> **You are a fresh Claude Code session. Read this entire brief before
> writing any code.** The previous session built the v1 honey-only site
> currently deployed at `aume.onrender.com`. This document captures every
> strategic decision, asset assignment, copy block, and quality gate
> needed to build v2 — a parallel prototype that introduces ghee as an
> equal hero.
>
> **Date:** 2026-05-02
> **Repo:** https://github.com/ranvijaysingh369/Aume-Marketing
> **Status:** v1 deployed and stable. v2 to be scaffolded under `/v2/` namespace inside the same Astro project. Do not touch v1 files.

---

## 0. The user's goal

> *"This needs to be an amazing result which will blow my mind."*

The user is the founder (Manish, `singhron363@gmail.com`). He has spent
multiple sessions iterating from a generic AI build into an editorially
restrained dual-product site. He has installed serious design skills
(see §3) explicitly so this build draws on them.

**This is not a "ship a prototype" task.** It is a "build a hero page
worth showing to investors and Aesop's design lead" task. The bar is
Aesop / Le Labo / Loewe quality, executed in code.

---

## 1. The brand in 90 seconds

| Fact | Source |
|---|---|
| **aumé** = "Aum" (universal vibration) + "é" (earth). Tagline *From the Earth.* | `aume_brand_questionnaire_filled.docx` Q1 |
| Two products, equal heroes, launched together as the **"Morning Ritual" pairing** | Q4 |
| **Honey** — Himalayan Clear Honey. Raw, single-origin, cold-extracted from a single Kashmir valley above 11,000 ft. $44.99 / 12 oz | `aume_website_blueprint.html` products section |
| **Ghee** — A2 Bilona Ghee. Slow hand-churned from Gir cow milk. $25 / 225g. The original cattle breed, A2 beta-casein, 5,000-year unbroken method | Q5 + game plan v2_updated §1.2 |
| Real enemy: **seed oils + supermarket honey**, not other premium brands | Q5, GP §1.2 |
| Audience: affluent health-conscious Americans 28–50. Whole Foods/Erewhon shoppers. Followers of Andrew Huberman, Paul Saladino, Mark Hyman | Q7 |
| Aesthetic peers: **Aesop, Goop, Le Labo, Celine** — editorial, restrained, premium | Q10 |
| Brand voice: **"editorial calm — not preachy, not nostalgic, not Indian-themed"** | Q3 |
| Critical rule: **"Indian origin lives at the ingredient/provenance level — never in the brand identity. Universally modern."** | Q13 |

**The reference docs are in the marketing folder. Read them before
writing copy:**
- `aume_brand_questionnaire_filled.docx` (voice + audience)
- `aume_game_plan_v2_updated.docx` (strategic positioning, the canonical version — see `docs/game-plan-diff.md`)
- `aume_website_blueprint.html` (visual source of truth — palette, type, copy)

Do **not** read `aume_design.md` or `CLAUDE.md` from the marketing folder — both are misnamed artifacts from other projects.

---

## 2. Strategic decisions locked in this session

These are non-negotiable. They were each fought for and earned.

### 2.1 Architecture — multi-prototype, single repo

- v1 stays at `/`, `/story`, `/the-honey`, `/buy` — **untouched.**
- v2 lives at `/v2/`, `/v2/the-ghee`, `/v2/the-honey` — new files only.
- One Astro project. One `package.json`. One Render deploy.
- Both prototypes accessible side-by-side in production for A/B compare.
- v2 has its own layout (`V2Base.astro`), its own styles (`v2-tokens.css`, `v2-global.css`), its own nav, its own footer. Edits to v2 cannot break v1, and vice versa.
- v2 shares `public/assets/` with v1 (asset folder is shared; new assets just get added).

### 2.2 The dual-product visual problem and how it was solved

**The problem:** Honey comes from Kashmir (mountains, alpine, Western-legible "purity"). Ghee comes from Gir Forest, Gujarat (semi-arid, hot — Western buyers cannot import "desert = sacred" the way Indian/Vedic culture does). Putting both products under a single "from the Himalayas" frame would make ghee look like an outlier, but giving each its own geographic frame would split the brand.

**The solution (locked, do not relitigate):**

> **Mountains in the hero are a brand-level visual signifier, not a factual claim about either product's origin.** They do trust-frame work for the whole brand — the way Aesop uses botanical-garden imagery, Le Labo uses apothecary shelves, Patagonia uses peaks. The buyer reads the visual as *"premium / ancestral / of the earth"* and the text reinforces *ancestral* and *earth* without naming geography.
>
> Once the buyer is inside that brand-level trust frame, **each product proves itself on its own legible levers** — and the levers are deliberately asymmetric.

| | Honey | Ghee |
|---|---|---|
| **Audience-legible moat** | Origin (Kashmir = Western buyers know to value alpine purity) | Process + science + lineage (A2, Bilona, 5,000 years — already in their vocabulary) |
| **One-line proof** | *"Above 11,000 ft, untouched valley"* | *"A2 beta-casein. Bilona-churned. 5,000 years."* |
| **What sells it** | Place | Pedigree |

**Hard rule for v2 copy: ghee never claims mountains anywhere.** Not in the hero overlay (which is wordmark only), not in the §3 ghee tile, not on `/v2/the-ghee`. Ghee proves itself on **A2 + Bilona + 5,000 years + batch-tested COA + Gir = original cattle breed**. The hero gave it brand-level lift; the page-level copy delivers real proof.

**Hard rule for hero text:** the wordmark + tagline must be **abstract**. Never name a place. ✅ *"From the Earth · At First Light"*. ❌ *"From the Himalayas"* (would lock the brand to a place ghee cannot claim).

### 2.3 The page architecture (locked)

**`/v2/` — Home, four vertical full-viewport tiles:**

```
§1  HERO                                        ~100vh
    backdrop video: aume hero page video.mp4 (Himalayan first-light footage)
    "aumé" rises from optical center on page load (CSS animation)
    "From the Earth · At First Light" appears beneath after wordmark settles

§2  HONEY tile                                  ~100vh
    backdrop video: honey-hover.mp4 (already processed in public/assets/video/)
    overlay copy bottom-left:
      eyebrow: THE HONEY
      headline: Himalayan Clear Honey.
      sub: Kashmir Valley · 11,000 ft+ · Single Origin · Raw
      price: $44.99 / 12 oz (340g)
      CTA: Add to Cart  →  /the-honey   (links to v1 product page; that page is fine)

§3  GHEE tile                                   ~100vh
    backdrop video: GHEE TILE VIDEO — NOT YET DELIVERED. See §6.
    overlay copy bottom-left:
      eyebrow: THE GHEE
      headline: A2 Bilona Ghee.
      sub: A2 Beta-Casein · Bilona-Churned · 5,000 Years
      price: $25 / 225g
      CTA: Add to Cart  →  /v2/the-ghee   (new page, also to be built — see §5.3)

§4  CLOSING TAGLINE                             ~50vh
    background: cream surface
    centered serif italic:  "From the Earth. At first light."
    sub:  "Two ancestral originals. One mission."  ([Q-2])
    no CTAs, no buttons — quiet ending

footer (V2Footer)                               ~50vh

Total: ~3.5 vh — fits the 4-viewport ceiling
```

### 2.4 The "aumé rising" hero animation

- Wordmark **rises from the optical center** of the frame on page load.
- Set in **Cormorant Garamond italic 300**, letter-spacing `0.05em`, color `#E2C98A` (gold-light) with cream-leaning cast.
- Underline **gold hairline** draws left to right beneath the wordmark after it settles.
- **Tagline** "FROM THE EARTH · AT FIRST LIGHT" tracked-caps appears beneath the hairline.
- Timing: wordmark begins rising at 0.8 s, settles at 3.2 s; hairline draws 2.8 s → 3.6 s; tagline rises 3.3 s → 4.5 s; held for the rest of the loop.
- `prefers-reduced-motion` shows the lockup immediately, no animation.

**The full CSS keyframe spec is at the bottom of this brief, §11.**

### 2.5 What is NOT in v2

- No `/story` link in v2 nav (v2 is a focused four-tile prototype; story lives in v1)
- No `/journal` (deleted in v1, stays deleted)
- No press strip, no marquee, no testimonials
- No pinned scroll-scrub sections, no parallax, no Lenis (carry forward all v1 perf decisions)
- No three-card grids, no bento layouts (high-end-visual-design rule §3)
- No Indian-themed ornaments, no temple/henna motifs (Q12)

---

## 3. Skills inventory and when to invoke each

The user installed the following skills in the previous session expressly so this build can use them. **Do not skip them.** Use the slash command at the relevant phase, OR auto-invoke when your task description matches.

| Skill | When to invoke during the v2 build |
|---|---|
| **`/high-end-visual-design`** | **Invoke first**, before any markup. Sets the rulebook for fonts, motion, double-bezel cards, fluid-island nav, banned defaults. Editorial Luxury archetype is the chosen vibe — confirm and adopt. |
| **`/premium-frontend-ui`** | Pair with above. Layout patterns + shadcn-quality component recommendations. |
| **`/marketing-psychology`** | Invoke when writing the §3 ghee CTA + §4 closing tagline. Use scarcity (Spring 2026 limited release), social proof, and loss aversion ("the fat replaced by industrial invention"). |
| **`/ad-creative`** | Optional — only if the user asks for an Add-to-Cart variation set or A/B copy. Not core to the build. |
| **`/redesign-existing-projects`** | Invoke after the first scaffold pass to audit your own v2 output for AI-default patterns. The skill's audit checklist is exactly what we want as a self-review gate. |
| **`/zoom-out`** | Invoke after the build is functional, before final review. Steps back and asks "is this even the right approach?" Catches structural mistakes that line-level review misses. |
| **`/grill-me`** | Pressure-test the brand-strategy decisions in §2 before committing. Catches if you're parroting without understanding. |
| **`/diagnose`** | If anything breaks during the build. |
| **`/tdd`** | Optional — if you build new utility scripts (asset processors, audit checks), test-first. Not required for page-level work. |
| **`ui-ux-pro-max`** (already installed previously) | Cross-reference its checklist for the magazine-test step. The aumé-specific guardrails. |

**Operating rhythm:**

```
1. Read this brief end-to-end
2. Read the three reference docs in the marketing folder
3. Read v1 source under aume-website/src/ to understand patterns
4. /high-end-visual-design — adopt rulebook
5. Scaffold v2 architecture (§5)
6. Process the new hero video through scripts/process-assets.mjs
7. Write v2 pages, layout, styles
8. /redesign-existing-projects — self-audit
9. /zoom-out — structural review
10. Verify (§7)
11. Commit + push
12. Report
```

---

## 4. Asset inventory

### 4.1 Already in `Aume Marketing/` (canonical sources)

| File | What it is | v2 use |
|---|---|---|
| `aume hero page video.mp4` | 1664×1248, 10 s, H.264, 2.7 Mbps, has audio track | **§1 hero backdrop.** New for v2. Process through pipeline as `aume-hero.mp4` (and `-720.mp4` mobile + frame poster). Strip audio. |
| `honey hover.mp4` | already processed in `public/assets/video/` as `honey-hover.{mp4,-720.mp4}` + poster | **§2 honey tile backdrop.** Reuse — no re-processing needed. |
| `hf_20260501_043643_a2959d2a-...png` | already processed as `honey-jar.{webp,jpg}` | Used by v1; not needed by v2 hero (v2 §2 is video-only, no still). |
| `Aume Final Logo 3d.jpg` | already processed as `aume-final-logo-3d.{webp,jpg}` | Footer use only. |

### 4.2 Missing — must be supplied before v2 ships

| What | Notes |
|---|---|
| **Ghee tile video** | The §3 ghee tile is unbuilt without it. **The user has not yet generated this.** When the user runs Seedance for it, they will use the prompt in §10 of this brief. Until the video is delivered, **scaffold §3 with a placeholder poster** (`poster-honey-hover.jpg` as a temporary fallback) and label clearly that the asset is pending in commit messages. The page should still build. |
| **Ghee jar product photo** | Optional for v2 home, but `/v2/the-ghee` will need it. Same composition as `honey-jar.png` (centred product shot, gold lid, cream backdrop, 1440²). Not yet generated. |

### 4.3 Existing ghee/honey videos NOT used in v2

These were used in v1 or held in reserve. Do not place them in v2 unless re-evaluating from scratch.
- `dancer honey.mp4` — was used briefly as v1 home hero, then swapped out. Held in reserve.
- `honey drinking flower.mp4` — used as v1 `/story` hero. Do not re-use in v2.
- `vid 4.mp4`, `vid2.mp4`, `vid 5.mp4` — held for future journal posts. Do not place.

---

## 5. The exact v2 file layout to create

```
src/
├── pages/
│   └── v2/                                ← NEW — entire v2 lives here
│       ├── index.astro                    ← /v2/  — 4-tile home
│       └── the-ghee.astro                 ← /v2/the-ghee  — new product page
├── layouts/
│   └── V2Base.astro                       ← NEW — own nav + footer + styles
├── styles/
│   ├── v2-tokens.css                      ← NEW — v2 may extend or override v1 tokens
│   └── v2-global.css                      ← NEW — v2 chrome only
└── lib/
    └── assets.ts                          ← EDIT — add aume-hero + ghee-tile entries
```

Do **not** touch:
- `src/pages/index.astro`, `story.astro`, `the-honey.astro`, `buy.astro`
- `src/layouts/Base.astro`
- `src/styles/global.css` or `src/styles/tokens.css`
- v1 docs (`content-brief.md`, `structure.md`, etc.)

### 5.1 `V2Base.astro`

Its own nav. Suggested links: `aumé` (logo, → `/v2/`), `The Honey` (→ `/the-honey`), `The Ghee` (→ `/v2/the-ghee`), `Shop Now` (→ `/buy`). The nav over hero with cream text + text-shadow, fades to solid cream after 100vh scroll. Same pattern as v1 `Base.astro` — read that file as the template.

Footer: keep the same mocha-bg, gold accent footer pattern as v1, but rewrite copy for the dual-product framing:
> *Himalayan Clear Honey + A2 Bilona Ghee — two ancestral originals, taken at first light.*

### 5.2 `v2-tokens.css` and `v2-global.css`

You may **extend** v1 tokens (import them at the top), or **replace** them entirely if `/high-end-visual-design` recommends a fresh take. The user wants an experiment, so a fresh take is welcome — but the brand palette must remain in the warm cream / mocha / gold family. **No dark mode**. **No purple/blue AI gradient**. **No Inter** (remove from any fallback chain — replace with `'Plus Jakarta Sans'` per `/high-end-visual-design`).

### 5.3 `/v2/the-ghee` page structure

Mirror `/the-honey` v1 structure but ghee-positioned per §2.2:

```
§1 PRODUCT HERO
   backdrop video: ghee tile video (when delivered) OR placeholder
   eyebrow: THE GHEE
   headline: A2 Bilona Ghee.
   price: $25 / 225g
   sub-line in italic Cormorant: "A2 Beta-Casein · Bilona-Churned · 5,000 Years"
   CTAs: Add to Cart (→ /buy with ghee variant — for now → /buy stub) · The Story →

§2 SPECIFICATIONS (table)
   Origin           Gir Forest, Gujarat · India
   Cattle breed     Gir — the original Bos indicus, A2 beta-casein verified
   Method           Bilona — hand-churned curd, slow-fire clarification
   Tradition        5,000 years, unbroken
   Batch testing    Independent COA, every lot
   Net weight       225 g / 7.9 oz

§3 NOTES (mirrors /the-honey §3 pattern)
   eyebrow: NOTES
   "Traditionally used for."
     For morning coffee, for cooking on high heat (smoke point ~485°F), for
     ghrita-based Ayurvedic preparations. Stable at room temperature without
     refrigeration. The shelf-stable ancestral cooking fat.
   "A spoonful contains."
     Saturated and short-chain fatty acids (butyrate). Fat-soluble vitamins A,
     D, E, K2 in their native form. No lactose, no casein — separated during
     bilona churning. No additives, no fillers, no industrial seed oils. Tested
     for purity, batch by batch.

[footer]
```

---

## 6. The build sequence — exact steps in order

### Step 1 — Read everything

```
- This brief (you're reading it)
- aume_brand_questionnaire_filled.docx
- aume_game_plan_v2_updated.docx
- aume_website_blueprint.html
- aume-website/src/pages/index.astro          (v1 hero pattern)
- aume-website/src/pages/the-honey.astro      (v1 product page pattern)
- aume-website/src/layouts/Base.astro         (v1 layout pattern)
- aume-website/src/styles/{tokens,global}.css (v1 design tokens)
- aume-website/scripts/process-assets.mjs     (asset pipeline — already auto-detects ffmpeg)
```

### Step 2 — Invoke `/high-end-visual-design`

Adopt the **Editorial Luxury** archetype (warm creams, mocha, soft gold, variable serif headings, subtle film grain). Confirm the rulebook:
- Banned: Inter, Roboto, Arial; standard 1px gray borders; `shadow-md`; bouncy easing
- Required: custom cubic-beziers; double-bezel cards; macro whitespace; pill eyebrow tags

### Step 3 — Process the new hero video

```bash
cd aume-website
node scripts/process-assets.mjs
```

The pipeline auto-detects ffmpeg via the system path (Gyan.FFmpeg, installed via winget last session). It reads the marketing folder, sees the new `aume hero page video.mp4`, and processes it.

**Important:** the existing pipeline manifest (`scripts/process-assets.mjs` `VIDEOS` array) does NOT yet list `aume hero page video.mp4`. You must add it:

```js
const VIDEOS = [
  { src: 'dancer honey.mp4',          id: 'dancer-honey'         },
  { src: 'honey hover.mp4',           id: 'honey-hover'          },
  { src: 'honey drinking flower.mp4', id: 'honey-drinking-flower'},
  // ADD THIS:
  { src: 'aume hero page video.mp4',  id: 'aume-hero'            },
];
```

After running, `public/assets/video/` should contain:
- `aume-hero.mp4` (1664×1248 native, CRF 17, audio stripped, ~3 MB)
- `aume-hero-720.mp4` (960² mobile, CRF 20, ~1 MB)
- `public/assets/images/poster-aume-hero.jpg` (real frame at 0.5 s)

### Step 4 — Register in `src/lib/assets.ts`

Add a new entry under `videos`:

```ts
'aume-hero': {
  id: 'aume-hero',
  source: 'aume hero page video.mp4',
  src:    '/assets/video/aume-hero.mp4',
  src720: '/assets/video/aume-hero-720.mp4',
  poster: '/assets/images/poster-aume-hero.jpg',
  subject: 'Himalayan first-light footage — brand-level signifier hero (not a product origin claim)',
  usedOn: ['/v2/ §1 hero backdrop'],
},
```

For the ghee tile, **add a stub entry pointing to a placeholder until the real video lands:**

```ts
'ghee-tile': {
  id: 'ghee-tile',
  source: '(pending — see docs/v2-build-brief.md §6 + §10)',
  src:    '/assets/video/honey-hover.mp4',         // PLACEHOLDER — swap when real ghee tile delivered
  src720: '/assets/video/honey-hover-720.mp4',     // PLACEHOLDER
  poster: '/assets/images/poster-honey-hover.jpg', // PLACEHOLDER
  subject: 'PLACEHOLDER — to be replaced with golden ghee video on delivery',
  usedOn: ['/v2/ §3 ghee tile backdrop'],
},
```

### Step 5 — Build `V2Base.astro`, `v2-tokens.css`, `v2-global.css`

Use v1 `Base.astro` as the structural reference. Diverge stylistically per `/high-end-visual-design` Editorial Luxury archetype.

### Step 6 — Build `src/pages/v2/index.astro`

Four sections per §2.3 of this brief. Use the CSS rising-wordmark animation in §11. Each tile is a `<section>` with `[data-bg-video-host]` so the existing IO-pause logic in `Base.astro` (now reused via `V2Base.astro`) pauses each video when it leaves the viewport.

### Step 7 — Build `src/pages/v2/the-ghee.astro`

§5.3 of this brief.

### Step 8 — `/redesign-existing-projects` self-audit

Run the skill against your v2 output. Fix every flagged item before considering done.

### Step 9 — `/zoom-out` structural review

Step back. Ask: "Does this layout actually fit the brand? Is anything generic? Would Aesop's design lead respect this?" Fix what surfaces.

### Step 10 — Verify (see §7)

### Step 11 — Commit + push

```bash
git add .
git commit -m "v2: scaffold four-tile prototype with mountain hero + dual product tiles

- /v2/ home with rising-wordmark animation
- /v2/the-ghee new product page
- V2Base layout, v2-tokens.css, v2-global.css
- aume-hero video processed and registered
- ghee tile uses placeholder poster pending real footage"
git push
```

Render auto-redeploys. v2 lives at `aume.onrender.com/v2/`.

### Step 12 — Report

Tell the user:
1. Live URL of the new v2 prototype
2. Which skills you invoked and what they caught
3. What's still pending (the ghee tile video — point at the prompt in §10)
4. Screenshots of all four sections (use `node scripts/perf-trace.mjs` extended to v2 routes)
5. Scroll budget + perf trace numbers vs the 4-viewport ceiling and ≥55fps gate

---

## 7. Verification gates — every one of these must pass before declaring done

### 7.1 Routes serve 200

```bash
for path in / /v2/ /v2/the-ghee; do
  curl -s -o /dev/null -w "%{http_code}  ${path}\n" "http://127.0.0.1:4321${path}"
done
```

### 7.2 Scroll budget ≤ 4 viewports per page

Extend `scripts/measure-scroll.mjs`'s ROUTES array to include `/v2/` and `/v2/the-ghee`. Run:

```bash
node scripts/measure-scroll.mjs
```

All routes must report `OK`.

### 7.3 Perf trace — 0 long-tasks > 50ms, ≥55 fps

Same — extend `scripts/perf-trace.mjs` ROUTES. Run, confirm pass.

### 7.4 Hyphen sweep on v2 pages

The user explicitly required no hyphens in display copy across the site. Verify on rendered HTML:

```bash
for path in /v2/ /v2/the-ghee; do
  curl -s "http://127.0.0.1:4321${path}" \
    | sed -n 's/.*<\(h1\|h2\|h3\|p\|span\|li\|td\|button\|a\)[^>]*>\(.*\)<\/\1>.*/\2/Igp' \
    | grep -oE '[A-Za-z]+-[A-Za-z]+' | sort -u
done
```

Any output that isn't `data-astro-cid-...` is a violation. Fix.

### 7.5 Ghee never claims mountains anywhere

```bash
grep -rni "himalaya\|mountain\|alpine\|11.000.ft\|kashmir" \
  src/pages/v2/the-ghee.astro
# Should return zero matches.
```

### 7.6 Inter not in v2 fallback chain

```bash
grep -ni "Inter" src/styles/v2-tokens.css src/styles/v2-global.css \
  src/layouts/V2Base.astro src/pages/v2/*.astro
# Should return zero matches. If present, replace with 'Plus Jakarta Sans'.
```

### 7.7 Screenshots captured

Save to `docs/screenshots/v2-*.png`:
- `v2-hero.png` — top of `/v2/` (mountain video, wordmark mid-rise)
- `v2-honey-tile.png` — scrolled to §2
- `v2-ghee-tile.png` — scrolled to §3
- `v2-tagline.png` — scrolled to §4
- `v2-the-ghee.png` — `/v2/the-ghee` hero

### 7.8 Magazine test (per ui-ux-pro-max §11)

Open each v2 screenshot. Would it land as a spread in *Kinfolk*, *Cereal*, or a CDG lookbook? If no — diagnose what's loud, what's generic, what's cheap. Fix before declaring done.

---

## 8. The "blow my mind" quality bar

The user said this explicitly. What that means in practice — beyond functional pass:

| Dimension | Generic AI build | "Blow my mind" |
|---|---|---|
| **Hero wordmark** | Static text, fades in | Rises from optical center with double-bezel glow, hairline draws, tagline lifts beneath — a single choreographed reveal |
| **Tile transitions** | Hard cuts between sections | Each tile's video opacity + scrim respond subtly to scroll position so transition between honey→ghee feels filmic |
| **Typography** | Default weight, default leading | Cormorant Garamond italic at display weight 300 with -0.025em tracking on hero; precise eyebrow caps tracked 0.40em (per `/high-end-visual-design`) |
| **Motion easing** | `ease-in-out` everywhere | Custom cubic-beziers `(0.22, 1, 0.36, 1)` for reveals, `(0.77, 0, 0.18, 1)` for scrubs. **Never `linear` or `ease`.** |
| **Whitespace** | Standard padding | Macro whitespace — `py-32` minimum on the closing tagline section. Let it breathe. |
| **Color discipline** | "Various warm tones" | Three colors max in any single frame. Mocha + cream + one accent. Strict. |
| **Reduced motion** | Animations just turn off | Animations turn off **gracefully** — wordmark appears in final position, no awkward flash |

**The mental test:** the user's most cynical friend, who works at a New York creative agency, opens v2 in a tab. Do they say "AI made this" or "who made this — they're good"?

---

## 9. Outstanding decisions to surface to the user, not auto-decide

Before launching v2, ask the user:

1. **Namespace path**: default `/v2/`. User mentioned but did not lock alternatives like `/proto/`, `/himalayas/`, `/morning-ritual/`. **Default to `/v2/`** unless user says otherwise. Easy to change later.

2. **Honey tile video**: default `honey-hover.mp4` (most intimate, close-up pour). User did not finalize. Use this default; user can swap.

3. **Closing tagline copy**: brief gives "From the Earth. At first light. — Two ancestral originals. One mission." If you have a stronger line from `/marketing-psychology`, propose it.

4. **Should `/v2/the-honey` exist?** Brief currently has the v2 §2 honey tile linking to v1 `/the-honey`. That's fine for now. If the user later wants a v2-styled honey product page, that's a follow-up.

---

## 10. Seedance prompt for the ghee tile video (when user is ready to generate)

The user has not yet generated this. When they ask for it, give them this prompt. They previously said they want the "Spoon lifting glossy ghee from a glass jar on linen — clean editorial — best parallel to honey-hover" direction. If they want something different, swap subjects but keep the constraints below.

```
Cinematic 35mm film close-up of golden ghee in a clear glass jar on a
warm cream linen surface. A wooden spoon slowly enters from above,
lifts a glossy spoonful of liquid-amber ghee, the ghee strand falling
slowly back into the jar in slow motion. Soft window light from upper
left, warm and natural. Background out of focus — soft cream linen
texture and a hint of pale dried flowers in a stoneware vase to the
right edge.

Camera: completely static tripod shot. No moves. No drift. The motion
in frame is purely the spoon and the ghee thread. The camera observes.

Color palette: deep amber, soft cream (#F7F0E6), mocha shadow tones,
honey-gold highlights. Strictly within the warm earth palette — no cool
blues, no greens, no neon. Kodak Portra 400 film stock, anamorphic 2:1
feel, subtle film grain, deep contrast, low saturation. Painterly,
editorial.

References: Aesop "Aurum" campaign, Le Labo product films, slow-motion
food cinematography of Andrew Bui, Kinfolk magazine spreads.

No people visible (just the hand and spoon optionally). No animals.
No text. No captions. No watermarks. No cliché honey-pour drone shots.
No fast cuts.

Sacred, slow, ancestral, premium, restrained. The whole scene feels
like a meditation on a single act.

Duration: 6 seconds. Aspect ratio: 1:1 square (1440×1440). 24fps.
Loopable — last frame matches first frame in tone.
```

When the user delivers `aume ghee video.mp4` (or whatever name) into `Aume Marketing/`:
1. Add to `scripts/process-assets.mjs` `VIDEOS` array
2. Run pipeline
3. Update `src/lib/assets.ts` `'ghee-tile'` entry — replace placeholder paths with real `/assets/video/aume-ghee.mp4` etc.
4. Rebuild
5. The §3 placeholder is now real

---

## 11. The CSS rising-wordmark animation (canonical implementation)

Drop this into `v2-global.css` (or inline in `index.astro` `<style>` if preferred). The HTML markup is in §11.2.

### 11.1 CSS

```css
/* Wordmark + tagline center-stage on the v2 hero. The video plays
   behind; the wordmark rises from the optical center on page load. */
.v2-hero__copy {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: calc(var(--z-bg) + 2);
  color: var(--cream);
  text-align: center;
  pointer-events: none;
  /* Slight upward bias so it sits at optical center, not mathematical */
  padding-bottom: 6vh;
}

.v2-hero__brand {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 300;
  font-size: var(--t-display);
  letter-spacing: 0.05em;
  color: var(--cream);
  text-shadow:
    0 2px 12px rgba(0, 0, 0, 0.45),
    0 0 64px rgba(0, 0, 0, 0.35);
  opacity: 0;
  transform: translateY(48px) scale(0.94);
  animation: aume-rise 2400ms cubic-bezier(0.22, 1, 0.36, 1) 800ms both;
}

.v2-hero__hairline {
  display: block;
  width: 0;
  height: 1px;
  background: var(--gold);
  margin: 24px 0 16px;
  animation: aume-hairline 800ms cubic-bezier(0.22, 1, 0.36, 1) 2800ms both;
}

.v2-hero__tag {
  font-size: 11px;
  letter-spacing: 0.40em;
  text-transform: uppercase;
  color: rgba(247, 240, 230, 0.92);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: aume-tag-rise 1200ms cubic-bezier(0.22, 1, 0.36, 1) 3300ms both;
}

@keyframes aume-rise {
  0%   { opacity: 0; transform: translateY(48px) scale(0.94); }
  100% { opacity: 1; transform: translateY(0)    scale(1.00); }
}
@keyframes aume-hairline {
  0%   { width: 0; }
  100% { width: 96px; }
}
@keyframes aume-tag-rise {
  0%   { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .v2-hero__brand,
  .v2-hero__hairline,
  .v2-hero__tag { animation: none; opacity: 1; transform: none; }
  .v2-hero__hairline { width: 96px; }
}
```

### 11.2 Markup

```astro
<section class="v2-hero" data-bg-video-host>
  <video
    class="v2-hero__video bg-video"
    data-bg-video
    autoplay muted loop playsinline preload="metadata"
    poster={heroVid.poster}
    disablepictureinpicture disableremoteplayback
    aria-hidden="true"
  >
    <source src={heroVid.src720} type="video/mp4" media="(max-width: 768px)" />
    <source src={heroVid.src} type="video/mp4" />
  </video>
  <div class="v2-hero__vignette" aria-hidden="true"></div>
  <div class="v2-hero__copy">
    <h1 class="v2-hero__brand">aumé</h1>
    <span class="v2-hero__hairline" aria-hidden="true"></span>
    <p class="v2-hero__tag">From the Earth · At First Light</p>
  </div>
</section>
```

---

## 12. Existing infrastructure already in place — do not rebuild

- **Asset pipeline** (`scripts/process-assets.mjs`) — auto-detects system ffmpeg via Gyan.FFmpeg installed via winget. Re-runs idempotently. Already gracefully degrades if marketing folder is missing (CI/Render).
- **Scroll budget verifier** (`scripts/measure-scroll.mjs`) — extend its ROUTES array.
- **Perf trace** (`scripts/perf-trace.mjs`) — extend its ROUTES array.
- **Render deploy** — auto-deploys on push to `main`. `render.yaml` already in repo. `npm ci && npx astro build` is the build command.
- **Git** — local repo configured, `origin` set to `https://github.com/ranvijaysingh369/Aume-Marketing.git`, credentials cached.

---

## 13. The kickoff phrase the user will use to start the new session

> *"Read aume-website/docs/v2-build-brief.md and build the v2 prototype.
> The mountain hero video is at `aume hero page video.mp4` in the marketing
> folder. Ghee tile video is not yet delivered — use the placeholder per the
> brief. Invoke every relevant skill from the inventory. Blow my mind."*

When the new session sees this, it should:
1. Read this brief end-to-end
2. Read the three reference docs (questionnaire + game plan v2 + blueprint)
3. Read v1 source for patterns
4. Invoke the skills listed in §3 in order
5. Execute the build sequence in §6
6. Pass every gate in §7
7. Push and report
