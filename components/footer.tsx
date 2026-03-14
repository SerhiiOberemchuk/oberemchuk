"use client";

import {Link} from "@/i18n/navigation";
import Image from "next/image";
import CookieSettingsButton from "./cookie-settings-button";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {contactEmail, contactEmailHref} from "@/lib/contact-info";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2024");
  const t = useTranslations("Footer");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="w-full border-t bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="relative h-10 w-auto">
                <Image src="/LogoSO.png" alt={t("logoAlt")} width={140} height={48} className="object-contain" />
              </div>
            </Link>
            <p className="max-w-xs text-sm text-gray-600">{t("description")}</p>
          </div>

          <nav className="flex flex-col space-y-4" aria-labelledby="footer-nav-title">
            <h3 id="footer-nav-title" className="font-semibold text-gray-900">{t("navigation.title")}</h3>
            <ul className="flex flex-col space-y-2">
              <li><Link href="/#services" className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{t("navigation.services")}</Link></li>
              <li><Link href="/portfolio" className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{t("navigation.portfolio")}</Link></li>
              <li><Link href="/#about" className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{t("navigation.about")}</Link></li>
              <li><Link href="/#contact" className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{t("navigation.contact")}</Link></li>
            </ul>
          </nav>

          <nav className="flex flex-col space-y-4" aria-labelledby="footer-legal-title">
            <h3 id="footer-legal-title" className="font-semibold text-gray-900">{t("legal.title")}</h3>
            <ul className="flex flex-col space-y-2">
              <li><Link href="/privacy-policy" className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{t("legal.privacy")}</Link></li>
              <li><Link href="/cookies" className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{t("legal.cookies")}</Link></li>
              <li><Link href="/terms-of-service" className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{t("legal.terms")}</Link></li>
              <li><CookieSettingsButton /></li>
            </ul>
          </nav>

          <section className="flex flex-col space-y-4" aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title" className="font-semibold text-gray-900">{t("contact.title")}</h3>
            <ul className="flex flex-col space-y-2">
              <li><a href={contactEmailHref} className="rounded-sm text-sm text-gray-600 transition-colors hover:text-green-600 focus-visible:text-green-700">{contactEmail}</a></li>
              <li><p className="text-sm text-gray-600">{t("contact.remote")}</p></li>
            </ul>
          </section>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">(c) {currentYear} Oberemchuk Serhii. {t("copyright")}</p>
            <p className="text-xs text-slate-950">{t("tagline")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

