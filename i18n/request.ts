import {getRequestConfig} from "next-intl/server";
import * as rootParams from "next/root-params";
import {loadMessages} from "./load-messages";
import {resolveAppLocale} from "./locales";

export default getRequestConfig(async ({locale: localeOverride}) => {
  // Explicit locales also work in Server Actions and Route Handlers, where
  // next/root-params isn't available yet. Only read root params when needed.
  const requested = localeOverride ?? (await rootParams.locale());
  // Keep the fallback for localized not-found rendering. The (site) layout
  // rejects unknown route locales inside its not-found boundary.
  const locale = resolveAppLocale(requested);

  return {
    locale,
    messages: await loadMessages(locale)
  };
});
