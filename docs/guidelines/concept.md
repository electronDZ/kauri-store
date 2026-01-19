# Concept

> Two deployment targets (robot touch screen, mobile app) implemented as a high-fidelity web prototype, separated by routing.

## Deployment targets

1. **Robot touch screen** — Web-like app for large fixed touch screens on a robot.
2. **Mobile app** — Mobile-first experience. Rendered as a “mobile” layout on big screens and adapted to phones on smaller screens.

## Prototype

- This is a **high-fidelity prototype**. Both targets are built as **web apps**.
- **Mobile app** behavior:
  - On **big screens**: use a mobile-style layout (centered, max-width, phone-like frame) so it can be reviewed on desktop/tablet.
  - On **smaller screens (phones)**: same layout, adapted for real mobile viewports.

## Routing

- **MUST** separate the two experiences by route:
  - `/robot` — robot touch screen UI
  - `/mobile` — mobile app UI
- `/` — launcher with links to `/robot` and `/mobile` (for prototype demos).

## Reference

- `src/app/page.tsx` — launcher
- `src/app/robot/page.tsx` — robot touch screen entry
- `src/app/mobile/page.tsx` — mobile app entry (phone-like frame on large viewports)
