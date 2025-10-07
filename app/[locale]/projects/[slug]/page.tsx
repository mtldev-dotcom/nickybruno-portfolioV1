import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectCaseStudy, getProjects } from "@/lib/content";
import { isLocale, locales } from "@/lib/locales";

type ProjectPageParams = {
  locale: string;
  slug: string;
};

type ProjectPageProps = {
  params: ProjectPageParams;
};

export async function generateStaticParams(): Promise<ProjectPageParams[]> {
  const params: ProjectPageParams[] = [];
  for (const locale of locales) {
    const listing = await getProjects(locale);
    for (const project of listing.projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = params;
  if (!isLocale(locale)) {
    return {};
  }

  const listing = await getProjects(locale);
  const project = listing.projects.find((entry) => entry.slug === slug);
  if (!project) {
    return {};
  }

  return {
    title: `${project.title} - Nicky Bruno`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = params;

  if (!isLocale(locale)) {
    notFound();
  }

  const listing = await getProjects(locale);
  const project = listing.projects.find((entry) => entry.slug === slug);
  if (!project) {
    notFound();
  }

  const caseStudy = await getProjectCaseStudy(locale, slug);
  const meta = caseStudy.frontmatter ?? {};

  const heroGradient = typeof meta.heroGradient === "string" ? meta.heroGradient : undefined;
  const roles = Array.isArray(meta.role) ? (meta.role as string[]) : [];
  const tools = Array.isArray(meta.tools) ? (meta.tools as string[]) : [];
  const metrics = Array.isArray(meta.metrics)
    ? (meta.metrics as { label: string; value: string }[])
    : [];
  const client = typeof meta.client === "string" ? meta.client : undefined;
  const summary = typeof meta.summary === "string" ? meta.summary : project.excerpt;

  const caseStudyLabel = locale === "fr" ? "\u00C9tude de cas" : "Case Study";
  const rolesLabel = locale === "fr" ? "R\u00F4les" : "Roles";
  const toolsLabel = locale === "fr" ? "Outils" : "Stack";
  const impactLabel = locale === "fr" ? "Impact" : "Impact";

  return (
    <article className="space-y-10">
      <header
        className="space-y-8 overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-8 shadow-[0_30px_90px_-60px_rgba(102,255,0,0.55)] md:p-12"
        style={heroGradient ? { backgroundImage: heroGradient } : undefined}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{caseStudyLabel}</span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">{project.title}</h1>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">{summary}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <span>{project.year}</span>
          {client ? (
            <>
              <span className="text-muted-foreground/40">\u2022</span>
              <span>{client}</span>
            </>
          ) : null}
          <span className="text-muted-foreground/40">\u2022</span>
          <span>{project.category}</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {roles.length ? (
            <div className="space-y-2 rounded-2xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{rolesLabel}</p>
              <ul className="space-y-1 text-sm text-foreground">
                {roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {tools.length ? (
            <div className="space-y-2 rounded-2xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{toolsLabel}</p>
              <ul className="space-y-1 text-sm text-foreground">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {metrics.length ? (
            <div className="space-y-2 rounded-2xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{impactLabel}</p>
              <ul className="space-y-1 text-sm text-foreground">
                {metrics.map((metric) => (
                  <li key={metric.label} className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="font-semibold text-primary">{metric.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </header>
      <div className="prose prose-neutral max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
        {caseStudy.content}
      </div>
    </article>
  );
}
