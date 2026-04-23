import { Link } from "@/i18n/navigation";
import CookieSettingsButton from "./cookie-settings-button";
import { contactEmail, contactEmailHref } from "@/lib/contact-info";
import BrandLogo from "./brand-logo";
import { Suspense } from "react";

type FooterProps = {
  description: string;
  copyright: string;
  tagline: string;
  logoAlt: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  navigationTitle: string;
  legalTitle: string;
  contactTitle: string;
  remoteLabel: string;
  cookieSettingsLabel: string;
  navigationItems: Array<{ href: string; label: string }>;
  legalItems: Array<{ href: string; label: string }>;
};

export default async function Footer({
  description,
  copyright,
  tagline,
  logoAlt,
  ctaTitle,
  ctaDescription,
  ctaLabel,
  navigationTitle,
  legalTitle,
  contactTitle,
  remoteLabel,
  cookieSettingsLabel,
  navigationItems,
  legalItems,
}: FooterProps) {
  return (
    <footer className="px-4 pb-6 pt-12 md:px-6 md:pb-8">
      <div className="mx-auto max-w-7xl rounded-[38px] border border-[rgba(24,31,43,0.08)] bg-[rgba(24,31,43,0.97)] p-8 text-white shadow-[0_24px_80px_rgba(24,31,43,0.18)] md:p-10">
        <div className="mb-10 grid gap-6 rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm md:grid-cols-[1.1fr_0.9fr] md:items-end md:p-8">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/50">
              {ctaTitle}
            </p>
            <p className="mt-4 max-w-2xl text-2xl leading-[1.06] text-white md:text-4xl">
              {ctaDescription}
            </p>
          </div>
          <div className="md:flex md:justify-end">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--foreground))] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2">
              <BrandLogo alt={logoAlt} theme="dark" />
            </Link>
            <p className="mt-5 text-sm leading-7 text-white/68">
              {description}
            </p>
          </div>

          <nav
            className="flex flex-col space-y-4"
            aria-labelledby="footer-nav-title"
          >
            <h3
              id="footer-nav-title"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50"
            >
              {navigationTitle}
            </h3>
            <ul className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/78 transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="flex flex-col space-y-4"
            aria-labelledby="footer-legal-title"
          >
            <h3
              id="footer-legal-title"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50"
            >
              {legalTitle}
            </h3>
            <ul className="flex flex-col space-y-3">
              {legalItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/78 transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton label={cookieSettingsLabel} />
              </li>
            </ul>
          </nav>

          <section
            className="flex flex-col space-y-4"
            aria-labelledby="footer-contact-title"
          >
            <h3
              id="footer-contact-title"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50"
            >
              {contactTitle}
            </h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <a
                  href={contactEmailHref}
                  className="text-sm text-white/78 transition-colors hover:text-[hsl(var(--primary))]"
                >
                  {contactEmail}
                </a>
              </li>
              <li>
                <p className="text-sm text-white/62">{remoteLabel}</p>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <Suspense
            fallback={
              <p className="text-sm text-white/52">
                (c) ... Oberemchuk Serhii. {copyright}
              </p>
            }
          >
            <p className="text-sm text-white/52">
              (c) {await currentYear()} Oberemchuk Serhii. {copyright}
            </p>
          </Suspense>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
            {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

async function currentYear() {
  "use cache";
  const now = new Date();
  return now.getFullYear().toString();
}
