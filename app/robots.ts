import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // Базовий URL сайту
  const baseUrl = process.env.SITE_URL || "https://www.oberemchuk.site"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
