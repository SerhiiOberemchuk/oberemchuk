import type {Metadata} from "next";

export type Locale = "uk" | "en";

function normalizePath(path: string) {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(locale: Locale, path = "") {
  const normalizedPath = normalizePath(path);
  return locale === "en" ? `/en${normalizedPath}` : normalizedPath || "/";
}

export function getLanguageAlternates(path = ""): NonNullable<Metadata["alternates"]>["languages"] {
  const normalizedPath = normalizePath(path);

  return {
    "x-default": normalizedPath || "/",
    "uk-UA": normalizedPath || "/",
    uk: normalizedPath || "/",
    "en-GB": `/en${normalizedPath}`,
    en: `/en${normalizedPath}`
  };
}

export function getPageAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: getLocalizedPath(locale, path),
    languages: getLanguageAlternates(path)
  };
}
