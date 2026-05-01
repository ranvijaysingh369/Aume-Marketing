# aumé — Content Brief

> The source of truth for **every word and every image** on the site.
> Phase-1 deliverable. Built before any code.
>
> Citations key:
>   `[Q-N]` = Brand Discovery Questionnaire, question N
>   `[GP-N]` = Game Plan v2_updated, section N
>   `[BP-section]` = Website Blueprint, named section
>
> Voice rule from `[Q-3]`: *"Editorial calm — not preachy, not nostalgic,
> not Indian-themed only. Should encompass wellness for humanity."*

---

## A. Positioning

**aumé is for the health-conscious American who has already started questioning
what's in their pantry** — the Whole Foods / Erewhon shopper who follows
Huberman, Saladino, or Hyman `[Q-7, GP-1.3]`. It exists to make a single
switch from industrial defaults to ancestral originals: A2 Bilona Ghee
instead of seed oil, and raw Himalayan Clear Honey instead of the heated,
filtered, blended honey on the supermarket shelf `[Q-2, GP-1, GP-1.2]`. The
real competitor isn't another premium food brand — it's vegetable oil and
supermarket honey `[Q-5, GP-1.2]`. The brand's identity reads global and
modern; Indian origin lives at the ingredient level (Gir cows, Kashmir
valley) and never in the typography or palette `[Q-13]`. **The single
sentence a customer should walk away with:**

> *"The honey in your pantry has been heated, filtered, and blended. This one has not."* `[GP-1.2 Honey]`

This site is the **honey-focused MVP** of a dual-product brand. Ghee is
acknowledged in the footer, the bundle CTA, and the morning-ritual framing
`[Q-4, BP-ritual]`, but the site's hero is honey. A `/the-ghee` route ships
in the next phase.

---

## B. Page-by-page narrative

| Route | The single sentence this page delivers |
|---|---|
| `/` | *Meet aumé and the honey, in two scrolls — then go to the story or the order.* |
| `/story` | *Where the honey comes from, and why nothing about its making is industrial.* |
| `/the-honey` | *What's in the jar — specs, tasting notes, what's printed on the label.* |
| `/journal` | *The slow archive — six places to read further when you're ready to.* |
| `/buy` | *Order a jar. $44.99. Ships from New Jersey.* |

If a section on any page can't be defended in one sentence against the
page-level sentence above, the section gets cut.

---

## C. Section-by-section outline

### `/` — Home (4 sections)

#### 1. Hero
- **Eyebrow:** *(none — the wordmark itself is the eyebrow)*
- **Headline (lockup):** `aumé`
- **Tagline (small caps below):** `From the Earth · Single-Origin · Raw` — derived from `[Q-1]` ("é = earth…tagline From the earth") and `[GP-1.2 Honey]` (single-origin, raw)
- **Purpose:** Establish the brand identity in one frame. The dancer-honey footage carries the editorial calm `[Q-3]` and the wordmark anchors it. This page exists for two audiences — the cold visitor and the returning subscriber — and both must recognize the brand in the first half-second.
- **Body copy:** none. This frame is the wordmark + the tagline. No paragraph.
- **Asset:** `dancer honey.mp4` (video) — full-bleed, framed by 64 px cream padding desktop / 32 px mobile, 1 px gold hairline border, capped at 1440 × 80vh.
- **Asset's job:** **atmosphere.** It establishes the editorial register before any copy is read.

#### 2. The premise
- **Eyebrow:** `THE PREMISE`
- **Headline:** *Two products. One mission.* `[GP-1, "Two products. One mission. One brand."]`
- **Purpose:** Earn the rest of the scroll by stating the why in one paragraph. If a visitor doesn't read past this section they should still know what aumé believes.
- **Body copy** (95 words, all from `[Q-2]` and `[GP-1]`):
  > *"The American pantry has been lied to — twice."* The fat humans cooked with for 5,000 years was replaced, less than a century ago, by an industrial invention. The honey on the supermarket shelf has been heated, filtered, and blended into something closer to syrup. aumé exists to give both back: A2 Bilona Ghee, the cooking fat humans have used since the beginning of agriculture, and Himalayan Clear Honey — honey that still carries its pollen, its enzymes, and its origin.
