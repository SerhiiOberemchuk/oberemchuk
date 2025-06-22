import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GoogleAnalytics from "@/components/google-analytics";
import CookieConsentBanner from "@/components/cookie-consent-banner";
import ScrollToTop from "@/components/scroll-to-top";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Oberemchuk Serhii - Професійна розробка вебсайтів",
  description:
    "Створюємо швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати",
  keywords:
    "веб-розробка, веб-дизайн, сайти, лендінги, інтернет-магазини, SEO оптимізація, Україна",
  authors: [{ name: "Oberemchuk Serhii" }],
  creator: "Oberemchuk Serhii",
  publisher: "Oberemchuk Serhii",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://www.oberemchuk.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oberemchuk Serhii - Професійна розробка вебсайтів",
    description:
      "Створюємо швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати",
    url: "/",
    siteName: "Oberemchuk Serhii",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oberemchuk Serhii - Професійна розробка вебсайтів",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oberemchuk Serhii - Професійна розробка вебсайтів",
    description:
      "Створюємо швидкі, сучасні та функціональні вебсайти, які допомагають вашому бізнесу зростати",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        {/* Додаємо Google Analytics */}
        <GoogleAnalytics
          measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
        />
        <div className="flex min-h-screen flex-col pt-16">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsentBanner />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
