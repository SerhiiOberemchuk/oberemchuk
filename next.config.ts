import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      new URL("https://mioleatzjwupcghy.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default nextConfig;
