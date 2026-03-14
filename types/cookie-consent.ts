export interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  accepted: boolean;
  declined: boolean;
  settings: CookieSettings;
  showSettings: boolean;
}
