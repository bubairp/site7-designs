# Design: Folio

> **Status: built, 0.1.0 (2026-11-02), not published.** Direction approved by the user.
> Research and references: [`docs/DESIGN_RESEARCH.md`](../../docs/DESIGN_RESEARCH.md) in
> Site7 Engine. Build: `bash scripts/design.sh build folio`; preview `?design=folio`.

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial,
`DESIGN.md` at the project root) and changes only how they look. Files missing here come
from `templates/` and the theme package.

**One sentence:** a printed monograph for studios and serious businesses: a stone-grey
page, slab headlines in one condensed grotesk, hairline rules instead of boxes, raw
rectangular photography, and one signal yellow that only ever means "do this".

- **For:** agencies, architects, interior and product studios, consultancies, premium trades.
- **Reference:** a synthesis of Refero styles Yllw (primary), Brex, Dash Digital Studio,
  Pentagram and VALIENTE BRANDS. Not a copy of any of them: no logos, names, copy or exact
  palettes.
- **Files:** `frontend/src/css/folio.css` (role tokens + rules Tailwind can't express),
  `frontend/src/js/folio.js` (motion, scroll scenes, drafting grid, wordmark fit),
  `templates/_includes/header/index.twig` (no glass header),
  `templates/_includes/footer/basicFooter.twig` (Carbon, wordmark),
  `templates/_includes/hero-banner/sliderLayout3.twig` (slab with inline image + plate),
  built into `web/designs/folio/`.
- **Packages** (`frontend/package.json`, exact versions): `@fontsource-variable/archivo`
  5.3.0 (width axis, OFL), `motion` 12.23.24 and `gsap` 3.13.0 (ScrollTrigger). Only
  `folio.js` imports the last two, so other designs don't load them.

---

## 1. Reference lock

| Keep | Rule |
|---|---|
| Stone canvas | Every page sits on Stone `#d4d1c4`. Not white, not cream. Paper `#ffffff` is a lifted sheet (cards, forms, the CMS "alt" background); Carbon `#191919` frames dark sections and full-bleed media |
| One grotesk, two widths | Archivo only. Display headings condensed (`wdth` 68), weight 500, line-height 0.9, tracking −0.02em to −0.03em. Everything else normal width (`wdth` 100), weight 400; 500 for labels, buttons and names. Never 600+ |
| Slab headlines | Hero and page titles are uppercase slabs (line-height 0.88–0.92). Section titles are sentence case, condensed, line-height 0.95. No italic, no serif, no coloured word swaps |
| Signal = action | Signal Yellow `#ffdd00` fills the primary button and the announcement bar. Nothing else: never text, never an icon, never a section background, never a decorative shape |
| Hairlines, not boxes | Lists (services, FAQ, clients, specs, footer links) are rows split by 1px Ink rules. Cards are flat Paper sheets, 4px radius, no border, no shadow |
| Raw rectangles | Photos at 0px radius, no overlay, no duotone, no rounded masks. A wash is allowed only where white text sits on a photo (banner covers), and then only a flat Carbon 45% |

**Reject:** shadows, glows, gradients, blur/glass, pills, radius above 4px, a second accent,
yellow text, blue or green anywhere in the chrome, centred long-form text, thin (300) display
type, all-uppercase body copy.

## 2. Role tokens

| Role | Folio | Editorial |
|---|---|---|
| `surface` | Stone `#d4d1c4` | Parchment |
| `surface-alt` | Paper `#ffffff` | Aged Paper |
| `surface-dark` | Carbon `#191919` | Ink |
| `line` | Ink `#0d0d0d` (rules) | Warm Taupe |
| `line-soft` | Dust `#a9a697` (decorative dividers only) | — |
| `text-strong` / `text-body` / `text-muted` | `#0d0d0d` / `#1f1f1c` / `#4d4b44` | Ink / Charcoal / Graphite |
| `on-dark` / `on-dark-muted` | Sheet `#f4f3ee` / `#a3a196` | Parchment |
| `primary` / `on-primary` | Signal `#ffdd00` / Ink `#0d0d0d` | Terracotta / Parchment |
| `accent` | Ink `#0d0d0d` (eyebrows, active states, icons) | Terracotta |

Contrast (WCAG): Ink on Stone 12.7:1 · body on Stone 10.8:1 · muted on Stone 5.7:1 · Ink on
Signal 14.4:1 · Sheet on Carbon 15.8:1 · muted on Carbon 6.8:1. **Signal on Stone is 1.1:1**,
which is why yellow is never text and a yellow button on Stone always carries a 1px Ink stroke.
Dust is below 3:1, so it never marks an input or a control; inputs use Ink.

`accent` is Ink on purpose: Folio's eyebrows, active links and icons are typographic, not
coloured. A CMS colour set on a block still wins.

## 3. Typography

Archivo variable. `font-variation-settings: "wdth" 68` for display, `"wdth" 100` elsewhere.

| Role | Size (phone / tablet / desktop) | Line height | Tracking | Width / weight / case |
|---|---|---|---|---|
| Display (home hero) | 56 / 96 / 152px | 0.88 | −0.03em | 68 / 500 / uppercase |
| Page title (banners) | 44 / 72 / 104px | 0.9 | −0.025em | 68 / 500 / uppercase |
| h2 section title | 36 / 48 / 64px | 0.95 | −0.02em | 68 / 500 / sentence |
| h3 card / row title | 22 / 24 / 26px | 1.15 | −0.01em | 100 / 500 |
| Lead | 18 / 20 / 20px | 1.45 | −0.005em | 100 / 400 |
| Body | 16px | 1.6 | 0 | 100 / 400 |
| Meta / eyebrow | 12 / 13px | 1.3 | +0.04em | 100 / 500 / uppercase |
| Button | 14 / 15px | 1 | 0 | 100 / 500 |

Headings use `text-wrap: balance`, leads `text-wrap: pretty`. Body measure is at most 64ch.
Eyebrows are numbered where the block has an order (`01 — Services`); the number is part of
the eyebrow, not a separate decoration.

## 4. Layout and rhythm

- **Container:** 1360px including gutters; gutters 16 / 24 / 40px.
- **Grid:** 12 columns, 24px gap. Text blocks sit on 7 columns, left-aligned. Centred text
  only for short CTA titles.
- **Sections:** 64 / 88 / 120px top and bottom. A section head sits 32 / 48px above its content.
- **Rules:** a full-width 1px Ink rule opens each section on Stone (from the container's left
  edge to its right), with the numbered eyebrow sitting on it. This is Folio's visual signature
  on every page, not only the home page.
- **Bands:** light sections stay on Stone. CMS "alt" sections become Paper. CMS "dark"
  sections and the footer become Carbon. Never two Carbon bands in a row unless the CMS asks.

## 5. Shape, depth and imagery

| Element | Radius | Edge | Depth |
|---|---|---|---|
| Buttons, inputs, chips | 2px | 1px Ink stroke | none |
| Cards (Paper sheets) | 4px | none | surface change only |
| Photos, video, maps | 0px | none | none |

- **No shadows anywhere.** Hover is shown by an Ink rule, an underline or the plate reveal (§6).
- **Photography:** documentary, unprocessed, rectangular. Aspect ratios: 4:5 portraits, 3:2
  cards, 16:9 full-bleed. Missing images keep their slot (Stone-deep `#c6c3b4` plate with the
  alt text in meta type), never a gradient.
- **Icons:** stroke-only, 1.5px, Ink. The Theme's icon set stays; Folio only recolours and
  thins it. Arrows (→) and "+" are the only decorative glyphs.
- **Client logos:** monochrome Ink at 70% opacity, 100% on hover.

## 6. Motion and interaction

Purpose: make the page feel like a monograph being turned, not like a SaaS demo. Every
animation is transform/opacity/clip-path only and is skipped entirely under
`prefers-reduced-motion: reduce` (content renders in its final state). Each element is
animated by one library only.

**Motion (one-off reveals)**

| Interaction | Where | Spec |
|---|---|---|
| Headline line reveal | Hero slab (`.folio-slab`) | Each line rises out of a clip: `y: 105% → 0`, 0.7s, ease `[0.2, 0.7, 0.1, 1]`, 80ms stagger |
| Hero inline image | Home hero | Opens from the centre (`clipPath inset(0 50%) → 0`) after the lines land |
| Rule draw-in | Section-opening rule, service lists | `scaleX 0 → 1` from the left, 0.6s, CSS transition started on `inView` (amount 0.6) |
| Plate reveal | Card and banner photos | `clipPath inset(8% 0 0 0) → 0` plus `scale 1.04 → 1`, 0.8s, on `inView` |

**GSAP ScrollTrigger (scroll-linked, scrubbed)**

| Scene | Spec |
|---|---|
| Hero plate | Opens from a 6% side inset to full bleed (`top bottom` → `top 35%`, scrub 0.6); its photo drifts `yPercent -6 → 6` at scale 1.12 over the plate's whole pass |
| Banner cover | The cover photo drifts `yPercent 0 → 10` while the banner scrolls away |
| Footer wordmark | Rises `yPercent 45 → 0` out of the footer's bottom edge (scrub 0.6) |

**CSS and canvas**

| Interaction | Spec |
|---|---|
| Buttons | An Ink fill rises from the bottom edge (`background-size 100% 0 → 100%`, 0.38s); the label turns Signal (primary) or Stone; the primary arrow slides out right and back in from the left (`folio-arrow`, 0.45s). On dark sections the fill is Sheet |
| Hairline rows | Arrow moves 6px right and the title 4px, 0.2s |
| Drafting grid | A 48px hairline grid on a canvas behind the hero copy and the Carbon CTA band. With a mouse: the cell under the pointer (and its neighbours at 45%) fills with Dust and fades (×0.92 per frame), thin crosshair lines follow the pointer, a meta readout shows `X 24 · Y 08`. Touch and reduced motion: the still grid only. Draws only while active and on screen |
| Footer wordmark fit | The company name is sized to the container width on load, font load and resize (not motion) |

No scroll-jacking, no pinning, no parallax on text, no looping animation. Swiper and
Alpine behaviour from the Theme is unchanged.

## 7. Areas

As built. Blur, shadows and every radius above 4px are removed site-wide (header, menus,
search, blocks, footer), including what block markup sets with `rounded-*` / `shadow-*`
utilities; a radius set per block in the CMS still wins. Section heads follow the CMS
"align" option (centred heads keep the rule, the copy centres). Process steps keep the
Theme's card layout, squared, rather than the large-numeral version first planned.

| Area | Folio |
|---|---|
| Announcement strip | Full-bleed Signal Yellow, 36px, Ink 13px text, centred; the only yellow band |
| Header, all layouts | Solid Stone bar with a 1px Ink rule underneath; never glass, never over the banner. Wordmark left, menu as 14px text links (active = 1px underline offset 6px), header button = primary button |
| Primary button | Signal fill, 1px Ink stroke, 2px radius, 48px tall, Ink 15px/500 text and a → that moves 4px on hover |
| Secondary button | Transparent, 1px Ink stroke (Sheet stroke on Carbon); hover fills Ink with Stone text |
| Home hero (layout 3) | Left-aligned uppercase display slab over two or three lines, the CMS image set **inline between the words** (height = one line, 3:2), lead and buttons below on 7 columns; a full-bleed photo plate follows directly under the hero. Layouts 1 and 2: split, photo 4:5 at 0px radius beside the slab |
| Page banners | No image: slab title on Stone with eyebrow and lead, rule underneath. Cover: full-bleed photo with a flat Carbon 45% wash, Sheet text bottom-left (VALIENTE's media window) |
| Section heads | Rule, numbered eyebrow on the rule, condensed sentence-case h2 on the left 7 columns, optional lead on the right 4 columns from 1024px |
| Services / features list view | Hairline index rows: number, title (26px), one-line text, → at the right; the whole row is the link |
| Cards (blog, case study, portfolio, product, service) | Photo plate 3:2 on top (0px), meta row `CATEGORY · DATE` above the title, no card box on Stone; on a Paper section the card is a Stone sheet |
| Process steps | Large condensed numerals (`01`) in Ink at 64px, a rule under each step, no circles or icons in discs |
| Testimonials | Quote in condensed 32 / 40px, sentence case, Ink; name and role in meta type under a short rule; avatar 48px square (2px radius). No quote marks graphic |
| Stats | Numerals in condensed display (72 / 96px), label in meta type, columns split by vertical rules |
| CTA banner | Carbon band, slab title in Sheet, primary button; no box inside the band |
| FAQ | Hairline rows, "+" rotates to "×" (Alpine, existing), 200ms height animation |
| Forms | Paper sheet, inputs with 1px Ink stroke and 2px radius, 48px tall; focus = 2px Ink outline offset 2px; errors in Ink with a ⚠ glyph (no red fill) |
| Client logos | One row between two rules, monochrome (see §5) |
| Footer | Carbon. Link columns as hairline rows; the company name set across the full width in condensed display at the bottom (a solid Sheet slab, not faint) |
| Blog / case study detail | Slab title, meta row, full-bleed cover plate, body on 7 columns with a sticky facts column (hairline rows) on the right from 1024px |

Every CMS field, option and JS hook stays working: Folio restyles through role tokens and
overrides only the templates whose structure has to change (home hero layouts, page banner,
section head, list view, footer, header class).

## 7b. Structural layer (after user review, 2026-11-02)

The first build read as a recolour; the user asked for a structurally different design
with visible motion. `folio.css` "FOLIO LAYOUTS" (unlayered) rearranges the blocks, and
the head of every block changes:

| Area | Folio structure |
|---|---|
| Section head (every block) | A chapter opener whatever its CMS alignment: eyebrow and a running number "(03)" on one line, an uppercase condensed slab title on 8 columns, the lead on the right 4, bottom-aligned. No rule above it (the user found a rule on every block too much) |
| Services, grid view | Cards become a numbered index: one row per service, slab title, text beside it, arrow; hover floods the row with Ink and turns the title Signal |
| Process | Icon tiles hidden (they can carry an inline `!important` CMS colour); a large condensed numeral on a rule heads each step, in cards and timeline layouts |
| Testimonials | The first quote becomes a full-width uppercase pull quote that inks in word by word; the rest sit two per row under a giant quotation mark |
| Client logos | A single row becomes an endless band (cloned track, pauses on hover) |
| FAQ / accordion | Ruled rows on three columns: number, the question as a condensed slab, a drawn "+" that turns to "×" when open (the Theme's chevron is hidden); the answer hangs under the question at body size; hover nudges the question and turns the "+"; an open item gets a 2px rule |
| Blog listing (`.post-list`) | A numbered contents index: each story a row between Ink rules with a big number, a 4:3 photo and meta / slab title / excerpt / link; no boxed cards; full container width |
| Blog post body | Hanging heads: each heading sits sticky in the left four columns beside its text (right seven); images full width; a condensed drop cap opens the article; quotes are slabs between rules; lists use Ink squares and condensed numerals; comments and the end bar sit on the right column |
| Blogs, grid ("Journal") | A strip of tall 4:5 plates, each under a big condensed number on a rule, greyscale photos that take colour on hover. Three posts or fewer fill the row; with more, desktop pins the section and the strip slides left as you scroll (ScrollTrigger, only when the overflow is at least a quarter screen); phones swipe a snap row. (Replaced the feature-first grid, which the user disliked) |
| Case studies, 2 per row | Alternating 7 / 5 and 5 / 7 columns |
| Capability grid (Universal Card + CSS class `folio-capabilities`) | Inspired by the user's ClickUp reference ("All apps, AI agents and humans"), in Folio's own language: a full-bleed 8-column ruled grid that fades at both edges; custom items 1–4 are Paper feature tiles in a 2×2 centre block (greyscale photo, colour on hover, slab title, one line, "Explore →"); every other item is a capability tile (icon over a small label) that floods with Ink on hover. Scroll: the tiles drift in from scattered positions toward the centre ("under one roof"). Tablet 4 columns; phones 2×2 features and 3-per-row capabilities. `templates/_components/_universal-card/_variants/iconTop.twig` requests photos at 800px (the Theme asks for icon size). Any page can use it by adding the class to a Universal Card block |
| Team | Greyscale portraits that take their colour on hover |
| CTA | Slab title with a giant ticker of the same words sliding behind it on scroll |
| Desktop dropdown | Every dropdown, mega menus included: a full-width Carbon panel that opens like a blind (clip-path); left, the section's name and "06 pages"; right, three columns of numbered condensed-caps links that slide in one after another, underline and arrow on hover. folio.js closes it on pointer leave (the Theme's open state could stick with the full-width panel) |

Motion added with it (GSAP + SplitText): section titles rise word by word, leads ink in
word by word while they scroll (scrubbed), cards / rows / steps / quotes / logos enter in
staggered waves, photos drift inside their frames, dark bands open from a 5% side inset,
and a 2px reading line runs along the top. `/blocks` (86 blocks) builds hundreds of
triggers and needs a moment after load; ordinary pages are light.

## 7c. Impeccable critique fixes (2026-11-02)

A dual-agent critique (design review + detector) found, and this pass fixed:

- **Readability:** leads are no longer scrubbed faint (about 1.3:1 at rest); only the single
  pull quote inks in (from 30%, done by the upper third). Card/row reveals animate opacity
  only (never `visibility`), from 28px, and skip anything already above the fold, so screen
  readers, find-in-page and anchor jumps reach every item.
- **Motion budget:** photo drift cut to scale 1.06 / ±3% (faces stay in frame); title word
  rises faster; stats count up only for whole numbers of 10+ (no false "3.2/5" mid-count).
- **Hero:** stats were Parchment on Stone (invisible); now Ink condensed figures over
  small-caps labels, ruled columns. The h1 carries `aria-label` with the whole heading.
- **Long-form:** article and case-study body text capped at 68ch.
- **Pricing:** icons on the featured dark plan are Sheet (were Ink on Carbon), "not included"
  crosses are text-muted (were Dust), the decorative disc bullet is gone.
- **Leftover shapes:** hero eyebrow, share/back-to-top/drawer buttons, product and portfolio
  chips squared; decorative `bg-primary/10` tiles become Ink-stroked; slider bullets are
  2px bars; footer card logos greyscale; placeholders at text-muted.
- **Header:** menu items are uppercase labels with a superscript index (Services⁰¹) and an
  Ink underline that draws in on hover and stays on the current section; the dropdown panel
  shows the parent's name as a slab beside two columns of numbered links; its hover bridge
  is 18px so it no longer covers the neighbouring items.
- **Phone menu:** a Carbon sheet with numbered condensed-caps rows, white logo, gutter.

Known, not design: the 404 page shows Craft's dev-mode error locally (production uses the
template); the AI chat button (plugin) overlaps content at 390px; cover images on About and
Contact are AI-style illustrations, against "documentary photography" (content).

## 8. Decision ledger

| Decision | Source | Source rule / role | Why |
|---|---|---|---|
| Stone canvas, not white | Yllw (putty canvas) | Canvas = structural identity | Separates Folio from Harbor and Meadow (white) and from Editorial (cream) at first glance |
| Own stone hex `#d4d1c4` | Yllw, adapted | Same role, lighter and greyer | Not Yllw's exact colour; lighter keeps customer photos from looking muddy |
| Archivo, condensed display + normal body | Yllw / Pentagram (one family); our own move (width axis) | One family for every role | Keeps the one-family discipline but gives headlines a voice none of the other designs has; free licence |
| Weights 400/500 only | Pentagram | Hierarchy from size and tracking | Bold grotesk reads as a generic template |
| Uppercase slabs for hero and page titles only | Yllw, VALIENTE | Display role only | Uppercase body (VALIENTE) fails readability on customer copy |
| Yellow = primary action + announcement bar | Brex (accent rule) on Yllw's colour | Action-only accent | Yllw's muted putty button converts poorly; Brex shows a single accent works best as the action marker |
| Ink stroke on yellow buttons | Yllw (1px inset ink stroke) + contrast check | Edge for every control | Yellow on Stone is 1.1:1; the stroke keeps the button visible |
| Hairline index rows | Dash Digital (brand list rows), Yllw rules | Lists as rows, not cards | Premium, scannable, and different from every other Site7 card grid |
| 0px photos, 2px controls, 4px cards | Dash (0px images), Yllw (2px controls) | Sharp = editorial plate | Yllw's 6px cards softened to 4px to stay clearly away from Meadow's rounded look |
| Carbon for dark bands, media and footer only | VALIENTE (Midnight Frame), Pentagram (black bands) | Dark frames media; never a card | Keeps Folio light-first and clearly unlike Altitude |
| Inline image inside the hero headline | Yllw (hero) | Image as punctuation between words | The memorable move; built from the CMS hero image, so every site gets it |
| Numbered eyebrow on a full-width rule | Yllw (numbered process), Dash (meta rows) | Structure through type and rules | Gives every page the monograph feel, not just the home page |
| Motion: line reveal, rule draw, plate reveal | Craft (motion reference), official Motion skill | Transform/opacity only, once, reduced-motion off | Feels like turning pages; cheap to render; no scroll-jacking |

## 9. Decisions taken at approval (2026-11-02)

1. Name and handle "Folio" / `folio`.
2. Stone canvas kept at `#d4d1c4`.
3. Hero inline image only when the slide has an image (not a video) and a heading of two
   words or more; hidden below 768px, where the plate under the hero shows the photo.
4. `motion` added; later the user also asked for GSAP ScrollTrigger, a different button
   animation and an interactive graphic (the drafting grid), all in §6.
