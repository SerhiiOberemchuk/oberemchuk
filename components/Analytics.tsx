import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

export function AnalyticsLayout() {
  return (
    <>
      <GoogleTagManager gtmId="GTM-PP6VF7MJ" />
      <GoogleAnalytics gaId="G-RYF2JK5TE0" />
      <Analytics />
    </>
  );
}
