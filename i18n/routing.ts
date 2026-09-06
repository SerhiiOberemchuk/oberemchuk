import {defineRouting} from "next-intl/routing";
import {appLocales, defaultLocale} from "./locales";

export const routing = defineRouting({
  locales: appLocales,
  defaultLocale,
  localeDetection: false,
  // HTML metadata and sitemap share the English x-default fallback.
  // Suppress middleware Link headers, which otherwise point x-default to /.
  alternateLinks: false,
  localePrefix: "as-needed"
});
