# Design: Altitude

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial,
`DESIGN.md` at the project root) and changes only how they look. Files missing here come from
`templates/` and the theme package.

- **Reference:** Refero style "Mercury — Mountain Top Command Center" (mercury.com) and the
  real mercury.com home, pricing and VC-funds pages: their layout, type, colour roles and
  interactions. Not a copy of that brand: no logo, name, product shots or copy.
- **Files:** `src/css/altitude.css` (role tokens and the rules utilities can't express),
  `templates/` (overrides, same paths as the theme), built into `web/designs/altitude/`.
- **Preview:** `?design=altitude` (Dev Mode) or `bash scripts/design.sh preview altitude`.
- **JavaScript:** none of its own. Interactions use what every page already loads: Alpine
  (`x-data` in the templates), Swiper (`data-swiper-options`) and CSS (scroll-driven
  animations). Nothing here touches the shared site JS, so other designs are unaffected.

## Reference lock

| Keep | Rule |
|---|---|
| Night canvas | Midnight `#1e1e2a` page, Graphite `#272735` cards and alternates, Abyss `#171721` for "dark" sections and the footer. Depth is a surface step, never a shadow |
| Light interludes | A section the CMS gives the Aged Paper background becomes the reference's pale canvas `#f7f7f9` with ink text; everything else stays night |
| One blue, buttons only | `#5266eb` fills primary buttons (white text 4.9:1). Never text, never decoration. Secondary actions are a `#cdddff` tint pill |
| Regular-weight type | Inter everywhere; headings 450, nothing above 500, no tracked capitals, no italic word swaps |
| Pills and hairlines | Buttons, inputs and chips are pills; cards and media 12px (16px large); rows split by 1px hairlines |

**Reject:** shadows, bold or uppercase labels, a second accent colour, blue text, cream canvas.

## Role tokens

| Role | Altitude | Editorial |
|---|---|---|
| `surface` / `surface-alt` / `surface-dark` | `#1e1e2a` / `#272735` / `#171721` | Parchment / Aged Paper / Ink |
| `line` | `#3a3a4a` | Warm Taupe |
| `text-strong` / `text-body` / `text-muted` | `#ededf3` / `#c3c3cc` / `#a2a3ae` | Ink / Charcoal / Graphite |
| `primary` / `on-primary` | `#5266eb` / `#ffffff` | Terracotta / Parchment |
| `accent` (eyebrows, icon lines) | `#c3c3cc` (silver) | Terracotta |
| neutral ramp | inverted (50 = night … 950 = near white) | warm greys |

## Templates it replaces

| File | Altitude's version |
|---|---|
| `_includes/header/simpleHeader.twig` (+ the other three layouts include it) | Full-width bar, transparent over a banner, night with a hairline once scrolled; blue CTA pill |
| `_includes/hero-banner/sliderLayout3.twig` (+ layouts 1/2), `_copy.twig`, `_list.twig` | Full-height photo under a night wash, headline in the upper third, buttons in one translucent capsule, stats as a slim bar; slow drift, crossfade, progress-bar pagination |
| `_includes/page-banner/standard-banner.twig` | Every banner with an image is the reference's inner-page opening: centred headline, lead, buttons, the image wide and rounded below |
| `_components/header-content-block.twig` | Section heads: left heads under a hairline at a medium size, centred heads larger; quiet sentence-case eyebrow |
| `_components/listing-filter.twig` | Pill search field, pill category chips on a hairline |
| `_components/_testimonials/testimonialCard.twig` | Quote card: first sentence strong, rest muted, person under a hairline |
| `_blocks/ourProcess.twig` | Media tiles (horizontal cards), the same tiles as a slider (timeline), numbered hairline rows (vertical/zigzag) |
| `_blocks/testimonials.twig` | Slider: the reference's centred quote carousel with progress bars; grid: quote cards |
| `_blocks/accordion.twig` | The site's block, except "With changing image": the reference's feature list (rows between hairlines, pinned image panel that crossfades) |
| `_includes/header/_parts/sidebar.twig` | The Theme's mobile/sidebar menu with the logo printed inline (so it takes the night colours) |

Restyled in `altitude.css` on the theme's markup (CMS options and JS hooks unchanged): buttons
(every colour option), cards of every listing, image with text (photo inset on a tile),
pricing (one panel split by hairlines, the recommended plan's button blue), compare table,
logo wall (plain starlight row), closing CTA (centred statement), footer, sliders (thin bars),
logo recolour, white boxes inside blocks (Graphite on night), main menu dropdowns (Graphite
panels, rows that light up, a compact two-column mega panel), filter pills as the reference's
underlined tabs, slider arrows (one round Graphite button everywhere), universal card tags and
overlay buttons, page banner (buttons in a capsule, image in a soft framed panel).

## Interaction

- Scroll reveal on section heads and cards; hero parallax and copy fade; large images settle
  from a slight zoom. CSS scroll-driven animations, static where unsupported.
- Every animation is off under `prefers-reduced-motion`.
- Slider progress bars fill over the autoplay delay and pause on hover.

## QA

`?design=altitude` on every page at 1440 and 390px: no Twig errors, failed requests, broken
images or horizontal scroll (`~/my-project/.site7-browser-tests/qa.js`). Check `/blocks` for every
block in every style, and that Default and Harbor render unchanged.
