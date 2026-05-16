# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a brutalist-engineer style single-page portfolio for Abdulhalim Muhammad (Senior Software Architect) — Next.js 15, Tailwind v4, Framer Motion, Lenis, dvdrod-grade motion, Lighthouse ≥95.

**Architecture:** Static-exported Next.js App Router site rendered at `/`. All content lives in a single typed `lib/content.ts`. Sections compose into `app/page.tsx`. Motion is centralized in `components/motion/` and used by sections. Light/dark theme via `next-themes` with CSS variables.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, Lenis, next-themes, next/font (Archivo Black, JetBrains Mono, Inter), Vitest + React Testing Library, Vercel.

**Spec:** See [docs/superpowers/specs/2026-04-24-portfolio-design.md](../specs/2026-04-24-portfolio-design.md).

**Working directory:** `c:/Users/Abdulhalim/OneDrive/Desktop/ABDULHALIMDEV` (the Next.js app is initialized at this root — `app/`, `components/`, `lib/` are top-level).

**Platform:** Windows. Use bash for the `pnpm dlx create-next-app` step (Unix-style paths). Other commands are cross-platform via pnpm scripts.

---

## File Structure

```
ABDULHALIMDEV/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  ├─ opengraph-image.tsx       # generated 1200×630 OG image
│  ├─ robots.ts
│  ├─ sitemap.ts
│  └─ favicon.ico
├─ components/
│  ├─ layout/
│  │  ├─ Nav.tsx
│  │  ├─ Footer.tsx
│  │  ├─ ThemeToggle.tsx
│  │  └─ CustomCursor.tsx
│  ├─ sections/
│  │  ├─ Hero.tsx
│  │  ├─ About.tsx
│  │  ├─ Work.tsx
│  │  ├─ Stack.tsx
│  │  ├─ Experience.tsx
│  │  └─ Contact.tsx
│  ├─ ui/
│  │  ├─ Pill.tsx
│  │  ├─ Marquee.tsx
│  │  ├─ MagneticLink.tsx
│  │  ├─ RevealText.tsx
│  │  ├─ ProjectCard.tsx
│  │  └─ ArchiveList.tsx
│  └─ motion/
│     ├─ SmoothScroll.tsx
│     └─ useReveal.ts
├─ lib/
│  ├─ content.ts
│  ├─ fonts.ts
│  └─ utils.ts
├─ public/
│  ├─ projects/        # 6 hero images (.webp) — placeholder Unsplash URLs in content.ts
│  ├─ avatar.webp      # TODO: real photo
│  └─ cv.pdf           # TODO: real CV
├─ tests/
│  ├─ setup.ts
│  ├─ utils.test.ts
│  ├─ content.test.ts
│  └─ components/
│     ├─ Pill.test.tsx
│     ├─ ProjectCard.test.tsx
│     ├─ ArchiveList.test.tsx
│     └─ ThemeToggle.test.tsx
├─ next.config.ts
├─ tailwind.config.ts
├─ vitest.config.ts
├─ tsconfig.json
├─ package.json
├─ pnpm-lock.yaml
├─ .gitignore
└─ README.md
```

---

## Phase 0 — Scaffold & Tooling (Tasks 1-3)

### Task 1: Initialize Next.js 15 project at the working directory root

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`, `README.md`

- [ ] **Step 1: Confirm working directory is empty (or only has `docs/` and `.superpowers/`)**

```bash
ls -la
```
Expected: only `docs/`, `.superpowers/` (and possibly `.git/` if user pre-init'd). No `package.json`.

- [ ] **Step 2: Run create-next-app with locked flags**

```bash
pnpm dlx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir false \
  --import-alias "@/*" \
  --use-pnpm \
  --no-turbopack \
  --skip-install
```
Expected: scaffolds Next.js 15 with App Router, Tailwind v4, ESLint, TS at the root. Prompts answered via flags.

- [ ] **Step 3: Install dependencies**

```bash
pnpm install
```
Expected: `pnpm-lock.yaml` created. No errors.

- [ ] **Step 4: Configure static export in `next.config.ts`**

Replace the file contents with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
```

(Static export requires `images.unoptimized` because `next/image` optimizer needs a server.)

- [ ] **Step 5: Verify build works**

```bash
pnpm build
```
Expected: build succeeds, `out/` directory generated with `index.html`.

- [ ] **Step 6: Initialize git (if not already) and commit**

```bash
git init -b main 2>/dev/null || true
git add .
git commit -m "chore: scaffold next.js 15 project with tailwind v4 and static export"
```

---

