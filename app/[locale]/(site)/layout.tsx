import type React from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isAppLocale } from "@/i18n/locales";

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

// Rejects junk locale params (e.g. dotted paths like /foo.bar that bypass the
// proxy matcher). Validation lives here rather than in the root [locale]
// layout — and inside a Suspense boundary — because with cacheComponents a
// notFound() thrown outside Suspense fails on-demand static generation and
// surfaces as a 500 instead of rendering the not-found boundary.
async function ValidateLocale({ locale }: { locale: string }) {
  if (!isAppLocale(locale)) {
    notFound();
  }

  return null;
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { locale } = await params;

  return (
    <>
      <Suspense fallback={null}>
        <ValidateLocale locale={locale} />
      </Suspense>
      {children}
    </>
  );
}
