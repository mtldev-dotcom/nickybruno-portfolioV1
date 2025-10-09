import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  locale: string;
  variant?: "light" | "dark";
};

export function SiteLogo({ locale, variant = "dark" }: SiteLogoProps) {
  const src = variant === "dark" ? "/logo-dark-mode.png" : "/logo-light-mode.png";
  return (
    <Link
      href={`/${locale}`}
      className="group inline-flex items-center gap-3 transition"
      aria-label="Nicky Bruno - Home"
    >
      <Image
        src={src}
        alt="Nicky Bruno Logo"
        width={426}
        height={80}
        className="max-h-22 w-auto py-1 opacity-100"
        priority
        unoptimized
      />
    </Link>
  );
}
