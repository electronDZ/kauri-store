# KAURI Website Style Reference

> Master design reference for the KAURI e‑commerce look: minimal, sustainable, product-focused. Use this to achieve a similar visual in the robot and mobile prototypes.

## Overview

The KAURI website is **clean, modern, and product-focused** with a **muted, sustainable** feel. It uses:

- **Sans-serif typography** (Adieu for headings, Space Grotesk for body)
- **Soft neutrals** (off-white, light grey, dark grey) and a **distinct green** for CTAs and promotions
- **Structured layout**: header, full-width hero/banners, product grids, category tiles, two-column lifestyle blocks, blog, Instagram, footer
- **Minimal UI**: line-art icons, uppercase nav, subtle rounded buttons

---

## Color (from `globals.css`)

| Role | Token / Tailwind |
|------|------------------|
| **Page, nav, central blocks** | `--background`, `bg-background` |
| **Dark bar** (announcement, footer strip) | `bg-foreground` + `text-primary-foreground` |
| **Product card bg** | `--muted`, `bg-muted` |
| **CTA, green buttons, SALE overlay** | `--kauri-green`, `bg-kauri-green`; text `text-primary-foreground` |
| **Body, headings** | `--foreground`, `text-foreground` |
| **Text on dark** | `--primary-foreground`, `text-primary-foreground` |
| **SALE badge** | `--kauri-red`, `--destructive`, `bg-kauri-red` |
| **NEW badge** | `--kauri-blue`, `bg-kauri-blue` |

All values are in `src/app/globals.css`. See [colors.md](./colors.md).

---

## Typography (Website Reference)

- **Headings**: Uppercase for section titles (WINTER SALE, AUTUMN STYLE, FOLLOW US ON INSTAGRAM). Use **Adieu** (`font-heading`). `text-foreground`.
- **Nav**: Uppercase (SHOP, COLLECTIONS, ABOUT, JOURNAL, CONTACT). Sans-serif, regular or medium. `text-foreground`.
- **Body**: Regular weight, smaller size for descriptions, captions, paragraphs. **Space Grotesk** (`font-sans`). `text-foreground`.
- **Buttons**: Uppercase; primary `bg-kauri-green` + `text-primary-foreground`; secondary `bg-background` + `text-foreground`.

Follow [typography.md](./typography.md) for font assignment and Kauri scale.

---

## Logo

**Asset:** `public/images/KAURI_logo.png` — use `/images/KAURI_logo.png` in `src` (Next.js `public`).

- **Lockup:** Uppercase word **KAURI** in bold, geometric sans-serif, with an **abstract symbol** (teardrop / leaf shape) to the left of the "K", pointing up and slightly right.
- **Colors (in asset):** Two-tone green — deep forest/olive background; dark green/charcoal fill for letters and symbol; lighter, more vibrant green outline for a glowing/embossed effect. Do **not** recolor or recreate; use the PNG as supplied.
- **Usage:** Header (nav left), footer. **MUST** use this asset for the main brand mark. **SHOULD** keep aspect ratio when scaling; allow clearspace.
- **Do not** replace with text-only "KAURI" or a different symbol; use the provided file.

---

## Layout at a Glance

- **Header**: Small dark announcement bar (full width) → White main nav (logo left, links center, search/account/wishlist/cart right).
- **Hero / Banners**: Full-width, background image, overlaid title + CTA. Some 3-column (image | text | image).
- **Product grids**: Often **5 columns** on desktop; product blocks on `bg-muted` with image, name, price, stars.
- **Category grids**: Image tiles in **2×3** (or similar), label overlaid.
- **Lifestyle**: **Two-column** (text + large image).
- **Blog**: **4-column** grid; image, title, short text, "READ MORE".
- **Instagram**: **6-column** image grid.
- **Footer**: Dark strip (delivery, stores, gift cards, help) + light multi-column (logo, about, help, social, trust, payment icons). `bg-foreground` + `text-primary-foreground` for dark strip; `bg-muted` or `bg-background` for main footer.

See [layout-and-sections.md](./layout-and-sections.md) for details.

---

## Buttons & CTAs

- **Primary**: `bg-kauri-green`, `text-primary-foreground`, uppercase. Subtle rounded corners.
- **Secondary**: `bg-background`, `text-foreground`, uppercase. Subtle rounded corners.
- **Text links**: `text-foreground`, uppercase in nav; optional underline on hover.

See [components-ui.md](./components-ui.md).

---

## Imagery

- **Product**: Clean, well-lit, often on neutral light grey. Isolated look.
- **Lifestyle**: High-resolution, natural settings, reinforces sustainable/quality feel.
- **Banners**: Full-bleed, overlay for headline and CTA.

See [imagery.md](./imagery.md).

---

## Spacing & Alignment

- **Vertical**: Generous space between sections.
- **Horizontal**: Consistent padding (e.g. `--kauri-container` 2rem) for a framed content area.
- **Alignment**: Left or center within sections; nav links often centered.

---

## Reference

- `public/images/KAURI_logo.png` — Main logo; use `/images/KAURI_logo.png` in markup
- [colors.md](./colors.md) — Tokens from `globals.css`; website-role mapping
- [typography.md](./typography.md) — Adieu, Space Grotesk, Kauri scale
- [radius-and-spacing.md](./radius-and-spacing.md) — Radii, padding, component defaults
- [layout-and-sections.md](./layout-and-sections.md) — Page structure and grids
- [components-ui.md](./components-ui.md) — Buttons, badges, nav, icons
- [imagery.md](./imagery.md) — Product, lifestyle, banners
