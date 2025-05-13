"use client"

import { useCookieConsent } from "@/hooks/use-cookie-consent"

export default function CookieSettingsButton() {
  const { toggleSettings } = useCookieConsent()

  // Повертаємо null замість кнопки, оскільки вона не працює
  return null
}
