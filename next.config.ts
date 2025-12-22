import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "main.marabu.services",
      },
    ],
    unoptimized: true, // Bypass image optimization to allow private IP resolution
  },
};

export default withNextIntl(nextConfig);
