# Portfolio Design Spec — Abdulhalim Muhammad

**Date:** 2026-04-24
**Owner:** Abdulhalim Muhammad
**Status:** Approved (brainstorm phase)
**Next step:** Implementation plan via `writing-plans` skill

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Abdulhalim Muhammad |
| Role | Senior Software Architect |
| Tagline | "I architect intelligent digital systems." |
| Email | tsolution418@gmail.com |
| Available | Yes — open to work |
| LinkedIn | TODO: real URL (current bundle has placeholder `linkedin.com`) |
| GitHub | TODO: real URL (current bundle has placeholder `github.com`) |
| Location | TODO: city, country |
| CV PDF | TODO: drop into `/public/cv.pdf` |

---

## 2. Visual direction

**Style:** Brutalist Engineer — cream/off-white base, mono type for meta/labels, heavy display sans for hero/section titles, sharp grids, technical labels.

**Accent:** Signal Red `#ff3b14` — used sparingly: hero accent word, project numbers, hover states, CTA underlines.

**Inspiration reference:** dvdrod.com (motion language, custom cursor, big-type contact) — but on a brutalist cream base, not pure black.

**Themes:**
- **Light (default):** bg `#f5f1e8` (cream), fg `#0a0a0a` (near-black), accent `#ff3b14`.
- **Dark:** bg `#0a0a0a`, fg `#f5f1e8`, accent `#ff5a32` (slightly warmer for dark contrast).
- Toggle via `next-themes` with `class="dark"` strategy. No flash on load (script in `<head>`).

**Typography (locked):**
- **Display:** Archivo Black (Google Fonts). Used for hero, section titles, project numbers.
- **Mono:** JetBrains Mono (Google Fonts). Used for labels, navigation, tech pills, footer.
- **Body:** Inter (Google Fonts), 400/500/600 weights. Used for paragraphs, project descriptions.
- All loaded via `next/font/google` (self-hosted at build, no FOUT).

---

## 3. Architecture

| Concern | Decision |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + Lenis (smooth scroll) |
| Theme | `next-themes` (class strategy) |
| Hosting | Vercel (free tier sufficient) |
| Routing | Single page at `/` with anchor sections |
| Rendering | Static export (`output: 'export'` in `next.config.ts`) |
| Package manager | pnpm |

**Why Next.js (not Astro / Vite):** mainstream stack hiring managers immediately recognize, App Router + RSC handles the "static-but-interactive" case cleanly, Vercel deploy is one click, SEO is built in.

---

## 4. File structure

