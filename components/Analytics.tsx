"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import ClarityAnalytics from "./clarity-analytics";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function AnalyticsLayout() {
  const { consentState } = useCookieConsent();
  const hasAnalyticsConsent = consentState.settings.analytics;

  return (
    <>
      {/* <GoogleTagManager gtmId="GTM-PP6VF7MJ" /> */}
      {/* GA4 sets cookies, so it must not load before analytics consent. */}
      {hasAnalyticsConsent && <GoogleAnalytics gaId="G-RYF2JK5TE0" />}
      <ClarityAnalytics projectId="wbpbt23vqx" />
      {/* Vercel Analytics is cookieless and keeps no cross-site identifiers,
          so it may run without analytics consent. */}
      <Analytics />
    </>
  );
}
