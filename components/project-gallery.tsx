'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import type { ProjectsListing } from '@/lib/content';

import { ProjectCard } from './project-card';

type ProjectGalleryProps = {
  locale: string;
  listing: ProjectsListing;
  activeFilter?: string;
};

export function ProjectGallery({ locale, listing, activeFilter }: ProjectGalleryProps) {
  const filteredProjects = useMemo(() => {
    if (!activeFilter || activeFilter === 'all') {
      return listing.projects;
    }
    return listing.projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, listing.projects]);

  const allProjectsSelected = !activeFilter || activeFilter === 'all';

  const emptyMessage =
    locale === 'fr'
      ? "Aucun projet ne correspond à ce filtre pour l'instant. Revenez bientôt !"
      : 'No projects match this filter yet. Check back soon!';

  const reminderMessage =
    locale === 'fr'
      ? 'Plus de cas seront ajoutés bientôt. Suivez Nicky sur LinkedIn pour ne rien manquer.'
      : 'More case studies are on the way. Connect on LinkedIn to catch the next launch.';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {listing.filters?.map((filter) => {
          const isActive = (activeFilter ?? 'all') === filter.key;
          return (
            <Link
              key={filter.key}
              href={`?category=${filter.key}`}
              scroll={false}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(102,255,0,0.45)]'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
      {filteredProjects.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border/60 bg-card/60 p-8 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : null}
      {allProjectsSelected ? <p className="text-sm text-muted-foreground/80">{reminderMessage}</p> : null}
    </div>
  );
}
