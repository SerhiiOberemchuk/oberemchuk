import { Suspense } from "react";
import NotFoundPageShell from "@/components/not-found-page-shell";
import { localizePath, resolveAppLocale } from "@/i18n/locales";
import { getLocale, getTranslations } from "next-intl/server";

// getLocale()/getTranslations() are dynamic APIs; with cacheComponents they
// must run inside a Suspense boundary or the whole 404 render dies with
// DYNAMIC_SERVER_USAGE (surfacing as a 500 for unknown slugs).
async function LocalizedNotFound() {
  const locale = resolveAppLocale(await getLocale());
  const t = await getTranslations({ locale, namespace: "NotFoundPage" });

  return (
    <NotFoundPageShell
      eyebrow={t("eyebrow")}
      status={t("status")}
      title={t("title")}
      description={t("description")}
      nextStepLabel={t("nextStepLabel")}
      nextStepTitle={t("nextStepTitle")}
      backHome={t("backHome")}
      viewServices={t("viewServices")}
      homeHref={localizePath("/", locale)}
      servicesHref={localizePath("/services", locale)}
    />
  );
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={null}>
      <LocalizedNotFound />
    </Suspense>
  );
}
