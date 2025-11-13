# Meesho Description Generator (Frontend)

A simple, single-page Next.js app to generate attractive, emoji-enriched product descriptions for Meesho resellers.

## Features
- Modern Ocean Professional theme (blue & amber accents)
- Product details form with validations
- Client-side description generation (emojis, hashtags, CTA)
- Copy to clipboard and WhatsApp share (feature-flagged)
- LocalStorage persistence (feature-flagged)
- Static health page at `/healthz`

## Run locally
1. Install deps: `npm install`
2. Optional: copy env example `cp docs.env.example .env` and tune values
3. Start dev server: `npm run dev`
4. Open http://localhost:3000

## Build
- Production build: `npm run build`
- Static export (if needed): `npm run export`

## Environment variables
Public env vars consumed by the client (no secrets). See `docs.env.example`.

Key flags:
- `NEXT_PUBLIC_FEATURE_FLAGS` JSON object
  - fancyOutput, copyEnabled, shareEnabled, persistenceEnabled (booleans)
- `NEXT_PUBLIC_HEALTHCHECK_PATH` path for health page (default `/healthz`)

## Notes
- This app is purely frontend today. `NEXT_PUBLIC_API_BASE` and others are reserved for future integration.
