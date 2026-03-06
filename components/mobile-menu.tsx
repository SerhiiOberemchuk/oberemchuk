"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY, 10) * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 bg-black/70 transition-opacity duration-300 md:hidden ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Мобільне меню"
        className={`fixed right-0 top-0 h-full w-full max-w-xs bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col space-y-6">
          <nav aria-label="Мобільна навігація">
            <ul className="flex flex-col space-y-6">
              <li>
                <Link
                  href="/#services"
                  className="block text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
                  onClick={onClose}
                >
                  Послуги
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="block text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
                  onClick={onClose}
                >
                  Портфоліо
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="block text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
                  onClick={onClose}
                >
                  Про мене
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="block text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
                  onClick={onClose}
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>
          <Button asChild size="lg" className="w-full mt-6">
            <Link href="/#contact" onClick={onClose}>
              Замовити сайт
            </Link>
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

