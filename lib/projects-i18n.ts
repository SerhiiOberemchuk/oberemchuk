import type {Project} from "@/types/projects";

export type AppLocale = "uk" | "en";

export type LocalizedProject = Omit<Project, "title" | "category" | "description" | "features" | "client"> & {
  title: string;
  category: string;
  description: string;
  features: string[];
  client: string;
};

export function localizeProject(project: Project, locale: AppLocale): LocalizedProject {
  if (locale === "en") {
    return {
      ...project,
      title: project.titleEN || project.title,
      category: project.categoryEN || project.category,
      description: project.descriptionEN || project.description,
      features: project.featuresEN || project.features,
      client: project.clientEN || project.client
    };
  }

  return {
    ...project,
    title: project.title,
    category: project.category,
    description: project.description,
    features: project.features,
    client: project.client
  };
}

export function localizeProjects(projects: Project[], locale: AppLocale): LocalizedProject[] {
  return projects.map((project) => localizeProject(project, locale));
}
