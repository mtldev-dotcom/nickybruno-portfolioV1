# Nicky Bruno — Portfolio (Next.js 15, App Router)

A modern, bilingual (EN/FR) portfolio built with Next.js 15 App Router. It showcases projects, services, and expertise in design, development, and automation/AI. The site is content‑driven (JSON + MDX), localization‑ready, and includes a production‑ready contact flow via Resend.

Local dev: http://localhost:3000

## Highlights

- Fully localized routing (/en, /fr) via middleware, cookie persistence
- All UI copy is sourced from content/{locale} (JSON/MDX) — no hardcoded strings
- Home hero, labels (header CTA, hero pill, footer, section headings), services, projects, and contact form texts are editable
- MDX content for About and Project case studies
- Project listing with filters + theme hints (background/foreground)
- SEO: dynamic metadata, Open Graph image generation, JSON‑LD Person schema
- Contact form via Resend + zod validation
- TypeScript + ESLint 9 + Turbopack

## Tech Stack

- Framework: Next.js 15.5.4 (App Router), React 19
- Language: TypeScript
- Styling/UI: Tailwind CSS 4, custom components, Lucide icons
- Content: MDX (next‑mdx‑remote/rsc), JSON files under content/
- Email: Resend API
- Package Manager: pnpm
- Node.js: 18+ recommended

## Prerequisites

- Node.js 18+
- pnpm installed: https://pnpm.io/installation

## Quick Start

1) Install dependencies
- pnpm install

2) Start development server
- pnpm dev
- Visit http://localhost:3000 (auto locale redirect), or http://localhost:3000/en

3) Production build
- pnpm run build
- pnpm start

## Scripts

- pnpm dev — Start Next.js development server (Turbopack)
- pnpm build — Build for production (Turbopack)
- pnpm start — Start production server
- pnpm lint — Run ESLint

## Environment Variables

Create .env.local in the project root:

- NEXT_PUBLIC_SITE_URL — e.g. https://nickybruno.com (metadataBase, JSON‑LD)
- RESEND_API_KEY — Resend API key (required for contact form)
- CONTACT_TO_EMAIL — Destination inbox for contact form (fallback: RESEND_CONTACT_TO or NEXT_PUBLIC_CONTACT_TO)

Notes:
- Contact API returns 503 if RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.
- Resend requires a verified domain and valid from address (see app/api/contact/route.ts).

## Internationalization (EN/FR)

- Locale routing via middleware.ts (App Router compatible). No next.config i18n block.
- Root / redirects to a locale‑prefixed route (/en or /fr) based on:
  - NEXT_LOCALE cookie (if set via POST /api/locale)
  - Accept‑Language header (e.g., en‑US → en)
  - Default fallback: en
- Localized paths:
  - /en, /fr (home)
  - /en/about, /fr/about
  - /en/projects, /fr/projects (+ /en/projects/[slug])
  - /en/services, /fr/services
  - /en/contact, /fr/contact

Cookie API:
- POST /api/locale with JSON { "locale": "en" | "fr" } sets NEXT_LOCALE.

## Content Model and Editing Guide

All content lives under content/{locale}. English first; French mirrors the same structure and keys.

