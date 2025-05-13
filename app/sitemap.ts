import type { MetadataRoute } from "next"
import { getProjects } from "@/lib/projects-db"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Базовий URL сайту
  const baseUrl = process.env.SITE_URL || "https://www.oberemchuk.site"

  // Отримуємо всі проекти для динамічних сторінок
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch (error) {
    console.error("Помилка отримання проектів для sitemap:", error)
  }

  // Статичні сторінки
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Динамічні сторінки проектів
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Об'єднуємо всі сторінки
  return [...staticPages, ...projectPages]
}
