"use client";

import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";

const locales = ["uk", "en"] as const;

type Locale = (typeof locales)[number];

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1" role="group" aria-label={t("label")}>
      {locales.map((item) => {
        const isActive = item === locale;

        return (
          <button
            key={item}
            type="button"
            onClick={() => {
              if (item === locale) return;
              router.replace(pathname, {locale: item});
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              isActive ? "bg-green-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-pressed={isActive}
            aria-label={item === "uk" ? t("uk") : t("en")}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
