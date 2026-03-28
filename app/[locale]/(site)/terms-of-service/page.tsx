import type {Metadata} from "next";
import {connection} from "next/server";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {getPageAlternates} from "@/lib/seo";

type TermsOfServicePageProps = {
  params: Promise<{locale: string}>;
};


export async function generateMetadata({params}: TermsOfServicePageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "TermsOfServicePage.metadata"});
  const pagePath = locale === "en" ? "/en/terms-of-service" : "/terms-of-service";

  return {
    title: t("title"),
    description: t("description"),
    alternates: getPageAlternates(locale as "uk" | "en", "/terms-of-service"),
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

export default async function TermsOfServicePage({params}: TermsOfServicePageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "TermsOfServicePage"});

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
          <h2>{t("sections.intro.title")}</h2>
          <p>{t("sections.intro.description")}</p>

          <h2>{t("sections.definitions.title")}</h2>
          <p>{t("sections.definitions.user")}</p>
          <p>{t("sections.definitions.content")}</p>
          <p>{t("sections.definitions.services")}</p>

          <h2>{t("sections.websiteUse.title")}</h2>
          <p>{t("sections.websiteUse.description")}</p>
          <ul>
            <li>{t("sections.websiteUse.items.0")}</li>
            <li>{t("sections.websiteUse.items.1")}</li>
            <li>{t("sections.websiteUse.items.2")}</li>
            <li>{t("sections.websiteUse.items.3")}</li>
            <li>{t("sections.websiteUse.items.4")}</li>
          </ul>

          <h2>{t("sections.ip.title")}</h2>
          <p>{t("sections.ip.description")}</p>

          <h2>{t("sections.orders.title")}</h2>
          <p>{t("sections.orders.paragraphs.0")}</p>
          <p>{t("sections.orders.paragraphs.1")}</p>

          <h2>{t("sections.pricing.title")}</h2>
          <p>{t("sections.pricing.description")}</p>

          <h2>{t("sections.liability.title")}</h2>
          <p>{t("sections.liability.description")}</p>
          <ul>
            <li>{t("sections.liability.items.0")}</li>
            <li>{t("sections.liability.items.1")}</li>
            <li>{t("sections.liability.items.2")}</li>
            <li>{t("sections.liability.items.3")}</li>
            <li>{t("sections.liability.items.4")}</li>
          </ul>

          <h2>{t("sections.warranty.title")}</h2>
          <p>{t("sections.warranty.description")}</p>

          <h2>{t("sections.privacy.title")}</h2>
          <p>
            {t.rich("sections.privacy.description", {
              privacyLink: (chunks) => (
                <Link href="/privacy-policy" className="text-green-600 hover:underline">
                  {chunks}
                </Link>
              )
            })}
          </p>

          <h2>{t("sections.cookies.title")}</h2>
          <p>
            {t.rich("sections.cookies.description", {
              cookiesLink: (chunks) => (
                <Link href="/cookies" className="text-green-600 hover:underline">
                  {chunks}
                </Link>
              )
            })}
          </p>

          <h2>{t("sections.changes.title")}</h2>
          <p>{t("sections.changes.description")}</p>

          <h2>{t("sections.termination.title")}</h2>
          <p>{t("sections.termination.description")}</p>

          <h2>{t("sections.law.title")}</h2>
          <p>{t("sections.law.description")}</p>

          <h2>{t("sections.contact.title")}</h2>
          <p>{t("sections.contact.description")}</p>
          <ul>
            <li>{t("sections.contact.email")}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row">
          <Link href="/" className="text-green-500 hover:underline">
            {t("navigation.home")}
          </Link>
          <Link href="/privacy-policy" className="text-green-500 hover:underline">
            {t("navigation.privacy")}
          </Link>
          <Link href="/cookies" className="text-green-500 hover:underline">
            {t("navigation.cookies")}
          </Link>
        </div>
      </div>
    </div>
  );
}
