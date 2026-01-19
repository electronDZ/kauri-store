# UI & Design Guidelines

**For AI agents:** When creating or editing UI in this project, you **MUST** read and apply every rule in the guideline files below. Treat these as strict, non-optional constraints.

The visual design (colors, typography, radius, spacing) follows **Kauri** (`public/kauri.css`, GSC/Shopify). Use `public/kauri.css` and these guidelines as the source of truth. For a **KAURI e‑commerce website-style** look (sustainable, minimal, product-focused with green CTAs, off-white/beige, grey product cards, SALE/NEW badges), start with [website-style-reference.md](./guidelines/website-style-reference.md) and the related layout, components, and imagery docs.

---

## Guideline Files

| File | Governs |
|------|---------|
| [website-style-reference.md](./guidelines/website-style-reference.md) | **KAURI website look**: overview, color, typography, logo (`/images/KAURI_logo.png`), layout, buttons, imagery, spacing. Start here for “something similar.” |
| [typography.md](./guidelines/typography.md) | Fonts: Adieu, Space Grotesk; Kauri heading/body scale; html 57.5%, body 1.6rem/1.5 |
| [colors.md](./guidelines/colors.md) | Semantic tokens and `--kauri-*` from `globals.css`; website-role → token mapping |
| [radius-and-spacing.md](./guidelines/radius-and-spacing.md) | Border radius (round-level-3: 0.4 / 0.8rem); Kauri padding vars; component padding defaults |
| [layout-and-sections.md](./guidelines/layout-and-sections.md) | **KAURI website structure**: header (announcement + nav), hero, product grid (5-col), category (2×3), lifestyle, blog (4-col), Instagram (6-col), footer |
| [components-ui.md](./guidelines/components-ui.md) | **KAURI website UI**: primary (green) / secondary (white) buttons, SALE (red) / NEW (blue) badges, nav, icons, product cards |
| [imagery.md](./guidelines/imagery.md) | **KAURI website imagery**: product (grey bg), lifestyle, full-bleed banners, category tiles, blog/Instagram grids |
| [concept.md](./guidelines/concept.md) | Deployment targets (robot, mobile), routing, prototype behavior |

---

## How to Add New Guidelines

1. Copy `docs/guidelines/_template.md` to a new file (e.g. `colors.md`, `spacing.md`, `components.md`).
2. Replace the placeholders and use this structure:

```markdown
# [Topic Name]

> One-line: what this governs.

## Rules

- **MUST** / **ALWAYS** / **NEVER** — [concrete, testable rule]
- …

## Reference (optional)

- `src/…` or `globals.css` — where this is implemented
```

3. Add a row to the **Guideline Files** table above.
4. Use **MUST**, **ALWAYS**, **NEVER** for strict rules; **SHOULD** for preference.

---

## For Humans

These docs drive “vibe coding” with AI: paste or point agents to `docs/` so every prompt follows the same UI rules. Keep rules short, explicit, and one-directional (no conflicting instructions).