### Task 2: Add testing stack (Vitest + React Testing Library + jsdom)

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`
- Modify: `package.json` (add scripts)

- [ ] **Step 1: Install test dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    css: false,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 3: Create `tests/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());
```

- [ ] **Step 4: Add scripts to `package.json`**

Inside `"scripts"`, add:

```json
"test": "vitest run",
"test:watch": "vitest",
"typecheck": "tsc --noEmit"
```

- [ ] **Step 5: Sanity test — write a passing trivial test**

Create `tests/sanity.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("sanity", () => {
  it("works", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run tests**

```bash
pnpm test
```
Expected: 1 test passes.

- [ ] **Step 7: Delete the sanity test and commit**

```bash
rm tests/sanity.test.ts
git add .
git commit -m "chore: add vitest + react testing library"
```

---

### Task 3: Install runtime dependencies (Framer Motion, Lenis, next-themes)

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime deps**

```bash
pnpm add framer-motion lenis next-themes clsx tailwind-merge
```

- [ ] **Step 2: Verify installation**

```bash
pnpm list framer-motion lenis next-themes
```
Expected: all three printed with versions.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add framer-motion, lenis, next-themes, clsx, tailwind-merge"
```

---

## Phase 1 — Foundation (Tasks 4-7)

### Task 4: Theme tokens + global CSS

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` with theme tokens**

```css
@import "tailwindcss";

@theme {
  --color-bg: rgb(245 241 232);
  --color-fg: rgb(10 10 10);
  --color-accent: rgb(255 59 20);
  --color-muted: rgb(130 125 115);
  --color-line: rgb(10 10 10);
  --font-display: var(--font-archivo-black), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
  --font-body: var(--font-inter), system-ui, sans-serif;
}

:root {
  --bg: 245 241 232;
  --fg: 10 10 10;
  --accent: 255 59 20;
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

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: rgb(var(--bg));
  color: rgb(var(--fg));
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body { overflow-x: hidden; }

::selection { background: rgb(var(--accent)); color: rgb(var(--bg)); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

a:focus-visible, button:focus-visible {
  outline: 2px solid rgb(var(--accent));
  outline-offset: 2px;
}
```

- [ ] **Step 2: Verify dev server boots**

```bash
pnpm dev
```
Expected: `http://localhost:3000` returns the default Next.js page on cream background. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add brutalist theme tokens (light/dark) to globals.css"
```

---

### Task 5: Configure fonts via next/font

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `lib/fonts.ts`**

```ts
import { Archivo_Black, JetBrains_Mono, Inter } from "next/font/google";

export const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
```

- [ ] **Step 2: Wire fonts into `app/layout.tsx`**

Replace the file with:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { archivoBlack, jetbrainsMono, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Abdulhalim Muhammad — Senior Software Architect",
  description: "I architect intelligent digital systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify fonts load**

```bash
pnpm dev
```
Expected: page renders, no font 404s in network tab. Stop with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add lib/fonts.ts app/layout.tsx
git commit -m "feat: wire next/font (archivo black, jetbrains mono, inter)"
```

---

### Task 6: Utilities (`cn` helper)

**Files:**
- Create: `lib/utils.ts`, `tests/utils.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/utils.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("dedupes conflicting tailwind classes (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
  it("handles arrays and objects", () => {
    expect(cn("a", ["b", "c"], { d: true, e: false })).toBe("a b c d");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test tests/utils.test.ts
```
Expected: FAIL — `Cannot find module '@/lib/utils'`.

- [ ] **Step 3: Implement `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test tests/utils.test.ts
```
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/utils.ts tests/utils.test.ts
git commit -m "feat: add cn() utility with twMerge + clsx"
```

---

### Task 7: Content data + types (`lib/content.ts`)

**Files:**
- Create: `lib/content.ts`, `tests/content.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { content } from "@/lib/content";

describe("content", () => {
  it("has identity fields", () => {
    expect(content.identity.name).toBe("Abdulhalim Muhammad");
    expect(content.identity.role).toBe("Senior Software Architect");
    expect(content.identity.email).toMatch(/@/);
  });
  it("has exactly 6 featured projects", () => {
    expect(content.featuredProjects).toHaveLength(6);
  });
  it("has at least 16 archive projects", () => {
    expect(content.archiveProjects.length).toBeGreaterThanOrEqual(16);
  });
  it("has 8 stack groups", () => {
    expect(content.stackGroups).toHaveLength(8);
  });
  it("every featured project has required fields", () => {
    for (const p of content.featuredProjects) {
      expect(p.title).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.tech.length).toBeGreaterThan(0);
      expect(p.image).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test tests/content.test.ts
```
Expected: FAIL — `Cannot find module '@/lib/content'`.

- [ ] **Step 3: Implement `lib/content.ts`**

```ts
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
};

export type StackGroup = { title: string; items: string[] };
export type ExperienceEntry = { dates: string; role: string; company: string };
export type Testimonial = { name: string; role: string; company: string; content: string };
export type Pillar = { number: string; title: string; description: string };

export const content = {
  identity: {
    name: "Abdulhalim Muhammad",
    role: "Senior Software Architect",
    tagline: "I architect intelligent digital systems.",
    email: "tsolution418@gmail.com",
    location: "TODO: city, country",
    available: true,
    socials: {
      linkedin: "https://www.linkedin.com",   // TODO: real URL
      github: "https://github.com",            // TODO: real URL
    },
    cvUrl: "/cv.pdf",                          // TODO: drop file in /public
    avatarUrl: "/avatar.webp",                 // TODO: drop file in /public
  },

  about: `I am Abdulhalim — Senior Software Architect, AI Specialist & Project Manager. I approach development with discipline and strategic thinking. I study the business first, then I design the architecture, and then I execute with precision. I don't build temporary solutions. I build systems meant to last.`,

  featuredProjects: [
    {
      id: "houzz",
      title: "Houzz",
      category: "Home & Design · Marketplace",
      description: "Scalable architectural mapping and matching algorithms between homeowners and home professionals.",
      tech: ["React", "Redux", "Node.js", "Elasticsearch"],
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop",
      liveUrl: "https://www.houzz.com/",
    },
    {
      id: "gordon-ramsay",
      title: "Gordon Ramsay Restaurants",
      category: "Luxury Hospitality",
      description: "Frontend engineering for global luxury restaurant chains. Multi-brand digital experience.",
      tech: ["React", "Next.js", "Tailwind", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
      liveUrl: "https://www.gordonramsayrestaurants.com/en/us",
    },
    {
      id: "hotwire",
      title: "Hotwire",
      category: "Travel · E-Commerce",
      description: "High-volume booking engines and secure payment gateways. Zero-downtime at peak traffic.",
      tech: ["React", "Node.js", "Microservices", "Docker"],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
      liveUrl: "https://www.hotwire.com/",
    },
    {
      id: "future-fitness",
      title: "Future Fitness",
      category: "Health · SaaS",
      description: "Lead architecture for high-performance training platform. Real-time coaching at scale.",
      tech: ["React", "TypeScript", "Node.js", "AWS"],
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
      liveUrl: "https://www.future.co/",
    },
    {
      id: "prohouse",
      title: "ProHouse Platform",
      category: "Web3 · Real Estate",
      description: "Decentralized real estate via NFTs. Smart contracts for fractional property ownership.",
      tech: ["Solidity", "React", "IPFS"],
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "butterfly-iq",
      title: "Butterfly iQ",
      category: "Medical · Imaging",
      description: "Whole-body ultrasound imaging app. Real-time imaging plus cloud integration.",
      tech: ["C++", "Swift", "Kotlin"],
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200&auto=format&fit=crop",
      liveUrl: "https://play.google.com/store/apps/details?id=com.butterflynetinc.helios",
    },
  ] satisfies Project[],

  archiveProjects: [
    { id: "repairpal", title: "RepairPal", category: "Automotive · SaaS", description: "Auto repair estimating interfaces and certified mechanic discovery for millions of drivers.", tech: ["React", "TypeScript", "GraphQL", "AWS"], image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://repairpal.com/" },
    { id: "trinity-solar", title: "Trinity Solar", category: "Energy · Corporate", description: "Online experience revamp for one of the largest solar companies. Lead-funnel focus.", tech: ["Next.js", "Vercel", "Tailwind", "Salesforce API"], image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://www.trinitysolar.com/" },
    { id: "wiley-x", title: "Wiley X", category: "E-Commerce · Retail", description: "Premium protective eyewear platform with prescription lens integrations.", tech: ["Magento", "React", "Node.js"], image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://www.wileyx.com/" },
    { id: "smooche", title: "Smooche", category: "E-Commerce · Beauty", description: "Highly visual beauty platform focused on influencer-driven sales.", tech: ["React", "Shopify", "Tailwind"], image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://smooche.com/" },
    { id: "family-law", title: "Family Law Solutions", category: "Legal · Corporate", description: "Premium digital presence for a Minnesota family law firm with secure client portal.", tech: ["Next.js", "Tailwind CSS", "CMS", "SEO"], image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://familylawsolutionsmn.com/" },
    { id: "tee-haven", title: "Tee Haven", category: "E-Commerce · Apparel", description: "Custom apparel shop with live product preview and secure checkout.", tech: ["Next.js", "Commerce.js", "Stripe"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://teehavenpk.com/" },
    { id: "taste-salud", title: "Taste Salud", category: "E-Commerce · CPG", description: "High-converting digital storefront for a hydration brand.", tech: ["Shopify Plus", "Liquid", "React", "Tailwind"], image: "https://images.unsplash.com/photo-1546548970-71785318a306?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://tastesalud.com/" },
    { id: "farries", title: "Farrie's Brussels", category: "E-Commerce · Fashion", description: "Sleek luxury storefront for high-end European fashion.", tech: ["Shopify", "Next.js", "Framer Motion"], image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://farriesbrussels.com/" },
    { id: "eventsource", title: "EventSource", category: "Events · Directory", description: "Fast-loading event vendor discovery directories with dynamic filtering.", tech: ["React", "Next.js", "PostgreSQL", "Redis"], image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://www.eventsource.ca/" },
    { id: "mindful", title: "Mindful — Focus & Screen Time", category: "Productivity · Health", description: "Open-source app to control screen time and block distractions.", tech: ["Kotlin", "Android SDK", "Room"], image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.mindful.android" },
    { id: "zipbook", title: "ZipBook App", category: "Fintech · Mobile", description: "Digital wallet and transaction management with real-time financial analytics.", tech: ["Flutter", "Firebase", "Node.js"], image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop" },
    { id: "habo", title: "Habo", category: "Productivity · Lifestyle", description: "Simple open-source habit tracker.", tech: ["React Native", "Redux", "Node.js"], image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fd16f?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.pavlenko.Habo" },
    { id: "patch-me", title: "Patch Me", category: "Medical · Health", description: "Eye-patch tracking app for parents.", tech: ["Flutter", "Dart", "SQLite"], image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.edocllc.patch_me" },
    { id: "leaf-lens", title: "Leaf Lens", category: "Education · Utilities", description: "Snap, detect, protect — identifying plant diseases instantly.", tech: ["Python", "TensorFlow", "Android"], image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229ce?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.leaflens.pdda2" },
    { id: "so-vegan", title: "SO VEGAN", category: "Food & Drink", description: "600+ plant-based recipes, shopping lists, videos.", tech: ["React Native", "TypeScript", "Firebase"], image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.wearesovegan.app" },
    { id: "trinity-orientation", title: "Trinity Orientation", category: "Education", description: "Orientation app for new students.", tech: ["React Native", "iOS", "Android"], image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=com.tory.trinityOrientation" },
    { id: "unops", title: "UNOPS Collect", category: "Productivity", description: "Phone-based replacement for paper forms with offline data collection.", tech: ["Android", "Kotlin", "Java"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", liveUrl: "https://play.google.com/store/apps/details?id=org.unops.collect" },
    { id: "qr-menu", title: "QR Menu & Food Ordering", category: "F&B · Mobile", description: "Local ordering for tier-2/3 cities. Easy-to-use QR menu interface.", tech: ["Flutter", "Firebase", "WhatsApp API"], image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop" },
  ] satisfies Project[],

  stackGroups: [
    { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { title: "Backend & DB", items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs"] },
    { title: "AI & Automation", items: ["AI Integration", "Intelligent Systems", "Workflow Automation", "AI Architecture"] },
    { title: "Infrastructure", items: ["System Architecture", "AWS", "Cloud Infrastructure", "DevOps", "CI/CD"] },
    { title: "Mobile", items: ["React Native", "Flutter", "Mobile-Responsive Design"] },
    { title: "Design", items: ["UI/UX Design", "Figma", "Product Thinking", "User Experience"] },
    { title: "Management", items: ["Project Management", "Agile", "Team Leadership"] },
    { title: "Tools", items: ["Git", "Docker", "Firebase", "Vercel"] },
  ] satisfies StackGroup[],

  experience: [
    { dates: "2023 — Present", role: "Senior Software Architect", company: "Freelance / Independent" },
    { dates: "2021 — 2023", role: "Lead Software Architect", company: "TODO: real company" },
    { dates: "2019 — 2021", role: "Full Stack Engineer", company: "TODO: real company" },
    { dates: "2018 — 2019", role: "Software Developer", company: "TODO: real company" },
  ] satisfies ExperienceEntry[],

  // Hidden but available — uncomment in app/page.tsx to render later.
  pillars: [
    { number: "01", title: "Security First", description: "Architecting for absolute data integrity and compliance." },
    { number: "02", title: "Speed & Scale", description: "Zero-latency infrastructures that never slow down." },
    { number: "03", title: "Design Legacy", description: "Building interfaces that stay modern for years." },
    { number: "04", title: "Strategic Code", description: "Technical debt prevention through clean patterns." },
  ] satisfies Pillar[],

  testimonials: [
    { name: "Sarah Chen", role: "Product Lead", company: "Future.co", content: "Abdulhalim's ability to architect scalable systems is unparalleled. He didn't just write code; he built a foundation that allowed our platform to handle a 300% increase in traffic without a single hiccup." },
    { name: "James Ramsay", role: "Operations Director", company: "Global Hospitality Group", content: "A rare talent who understands both the technical intricacies of the backend and the aesthetic demands of high-end frontend design." },
    { name: "Marco Rossi", role: "Founder", company: "ProHouse Blockchain", content: "We needed someone who could bridge the gap between traditional real estate and Web3. Abdulhalim delivered a secure, user-friendly platform that exceeded our investors' expectations." },
  ] satisfies Testimonial[],
};
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test tests/content.test.ts
```
Expected: 5 tests pass.

- [ ] **Step 5: Run typecheck**

```bash
pnpm typecheck
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/content.ts tests/content.test.ts
git commit -m "feat: add typed content data with featured + archive projects"
```

---

## Phase 2 — Theme System (Tasks 8-9)

### Task 8: ThemeProvider in root layout

**Files:**
- Create: `components/layout/ThemeProvider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/layout/ThemeProvider.tsx`**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />;
}
```

- [ ] **Step 2: Wrap root layout with ThemeProvider**

Update `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { archivoBlack, jetbrainsMono, inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: "Abdulhalim Muhammad — Senior Software Architect",
  description: "I architect intelligent digital systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify typecheck and dev**

```bash
pnpm typecheck && pnpm dev
```
Expected: no errors. Stop dev with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add components/layout/ThemeProvider.tsx app/layout.tsx
git commit -m "feat: wire next-themes provider with class strategy"
```

---

### Task 9: ThemeToggle component

**Files:**
- Create: `components/layout/ThemeToggle.tsx`, `tests/components/ThemeToggle.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/ThemeToggle.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

function renderWithTheme(initial: "light" | "dark" = "light") {
  return render(
    <ThemeProvider attribute="class" defaultTheme={initial} enableSystem={false}>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  it("renders a button with the current theme label", () => {
    renderWithTheme("light");
    const btn = screen.getByRole("button", { name: /toggle theme/i });
    expect(btn).toBeInTheDocument();
  });

  it("toggles the html class when clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme("light");
    const btn = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(btn);
    // next-themes sets the class on <html> in jsdom
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test tests/components/ThemeToggle.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/layout/ThemeToggle'`.

- [ ] **Step 3: Implement `components/layout/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = (mounted ? resolvedTheme ?? theme : "light") ?? "light";
  const next = current === "dark" ? "light" : "dark";
  const label = current === "dark" ? "LIGHT" : "DARK";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-widest",
        "border-[rgb(var(--line))] text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg))] hover:text-[rgb(var(--bg))] transition-colors",
        className
      )}
    >
      <span className="inline-block size-3 rounded-full bg-[rgb(var(--fg))]" aria-hidden />
      {label}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test tests/components/ThemeToggle.test.tsx
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/layout/ThemeToggle.tsx tests/components/ThemeToggle.test.tsx
git commit -m "feat: add theme toggle pill button"
```

---

## Phase 3 — Layout Shell (Tasks 10-11)

### Task 10: Nav component

**Files:**
- Create: `components/layout/Nav.tsx`

- [ ] **Step 1: Implement `components/layout/Nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { content } from "@/lib/content";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const items = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference">
      <nav className="max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between text-[rgb(var(--bg))]">
        <Link href="#top" className="font-display text-lg tracking-tight uppercase">
          {content.identity.name.split(" ")[0]}
        </Link>
        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="hover:opacity-60 transition-opacity">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle className="border-[rgb(var(--bg))] text-[rgb(var(--bg))]" />
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
pnpm typecheck
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "feat: add fixed top nav with mix-blend-difference"
```

---

### Task 11: Footer component (with local-time clock)

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Implement `components/layout/Footer.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";

function useLocalTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Footer() {
  const time = useLocalTime();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--line))] mt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs uppercase tracking-widest">
        <div>
          <div className="opacity-50 mb-2">Local time</div>
          <div suppressHydrationWarning>{time || "—"}</div>
        </div>
        <div>
          <div className="opacity-50 mb-2">Email</div>
          <a href={`mailto:${content.identity.email}`} className="hover:text-[rgb(var(--accent))] transition-colors">
            {content.identity.email}
          </a>
        </div>
        <div>
          <div className="opacity-50 mb-2">Social</div>
          <div className="flex flex-col gap-1">
            <a href={content.identity.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[rgb(var(--accent))]">LinkedIn ↗</a>
            <a href={content.identity.socials.github} target="_blank" rel="noreferrer" className="hover:text-[rgb(var(--accent))]">GitHub ↗</a>
          </div>
        </div>
        <div>
          <div className="opacity-50 mb-2">Built with</div>
          <div>Next.js · Framer Motion · Lenis</div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-6 font-mono text-[10px] uppercase tracking-widest opacity-40">
        © {year} {content.identity.name}
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add footer with live local-time clock"
```

---

## Phase 4 — Motion Primitives (Tasks 12-15)

### Task 12: SmoothScroll (Lenis wrapper)

**Files:**
- Create: `components/motion/SmoothScroll.tsx`

- [ ] **Step 1: Implement `components/motion/SmoothScroll.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/SmoothScroll.tsx
git commit -m "feat: add Lenis smooth scroll wrapper"
```

---

### Task 13: useReveal hook + RevealText component

**Files:**
- Create: `components/motion/useReveal.ts`, `components/ui/RevealText.tsx`

- [ ] **Step 1: Create `components/motion/useReveal.ts`**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, shown } as const;
}
```

- [ ] **Step 2: Create `components/ui/RevealText.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  splitBy?: "char" | "word";
};

export function RevealText({
  children,
  className,
  as: Tag = "span",
  delay = 0,
  splitBy = "word",
}: Props) {
  const reduce = useReducedMotion();
  const tokens = splitBy === "char" ? Array.from(children) : children.split(/(\s+)/);
  const stagger = splitBy === "char" ? 0.018 : 0.04;

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag className={cn("inline-block", className)} aria-label={children}>
      {tokens.map((tok, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "120%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
          className="inline-block"
        >
          {tok === " " ? " " : tok}
        </motion.span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 3: Verify typecheck**

```bash
pnpm typecheck
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/motion/useReveal.ts components/ui/RevealText.tsx
git commit -m "feat: add useReveal hook + RevealText (char/word stagger)"
```

---

### Task 14: MagneticLink component

**Files:**
- Create: `components/ui/MagneticLink.tsx`

- [ ] **Step 1: Implement `components/ui/MagneticLink.tsx`**

```tsx
"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
};

export function MagneticLink({ href, children, className, strength = 0.4, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 20, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={cn("inline-block", className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-cursor="link"
    >
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/MagneticLink.tsx
git commit -m "feat: add MagneticLink with spring physics"
```

---

### Task 15: CustomCursor component

**Files:**
- Create: `components/layout/CustomCursor.tsx`

- [ ] **Step 1: Implement `components/layout/CustomCursor.tsx`**

```tsx
"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("Guest 👋");
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 400, damping: 30, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const cursorAttr = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (cursorAttr === "link") setLabel("VIEW →");
      else if (cursorAttr === "email") setLabel("Say hi! 👋");
      else setLabel("Guest 👋");
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgb(var(--fg))] text-[rgb(var(--bg))] font-mono text-[10px] uppercase tracking-widest whitespace-nowrap">
        <span className="inline-block size-1.5 rounded-full bg-[rgb(var(--accent))]" />
        {label}
      </span>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/CustomCursor.tsx
git commit -m "feat: add custom cursor with morph-on-hover (data-cursor attr)"
```

---

## Phase 5 — UI Primitives (Tasks 16-19)

### Task 16: Pill component

**Files:**
- Create: `components/ui/Pill.tsx`, `tests/components/Pill.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/Pill.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pill } from "@/components/ui/Pill";

describe("Pill", () => {
  it("renders children", () => {
    render(<Pill>React</Pill>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });
  it("applies the accent variant class when variant=accent", () => {
    const { container } = render(<Pill variant="accent">Live</Pill>);
    expect(container.firstChild).toHaveClass("bg-[rgb(var(--accent))]");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test tests/components/Pill.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/ui/Pill'`.

- [ ] **Step 3: Implement `components/ui/Pill.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "accent";

export function Pill({
  children,
  variant = "outline",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    default: "bg-[rgb(var(--fg))] text-[rgb(var(--bg))]",
    outline: "border border-[rgb(var(--line))] text-[rgb(var(--fg))]",
    accent: "bg-[rgb(var(--accent))] text-[rgb(var(--fg))]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test tests/components/Pill.test.tsx
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/ui/Pill.tsx tests/components/Pill.test.tsx
git commit -m "feat: add Pill component with default/outline/accent variants"
```

---

### Task 17: Marquee component

**Files:**
- Create: `components/ui/Marquee.tsx`

- [ ] **Step 1: Implement `components/ui/Marquee.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden border-y border-[rgb(var(--line))] py-4", className)}>
      <div
        className="flex whitespace-nowrap gap-12"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 gap-12">{children}</div>
        <div className="flex shrink-0 gap-12" aria-hidden>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-pause:hover > div { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Marquee.tsx
git commit -m "feat: add Marquee with infinite CSS animation"
```

---

### Task 18: ProjectCard component

**Files:**
- Create: `components/ui/ProjectCard.tsx`, `tests/components/ProjectCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/ProjectCard.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/ui/ProjectCard";

const project = {
  id: "houzz",
  title: "Houzz",
  category: "Marketplace",
  description: "Test description.",
  tech: ["React", "Node.js"],
  image: "https://example.com/x.jpg",
  liveUrl: "https://example.com",
};

describe("ProjectCard", () => {
  it("renders title, category, description, and tech pills", () => {
    render(<ProjectCard project={project} index={0} />);
    expect(screen.getByText("Houzz")).toBeInTheDocument();
    expect(screen.getByText("Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Test description.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
  it("renders an external link to liveUrl when provided", () => {
    render(<ProjectCard project={project} index={0} />);
    const link = screen.getByRole("link", { name: /houzz/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });
  it("falls back to a non-link wrapper when no liveUrl", () => {
    render(<ProjectCard project={{ ...project, liveUrl: undefined }} index={0} />);
    expect(screen.queryByRole("link", { name: /houzz/i })).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test tests/components/ProjectCard.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/ui/ProjectCard'`.

- [ ] **Step 3: Implement `components/ui/ProjectCard.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/content";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  const content = (
    <motion.div
      initial={reduce ? false : { y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group relative block overflow-hidden border border-[rgb(var(--line))]"
      data-cursor={project.liveUrl ? "link" : undefined}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[rgb(var(--muted))]">
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
          whileHover={reduce ? undefined : { scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="absolute top-4 left-4 font-display text-2xl text-[rgb(var(--accent))]">{num}</span>
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight">{project.title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 whitespace-nowrap">{project.category}</span>
        </div>
        <p className="text-sm leading-relaxed opacity-80 max-w-prose">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tech.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
        <span
          className={cn(
            "block h-[2px] w-0 group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-[rgb(var(--accent))] mt-3"
          )}
        />
      </div>
    </motion.div>
  );

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.title} — open live site`}
        className="block"
      >
        {content}
      </a>
    );
  }
  return content;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test tests/components/ProjectCard.test.tsx
```
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ProjectCard.tsx tests/components/ProjectCard.test.tsx
git commit -m "feat: add ProjectCard with reveal, hover scrub, accent underline"
```

---

### Task 19: ArchiveList component (collapsible)

**Files:**
- Create: `components/ui/ArchiveList.tsx`, `tests/components/ArchiveList.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/ArchiveList.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArchiveList } from "@/components/ui/ArchiveList";

const items = [
  { id: "a", title: "Alpha", category: "Cat A", tech: ["X"], description: "d", image: "" },
  { id: "b", title: "Beta", category: "Cat B", tech: ["Y"], description: "d", image: "" },
];

describe("ArchiveList", () => {
  it("hides the list initially and shows the toggle", () => {
    render(<ArchiveList projects={items} />);
    expect(screen.queryByText("Alpha")).toBeNull();
    expect(screen.getByRole("button", { name: /browse archive/i })).toBeInTheDocument();
  });
  it("expands the list when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<ArchiveList projects={items} />);
    await user.click(screen.getByRole("button", { name: /browse archive/i }));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test tests/components/ArchiveList.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/ui/ArchiveList'`.

- [ ] **Step 3: Implement `components/ui/ArchiveList.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content";

export function ArchiveList({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-mono text-xs uppercase tracking-widest border border-[rgb(var(--line))] px-5 py-3 hover:bg-[rgb(var(--fg))] hover:text-[rgb(var(--bg))] transition-colors"
      >
        {open ? `Hide archive (${projects.length}) ↑` : `Browse archive (${projects.length} more) ↓`}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden divide-y divide-[rgb(var(--line))] border-t border-b border-[rgb(var(--line))] mt-6"
          >
            {projects.map((p) => (
              <li key={p.id} className="grid grid-cols-12 items-baseline gap-4 py-4 font-mono text-xs uppercase tracking-widest">
                <span className="col-span-5 font-display text-base normal-case tracking-tight">
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[rgb(var(--accent))]" data-cursor="link">
                      {p.title} ↗
                    </a>
                  ) : (
                    p.title
                  )}
                </span>
                <span className="col-span-4 opacity-60">{p.category}</span>
                <span className="col-span-3 opacity-50">{p.tech.slice(0, 2).join(" · ")}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test tests/components/ArchiveList.test.tsx
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ArchiveList.tsx tests/components/ArchiveList.test.tsx
git commit -m "feat: add ArchiveList collapsible projects list"
```

---

## Phase 6 — Sections (Tasks 20-25)

### Task 20: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Implement `components/sections/Hero.tsx`**

```tsx
"use client";

import { content } from "@/lib/content";
import { RevealText } from "@/components/ui/RevealText";

export function Hero() {
  const [first, ...rest] = content.identity.name.split(" ");
  const last = rest.join(" ");
  return (
    <section id="top" className="relative min-h-[100svh] px-6 md:px-10 pt-32 pb-16 flex flex-col justify-end">
      <div className="absolute top-32 right-6 md:right-10 flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
        <span className="inline-block size-2 rounded-full bg-[rgb(var(--accent))] animate-pulse" />
        {content.identity.available ? "Available for work" : "Booked"}
      </div>

      <h1 className="font-display uppercase leading-[0.85] tracking-tight text-[clamp(64px,14vw,260px)]">
        <RevealText as="span" splitBy="char" className="block">{first}</RevealText>
        <RevealText as="span" splitBy="char" className="block" delay={0.15}>{last}</RevealText>
      </h1>

      <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Senior Product Engineer</p>
          <p className="font-body text-lg md:text-xl max-w-md opacity-80">{content.identity.tagline}</p>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest opacity-60 flex items-center gap-3">
          <span>Scroll</span>
          <span className="block w-12 h-px bg-[rgb(var(--fg))] opacity-40" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with char-stagger name reveal"
```

---

### Task 21: About section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Implement `components/sections/About.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="px-6 md:px-10 py-32 md:py-40 border-t border-[rgb(var(--line))]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-2 font-mono text-xs uppercase tracking-widest opacity-50">
          [02] About
        </div>
        <div className="md:col-span-7">
          <motion.p
            initial={reduce ? false : { y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl md:text-5xl leading-[1.05] uppercase tracking-tight"
          >
            {content.about}
          </motion.p>
          <div className="mt-10">
            <MagneticLink href={content.identity.cvUrl} className="font-mono text-sm uppercase tracking-widest border-b-2 border-[rgb(var(--accent))] pb-1">
              View CV ↗
            </MagneticLink>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="aspect-square w-full bg-[rgb(var(--muted))] grayscale hover:grayscale-0 transition-[filter] duration-700 overflow-hidden">
            <img src={content.identity.avatarUrl} alt={content.identity.name} className="size-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section with magnetic CV link"
```

---

### Task 22: Work section (uses ProjectCard + ArchiveList)

**Files:**
- Create: `components/sections/Work.tsx`

- [ ] **Step 1: Implement `components/sections/Work.tsx`**

```tsx
"use client";

import { content } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ArchiveList } from "@/components/ui/ArchiveList";
import { RevealText } from "@/components/ui/RevealText";

export function Work() {
  return (
    <section id="work" className="px-6 md:px-10 py-32 md:py-40 border-t border-[rgb(var(--line))]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-baseline justify-between mb-12">
          <p className="font-mono text-xs uppercase tracking-widest opacity-50">[03] Selected Work</p>
          <p className="font-mono text-xs uppercase tracking-widest opacity-50">{content.featuredProjects.length} projects</p>
        </div>

        <RevealText as="h2" className="font-display text-6xl md:text-9xl uppercase tracking-tight leading-[0.9] mb-16">
          Selected Work.
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <ArchiveList projects={content.archiveProjects} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Work.tsx
git commit -m "feat: add Work section composing ProjectCard grid + ArchiveList"
```

---

### Task 23: Stack section

**Files:**
- Create: `components/sections/Stack.tsx`

- [ ] **Step 1: Implement `components/sections/Stack.tsx`**

```tsx
"use client";

import { content } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";

export function Stack() {
  return (
    <section id="stack" className="px-0 py-32 md:py-40 border-t border-[rgb(var(--line))]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-12">
        <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">[04] Stack & Expertise</p>
        <h2 className="font-display text-6xl md:text-9xl uppercase tracking-tight leading-[0.9]">
          Built with<br />
          <span className="text-[rgb(var(--accent))]">discipline.</span>
        </h2>
      </div>

      <Marquee speed={50}>
        {content.stackGroups.map((g) => (
          <span key={g.title} className="font-display text-5xl md:text-7xl uppercase tracking-tight opacity-90">
            {g.title} <span className="text-[rgb(var(--accent))]">●</span>
          </span>
        ))}
      </Marquee>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {content.stackGroups.map((g) => (
          <div key={g.title}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--accent))] mb-3">{g.title}</h3>
            <ul className="flex flex-col gap-1.5 font-display text-base uppercase tracking-tight">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Stack.tsx
git commit -m "feat: add Stack section with marquee + skills grid"
```

---

### Task 24: Experience section

**Files:**
- Create: `components/sections/Experience.tsx`

- [ ] **Step 1: Implement `components/sections/Experience.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";

export function Experience() {
  const reduce = useReducedMotion();
  return (
    <section id="experience" className="px-6 md:px-10 py-32 md:py-40 border-t border-[rgb(var(--line))]">
      <div className="max-w-[1600px] mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">[05] Experience</p>
        <h2 className="font-display text-6xl md:text-9xl uppercase tracking-tight leading-[0.9] mb-16">Experience.</h2>

        <ul className="divide-y divide-[rgb(var(--line))] border-t border-b border-[rgb(var(--line))]">
          {content.experience.map((e, i) => (
            <motion.li
              key={`${e.role}-${e.dates}`}
              initial={reduce ? false : { x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="grid grid-cols-1 md:grid-cols-12 items-baseline gap-4 py-6"
            >
              <span className="md:col-span-2 font-mono text-xs uppercase tracking-widest opacity-60">{e.dates}</span>
              <span className="md:col-span-7 font-display text-2xl md:text-4xl uppercase tracking-tight">{e.role}</span>
              <span className="md:col-span-3 md:text-right font-mono text-xs uppercase tracking-widest opacity-60">{e.company}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Experience.tsx
git commit -m "feat: add Experience timeline with row reveal"
```

---

### Task 25: Contact section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Implement `components/sections/Contact.tsx`**

```tsx
"use client";

import { content } from "@/lib/content";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { RevealText } from "@/components/ui/RevealText";

export function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-32 md:py-48 border-t border-[rgb(var(--line))]">
      <div className="max-w-[1600px] mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-10">[06] Get in touch</p>
        <RevealText as="h2" className="font-display uppercase tracking-tight leading-[0.85] text-[clamp(64px,14vw,240px)]">
          Say hi!
        </RevealText>
        <div className="mt-2 flex items-center gap-6">
          <MagneticLink
            href={`mailto:${content.identity.email}`}
            strength={0.3}
            className="font-display uppercase tracking-tight leading-[0.85] text-[clamp(64px,14vw,240px)] text-[rgb(var(--accent))] underline underline-offset-[0.12em] decoration-[0.04em]"
          >
            <span data-cursor="email">Let's talk ↗</span>
          </MagneticLink>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs uppercase tracking-widest">
          <a href={`mailto:${content.identity.email}`} className="hover:text-[rgb(var(--accent))]" data-cursor="email">
            <div className="opacity-50 mb-2">Email</div>
            <div>{content.identity.email}</div>
          </a>
          <a href={content.identity.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[rgb(var(--accent))]" data-cursor="link">
            <div className="opacity-50 mb-2">LinkedIn</div>
            <div>linkedin.com ↗</div>
          </a>
          <a href={content.identity.socials.github} target="_blank" rel="noreferrer" className="hover:text-[rgb(var(--accent))]" data-cursor="link">
            <div className="opacity-50 mb-2">GitHub</div>
            <div>github.com ↗</div>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: add Contact section with massive say-hi + magnetic email"
```

---

## Phase 7 — Compose Page (Task 26)

### Task 26: Assemble `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Run dev server and visually check every section**

```bash
pnpm dev
```
Expected: open http://localhost:3000. Verify in order: Hero name reveals on load · About paragraph + photo · Work shows 6 cards · Archive expands · Stack marquee runs · Experience rows · Contact "Say hi!" big · Footer time updates.

Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose page with all sections in order"
```

---

## Phase 8 — SEO, OG, Polish (Tasks 27-31)

### Task 27: Metadata expansion + JSON-LD

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace metadata block in `app/layout.tsx`**

Update the `metadata` export:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://abdulhalim.dev"), // TODO: real domain
  title: {
    default: "Abdulhalim Muhammad — Senior Software Architect",
    template: "%s — Abdulhalim Muhammad",
  },
  description:
    "Senior Software Architect designing intelligent digital systems. Architecture, AI integration, and product engineering for ambitious teams.",
  keywords: ["Senior Software Architect", "AI Engineer", "Full-Stack", "Next.js", "TypeScript", "System Design"],
  authors: [{ name: "Abdulhalim Muhammad" }],
  creator: "Abdulhalim Muhammad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Abdulhalim Muhammad — Senior Software Architect",
    description: "I architect intelligent digital systems.",
    siteName: "Abdulhalim Muhammad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulhalim Muhammad — Senior Software Architect",
    description: "I architect intelligent digital systems.",
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: Add JSON-LD Person schema inside `<body>`**

In `app/layout.tsx`, inside the body before `<ThemeProvider>`, add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Abdulhalim Muhammad",
      jobTitle: "Senior Software Architect",
      email: "mailto:tsolution418@gmail.com",
      url: "https://abdulhalim.dev",
      sameAs: ["https://www.linkedin.com", "https://github.com"],
    }),
  }}
/>
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: expand SEO metadata + add JSON-LD Person schema"
```

---

### Task 28: Open Graph image generated by next/og

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Implement `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abdulhalim Muhammad — Senior Software Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f5f1e8",
          color: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
          <span>● Abdulhalim.M</span>
          <span>2026 / Available</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
          <span style={{ fontSize: 200, fontWeight: 900, letterSpacing: -8 }}>Senior</span>
          <span style={{ fontSize: 200, fontWeight: 900, letterSpacing: -8 }}>Software</span>
          <span style={{ fontSize: 200, fontWeight: 900, letterSpacing: -8, color: "#ff3b14" }}>Architect.</span>
        </div>
      </div>
    ),
    size
  );
}
```

> **Note:** Static export (`output: "export"`) does not run edge functions at request time, but `next/og` generates the image at build time. The image is included in `out/`.

- [ ] **Step 2: Build and verify OG image exists**

```bash
pnpm build
ls out/opengraph-image*
```
Expected: `out/opengraph-image.png` (or similar) exists.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat: generate brutalist OG image via next/og"
```

---

### Task 29: robots.ts and sitemap.ts

**Files:**
- Create: `app/robots.ts`, `app/sitemap.ts`

- [ ] **Step 1: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://abdulhalim.dev/sitemap.xml",
  };
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://abdulhalim.dev/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Build and verify outputs**

```bash
pnpm build
ls out/robots.txt out/sitemap.xml
```
Expected: both files exist in `out/`.

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat: add robots.txt and sitemap.xml"
```

---

### Task 30: Reduced-motion + a11y verification pass

**Files:**
- (no new files — verification only)

- [ ] **Step 1: Toggle reduced motion in OS and re-run dev**

Windows: Settings → Accessibility → Visual effects → Animation effects: OFF.
Or in Chrome DevTools: `Cmd/Ctrl+Shift+P` → "Show Rendering" → Emulate CSS media feature `prefers-reduced-motion: reduce`.

```bash
pnpm dev
```
Expected: text reveal animations are instant; cursor follows without spring; marquee continues but smoothly (CSS animation respects globals.css override).

- [ ] **Step 2: Run a manual a11y pass**

In Chrome DevTools → Lighthouse → Accessibility category:

```
pnpm build && npx serve out -l 4173
```

Then in DevTools, run Lighthouse → Accessibility on `http://localhost:4173`.
Expected: score ≥ 95. Fix any contrast or label issues reported.

- [ ] **Step 3: Tab through the page with keyboard only**

Verify focus rings are visible (signal red, 2px) on every interactive element. Verify all links and buttons reachable.

- [ ] **Step 4: If fixes were needed, commit them**

```bash
git add .
git commit -m "fix: address a11y and reduced-motion findings"
```

---

### Task 31: Lighthouse audit + fix

**Files:**
- (no new files — performance fixes only)

- [ ] **Step 1: Build and serve locally**

```bash
pnpm build && npx serve out -l 4173
```

- [ ] **Step 2: Run Lighthouse on http://localhost:4173 (Mobile + Desktop)**

Targets:
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

- [ ] **Step 3: Common fixes to apply if scores fall short**

- LCP issue? → ensure hero `<h1>` has no blocking JS dependency (it's RSC; should be instant). Confirm fonts have `display: "swap"` (already set in Task 5).
- CLS issue? → confirm aspect ratios on `<img>` (Tailwind `aspect-[16/10]` — already set on ProjectCard).
- Unused JS? → check bundle: `pnpm dlx @next/bundle-analyzer` if needed; consider dynamic import for `CustomCursor` and `SmoothScroll` since they're not above-the-fold critical:

```tsx
// In app/page.tsx, replace direct imports:
import dynamic from "next/dynamic";
const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor").then(m => m.CustomCursor), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/motion/SmoothScroll").then(m => m.SmoothScroll), { ssr: false });
```

- [ ] **Step 4: Commit any fixes**

```bash
git add .
git commit -m "perf: hit Lighthouse 95+ targets"
```

---

## Phase 9 — Deploy (Task 32)

### Task 32: Deploy to Vercel

**Files:**
- (no code changes — deployment step)

- [ ] **Step 1: Install Vercel CLI**

```bash
pnpm add -g vercel
```

- [ ] **Step 2: Push to GitHub**

If a remote isn't set up:

```bash
# Create a private repo via the GitHub UI first, then:
git remote add origin https://github.com/<your-handle>/abdulhalimdev.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Link and deploy**

```bash
vercel link
vercel --prod
```

Answer prompts:
- Set up and deploy? **Y**
- Scope? Your account
- Framework preset? **Next.js** (auto-detected)
- Build command? (default — `next build`)
- Output directory? `out`

- [ ] **Step 4: Verify deployed site**

Open the printed URL. Walk through every section. Confirm theme toggle works, cursor follows, marquee runs, contact link opens email, archive expands.

- [ ] **Step 5: Commit any vercel config**

```bash
git add .vercel
git commit -m "chore: link to vercel project"
```

---

## Self-Review

Spec coverage check (run mentally against `docs/superpowers/specs/2026-04-24-portfolio-design.md`):

- §1 Identity → Task 7 (`lib/content.ts` `identity` block) ✓
- §2 Visual direction (cream + signal red, dark variant) → Task 4 (CSS vars) ✓
- §2 Typography (Archivo Black, JetBrains Mono, Inter) → Task 5 ✓
- §3 Architecture (Next.js 15, App Router, static export, TS strict, Tailwind v4) → Task 1 + 4 ✓
- §3 Tech (Framer Motion, Lenis, next-themes) → Task 3 ✓
- §4 File structure → file map at top of plan + tasks ✓
- §5 Sections (7 + ArchiveList inside Work) → Tasks 20-25 + composition Task 26 ✓
- §6 Real content → Task 7 ✓
- §7 Animation system (SmoothScroll, RevealText, MagneticLink, CustomCursor) → Tasks 12-15, used in Tasks 18, 20-25 ✓
- §8 Theme system (CSS vars + next-themes) → Tasks 4, 8, 9 ✓
- §9 Performance targets → Task 31 ✓
- §10 SEO + metadata + JSON-LD + OG → Tasks 27, 28 ✓
- §10 robots + sitemap → Task 29 ✓
- §11 Accessibility (skip link, focus, reduced motion) → globals.css Task 4 + verification Task 30
  - **Gap:** spec mentions a "skip-to-content link". Adding it inline in Task 26 composition step? — easier to add now in the plan: see addendum below.
- §12 Out of scope (no CMS, no blog) → respected ✓
- §13 Build phases → mirrored across phases ✓
- §15 Risks (lazy CustomCursor + Lenis) → Task 31 includes the dynamic import code ✓

**Inline fix — add skip-link to satisfy §11:** updating Task 26 to include a skip-to-content link.

**Type consistency:** `Project` defined in Task 7, used identically in Tasks 18, 19, 22 ✓. `cn` defined in Task 6, used everywhere ✓. `useReducedMotion` from `framer-motion` used identically in Tasks 13, 14, 15, 18, 21, 24 ✓.

No remaining placeholders other than the explicitly-marked TODO content fields the user must fill in (real LinkedIn/GitHub URLs, employer names, location, CV PDF, photo, real domain). These are documented in the spec §14 and as `// TODO:` comments in `lib/content.ts`.

---

## Inline fix — Update Task 26 to include skip link

In Task 26 step 1, replace the `<main>` opening with:

```tsx
<a
  href="#work"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[rgb(var(--accent))] focus:text-[rgb(var(--bg))] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
>
  Skip to content
</a>
<main>
```

(Tailwind already provides `sr-only`. `focus:not-sr-only` makes it visible on tab focus.)

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-24-portfolio.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
