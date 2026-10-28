# Aryan Patil — Portfolio (React + Vite + Tailwind + JavaScript)

Typography-led, motion-driven personal portfolio. No TypeScript, no Next.js —
plain JavaScript with React.

## Stack
- **React 19** (Vite)
- **Tailwind CSS v4** (`@tailwindcss/vite`, no config file — tokens live in CSS)
- **JavaScript** (`.jsx` / `.js`)
- **GSAP + ScrollTrigger** — all scroll and hover animation
- **Lenis** — smooth scrolling, wired into the GSAP ticker

## Commands
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview   # serve the production build
```

## Structure
```
index.html                    fonts, SEO tags, no-flash theme script
src/
  main.jsx                    entry
  App.jsx                     section composition + lazy loading
  index.css                   design tokens, theme, utilities
  lib/
    anim.js                   GSAP setup, shared eases/durations
    data.js                   ALL site content — edit this one file
    blur.js                   generated LQIP placeholders
  components/
    providers/SmoothScroll.jsx
    ui/      Preloader, Nav, Cursor, Magnetic, Marquee, SplitText,
             ThemeToggle, Ambient
    sections/Hero, About, Stack, Work, Experience, Testimonials,
             Contact, Footer
```

## Editing content
Everything (name, email, phone, socials, projects, stack, experience,
testimonials) lives in **`src/lib/data.js`**. Change it there and the whole site
updates.

## Theming
Dark/light is a class on `<html>` plus CSS custom properties in `index.css`.

Only **four** tokens flip between themes:

| token | light | dark |
|---|---|---|
| `--c-bone` | `#efebe4` page background | `#0a0a0a` |
| `--c-ink` | `#0b0b0b` text | `#f2eee7` |
| `--c-dust` | `#6b665e` muted text | `#8a857d` |
| `--c-accent` | `#c7452b` | `#e0654a` |

The panel tokens (`--c-noir`, `--c-on-noir`, `--c-dust-on-noir`) are `var()`
references to those four, so **every section follows the toggle automatically** —
no section can be left behind on the old theme. Sections are separated by
hairlines (`.panel`), never by inverted colour blocks.

All text is verified to meet WCAG AA in both themes (min 4.79:1).

## Notes
- Custom cursor, pointer parallax and the hero liquid warp are desktop-only
  (`pointer: fine`) and fully disabled under `prefers-reduced-motion`.
- Ambient audio is synthesised with the Web Audio API — no audio file is
  downloaded. It starts muted; browsers require a gesture to play sound.
- Images use native `loading="lazy"` with a base64 LQIP background. Regenerate
  placeholders with the script in the sibling Next.js project if images change.

## Deployment

### Vercel
Connect this repo to Vercel and deploy. The included `vercel.json` configures
the build command (`npm run build`), output directory (`dist`), and cache
headers for fonts and assets.

### Manual build
```bash
npm run build
```
Serve the `dist/` folder with any static host (Netlify, GitHub Pages, etc.).
