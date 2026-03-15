const DEFAULT_SITE_URL = "https://www.oberemchuk.site";
const INDEXNOW_KEY = "a9b0d213a0184ee7bbfd50e428befb0e";

export function getSiteUrl(): string {
  return (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function getIndexNowKey(): string {
  return process.env.INDEXNOW_KEY || INDEXNOW_KEY;
}

export function getIndexNowKeyLocation(): string {
  return `${getSiteUrl()}/${getIndexNowKey()}.txt`;
}
