# Typography

> Fonts: Adieu (titles, big text) and Space Grotesk (body, small text). Scale and base size from Kauri (`public/kauri.css`).

## Rules

- **MUST** use **Adieu** for:
  - All headings: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
  - Hero text, large display copy, titles, and any “big” text
  - In code: `font-heading` (Tailwind) or `font-family: var(--font-adieu)`

- **MUST** use **Space Grotesk** for:
  - Body text, paragraphs, descriptions, captions, and small copy
  - Default `body` and `font-sans` (Tailwind) already use Space Grotesk
  - In code: `font-sans` or no class (body default) or `font-family: var(--font-space-grotesk)`

- **MUST NOT** use Adieu for body or description text.
- **MUST NOT** use Space Grotesk for headings or hero/display text.

- **ALWAYS** respect the Kauri base: `html { font-size: 57.5% }` (1rem ≈ 9.2px); `body` is 1.6rem, line-height 1.5, weight 400. New type should use rem and the heading/body scale below.

## Kauri heading scale (`--gsc-heading-*`)

| Element | Font size | Line height |
|---------|-----------|-------------|
| h1 | 3.6rem | 4.6rem |
| h2 | 3.2rem | 4rem |
| h3 | 2.8rem | 3.8rem |
| h4 | 2.6rem | 3.6rem |
| h5 | 2.4rem | 3.4rem |
| h6 | 1.8rem | 2.8rem |

`h1–h6` are set in `globals.css`; prefer semantic headings over custom sizes.

## Reference

- `src/app/globals.css` — `--font-adieu`, `--font-heading`, `--font-sans`; `html` 57.5%; `body` 1.6rem/1.5; `h1–h6` Kauri scale
- `src/app/layout.tsx` — Space Grotesk via `next/font/google` as `--font-space-grotesk`
- `public/fonts/Adieu-Regular.ttf` — Adieu; `@font-face` in `globals.css`
- `public/kauri.css` — Kauri source (GSC/Shopify); `--gsc-fz-*`, `--gsc-heading-*`, `--gsc-lh-*`
