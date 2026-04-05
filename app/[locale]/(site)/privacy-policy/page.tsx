import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import LegalPageShell from "@/components/legal-page-shell";
import {Link} from "@/i18n/navigation";
import {getPageAlternates} from "@/lib/seo";

type PrivacyPolicyPageProps = {
  params: Promise<{locale: string}>;
};

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
  const isEnglish = locale === "en";

  return (
    <LegalPageShell
      eyebrow={isEnglish ? "Privacy policy" : "Політика конфіденційності"}
      title={t("title")}
      description={t("intro")}
      lastUpdated={t("lastUpdated")}
      footerTitle={isEnglish ? "Need the related policies too?" : "Потрібні й пов’язані політики?"}
      footerDescription={isEnglish ? "From here you can return to the site or open the cookie policy for the technical details layer." : "Звідси можна повернутися на сайт або відкрити політику cookies для технічного шару деталей."}
      primaryCta={t("navigation.home")}
      secondaryCta={t("navigation.cookies")}
      primaryHref="/"
      secondaryHref="/cookies"
    >
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
            <Link href="/cookies" className="text-[hsl(var(--foreground))] underline underline-offset-4">
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


    </LegalPageShell>
  );
}

