# LP · Luis Pinzón

<img src="public/logo/lp-mark-dark.png" alt="LP logo" width="88" />

**House DJ. Atlanta.** Rooftops, neighborhood pubs, beach bars — keeping it simple.

This is the official one-page site: a Next.js app that showcases LP's sound,
recent sets, upcoming dates, and a direct line for booking.

---

## Features

- **Cinematic hero** — full-bleed photo, an oversized logo mark, and an ambient
  waveform animation drawn live on canvas (a static frame under reduced motion)
- **The Sound** — three "rooms" LP plays (rooftops, pubs & bars, beach & daytime)
  alongside a feature photo from the most recent set
- **Gallery** — recent nights grouped by venue, each with a large banner photo
  and a responsive masonry grid; captions live off the photo in their own
  high-contrast bar, never scrimmed text over an image
- **Dates** — upcoming and recent shows in a printed "set card" ticket layout
- **Booking that works** — the Book button opens a prefilled `mailto:` with a
  structured inquiry template (date, venue, event type, crowd size), no backend
  required
- **Monochrome, on purpose** — true black grounds, full-strength white type, no
  chromatic accent; hierarchy comes from lightness and weight instead of hue

## Tech stack

| | |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) + TypeScript |
| Styling | CSS Modules, one per component, tokens in `app/globals.css` |
| Fonts | Self-hosted via `next/font/google` — no runtime request to Google |
| Images | `next/image`, pre-optimized JPEGs, stripped of EXIF/GPS metadata |
| Deploy target | [Vercel](https://vercel.com) — zero config |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before pushing

```bash
npm run typecheck
npm run build
```

A dev server passing isn't evidence the build passes — always run both.

## Project structure

```
app/
  layout.tsx        root layout, self-hosted fonts, metadata
  globals.css        color tokens, reset, shared section rhythm
  page.tsx           assembles the sections below
components/
  Nav, Hero, Wave, ActionBar, Sound, Gallery, Dates, Book, Footer
  — each with its own *.module.css
lib/
  content.ts          every piece of copy, all dates, gallery captions,
                       socials, and the booking mailto template — the one
                       data module the design system calls for
public/
  photos/             optimized event and portrait photography
  logo/               the LP mark, dark- and light-background variants
docs/
  DESIGN-SYSTEM.md     the design system this site is built to
```

## Design system

[`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) is the handbook this site
follows — contrast math, color roles, motion rules, and a review checklist.
Read it before making visual changes; every token in `globals.css` is
commented with the contrast ratio that justifies it.

## Deploy

Zero-config on [Vercel](https://vercel.com): connect the repo, or run

```bash
vercel
```

No environment variables required.

## Credits

Photos: Clip Play Media.
