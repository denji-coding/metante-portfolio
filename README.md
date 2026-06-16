# Sophia Anderson — Portfolio

## Project Structure

```
sophia-portfolio/
│
├── index.html            ← Main HTML (structure only, no inline styles or scripts)
│
├── css/
│   └── style.css         ← All styles, organized with a table of contents
│
├── js/
│   └── main.js           ← All scripts, organized with a table of contents
│
└── assets/
    └── images/           ← Drop profile photos and project screenshots here
        └── (place images here)
```

## How to Use

Open `index.html` in your browser — no build step needed.

## Adding a Real Profile Photo

1. Drop your photo into `assets/images/` (e.g. `profile.jpg`)
2. In `index.html`, find the Hero section and replace:
   ```html
   <span class="hero-img-placeholder">SA</span>
   ```
   with:
   ```html
   <img src="assets/images/profile.jpg" alt="Sophia Anderson" />
   ```
3. Do the same in the About section for `about-img-box`.

## CSS — Table of Contents (`css/style.css`)

| # | Section |
|---|---------|
| 01 | CSS Variables (Design Tokens) |
| 02 | Reset & Base |
| 03 | Typography |
| 04 | Layout Utilities |
| 05 | Glass Card |
| 06 | Navbar |
| 07 | Mobile Nav |
| 08 | Hero Section |
| 09 | About Section |
| 10 | Education / Timeline |
| 11 | Skills Section |
| 12 | Achievements Carousel |
| 13 | Certificate Modal |
| 14 | Projects Section |
| 15 | Contact Section |
| 16 | Footer |
| 17 | Back to Top Button |
| 18 | Background Effects |
| 19 | Responsive — Tablet (≤900px) |
| 20 | Responsive — Mobile (≤768px) |
| 21 | Responsive — Small Mobile (≤600px / ≤480px) |

## JS — Table of Contents (`js/main.js`)

| # | Feature |
|---|---------|
| 01 | AOS (Animate On Scroll) |
| 02 | Particles Background |
| 03 | Typing Animation (Hero) |
| 04 | Navbar Scroll Behavior |
| 05 | Skill Bars (Intersection Observer) |
| 06 | Mobile Navigation |
| 07 | Achievements Carousel |
| 08 | Certificate Modal |
| 09 | Contact Form Submit Handler |
