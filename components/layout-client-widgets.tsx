"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    // Keep optional analytics code out of initial hydration.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setLoadAnalytics(true), {timeout: 3000});
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setLoadAnalytics(true), 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <CookieConsentBanner />
      <MobileStickyCta label={ctaLabel} />
      <ScrollToTop />
      {loadAnalytics && <AnalyticsLayout />}
    </>
  );
}
