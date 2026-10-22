# Design: Canopy

A Site7 design: frontend only. It reads the same CMS fields as the default design (Editorial, `DESIGN.md` at the project root) and changes only how they look. Files missing here come from `templates/`.

- **Reference:** Refero style "Chat for impact" (turn.io), adapted for an agency site. Not a copy of that brand: no logos, product shots or chat mockups.
- **Files:** `src/css/canopy.css` (Tailwind role tokens), `templates/` (overrides, same paths as `templates/`), built into `web/designs/canopy/`.
- **Preview:** `?design=canopy` (Dev Mode). Build: `DESIGN=canopy npx vite build --config vite.design.mjs` in `frontend/`.

## Reference lock

| Keep | Rule |
|---|---|
| Forest canvas | Forest Canopy `#0a3922` for dark sections (`data-theme="dark"`), heroes and accents. Light sections on white `#ffffff` |
| One sans family | DM Sans (`ss03`) everywhere. Headings 700, tracking −0.028em. No serif |
| Orange is the CTA only | Sunset Orange `#ff643b` fill with **black** text (6.8:1). Never text on white (2.9:1), never a section background |
| Pastel surfaces | Off White `#f2f2f2` cards and alternate sections; Pale Mint `#e4f7ee`, Lavender Mist `#eee2ff`, Pale Linen `#f4ece9` for occasional feature cards |
| Flat and rounded | 40px pill buttons, 24px cards, 8px inputs; at most a 1px 5% shadow |

**Reject:** serif headlines, italic `<em>` word swaps, cream/paper canvas, terracotta, shadow-based depth, pastels inside dark sections.

## Role tokens

| Role | Canopy | Editorial |
|---|---|---|
| `surface` | `#ffffff` | Parchment |
| `surface-alt` | Off White `#f2f2f2` | Aged Paper |
| `surface-dark` | Forest Canopy `#0a3922` | Ink |
| `line` | `#d4d4d4` | Warm Taupe |
| `text-strong` / `text-body` / `text-muted` | `#000000` / `#3d3d3d` / `#6e6e6e` | Ink / Charcoal / Graphite |
| `on-dark` | `#ffffff` | Parchment |
| `primary` / `on-primary` | `#ff643b` / `#000000` | Terracotta / Parchment |
| `accent` (eyebrows, active links, icon lines) | Forest `#0a3922` | Terracotta |

CMS colour names map by role: Aged Paper → Off White, Ink → Forest, Parchment → White, Terracotta → Orange.

## Decision ledger

| Decision | Source | Why |
|---|---|---|
| Forest `#0a3922` dark sections | Style: hero / prominent backgrounds | The style's signature canvas |
| DM Sans 700, −0.028em headlines | Style: typography | Its type voice; replaces Editorial's serif |
| Orange CTA with black text | Style: primary action button | CTA-only role; black text passes contrast, white does not |
| Accent text in forest, not orange | Style: orange reserved for CTA; craft: contrast | Eyebrows and active links stay legible |
| `text-muted` `#6e6e6e` instead of `#7a7a7a` | Craft: 4.5:1 for small text | Source grey is 4.3:1 on white |
| 8px inputs, 40px buttons, 24px cards | Style: radius tokens | Same soft geometry family |
| 1px 5% shadow only | Style: shadows | Depth from colour blocks |
