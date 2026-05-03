import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalPageShell from "@/components/legal-page-shell";
import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/locales";
import { getPageAlternates } from "@/lib/seo";

type TermsOfServicePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TermsOfServicePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsOfServicePage.metadata" });
  const pagePath = locale === "uk" ? "/terms-of-service" : `/${locale}/terms-of-service`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: getPageAlternates(locale as AppLocale, "/terms-of-service"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: pagePath,
      type: "article",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-image.png"],
    },
  };
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsOfServicePage" });

  return (
    <LegalPageShell
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("sections.intro.description")}
      lastUpdated={t("lastUpdated")}
      footerTitle={t("footer.title")}
      footerDescription={t("footer.description")}
      primaryCta={t("navigation.home")}
      secondaryCta={t("navigation.privacy")}
      primaryHref="/"
      secondaryHref="/privacy-policy"
    >
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
            <Link href="/privacy-policy" className="text-[hsl(var(--foreground))] underline underline-offset-4">
              {chunks}
            </Link>
          ),
        })}
      </p>

      <h2>{t("sections.cookies.title")}</h2>
      <p>
        {t.rich("sections.cookies.description", {
          cookiesLink: (chunks) => (
            <Link href="/cookies" className="text-[hsl(var(--foreground))] underline underline-offset-4">
              {chunks}
            </Link>
          ),
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
    </LegalPageShell>
  );
}
