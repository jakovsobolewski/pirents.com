# Pirents Design Guidelines

Version 2.1 · September 2026 · Pie identity, warm neutrals

Pirents is a peer-to-peer rental platform for mobility and transport gear: wheelchairs, mobility scooters, bikes, cars, strollers, rollators and beach equipment. Owners list what they have; travellers and locals rent it for a day, a weekend or a whole trip.

A large share of our users have reduced mobility, are travelling in an unfamiliar place, or are booking on a phone with one hand. Every design decision below is made with that in mind: **clear over clever, calm over loud, accessible by default.**

---

## 1. Brand

### Name and pronunciation
"Pirents" is pronounced *pie-rents*. The wordmark spells it **PI RENTS** in two words; running text uses **Pirents**. The pun is the brand: pi, pie, and a slice of somewhere new.

### Mission
Make getting around on a trip as easy as getting there. Nobody should skip a city, a beach or a day out because the right equipment was not available.

### Personality
| We are | We are not |
|---|---|
| Warm, homemade, a little goofy | Slick, corporate, medical |
| Practical and reassuring | Salesy or hype-driven |
| Trustworthy: verified owners, clear prices | Vague about costs or conditions |
| Inclusive without making a fuss of it | Patronising about disability |

The visual tone is a hand-drawn bakery sign: chunky lettering, warm crust colours, a friendly slice of pie. The content tone stays plain and precise, because a great many users are planning around real constraints.

### Voice and tone
- Speak to the person, not the condition. "Rent a lightweight folding wheelchair" not "equipment for the disabled".
- Lead with the outcome: "Get around Lisbon for €12/day" beats "Browse our catalogue".
- Short sentences. Active voice. No exclamation marks in UI, except the Scout's "On it!".
- Be specific about money and time. Always show the total before someone commits.
- Errors say what happened and what to do next. Never blame the user.

---

## 2. Logo

### The mark
The logo is a **slice of pie** drawn in a flat, hand-outlined sticker style: a brown top crust with a scalloped edge, a cut face showing cream sponge with a raspberry-red filling stripe, and a golden base crust. Everything sits inside a charcoal outline with rounded joins. It reads as "pi" (the name), "pie" (the pun) and "a slice of a place" (the promise).

- Outline: Charcoal (`#2B2B2B`), 3 units on a 64-unit grid, round joins and caps.
- Fills: Crust `#A7712F`, Cream `#F5E6C3`, Filling `#C8294A`, Base `#E8A93A`.
- The mark is delivered as inline SVG (`Pirents.pie()` in `app.js`) so it scales from favicon to hero without a raster.

### Wordmark
**PI RENTS** in Squeaky ExtraBold, uppercase, tracking +0.035em, in **Cocoa** (`#4A4038`): a warm near-black that reads as friendly rather than corporate, and lets the pie and the red buttons carry the colour. The mark sits left of the wordmark with a gap of about 0.45em.

The **.com** suffix appears only on the standalone logo asset (`assets/img/logo.svg`), social avatars and print, where the domain matters. It is never shown in the site header or footer.

The wordmark is hand-lettered in spirit; its slightly uneven strokes are the point. Never "clean it up" with a geometric sans.

### Variants
| Variant | Use |
|---|---|
| Full colour mark + Cocoa wordmark | Default. Header, documents, light backgrounds |
| Full colour mark + White wordmark | Dark backgrounds (footer, dark photos) |
| Single-colour Charcoal (outline only, no fills) | Print, stamps, embossing |
| Single-colour White | Overlays on photography |

### Clear space and minimum size
- Clear space around the full logo = height of the "P" on every side.
- Minimum mark size: 24 px on screen, 8 mm in print. Below 20 px use the favicon variant (mark on a Linen tile).
- Minimum full logo height: 28 px on screen.

