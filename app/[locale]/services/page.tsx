import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactForm, type ContactCopy } from "@/components/contact-form";
import { ServicesGrid, type ServiceDefinition } from "@/components/services-grid";
import { getServices, getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/locales";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const services = await getServices(locale);
  const title = (services.title as string | undefined) ?? (locale === "fr" ? "Services" : "Services");
  const intro =
    (services.intro as string | undefined) ??
    (locale === "fr"
      ? "Solutions sur mesure en design, d\u00E9veloppement et automatisation IA."
      : "Tailored design, engineering, and automation services.");
  return {
    title: `${title} \u2014 Nicky Bruno`,
    description: intro,
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [services, site] = await Promise.all([getServices(locale), getSiteContent(locale)]);
  const contactCopy = site.contact as ContactCopy;

  const title = typeof services.title === "string" ? services.title : locale === "fr" ? "Services" : "Services";
  const intro =
    typeof services.intro === "string"
      ? services.intro
      : locale === "fr"
        ? "Solutions sur mesure en design, d\u00E9veloppement et automatisation IA."
        : "Tailored design, engineering, and automation services.";

  const collab =
    (services.collaboration as {
      heading?: string;
      copy?: string;
      bullets?: string[];
      ctaLabel?: string;
    } | undefined);

  const contactLabel =
    typeof collab?.ctaLabel === "string"
      ? collab.ctaLabel
      : locale === "fr"
        ? "Discuter d'un projet"
        : "Discuss a project";

  const collaborationHeading =
    typeof collab?.heading === "string"
      ? collab.heading
      : locale === "fr"
        ? "Approche de collaboration"
        : "Collaboration approach";

  const collaborationCopy =
    typeof collab?.copy === "string"
      ? collab.copy
      : locale === "fr"
        ? "Chaque mandat commence par une compr\u00E9hension fine de vos objectifs, de vos utilisatrices et utilisateurs et de vos contraintes. Nous co-construisons une feuille de route claire, puis livrons par it\u00E9rations rapides avec instrumentation continue de la performance."
        : "Every engagement starts with understanding your goals, audiences, and constraints. We co-create a clear roadmap, then deliver in focused iterations with continuous performance instrumentation.";

  const collaborationBullets =
    Array.isArray(collab?.bullets) && collab!.bullets.length > 0
      ? collab!.bullets
      : locale === "fr"
        ? [
            "Ateliers de d\u00E9couverte et cartographie des flux critiques",
            "Prototypes interactifs pour aligner les parties prenantes",
            "Livraison incr\u00E9mentale avec revues hebdomadaires",
            "Instrumentation performance et accessibilit\u00E9 d\u00E8s le d\u00E9part",
          ]
        : [
            "Discovery workshops and critical workflow mapping",
            "Interactive prototypes to align stakeholders",
            "Incremental delivery with weekly reviews",
            "Performance and accessibility instrumentation from day one",
          ];

  return (
    <div className="space-y-14">
      <header className="space-y-6">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {(site.labels?.sections?.services as string) ?? (locale === "fr" ? "Offre" : "Services")}
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">{intro}</p>
      </header>

      <ServicesGrid
        title={title}
        intro={intro}
        services={Array.isArray(services.services) ? (services.services as ServiceDefinition[]) : []}
        cta={
          services.cta
            ? { 
                label: String((services.cta as { label?: string })?.label), 
                href: String((services.cta as { href?: string })?.href) 
              }
            : { label: contactLabel, href: `/${locale}/contact` }
        }
      />

      <section className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-[0_30px_90px_-60px_rgba(102,255,0,0.55)] md:p-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">{collaborationHeading}</h2>
          <p className="text-sm text-muted-foreground md:text-base">{collaborationCopy}</p>
          <ul className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {collaborationBullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-full border border-primary/60 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            {contactLabel}
          </Link>
        </div>
      </section>

      <ContactForm locale={locale} copy={contactCopy} />
    </div>
  );
}
