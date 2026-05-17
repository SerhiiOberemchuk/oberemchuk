import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const DEFAULT_SITEMAP_PATH = "/sitemap.xml";
const MAX_URLS_PER_REQUEST = 10000;

loadDotEnv(".env.local");
loadDotEnv(".env");

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

const siteUrl = normalizeSiteUrl(process.env.SITE_URL);
const key = process.env.INDEXNOW_TOKEN || process.env.INDEXNOW_KEY;

if (!siteUrl) {
  fail("SITE_URL is required. Example: SITE_URL=https://oberemchuk.online");
}

if (!key) {
  fail("INDEXNOW_TOKEN is required. Put the key from your public key file in .env.local.");
}

const host = new URL(siteUrl).host;
const keyLocation = `${siteUrl}/${key}.txt`;
const sitemapUrl = new URL(process.env.INDEXNOW_SITEMAP_PATH || DEFAULT_SITEMAP_PATH, siteUrl).toString();

const sitemapResponse = await fetch(sitemapUrl);

if (!sitemapResponse.ok) {
  fail(`Could not fetch sitemap: ${sitemapUrl} returned ${sitemapResponse.status}`);
}

const sitemapXml = await sitemapResponse.text();
const urls = extractUrls(sitemapXml);

if (urls.length === 0) {
  fail(`No URLs found in sitemap: ${sitemapUrl}`);
}

console.log(`IndexNow sitemap: ${sitemapUrl}`);
console.log(`IndexNow host: ${host}`);
console.log(`IndexNow key location: ${keyLocation}`);
console.log(`IndexNow URLs found: ${urls.length}`);

if (dryRun) {
  console.log("Dry run enabled. No URLs were submitted.");
  console.log(urls.slice(0, 10).join("\n"));
  if (urls.length > 10) {
    console.log(`...and ${urls.length - 10} more`);
  }
} else {
  for (let index = 0; index < urls.length; index += MAX_URLS_PER_REQUEST) {
    const urlList = urls.slice(index, index + MAX_URLS_PER_REQUEST);
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      fail(`IndexNow submit failed with ${response.status}: ${body}`);
    }

    console.log(`Submitted ${urlList.length} URLs to IndexNow.`);
  }
}

function loadDotEnv(filename) {
  const path = resolve(process.cwd(), filename);

  let content;
  try {
    content = readFileSync(path, "utf8");
  } catch {
    return;
  }

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const name = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (name && process.env[name] === undefined) {
      process.env[name] = value;
    }
  }
}

function normalizeSiteUrl(value) {
  if (!value) {
    return "";
  }

  return value.replace(/\/+$/, "");
}

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => decodeXml(match[1].trim()))
    .filter((url) => url.startsWith("http"));
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
