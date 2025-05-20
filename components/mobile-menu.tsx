"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
    } else {
      document.body.style.overflow = "";
    }

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
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1);
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
    >
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-xs bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col space-y-6">
          <nav className="flex flex-col space-y-6">
            <a
              href="/#services"
              className="text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
              onClick={onClose}
            >
              Послуги
            </a>
            <a
              href="/#portfolio"
              className="text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
              onClick={onClose}
            >
              Портфоліо
            </a>
            <a
              href="/#about"
              className="text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
              onClick={onClose}
            >
              Про нас
            </a>
            <a
              href="/#contact"
              className="text-xl font-medium hover:text-green-600 transition-colors py-2 border-b border-gray-100"
              onClick={onClose}
            >
              Контакти
            </a>
          </nav>
          <Button asChild size="lg" className="w-full mt-6">
            <a href="/#contact" onClick={onClose}>
              Замовити сайт
            </a>
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
