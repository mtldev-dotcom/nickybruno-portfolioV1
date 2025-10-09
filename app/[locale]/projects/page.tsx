import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectGallery } from "@/components/project-gallery";
import { getProjects, getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/locales";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const [listing, site] = await Promise.all([getProjects(locale), getSiteContent(locale)]);
  return {
    title: `${listing.title} — Nicky Bruno`,
    description: listing.intro,
  };
}

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const categoryParam = typeof resolvedSearchParams?.category === "string" ? resolvedSearchParams.category : undefined;

  if (!isLocale(locale)) {
    notFound();
  }

  const [listing, site] = await Promise.all([getProjects(locale), getSiteContent(locale)]);

  const activeFilter = listing.filters?.some((filter) => filter.key === categoryParam)
    ? categoryParam
    : undefined;

  const heading = (site.labels?.projectsHeading as string) ?? (locale === "fr" ? "\u00C9tudes de cas" : "Case Studies");

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{heading}</span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">{listing.title}</h1>
        {listing.intro ? <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{listing.intro}</p> : null}
      </div>
      <ProjectGallery locale={locale} listing={listing} activeFilter={activeFilter} />
    </div>
  );
}