### Don'ts
- Do not redraw the slice in 3D, add gradients or realistic texture.
- Do not recolour the filling green, blue or any non-food colour.
- Do not set the wordmark in Nunito or any clean sans.
- Do not place the mark on Brand Red or on Crust brown.
- Do not add ".com" to the wordmark inside the product.
- Do not set the wordmark in Brand Red; red is for actions.

---

## 3. Colour

The palette is lifted directly from the logo. Red is for action, gold and cream are the warmth, cocoa and warm charcoal do the talking, and Linen keeps everything calm. There is no cold grey anywhere in the system.

### Core palette
| Token | Hex | Role |
|---|---|---|
| **Brand Red** `--color-accent-500` | `#B5434B` | Primary buttons, wordmark, focus ring, eyebrows, active states |
| **Crust Gold** `--color-gold-500` | `#E8A93A` | Highlights, stars, "Instant" badges, wheels on the Scout, stats on dark |
| **Cream** `--color-cream` | `#F5E6C3` | Tinted backgrounds, avatars, empty-state marks, hero blob |
| **Linen** `--color-bg` | `#F7F3EC` | Page background and secondary colour. All pages sit on Linen |
| **Paper** `--color-surface` | `#FFFFFF` | Cards, inputs, sheets, header |
| **Cocoa** `--color-cocoa` | `#4A4038` | Wordmark, secondary buttons, selected chips, toasts, owner panel |
| **Charcoal** `--color-ink` | `#2F2A27` | Text, icons, outlines, footer (warm, not neutral black) |

Linen is deliberately dominant. Most of the screen is Linen with white cards, which gives the same calm as a grey but sits naturally next to cream and gold; red appears only where the next action is.

### Red scale
| Token | Hex | Use |
|---|---|---|
| `--color-accent-50` | `#FBF1F0` | Current nav item, selected rows |
| `--color-accent-100` | `#F6DDDC` | Soft highlights |
| `--color-accent-200` | `#EDB9BA` | Borders on tinted elements |
| `--color-accent-300` | `#E08F94` | Decorative, charts |
| `--color-accent-400` | `#CC6069` | Hover on tinted controls |
| `--color-accent-500` | `#B5434B` | **Brand.** Buttons, wordmark, focus |
| `--color-accent-600` | `#9C3740` | Primary button hover |
| `--color-accent-700` | `#7E2C34` | Links, red text on Linen (AAA) |
| `--color-accent-800` | `#62222A` | Pressed links |
| `--color-accent-900` | `#44171D` | Dark red surfaces |

### Gold, cream and crust
| Token | Hex | Use |
|---|---|---|
| `--color-gold-50` | `#FDF6E7` | Warm panel backgrounds |
| `--color-gold-100` | `#FBEBC9` | Accent badges, warning backgrounds, scooter tile |
| `--color-gold-500` | `#E8A93A` | Stars, highlights, stats on dark |
| `--color-gold-600` | `#D4952A` | Gold icons on white (3:1 UI contrast) |
| `--color-cream` | `#F5E6C3` | Tints, avatars, wheelchair tile |
| `--color-cream-2` | `#FAF3E3` | Selected card checkboxes |
| `--color-crust` | `#A7712F` | Illustration only |
| `--color-crust-dark` | `#7A4E14` | Text on gold and cream backgrounds |

### Neutrals
| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#2F2A27` | Headlines, body text, outlines |
| `--color-ink-2` | `#534D48` | Secondary text, labels |
| `--color-muted` | `#6F6A64` | Placeholder, captions, meta. Minimum for text on white and Linen |
| `--color-disabled` | `#A8A29A` | Disabled text and icons |
| `--color-border` | `#E6E0D6` | Default borders, dividers |
| `--color-border-strong` | `#CFC7BB` | Input borders |
| `--color-surface-2` | `#FBF8F3` | Nested panels, table stripes |
| `--color-bg` | `#F7F3EC` | Linen page background |

