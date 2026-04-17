"use client";

import { useEffect, useRef } from "react";
import Clarity from "@microsoft/clarity";

import { useCookieConsent } from "@/hooks/use-cookie-consent";

type ClarityAnalyticsProps = {
  projectId?: string;
};

export default function ClarityAnalytics({
  projectId,
}: ClarityAnalyticsProps) {
  const { consentState } = useCookieConsent();
  const initializedRef = useRef(false);
  const hasAnalyticsConsent = consentState.settings.analytics;

  useEffect(() => {
    if (!projectId || initializedRef.current || !hasAnalyticsConsent) {
      return;
    }

    Clarity.init(projectId);
    initializedRef.current = true;
  }, [hasAnalyticsConsent, projectId]);

  useEffect(() => {
    if (!projectId || !initializedRef.current) {
      return;
    }

    Clarity.consentV2({
      ad_Storage: "denied",
      analytics_Storage: hasAnalyticsConsent ? "granted" : "denied",
    });
  }, [hasAnalyticsConsent, projectId]);

  return null;
}
