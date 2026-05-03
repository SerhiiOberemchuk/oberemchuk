import "server-only";

import {cache} from "react";
import type {Project} from "@/types/projects";

type ProjectsResponse = {
  success?: boolean;
  data?: Project[];
};

type ProjectResponse = {
  success?: boolean;
  data?: Project;
};

const DEFAULT_PROJECTS_API_BASE_URL = "https://v0-adminca-bk.vercel.app";
const PROJECTS_API_BASE_URL = (
  process.env.PROJECTS_API_BASE_URL ?? DEFAULT_PROJECTS_API_BASE_URL
).replace(/\/+$/, "");
const PROJECTS_REVALIDATE_SECONDS = 86400;

async function fetchProjectsJson<T>(path: string, tags: string[]): Promise<T | null> {
  try {
    const response = await fetch(`${PROJECTS_API_BASE_URL}${path}`, {
      cache: "force-cache",
      next: {
        revalidate: PROJECTS_REVALIDATE_SECONDS,
        tags
      }
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch projects:",
        response.status,
        response.statusText,
        path
      );
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error fetching projects:", path, error);
    return null;
  }
}

const getProjectsCached = cache(async (): Promise<Project[]> => {
  const payload = await fetchProjectsJson<ProjectsResponse>("/api/projects", [
    "projects"
  ]);

  return payload?.success && Array.isArray(payload.data) ? payload.data : [];
});

const getProjectBySlugCached = cache(
  async (slug: string): Promise<Project | null> => {
    const payload = await fetchProjectsJson<ProjectResponse>(
      `/api/projects/by-slug/${slug}`,
      ["projects", `projects:${slug}`]
    );

    if (payload?.success && payload.data) {
      return payload.data;
    }

    const projects = await getProjectsCached();
    return projects.find((project) => project.slug === slug) ?? null;
  }
);

export async function getProjects(): Promise<Project[]> {
  return getProjectsCached();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getProjectBySlugCached(slug);
}
