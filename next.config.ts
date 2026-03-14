import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mioleatzjwupcghy.public.blob.vercel-storage.com"
      }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default withNextIntl(nextConfig);