### Semantic colours
| Meaning | Text/icon | Background | Use |
|---|---|---|---|
| Success | `#1F7A3E` | `#E7F4EB` | Confirmed bookings, verified badges |
| Warning | `#8A5A00` | `#FBEBC9` | Pending, searching, expiring |
| Danger | `#A8201A` | `#FBE9E7` | Errors, cancellations. Danger buttons are outlined so they never look like a brand button |
| Info | `#1F5FBF` | `#E8EFFC` | Tips, neutral notices |

Because the brand colour is itself a red, semantic danger is used sparingly and always with an icon or word. Success is the only green in the system.

### Contrast rules
Verified against WCAG 2.2 AA (4.5:1 text, 3:1 UI).

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| Charcoal | Paper | 14.2:1 | ✅ |
| Charcoal | Linen | 12.8:1 | ✅ |
| Cocoa | Paper | 10.1:1 | ✅ Wordmark |
| Cocoa | Linen | 9.1:1 | ✅ |
| White | Brand Red | 5.4:1 | ✅ Button labels |
| Brand Red | Paper | 5.4:1 | ✅ Eyebrows |
| Brand Red | Linen | 4.9:1 | ✅ |
| Red 700 | Paper | 9.1:1 | ✅ Links |
| Charcoal | Crust Gold | 8.6:1 | ✅ |
| White | Crust Gold | 1.9:1 | ❌ Never |
| Crust Gold | Paper | 1.9:1 | ❌ Never as text; icons pair with a label |
| Crust Dark | Gold 100 | 6.2:1 | ✅ Badge text |
| Muted | Paper | 5.4:1 | ✅ Captions |
| Muted | Linen | 4.9:1 | ✅ |

Practical consequences:
- Primary buttons are Brand Red with **white text**.
- Gold is never text. Gold icons (stars) sit next to a number.
- Cream and gold backgrounds always carry Charcoal or Crust Dark text.

---

## 4. Typography

### Families
Two faces, one job each.

**Squeaky** (custom, self-hosted from `assets/fonts/squeaky.ttf`, single weight) is the display face: wordmark, headlines, step numbers, big stats, the Scout's speech. It is the hand-lettered face from the logo itself. Because its strokes are thin, it is used only at 32 px and above: the wordmark, display, h1 and h2, step numbers, big stats and the Scout's speech. Card titles (h3, h4), eyebrows, body and labels stay in Nunito. Headlines get a hairline text-stroke (0.02em) and synthetic bold so the strokes match the marker weight of the logo. It has no euro sign or slash, so those characters fall back to Nunito automatically; keep prices out of display-face headings where possible.

**Nunito** (Google Fonts, weights 400 to 800) is the text face: body, buttons, labels, prices, tables. Rounded terminals keep it friendly next to Squeaky, while its even rhythm and clear `1 l I` and `0 O` keep addresses and prices legible. Tabular figures are switched on for prices and tables.

Fallback for both: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

### Scale
Base size 16 px. Line heights are unitless.

| Token | Size / line height | Face, weight | Tracking | Use |
|---|---|---|---|---|
| `--text-display` | 56 / 1.02 | Squeaky 800 | +0.01em | Hero headline only |
| `--text-h1` | 40 / 1.08 | Squeaky 800 | +0.01em | Page titles |
| `--text-h2` | 32 / 1.12 | Squeaky 700 | +0.01em | Section titles |
| `--text-h3` | 24 / 1.2 | Nunito 800 | 0 | Card and panel titles |
| `--text-h4` | 20 / 1.25 | Nunito 800 | 0 | Sub-headings, listing names |
| `--text-lg` | 18 / 1.55 | Nunito 400 | 0 | Lead paragraphs |
| `--text-base` | 16 / 1.5 | Nunito 400 | 0 | Body |
| `--text-sm` | 14 / 1.45 | Nunito 500 | 0 | Meta, labels, secondary UI |
| `--text-xs` | 12 / 1.35 | Nunito 700 | +0.02em | Badges (uppercase) |
| Eyebrow | 12 / 1.3 | Nunito 800 | +0.1em | Uppercase section kickers, Brand Red |

