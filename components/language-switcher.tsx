"use client";

import {useEffect, useId, useRef, useState, useTransition} from "react";
import {ChevronDown} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {localeOptions, type AppLocale} from "@/i18n/locales";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const activeLocale =
    localeOptions.find((item) => item.code === locale) ?? localeOptions[0];

  return (
    <div ref={rootRef} className="relative z-[60]">
      <button
        type="button"
        className="group flex min-w-[128px] items-center justify-between gap-3 rounded-full border border-[rgba(24,31,43,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-3 py-2 text-left shadow-[0_12px_36px_rgba(15,23,42,0.08)] transition-all hover:border-[hsl(var(--primary))]/30 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="flex min-w-0 flex-col">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
            {t("label")}
          </span>
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--foreground))]">
            {activeLocale.shortLabel}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={listId}
        role="listbox"
        aria-label={t("label")}
        className={`absolute right-0 top-[calc(100%+0.75rem)] z-[70] min-w-[220px] origin-top-right overflow-hidden rounded-3xl border border-[rgba(24,31,43,0.12)] bg-[rgba(255,255,255,0.98)] p-2 shadow-[0_24px_64px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ${
          isOpen
            ? "visible pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {localeOptions.map((item) => {
          const isActive = item.code === locale;

          return (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={isActive}
              disabled={isPending}
              onClick={() => {
                if (isActive) {
                  setIsOpen(false);
                  return;
                }

                setIsOpen(false);
                startTransition(() => {
                  router.replace(pathname, {locale: item.code});
                });
              }}
              className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition-all ${
                isActive
                  ? "bg-[hsl(var(--foreground))] text-white shadow-[0_14px_28px_rgba(24,31,43,0.18)]"
                  : "text-[hsl(var(--foreground))] hover:bg-[rgba(241,245,249,0.92)]"
              } ${isPending ? "cursor-wait" : ""}`}
            >
              <span className="flex flex-col">
                <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em]">
                  {item.shortLabel}
                </span>
                <span
                  className={`text-sm ${
                    isActive
                      ? "text-white/72"
                      : "text-[hsl(var(--muted-foreground))]"
                  }`}
                >
                  {item.nativeLabel}
                </span>
              </span>
              <span
                className={`rounded-full border px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${
                  isActive
                    ? "border-white/18 bg-white/10 text-white"
                    : "border-[rgba(24,31,43,0.12)] text-[hsl(var(--muted-foreground))]"
                }`}
              >
                {item.code}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
