# Nicky Bruno — Portfolio (Next.js 15, App Router)

A modern, bilingual (EN/FR) portfolio built with Next.js 15 App Router. It showcases projects, services, and expertise in design, development, and AI automation. The site supports SEO-friendly static generation, MDX content, and a production-ready contact flow via Resend.

Live dev URL (local): http://localhost:3000

## Features

- Internationalization (en, fr) with automatic language detection and cookie persistence
- App Router + Middleware-based locale routing (no Next i18n config required)
- Responsive UI, mobile menu under 1024px, and custom header with logo
- MDX content for About and Project case studies
- Project listing with filters and per-project pages
- SEO: dynamic metadata, Open Graph image generation
- Contact form via Resend email API
- TypeScript-first, strict linting, and Turbopack builds
- Production-focused: SSG for most pages, Node runtime where needed

## Tech Stack

- Framework: Next.js 15.5.4 (App Router)
- Language: TypeScript
- Styling/UI: Tailwind CSS 4, custom components, Lucide icons
- Content: MDX (next-mdx-remote/rsc), JSON files under content/
- Email: Resend (API)
- Package Manager: pnpm
- Node.js: 18+ recommended

## Prerequisites

- Node.js 18 or newer
- pnpm installed (recommended): https://pnpm.io/installation

## Quick Start

1) Install dependencies
- pnpm install

2) Start development server
- pnpm dev
- Visit http://localhost:3000

3) Production build
- pnpm run build
- pnpm start

## Scripts

- pnpm dev — Start Next.js in development using Turbopack
- pnpm build — Build the app for production using Turbopack
- pnpm start — Start the production server
- pnpm lint — Run ESLint

## Environment Variables

Create a .env.local file in the project root with the following (adjust as needed):

- NEXT_PUBLIC_SITE_URL — e.g. https://nickybruno.com (used for SEO metadataBase)
- RESEND_API_KEY — Resend API key (required for contact form)
- CONTACT_TO_EMAIL — Destination inbox for contact form (or RESEND_CONTACT_TO or NEXT_PUBLIC_CONTACT_TO)

Notes:
- The contact API will gracefully return 503 if RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.
- Resend requires a verified domain and a valid from address (configured in app/api/contact/route.ts).

## Internationalization (EN/FR)

- Locale routing is handled via middleware.ts (App Router compatible). No next.config i18n block is used.
- Root / will redirect to a locale-prefixed route (/en or /fr) based on:
  - NEXT_LOCALE cookie (if set)
  - Accept-Language header (e.g., en-US -> en)
  - Default fallback: en
- Locale paths:
  - /en, /fr (home)
  - /en/about, /fr/about
  - /en/projects, /fr/projects (+ /en/projects/[slug])
  - /en/services, /fr/services
  - /en/contact, /fr/contact
- Cookie API:
  - POST /api/locale with JSON { "locale": "en" | "fr" } will set NEXT_LOCALE.

## Content Model

All content lives under the content/ directory and is fully editable:

- content/en/
  - hero.json — Homepage hero texts and highlights
  - services.json — Services listing and CTA
  - projects.json — Listing, filters, and project summaries
  - site.json — Global navigation, footer, and contact copy
  - projects/*.mdx — Case study pages
  - about.mdx — About page body
- content/fr/
  - Mirrors the en structure, translated

MDX Components:
- Defined in lib/mdx-components.tsx for consistent typography and links
- Used by getMdxContent(...) in lib/content.ts

## Code Structure (Key Files)

- middleware.ts — Locale detection and redirects
- app/[locale]/** — All localized routes (layout, pages, opengraph-image)
- app/api/contact/route.ts — Resend integration to send contact emails
- app/api/locale/route.ts — Sets the NEXT_LOCALE cookie
- components/** — Header, footer, mobile menu, UI components
- lib/content.ts — Content loaders for JSON and MDX
- lib/locales.ts — Locale list, default locale, and type helpers
- public/** — Assets (logo, icons, favicons)

## Header and Mobile Menu

- Custom logo from public/logo_nicky_bruno.png in the header
- Black header background (bg-black)
- Desktop: Navigation and CTA visible at ≥1024px
- Mobile/Tablet: Hamburger menu under 1024px with a slide-down panel

## Contact Form (Resend)

- Endpoint: POST /api/contact
- Validates payload via zod (lib/schemas/contact.ts)
- Sends email using Resend with from "Nicky Bruno Portfolio <hello@nickybruno.com>"
- Configure:
  - RESEND_API_KEY in environment
  - CONTACT_TO_EMAIL (or RESEND_CONTACT_TO or NEXT_PUBLIC_CONTACT_TO)

Testing (example curl):
- curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"locale\":\"en\",\"name\":\"John Doe\",\"email\":\"john@example.com\",\"project\":\"Build a site\"}"

## SEO and Open Graph

- generateMetadata in app/[locale]/layout.tsx uses NEXT_PUBLIC_SITE_URL if set
- Warning during build if metadataBase (site URL) is not set — set NEXT_PUBLIC_SITE_URL in production
- Open Graph image:
  - app/[locale]/opengraph-image.tsx uses runtime = "nodejs" to read content via Node APIs
  - Generates localized image with a featured project

## Deployment

Recommended: Vercel
1) Push to a Git repository
2) Import into Vercel
3) Set Environment Variables (Project Settings → Environment Variables):
   - NEXT_PUBLIC_SITE_URL = https://your-domain.tld
   - RESEND_API_KEY = re_xxx
   - CONTACT_TO_EMAIL = you@your-domain.tld
4) Build command: pnpm run build
5) Output is served by pnpm start (automatically handled on Vercel)
6) Add your domain(s) and set up SSL

Self-Host (Node):
- pnpm install --frozen-lockfile
- pnpm run build
- pnpm start
- Ensure process manager (PM2/systemd/Docker) is configured, and env vars are set

## Development Notes

- App Router + Middleware, no next.config i18n (unsupported for App Router)
- If you edit content or MDX, the dev server hot-reloads
- If you change NEXT_PUBLIC_SITE_URL, restart dev server to reflect metadata changes
- Mobile breakpoint for desktop navigation is set at 1024px (lg)
- opengraph-image route uses Node runtime to permit filesystem access
- Turbopack is enabled for dev and build for speed

## Troubleshooting

- Redirect loops:
  - Clear localhost cookies; NEXT_LOCALE might cause repeated redirects if content or routes are changed
- i18n warning about next.config:
  - Remove i18n from next.config.ts (already done), use middleware.ts instead
- Resend “Missing API key” on build:
  - We initialize Resend lazily inside the request handler; if you still see errors, ensure RESEND_API_KEY is set in the runtime environment
- Edge runtime errors:
  - Content loaders use Node APIs (fs/path); routes that depend on them are set to runtime = "nodejs"

## License

Private project. All rights reserved.
