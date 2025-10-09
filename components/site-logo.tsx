import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  locale: string;
};

export function SiteLogo({ locale }: SiteLogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className="group inline-flex items-center gap-3 transition hover:opacity-80"
      aria-label="Nicky Bruno - Home"
    >
      <Image
        src="/logo_nicky_bruno.png"
        alt="Nicky Bruno Logo"
        width={120}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}