On screens under 640 px, display drops to 40 px and h1 to 32 px.

### Rules
- Maximum measure for body text: 65 characters.
- Never go below 14 px for anything the user must read; 12 px only for uppercase badges.
- Headlines are sentence case; the wordmark and eyebrows are the only uppercase settings.
- Squeaky gets positive tracking, never negative; its letterforms need air.
- Squeaky is Pirents' own voice. Text written by owners (listing titles, descriptions, rules) is always set in Nunito, so a long or number-heavy title like "Foldable 4-wheel mobility scooter, 25 km range" stays legible. Listing cards use Nunito 800 at 20 px; the listing page title uses Nunito 800 at 32 px.
- Prices: Nunito 800, tabular figures, currency symbol attached: `€18` never `€ 18`. Per-unit in Muted: `€18 / day`.

---

## 5. Layout, spacing and shape

### Grid
- Content container: max 1200 px, 24 px side gutters (16 px under 640 px).
- 12-column fluid grid on desktop; cards collapse to 2 columns at 900 px and 1 column at 640 px.
- Listing detail uses a 7/5 split: content left, sticky booking panel right.

### Spacing scale (4 px base)
`--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-5` 20 · `--space-6` 24 · `--space-8` 32 · `--space-10` 40 · `--space-12` 48 · `--space-16` 64 · `--space-20` 80 · `--space-24` 96

Sections are separated by `--space-16` (64 px) on desktop, `--space-12` on mobile. Inside cards, padding is `--space-5` or `--space-6`.

### Breakpoints
| Name | Min width |
|---|---|
| sm | 640 px |
| md | 900 px |
| lg | 1200 px |

### Radius
| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8 px | Badges, small chips, inputs inside dense UI |
| `--radius-md` | 12 px | Buttons, inputs |
| `--radius-lg` | 16 px | Cards |
| `--radius-xl` | 24 px | Hero search bar, modals, feature panels |
| `--radius-full` | 999 px | Pills, avatars |

