import Link from "next/link";

import { cn } from "@/lib/utils";

export type ServiceDefinition = {
  name: string;
  description: string;
  deliverables?: string[];
  badge?: string;
};

type ServicesGridProps = {
  title: string;
  intro?: string;
  services: ServiceDefinition[];
  cta?: {
    label: string;
    href: string;
  };
};

export function ServicesGrid({ title, intro, services, cta }: ServicesGridProps) {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
        {intro ? <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p> : null}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <article
            key={service.name}
            className={cn(
              "flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_25px_60px_-40px_rgba(var(--brand-green),0.5),0_28px_70px_-50px_rgba(var(--brand-blue),0.35)] transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_35px_90px_-50px_rgba(var(--brand-green),0.6),0_38px_100px_-60px_rgba(var(--brand-blue),0.4)]",
              index === 0 ? "md:translate-y-4" : "",
              index === services.length - 1 ? "md:-translate-y-4" : "",
            )}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
                {service.badge ? (
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    {service.badge}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              {service.deliverables?.length ? (
                <ul className="space-y-2 text-sm text-muted-foreground/80">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      {cta ? (
        <Link
          href={cta.href}
          className="inline-flex items-center justify-center rounded-full border border-primary/60 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {cta.label}
        </Link>
      ) : null}
    </section>
  );
}