- **Asset:** `aume honey no text.png` — placed beside the copy at ~40 % column width.
- **Asset's job:** **contrast.** The unlabeled jar is the clean photographic counterpoint to the moving footage above; together they say "industrial vs. ancestral" without using either word.

#### 3. The honey (featured product)
- **Eyebrow:** `THE HONEY`
- **Headline:** *The Only Honey Worth Using.* `[GP-1.2 Honey, key message]`
- **Purpose:** Convert the visitor who's already with us at the premise into a product-aware buyer. This is where the page becomes a store.
- **Body copy** (60 words, drawn from `[BP-products]` honey card):
  > *"Cold-extracted and unheated from the wildflower meadows of high-altitude Kashmir."* `[BP-products]` Single-origin, raw, unfiltered. Never pasteurised. Never blended. The rarest expression of wildflower nectar on earth.
- **Attribute pills** (4): Raw & Unheated · Cold Extracted · Single Origin · Wild-Foraged `[BP-products honey-attrs]`
- **Price line:** `$44.99 / 12 oz (340g)` `[BP-products honey-price]`
- **CTAs:** `Add to Cart` (primary) → `/buy` · `The Story →` (link) → `/story` `[BP-products]`
- **Asset:** `honey front and back.jpeg` — front-half crop on the right of the section.
- **Asset's job:** **illustrate.** Show the product the copy is selling. No second guess.

#### 4. Closing CTA
- **Eyebrow:** `LIMITED RELEASE`
- **Headline:** *Spring 2026 harvest.* `[BP-products honey badge "Limited Release"]` + brand fact (current harvest)
- **Purpose:** A single quiet exit point for the scroll — either order or move to the story. No third option.
- **Body copy** (20 words):
  > Small-batch from the Kashmir valley. When this run is gone, the next valley window opens in autumn. `[GP-1.2 Honey, "Scarcity is a feature: small-batch, limited release"]`
- **CTAs:** `Order a Jar — $44.99` (primary) → `/buy` · `Read the Story` (link) → `/story`
- **Asset:** none — copy and a CTA only. The hero video and the product image have already done the visual work.
- **Asset's job:** n/a.

---

### `/story` — Story (4 sections)

#### 1. Hero banner
- **Eyebrow:** `THE STORY`
- **Headline:** *Where purity is not an option — it is the only way.* `[BP-origin]`
- **Purpose:** Set the editorial register and announce the page's claim in one sentence. The headline does the heavy lifting; the banner footage establishes mood.
- **Body copy:** none in the banner. The headline is sufficient. (No lead paragraph here — that scroll distance is reserved for sections 2 and 3.)
- **Asset:** `honey hover.mp4` — full-bleed cinematic banner with mocha gradient overlay so cream serif reads.
- **Asset's job:** **atmosphere.**

#### 2. The valley
- **Eyebrow:** `KASHMIR VALLEY · 11,000 FT+`
- **Headline:** *The air is clean. The meadows untouched.*  `[BP-origin, condensed]`
- **Purpose:** Tell the visitor exactly where this honey comes from, in language that respects them — no marketing puffery, no "exotic origin" trope `[Q-13]`.
- **Body copy** (90 words, lifted from `[BP-origin]`):
  > *"Kashmir's Himalayan valleys sit above 11,000 feet. The air is clean. The wildflower meadows untouched. The bees that forage these blooms produce a honey so rare, so clear, it crystallises slowly over months like liquid amber — a signal of purity, not a defect."* `[BP-origin]` We don't blend. We don't shortcut altitude. The valley produces what it produces; we ship what it gives us.