### Elevation
Linen + Paper already produce separation, so shadows are soft and rare.

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(18,21,19,.06)` | Cards at rest |
| `--shadow-md` | `0 6px 20px rgba(18,21,19,.08)` | Hovered cards, dropdowns, search bar |
| `--shadow-lg` | `0 16px 48px rgba(18,21,19,.14)` | Modals, sheets |

Borders (`--color-border`) are the default separator; shadows are added, not substituted.

---

## 6. Components

All interactive elements have a minimum hit area of **44 × 44 px** and a visible focus ring: `0 0 0 3px var(--color-surface), 0 0 0 6px var(--color-accent-500)`.

### Buttons
| Variant | Fill | Text | Border | Hover |
|---|---|---|---|---|
| Primary | Brand Red | White | none | Red 600 |
| Secondary | Ink | White | none | Ink-2 |
| Outline | transparent | Ink | Border-strong | Linen fill |
| Ghost | transparent | Ink | none | Linen fill |
| Danger | transparent | Danger text | Danger | Danger bg |

Sizes: `sm` 36 px, `md` 44 px (default), `lg` 52 px. Horizontal padding 16 / 20 / 28. Radius `--radius-md`. Weight 700. Icon + label gap 8 px. Disabled: 45% opacity, `cursor: not-allowed`, still readable.

Button labels are Nunito 800. One primary button per view region. The primary button always describes the outcome: "Request to book", "Publish listing", not "Submit".

### Inputs
- Height 48 px, padding 0 14 px, Paper fill, 1.5 px Border-strong border, radius `--radius-md`.
- Label above, weight 600, 14 px, Ink-2. Help text below in Muted.
- Focus: border Ink + focus ring. Error: border Danger, message in Danger with an icon.
- Placeholder is an example, not a label: "e.g. Lisbon" never "Location".
- Selects and date inputs match text input styling. Native controls are fine; do not rebuild them.

### Search bar
The signature component. A white pill (`--radius-xl`), `--shadow-md`, split into Where / From / To / What segments with a single primary "Search" button on the right. Collapses to a stacked card under 900 px.

### Cards
Paper fill, `--radius-lg`, 1 px Border, `--shadow-sm`. Hover on link cards: `--shadow-md` and 1 px translate up. Never nest a card in a card; use Surface-2 panels inside cards.

### Listing card
Image (4:3, radius `--radius-lg` top only), category badge top-left over the image, favourite toggle top-right. Below: title (Nunito 800, 2 lines max), location + gold star rating in `--text-sm`, then feature chips, then price line right-aligned. The whole card is one link; the favourite button is a separate control outside the link semantics.

### Badges and chips
- Badge: 12 px uppercase, weight 700, padding 4 10, radius `--radius-full`. Neutral (Linen / Ink-2), Accent (Gold 100 / Crust Dark), semantic pairs from §3.
- Chip (filter): 14 px, 36 px high, Border, radius full. Selected: Ink fill, White text. Chips are `<button aria-pressed>`.

### Navigation
- Header: 72 px, Paper, 1 px bottom border, sticky. Logo left, primary links centre (desktop), "List your item" outline button + account right.
- Under 900 px: logo, "List your item" ghost icon, and a menu button opening a full-height sheet.
- Language selector: a single flag in the header with the language's own name written inside it in white on a darkened band; no separate label or arrow. It opens a two-column grid of the other flags in the same style, current one outlined in Brand Red. 64 × 28 px, 7 px radius; 56 × 24.5 px on phones. The button carries an `aria-label` with the current language and the list is a `listbox`; Escape and outside clicks close it.
- Footer: Charcoal background, warm grey text, Gold column headings, inverse logo variant. Secondary buttons, selected chips, toasts and the owner panel use Cocoa instead of Charcoal so dark surfaces feel warm.

### Stepper (List your item)
Numbered circles 32 px. Done = Brand Red fill + White check. Current = Charcoal fill + White number. Upcoming = Border outline. Labels in `--text-sm`.

### Booking panel
Paper card, sticky at 96 px from top. Price per day at top (h3), date inputs, quantity, line items (nightly total, service fee, deposit), bold total, full-width primary button, reassurance line under it ("You won't be charged yet").

### Empty states
Illustration or π mark in a Cream circle with Crust Dark glyph, h4 title, one sentence, one primary action. No sad faces.

### The Scout (no results in a location)
An empty search result is not a dead end; it is the product's whole reason to exist. When a location has nothing to rent, the results area shows **the Scout**: a two-column card with an animated scene on the left and a request form on the right.

- **Character.** "π on wheels": the π glyph in Charcoal with two gold wheels under its legs, googly eyes on the bar and a magnifying glass. It rolls back and forth along a dashed ground line past cream-and-red map pins, wheels spinning, eyes darting, a red "?" popping when it turns around. Puffs of dust trail behind it. This is the one place in the product where the brand is allowed to be openly silly.
- **Copy.** Headline names the gap: "No wheelchairs in Naxos… yet." Body states the promise: tell us where, what and when, and we'll find a local owner or bring one on board before you arrive, usually within 48 hours.
- **Form.** Where (prefilled from the search), What (category), From and Until, optional details, email (prefilled when signed in). Primary button: "Find it for me". Secondary: "Clear filters instead" when filters caused the empty result, otherwise "See everything, everywhere".
- **Success.** The card is replaced by the celebration variant: π pops a wheelie under a small shower of confetti, with an "On it!" speech pill and a link to the request in the dashboard. Requests appear in the dashboard's Requests tab with a "Searching" status.
- **Motion rules still apply.** Only transform and opacity animate. Under `prefers-reduced-motion` the scene is a static pose with the "?" visible, and the form works identically.
- **Do not** reuse the character for errors, loading states or marketing pages. It means one thing: we don't have it here yet, and we're going to look.

### Toasts
Bottom centre, Ink fill, White text, radius `--radius-md`, auto-dismiss 4 s, `role="status"`.

---

## 7. Iconography and imagery

### Icons
Lucide-style line icons, 1.75 px stroke, 20 px default (24 px in nav, 16 px inline with `--text-sm`). Icons always have a text label or `aria-label`. Category icons live in `assets/img/icons.svg` as a sprite.

### Category tiles
Each category has a fixed tile colour used behind its icon wherever no photo exists:

| Category | Tile |
|---|---|
| Wheelchairs | Cream `#F5E6C3` |
| Mobility scooters | Gold 100 `#FBEBC9` |
| Bikes & e-bikes | Blush `#F6DDDC` |
| Cars & vans | Taupe `#E9E2D8` |
| Strollers | Pink `#FBE3EA` |
| Walkers & rollators | Sage `#E4EEE4` |
| Beach & outdoor | Peach `#FFE3CC` |
| Other | Warm grey `#ECE6DC` |

