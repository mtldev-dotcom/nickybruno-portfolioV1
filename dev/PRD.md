# Build Plan for nickybruno.com (Portfolio, EN/FR)

> Purpose: This file is a single source of truth for scaffolding, implementing, and shipping the nickybruno.com portfolio website. It reflects the current implementation and the plan forward. All text should be sourced from content/{locale} to support localization.

---

## 0) Project Overview

- Brand: Nicky Bruno — developer • designer • automation & AI
- Goal: A fast, elegant, bilingual portfolio that showcases projects, services, and contact funnels.
- Tone: Modern, minimal, confident; focus on clarity, micro‑interactions, and readability.
- Must‑haves (as implemented):
  - Next.js 15 (App Router), TypeScript, Tailwind v4
  - i18n (EN/FR) via App Router + middleware with route‑aware language toggle
  - Responsive/mobile‑first layouts
  - Structured data (JSON‑LD), Open Graph images
  - Simple content system (MDX + JSON) with easy extension
  - Contact form with zod validation and Resend email delivery
  - Analytics ready (Plausible or Vercel Analytics), consent banner optional
  - Deployed on Vercel; preview branches recommended

---

## 1) Tech Stack & Libraries

- Framework: Next.js 15 (App Router), React 19
- Language: TypeScript
- Styling: Tailwind CSS v4; utility‑first components (no shadcn in use yet)
- Content: MDX (next‑mdx‑remote/rsc) + JSON per locale (content/en, content/fr)
- i18n: App Router localized routes `/[locale]/*` + middleware.ts; locale utilities in lib/locales.ts
- Forms: zod schema (lib/schemas/contact.ts); POST /api/contact; email via Resend
- Animation: framer‑motion
- Icons: lucide‑react
- SEO: Native Next.js metadata APIs + JSON‑LD in layout; Open Graph image route per locale
- Tooling: ESLint v9, Tailwind v4, pnpm

Note: We do not use next‑intl; labels and UI strings live under site.json to simplify localization.

---

## 2) Information Architecture / Sitemap

```
/[locale]/
  page.tsx                      → Home (hero, highlights, services, about glimpse, contact)
  /projects/page.tsx            → Work index (filters, cards)
  /projects/[slug]/page.tsx     → Case study (MDX)
  /services/page.tsx            → Services (grid + collaboration section)
  /about/page.tsx               → Bio + timeline + skills (MDX + frontmatter)
  /contact/page.tsx             → Contact form (copy fully from content)
  opengraph-image.tsx           → Localized Open Graph image
/api
  /contact/route.ts             → Resend integration (POST)
  /locale/route.ts              → Sets NEXT_LOCALE cookie
```

- Locales: /en and /fr. Default: en.
- Language toggle persists chosen locale and routes accordingly (components/language-toggle.tsx).

---

## 3) Content Model

Directory structure:
```
/content
  /en
    hero.json
    services.json
    projects.json
    site.json
    about.mdx
    /projects
      sofia-ai-desk.mdx
      next-x-level.mdx
      lumicerra-labs.mdx
  /fr
    hero.json
    services.json
    projects.json
    site.json
    about.mdx
    /projects
      sofia-ai-desk.mdx
      next-x-level.mdx
      lumicerra-labs.mdx
```

Current JSON shapes (EN):

- hero.json
```json
{
  "title": "I build digital systems that make your business run smoother — and look good doing it.",
  "subtitle": "From websites and automation to design and marketing — I help you work smarter, not harder.",
  "primaryCta": { "label": "See my work", "href": "/en/projects" },
  "secondaryCta": { "label": "Let’s talk", "href": "mailto:hello@nickybruno.com" },
  "highlights": [
    { "label": "years in creative & tech industries", "value": "20+" },
    { "label": "completed projects across Canada", "value": "80+" },
    { "label": "hours saved through automation", "value": "4,000+" }
  ]
}
```

