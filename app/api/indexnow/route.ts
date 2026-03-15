import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { getSitemapEntries } from "@/lib/sitemap";
import { getIndexNowKeyLocation, getSiteUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type IndexNowRequestBody = {
  urls?: string[];
  sitemap?: boolean;
};

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

async function resolveUrls(body?: IndexNowRequestBody) {
  const sitemapUrls = body?.sitemap !== false;

  if (Array.isArray(body?.urls) && body.urls.length > 0) {
    return body.urls;
  }

  if (sitemapUrls) {
    return (await getSitemapEntries()).map((entry) => entry.loc);
  }

  return [];
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
        getAllFromSitemap: `${getSiteUrl()}/api/indexnow?token=YOUR_INDEXNOW_TOKEN`,
        postSelectedUrls: {
          url: `${getSiteUrl()}/api/indexnow`,
          method: "POST",
          headers: {
            Authorization: "Bearer YOUR_INDEXNOW_TOKEN",
            "Content-Type": "application/json",
          },
          body: {
            urls: [
              `${getSiteUrl()}/`,
              `${getSiteUrl()}/portfolio`,
            ],
            sitemap: false,
          },
        },
      },
    },
    { status: 401 },
  );
}

function buildSuccessResponse(params: {
  authMethod: AuthMethod;
  requestMode: "sitemap" | "selected_urls";
  requestedUrlCount: number;
  requestedUrls: string[];
  result: Awaited<ReturnType<typeof submitToIndexNow>>;
}) {
  const { authMethod, requestMode, requestedUrlCount, requestedUrls, result } = params;

  return NextResponse.json(
    {
      success: result.ok,
      message: result.message,
      status: result.status,
      request: {
        mode: requestMode,
        authMethod,
        requestedUrlCount,
        requestedUrlsPreview: requestedUrls.slice(0, 10),
        remainingUrlCount: Math.max(requestedUrls.length - 10, 0),
      },
      indexNow: {
        endpoint: "https://api.indexnow.org/indexnow",
        keyLocation: getIndexNowKeyLocation(),
        siteUrl: getSiteUrl(),
        submitted: result.submitted,
      },
      nextSteps: result.ok
        ? [
            "Bing accepted the submission request.",
            "This does not guarantee immediate indexing, only successful notification.",
            "Verify that the key file is publicly accessible at the keyLocation URL.",
          ]
        : [
            "Check the message field for the upstream IndexNow response.",
            "Verify SITE_URL and keyLocation match the production domain.",
            "Verify the key file is publicly accessible.",
          ],
    },
    { status: result.ok ? 200 : result.status || 500 },
  );
}

export async function POST(request: Request) {
  const authMethod = getAuthMethod(request);

  if (authMethod === "none") {
    return buildUnauthorizedResponse();
  }

  try {
    const body = (await request.json().catch(() => ({}))) as IndexNowRequestBody;
    const urls = await resolveUrls(body);
    const requestMode =
      Array.isArray(body.urls) && body.urls.length > 0 ? "selected_urls" : "sitemap";
    const result = await submitToIndexNow(urls);

    return buildSuccessResponse({
      authMethod,
      requestMode,
      requestedUrlCount: urls.length,
      requestedUrls: urls,
      result,
    });
  } catch (error) {
    console.error("IndexNow submission failed:", error);

    return NextResponse.json(
      {
        error: "IndexNow submission failed",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const authMethod = getAuthMethod(request);

  if (authMethod === "none") {
    return buildUnauthorizedResponse();
  }

  try {
    const urls = await resolveUrls();
    const result = await submitToIndexNow(urls);

    return buildSuccessResponse({
      authMethod,
      requestMode: "sitemap",
      requestedUrlCount: urls.length,
      requestedUrls: urls,
      result,
    });
  } catch (error) {
    console.error("IndexNow submission failed:", error);

    return NextResponse.json(
      {
        error: "IndexNow submission failed",
      },
      { status: 500 },
    );
  }
}
