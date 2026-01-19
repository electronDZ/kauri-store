# Components & UI

> Buttons, badges, navigation, and icons from the KAURI website. Use for CTAs, product tags, nav, and header/footer icons.

## Rules

- **MUST** use `--kauri-green` (`bg-kauri-green`) for main green CTAs: “Shop now”, “Add to cart”, “READ MORE” on promos. `text-primary-foreground`, uppercase.
- **MUST** use `bg-background` + `text-foreground` for secondary actions: “Learn more”, outlined or white buttons. Uppercase.
- **MUST** use `--kauri-red` or `--destructive` for SALE badges; `--kauri-blue` for NEW badges. Small, on product image or card.
- **SHOULD** use minimalist **line-art icons** in header (search, account, wishlist, cart) and footer (delivery, store, gift, help, social). Same stroke weight and size within each zone.
- **MUST NOT** use Adieu for button labels; use body font (Space Grotesk) or `font-sans`. Uppercase for primary/secondary.

---

## Buttons

### Primary (CTA)

- **Background**: `--kauri-green`. Use `bg-kauri-green`.
- **Text**: White, **uppercase**. `text-primary-foreground` or `text-white`.
- **Shape**: Subtle rounded corners (`rounded-md` / `rounded-lg`, 0.8rem). Use `--kauri-btn-x`, `--kauri-btn-y` for padding.
- **Use**: Hero CTA, “Add to cart”, primary “READ MORE”, banner actions.

### Secondary

- **Background**: White. Border optional (e.g. `border border-foreground` or `border-border`).
- **Text**: Black/dark grey (`--foreground`), **uppercase**.
- **Shape**: Same radius as primary; same padding pattern.
- **Use**: “Learn more”, “View all”, secondary actions next to primary.

### Text links

- **Color**: Dark grey (`--foreground`).
- **Nav**: Uppercase. Underline on hover optional.
- **In-content**: Optional underline; not uppercase unless it’s a nav-style link.

---

## Badges (product and promo)

### SALE

- **Background or text**: Red. Use `--kauri-red` / `--destructive` or `bg-kauri-red` / `text-kauri-red`.
- **Placement**: Top-left or top-right of product image; small, not overlapping critical detail.
- **Shape**: `rounded-sm` (0.4rem). Padding: `--kauri-badge-x`, `--kauri-badge-y`.
- **Text**: “SALE” or “-30%” etc. Uppercase, small, high contrast.

### NEW

- **Background or text**: Blue. Use `--kauri-blue` or `bg-kauri-blue` / `text-kauri-blue`.
- **Placement, shape, padding**: Same as SALE.
- **Text**: “NEW”. Uppercase, small.

### Promo overlays (e.g. -30% on hero)

- **Large** discount text on banners: `--kauri-green` or `text-primary-foreground` on `bg-foreground` for contrast.
- **SHOULD** stay readable; avoid small text on busy images.

---

## Navigation

- **Links**: Uppercase, `--foreground`, `font-sans`. No underline by default; optional on hover.
- **Spacing**: Even gap between items (e.g. 1.6rem–2rem).
- **Active/current**: Bold, underline, or distinct color; keep consistent across the app.

---

## Icons

- **Style**: Minimalist **line-art** (stroke, not filled). Single stroke weight in a set.
- **Header**: Search, account, wishlist, cart. Same size (e.g. 24×24 or 20×20 logical px).
- **Footer (utility)**: Delivery, store, gift, help. Same size and style.
- **Footer (social)**: Instagram, etc. Same size as utility or a dedicated social set.
- **MUST NOT** mix heavy filled icons with light line-art in the same bar.

---

## Product cards

- **Image area**: `bg-muted`. Image centered or object-fit cover.
- **Badges**: SALE (red), NEW (blue) as above; on image.
- **Text**: Product name (heading or bold), price. Star rating if used.
- **Radius**: `rounded-md` / `rounded-lg` (0.8rem) for card and/or image.
- **Padding**: `--kauri-card-x` for text block.

---

## Reference

- `src/components/ui/button.tsx`, `badge.tsx`, `card.tsx` — base components
- [radius-and-spacing.md](./radius-and-spacing.md) — `--kauri-btn-*`, `--kauri-badge-*`, `--kauri-card-x`
- [colors.md](./colors.md) — `--kauri-green`, `--kauri-red`, `--kauri-blue`, `--foreground`
- [website-style-reference.md](./website-style-reference.md) — Overview
