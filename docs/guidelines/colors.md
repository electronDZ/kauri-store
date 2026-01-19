# Colors

> Semantic tokens and Kauri palette. Canonical definitions in `src/app/globals.css` (:root, .dark). Kauri source: `public/kauri.css` (--gsc-text ~#141416; --gsc-{green,yellow,red,blue}).

## Rules

- **MUST** use semantic tokens for UI: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--muted`, `--muted-foreground`, `--border`, `--input`, `--destructive`, `--ring`. In Tailwind: `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`, `bg-destructive`, etc.

- **MUST** use `--primary` for solid buttons and primary actions; in light theme `--primary` equals `--foreground`; `--primary-foreground` is white. For green CTAs use `--kauri-green` (`bg-kauri-green`).

- **MUST** use `--destructive` for errors, remove, and danger; it maps to Kauri `--gsc-red-color` (rgb 195,59,59).

- **SHOULD** use the Kauri palette for status or accents: `--kauri-green`, `--kauri-yellow`, `--kauri-red`, `--kauri-blue`. In Tailwind: `bg-kauri-green`, `text-kauri-yellow`, `border-kauri-red`, `bg-kauri-blue`.

- **MUST NOT** hardcode hex, rgb, or oklch in UI code; use tokens from `globals.css` (`--foreground`, `--kauri-*`, etc.).

## Kauri semantic (light) — from `globals.css` :root

| Token | Role | Value (globals.css) |
|-------|------|---------------------|
| `--foreground` | Text, headings | oklch(0.148 0.002 286) ~ gsc-text |
| `--primary` | Buttons, CTAs | same as `--foreground` |
| `--primary-foreground` | Button text on primary/dark | oklch(1 0 0) |
| `--background` | Page, cards, nav | oklch(1 0 0) |
| `--secondary`, `--muted` | Secondary bg, product card bg | oklch(0.97 0 0) |
| `--muted-foreground` | Secondary text | oklch(0.45 0 0) |
| `--border`, `--input` | Borders, input outline | oklch(0.91 0 0) |
| `--destructive` | Errors, danger, SALE | oklch(0.53 0.18 25) ~ gsc-red |

## Kauri palette (`--kauri-*`) — from `globals.css` :root

| Variable | Use | Value (globals.css) |
|----------|-----|---------------------|
| `--kauri-green` | Success, positive, green CTAs | oklch(0.55 0.16 145) ~ rgb(83,158,58) |
| `--kauri-yellow` | Ratings, caution | oklch(0.78 0.16 75) ~ rgb(255,165,29) |
| `--kauri-red` | SALE, danger; same as `--destructive` | oklch(0.53 0.18 25) ~ rgb(195,59,59) |
| `--kauri-blue` | NEW badge, links, accents | oklch(0.45 0.24 275) ~ rgb(62,46,255) |

## KAURI website roles → tokens (globals.css)

Use only these tokens; all values come from `src/app/globals.css`.

| Website role | Token / Tailwind |
|--------------|------------------|
| Page, nav, central blocks | `--background`, `bg-background` |
| Dark bar (announcement, footer strip) | `bg-foreground` + `text-primary-foreground` |
| Product card / image background | `--muted`, `bg-muted` |
| Green CTAs, SALE overlay, promo | `--kauri-green`, `bg-kauri-green`; text `text-primary-foreground` |
| Body and headings | `--foreground`, `text-foreground` |
| Text on dark | `--primary-foreground`, `text-primary-foreground` |
| SALE badge | `--kauri-red`, `--destructive`, `bg-kauri-red` |
| NEW badge | `--kauri-blue`, `bg-kauri-blue` |

**MUST NOT** hardcode hex or oklch in components; use tokens. For `.dark` values, see `globals.css` `.dark`.

## Reference

- `src/app/globals.css` — `:root` semantic and `--kauri-*`; `@theme inline` wires `--color-*` and `--color-kauri-*`
- `public/kauri.css` — `--gsc-text-color`, `--gsc-background-color`, `--gsc-{white,black,green,yellow,red,blue}`
- [website-style-reference.md](./website-style-reference.md) — Overall KAURI website style
