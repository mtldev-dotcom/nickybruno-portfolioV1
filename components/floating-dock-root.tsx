"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconFolders,
  IconBriefcase,
  IconUser,
  IconMail,
} from "@tabler/icons-react";

type FloatingDockRootProps = {
  locale: string;
};

export function FloatingDockRoot({ locale }: FloatingDockRootProps) {
  const items = [
    {
      title: locale === "fr" ? "Accueil" : "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: `/${locale}`,
    },
    {
      title: locale === "fr" ? "Projets" : "Work",
      icon: (
        <IconFolders className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: `/${locale}/projects`,
    },
    {
      title: locale === "fr" ? "Services" : "Services",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: `/${locale}/services`,
    },
    {
      title: locale === "fr" ? "À propos" : "About",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: `/${locale}/about`,
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: `/${locale}/contact`,
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center">
      <div className="pointer-events-auto drop-shadow-[0_0_24px_rgba(var(--brand-blue),0.22),0_0_20px_rgba(var(--brand-green),0.2)]">
        <FloatingDock items={items} />
      </div>
    </div>
  );
}
