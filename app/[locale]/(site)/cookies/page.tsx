import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import CookieSettingsButton from "@/components/cookie-settings-button";
import {Link} from "@/i18n/navigation";
import {getPageAlternates} from "@/lib/seo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

type CookiesPageProps = {
  params: Promise<{locale: string}>;
};

export const dynamic = "force-static";

export async function generateMetadata({params}: CookiesPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "CookiesPage.metadata"});
  const pagePath = locale === "en" ? "/en/cookies" : "/cookies";

  return {
    title: t("title"),
    description: t("description"),
    alternates: getPageAlternates(locale as "uk" | "en", "/cookies"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: pagePath,
      type: "article",
      images: ["/og-image.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-image.png"]
    }
  };
}

export default async function CookiesPage({params}: CookiesPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "CookiesPage"});
  const cookieTypes = t.raw("types.rows") as Array<{
    name: string;
    purpose: string;
    duration: string;
  }>;
  const browserLinks = t.raw("management.browsers") as Array<{
    name: string;
    href: string;
  }>;

  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
      <div className="space-y-8">
        <div>
          <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-gray-500">{t("lastUpdated")}</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2>{t("whatAreCookies.title")}</h2>
          <p>{t("whatAreCookies.description")}</p>

          <h2>{t("usage.title")}</h2>
          <p>{t("usage.description")}</p>

          <h2>{t("types.title")}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("types.headers.type")}</TableHead>
                <TableHead>{t("types.headers.purpose")}</TableHead>
                <TableHead>{t("types.headers.duration")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cookieTypes.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h2>{t("details.title")}</h2>

          <h3>{t("details.necessary.title")}</h3>
          <ul>
            <li>{t("details.necessary.items.consent")}</li>
            <li>{t("details.necessary.items.session")}</li>
          </ul>

          <h3>{t("details.analytics.title")}</h3>
          <ul>
            <li>{t("details.analytics.items.ga")}</li>
            <li>{t("details.analytics.items.gaId")}</li>
            <li>{t("details.analytics.items.gid")}</li>
            <li>{t("details.analytics.items.gat")}</li>
          </ul>

          <h3>{t("details.marketing.title")}</h3>
          <p>{t("details.marketing.description")}</p>

          <h2>{t("thirdParty.title")}</h2>
          <p>{t("thirdParty.description")}</p>

          <h3>{t("googleAnalytics.title")}</h3>
          <p>{t("googleAnalytics.paragraphs.0")}</p>
          <p>{t("googleAnalytics.paragraphs.1")}</p>
          <p>
            {t.rich("googleAnalytics.paragraphs.2", {
              optOutLink: (chunks) => (
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              )
            })}
          </p>

          <h2>{t("management.title")}</h2>
          <p>{t("management.description")}</p>
          <ul>
            <li>{t("management.siteSettings")}</li>
            <li>
              <strong>{t("management.browserSettingsTitle")}</strong> {t("management.browserSettingsDescription")}
              <ul>
                {browserLinks.map((browser) => (
                  <li key={browser.name}>
                    <a href={browser.href} target="_blank" rel="noopener noreferrer">
                      {browser.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-50 p-6 md:flex-row">
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t("settingsCard.title")}</h3>
              <p className="text-gray-600">{t("settingsCard.description")}</p>
            </div>
            <CookieSettingsButton />
          </div>

          <h2>{t("consequences.title")}</h2>
          <p>{t("consequences.paragraphs.0")}</p>
          <p>{t("consequences.paragraphs.1")}</p>

          <h2>{t("changes.title")}</h2>
          <p>{t("changes.paragraphs.0")}</p>
          <p>{t("changes.paragraphs.1")}</p>

          <h2>{t("contact.title")}</h2>
          <p>{t("contact.description")}</p>
          <ul>
            <li>{t("contact.email")}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row">
          <Link href="/" className="text-green-500 hover:underline">
            {t("navigation.home")}
          </Link>
          <Link href="/privacy-policy" className="text-green-500 hover:underline">
            {t("navigation.privacy")}
          </Link>
        </div>
      </div>
    </div>
  );
}
