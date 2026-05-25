import NotFoundPageShell from "@/components/not-found-page-shell";
import { localizePath, resolveAppLocale } from "@/i18n/locales";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const locale = resolveAppLocale(await getLocale());
  const t = await getTranslations("NotFoundPage");

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
