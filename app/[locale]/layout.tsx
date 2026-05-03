import type React from "react";
import type {Metadata, Viewport} from "next";
import {notFound} from "next/navigation";
import {Cormorant_Garamond, Manrope} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";

import "../globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LayoutClientWidgets from "@/components/layout-client-widgets";
import {clientMessageNamespaces, loadMessages} from "@/i18n/load-messages";
import {
  defaultLocale,
  isAppLocale,
  localeOptions,
  type AppLocale
} from "@/i18n/locales";
import {routing} from "@/i18n/routing";
import {getSiteUrl} from "@/lib/site-config";
import {Toaster} from "sonner";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7fafc"
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;
  const t = await getTranslations({
    locale: currentLocale,
    namespace: "Layout.metadata"
  });
  const localeMeta =
    localeOptions.find((item) => item.code === currentLocale) ?? localeOptions[0];
  const localeRoot = currentLocale === defaultLocale ? "/" : `/${currentLocale}`;

  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate")
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{name: "Serhii Oberemchuk", url: "https://oberemchuk.online"}],
    creator: "Serhii Oberemchuk",
    publisher: "Serhii Oberemchuk",
    metadataBase: new URL(getSiteUrl()),
    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      url: localeRoot,
      siteName: "Serhii Oberemchuk",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("openGraphImageAlt"),
          type: "image/png"
        }
      ],
      locale: localeMeta.ogLocale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/og-image.png"],
      creator: "@SerhiiOberemchuk"
    },
    icons: {
      icon: [
        {url: "/icon.svg", type: "image/svg+xml"},
        {url: "/favicon.svg", type: "image/svg+xml"}
      ],
      shortcut: [{url: "/favicon.svg", type: "image/svg+xml"}],
      apple: [{url: "/apple-icon.svg", type: "image/svg+xml"}]
    },
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    category: "technology",
    classification: "Digital Product and Web Development Services",
    referrer: "origin-when-cross-origin"
  };
}

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>;

export default async function LocaleLayout({children, params}: LayoutProps) {
  const {locale} = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [clientMessages, layoutT, headerT, footerT] = await Promise.all([
    loadMessages(locale, clientMessageNamespaces),
    getTranslations({locale, namespace: "Layout"}),
    getTranslations({locale, namespace: "Header"}),
    getTranslations({locale, namespace: "Footer"})
  ]);

  const headerNavItems = [
    {href: "/#services", label: headerT("navigation.services")},
    {href: "/portfolio", label: headerT("navigation.portfolio")},
    {href: "/#about", label: headerT("navigation.about")},
    {href: "/#contact", label: headerT("navigation.contact")}
  ];
  const footerNavigationItems = [
    ...headerNavItems,
    {href: "/solutions", label: footerT("navigation.solutions")},
    {href: "/blog", label: footerT("navigation.blog")}
  ];
  const footerLegalItems = [
    {href: "/privacy-policy", label: footerT("legal.privacy")},
    {href: "/cookies", label: footerT("legal.cookies")},
    {href: "/terms-of-service", label: footerT("legal.terms")}
  ];

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#f7fafc" />
        <meta name="color-scheme" content="light" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Serhii Oberemchuk" />
        <meta name="application-name" content="Serhii Oberemchuk" />
        <meta name="msapplication-TileColor" content="#f7fafc" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={manrope.className}>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg"
          >
            {layoutT("skipToContent")}
          </a>
          <div className="flex min-h-screen flex-col pb-24 pt-16 md:pb-0">
            <Header
              ctaLabel={headerT("cta")}
              logoAlt={headerT("logoAlt")}
              menuLabel={headerT("menu")}
              navigationAriaLabel={headerT("primaryNavigation")}
              dialogTitle={headerT("mobileMenu")}
              closeLabel={headerT("closeMenu")}
              navItems={headerNavItems}
            />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer
              description={footerT("description")}
              copyright={footerT("copyright")}
              tagline={footerT("tagline")}
              logoAlt={footerT("logoAlt")}
              ctaTitle={footerT("cta.title")}
              ctaDescription={footerT("cta.description")}
              ctaLabel={footerT("cta.label")}
              navigationTitle={footerT("navigation.title")}
              legalTitle={footerT("legal.title")}
              contactTitle={footerT("contact.title")}
              remoteLabel={footerT("contact.remote")}
              cookieSettingsLabel={footerT("legal.cookieSettings")}
              navigationItems={footerNavigationItems}
              legalItems={footerLegalItems}
            />
          </div>
          <LayoutClientWidgets ctaLabel={headerT("cta")} />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
