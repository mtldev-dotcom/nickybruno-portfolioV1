# Build Plan for nickybruno.com (Portfolio, EN/FR)

> **Purpose**: This file is a **single source of truth** for Cline to scaffold, implement, and ship the **nickybruno.com** portfolio website. Follow it top‑to‑bottom. Produce clean, commented code, consistent styling, and a bilingual experience (**English & Français**).

---

## 0) Project Overview

- **Brand**: Nicky Bruno — developer • designer • AI automation
- **Goal**: A fast, elegant, bilingual portfolio that showcases projects, services, and contact funnels.
- **Tone**: Modern, minimal, confident; focus on **clarity**, **motion micro‑interactions**, and **readability**.
- **Must‑haves**:
  - Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui
  - i18n (EN/FR) with route‑aware language toggle
  - Responsive, Lighthouse 95+ (Perf/SEO/Best/Access)
  - Structured data (JSON‑LD), OG/Twitter cards
  - Simple content system (MDX or flat JSON) with easy extension
  - Contact form → email (resend) + Telegram (optional webhooks)
  - Analytics (Plausible or Vercel), basic consent banner
  - Deployed on Vercel; preview branches enabled

---

## 1) Tech Stack & Libraries

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (radix primitives), lucide-react
- **Content**: MDX or JSON per locale (`/content/en`, `/content/fr`)
- **i18n**: `next-intl` (route groups) or `next-international` (lightweight); prefer **next-intl**
- **Forms**: `react-hook-form`, `zod` validation; delivery via **resend** (email) and optional webhook (Telegram)
- **Animations**: `framer-motion`
- **Images**: Next/Image with remote patterns + blur placeholders
- **Icons**: `lucide-react`
- **Analytics**: Plausible (cookieless) or Vercel Analytics
- **SEO**: `next-seo` or native Next.js metadata, plus JSON‑LD helpers
- **Testing**: Playwright (smoke + a11y), Vitest (units for utils)

---

## 2) Information Architecture / Sitemap

```
/[locale]/
  ├─ (public)
  │   ├─ page.tsx                  → Home (hero, value prop, CTA)
  │   ├─ projects/page.tsx         → Work index (filters, tags)
  │   ├─ projects/[slug]/page.tsx  → Case study (MDX)
  │   ├─ services/page.tsx         → Services & pricing
  │   ├─ about/page.tsx            → Bio + timeline + skills
  │   ├─ contact/page.tsx          → Contact form + links
  │   └─ legal/(privacy|terms).tsx → Optional
  └─ api/contact/route.ts          → POST handler (resend + webhook)
```

- **Locales**: `/en` and `/fr` are primary. Default: **/en**.  
- **Switch**: Language toggle persists chosen locale and routes accordingly.

---

## 3) Content Model

### 3.1 MDX/JSON structure
```
/content
  /en
    hero.json
    about.mdx
    services.json
    projects.json
    projects/
      sofia.mdx
      next-x-level.mdx
      lumicerra.mdx
  /fr
    hero.json
    about.mdx
    services.json
    projects.json
    projects/
      sofia.mdx
      next-x-level.mdx
      lumicerra.mdx
```

- `hero.json`: title, subtitle, bullets, primaryCTAText, primaryCTAUrl, logos (if any)
- `services.json`: cards (title, bullets, fromPrice), FAQs (q/a)
- `projects.json`: lightweight list (title, slug, excerpt, tags, cover, year, featured)
- Individual `projects/*.mdx`: long‑form case study with front‑matter `{ title, date, tags, cover, roles }`

> **Claude**: Implement a small **content loader** that reads per‑locale file; add types; fallback to EN if missing keys in FR.

### 3.2 Initial copy (seed)
- Pull key phrasing from the user’s reports:
  - **Value prop**: “Developer–designer building fast, automated, bilingual experiences powered by AI.”
  - **Tagline alt**: “Design ✦ Code ✦ Automation”
  - **Bio short**: “20+ years shipping web, AI agents, and automation for brands and founders.”
  - **Focus**: Next.js, Supabase, n8n, AI agents, design systems, brand UX.

