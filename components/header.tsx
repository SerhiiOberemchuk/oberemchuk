"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./mobile-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full border-b bg-white/90 backdrop-blur-sm z-40">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium group"
            aria-label="На головну"
          >
            <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
              <Image
                src="/LogoSO.png"
                alt="Serhii Oberemchuk Logo"
                width={140}
                height={48}
                className="object-contain"
              />
            </div>
          </Link>

          <nav aria-label="Основна навігація" className="hidden md:flex gap-6">
            <Link
              href="/#services"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Послуги
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Портфоліо
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Про мене
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Контакти
            </Link>
          </nav>

          <Button asChild className="hidden md:inline-flex bg-green-600">
            <Link href="/#contact">Замовити сайт</Link>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

