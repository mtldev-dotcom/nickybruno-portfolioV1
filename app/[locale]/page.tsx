import Link from "next/link";
import { notFound } from "next/navigation";

import { AboutGlimpse } from "@/components/about-glimpse";
import { ContactForm, type ContactCopy } from "@/components/contact-form";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { ServicesGrid, type ServiceDefinition } from "@/components/services-grid";
import { StatsRibbon } from "@/components/stats-ribbon";
import { getAboutContent, getHero, getProjects, getServices, getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/locales";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [hero, services, projects, about, site] = await Promise.all([
    getHero(locale),
    getServices(locale),
    getProjects(locale),
    getAboutContent(locale),
    getSiteContent(locale),
  ]);

  const aboutFrontmatter = about.frontmatter ?? {};
  const stats = Array.isArray(aboutFrontmatter.stats)
    ? (aboutFrontmatter.stats as { label: string; value: string }[])
    : [];
  const timeline = Array.isArray(aboutFrontmatter.timeline)
    ? (aboutFrontmatter.timeline as { year: string; title: string; description: string }[])
    : [];

  const projectsToShow = projects.projects.slice(0, 3);
  const contactCopy = site.contact as ContactCopy;

  const moreProjectsLabel = (site.labels?.home?.moreProjects as string) ?? (locale === "fr" ? "Voir tous les projets" : "View all projects");
  const servicesCtaLabel = (site.labels?.home?.servicesCta as string) ?? (locale === "fr" ? "Voir les services" : "See services");
  const aboutCtaLabel = (site.labels?.home?.aboutCta as string) ?? (locale === "fr" ? "Explorer le parcours complet" : "Explore full journey");
  const highlightLabel = (site.labels?.home?.highlights as string) ?? (locale === "fr" ? "S\u00E9lection" : "Highlights");
  const aboutTitleFallback = locale === "fr" ? "\u00C0 propos" : "About";

  return (
    <div className="flex flex-col gap-16">
      <Hero
        locale={locale}
        pillLabel={site.labels?.heroPill}
        title={String(hero.title)}
        subtitle={String(hero.subtitle)}
        primaryCta={{ 
          label: String((hero.primaryCta as { label?: string })?.label), 
          href: String((hero.primaryCta as { href?: string })?.href) 
        }}
        secondaryCta={
          hero.secondaryCta
            ? { 
                label: String((hero.secondaryCta as { label: string }).label), 
                href: String((hero.secondaryCta as { href: string }).href) 
              }
            : undefined
        }
        highlights={Array.isArray(hero.highlights) ? (hero.highlights as { label: string; value: string }[]) : undefined}
      />

      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{highlightLabel}</span>
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{projects.title}</h2>
            {projects.intro ? <p className="max-w-2xl text-base text-muted-foreground">{projects.intro}</p> : null}
          </div>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center justify-center rounded-full border border-primary/60 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            {moreProjectsLabel}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projectsToShow.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </section>

      <StatsRibbon stats={stats} />

      <ServicesGrid
        title={String(services.title)}
        intro={typeof services.intro === "string" ? services.intro : undefined}
        services={Array.isArray(services.services) ? (services.services as ServiceDefinition[]) : []}
        cta={
          services.cta
            ? {
                label: String((services.cta as { label?: string })?.label ?? servicesCtaLabel),
                href: String((services.cta as { href?: string })?.href ?? `/${locale}/contact`),
              }
            : { label: servicesCtaLabel, href: `/${locale}/services` }
        }
      />

      <AboutGlimpse
        locale={locale}
        title={String(aboutFrontmatter.title ?? aboutTitleFallback)}
        tagline={String(aboutFrontmatter.tagline ?? "")}
        timeline={timeline}
        ctaLabel={aboutCtaLabel}
        ctaHref={`/${locale}/about`}
      />

      <ContactForm locale={locale} copy={contactCopy} />
    </div>
  );
}