---

## 4) Visual System

- **Typography**: Inter (UI), Space Grotesk or Geist for display (H1/Hero)
- **Color**: Base neutral (zinc/stone). Accent: **electric green `#66FF00`** (brand nod), with accessible contrasts.
- **Layout**: Grid, generous white space, max‑width `max-w-6xl`, 4/6/12 columns responsive
- **Cards**: soft shadows, rounded‑2xl, subtle borders (`border-white/10` on dark or `border-black/10` on light)
- **Motion**: micro‑interactions on hover/focus; modest parallax in hero; animate section entrances with `framer-motion`

---

## 5) Components (shadcn/ui + custom)

- `Navbar` (locale‑aware + LanguageToggle)
- `Footer` (links, socials)
- `Hero` (headline, sub, CTA, motion)
- `ProjectCard` (image, tags, year, link)
- `ProjectGallery` (masonry/grid w/ filters by tag)
- `MDXContent` (prose styles)
- `Stats` (years, shipped projects, stack logos)
- `ServicesGrid` (cards + CTA)
- `ContactForm` (zod schema → /api/contact; success/failure UI)
- `LanguageToggle` (switch locale, keep path)
- `ThemeToggle` (light/dark, optional)
- `Badge` for tags (e.g., Next.js, Supabase, n8n, AI)

> **Claude**: Generate these as isolated components in `/components` and `/components/ui`, using shadcn conventions.

---

## 6) SEO & Analytics

- **Metadata**: per‑page via `generateMetadata` (title, description, locale alternates).
- **OG**: Dynamic OG images using @vercel/og (title, tag, accent line).
- **JSON‑LD**: `WebSite`, `Person` (Nicky Bruno), `BreadcrumbList` (project pages).
- **Analytics**: Plausible or Vercel Analytics, + basic cookie notice.

---

## 7) Forms / Integrations

- **Email**: Resend transactional for contact form. Subject: `nickybruno.com :: new inquiry`
- **Webhook (optional)**: Telegram Bot API; post summary message.
- **Validation**: zod; rate‑limit (simple in‑memory or upstash‑ratelimit).

---

## 8) Accessibility & Performance

- a11y: skip‑to‑content, focus styles, aria labels, semantic headings, alt text, color contrast ≥ 4.5:1
- perf: image optimization, no unused JS, edge runtime for stateless routes
- budgets: first contentful paint < 1.8s on 4G; bundle size < 180kb JS on home

---

## 9) Commands (Claude: run sequentially)

```bash
# 1) Create app
pnpm create next-app@latest nickybruno.com --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
cd nickybruno.com

# 2) Install deps
pnpm add next-intl framer-motion next-seo class-variance-authority tailwind-merge lucide-react
pnpm add -D @types/node @types/react @types/react-dom prettier playwright @playwright/test vitest @testing-library/react @testing-library/jest-dom @types/testing-library__jest-dom

# 3) shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card badge input textarea navigation-menu accordion dialog

# 4) Content & MDX
pnpm add next-mdx-remote gray-matter
```

---

## 10) File/Folder Structure

```
/src
  /app
    /(routes)
      /[locale]
        /(public)
          page.tsx
          /projects/page.tsx
          /projects/[slug]/page.tsx
          /services/page.tsx
          /about/page.tsx
          /contact/page.tsx
        layout.tsx
        head.tsx (if required)
    /api/contact/route.ts
  /components
  /lib
  /styles
/content/{en,fr}/...
```

- **/lib/i18n.ts**: next‑intl config + dictionaries loader
- **/lib/seo.ts**: metadata + json‑ld helpers
- **/lib/content.ts**: read MDX/JSON by locale
- **/styles/globals.css**: Tailwind + prose styles

---

## 11) Environment Variables (.env.local)

```
NEXT_PUBLIC_SITE_URL=https://nickybruno.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
RESEND_API_KEY=...
TELEGRAM_BOT_TOKEN=...            # optional
TELEGRAM_CHAT_ID=...              # optional
PLAUSIBLE_DOMAIN=nickybruno.com   # optional if using Plausible
```