```
abdulhalimdev/
├─ app/
│  ├─ layout.tsx           # root, theme provider, fonts, <head> meta
│  ├─ page.tsx             # composes the 7 sections in order
│  ├─ globals.css          # tokens (CSS vars), Tailwind, base resets
│  └─ favicon.ico
├─ components/
│  ├─ layout/
│  │  ├─ Nav.tsx           # fixed top bar — logo · Work · About · Contact · ThemeToggle
│  │  ├─ Footer.tsx        # socials, local-time clock, copyright
│  │  ├─ ThemeToggle.tsx   # pill button (light/dark)
│  │  └─ CustomCursor.tsx  # floating "Guest 👋" tag, morphs on link hover
│  ├─ sections/
│  │  ├─ Hero.tsx          # massive name reveal + tagline + available pill
│  │  ├─ About.tsx         # 3-4 sentence bio + photo + CV link
│  │  ├─ Work.tsx          # 6 ProjectCard grid + "Browse archive" link
│  │  ├─ Stack.tsx         # 8 skill groups (marquee or grid)
│  │  ├─ Experience.tsx    # timeline, year right-aligned
│  │  └─ Contact.tsx       # giant "Say hi! / Let's talk" + magnetic email
│  ├─ ui/
│  │  ├─ Pill.tsx          # used for tech badges, "available" indicator
│  │  ├─ Marquee.tsx       # infinite horizontal scroll (CSS animation)
│  │  ├─ MagneticLink.tsx  # mouse-pull effect on hover
│  │  ├─ RevealText.tsx    # char/word stagger on scroll-into-view
│  │  ├─ ProjectCard.tsx   # image + meta + tech pills + hover scrub
│  │  └─ ArchiveList.tsx   # collapsible "Browse archive" inside <Work>
│  └─ motion/
│     ├─ SmoothScroll.tsx  # Lenis wrapper (root-level)
│     └─ useReveal.ts      # shared scroll-reveal hook
├─ lib/
│  ├─ content.ts           # ALL copy + projects + experience + skills + socials
│  ├─ fonts.ts             # next/font config
│  └─ utils.ts             # cn(), formatDate, etc.
├─ public/
│  ├─ projects/            # project hero images (.webp)
│  ├─ avatar.webp          # about-section photo (TODO)
│  └─ cv.pdf               # downloadable CV (TODO)
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 5. Sections (final 7)

Order on the page:

1. **Hero** — name (display sans, char-by-char reveal on load), role tagline, location, "● Available for work" pill (top right), scroll cue (bottom right). Fixed Nav overlays.
2. **About** — 3-4 sentence bio (using your real copy below), photo on right (square, slight grayscale → color on hover), "View CV →" magnetic link.
3. **Selected Work** — 6 `ProjectCard`s in a 2-column grid (mobile = single column). Card = image (16:10) + number (red) + title + category + tech pills. Below the grid: a **collapsible "Browse archive (16 more) ↓"** that expands an inline minimal list (title · category · tech · link) for the remaining 16 projects. Same `<Work>` section — no separate route.
4. **Stack & Expertise** — 8 skill groups, rendered as a marquee at top (group titles) + grid below (items). Mono type.
5. **Experience Timeline** — 3-4 roles with dates right-aligned. Subtle reveal on scroll. Pulled from your real timeline (2019–Present).
6. **Contact** — massive "Say hi!" → "Let's talk ↗" two-line display (the dvdrod move). Email is a magnetic link. Hover → cursor morphs to "● Say hi! 👋".
7. **Footer** — socials (LinkedIn / GitHub / Email), local-time clock (your timezone), "Built with Next.js + Framer Motion + Lenis", copyright year.

**Skipped (kept in `content.ts` as exports but not rendered):**
- Pillars (4 — Security First / Speed & Scale / Design Legacy / Strategic Code)
- Testimonials (3 — Sarah Chen / James Ramsay / Marco Rossi)
- Services (7) — fold into About copy instead

---

## 6. Real content extracted from previous portfolio

### 6.1 Bio (use as starting point for About — edit freely)

> I am Abdulhalim — Senior Software Architect, AI Specialist & Project Manager. I approach development with discipline and strategic thinking. I study the business first, then I design the architecture, and then I execute with precision. I don't build temporary solutions. I build systems meant to last.

### 6.2 Selected Work (top 6 — featured in `<Work>`)

```
1. Houzz                       — Home & Design / Marketplace
   React, Redux, Node.js, Elasticsearch
   "Scalable architectural mapping + matching algorithms between homeowners and pros."
   https://www.houzz.com/

2. Gordon Ramsay Restaurants   — Luxury Hospitality
   Next.js, Tailwind, Framer Motion
   "Frontend engineering for global luxury restaurant chains. Multi-brand digital experience."
   https://www.gordonramsayrestaurants.com/en/us

3. Hotwire                     — Travel / E-Commerce
   React, Node.js, Microservices, Docker
   "High-volume booking engines and secure payment gateways. Zero-downtime at peak."
   https://www.hotwire.com/

4. Future Fitness              — Health / SaaS
   React, TypeScript, Node.js, AWS
   "Lead architecture for high-performance training platform. Real-time coaching at scale."
   https://www.future.co/

