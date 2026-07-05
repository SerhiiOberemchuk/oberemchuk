import type {Metadata} from "next";
import {
  localeOptions,
  localizePath,
  xDefaultLocale,
  type AppLocale,
} from "@/i18n/locales";

export type Locale = AppLocale;

function normalizePath(path: string) {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(locale: Locale, path = "") {
  const normalizedPath = normalizePath(path);
  return localizePath(normalizedPath || "/", locale);
}

export function getLanguageAlternates(path = ""): NonNullable<Metadata["alternates"]>["languages"] {
  const normalizedPath = normalizePath(path);
  const xDefaultPath = getLocalizedPath(xDefaultLocale, normalizedPath);
  // Emit one hreflang per locale using the plain language code (uk/en/it),
  // matching the sitemap alternates. Duplicating with region codes (uk-UA …)
  // only adds redundant tags Google has to reconcile.
  const localeAlternates = Object.fromEntries(
    localeOptions.map((locale) => [
      locale.code,
      getLocalizedPath(locale.code, normalizedPath),
    ]),
  ) as NonNullable<Metadata["alternates"]>["languages"];

  return {
    "x-default": xDefaultPath,
    ...localeAlternates,
  };
}

export function getPageAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: getLocalizedPath(locale, path),
    languages: getLanguageAlternates(path)
  };
}
