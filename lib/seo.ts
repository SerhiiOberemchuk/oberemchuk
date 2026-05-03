import type {Metadata} from "next";
import {routing} from "@/i18n/routing";
import {defaultLocale, localeOptions, type AppLocale} from "@/i18n/locales";

export type Locale = AppLocale;

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
  const defaultPath = getLocalizedPath(defaultLocale, normalizedPath);
  const localeAlternates = Object.fromEntries(
    localeOptions.flatMap((locale) => {
      const localizedPath = getLocalizedPath(locale.code, normalizedPath);

      return [
        [locale.code, localizedPath],
        [locale.intlLabel, localizedPath],
      ];
    }),
  ) as NonNullable<Metadata["alternates"]>["languages"];

  return {
    "x-default": defaultPath,
    ...localeAlternates,
  };
}

export function getPageAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: getLocalizedPath(locale, path),
    languages: getLanguageAlternates(path)
  };
}