5. ProHouse Platform           — Web3 / Real Estate
   Solidity, React, IPFS
   "Decentralized real estate via NFTs. Smart contracts for fractional property ownership."
   (No public link — tagged "Case study on request")

6. Butterfly iQ                — Medical / Imaging
   C++, Swift, Kotlin
   "Whole-body ultrasound imaging app. Real-time imaging + cloud integration."
   https://play.google.com/store/apps/details?id=com.butterflynetinc.helios
```

### 6.3 Project Archive (remaining 16 — minimal listing)

RepairPal · Trinity Solar · Wiley X · Smooche · Family Law Solutions · Tee Haven · Taste Salud · Farrie's Brussels · EventSource · Mindful · ZipBook · Habo · Patch Me · Leaf Lens · SO VEGAN · Trinity Orientation · UNOPS Collect · QR Menu · Life Checklist · (full data in `lib/content.ts`)

### 6.4 Stack groups (8 — for `<Stack>`)

```
Frontend         → React, Next.js, TypeScript, Tailwind CSS, Framer Motion
Backend & DB     → Node.js, Express, Python, PostgreSQL, MongoDB, REST APIs
AI & Automation  → AI Integration, Intelligent Systems, Workflow Automation, AI Architecture
Infrastructure   → System Architecture, AWS, Cloud Infrastructure, DevOps, CI/CD
Mobile           → React Native, Flutter, Mobile-Responsive Design
Design           → UI/UX Design, Figma, Product Thinking, User Experience
Management       → Professional Project Management, Agile, Team Leadership
Tools            → Git, Docker, Firebase, Vercel
```

### 6.5 Experience timeline (4 — for `<Experience>`)

```
2023 – Present   Senior Software Architect (Freelance / Self-employed)
2021 – 2023      Lead Software Architect (TODO: real company)
2019 – 2021      Full Stack Engineer (TODO: real company)
2018 – 2019      Software Developer (TODO: real company)
```
*Companies marked TODO — current bundle had no employer names.*

### 6.6 Hidden but available content (in `content.ts`, commented out)

Pillars (4), Testimonials (3 — Sarah Chen, James Ramsay, Marco Rossi), Services (7). Toggle on later by uncommenting the section component in `app/page.tsx`.

---

## 7. Animation system

**Libraries:**
- `framer-motion` — component-level animation, scroll-into-view reveals, layout animations
- `lenis` — smooth inertial scroll (60fps), drives parallax
- No GSAP — Framer Motion covers everything we need

**Components owning motion:**
- `<SmoothScroll>` — wraps `<body>`, mounts Lenis once
- `<RevealText>` — char/word stagger; used in Hero, section titles
- `<MagneticLink>` — links pull toward cursor on hover (used on email + nav items + CV link)
- `<CustomCursor>` — fixed-position div that follows mouse with spring physics; reads `data-cursor` attr on hovered element to morph label/shape
- `<ProjectCard>` — `whileHover={{ scale: 1.02 }}`, image inside `whileHover={{ scale: 1.04 }}`, accent underline scales `0 → 1` on x-axis
- `<Marquee>` — pure CSS `@keyframes` infinite translate, pauses on hover

**Per-section motion budget:**

| Section | Motion |
|---|---|
| Hero | Char-by-char name reveal on mount (200ms total stagger). Available pill pulses subtly. |
| About | Paragraph fades + slides up on scroll. Photo grayscale → color on hover. |
| Work | Cards stagger up on scroll-into-view (80ms gap). Hover = scrub + underline + cursor morph. Image parallax -8% on scroll. |
| Stack | Top marquee runs continuously. Skill grid fades in on view. |
| Experience | Each row reveals left-to-right on view. Year stays right-aligned. |
| Contact | "Say hi!" reveals on scroll. "Let's talk ↗" magnetic. Cursor morphs on email hover. |
| Footer | Socials hover = signal-red underline. |

**Reduced motion:** all animations gated by `useReducedMotion()` from Framer Motion. Reveal animations become instant fades; cursor follows without spring; marquee pauses.

---

## 8. Theme system

**Tokens** (in `globals.css` as CSS variables):

```css
:root {
  --bg: 245 241 232;        /* cream */
  --fg: 10 10 10;
  --accent: 255 59 20;      /* signal red */
  --muted: 130 125 115;
  --line: 10 10 10;
}
.dark {
  --bg: 10 10 10;
  --fg: 245 241 232;
  --accent: 255 90 50;
  --muted: 140 135 125;
  --line: 245 241 232;
}
```

Tailwind v4 reads these via `@theme` directive. Toggle persists in `localStorage` via `next-themes`.

---

## 9. Performance targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP (4G) | < 2.0s |
| CLS | < 0.05 |
| Total JS (gzipped) | < 150kb |
| Image format | WebP, served by `next/image` |
| Fonts | Self-hosted, `font-display: swap` |

---

## 10. SEO + metadata

- `<title>`: "Abdulhalim Muhammad — Senior Software Architect"
- `<meta description>`: from tagline + bio first sentence
- `og:image`: 1200x630 generated via `next/og` (cream background, big black name, red accent dot)
- `robots.txt`: allow all
- `sitemap.xml`: auto-generated (single URL)
- `theme-color`: matches active theme
- JSON-LD `Person` schema in `<head>`

---

## 11. Accessibility

- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- Skip-to-content link (visible on tab focus)
- All interactive elements keyboard-reachable; visible focus ring (2px signal-red, offset 2px)
- All images have `alt` text
- All animations respect `prefers-reduced-motion`
- Color contrast: every text/bg pair ≥ AA (cream + near-black is well over)
- Custom cursor does NOT replace native cursor — it overlays. Native cursor still visible.

---

## 12. Out of scope

- CMS (Contentful, Sanity, etc.) — `content.ts` is faster to edit
- Blog / writing section
- Open-source / GitHub stats embed
- i18n (English only)
- Analytics (Vercel Analytics is 1-line opt-in later if wanted)
- Newsletter signup
- Backend / API — pure static
- E2E test suite — manual QA + Lighthouse only for v1
- Project detail pages — work cards link out to live sites

---

## 13. Build phases (high-level — detailed plan from `writing-plans`)

1. Scaffold Next.js + TypeScript + Tailwind v4 + pnpm
2. Wire fonts, theme system, globals
3. Build `lib/content.ts` with all real content
4. Build layout shell (Nav, Footer, ThemeToggle)
5. Build motion primitives (SmoothScroll, RevealText, MagneticLink, CustomCursor)
6. Build sections in order: Hero → About → Work (incl. ArchiveList) → Stack → Experience → Contact
7. Polish pass: spacing, type scale, dark mode parity, reduced-motion paths
8. SEO meta + og:image + sitemap
9. Lighthouse audit + fix
10. Deploy to Vercel

---

## 14. Open TODOs the user must fill in

- Real LinkedIn URL
- Real GitHub URL
- City + country for location
- Real employer names for Experience entries (current data has dates only)
- CV PDF file
- About-section photo
- 6 hero images for the featured projects (or accept Unsplash placeholders matching the originals)

---

## 15. Risks

| Risk | Mitigation |
|---|---|
| Heavy motion hurts LCP | Lazy-load CustomCursor + Lenis after first paint; defer non-hero animation imports |
| Custom cursor breaks on touch | Detect `pointer: coarse` and disable cursor + fall back to native on mobile |
| Brutalist style polarizes hiring managers | Provide CV PDF download as a conventional fallback they can share |
| Real employer names missing | Ship with TODO markers; don't fabricate company names |
| Bundle size grows past 150kb | Audit at phase 7; tree-shake icon imports; consider replacing Framer Motion with `motion/react` mini if needed |
