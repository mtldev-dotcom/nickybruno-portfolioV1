# Implementation Plan — Content Integration, Localization, and Mobile-First QA

This document outlines how the new content is integrated into the site, the localization approach, and the remaining work to finalize the English version before starting French translations.

## 1) Architecture Review (What exists)

- Framework: Next.js 15 (App Router) + React 19, Tailwind 4, MDX via next-mdx-remote/rsc.
- Locales: `en`, `fr` with default `en`. Routing at `app/[locale]/...`.
- Content system:
  - JSON for structured copy: `content/{locale}/hero.json`, `services.json`, `projects.json`, `site.json`.
  - MDX for long-form: `content/{locale}/about.mdx`, case studies under `content/{locale}/projects/*.mdx`.
  - Loader in `lib/content.ts` with typed helpers and MDX compilation.
- Key pages:
  - Home: `app/[locale]/page.tsx`
  - Services: `app/[locale]/services/page.tsx`
  - Projects + Detail: `app/[locale]/projects/...`
  - About: `app/[locale]/about/page.tsx`
  - Contact: `app/[locale]/contact/page.tsx`
- Components: `Hero`, `ServicesGrid`, `ProjectCard`, `ProjectGallery`, `StatsRibbon`, `Timeline`, `SiteHeader`, `SiteFooter`, `ContactForm`, etc.

## 2) Source Content Reviewed (Provided)
- dev/Portfolio Content (v2),md.md (human-centered site copy)
- dev/VISUAL PRODUCTION CHECKLIST.md (visual/asset guidelines)
- dev/content/en/* (additional blog entries and page outlines)
- dev/Full Site Content.md (expanded architecture and copy)

## 3) Decisions and Principles
- Mobile-first: Tailwind utilities are already mobile-first; maintain stacked layouts and progressive enhancements.
- All text comes from `content/{locale}`: No hard-coded UI strings in components; introduce `site.labels` for small UI labels.
- English first: Implement EN fully; prepare FR stubs as needed without starting translation.
- Stock images: Use placeholders and references; no heavy media until approved.

## 4) Work Completed (Summary)
- Content updates (EN):
  - content/en/hero.json: New hero headline, subtitle, CTAs, and highlights aligned with Portfolio Content (v2).
  - content/en/services.json: Restructured to four service pillars (Digital Foundations, Automation & Efficiency, Branding & Graphic Design, Consulting & Training).
  - content/en/about.mdx: Updated title/tagline, stats, and body with human-centered copy.
  - content/en/projects.json: Updated simplified excerpts for Sofia AI Desk, Next X Level, Lumicerra.
  - content/en/site.json: Updated meta, navigation intact, footer socials intact; added labels and contact copy.
- i18n-friendly refactors:
  - lib/content.ts: Extended `SiteContent` with `labels` (headerCta, heroPill, footerConnect, home group, projectsHeading).
  - components/site-header.tsx: Accepts `primaryCtaLabel` prop.
  - app/[locale]/layout.tsx: Passes header CTA and footer connect labels from content.
  - components/hero.tsx: Accepts `pillLabel` prop.
  - app/[locale]/page.tsx (Home): Passes hero pill label; sources home labels (Highlights, More Projects, Services CTA, About CTA) from content.
  - components/contact-form.tsx: Supports `sectionLabel` from content (`site.contact.sectionLabel`).
  - app/[locale]/contact/page.tsx: Metadata and heading/description sourced from `site.contact`.
  - app/[locale]/projects/page.tsx: Heading sourced from `site.labels.projectsHeading`; metadata intact.

## 5) Remaining Work (Plan)
- Visual placeholders:
  - Use simple SVG/WebP placeholders for hero and project thumbnails as needed; defer complex animations per checklist.
- Hardcoded strings audit:
  - Re-scan components for residual English tokens; move to `site.labels` or relevant JSON/MDX if found.
- FR readiness:
  - Ensure `content/fr/site.json` includes `labels` object with the same keys (can be placeholders).
  - Ensure `content/fr` mirrors `en` structure; no translation yet.
- QA:
  - Run dev server; test Home, Services, Projects, About, Contact.
  - Check mobile breakpoints: 320, 375, 414, 768, 1024.
- Accessibility:
  - Check semantic headings, focus states, contrast, and link targets (socials use target=_blank + rel).
- SEO:
  - Confirm metadata from `site.json` applied in layout metadata + OpenGraph.
- Performance:
  - Confirm no client-only components unnecessarily server-side; images to be lazy-loaded when added.

## 6) Acceptance Criteria
- All visible UI strings on Home/Services/Projects/About/Contact are fed via `content/en` (MDX/JSON), not hardcoded.
- English copy matches supplied content; navigation/CTAs reflect new labels.
- Site builds and runs locally without TypeScript or runtime errors.
- Layouts responsively adapt with no overflow at common breakpoints.
- Ready to add French translations by dropping parallel JSON/MDX in `content/fr`.

---

# TODO Checklist

- [x] Review and audit codebase and content system
- [x] Map provided content → `content/en/*`
- [x] Update hero.json with new headline/subtitle/CTA/highlights
- [x] Update services.json to four pillars
- [x] Update about.mdx with human-centered copy, stats, timeline
- [x] Update projects.json excerpts for three featured projects
- [x] Update site.json meta/contact; introduce labels for small UI strings
- [x] Update lib/content.ts to support new label schema
- [x] Refactor components (Header, Hero, ContactForm, Footer) to use labels
- [x] Wire home page to use labels (highlights/moreProjects/servicesCta/aboutCta)
- [x] Wire projects page to use label for heading
- [ ] Run dev server and verify pages render with updated content
- [ ] Quick audit for any remaining hardcoded text; migrate into content
- [ ] Mobile-first QA at 320/375/768/1024 widths
- [ ] Accessibility passes: headings, focus rings, contrast
- [ ] Prepare FR stubs (mirror keys in `content/fr/site.json` labels); defer translation
- [ ] Add light placeholder assets for visuals (optional for now)
- [ ] Prepare brief summary of changes for approval
