# Design: Harbor

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial, `DESIGN.md` at the project root) and changes only how they look. Files missing here come from `templates/`.

- **Reference:** Refero style "Arcade" (arcade.software), adapted for an agency site. Not a copy of that brand: no logos, product shots or script lettering.
- **Files:** `frontend/src/css/harbor.css` (Tailwind role tokens), `templates/` (overrides, same paths as `templates/`), built into `web/designs/harbor/`.
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

Restyled in `frontend/src/css/harbor.css` with Tailwind `@apply`, Theme markup kept (CMS options, data handling and JS stay the Theme's):

| Area | Harbor |
|---|---|
| Header, all five layouts | Full-width bar on a hairline, frosted over banners (white 75% / graphite 55% + blur), graphite announcement strip, hover tiles without underline, blue CTA. In the components layer: the Theme's glass rules there are `!important` |
| Page banners (`standard-banner`) | Cover (layout 3) on desktop: graphite band with a blue glow, copy left, photo inset right in a rounded frame; phones and centred covers keep the photo behind a graphite wash. Split and wide media in rounded framed cards |
| Cards (blog, case study, portfolio, product, service) | White card on a hairline, inset image, square chips, no lift: blue-tinted border and float shadow on hover |
| Product page | Open like the default design (user preferred it to the boxed version): photo in a 24px hairline frame, square-cornered thumbnails, buying column sticky beside it with no card; category and tags as chips, specs as hairline rows; book details in a hairline panel, one column on phones. Quote band: graphite with the glow and a fine dot texture fading out behind the words, the mark on a blue tile, the product name a chip. Reviews: rows between hairlines, blue-tint square avatars (replacing the hard-coded warm gradient), admin reply with a blue edge, the review form on a Whisper Grey panel, blue rating stars |
| Category pills, footer labels | 8px chips (current one blue); small uppercase labels in every footer layout |
| Section heads (every block) | Eyebrow as a small blue-tint chip instead of tracked capitals (white/10 on graphite); balanced titles |
| Buttons | Primary blue with a faint top highlight; Secondary and Light white on a hairline (Editorial: ink outline), translucent on graphite |
| CTA banner | Whisper Grey panel on a hairline with a faint blue corner glow, 24px when rounded; graphite boxes (Theme or CMS colour) carry the blue glow on their own layer, the section around them stays light |
| Services | Card eyebrow as a chip; list view: number chip, arrow in a square tile that fills blue on hover |
| Our process | Steps as soft blue tiles with blue icons, number as a small blue square chip; cards on a hairline with the hover shadow; durations as blue-tint chips (above the title below desktop in vertical/zigzag) |
| Image with text, hero banner item | Square ticks on a blue tile, photo framed (24px, hairline, shadow); hero item with a graphite wash clearing towards the photo |
| Cards, everywhere | No lift on hover (the Theme's translateY is reset): the border tints blue and the float shadow comes in |
| Accordion, every style | Question in Inter 600; chevron in a square tile (left or right, as set) that fills blue when open. Flat/Bordered: hairline rows; no style: Whisper Grey cards; Card style: white on a hairline, open card shadowed; Card header: the question is the card. CMS colours, width and radius still win |
| Image gallery, video | Square arrow tiles that fill blue on hover; album eyebrows in sentence case; play button a rounded square |
| Testimonials, team, awards | White cards on a hairline (team and award photos inset); square social buttons; sentence-case eyebrows |
| Client logos | Titles in sentence case |
| Pricing | Plans as white cards on a hairline, the recommended one graphite with the blue glow; badge a square chip; compare table framed, group labels as chips, a quiet toggle button |
| Universal card | Every look kept distinct (default: Harbor card; Outlined; Soft shadow; Highlighted blue); smaller Read more; list view in the Services list language: hairline rows, a framed 4:3 photo beside the text |
| Case study and blog list views | Rows between hairlines (Editorial boxes each), a framed 4:3 photo, the title turning blue, the read link an arrow tile that fills blue with the row (link text kept for screen readers) |
| Contact, forms | .tw-card white on a hairline; fields on a quiet grey line, 12px textarea; sentence-case labels, square icon tiles |
| Testimonials slider | Featured quote card: the mark on a blue tile, larger Inter quote, squared avatars (grid view unchanged) |
| Contact (both layouts), Form block | Box icons on blue tiles; layout 1 info cards answer hover, form on a Whisper Grey panel with white fields; layout 2 details sticky beside a floating form card; Form block a roomy card with the float shadow |
| Universal card polish | Image Top/Bottom photos inset; meta row: tag as a blue chip, a dot separator, muted date; Icon Top icons on blue tiles |
| Gallery collage (Theme's new Collage View) | Harbor's 16px tile corners |
| Whole site (phase 4) | Logo: Harbor Blue mark and Inter wordmark (was terracotta + Georgia); social links square everywhere; contact details card icon tiles and sentence-case labels; gallery photos 16px |
| CTA banner | Photo boxes: the photo fades in on the far side so the copy sits on a clean panel (was a 25% haze over everything). With an image: copy from the first column, half and half. Graphite: dot texture fading towards the copy, image on a faint white edge with a deep shadow |

## Reference lock

| Keep | Rule |
|---|---|
| White canvas | Light sections on white `#ffffff`, alternates on Whisper Grey `#f9fafb`. Hairlines `#e5e7eb` |
| Graphite sections | Graphite `#111827` for dark sections (`data-theme="dark"`), with a soft blue corner glow |
| One sans family | Inter everywhere. Headings 700, tracking −0.025em. No serif |
| One vivid blue | Harbor Blue `#2142e7`: CTA fill with **white** text (7.0:1), accent text and icons on light surfaces. Never accent text on graphite (2.5:1) |
| Soft, not round | 12px buttons, 16px inputs and cards, 24px large cards; layered 4% shadows, the primary button with a Deep Blue #182fa5 ring (Arcade) |

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
| 12px / 16px radii | Style radii | Separates Harbor from Editorial's pills |
| Accents white on graphite | Contrast (2.5:1) | Blue on graphite fails contrast |
