"use client";

import Link from "next/link";
import Image from "next/image";
import CookieSettingsButton from "./cookie-settings-button";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2024");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="w-full border-t bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <section className="flex flex-col space-y-4" aria-label="Про сайт">
            <Link href="/" className="flex items-center gap-2 font-medium" aria-label="На головну">
              <div className="relative h-10 w-auto">
                <Image
                  src="/LogoSO.png"
                  alt="Serhii Oberemchuk Logo"
                  width={140}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              Професійна розробка вебсайтів, які допомагають вашому бізнесу
              зростати та залучати нових клієнтів.
            </p>
          </section>

          <nav className="flex flex-col space-y-4" aria-label="Навігація сайту">
            <h2 className="font-semibold text-gray-900">Навігація</h2>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Послуги
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Портфоліо
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Про мене
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="flex flex-col space-y-4" aria-label="Правова інформація">
            <h2 className="font-semibold text-gray-900">Правова інформація</h2>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Політика конфіденційності
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Політика cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Умови використання
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>

          <section className="flex flex-col space-y-4" aria-label="Контактна інформація">
            <h2 className="font-semibold text-gray-900">Контакти</h2>
            <address className="not-italic flex flex-col space-y-2">
              <a
                href="mailto:serhiioberemchuk@gmail.com"
                className="text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                serhiioberemchuk@gmail.com
              </a>
              <div className="flex space-x-4 pt-2" aria-label="Соціальні мережі">
                <a
                  href="https://www.linkedin.com/in/serhii-oberemchuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="lucide"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </address>
          </section>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500">
              © <time dateTime={currentYear}>{currentYear}</time> Oberemchuk Serhii. Всі права захищені.
            </p>
            <p className="text-xs text-slate-950">
              Розроблено з <span className="text-green-600">?</span> в Україні
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