> **Claude**: Generate `.env.example` and never commit `.env.local`.

---

## 12) Initial Content (seed)

**Hero (EN)**  
- Title: “Design ✦ Code ✦ Automation”  
- Subtitle: “I build fast, bilingual experiences powered by AI.”  
- CTA: “See my work” `/en/projects`

**Hero (FR)**  
- Title: “Design ✦ Code ✦ Automatisation”  
- Subtitle: “Je conçois des expériences rapides et bilingues propulsées par l’IA.”  
- CTA: “Voir mes projets” `/fr/projects`

**Projects (seed)**  
- Sofia Restaurant Management (AI receptionist, floor plan editor, Next.js + Supabase + n8n)  
- Next X Level (bilingual e‑commerce, MedusaJS + Next.js)  
- Lumicerra (architectural LED panels, dashboard + site)  

---

## 13) Acceptance Criteria

- [ ] Lighthouse ≥ 95 on mobile for Perf/SEO/Best/Access
- [ ] i18n works across all routes with toggle
- [ ] MDX case studies render with TOC, images, captions
- [ ] Contact form validates and delivers via Resend
- [ ] OG images generated per page
- [ ] Deployed on Vercel with preview for PRs
- [ ] a11y checks pass (Playwright + axe)

---

## 14) Deployment Steps (Vercel)

1. `vercel init` or connect GitHub repo.
2. Set environment variables.
3. Configure `domains` → `nickybruno.com`.
4. Protect `/preview` if needed with basic auth middleware.
5. Run smoke tests on preview → merge → production.

---

## 15) Post‑Launch Enhancements (Optional)

- Blog with MDX (tips: AI agents, n8n recipes, Supabase auth)
- Newsletter (Buttondown or ConvertKit)
- CMS bridge (Payload or Contentlayer) if content scales
- Dark mode with system preference
- Project filters persisted via search params
- RSS feed for updates (`/feed.xml`)

---

## 16) Claude Execution Notes

- Prefer **server components**; keep client components small.
- Extract UI primitives with shadcn conventions.
- Strong typing for content loaders (zod schemas).
- Wrap external links with `rel="noopener noreferrer"`.
- Write **docstrings & comments** for all exported functions/components.
- Provide **Playwright** smoke tests for core flows:
  - Navigate EN↔FR, open projects, submit contact (mock).

---

## 17) Sample Snippets

**Language Toggle (sketch)**
```tsx
"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function LanguageToggle({ locale }: { locale: "en" | "fr" }) {
  const pathname = usePathname()
  const target = locale === "en" ? pathname.replace("/fr", "/en") : pathname.replace("/en", "/fr")
  return (
    <Link href={target} aria-label={locale === "en" ? "Français" : "English"} className="text-sm underline">
      {locale === "en" ? "FR" : "EN"}
    </Link>
  )
}
```

**Contact API route (sketch)**
```ts
// /src/app/api/contact/route.ts
import { NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 })

  // TODO: send via Resend + optional Telegram webhook
  return NextResponse.json({ ok: true })
}
```

---

## 18) Tasks Checklist (Claude runlist)

1. **Scaffold** Next.js app, Tailwind, shadcn/ui, deps.  
2. **Implement** i18n with `/[locale]` and language toggle.  
3. **Create** content loaders and seed content (EN/FR).  
4. **Build** core pages + components (Hero, Projects, Services, About, Contact).  
5. **Wire** contact form (zod + Resend + optional Telegram).  
6. **Add** SEO metadata, OG, JSON‑LD.  
7. **Polish** motion, spacing, states (hover/focus/active).  
8. **Write** tests (Playwright smoke + a11y).  
9. **Configure** analytics + envs + Vercel deployment.  
10. **Run** Lighthouse + fix; ship.

---

## 19) Credits & Ownership

- © Nicky Bruno. Source code licensed MIT unless specified. Brand assets are proprietary.
