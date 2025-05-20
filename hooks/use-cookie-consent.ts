"use client";

import { useState, useEffect } from "react";
import type {
  CookieSettings,
  CookieConsentState,
} from "@/types/cookie-consent";

const COOKIE_CONSENT_KEY = "cookie-consent";

const defaultSettings: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function useCookieConsent() {
  const [consentState, setConsentState] = useState<CookieConsentState>({
    accepted: false,
    declined: false,
    settings: defaultSettings,
    showSettings: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsentState(parsedConsent);

        if (parsedConsent.settings.analytics) {
          enableAnalytics();
        }
      } catch (error) {
        console.error("Помилка при завантаженні налаштувань cookies:", error);
      }
    }
  }, []);

  const saveConsent = (newState: CookieConsentState) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newState));
    setConsentState(newState);
  };

  const acceptAll = () => {
    const newState = {
      accepted: true,
      declined: false,
      settings: {
        necessary: true,
        analytics: true,
        marketing: true,
      },
      showSettings: false,
    };

    saveConsent(newState);
    enableAnalytics();
  };

  const acceptNecessary = () => {
    const newState = {
      accepted: true,
      declined: false,
      settings: {
        necessary: true,
        analytics: false,
        marketing: false,
      },
      showSettings: false,
    };

    saveConsent(newState);
    disableAnalytics();
  };

  const decline = () => {
    const newState = {
      accepted: false,
      declined: true,
      settings: {
        necessary: true,
        analytics: false,
        marketing: false,
      },
      showSettings: false,
    };

    saveConsent(newState);
    disableAnalytics();
  };

  const saveSettings = (settings: CookieSettings) => {
    const newState = {
      accepted: true,
      declined: false,
      settings: {
        ...settings,
        necessary: true,
      },
      showSettings: false,
    };

    saveConsent(newState);

    if (settings.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  };

  const toggleSettings = () => {
    setConsentState((prev) => ({
      ...prev,
      showSettings: !prev.showSettings,
    }));
  };

  const enableAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const disableAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  return {
    consentState,
    acceptAll,
    acceptNecessary,
    decline,
    saveSettings,
    toggleSettings,
  };
}
