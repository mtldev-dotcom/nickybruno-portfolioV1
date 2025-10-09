import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // Note: i18n config is not supported in App Router
  // Internationalization is handled via middleware.ts
};

export default nextConfig;
