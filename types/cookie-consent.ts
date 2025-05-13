export interface CookieSettings {
  necessary: boolean // Завжди true, не можна вимкнути
  analytics: boolean
  marketing: boolean
}

export interface CookieConsentState {
  accepted: boolean
  declined: boolean
  settings: CookieSettings
  showSettings: boolean
}
