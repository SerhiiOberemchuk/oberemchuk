import type {AppLocale} from "@/i18n/locales";
import type {Project} from "@/types/projects";

export type {AppLocale} from "@/i18n/locales";

type ProjectLocalizedField = "title" | "category" | "description" | "features" | "client";

export type LocalizedProject = Omit<
  Project,
  "title" | "category" | "description" | "features" | "client"
> & {
  title: string;
  category: string;
  description: string;
  features: string[];
  client: string;
};

const localizedFieldSuffixByLocale = {
  uk: "",
  en: "EN",
  it: "IT"
} as const satisfies Record<AppLocale, "" | "EN" | "IT">;

function readLocalizedField<T extends ProjectLocalizedField>(
  project: Project,
  field: T,
  locale: AppLocale
): LocalizedProject[T] {
  const suffixOrder =
    locale === "it"
      ? ["IT", "EN", ""] as const
      : [localizedFieldSuffixByLocale[locale], ""] as const;

  for (const suffix of suffixOrder) {
    const key = `${field}${suffix}` as keyof Project;
    const value = project[key];

    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "") &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      return value as LocalizedProject[T];
    }
  }

  return project[field] as LocalizedProject[T];
}

export function localizeProject(
  project: Project,
  locale: AppLocale
): LocalizedProject {
  return {
    ...project,
    title: readLocalizedField(project, "title", locale),
    category: readLocalizedField(project, "category", locale),
    description: readLocalizedField(project, "description", locale),
    features: readLocalizedField(project, "features", locale),
    client: readLocalizedField(project, "client", locale)
  };
}

export function localizeProjects(
  projects: readonly Project[],
  locale: AppLocale
): LocalizedProject[] {
  return projects.map((project) => localizeProject(project, locale));
}
