# 🧩 PRD — nickybruno.com (for Codex)
> Product Requirements Document — Portfolio Website (EN / FR)

---

## 0. **Project Context**

- **Brand:** Nicky Bruno  
- **Location:** Montreal, Canada  
- **Role:** Developer • Designer • AI Automation Expert  
- **Project:** Personal bilingual portfolio website  
- **Developer:** Codex (AI assistant, post-setup implementation)  
- **Environment:** Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui  

---

## 1. **Goal**

Build a fast, bilingual, elegant, and maintainable portfolio site that:  
- Presents **Nicky Bruno’s expertise** in web development, AI, and automation.  
- Highlights **projects, services, and professional journey** in a clean, visual, and narrative way.  
- Serves as both **a professional portfolio and contact funnel**.  

---

## 2. **Project Tone & Style**

- **Tone:** Confident • Creative • Minimal • High-Tech  
- **Design Aesthetic:** Clean layouts, grid-based, lots of white space, clear typography, subtle motion.  
- **Motion:** Gentle animations and hover effects (using Framer Motion).  
- **Typography:**  
  - Display: *Geist Sans* or *Space Grotesk*  
  - Body: *Inter*  
- **Colors:**  
  - Base: Neutral gray (zinc/stone palette)  
  - Accent: Electric Green `#66FF00` (Brand)  
  - Secondary: Black / Graphite for dark mode  

---

## 3. **Repo Structure**

At the project root:

```
/src        → Next.js application code
/public     → Static assets (images, fonts, icons)
/dev        → Internal development folder
  ├── PRD.md          # This document
  ├── docs/           # Technical notes, architecture, workflows
  ├── images/         # UI concepts, mockups, screenshots
  ├── logos/          # Brand assets (SVG, PNG, favicon)
```

---

## 4. **Core Requirements**

- **Bilingual:** English + French  
- **Responsive:** Fully mobile/tablet optimized  
- **SEO-Ready:** Meta tags, JSON-LD, sitemap, OG images  
- **Accessible:** WCAG-compliant (contrast, focus, alt text, ARIA)  
- **Performant:** Lighthouse 95+ across metrics  
- **Dynamic Content:** Driven by JSON/MDX files per locale  

---

## 5. **Information Architecture**

```
/[locale]/
  ├─ page.tsx                  → Home (hero, tagline, CTA)
  ├─ projects/page.tsx         → Portfolio grid (filterable)
  ├─ projects/[slug]/page.tsx  → Case study (MDX)
  ├─ services/page.tsx         → Services overview
  ├─ about/page.tsx            → Bio + skills + timeline
  ├─ contact/page.tsx          → Contact form + links
  └─ legal/privacy.tsx         → Privacy policy (optional)
```

- **Locales:** `/en` and `/fr`  
- **Default:** English  
- **Language Toggle:** Persistent locale state  

---

## 6. **Content Model**

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

### JSON Fields
- **hero.json:** title, subtitle, CTA text + link  
- **services.json:** title, description, pricing or type  
- **projects.json:** title, slug, tags, year, short excerpt, image  
- **projects/*.mdx:** long-form case studies with metadata  

### Seed Content
| Key | English | French |
|-----|----------|--------|
| Hero Title | “Design ✦ Code ✦ Automation” | “Design ✦ Code ✦ Automatisation” |
| Subtitle | “Building fast, bilingual experiences powered by AI.” | “Concevoir des expériences rapides et bilingues propulsées par l’IA.” |
| CTA | “See my work” | “Voir mes projets” |

---

## 7. **Visual Components (shadcn/ui)**

| Component | Description |
|------------|--------------|
| **Navbar** | Logo, nav links, language toggle |
| **Hero** | Headline, subtitle, CTA, motion |
| **Footer** | Copyright, socials |
| **ProjectCard** | Image + overlay (title, tags, year) |
| **ProjectGallery** | Filterable grid (masonry layout) |
| **MDXContent** | Styling for MDX case studies |
| **Stats** | Years, clients, tech stacks |
| **ServicesGrid** | Service cards |
| **ContactForm** | Name, email, message (validated with Zod) |
| **LanguageToggle** | Switches between `/en` and `/fr` |
| **ThemeToggle** | Dark/light mode (optional) |

---

## 8. **Integrations**

- **Email Delivery:** via [Resend](https://resend.com)  
- **Webhook (optional):** Telegram bot integration for instant notifications  
- **Analytics:** Plausible or Vercel Analytics  
- **Hosting:** Vercel  
- **SEO / Metadata:** Next.js Metadata API + OG generation  

---

## 9. **Codex Implementation Notes**

- Codex begins **after manual setup** (Next.js + Tailwind + shadcn).  
- Use **Next.js 15 App Router** and **server components** wherever possible.  
- Keep components modular, typed, and documented.  
- Add JSDoc or comment headers in each component and function.  
- Maintain descriptive commit messages and link updates to `/dev/docs`.  
- Store new mockups, assets, and previews in `/dev/images`.

---

## 10. **Environment Variables (.env.local)**

```
NEXT_PUBLIC_SITE_URL=https://nickybruno.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
RESEND_API_KEY=...
TELEGRAM_BOT_TOKEN=...      # optional
TELEGRAM_CHAT_ID=...        # optional
PLAUSIBLE_DOMAIN=nickybruno.com
```

---

## 11. **Acceptance Criteria**

- [ ] Lighthouse ≥ 95 (mobile) for Performance, SEO, Accessibility  
- [ ] i18n working across all routes  
- [ ] MDX renders properly with heading anchors and images  
- [ ] Contact form works (validated + Resend delivery)  
- [ ] OG images generated dynamically  
- [ ] SEO and JSON-LD metadata functional  
- [ ] Playwright a11y tests pass  

---

## 12. **Post-Launch Enhancements**

- Blog section (MDX posts)  
- Newsletter integration (Buttondown, ConvertKit)  
- CMS bridge (Payload or Contentlayer)  
- Dark mode with system preference  
- Tag-based filtering persistence  
- Sitemap automation  

---

## 13. **Ownership & Licensing**

- © Nicky Bruno — All rights reserved.  
- Source code under **MIT License** (unless otherwise stated).  
- All brand assets, logos, and media remain proprietary.  
