# Imagery

> Product, lifestyle, and banner image guidelines from the KAURI website. Use for product grids, hero, category tiles, blog, and Instagram-style blocks.

## Rules

- **MUST** use `--muted` (`bg-muted`) as the default **product image background** when the asset has transparency or needs a base. Keeps the grid cohesive.
- **SHOULD** use **high-resolution** images for lifestyle and banners; avoid pixelation on large or high-DPI screens.
- **MUST** use **full-bleed** for hero/banner backgrounds when the design calls for it; overlay text and CTAs with sufficient contrast (dark overlay, light text, or the reverse).
- **MUST NOT** place critical text directly on busy, high-detail image areas without an overlay or panel for readability.

---

## Product images

- **Style**: Clean, well-lit, **isolated** on a neutral background.
- **Background**: `--muted` (`bg-muted`) for the block or behind the product. Keeps cards uniform in a grid.
- **Aspect**: Consistent ratio in a grid (e.g. 1:1 or 4:5). Use `object-fit: cover` or `contain` as appropriate.
- **Quality**: Sharp, no heavy filters; color should match the product.

---

## Lifestyle images

- **Style**: High-resolution, **professional**; natural settings, models, or styled scenes that reinforce a sustainable, quality aesthetic.
- **Use**: Two-column sections, category tiles, blog cards, “About” or editorial blocks.
- **Tone**: Cohesive with the brand; avoid cluttered or off-palette visuals.

---

## Banners and heroes

- **Layout**: **Full-bleed** (edge-to-edge or within the framed content by design). Background image fills the block.
- **Overlay**: Use a dark or light overlay (e.g. `bg-foreground/40` or `bg-black/30`) when text or CTA sits on the image. Ensure contrast (WCAG) for body and headings.
- **Content**: Headline (large, Adieu), optional subline, primary CTA. Keep important text away from the busiest parts of the image.
- **Variants**: Single full-width; or 3-column (image | text + CTA | image) with images as panels, not full-bleed behind the center.

---

## Category tiles

- **Image**: Full tile; can be a lifestyle or product shot. Same aspect per tile in the grid.
- **Overlay**: Optional subtle dark gradient or scrim so the **overlaid label** (category name) stays readable. Prefer bottom or center.
- **Label**: Uppercase, white or dark depending on the image. Use `font-heading` or `font-sans` as in the rest of the UI.

---

## Blog and Instagram-style grids

- **Blog**: One image per card; consistent ratio. Same quality bar as lifestyle.
- **Instagram**: Equal-sized squares or consistent ratio. No text overlay; optional hover or link indicator. Can use placeholders in a prototype.

---

## Reference

- `public/images/KAURI_logo.png` — Main logo; see [website-style-reference.md#logo](./website-style-reference.md#logo)
- [website-style-reference.md](./website-style-reference.md) — Overview
- [layout-and-sections.md](./layout-and-sections.md) — Hero, product grid, category grid, blog, Instagram
- [colors.md](./colors.md) — `--muted` for product card background
