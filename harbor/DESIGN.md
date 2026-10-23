# Design: Harbor

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial, `DESIGN.md` at the project root) and changes only how they look. Files missing here come from `templates/`.

- **Reference:** Refero style "Arcade" (arcade.software), adapted for an agency site. Not a copy of that brand: no logos, product shots or script lettering.
- **Files:** `src/css/harbor.css` (Tailwind role tokens), `templates/` (overrides, same paths as `templates/`), built into `web/designs/harbor/`.
- **Preview:** `?design=harbor` (Dev Mode). Build: `DESIGN=harbor npx vite build --config vite.design.mjs` in `frontend/`.

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
