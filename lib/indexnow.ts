import { getIndexNowKey, getIndexNowKeyLocation, getSiteUrl } from "@/lib/site-config";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10000;

type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export async function submitToIndexNow(urls: string[]) {
  const normalizedUrls = [...new Set(urls.map((url) => url.trim()).filter(Boolean))];

  if (normalizedUrls.length === 0) {
    return {
      ok: false,
      status: 400,
      submitted: 0,
      message: "No URLs to submit.",
    };
  }

  if (normalizedUrls.length > MAX_URLS_PER_REQUEST) {
    return {
      ok: false,
      status: 400,
      submitted: 0,
      message: `IndexNow accepts up to ${MAX_URLS_PER_REQUEST} URLs per request.`,
    };
  }

  const payload: IndexNowPayload = {
    host: new URL(getSiteUrl()).host,
    key: getIndexNowKey(),
    keyLocation: getIndexNowKeyLocation(),
    urlList: normalizedUrls,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    submitted: normalizedUrls.length,
    message: body || response.statusText,
  };
}
