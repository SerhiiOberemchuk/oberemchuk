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

  useEffect(() => {
    if (!projectId || initializedRef.current) {
      return;
    }

    Clarity.init(projectId);
    initializedRef.current = true;
  }, [projectId]);

  useEffect(() => {
    if (!projectId || !initializedRef.current) {
      return;
    }

    Clarity.consentV2({
      ad_Storage: "denied",
      analytics_Storage: consentState.settings.analytics ? "granted" : "denied",
    });
  }, [consentState.settings.analytics, projectId]);

  return null;
}
