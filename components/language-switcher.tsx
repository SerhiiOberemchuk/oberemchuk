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
    <div className="flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-[0_8px_24px_rgba(24,31,43,0.06)]" role="group" aria-label={t("label")}>
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
            className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-all ${
              isActive
                ? "bg-[hsl(var(--foreground))] text-white shadow-[0_10px_18px_rgba(24,31,43,0.18)]"
                : "text-[hsl(var(--muted-foreground))] hover:bg-white/80"
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