Directory:
- content/en/
  - hero.json — Homepage hero texts + highlights
  - services.json — Services cards + collaboration block + CTA
  - projects.json — Listing, filters, project summaries (with theme hints)
  - site.json — Global meta, navigation, footer, UI labels, contact copy
  - projects/*.mdx — Case study pages (long‑form)
  - about.mdx — About body + frontmatter (stats, timeline, skills)
- content/fr/
  - Mirrors /en; add translations later

Important JSON keys:

1) content/{locale}/hero.json
- title, subtitle
- primaryCta: { label, href }
- secondaryCta: { label, href } (optional)
- highlights: [ { label, value }, ... ]

2) content/{locale}/site.json
- meta: { title, description, keywords[], author, siteName }
- navigation: [ { label, href }, ... ]
- footer: { copyright, socials[] }
- labels: small UI strings used across the site
  - headerCta: Header CTA button text
  - heroPill: Small pill label in the hero
  - footerConnect: Footer section heading
  - projectsHeading: Projects index page section label
  - home:
    - highlights: “Highlights” label on home
    - moreProjects: “View all projects” label
    - servicesCta: “See services” label
    - aboutCta: “Explore full journey” label
  - sections:
    - about: Section label for About page
    - services: Section label for Services page
    - contact: Section label for Contact page
- contact: UI copy for the contact form (section label, form labels, success, error)

3) content/{locale}/services.json
- title, intro
- services: [ { name, description, deliverables[], badge }, ... ]
- collaboration: { heading, copy, bullets[], ctaLabel }
- cta: { label, href }

4) content/{locale}/projects.json
- title, intro
- filters: [ { key, label }, ... ]
- projects: [ { title, slug, year, tags[], excerpt, category, theme? }, ... ]
  - theme.foreground/background can hint at gradient/contrast in cards

5) content/{locale}/about.mdx
- frontmatter:
  - title, tagline
  - stats: [ { label, value } ]
  - timeline: [ { year, title, description } ]
  - skills: { design|engineering|automation: { label, items[] } }
- body: MDX content used in About page

Notes:
- All labels have safe fallbacks, but keep keys mirrored between EN and FR for consistent UX.
- When adding new small UI labels, prefer placing them in site.json → labels.

## Code Structure

- middleware.ts — Locale detection/redirects
- app/[locale]/** — Localized routes (layout, pages, Open Graph image)
  - page.tsx (Home) — Uses hero.json + site.json labels
  - projects/page.tsx — Uses projects.json + site.json.labels.projectsHeading
  - services/page.tsx — Uses services.json (cards + collaboration) + site.json.labels.sections.services
  - about/page.tsx — Uses about.mdx + site.json.labels.sections.about
  - contact/page.tsx — Uses site.json.contact + site.json.labels.sections.contact
- app/api/contact/route.ts — Resend integration with zod payload validation
- app/api/locale/route.ts — Sets NEXT_LOCALE cookie
- components/** — Header, footer, hero, services grid, project gallery, contact form, etc.
- lib/content.ts — Content loaders for JSON and MDX; typed SiteContent with labels schema
- lib/locales.ts — Locale list, default locale, type guard
- lib/mdx-components.tsx — Custom MDX component mappings
- public/** — Static assets (logo, favicons, icons)

## Header, Footer, and Labels

- Header:
  - Primary CTA text comes from site.json.labels.headerCta
- Hero:
  - Pill label comes from site.json.labels.heroPill
- Footer:
  - Section label (“Connect”) from site.json.labels.footerConnect
- Section Headings:
  - About/Services/Contact section labels come from site.json.labels.sections

## Services Collaboration Block

- services/page.tsx renders a “Collaboration approach” section using services.json.collaboration:
  - heading, copy, bullets[], and ctaLabel (fallbacks provided)
- Edit services.json to update this content.

## Contact Form (Resend)

- Endpoint: POST /api/contact
- Validates payload via zod (lib/schemas/contact.ts)
- Sends email via Resend with from "Nicky Bruno Portfolio <hello@nickybruno.com>"
- Configure:
  - RESEND_API_KEY
  - CONTACT_TO_EMAIL (or RESEND_CONTACT_TO / NEXT_PUBLIC_CONTACT_TO)

Test (example curl):
```
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"locale\":\"en\",\"name\":\"John Doe\",\"email\":\"john@example.com\",\"project\":\"Build a site\"}"
```

## SEO and Open Graph

- generateMetadata in app/[locale]/layout.tsx uses NEXT_PUBLIC_SITE_URL if set
- JSON‑LD Person schema emitted in layout.tsx
- app/[locale]/opengraph-image.tsx generates a localized OG image

## Translation Workflow (FR)

1) Duplicate EN files to content/fr with the same structure and keys:
   - hero.json, services.json, projects.json, site.json, about.mdx, projects/*.mdx
2) Translate values only (keys remain identical).
3) Verify labels in site.json.labels.* are present to avoid fallback English text.
4) Run pnpm dev and sanity check routes under /fr.

## Visual Production Checklist

See dev/VISUAL PRODUCTION CHECKLIST.md for recommended asset types, motion patterns, and file delivery structure. Placeholder assets can be used initially; optimize images (WebP) and videos (WebM/MP4) later.

## Dev/Docs

- Action plan and running checklist: dev/Action Plan.md
- Product Requirements (current architecture/content model): dev/PRD.md

## Development Notes

- App Router + Middleware, no next.config i18n
- Hot‑reload for content and MDX changes
- Desktop navigation appears at ≥1024px (lg)
- Open Graph image route uses Node runtime for filesystem access
- Turbopack enabled for dev/build

## Troubleshooting

- Redirect loops:
  - Clear localhost cookies; NEXT_LOCALE cookie might lock a locale unexpectedly after content/route changes
- i18n warning regarding next.config:
  - Ensure no i18n block exists in next.config.ts (App Router uses middleware)
- Resend “Missing API key” on build:
  - Initialize Resend only within the request handler; ensure env vars are set
- Edge runtime errors:
  - Content loaders use Node APIs (fs/path); routes depending on loaders run under Node runtime

## License

Private project. All rights reserved.
