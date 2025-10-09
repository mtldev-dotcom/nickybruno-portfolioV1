import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  locale: string;
  variant?: "light" | "dark" | "auto";
};

export function SiteLogo({ locale, variant = "auto" }: SiteLogoProps) {
  if (variant === "auto") {
    return (
      <Link
        href={`/${locale}`}
        className="group inline-flex items-center gap-3 transition"
        aria-label="Nicky Bruno - Home"
      >
        {/* Light logo by default; hidden in dark mode */}
        <Image
          src="/logo-light-mode.png"
          alt="Nicky Bruno Logo"
          width={426}
          height={80}
          className="max-h-22 w-auto py-1 opacity-100 block dark:hidden"
          priority
          unoptimized
        />
        {/* Dark logo only in dark mode */}
        <Image
          src="/logo-dark-mode.png"
          alt="Nicky Bruno Logo"
          width={426}
          height={80}
          className="max-h-22 w-auto py-1 opacity-100 hidden dark:block"
          priority
          unoptimized
        />
      </Link>
    );
  }

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