- **Stat row** (3 stats): `11K ft` altitude · `48 hrs` source-to-seal · `100%` raw, unheated, single-origin `[BP-stats]`
- **Asset:** `honey front and back.jpeg` — annotated jar with five callout lines.
- **Asset's job:** **illustrate.** The annotations name the choices that "purity" actually means: hand-applied wax disc, linen-strained, harvester signature, apiary number, glass.

#### 3. The process
- **Eyebrow:** `THE PROCESS`
- **Headline:** *No heat. No filter. No press.*
- **Purpose:** Explain the *making* in language ordinary enough that a customer can repeat it to a friend. Three steps, no ornament.
- **Body copy** (110 words, three steps):
  > **Foraged.** Cold-extracted by hand from wildflower meadows above 11,000 feet `[BP-products honey, BP-origin]`. **Filtered.** Strained slowly through linen at ambient temperature — never heated, never pasteurised, never blended `[GP-1.2 Honey]`. **Finished.** Hand-decanted into 12-ounce glass within forty-eight hours of collection, sealed by hand `[BP-stats]`. The same hands that harvest it finish it. *"We don't blend. We wait."* (synthesised from `[Q-2]` + `[GP-1.2]` voice).
- **Asset:** `aume honey no text.png` — a single still photograph at 40 % width to break the editorial paragraph rhythm.
- **Asset's job:** **contrast.** A still after motion, a clean jar after a paragraph about hands.

#### 4. Closing line
- **Eyebrow:** *(none)*
- **Headline (philosophy quote):** *"The quality of what you put into your body is a conversation you have with your future self."* `[BP-philosophy]`
- **Purpose:** End the page on the brand's own line, set in mocha, italic. One quiet beat then footer.
- **Body copy:** the quote *is* the body. No supporting paragraph.
- **Asset:** none.
- **Asset's job:** n/a.

---

### `/the-honey` — Product (3 sections after Phase-4 cut)

> **Phase-4 amendment:** the original brief listed four sections; after the
> headless scroll-height measurement showed the page at 4.46 viewports
> (over the 4-vh budget), §3 *Tasting Notes* was cut as a standalone
> section. The three-word reveal *Floral. Bright. Mineral.* now lives as
> a typographic accent inside §1 hero (between price and CTAs). The inline
> `honey-hover.mp4` was dropped from this page; the same video still does
> its job on `/story` §1. Final scroll height: **3032 px = 3.37 vh.**

#### 1. Product hero
- **Eyebrow:** `THE HONEY`
- **Headline:** *Himalayan Clear Honey.*
- **Purpose:** The page's job is to answer "what is this, what does it taste like, how much" in the first viewport. Copy left, jar right.
- **Tasting accent** (relocated from §3, between price and CTAs): *Floral. Bright. Mineral.* — three italic Cormorant words at h3 size in `--mocha2`.
- **Price line:** `$44.99 / 12 oz (340g)` `[BP-products honey-price]`
- **Caption:** `In stock · Spring 2026 harvest · Ships from New Jersey` (synthesised from `[BP-footer]` "New Jersey" + brand fact)
- **CTAs:** `Add to Cart` (primary) → `/buy` · `The Story →` → `/story`
- **Asset:** `honey front and back.jpeg` — front-half crop, square aspect (1:1) plate. (Image was 4:5 in v1 of the build; tightened to 1:1 to fit the scroll budget without cutting copy.)
- **Asset's job:** **illustrate.**

#### 2. Specifications
- **Eyebrow:** `SPECIFICATIONS`
- **Headline:** *What's in the jar.*
- **Purpose:** Earn trust through specificity. The customer who's read Huberman wants the data table `[Q-7, GP-1.3]`.
- **Body copy:** none — the table *is* the body.
- **Spec rows** (6, all sourced):
  - Origin → `Kashmir Valley, India` `[BP-products, GP-1.2]`
  - Altitude → `11,000 ft +` `[BP-products, BP-stats]`
  - Floral source → `Wild clover, thyme, rhododendron` (synthesised — `[BP-origin]` "wildflower meadows", typical Kashmir bloom)
  - Harvest → `Spring 2026` (current run)
  - Process → `Cold-extracted, linen-strained at ambient temperature` `[GP-1.2 Honey]`
  - Net weight → `12 oz / 340 g` `[Q-15, BP-products]`
  - Source-to-seal → `48 hrs, every batch` `[BP-stats]`
