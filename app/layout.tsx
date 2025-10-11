import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import GoogleAnalytics from "@/components/google-analytics";
import CookieConsentBanner from "@/components/cookie-consent-banner";
import ScrollToTop from "@/components/scroll-to-top";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Serhii Oberemchuk - Веб-розробник | Створюю сучасні сайти",
    template: "%s | Serhii Oberemchuk - Веб-розробник",
  },
  description:
    "Я Serhii Oberemchuk - професійний веб-розробник з України. Створюю швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати. Розробка лендінгів, корпоративних сайтів, інтернет-магазинів.",
  keywords: [
    "Serhii Oberemchuk",
    "веб-розробник",
    "веб-дизайн",
    "сайти",
    "лендінги",
    "інтернет-магазини",
    "SEO оптимізація",
    "Україна",
    "фрілансер",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "розробка сайтів",
    "створення сайтів",
    "веб-студія",
    "адаптивний дизайн",
    "мобільна версія",
    "швидкі сайти",
    "сучасні технології",
  ],
  authors: [{ name: "Serhii Oberemchuk", url: "https://www.oberemchuk.site" }],
  creator: "Serhii Oberemchuk",
  publisher: "Serhii Oberemchuk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://www.oberemchuk.site"),
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
      uk: "/",
    },
  },
  openGraph: {
    title: "Serhii Oberemchuk - Веб-розробник | Створюю сучасні сайти",
    description:
      "Я Serhii Oberemchuk - професійний веб-розробник з України. Створюю швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати.",
    url: "/",
    siteName: "Serhii Oberemchuk - Веб-розробник",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serhii Oberemchuk - Професійний веб-розробник",
        type: "image/png",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serhii Oberemchuk - Веб-розробник | Створюю сучасні сайти",
    description:
      "Я Serhii Oberemchuk - професійний веб-розробник з України. Створюю швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати.",
    images: ["/og-image.png"],
    creator: "@SerhiiOberemchuk",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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
  classification: "Web Development Services",
  referrer: "origin-when-cross-origin",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={inter.variable}>
      <head>
        {/* <!-- Google Tag Manager --> */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PP6VF7MJ');`,
          }}
        />

        {/* <!-- End Google Tag Manager --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://v0-adminca-bk.vercel.app" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="color-scheme" content="light" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
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
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PP6VF7MJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

        {/* <GoogleAnalytics
          measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
        /> */}
        <div className="flex min-h-screen flex-col pt-16">
          <Header />
          <main className="flex-1" role="main">
            {children}
          </main>
          <Footer />
        </div>
        <CookieConsentBanner />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
