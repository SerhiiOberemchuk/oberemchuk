import type {Metadata} from "next";
import {Cormorant_Garamond, Manrope} from "next/font/google";
import NotFoundPageShell from "@/components/not-found-page-shell";
import "./globals.css";

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

const fallbackCopy = {
  eyebrow: "Page not found",
  status: "404",
  title: "This page does not exist",
  description:
    "The address may be outdated, the page may have moved or the link may be incorrect.",
  nextStepLabel: "Next step",
  nextStepTitle: "Return to the main routes and continue from there.",
  backHome: "Back to home",
  viewServices: "View services",
} as const;

export const metadata: Metadata = {
  title: "404 | Page not found",
  description: fallbackCopy.description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={manrope.className}>
        <NotFoundPageShell
          eyebrow={fallbackCopy.eyebrow}
          status={fallbackCopy.status}
          title={fallbackCopy.title}
          description={fallbackCopy.description}
          nextStepLabel={fallbackCopy.nextStepLabel}
          nextStepTitle={fallbackCopy.nextStepTitle}
          backHome={fallbackCopy.backHome}
          viewServices={fallbackCopy.viewServices}
        />
      </body>
    </html>
  );
}
