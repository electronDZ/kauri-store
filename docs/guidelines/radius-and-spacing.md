# Border Radius & Spacing

> Kauri spacing variables from `public/kauri.css`. Radius is overridden to **0 (sharp)** in `globals.css` to match the Kauri/GSC strict sharp style.

## Rules

- **MUST** use **sharp edges** (radius 0) for all UI elements: buttons, cards, inputs, modals, etc.
- **MUST** use theme radius utilities which are set to 0 in `globals.css`: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`. Do NOT use `rounded-[0.8rem]` or hardcoded non-zero values.
- **SHOULD** use `rounded-full` ONLY for circular elements like avatars or status dots, if explicitly required. Otherwise, prefer sharp.

- **SHOULD** use `var(--kauri-*)` for spacing: e.g. `p-[var(--kauri-container)]`, `px-[var(--kauri-btn-x)]`, `py-[var(--kauri-btn-y)]`.

## Kauri padding variables (`--kauri-*`)

| Variable | Value | Use |
|----------|-------|-----|
| `--kauri-container` | 2rem | Page/section sides |
| `--kauri-container-header` | 2rem | Container header |
| `--kauri-btn-x` | 3.2rem | Button horizontal |
| `--kauri-btn-y` | 1.2rem | Button vertical (md) |
| `--kauri-btn-y-sm` | 0.8rem | Button vertical (sm) |
| `--kauri-btn-y-lg` | 1.5rem | Button vertical (lg) |
| `--kauri-dropdown-item-y`, `-x` | 1rem, 1.6rem | Dropdown item |
| `--kauri-badge-y`, `-x` | 0.2rem, 0.8rem | Badge |
| `--kauri-modal` | 4rem | Dialog/Modal |
| `--kauri-tooltip` | 0.6rem 1.2rem | Tooltip |
| `--kauri-card-x` | 1.6rem | Card header/content/footer |
| `--kauri-table-cell` | 1.2rem | Table cell |
| `--kauri-table-gap` | 1.6rem | Table column gap |
| `--kauri-paragraph` | 2rem | RTE paragraph spacing |

## Component defaults

- **Button**: `rounded-none` / `rounded-md` (0px).
- **Input**: `rounded-none` / `rounded-md` (0px).
- **Card**: `rounded-none` / `rounded-lg` (0px).
- **Dialog**: `rounded-none` / `rounded-lg` (0px).

## Reference

- `src/app/globals.css` — Sets `--radius-*` to 0.
- `src/components/ui/` — Components use `rounded-md` etc., which resolve to 0.
