# Design: Altitude

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial,
`DESIGN.md` at the project root) and changes only how they look. Files missing here come from
`templates/` and the theme package.

- **Reference:** Refero style "Mercury — Mountain Top Command Center" (mercury.com) and the
  real mercury.com home, pricing and VC-funds pages: their layout, type, colour roles and
  interactions. Not a copy of that brand: no logo, name, product shots or copy.
- **Files:** `frontend/src/css/altitude.css` (role tokens and the rules utilities can't
  express), `frontend/src/js/altitude.js` (Altitude's own interaction: the product quote's
  pointer drift), `templates/` (overrides, same paths as the theme), built into
  `web/designs/altitude/`.
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
| `_includes/header/simpleHeader.twig` (+ the other three layouts include it) | Full-width bar, transparent over a banner, night with a hairline after 24px of scroll (not at the banner's end; inline script); same width, height and 1px border in every state, dropdowns included; blue CTA pill |
| `_includes/hero-banner/sliderLayout3.twig` (+ layouts 1/2), `_copy.twig`, `_list.twig` | Full-height photo under a night wash, headline in the upper third, buttons in one translucent capsule, stats as a slim bar; slow drift, crossfade, progress-bar pagination |
| `_includes/page-banner/standard-banner.twig` | Every banner with an image is the reference's inner-page opening: centred headline, lead, buttons, the image wide and rounded below |
| `_components/header-content-block.twig` | Section heads: no rule above; left heads at a medium size, centred heads larger; quiet sentence-case eyebrow |
| `_components/listing-filter.twig` | Pill search field, pill category chips on a hairline |
| `_components/_testimonials/testimonialCard.twig` | Quote card: first sentence strong, rest muted, person under a hairline |
| `_blocks/ourProcess.twig` | Media tiles (horizontal cards), the same tiles as a slider (timeline), numbered hairline rows (vertical/zigzag) |
| `_blocks/testimonials.twig` | Slider: the reference's centred quote carousel with progress bars; grid: quote cards |
| `_blocks/accordion.twig` | The site's block, except "With changing image": the reference's feature list (rows between hairlines, pinned image panel that crossfades) |
| `_blocks/clientLogos.twig` | The reference's logo wall, marks in one tone (starlight, ink on a light interlude): slider view is a CSS marquee (logos printed twice, edges fade, pauses on hover, static row with reduced motion), list view a centred row, grid view soft tiles; same fields |
| `_layouts/detail/product.twig` | The Theme's product layout with one change: the highlight quote sits on the product's first photo used as a texture (toned, softened, night wash, film grain and a dot grid) that drifts against the pointer (frontend/src/js/altitude.js sets --mx/--my; mouse only, still with reduced motion; plain night without a photo); keep the rest in step with the Theme's file |
| `_blocks/video.twig` | The Theme's block without its 64rem wrapper and extra top margin: the video takes the container width under the section head |
| `_includes/header/_parts/sidebar.twig` | The Theme's mobile/sidebar menu with the logo printed inline (so it takes the night colours) |

Restyled in `altitude.css` on the theme's markup (CMS options and JS hooks unchanged): buttons
(every colour option), cards of every listing (badges and skill pills hug their text in a tint
of the text colour, so they show on any card; the round arrow is centred, tinted the same way
and sits at the card's foot; award list rows show the badge as plain text), reviews and
comments (the Theme's light-page greys mapped to night text and hairlines, the reply a tinted
bubble, faint empty rating stars), image with text (the photo fills its column, square when "rounded" is off; ticks centred on ruled rows),
pricing (one panel split by hairlines, the recommended plan's button blue), compare table,
closing CTA (centred statement), footer, sliders (thin bars),
logo recolour (the Site7 Engine mark as a blue disc with a white "7" and starlight text, the
same in every header state), white boxes inside blocks (Graphite on night), main menu dropdowns (Graphite
panels, rows that light up, a compact two-column mega panel), filter pills as the reference's
underlined tabs, slider arrows (one round Graphite button everywhere), universal card tags and
overlay buttons, page banner (buttons in a capsule, the image wide and rounded with no frame, 3:2 on phones, 40/56px under it so it never meets a light section), the floating
AI chat bubble (the blue) and back to top (Graphite disc, blue progress ring).

## Interaction

- Scroll reveal on section heads and cards; hero parallax and copy fade; large images settle
  from a slight zoom. CSS scroll-driven animations, static where unsupported.
- Every animation is off under `prefers-reduced-motion`.
- Slider progress bars fill over the autoplay delay and pause on hover.

## QA

`?design=altitude` on every page at 1440 and 390px: no Twig errors, failed requests, broken
images or horizontal scroll (`~/my-project/.site7-browser-tests/qa.js`). Check `/blocks` for every
block in every style, and that Default and Harbor render unchanged.
