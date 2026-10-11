# The Wedding of Hani & Andi — Digital Invitation

Slicing of a wedding invitation design into a single, responsive, animated web page.
Built for the **Kompetensi Test — Front End Developer CT (Connectied)**.

---

## Stack

| Library | Version | Used for |
|---------|---------|----------|
| HTML5 / CSS3 | — | Markup, layout, design tokens, animations |
| [Bootstrap](https://getbootstrap.com/docs/4.6/) | 4.6.2 | Grid (`container` / `row` / `col`), form utilities, `sr-only`, responsive helpers |
| [jQuery](https://code.jquery.com/jquery-3.4.1.min.js) | 3.4.1 | DOM, events, gift copy, form logic |
| [AOS](https://michalsnik.github.io/aos/) | 2.3.1 | Scroll-reveal animations |
| [Swiper](https://swiperjs.com/) | 11 | Photo gallery slider |
| [Fancybox](https://fancyapps.com/fancybox/3/) | 3.5.7 | Gallery lightbox |
| [Google Fonts](https://fonts.google.com/) | — | Great Vibes (script), Libre Baskerville (serif body) |

All libraries are loaded from CDN — **no build step required**.

---

## Run

Open `index.html` directly in a browser, or serve the folder locally:

---

## Project Structure

```
index.html              Single-page markup
                        Sections: letter, home (hero), quote, wedding,
                        countdown, location, gallery, rsvp, gift, messages, thanks
style.css               Root stylesheet — imports all modular CSS files
scripts.js              ES module entry point — imports all JS modules
css/
  variables.css         Design tokens (color palette, font stacks)
  base.css              Reset / global base styles
  navbar.css            Desktop nav + mobile sidebar styles
  hero.css              Hero section
  quote.css             Qur''an quote section
  wedding.css           Couple cards section
  countdown.css         Countdown timer
  location.css          Venue / location section
  gallery.css           Swiper gallery
  rsvp.css              RSVP form panel
  gift.css              Gift / bank transfer section
  wedding-wish.css      Wedding wishes form & list
  thanks.css            Thank-you closing section
  letter.css            Opening letter / cover card
  audio-player.css      Floating audio button
js/
  navbar.js             Scroll-aware nav, active-section tracking, mobile sidebar
  aos.js                AOS initialisation
  countdown.js          Live countdown timer (Days / Hours / Minutes / Seconds)
  gallery.js            Swiper slider + Fancybox lightbox integration
  rsvp.js               RSVP form logic -> WhatsApp redirect on submit
  wedding-wish.js       Wish form, file upload/drag-drop, expandable wish list
  gift.js               One-click bank-number copy (Clipboard API + execCommand fallback)
  letter.js             Opening letter cover — locks scroll, animates out on CTA click
  audio-player.js       Floating play/pause button, autoplay on letter open
assets/
  *.svg                 Ornaments, borders, patterns, icons, logo
  image-*.jpg / *.png   Couple & venue photos
  music.mp3             Background music (~5.7 MB)
```

---

## Sections & Features

### Opening Letter
A full-screen cover card (`#openingLetter`) showing the couple's photo and an **"Open Invitation"** button.
- Page scroll is locked while the cover is visible (`letter-locked` class on `<html>`).
- Clicking the button dispatches a custom `letterOpen` event (consumed by the audio player), animates the card out, then initialises AOS and moves focus to the hero section.

### Hero (`#home`)
- Monogram logo, couple names, and wedding date with AOS entrance animations (`zoom-in`, `fade-up`).
- Decorative SVG ornaments (top-center, top-sides, sides, bottom-left, bottom-right).

### Qur'an Quote (`#quote`)
- QS. Ar-Rum : 21, styled with top/bottom SVG border ornaments.

### The Couple (`#wedding`)
- Bismillah SVG, Islamic greeting, introduction text.
- Two `<article>` couple cards (Hani & Andi) with circular arch photos and parent information, animated with AOS `fade-right` / `fade-left`.

### Countdown (`#countdown`)
- Live real-time timer counting down to **Sabtu, 19 September 2026 08:00 WIB**.
- Four animated boxes: Days · Hours · Minutes · Seconds, updated every second.
- Driven by `data-initial-days/hours/minutes/seconds` attributes with JS defaults as fallback.
- When the countdown reaches zero the interval stops automatically.

### Location (`#location`)
- Venue: **InterContinental Hotel Jakarta Pondok Indah**, Jl. Metro Pondok Indah Kav. IV TA, Jakarta 12310.
- Venue photo with AOS reveal.
- **"Arahkan ke Lokasi"** button links directly to Google Maps.
- Two event time cards: Akad Nikah 13.30 WIB · Resepsi Pernikahan 19.00–21.00 WIB.

### Gallery (`#gallery`)
- **Swiper** slider with 6 pre-wedding photos, loop mode, keyboard-enabled.
- Responsive breakpoints: 2 slides (< 768 px) → 3 slides (≥ 768 px) → 4 slides (≥ 1200 px).
- Prev / Next navigation buttons with accessible labels.
- Clicking any photo opens a **Fancybox** lightbox with zoom and slide transitions.
- Swipe-up/down and Esc close the lightbox; close button is always visible (never auto-hides).

### RSVP (`#rsvp`)
- Split layout: couple photo (left, desktop only) + form panel (right).
- Guest name pre-filled from the `?to=` URL parameter.
- Attendance radio pills: **Hadir** / **Tidak Hadir**.
- When attending: event selector (Akad Nikah / Resepsi / Keduanya) and per-event guest count dropdowns (1–5).
- On submit, opens **WhatsApp** (`wa.me`) with a pre-composed confirmation message.
- Inline status message shown after submission.

### Gift (`#gift`)
- Bank transfer card: **Bank BCA** (placeholder account) with a **Copy** button.
- Copy uses the Clipboard API, falling back to `document.execCommand('copy')`.
- Button label switches to "Copied" for 2 seconds, then resets.

### Wedding Wishes (`#messages`)
- Form with name, message (500-char max), and optional photo/video upload (up to 5 files, 25 MB each); drag-and-drop supported.
- On submit, new wish is prepended to the list (simulated 600 ms network delay).
- Five default sample wishes pre-populate the list.
- **"See all messages"** expands the full list with staggered AOS re-animations; collapses back on "Show less".

### Thank You (`#thanks`)
- Closing section with an appreciation message and the **Connectied** logo.

### Navigation
- Desktop: fixed horizontal navbar with links — HOME · THE WEDDING · LOCATION · GALLERY · RSVP · GIFT · PERSONAL MESSAGES.
- Gains `.scrolled` class after 25 px of scroll (visual state change).
- Active-link tracking highlights the link matching the current viewport section on scroll.
- Mobile / tablet: hamburger toggle opens a sidebar (`#sidebarNav`) with a backdrop overlay; closes on link click, overlay click, or Esc key.

### Audio Player
- Floating FAB button (`#audioFab`).
- `assets/music.mp3` starts automatically when the opening letter is dismissed (`letterOpen` event).
- Toggle play/pause; ARIA `aria-pressed` and `aria-label` updated on state change.
- Playing state reflected via `.is-playing` CSS class.

---

## Design Tokens (`css/variables.css`)

| Token | Value |
|-------|-------|
| `--orange` | `#e77b2f` |
| `--orange-deep` | `#d86524` |
| `--orange-hero` | `#cc7e2e` |
| `--cream` | `#F7E19F` |
| `--brown` | `#432416` |
| `--brown-soft` | `#6a3a27` |
| `--font-serif` | Libre Baskerville → Baskerville → Georgia |
| `--font-script` | Great Vibes → Brush Script MT → cursive |
| `--font-sans` | Helvetica Neue → Arial |

---

## Decisions & Notes

- **No build step.** Scripts load as native ES modules (`<script type="module">`); all libraries are CDN-hosted.
- **No backend.** RSVP submits via a WhatsApp deeplink. Wishes render client-side only with no cross-session persistence.
- **RSVP WhatsApp number** (`6281234567890`) and **bank account number** (`1234567890`) are placeholders.
- **Music file** (`assets/music.mp3`, ~5.7 MB) auto-plays when the invitation is first opened.
- **Countdown past the target date** — because 19 September 2026 has now passed, the countdown will tick from the configured initial offset and stop at 00:00:00:00 rather than showing negative values.
- **Assets** — all SVG ornaments and photos live flat inside `assets/`; Google Fonts are loaded from CDN (no local font files).

---

## Accessibility

- Semantic elements: `<section>`, `<header>`, `<main>`, `<nav>`, `<article>`, `<figure>`, `<blockquote>` — each with a descriptive `aria-label`.
- All decorative SVG ornaments and images carry `aria-hidden="true"`.
- All meaningful images have descriptive `alt` text.
- Form fields use `<label>` elements (or `.sr-only` visually-hidden labels) tied to their control via `for`/`id`.
- `role="status"` and `aria-live="polite"` on inline status messages (RSVP, gift copy, wish form).
- `role="radiogroup"` with `aria-label` on attendance and event radio groups.
- Mobile sidebar closes on Esc key press.
- Scroll is locked (`letter-locked` on `<html>`) while the opening cover is displayed, and released on dismiss.
