"use client";

import dynamic from "next/dynamic";

const CookieConsentBanner = dynamic(
  () => import("@/components/cookie-consent-banner")
);
const MobileStickyCta = dynamic(
  () => import("@/components/mobile-sticky-cta")
);
const ScrollToTop = dynamic(
  () => import("@/components/scroll-to-top")
);
const AnalyticsLayout = dynamic(
  () => import("@/components/Analytics").then((mod) => mod.AnalyticsLayout)
);

type LayoutClientWidgetsProps = {
  ctaLabel: string;
};

export default function LayoutClientWidgets({
  ctaLabel
}: LayoutClientWidgetsProps) {
  return (
    <>
      <CookieConsentBanner />
      <MobileStickyCta label={ctaLabel} />
      <ScrollToTop />
      <AnalyticsLayout />
    </>
  );
}
