"use server";
import type { Project } from "@/types/projects";

type ProjectsResponse = {
  success?: boolean;
  data?: Project[];
};

type ProjectResponse = {
  success?: boolean;
  data?: Project;
};
const DEFAULT_PROJECTS_API_BASE_URL = "https://v0-adminca-bk.vercel.app";

const PROJECTS_REVALIDATE_SECONDS = 86400;

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      DEFAULT_PROJECTS_API_BASE_URL + "/api/projects",
      {
        cache: "force-cache",
        next: {
          revalidate: PROJECTS_REVALIDATE_SECONDS,
          tags: ["projects"],
        },
      },
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch projects:",
        response.status,
        response.statusText,
      );
      return [];
    }

    const payload = (await response.json()) as ProjectsResponse;
    if (payload.success && Array.isArray(payload.data)) {
      return payload.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(
      DEFAULT_PROJECTS_API_BASE_URL + `/api/projects/by-slug/${slug}`,
      {
        cache: "force-cache",
        next: {
          revalidate: PROJECTS_REVALIDATE_SECONDS,
          tags: ["projects", `projects:${slug}`],
        },
      },
    );

    if (response.ok) {
      const payload = (await response.json()) as ProjectResponse;
      if (payload.success && payload.data) {
        return payload.data;
      }
    }
  } catch (error) {
    console.error("Error fetching project by slug:", error);
  }

  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}
