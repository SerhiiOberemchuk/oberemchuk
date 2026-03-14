"use client";

import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {Menu} from "lucide-react";
import MobileMenu from "./mobile-menu";
import LanguageSwitcher from "./language-switcher";
import {Button} from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Header");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-2 font-medium">
            <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
              <Image
                src="/LogoSO.png"
                alt={t("logoAlt")}
                width={140}
                height={48}
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="hidden gap-6 md:flex" aria-label={t("primaryNavigation")}>
            <Link href="/#services" className="rounded-sm text-sm font-medium transition-colors hover:text-green-600 focus-visible:text-green-700">
              {t("navigation.services")}
            </Link>
            <Link href="/portfolio" className="rounded-sm text-sm font-medium transition-colors hover:text-green-600 focus-visible:text-green-700">
              {t("navigation.portfolio")}
            </Link>
            <Link href="/#about" className="rounded-sm text-sm font-medium transition-colors hover:text-green-600 focus-visible:text-green-700">
              {t("navigation.about")}
            </Link>
            <Link href="/#contact" className="rounded-sm text-sm font-medium transition-colors hover:text-green-600 focus-visible:text-green-700">
              {t("navigation.contact")}
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Button asChild>
              <Link href="/#contact">{t("cta")}</Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("menu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-dialog"
            aria-haspopup="dialog"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
