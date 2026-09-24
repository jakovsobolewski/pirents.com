# Pirents

Peer-to-peer rentals for mobility and transport gear: wheelchairs, mobility scooters, bikes, accessible cars, strollers, rollators and beach equipment. Built for tourists on short visits and the locals who own the gear.

## Run it

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. Opening `index.html` directly from disk also works.

## What's here

| Path | Purpose |
|---|---|
| `DESIGN.md` | Design guidelines: brand, logo, colour, type, spacing, components, accessibility, copy |
| `styleguide.html` | Living style guide rendering every token and component |
| `index.html` | Home: hero search, categories, featured listings, owner pitch |
| `browse.html` | Search results with category chips, filters, sorting, URL-synced state. Empty results show the Scout: an animated π-on-wheels character and a "find it for me" request form |
| `listing.html` | Listing detail with specs, rules, reviews and a booking panel with live quote |
| `list-item.html` | Five-step "List your item" wizard with validation and preview |
| `dashboard.html` | Bookings, listings, saved items and open Scout requests for the signed-in user |
| `how-it-works.html` | Renter and owner flows, fees, trust & safety, FAQ |
| `assets/css/tokens.css` | Design tokens as CSS custom properties (the only file with raw hex values) |
| `assets/css/base.css` | Reset, typography, layout utilities |
| `assets/css/components.css` | Every component from the guidelines |
| `assets/js/app.js` | Shared runtime: icons, header/footer, localStorage store, auth dialog, toasts, listing card |
| `assets/js/data.js` | Seed listings, categories, features |

## Prototype notes

- Accounts, bookings, favourites, new listings and Scout requests are stored in `localStorage` under `pirents.v1`. Nothing leaves the browser.
- "Sign in" asks for a name and email only. There is no password or backend.
- Photos selected in the listing wizard are counted but not uploaded.
- Listing images are category tiles (icon on the category colour) until real photos exist.

## Brand essentials

- Brand Red `#B5434B` for primary actions, Crust Gold `#E8A93A` and Cream `#F5E6C3` for warmth, Cocoa `#4A4038` for the wordmark, warm Charcoal `#2F2A27` for text and outlines. All lifted from the logo.
- Background / secondary: `#F7F3EC` (Linen). Cards are white on Linen.
- Logo: a sticker-style slice of pie (pi, pie, a slice of somewhere new) beside the wordmark `PI RENTS`. The `.com` appears only on the standalone asset.
- Fonts: Gluten for headlines and the wordmark, Nunito for everything you read.
