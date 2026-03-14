"use client";

import {useEffect, useState} from "react";
import type {
  CookieConsentState,
  CookieSettings
} from "@/types/cookie-consent";

const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_SETTINGS_EVENT = "cookie-settings-toggle";

const defaultSettings: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false
};

export function useCookieConsent() {
  const [consentState, setConsentState] = useState<CookieConsentState>({
    accepted: false,
    declined: false,
    settings: defaultSettings,
    showSettings: false
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent) as CookieConsentState;
        setConsentState(parsedConsent);

        if (parsedConsent.settings.analytics) {
          enableAnalytics();
        }
      } catch (error) {
        console.error("Failed to load cookie settings:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleSettingsToggle = (event: Event) => {
      const customEvent = event as CustomEvent<boolean | undefined>;

      setConsentState((prev) => ({
        ...prev,
        showSettings:
          typeof customEvent.detail === "boolean"
            ? customEvent.detail
            : !prev.showSettings
      }));
    };

    window.addEventListener(
      COOKIE_SETTINGS_EVENT,
      handleSettingsToggle as EventListener
    );

    return () => {
      window.removeEventListener(
        COOKIE_SETTINGS_EVENT,
        handleSettingsToggle as EventListener
      );
    };
  }, []);

  const saveConsent = (newState: CookieConsentState) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newState));
    setConsentState(newState);
  };

  const acceptAll = () => {
    const newState: CookieConsentState = {
      accepted: true,
      declined: false,
      settings: {
        necessary: true,
        analytics: true,
        marketing: true
      },
      showSettings: false
    };

    saveConsent(newState);
    enableAnalytics();
  };

  const acceptNecessary = () => {
    const newState: CookieConsentState = {
      accepted: true,
      declined: false,
      settings: {
        necessary: true,
        analytics: false,
        marketing: false
      },
      showSettings: false
    };

    saveConsent(newState);
    disableAnalytics();
  };

  const decline = () => {
    const newState: CookieConsentState = {
      accepted: false,
      declined: true,
      settings: {
        necessary: true,
        analytics: false,
        marketing: false
      },
      showSettings: false
    };

    saveConsent(newState);
    disableAnalytics();
  };

  const saveSettings = (settings: CookieSettings) => {
    const newState: CookieConsentState = {
      accepted: true,
      declined: false,
      settings: {
        ...settings,
        necessary: true
      },
      showSettings: false
    };

    saveConsent(newState);

    if (settings.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  };

  const toggleSettings = () => {
    window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
  };

  const openSettings = () => {
    window.dispatchEvent(
      new CustomEvent(COOKIE_SETTINGS_EVENT, {detail: true})
    );
  };

  const closeSettings = () => {
    window.dispatchEvent(
      new CustomEvent(COOKIE_SETTINGS_EVENT, {detail: false})
    );
  };

  const enableAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted"
      });
    }
  };

  const disableAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied"
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
    openSettings,
    closeSettings
  };
}
