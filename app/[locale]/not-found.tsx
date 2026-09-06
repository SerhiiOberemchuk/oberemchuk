import { Suspense } from "react";
import NotFoundPageShell from "@/components/not-found-page-shell";
import { localizePath, resolveAppLocale } from "@/i18n/locales";
import { getLocale, getTranslations } from "next-intl/server";

// Keep on-demand not-found rendering behind Suspense. Locale now comes from
// next/root-params via i18n/request.ts, including the unknown-locale fallback.
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
