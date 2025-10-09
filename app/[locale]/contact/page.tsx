import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm, type ContactCopy } from "@/components/contact-form";
import { getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/locales";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const site = await getSiteContent(locale);
  const contact = site.contact as ContactCopy;
  const heading = contact.title as string;
  const description = contact.description as string;
  return {
    title: `${heading} \u2014 Nicky Bruno`,
    description,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const site = await getSiteContent(locale);
  const contactCopy = site.contact as ContactCopy;

  const heading = contactCopy.title as string;
  const description = contactCopy.description as string;

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {(site.labels?.sections?.contact as string) ?? (locale === "fr" ? "Contact" : "Contact")}
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">{heading}</h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
      </header>

      <ContactForm locale={locale} copy={contactCopy} />
    </div>
  );
}
