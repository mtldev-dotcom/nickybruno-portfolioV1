import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm, type ContactCopy } from "@/components/contact-form";
import { getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/locales";

type ContactPageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  if (!isLocale(locale)) {
    return {};
  }
  const heading = locale === "fr" ? "Travaillons ensemble" : "Let\u2019s build together";
  const description =
    locale === "fr"
      ? "Partagez vos objectifs produits, vos d\u00E9fis d’automatisation ou votre besoin d’accompagnement. Je r\u00E9ponds rapidement pour planifier un appel de d\u00E9couverte."
      : "Share your product goals, automation challenges, or the type of partnership you need. I respond quickly to schedule a discovery call.";
  return {
    title: `${heading} \u2014 Nicky Bruno`,
    description,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;

  if (!isLocale(locale)) {
    notFound();
  }

  const site = await getSiteContent(locale);
  const contactCopy = site.contact as ContactCopy;

  const heading = locale === "fr" ? "Travaillons ensemble" : "Let\u2019s build together";
  const description =
    locale === "fr"
      ? "Partagez vos objectifs produits, vos d\u00E9fis d’automatisation ou votre besoin d’accompagnement. Je r\u00E9ponds rapidement pour planifier un appel de d\u00E9couverte."
      : "Share your product goals, automation challenges, or the type of partnership you need. I respond quickly to schedule a discovery call.";

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {locale === "fr" ? "Contact" : "Contact"}
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">{heading}</h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
      </header>

      <ContactForm locale={locale} copy={contactCopy} />
    </div>
  );
}