### Photography
Real, daylight, outdoors, people mid-activity. The equipment is visible but the picture is about the day out, not the device. No stock "hands reaching toward the sun". Owners' photos are shown at 4:3, cropped centre, never stretched.

---

## 8. Motion

- Durations: 120 ms (hover/press), 200 ms (reveal, toggle), 320 ms (sheets, modals).
- Easing: `cubic-bezier(.2,.7,.2,1)` for entrances, `ease-in` for exits.
- Only transform and opacity animate. No layout-affecting animations.
- `prefers-reduced-motion: reduce` disables all non-essential motion.

---

## 9. Accessibility

Accessibility is a product requirement, not a checklist. Targets: WCAG 2.2 AA everywhere, AAA for text contrast where feasible.

- **Keyboard**: every flow (search, filter, book, list an item) completes with keyboard only. Focus order follows visual order. Skip link is the first focusable element.
- **Hit targets**: 44 × 44 px minimum; 48 px preferred on primary flows.
- **Colour**: never the only carrier of meaning. Gold is decorative or a background for Charcoal text; it is never text. Brand Red is used only where it passes 4.5:1.
- **Motion**: honour reduced motion; no autoplaying carousels.
- **Forms**: visible labels always; errors inline and announced via `aria-live`; no time limits on booking forms.
- **Language**: plain language, reading age ~12. Explain fees before the total.
- **Zoom**: layouts work at 200% zoom and 320 px width without horizontal scroll.
- **Screen readers**: listing cards are one link with a full accessible name ("Lightweight folding wheelchair, Lisbon, €12 per day, rated 4.9"). Icon-only buttons have `aria-label`.
- **Accessibility details on listings**: weight, seat width, foldability, max user weight and delivery options are structured fields, not free text, so they can be filtered and read consistently.

---

## 10. UX writing

| Instead of | Write |
|---|---|
| Submit | Request to book / Publish listing / Save changes |
| Invalid input | Enter a date after today |
| Disabled users | People with reduced mobility / wheelchair users |
| Cheap | From €9 a day |
| Oops! Something went wrong | We couldn't save your listing. Check your connection and try again. |
| Click here | See all wheelchairs in Athens |

- Dates: "Sat 3 Oct" in UI, ISO in data.
- Prices: "€18 / day", totals "€126 total for 7 days".
- Units: metric first (kg, cm), imperial in brackets only where the listing owner adds it.

---

## 11. Token reference

The tokens above are implemented in `assets/css/tokens.css` as CSS custom properties. Component styles in `assets/css/components.css` consume tokens only; no raw hex values appear outside `tokens.css`. The living style guide at `styleguide.html` renders every token and component and must be updated with any change to this document.