- services.json
```json
{
  "title": "Services",
  "intro": "Every engagement blends strategy, design, and technology — focused on saving you time, boosting visibility, and building trust.",
  "services": [
    { "name": "Digital Foundations", "description": "...", "deliverables": ["..."], "badge": "Web" },
    { "name": "Automation & Efficiency", "description": "...", "deliverables": ["..."], "badge": "Ops" },
    { "name": "Branding & Graphic Design", "description": "...", "deliverables": ["..."], "badge": "Design" },
    { "name": "Consulting & Training", "description": "...", "deliverables": ["..."], "badge": "Advisory" }
  ],
  "collaboration": {
    "heading": "Collaboration approach",
    "copy": "Every engagement starts with understanding your goals...",
    "bullets": [
      "Discovery workshops and critical workflow mapping",
      "Interactive prototypes to align stakeholders",
      "Incremental delivery with weekly reviews",
      "Performance and accessibility instrumentation from day one"
    ],
    "ctaLabel": "Discuss a project"
  },
  "cta": { "label": "Start a project", "href": "/en/contact" }
}
```

- projects.json
```json
{
  "title": "Selected Projects",
  "intro": "Each engagement blends strategy, design, and engineering to deliver measurable outcomes.",
  "filters": [{ "key": "all", "label": "All work" }, ...],
  "projects": [
    {
      "title": "Sofia AI Desk",
      "slug": "sofia-ai-desk",
      "year": 2025,
      "tags": ["AI Automation", "Operations", "Agentic Workflows"],
      "excerpt": "Automated customer support with a clear dashboard — ~60% faster responses.",
      "category": "ai-automation",
      "theme": { "background": "...", "foreground": "#e9ffe5" }
    },
    ...
  ]
}
```

- site.json (adds global labels and contact copy)
```json
{
  "meta": { "title": "...", "description": "...", "keywords": ["..."], "author": "Nicky Bruno", "siteName": "nickybruno.com" },
  "navigation": [{ "label": "Work", "href": "/en/projects" }, "..."],
  "footer": {
    "copyright": "© {{year}} Nicky Bruno...",
    "socials": [{ "label": "LinkedIn", "href": "..." }, "..."]
  },
  "labels": {
    "headerCta": "Let’s talk",
    "heroPill": "Digital Studio",
    "footerConnect": "Connect",
    "projectsHeading": "Case Studies",
    "home": {
      "highlights": "Highlights",
      "moreProjects": "View all projects",
      "servicesCta": "See services",
      "aboutCta": "Explore full journey"
    },
    "sections": { "about": "About", "services": "Services", "contact": "Contact" }
  },
  "contact": {
    "sectionLabel": "Collaborate",
    "title": "Let’s make your digital life easier.",
    "description": "Tell me what you want to achieve — I’ll show you the smartest, simplest way to make it happen.",
    "form": {
      "nameLabel": "Full name",
      "emailLabel": "Work email",
      "companyLabel": "Company or team",
      "projectLabel": "What would you like to build?",
      "budgetLabel": "Budget range",
      "budgetOptions": ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+"],
      "submitLabel": "Send message"
    },
    "success": { "title": "Thank you!", "description": "Your message was sent. I’ll be in touch very soon." },
    "error": { "title": "Something went wrong", "description": "Please try again or email hello@nickybruno.com." }
  }
}
```

- about.mdx
  - Frontmatter: `title`, `tagline`, `stats[]`, `timeline[]`, `skills{}`.
  - Body: human‑centered copy as implemented.

Implementation detail: Pages include safe fallbacks for missing labels; no automatic cross‑locale file fallback is implemented in loaders.

---

## 4) Visual System

