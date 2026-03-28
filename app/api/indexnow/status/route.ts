import { NextResponse } from "next/server";
import { getSitemapEntries } from "@/lib/sitemap";
import { getIndexNowKey, getIndexNowKeyLocation, getSiteUrl } from "@/lib/site-config";


type AuthMethod = "bearer" | "header" | "query" | "none";

function getAuthMethod(request: Request): AuthMethod {
  const token = process.env.INDEXNOW_TOKEN;

  if (!token) {
    return "none";
  }

  const authorization = request.headers.get("authorization");
  const headerToken = request.headers.get("x-indexnow-token");
  const searchParams = new URL(request.url).searchParams;
  const queryToken = searchParams.get("token");

  if (authorization === `Bearer ${token}`) {
    return "bearer";
  }

  if (headerToken === token) {
    return "header";
  }

  if (queryToken === token) {
    return "query";
  }

  return "none";
}

function buildUnauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      error: "Unauthorized",
      details: "Provide INDEXNOW_TOKEN via bearer token, x-indexnow-token header or ?token= query.",
      acceptedAuthMethods: [
        "Authorization: Bearer <INDEXNOW_TOKEN>",
        "x-indexnow-token: <INDEXNOW_TOKEN>",
        "?token=<INDEXNOW_TOKEN>",
      ],
      examples: {
        statusCheck: `${getSiteUrl()}/api/indexnow/status?token=YOUR_INDEXNOW_TOKEN`,
      },
    },
    { status: 401 },
  );
}

export async function GET(request: Request) {
  const authMethod = getAuthMethod(request);

  if (authMethod === "none") {
    return buildUnauthorizedResponse();
  }

  try {
    const siteUrl = getSiteUrl();
    const key = getIndexNowKey();
    const keyLocation = getIndexNowKeyLocation();
    const sitemapEntries = await getSitemapEntries();

    return NextResponse.json({
      success: true,
      mode: "diagnostic",
      authMethod,
      env: {
        siteUrl,
        indexNowTokenConfigured: Boolean(process.env.INDEXNOW_TOKEN),
        indexNowKeyConfigured: Boolean(process.env.INDEXNOW_KEY) || Boolean(key),
        keyLength: key.length,
        keyLocation,
      },
      sitemap: {
        generated: true,
        urlCount: sitemapEntries.length,
        preview: sitemapEntries.slice(0, 10).map((entry) => ({
          loc: entry.loc,
          lastmod: entry.lastmod,
          changefreq: entry.changefreq,
          priority: entry.priority,
        })),
        remainingUrlCount: Math.max(sitemapEntries.length - 10, 0),
      },
      checks: {
        siteUrlLooksValid: /^https?:\/\//.test(siteUrl),
        keyLocationLooksValid: keyLocation.startsWith(siteUrl),
        canSubmitToIndexNow: Boolean(process.env.INDEXNOW_TOKEN) && sitemapEntries.length > 0,
      },
      nextSteps: [
        "Open the keyLocation URL in a browser and verify it returns the plain text key.",
        "Run GET /api/indexnow with the same token to submit the sitemap URLs.",
        "If urlCount is 0, review sitemap generation and external project data source.",
      ],
    });
  } catch (error) {
    console.error("IndexNow status check failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "IndexNow status check failed",
      },
      { status: 500 },
    );
  }
}
