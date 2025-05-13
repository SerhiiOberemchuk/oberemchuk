"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import MobileMenu from "./mobile-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 w-full border-b bg-white/90 backdrop-blur-sm z-40">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
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

          <nav className="hidden md:flex gap-6">
            <a href="/#services" className="text-sm font-medium hover:text-green-600 transition-colors">
              Послуги
            </a>
            <a href="/#portfolio" className="text-sm font-medium hover:text-green-600 transition-colors">
              Портфоліо
            </a>
            <a href="/#about" className="text-sm font-medium hover:text-green-600 transition-colors">
              Про нас
            </a>
            <a href="/#contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Контакти
            </a>
          </nav>

          <Button asChild className="hidden md:inline-flex">
            <a href="/#contact">Замовити сайт</a>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
