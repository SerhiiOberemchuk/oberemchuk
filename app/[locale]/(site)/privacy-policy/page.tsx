import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {getPageAlternates} from "@/lib/seo";

type PrivacyPolicyPageProps = {
  params: Promise<{locale: string}>;
};

export const dynamic = "force-static";

export async function generateMetadata({params}: PrivacyPolicyPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "PrivacyPolicyPage.metadata"});
  const pagePath = locale === "en" ? "/en/privacy-policy" : "/privacy-policy";

  return {
    title: t("title"),
    description: t("description"),
    alternates: getPageAlternates(locale as "uk" | "en", "/privacy-policy"),
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

export default async function PrivacyPolicyPage({params}: PrivacyPolicyPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "PrivacyPolicyPage"});

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
          <p>{t("intro")}</p>

          <h2>{t("collection.title")}</h2>
          <p>{t("collection.description")}</p>
          <ul>
            <li>{t("collection.items.personal")}</li>
            <li>{t("collection.items.usage")}</li>
            <li>{t("collection.items.device")}</li>
          </ul>

          <h2>{t("cookies.title")}</h2>
          <p>{t("cookies.description")}</p>
          <p>
            {t.rich("cookies.moreInfo", {
              cookiesLink: (chunks) => (
                <Link href="/cookies" className="text-green-600 hover:underline">
                  {chunks}
                </Link>
              )
            })}
          </p>

          <h2>{t("usage.title")}</h2>
          <p>{t("usage.description")}</p>
          <ul>
            <li>{t("usage.items.provide")}</li>
            <li>{t("usage.items.respond")}</li>
            <li>{t("usage.items.analyze")}</li>
            <li>{t("usage.items.protect")}</li>
          </ul>

          <h2>{t("disclosure.title")}</h2>
          <p>{t("disclosure.description")}</p>
          <ul>
            <li>{t("disclosure.items.providers")}</li>
            <li>{t("disclosure.items.legal")}</li>
            <li>{t("disclosure.items.transfer")}</li>
          </ul>

          <h2>{t("rights.title")}</h2>
          <p>{t("rights.description")}</p>
          <ul>
            <li>{t("rights.items.access")}</li>
            <li>{t("rights.items.correction")}</li>
            <li>{t("rights.items.deletion")}</li>
            <li>{t("rights.items.restriction")}</li>
            <li>{t("rights.items.portability")}</li>
            <li>{t("rights.items.objection")}</li>
          </ul>

          <h2>{t("changes.title")}</h2>
          <p>{t("changes.description")}</p>

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
          <Link href="/cookies" className="text-green-500 hover:underline">
            {t("navigation.cookies")}
          </Link>
        </div>
      </div>
    </div>
  );
}
