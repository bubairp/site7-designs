# Design: Meadow

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial, `DESIGN.md` at the project root) and changes only how they look. Files missing here come from `templates/`.

- **Reference:** the Site7 product site (craftsite-one, `~/my-project/craftsite-one`): its colours, type scale, container, spacing, hero, client logos and black footer, measured on its pages at 390, 768 and 1440px.
- **Files:** laid out like the theme package: `frontend/src/css/meadow.css` (Tailwind role tokens and the rules below), `templates/` (overrides, same paths as `templates/`), built into `web/designs/meadow/`. No design JS.
- **Build / preview:** `bash scripts/design.sh build meadow`, `bash scripts/design.sh preview meadow` (or `?design=meadow` in Dev Mode).
- **Font:** Josefin Sans (headings) from `@fontsource-variable/josefin-sans` in `frontend/package.json`, imported in `meadow.css`; Inter comes with the Theme.

## Reference lock

| Keep | Rule |
|---|---|
| One bright green | `#22c55e` for CTA fills, accents, eyebrows, active links and icons. Nothing else is coloured |
| Josefin Sans 600 headings, Inter body | h1 30 / 36 / 44px, h2 32 / 36 / 41.6px, card titles 20 / 24px, body and leads 16px, line height 1.3 headings, 1.625 body |
| 1230px container | 16px gutters at every width; capped at 1230px including the gutters |
| Calm rhythm | Sections 40 / 48 / 64px top and bottom (plain, coloured and first alike); section head → content 16 / 32px, title → lead 8px |
| Rounded, flat | Buttons 0.7rem, inputs 8px, cards 16px, no card shadows |
| Solid header | Always a white bar above the hero, never over it |

**Reject:** Editorial's serif and italic emphasis, pill buttons and inputs, the floating glass header, grey-filtered client logos, oversized display headings.

## Role tokens

| Role | Meadow | Editorial |
|---|---|---|
| `surface` | White `#ffffff` | Parchment |
| `surface-alt` | Mist `#f6f8f7` | Aged Paper |
| `surface-dark` | Slate night `#0f172a` | Ink |
| `line` | `#e5e7eb` | Warm Taupe |
| `text-strong` / `text-body` / `text-muted` | `#121519` / `#1e2939` / `#576071` | Ink / Charcoal / Graphite |
| `on-dark` | White | Parchment |
| `primary` / `on-primary` | Green `#22c55e` / White | Terracotta / Parchment |
| `accent` | Green `#22c55e` | Terracotta |

White on `#22c55e` is about 2.3:1, below 4.5:1. Kept to match the reference; darken `--primary` if a site needs AA on its buttons.

## Templates it overrides

| File | Meadow's version |
|---|---|
| `_includes/header/index.twig` | Leaves out the `header-floating-glass` class, so "Header over banner" is not drawn: the header is always a solid bar and the hero starts below it. Everything else is the Theme's file |
| `_includes/footer/basicFooter.twig` | Black (`bg-black`, dark theme) by default; a footer colour or image set in the CMS wins, together with its "Theme dark" switch. Only the opening tag differs |

## Restyled in `meadow.css`

| Area | Meadow |
|---|---|
| Header | 15px menu links in slate, 38px header button (14px text) |
| Home hero (layout 3) | 563px on desktop, under the header; the photo under a green wash (teal → green, left to right; top to bottom on phones); copy centred on phones, left from 1024px; uppercase eyebrow pill with a yellow dot; slate-night main button and white second button, side by side on phones |
| Page banners | Cover (layout 3) at most 460px; split image 16:10; title 36 → 56px, lead 16 / 18px |
| Section heads | Green-tint eyebrow pill (12px, uppercase), 8px title → lead, 16 / 32px to the content |
| Text | Leads, card text, CTA and split text 16px; quotes in Inter 16px; FAQ questions 18 / 20px; CTA and newsletter titles on the h2 scale; footer column labels 18px bold |
| Services list view | Rows 20 / 28px |
| Client logos | Full colour, no hairlines, 24px tall and 96px wide at most, a 2px lift on hover |
| Newsletter form | Wrapper on the button radius + 6px, field 8px, 48px button |
| Footer | Black, white text (see the template above) |

## Decision ledger

| Decision | Source | Why |
|---|---|---|
| Built from Editorial's tokens, not copied from Harbor | First build | Harbor's overrides (graphite stage, glow, square chips) are its own look; the reference is plainer |
| Header never over the hero | Reference home and inner pages | The reference's header is a solid bar above every banner; user asked for the hero "same as Site7" |
| Green wash over the hero photo | Reference hero is a green image | Keeps the green hero on any CMS photo, with white text readable |
| Sections 40 / 48 / 64px | Reference markup `py-10 md:py-12 lg:py-16`; user asked to reduce | The reference's 80px comes from per-block CMS spacing, not its defaults |
| Font sizes | Text-style dump of both sites at 390 and 1440px (Playwright) | Match the reference size for size |
| Shorter page banners, smaller logos, tighter service rows | User, 2026-10-30 | Asked to reduce each |
