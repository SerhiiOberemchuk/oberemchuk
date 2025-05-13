"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import type { CookieSettings } from "@/types/cookie-consent"
import { X, Settings, Info } from "lucide-react"
import Link from "next/link"

export default function CookieConsentBanner() {
  const { consentState, acceptAll, acceptNecessary, decline, saveSettings, toggleSettings } = useCookieConsent()

  const [customSettings, setCustomSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const [isMounted, setIsMounted] = useState(false)

  // Ініціалізуємо стан після монтування компонента
  useEffect(() => {
    setIsMounted(true)
    setCustomSettings(consentState.settings)
  }, [consentState.settings])

  // Не показуємо банер, якщо користувач вже зробив вибір або на сервері
  if (!isMounted || consentState.accepted || consentState.declined) {
    return null
  }

  const handleSettingsChange = (type: keyof CookieSettings) => {
    if (type === "necessary") return // Не можна змінити необхідні cookies

    setCustomSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSaveSettings = () => {
    saveSettings(customSettings)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg">
      <div className="container mx-auto">
        {consentState.showSettings ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Налаштування файлів cookie</h3>
              <Button variant="ghost" size="icon" onClick={toggleSettings} aria-label="Закрити налаштування">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                <Checkbox id="necessary" checked={true} disabled className="mt-1" />
                <div className="space-y-1">
                  <label htmlFor="necessary" className="font-medium">
                    Необхідні файли cookie
                  </label>
                  <p className="text-sm text-gray-500">
                    Ці файли cookie необхідні для функціонування сайту і не можуть бути вимкнені.
                  </p>
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
                  <label htmlFor="analytics" className="font-medium">
                    Аналітичні файли cookie
                  </label>
                  <p className="text-sm text-gray-500">
                    Допомагають нам зрозуміти, як відвідувачі взаємодіють з сайтом, збираючи та повідомляючи інформацію
                    анонімно.
                  </p>
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
                  <label htmlFor="marketing" className="font-medium">
                    Маркетингові файли cookie
                  </label>
                  <p className="text-sm text-gray-500">
                    Використовуються для відстеження відвідувачів на веб-сайтах. Мета полягає в тому, щоб показувати
                    релевантну рекламу.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Link href="/cookies" className="text-sm text-green-600 hover:underline mb-3 sm:mb-0">
                Детальніше про cookies
              </Link>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={decline}>
                  Відхилити всі
                </Button>
                <Button variant="outline" onClick={acceptNecessary}>
                  Прийняти необхідні
                </Button>
                <Button onClick={handleSaveSettings}>Зберегти налаштування</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Ми використовуємо файли cookie</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Цей сайт використовує файли cookie для покращення вашого досвіду. Ви можете прийняти всі файли cookie,
                  відхилити їх або налаштувати свої уподобання.{" "}
                  <Link href="/cookies" className="text-green-600 hover:underline">
                    Детальніше
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
              <Button variant="outline" size="sm" onClick={toggleSettings} className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Налаштування
              </Button>
              <Button variant="outline" size="sm" onClick={decline}>
                Відхилити
              </Button>
              <Button variant="outline" size="sm" onClick={acceptNecessary}>
                Тільки необхідні
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Прийняти всі
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
