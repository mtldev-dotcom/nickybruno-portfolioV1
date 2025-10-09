import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkillsGrid } from "@/components/skills-grid";
import { StatsRibbon } from "@/components/stats-ribbon";
import { Timeline } from "@/components/timeline";
import { getAboutContent, getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/locales";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const [about/* , site */] = await Promise.all([getAboutContent(locale), getSiteContent(locale)]);
  const title = (about.frontmatter?.title as string | undefined) ?? (locale === "fr" ? "\u00C0 propos" : "About");
  const tagline =
    (about.frontmatter?.tagline as string | undefined) ??
    (locale === "fr"
      ? "Cr\u00E9er des exp\u00E9riences performantes et humaines."
      : "Building human, high-performance experiences.");
  return {
    title: `${title} \u2014 Nicky Bruno`,
    description: tagline,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [about, site] = await Promise.all([getAboutContent(locale), getSiteContent(locale)]);
  const frontmatter = about.frontmatter ?? {};

  const stats = Array.isArray(frontmatter.stats)
    ? (frontmatter.stats as { label: string; value: string }[])
    : [];
  const timelineEntries = Array.isArray(frontmatter.timeline)
    ? (frontmatter.timeline as { year: string; title: string; description: string }[])
    : [];

  const rawSkills =
    frontmatter.skills as Record<string, { label: string; items: string[] }> | undefined;
  const skillsGroups = rawSkills ? Object.values(rawSkills) : [];

  const title =
    typeof frontmatter.title === "string" ? frontmatter.title : locale === "fr" ? "\u00C0 propos" : "About";
  const tagline =
    typeof frontmatter.tagline === "string"
      ? frontmatter.tagline
      : locale === "fr"
        ? "Cr\u00E9er des exp\u00E9riences performantes et humaines."
        : "Building human, high-performance experiences.";

  const label = (site.labels?.sections?.about as string) ?? (locale === "fr" ? "\u00C0 propos" : "About");

  return (
    <div className="space-y-14">
      <header className="space-y-6">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{label}</span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">{tagline}</p>
      </header>

      <StatsRibbon stats={stats} />

      <div className="prose prose-neutral max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
        {about.content}
      </div>

      <Timeline entries={timelineEntries} locale={locale} />

      <SkillsGrid
        locale={locale}
        groups={skillsGroups.map((group) => ({
          label: group.label,
          items: group.items,
        }))}
      />
    </div>
  );
}
