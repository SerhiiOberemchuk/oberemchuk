"use client"

import { useState, useEffect, useId, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import type { CookieSettings } from "@/types/cookie-consent"
import { X, Settings, Info } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

export default function CookieConsentBanner() {
  const { consentState, acceptAll, acceptNecessary, decline, saveSettings, toggleSettings } = useCookieConsent()
  const t = useTranslations("CookieBanner")

  const [customSettings, setCustomSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const [isMounted, setIsMounted] = useState(false)
  const settingsTitleId = useId()
  const settingsCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsMounted(true)
    setCustomSettings(consentState.settings)
  }, [consentState.settings])

  useEffect(() => {
    if (consentState.showSettings) {
      window.setTimeout(() => {
        settingsCloseRef.current?.focus()
      }, 0)
    }
  }, [consentState.showSettings])

  const hasConsentDecision = consentState.accepted || consentState.declined

  if (!isMounted || (hasConsentDecision && !consentState.showSettings)) {
    return null
  }

  const handleSettingsChange = (type: keyof CookieSettings) => {
    if (type === "necessary") return

    setCustomSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSaveSettings = () => {
    saveSettings(customSettings)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 shadow-lg">
      <div className="container mx-auto">
        {consentState.showSettings ? (
          <div className="space-y-4" role="dialog" aria-labelledby={settingsTitleId}>
            <div className="flex justify-between items-center">
              <h3 id={settingsTitleId} className="text-lg font-semibold">{t("settings.title")}</h3>
              <Button ref={settingsCloseRef} variant="ghost" size="icon" onClick={toggleSettings} aria-label={t("settings.closeAria") }>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                <Checkbox id="necessary" checked={true} disabled className="mt-1" />
                <div className="space-y-1">
                  <label htmlFor="necessary" className="font-medium">{t("settings.necessary.title")}</label>
                  <p className="text-sm text-gray-500">{t("settings.necessary.description")}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-md">
                <Checkbox
                  id="analytics"
                  checked={customSettings.analytics}
                  onCheckedChange={() => handleSettingsChange("analytics")}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <label htmlFor="analytics" className="font-medium">{t("settings.analytics.title")}</label>
                  <p className="text-sm text-gray-500">{t("settings.analytics.description")}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-md">
                <Checkbox
                  id="marketing"
                  checked={customSettings.marketing}
                  onCheckedChange={() => handleSettingsChange("marketing")}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <label htmlFor="marketing" className="font-medium">{t("settings.marketing.title")}</label>
                  <p className="text-sm text-gray-500">{t("settings.marketing.description")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Link href="/cookies" className="mb-3 text-sm text-[hsl(var(--primary))] hover:underline sm:mb-0">
                {t("detailsLink")}
              </Link>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={decline}>{t("settings.actions.rejectAll")}</Button>
                <Button variant="outline" onClick={acceptNecessary}>{t("settings.actions.acceptNecessary")}</Button>
                <Button onClick={handleSaveSettings}>{t("settings.actions.save")}</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center" role="region" aria-label={t("banner.title")}>
            <div className="flex items-start space-x-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--primary))]" />
              <div>
                <h3 className="font-semibold">{t("banner.title")}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {t("banner.description")} {" "}
                  <Link href="/cookies" className="text-[hsl(var(--foreground))] hover:underline">
                    {t("detailsLink")}
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
              <Button variant="outline" size="sm" onClick={toggleSettings} className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                {t("banner.actions.settings")}
              </Button>
              <Button variant="outline" size="sm" onClick={decline}>{t("banner.actions.reject")}</Button>
              <Button variant="outline" size="sm" onClick={acceptNecessary}>{t("banner.actions.necessaryOnly")}</Button>
              <Button size="sm" onClick={acceptAll}>{t("banner.actions.acceptAll")}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