- Typography: Inter for UI; strong hierarchy; balanced line‑length for readability
- Color: Dark base, mint accent (#66FF00) with accessible contrasts
- Layout: max‑width `max-w-6xl`; mobile‑first stacks; subtle borders/shadows
- Motion: framer‑motion micro‑interactions; gentle reveal; hover elevation

---

## 5) Components (Current)

- SiteHeader (locale aware; primary CTA label from site.json)
- LanguageToggle (route‑aware)
- Hero (pill label from site.json; CTA from hero.json)
- ServicesGrid
- ProjectCard / ProjectGallery
- StatsRibbon / Timeline
- ContactForm (title/desc/labels/success/error from site.json)
- SiteFooter (connect label from site.json)
- MDX rendering via lib/mdx-components.tsx

---

## 6) SEO & Analytics

- Metadata via generateMetadata per route (layout, services, etc.)
- JSON‑LD Person schema in layout
- Open Graph image at app/[locale]/opengraph-image.tsx
- Analytics: Plausible or Vercel Analytics (to be configured)

---

## 7) Forms / Integrations

- POST /api/contact accepts zod‑validated payload; sends email via Resend
- Environment‑based configuration; graceful failure if missing envs
- Optional: Telegram webhook (future)

---

## 8) Accessibility & Performance

- a11y: semantic headings, focus styles, ARIA attributes on icons where needed
- perf: image optimization planned; avoid unused JS; lazy‑load media
- budgets: FCP < 1.8s on 4G; keep client components minimal

---

## 9) Commands

```bash
# Install deps
pnpm install

# Dev server
pnpm dev
# http://localhost:3000 (auto locale; /en is default)

# Production build
pnpm run build
pnpm start
```

---

## 10) File/Folder Structure (Key)

```
app/[locale]/(pages...)     # localized routes
app/api/(contact|locale)    # API routes
components/**               # UI components
content/{en,fr}/**          # JSON + MDX content
lib/content.ts              # JSON/MDX loaders + types
lib/locales.ts              # locale utilities
middleware.ts               # locale routing
public/**                   # assets
```

---

## 11) Environment Variables (.env.local)

```
NEXT_PUBLIC_SITE_URL=https://nickybruno.com
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@your-domain.tld
```

Notes:
- NEXT_PUBLIC_SITE_URL used for metadataBase and JSON‑LD canonicalization
- Resend requires verified domain/from address

---

## 12) Current English Copy Seeds

- Hero: human‑centered headline, subtitle, CTAs, and highlights (see hero.json)
- Services: four pillars + collaboration section (services.json)
- Projects: simplified excerpts + filters (projects.json)
- About: updated frontmatter and body (about.mdx)
- Site: labels and contact copy (site.json)

---

## 13) Acceptance Criteria

- [ ] All visible UI text is driven by content/{locale} (JSON/MDX)
- [ ] Lighthouse ≥ 95 mobile on Perf/SEO/Best/Access (post‑assets)
- [ ] Contact form validates and sends via Resend
- [ ] OG images generated per locale
- [ ] Deployed on Vercel with preview branches

---

## 14) Deployment Steps (Vercel)

1. Connect GitHub repo to Vercel
2. Set envs (NEXT_PUBLIC_SITE_URL, RESEND_API_KEY, CONTACT_TO_EMAIL)
3. Build command: `pnpm run build`
4. Serve command: `pnpm start` (handled by Vercel)
5. Add domains and SSL
6. Validate preview and promote to production

---

## 15) Post‑Launch Enhancements

- Blog (MDX), newsletter (Buttondown/ConvertKit)
- CMS bridge (Payload/Contentlayer) if content scales
- Dark mode, theme toggle
- More animations per Visual Production Checklist
- Playwright smoke + axe a11y tests
- Persisted filters and shareable project URLs

---

## 16) Execution Notes

- Prefer server components; keep client components focused
- Strong typing for content loaders; graceful optional fallbacks in usage sites
- Wrap external links with rel="noopener noreferrer"
- MDX restricted to safe components; typography consistent
- Provide Playwright smoke tests for EN/FR nav, projects, and contact (future)

---

## 17) Sample Snippets

(See README for current API and component references; language toggle and contact API sketches remain valid.)

---

## 18) Task Checklist (Runlist)

1. Update EN content (done)
2. Externalize UI labels (done)
3. Wire pages/components to content (done)
4. Mobile‑first QA at 320/375/414/768/1024 (pending)
5. a11y pass (pending)
6. Prepare FR stubs mirroring keys (pending)
7. Add lightweight placeholders for visuals (optional)
8. Configure analytics and envs for production (pending)
