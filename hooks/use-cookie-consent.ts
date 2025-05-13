"use client"

import { useState, useEffect } from "react"
import type { CookieSettings, CookieConsentState } from "@/types/cookie-consent"

const COOKIE_CONSENT_KEY = "cookie-consent"

const defaultSettings: CookieSettings = {
  necessary: true, // Завжди true
  analytics: false,
  marketing: false,
}

export function useCookieConsent() {
  const [consentState, setConsentState] = useState<CookieConsentState>({
    accepted: false,
    declined: false,
    settings: defaultSettings,
    showSettings: false,
  })

  // Завантаження збережених налаштувань при ініціалізації
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)

    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent)
        setConsentState(parsedConsent)

        // Якщо аналіт��ка дозволена, ініціалізуємо GA
        if (parsedConsent.settings.analytics) {
          enableAnalytics()
        }
      } catch (error) {
        console.error("Помилка при завантаженні налаштувань cookies:", error)
      }
    }
  }, [])

  // Функція для збереження налаштувань
  const saveConsent = (newState: CookieConsentState) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newState))
    setConsentState(newState)
  }

  // Прийняти всі cookies
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
    }

    saveConsent(newState)
    enableAnalytics()
  }

  // Прийняти тільки необхідні cookies
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
    }

    saveConsent(newState)
    disableAnalytics()
  }

  // Відхилити всі cookies (крім необхідних)
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
    }

    saveConsent(newState)
    disableAnalytics()
  }

  // Зберегти користувацькі налаштування
  const saveSettings = (settings: CookieSettings) => {
    const newState = {
      accepted: true,
      declined: false,
      settings: {
        ...settings,
        necessary: true, // Завжди true
      },
      showSettings: false,
    }

    saveConsent(newState)

    if (settings.analytics) {
      enableAnalytics()
    } else {
      disableAnalytics()
    }
  }

  // Показати/сховати налаштування
  const toggleSettings = () => {
    setConsentState((prev) => ({
      ...prev,
      showSettings: !prev.showSettings,
    }))
  }

  // Функції для управління аналітикою
  const enableAnalytics = () => {
    // Дозволяємо Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      // Встановлюємо consent mode для GA4
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }
  }

  const disableAnalytics = () => {
    // Забороняємо Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      // Встановлюємо consent mode для GA4
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      })
    }
  }

  return {
    consentState,
    acceptAll,
    acceptNecessary,
    decline,
    saveSettings,
    toggleSettings,
  }
}
