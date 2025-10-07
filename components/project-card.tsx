import Link from "next/link";

import type { ProjectSummary } from "@/lib/content";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectSummary;
  locale: string;
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const href = `/${locale}/projects/${project.slug}`;
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_35px_70px_-50px_rgba(102,255,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90 transition group-hover:opacity-100"
        style={{
          background:
            project.theme?.background ??
            "radial-gradient(circle at 20% 20%, rgba(102,255,0,0.23), rgba(12,12,12,0.92))",
          color: project.theme?.foreground,
        }}
      />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {project.year}
          </span>
          <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
          <p className="text-sm text-muted-foreground/90">{project.excerpt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/80 bg-background/90 px-3 py-1 transition group-hover:border-primary/50 group-hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
