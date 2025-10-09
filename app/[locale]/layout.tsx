import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FloatingDockRoot } from "@/components/floating-dock-root";
import { getSiteContent } from "@/lib/content";
import { isLocale, locales } from "@/lib/locales";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const site = await getSiteContent(locale);
  const meta = site.meta;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
    alternates: {
      canonical: `/${locale}`,
      languages: locales.reduce<Record<string, string>>((acc, current) => {
        acc[current] = `/${current}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      siteName: meta.siteName ?? "Nicky Bruno",
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const site = await getSiteContent(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nickybruno.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nicky Bruno",
    jobTitle: "Developer, Designer & AI Automation Expert",
    url: `${baseUrl}/${locale}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    sameAs: site.footer.socials.map((social: { href: string }) => social.href),
    knowsLanguage: ["English", "French"],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader locale={locale} navigation={site.navigation} primaryCtaLabel={site.labels?.headerCta} />
      <main className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(var(--brand-green),0.05),_transparent_60%),radial-gradient(circle_at_80%_10%,_rgba(var(--brand-blue),0.06),_transparent_55%)]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 sm:px-10 md:py-20">{children}</div>
      </main>
      <SiteFooter locale={locale} copyright={site.footer.copyright} socials={site.footer.socials} connectLabel={site.labels?.footerConnect} />
      <FloatingDockRoot locale={locale} />
    </div>
  );
}
