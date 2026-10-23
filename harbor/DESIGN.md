# Design: Harbor

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial, `DESIGN.md` at the project root) and changes only how they look. Files missing here come from `templates/`.

- **Reference:** Refero style "Arcade" (arcade.software), adapted for an agency site. Not a copy of that brand: no logos, product shots or script lettering.
- **Files:** `src/css/harbor.css` (Tailwind role tokens), `templates/` (overrides, same paths as `templates/`), built into `web/designs/harbor/`.
- **Preview:** `?design=harbor` (Dev Mode). Build: `DESIGN=harbor npx vite build --config vite.design.mjs` in `frontend/`.

## Templates it overrides

Same paths as `templates/` (DESIGN.md at the project root, "Detail layouts"); styled with Tailwind role utilities.

| File | Harbor's version |
|---|---|
| `_layouts/detail/blog.twig` | Left-aligned header on Whisper Grey (pills, date, reading time), wide rounded cover, sticky aside (author, topics, share) beside the story; on phones the aside follows the story |
| `_layouts/detail/casestudy.twig` | Split hero (copy and calls to action beside the cover), sticky facts card and a graphite call to action beside the story |
| `_components/listing-filter.twig` | Blog and shop filter: one white card, search button inside the field, categories as chips (a select above 8) |
| `_layouts/detail/portfolio.twig` | Graphite stage (client logo pill, title, lead, tag chips), cover overlapping the band, spec table as stat tiles |
| `_includes/hero-banner/sliderLayout1/2/3.twig`, `_copy.twig`, `_list.twig` | Home hero: layout 3 a graphite stage with the media framed below and a stats grid; layout 1 split with a glowing media frame; layout 2 copy beside an edge-to-edge media half below the header |
| `_includes/footer/basicFooter.twig` | Graphite footer (unless the CMS sets a footer colour or image), small uppercase column labels, the company name as a faint wordmark |

Restyled in `src/css/harbor.css` with Tailwind `@apply`, Theme markup kept (CMS options, data handling and JS stay the Theme's):

| Area | Harbor |
|---|---|
| Header, all five layouts | Full-width bar on a hairline, frosted over banners (white 75% / graphite 55% + blur), graphite announcement strip, hover tiles without underline, blue CTA. In the components layer: the Theme's glass rules there are `!important` |
| Page banners (`standard-banner`) | Cover (layout 3) on desktop: graphite band with a blue glow, copy left, photo inset right in a rounded frame; phones and centred covers keep the photo behind a graphite wash. Split and wide media in rounded framed cards |
| Cards (blog, case study, portfolio, product, service) | White card on a hairline, inset image, square chips, no lift: blue-tinted border and float shadow on hover |
| Product page | Gallery in a framed light panel, buying details in a sticky card, specs on a grey panel |
| Category pills, footer labels | 8px chips (current one blue); small uppercase labels in every footer layout |

## Reference lock

| Keep | Rule |
|---|---|
| White canvas | Light sections on white `#ffffff`, alternates on Whisper Grey `#f9fafb`. Hairlines `#e5e7eb` |
| Graphite sections | Graphite `#111827` for dark sections (`data-theme="dark"`), with a soft blue corner glow |
| One sans family | Inter everywhere. Headings 700, tracking −0.025em. No serif |
| One vivid blue | Harbor Blue `#2142e7`: CTA fill with **white** text (7.0:1), accent text and icons on light surfaces. Never accent text on graphite (2.5:1) |
| Soft, not round | 12px buttons and inputs, 16px cards, 24px large cards; layered 3–8% shadows |

**Reject:** serif headlines, italic `<em>` word swaps, pill buttons, cream/paper canvas, a second bright colour, blue text on graphite, full-bleed gradients on light sections.

## Role tokens

| Role | Harbor | Editorial |
|---|---|---|
| `surface` | `#ffffff` | Parchment |
| `surface-alt` | Whisper Grey `#f9fafb` | Aged Paper |
| `surface-dark` | Graphite `#111827` | Ink |
| `line` | `#e5e7eb` | Warm Taupe |
| `text-strong` / `text-body` / `text-muted` | `#111827` / `#4b5563` / `#6b7280` | Ink / Charcoal / Graphite |
| `on-dark` | `#ffffff` | Parchment |
| `primary` / `on-primary` | `#2142e7` / `#ffffff` | Terracotta / Parchment |
| `accent` (eyebrows, active links, icon lines) | `#2142e7` (white on graphite) | Terracotta |

CMS colour names map by role: Aged Paper → Whisper Grey, Ink → Graphite, Parchment → White, Terracotta → Harbor Blue.

## Decision ledger

| Decision | Source | Why |
|---|---|---|
| Single blue for CTA and accents | Style: "Arcade Blue exclusively for primary CTAs and active states" | The style's only colour; contrast holds on white |
| Graphite dark sections with a corner glow | Style: dark gradient base + blue gradient accent in heroes | Gives the design one memorable move without a second colour |
| Inter, 700, −0.025em | Style type scale | Already shipped with the site: no extra font download |
| 12px / 16px radii | Style radii | Separates Harbor from Editorial's and Canopy's pills |
| Accents white on graphite | Contrast (2.5:1) | Same rule as Canopy's forest areas |
