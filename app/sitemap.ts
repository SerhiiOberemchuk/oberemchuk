import type { MetadataRoute } from "next";
import type { Project } from "@/types/projects";
import { getProjects } from "@/lib/projects-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.SITE_URL || "https://www.oberemchuk.site"
  ).replace(/\/+$/, "");
  const projects: Project[] = await getProjects();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.updated_at ? new Date(project.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
