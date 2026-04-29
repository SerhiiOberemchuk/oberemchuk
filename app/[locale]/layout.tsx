import type React from "react";
import {Suspense} from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import "../globals.css";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CookieConsentBanner from "@/components/cookie-consent-banner";
import MobileStickyCta from "@/components/mobile-sticky-cta";
import ScrollToTop from "@/components/scroll-to-top";
import { AnalyticsLayout } from "@/components/Analytics";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7fafc",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Layout.metadata" });

  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [
      { name: "Serhii Oberemchuk", url: "https://oberemchuk.online" },
    ],
    creator: "Serhii Oberemchuk",
    publisher: "Serhii Oberemchuk",
    metadataBase: new URL(
      process.env.SITE_URL || "https://oberemchuk.online",
    ),
    openGraph: {
      title: t("openGraphTitle"),
      description: t("openGraphDescription"),
      url: locale === "en" ? "/en" : "/",
      siteName: "Serhii Oberemchuk",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("openGraphImageAlt"),
          type: "image/png",
        },
      ],
      locale: locale === "en" ? "en_GB" : "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/og-image.png"],
      creator: "@SerhiiOberemchuk",
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
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
        "max-snippet": -1,
      },
    },
    category: "technology",
    classification: "Digital Product and Web Development Services",
    referrer: "origin-when-cross-origin",
  };
}

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default function LocaleLayout({children, params}: LayoutProps) {
  return (
    <Suspense fallback={null}>
      <LocaleDocument params={params}>{children}</LocaleDocument>
    </Suspense>
  );
}

async function LocaleDocument({children, params}: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "uk" | "en")) {
    notFound();
  }

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
        <LocaleLayoutContent locale={locale}>{children}</LocaleLayoutContent>
      </body>
    </html>
  );
}

async function LocaleLayoutContent({children, locale}: {children: React.ReactNode; locale: string}) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const layoutT = await getTranslations({ locale, namespace: "Layout" });
  const headerT = await getTranslations({ locale, namespace: "Header" });
  const footerT = await getTranslations({ locale, namespace: "Footer" });
  const headerNavItems = [
    { href: "/#services", label: headerT("navigation.services") },
    { href: "/portfolio", label: headerT("navigation.portfolio") },
    { href: "/#about", label: headerT("navigation.about") },
    { href: "/#contact", label: headerT("navigation.contact") },
  ];
  const footerNavigationItems = [
    ...headerNavItems,
    { href: "/solutions", label: locale === "en" ? "SEO pages" : "SEO-сторінки" },
    { href: "/blog", label: locale === "en" ? "Blog" : "Блог" },
  ];
  const footerLegalItems = [
    { href: "/privacy-policy", label: footerT("legal.privacy") },
    { href: "/cookies", label: footerT("legal.cookies") },
    { href: "/terms-of-service", label: footerT("legal.terms") },
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
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
      <CookieConsentBanner />
      <MobileStickyCta label={headerT("cta")} />
      <ScrollToTop />
      <Toaster />
      <AnalyticsLayout />
    </NextIntlClientProvider>
  );
}