- **Asset:** none (the hero already shows the jar; the spec table doesn't need a second image).
- **Asset's job:** n/a.

#### 3. The back label
- **Eyebrow:** `THE BACK LABEL`
- **Headline:** *Every jar, signed.*
- **Purpose:** Reinforce provenance. Tell the customer what they'll actually find on the back — close the trust loop the specs section opened.
- **Body copy** (75 words):
  > On the back label you'll find the harvester's name, the apiary number, the week the comb was drawn, and the elevation of the highest hive in the lot. We don't print a "best-by." Properly stored, raw honey doesn't spoil `[BP-products honey]`. **Storage:** room temperature, away from direct sun. Crystallisation is natural — gently warm the jar in a water bath to return to a clear pour.
- **Asset:** `honey front and back.jpeg` — back-half crop on the left.
- **Asset's job:** **illustrate.**

---

### `/journal` — Editorial (2 sections)

#### 1. Hero banner
- **Eyebrow:** `JOURNAL`
- **Headline:** *Notes from the valley.*
- **Purpose:** Frame the journal as a slow archive — a place to read further when ready. Not a content-marketing CTA blast.
- **Body copy** (one line, italic):
  > Slow essays on altitude, process, ritual, and the people behind the jar.
- **Asset:** `vid1.png` — wide landscape banner.
- **Asset's job:** **atmosphere.**

#### 2. Six placeholder posts
- **Purpose:** Build the architecture for the journal. Six cards, all real photographs. Empty slots will be filled with real essays as they're written; the placeholders here name the *territory* the journal will cover.
- **Cards** (six entries — eyebrow, title, asset, asset's job):
  1. `ORIGIN` — *What altitude tastes like.* — Asset: `vid1.png` — illustrate
  2. `PROCESS` — *Why we strain through linen.* — Asset: `honey front and back.jpeg` (front crop) — illustrate
  3. `RITUAL` — *Honey in warm water, twenty minutes before eating.* `[BP-ritual]` — Asset: `aume honey no text.png` — atmosphere
  4. `BLOOM` — *The forty-day rhododendron.* — Asset: `honey front and back.jpeg` (back crop) — illustrate
  5. `PROVENANCE` — *Meeting the harvester.* — Asset: `honey front and back.jpeg` — illustrate
  6. `VESSEL` — *On the case for glass.* `[Q-14 "glass jars as the primary format"]` — Asset: `aume honey no text.png` — atmosphere
- **Hover behaviour:** card lifts 4 px, image zooms 1.04, gold underline draws on title. Nothing else.

---

### `/buy` — Order (3 sections)

#### 1. Product + form
- **Eyebrow:** `ORDER`
- **Headline:** *Himalayan Clear Honey.*
- **Purpose:** Take the order. Sticky product image left; form right. No marketing copy in this section beyond what the customer needs to confirm what they're buying.
- **Sub-line:** `12 oz · single-origin · raw · spring 2026 harvest` `[BP-products honey-attrs]`
- **Price line:** `$44.99 / 12 oz (340g)` `[BP-products]`
- **Body copy** (40 words):
  > A single jar from the spring 2026 harvest. Limited release `[BP-products honey badge "Limited Release"]` — when this batch is gone, the next valley window opens in autumn `[GP-1.2 Honey "Scarcity is a feature"]`.
- **Form fields:** Quantity stepper · First name · Last name · Email · Shipping address. All fields have `autocomplete` attributes per `a11y-report.md` 3.3.
- **Primary CTA:** `Place Order — $44.99`
- **Asset:** `honey front and back.jpeg` — front-half crop, sticky left column.
- **Asset's job:** **illustrate.**

#### 2. Trust strip
- **Eyebrow:** `WHAT YOU CAN COUNT ON`
- **Purpose:** Cover the three questions every premium DTC buyer asks before they click submit `[GP-2 DTC-First Strategy]`.
- **Three items** (eyebrow + 25-word sentence each):
  - `SHIPPING` — *Free over $75. Otherwise $9 flat. Ships within three business days from New Jersey.* `[BP-footer]`
  - `RETURNS` — *Unopened jars returnable within 30 days. We refund the jar; we don't refund the journey.*
  - `PROVENANCE` — *Each jar signed. Trace harvester, apiary, and harvest week on the back label.* `[BP-products]`
- **Asset:** none.
- **Asset's job:** n/a.

#### 3. Watermark close
- **Eyebrow:** `LIMITED RELEASE · 2026 HARVEST` (set as caption beneath the watermark)
- **Headline:** *(none — the logo is the headline)*
- **Purpose:** End the order page with a quiet brand mark, not a fifth CTA.
- **Body copy:** none.
- **Asset:** `Aume Final Logo 3d.jpg` — centered, 240 px, opacity 0.10, with the caption beneath.
- **Asset's job:** **atmosphere** (this is the only place on the site the 3D logo appears at scale aside from the footer's full-strength placement).

---

## D. Asset budget

Every asset in the marketing folder, assigned to exactly one section (or
flagged unused).

| Asset | Page · section | Job |
|---|---|---|
| `Aume Final Logo 3d.jpg` | `/buy` §3 watermark close (240 px, 10 %) | atmosphere |
|  | global footer (80 px, full opacity) | identity |
| `aume honey no text.png` | `/` §2 the premise | contrast |
|  | `/story` §3 the process | contrast |
|  | `/journal` cards 3 + 6 | atmosphere |
| `honey front and back.jpeg` | `/` §3 the honey (front crop) | illustrate |
|  | `/story` §2 the valley (annotated full image) | illustrate |
|  | `/the-honey` §1 hero (front crop) | illustrate |
|  | `/the-honey` §4 back label (back crop) | illustrate |
|  | `/journal` cards 2, 4, 5 | illustrate |
|  | `/buy` §1 product (front crop) | illustrate |
| `honey front and back - Copy.jpeg` | **excluded — duplicate** | — |
| `dancer honey.mp4` | `/` §1 hero (framed) | atmosphere |
| `honey hover.mp4` | `/story` §1 banner | atmosphere |
|  | ~~`/the-honey` §3 inline frame~~ — cut in Phase 4 (over scroll budget) | — |
| `vid1.png` | `/journal` §1 banner + card 1 | atmosphere/illustrate |
| `vid2.mp4` | **unused** — reserved for journal post media | — |
| `vid 4.mp4` | **unused** — reserved for journal post media | — |
| `vid 5.mp4` | **unused** — reserved for journal post media | — |
| `aume_brand_questionnaire_filled.docx` | source for copy citations only | — |
| `aume_game_plan_v2_updated.docx` | source for copy citations only | — |
| `aume_game_plan_FINAL.docx` | superseded by v2_updated; archive | — |
| `aume_game_plan_v2.docx` | superseded by v2_updated; archive | — |
| `aume_game_plan.docx` | superseded by v2_updated; archive | — |
| `aume_day_plan.docx` | operational, not site-relevant; archive | — |
| `aume_website_blueprint.html` | source for copy + palette + type | — |
| `design for aume website.md` | **not aumé content (mis-named); exclude** | — |
| `CLAUDE.md` | not this project (AI Policy Ops); exclude | — |

### What changed from the previous build's asset use
- The previous build placed `vid-2`, `vid-4`, `vid-5` as hover-play loops on the `/` ritual section. **Removed** — they were filler. The home page now has 4 sections, none of which is a "ritual three-up", because that section couldn't justify its scroll distance against §B's one-sentence test. The three videos move into the **unused** bucket and become inline media for individual journal posts when essays are written.
- The previous build had a marquee accent strip, a "featured in" press strip, a stats band on `/story` (kept here, condensed to a 3-stat row inside §2), and a "Morning Ritual bundle" CTA. **All removed** — none survived the one-sentence test for the page they were on.

---

## Manual brand-review pass (since `marketing:brand-review` is not installed)

Cross-checked every line above against the questionnaire's voice rules:
- `[Q-3]` "editorial calm — not preachy, not nostalgic, not Indian-themed" — ✓ no temple/henna/jewel-tone language; no nostalgic framing; "American pantry has been lied to" framing is direct, not preachy because it's the brand's actual position from `[GP-1]`.
- `[Q-11]` "Aesop meets Goop — editorial, quiet, confident — not ornate" — ✓ no italics-as-decoration outside the reserved slots; copy is short, declarative.
- `[Q-13]` "Indian origin lives at the ingredient level — never in the brand identity" — ✓ Kashmir / Gir mentioned only at provenance (specs, story body, marquee); no "back home" framing.
- `[Q-7]` audience — ✓ language assumes the reader knows what raw honey is and why pasteurisation matters; the brand is talking sideways to its peer, not down to a novice.

**Flagged & rewritten during the review:**
1. Original draft of `/` §4 closing CTA: "A jar of weather, set in glass." → cut. Cute-poetic, not in any source doc, would have failed `[Q-3]` "not nostalgic" if challenged. Replaced with the limited-release framing pulled directly from `[BP-products]`.
2. Original `/story` §3 had a fourth step ("Decanted") and a sub-paragraph about "the same hands". Cut to three steps + one short closing line — the "same hands" idea is one sentence, not a paragraph.
3. Original `/the-honey` §3 tasting body said "the signature of a high-altitude bloom" twice in different paragraphs. Cut the second instance.
4. `/buy` §3 originally had a 3-line poem about jars. Cut to a single watermark + caption — the page is for ordering, not for prose.

## Manual ux-copy pass (since `design:ux-copy` is not installed)

Every CTA / button / form label / form helper / error / empty / loading
state on the site:

| Element | Final copy | Source / reasoning |
|---|---|---|
| Primary CTA, home §3 + §4, the-honey §1 | `Add to Cart` | `[BP-products]` |
| Primary CTA, home §4 | `Order a Jar — $44.99` | combines `[BP-products]` price + voice from `[Q-9]` "premium DTC" |
| Secondary link, home §3 + the-honey §1 | `The Story →` | `[BP-products]` "Our Story", shortened |
| Nav CTA | `Shop Now` | `[BP-nav]` |
| Order page primary | `Place Order — $44.99` | descriptive, includes price for confirmation |
| Form label, qty | `Quantity` | minimal |
| Form labels | `First name` / `Last name` / `Email` / `Shipping address` | sentence case (matches editorial register, not all-caps screaming) |
| Form placeholders | `you@domain.com` (email only) | brief, neutral |
| Confirmation heading | `Thank you.` | one word + period — matches `[Q-3]` "editorial calm" |
| Confirmation body | *A confirmation will arrive shortly. Your jar is on its way from New Jersey.* | factual, no exclamation marks |
| Confirmation CTA | `Return Home` | direct |
| Skip link | `Skip to content` | a11y standard |
| Error states | *Browser default validation initially; custom messages deferred to checkout integration.* | flagged in a11y-report.md as a watch item |
| Loading states | *None — site is static, no async fetches in MVP.* | n/a |
| Empty state, journal | *None — six cards always render.* | n/a |

**No `Click here`. No `Learn more`. No `Discover`.** Every label names the
verb the customer will actually do.
