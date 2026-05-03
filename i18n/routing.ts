import {defineRouting} from "next-intl/routing";
import {appLocales, defaultLocale} from "./locales";

export const routing = defineRouting({
  locales: appLocales,
  defaultLocale,
  localePrefix: "as-needed"
});
