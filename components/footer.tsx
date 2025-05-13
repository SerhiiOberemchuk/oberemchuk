"use client"

import Link from "next/link"
import Image from "next/image"
import CookieSettingsButton from "./cookie-settings-button"

// Use useEffect to handle client-side date operations
import { useState, useEffect } from "react"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2024")

  useEffect(() => {
    // Update the year on the client side only
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="w-full border-t bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Основний вміст футера */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Колонка 1: Логотип та інформація */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo-so.png"
                  alt="Serhii Oberemchuk Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span>Oberemchuk Serhii</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              Професійна розробка вебсайтів, які допомагають вашому бізнесу зростати та залучати нових клієнтів.
            </p>
          </div>

          {/* Колонка 2: Навігація */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-gray-900">Навігація</h3>
            <div className="flex flex-col space-y-2">
              <a href="/#services" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Послуги
              </a>
              <a href="/#portfolio" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Портфоліо
              </a>
              <a href="/#about" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Про нас
              </a>
              <a href="/#contact" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Контакти
              </a>
            </div>
          </div>

          {/* Колонка 3: Правова інформація */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-gray-900">Правова інформація</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Політика конфіденційності
              </Link>
              <Link href="/cookies" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Політика cookies
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Умови використання
              </Link>
              <CookieSettingsButton />
            </div>
          </div>

          {/* Колонка 4: Контакти та соціальні мережі */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-gray-900">Контакти</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="mailto:serhiioberemchuk@gmail.com"
                className="text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                serhiioberemchuk@gmail.com
              </a>
              <div className="flex space-x-4 pt-2">
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
            </div>
          </div>
        </div>

        {/* Нижня частина футера з копірайтом */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500">© {currentYear} Oberemchuk Serhii. Всі права захищені.</p>
            <p className="text-xs text-gray-400">
              Розроблено з <span className="text-green-600">❤</span> в Україні
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
