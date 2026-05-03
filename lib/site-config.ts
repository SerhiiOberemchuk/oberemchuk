const DEFAULT_SITE_URL = "https://oberemchuk.online";

export function getSiteUrl(): string {
  return (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}
