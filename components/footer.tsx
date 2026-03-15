import {Link} from "@/i18n/navigation";
import Image from "next/image";
import CookieSettingsButton from "./cookie-settings-button";
import {contactEmail, contactEmailHref} from "@/lib/contact-info";

type FooterProps = {
  description: string;
  copyright: string;
  tagline: string;
  logoAlt: string;
  navigationTitle: string;
  legalTitle: string;
  contactTitle: string;
  remoteLabel: string;
  cookieSettingsLabel: string;
  navigationItems: Array<{href: string; label: string}>;
  legalItems: Array<{href: string; label: string}>;
};

export default function Footer({
  description,
  copyright,
  tagline,
  logoAlt,
  navigationTitle,
  legalTitle,
  contactTitle,
  remoteLabel,
  cookieSettingsLabel,
  navigationItems,
  legalItems
}: FooterProps) {
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="w-full border-t bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="relative h-10 w-auto">
                <Image src="/LogoSO.png" alt={logoAlt} width={140} height={48} className="object-contain" />
              </div>
            </Link>
            <p className="max-w-xs text-sm text-gray-600">{description}</p>
          </div>

          <nav className="flex flex-col space-y-4" aria-labelledby="footer-nav-title">
            <h3 id="footer-nav-title" className="font-semibold text-gray-900">{navigationTitle}</h3>
            <ul className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col space-y-4" aria-labelledby="footer-legal-title">
            <h3 id="footer-legal-title" className="font-semibold text-gray-900">{legalTitle}</h3>
            <ul className="flex flex-col space-y-2">
              {legalItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li><CookieSettingsButton label={cookieSettingsLabel} /></li>
            </ul>
          </nav>

          <section className="flex flex-col space-y-4" aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title" className="font-semibold text-gray-900">{contactTitle}</h3>
            <ul className="flex flex-col space-y-2">
              <li><a href={contactEmailHref} className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{contactEmail}</a></li>
              <li><p className="text-sm text-gray-600">{remoteLabel}</p></li>
            </ul>
          </section>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">(c) {currentYear} Oberemchuk Serhii. {copyright}</p>
            <p className="text-xs text-slate-950">{tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

