import type React from "react";
import type {Metadata, Viewport} from "next";
import {notFound} from "next/navigation";
import {Inter} from "next/font/google";
import {GoogleTagManager} from "@next/third-parties/google";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";

import "../globals.css";
import {routing} from "@/i18n/routing";
import {getPageAlternates} from "@/lib/seo";
import {Toaster} from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {Analytics} from "@vercel/analytics/next";
import CookieConsentBanner from "@/components/cookie-consent-banner";
import ScrollToTop from "@/components/scroll-to-top";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
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
  const t = await getTranslations({locale, namespace: "Layout.metadata"});

  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate")
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{name: "Serhii Oberemchuk", url: "https://www.oberemchuk.site"}],
    creator: "Serhii Oberemchuk",
    publisher: "Serhii Oberemchuk",
    metadataBase: new URL(process.env.SITE_URL || "https://www.oberemchuk.site"),
    alternates: getPageAlternates(locale as "uk" | "en"),
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
          type: "image/png"
        }
      ],
      locale: locale === "en" ? "en_GB" : "uk_UA",
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
        {url: "/icon.png", sizes: "192x192", type: "image/png"},
        {url: "/favicon.ico", sizes: "any"}
      ],
      shortcut: [{url: "/favicon.ico"}],
      apple: [{url: "/apple-icon.png", sizes: "180x180", type: "image/png"}]
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
    classification: "Web Development Services",
    referrer: "origin-when-cross-origin"
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as "uk" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const layoutT = await getTranslations({locale, namespace: "Layout"});

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-PP6VF7MJ" />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="color-scheme" content="light" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Serhii Oberemchuk" />
        <meta name="application-name" content="Serhii Oberemchuk" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg"
          >
            {layoutT("skipToContent")}
          </a>
          <div className="flex min-h-screen flex-col pt-16">
            <Header />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
          <CookieConsentBanner />
          <ScrollToTop />
          <Toaster />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
