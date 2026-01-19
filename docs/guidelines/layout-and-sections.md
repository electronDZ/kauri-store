# Layout & Sections

> Page structure, section order, and grid patterns from the KAURI website. Use for hero, product grids, category tiles, lifestyle, blog, Instagram, and footer.

## Rules

- **MUST** separate **header** (announcement bar + main nav), **main content** (sections below), and **footer** (dark utility + light multi-column).
- **SHOULD** use the section order and grid counts below when building KAURI-style product/marketing pages.
- **MUST** use `--kauri-container` (2rem) or `--container-padding` for horizontal padding of the main content frame; keep it consistent across sections.
- **SHOULD** use generous vertical spacing between sections (e.g. 4rem–6rem or equivalent in rem) for readability.

---

## Header

### 1. Announcement bar (top)

- **Full width**, dark background: `bg-foreground`. Text: `text-primary-foreground`. Single line (e.g. free shipping, promo).
- **SHOULD** be minimal height; one line of text.

### 2. Main navigation

- **Background**: `bg-background`.
- **Layout**: logo (left) | primary links (center) | icons (right).
- **Logo**: Use `public/images/KAURI_logo.png` (`/images/KAURI_logo.png`). See [website-style-reference.md](./website-style-reference.md#logo).
- **Primary links**: Uppercase (SHOP, COLLECTIONS, ABOUT, JOURNAL, CONTACT). Center-aligned as a group.
- **Right icons**: Search, account, wishlist, cart. Minimalist line-art, same size.
- **SHOULD** use sticky/fixed on scroll for persistent access.

---

## Main Content Sections

### Hero / Banners

- **Full width** (edge-to-edge or within a framed area by design).
- **Background**: Large image, full-bleed. Overlay for contrast if needed.
- **Content**: Headline (Adieu, large), optional subline, **primary CTA**: `bg-kauri-green` + `text-primary-foreground`.
- **Variants**:
  - Single full-width with centered or left-aligned text.
  - **3-column**: image | centered text + CTA | image.

### Product grids

- **Desktop**: **5 columns** typical for product blocks.
- **Product block**: Image on `bg-muted`, product name, price, star rating. Optional badges (SALE `bg-kauri-red`, NEW `bg-kauri-blue`) on image.
- **SHOULD** be responsive: fewer columns on tablet (e.g. 3), 2 or 1 on mobile.
- **Section title**: Uppercase, e.g. “WINTER SALE”, “AUTUMN STYLE”.

### Category / promotional grids

- **Image tiles** in a grid (e.g. **2×3** or 2 rows × 3 columns).
- **Each tile**: Full image, **label overlaid** (e.g. category name). Optional subtle overlay for contrast.
- **SHOULD** use `rounded-md` / `rounded-lg` (0.8rem) for tiles if the rest of the UI uses round-level-3.

### Two-column lifestyle

- **50/50** or similar: text block (headline, paragraph, CTA) | **large lifestyle image**.
- **Image**: High-quality, supports sustainable/editorial feel.
- **SHOULD** swap order (image | text) on alternating sections for variety.

### Blog section

- **4-column** grid on desktop.
- **Each card**: Image, title, short description, “READ MORE” text or button.
- **Section title**: e.g. “FROM THE JOURNAL” or similar, uppercase.

### Instagram feed

- **6-column** image grid, equal-sized thumbnails.
- **Section title**: e.g. “FOLLOW US ON INSTAGRAM”, uppercase.
- **No text overlay** on images; optional hover for link.

---

## Footer

### 1. Dark utility strip (top of footer)

- **Dark strip**: `bg-foreground`, `text-primary-foreground`.
- **Content**: Short, icon + label for: fast delivery, stores, gift cards, help. In a **horizontal row** (e.g. 4 columns on desktop, stack on mobile).
- **Icons**: Minimalist, same style as header.

### 2. Light footer (main)

- **Background**: `bg-muted` or `bg-background`.
- **Layout**: Multi-column.
  - **Column 1**: Logo, short brand description.
  - **Columns 2–3**: Links (About, Help & Info, etc.).
  - **Column 4**: Social links (icons).
  - **Bottom row**: Trust badges, payment icons.
- **SHOULD** use `--kauri-container` or equivalent for horizontal padding; columns align to a common grid.

---

## Grid Quick Reference

| Section | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Product grid | 5 | 3 | 2 or 1 |
| Category tiles | 2×3 | 2×2 | 2×1 or 1 |
| Blog | 4 | 2 | 1 |
| Instagram | 6 | 4 or 3 | 3 or 2 |
| Footer links | 4+ | 2 | 1 (stack) |

---

## Reference

- `--kauri-container`, `--container-padding` in `src/app/globals.css`
- [website-style-reference.md](./website-style-reference.md) — Overview
- [radius-and-spacing.md](./radius-and-spacing.md) — Padding, radius
