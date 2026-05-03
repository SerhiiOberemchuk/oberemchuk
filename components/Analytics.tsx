import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import ClarityAnalytics from "./clarity-analytics";

export function AnalyticsLayout() {
  return (
    <>
      {/* <GoogleTagManager gtmId="GTM-PP6VF7MJ" /> */}
      <GoogleAnalytics gaId="G-RYF2JK5TE0" />
      <ClarityAnalytics projectId="wbpbt23vqx" />
      <Analytics />
    </>
  );
}
