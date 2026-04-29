import type {Metadata} from "next";
import {routing} from "@/i18n/routing";

export type Locale = "uk" | "en";

function normalizePath(path: string) {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(locale: Locale, path = "") {
  const normalizedPath = normalizePath(path);
  return locale === routing.defaultLocale
    ? normalizedPath || "/"
    : `/${locale}${normalizedPath}`;
}

export function getLanguageAlternates(path = ""): NonNullable<Metadata["alternates"]>["languages"] {
  const normalizedPath = normalizePath(path);
  const defaultPath = getLocalizedPath(routing.defaultLocale, normalizedPath);
  const englishPath = getLocalizedPath("en", normalizedPath);

  return {
    "x-default": defaultPath,
    "uk-UA": defaultPath,
    uk: defaultPath,
    "en-GB": englishPath,
    en: englishPath
  };
}

export function getPageAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: getLocalizedPath(locale, path),
    languages: getLanguageAlternates(path)
  };
}
