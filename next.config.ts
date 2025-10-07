import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
