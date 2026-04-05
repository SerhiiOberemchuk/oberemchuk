"use client";

import {Link} from "@/i18n/navigation";
import {createPortal} from "react-dom";
import {useEffect, useId, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import LanguageSwitcher from "./language-switcher";
import {X} from "lucide-react";

type MobileMenuItem = {
  href: string;
  label: string;
};

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  ctaLabel: string;
  dialogTitle: string;
  navigationAriaLabel: string;
  navItems: MobileMenuItem[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  closeLabel,
  ctaLabel,
  dialogTitle,
  navigationAriaLabel,
  navItems
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
      window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1);
      }
      lastFocusedElementRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 bg-[rgba(24,31,43,0.58)] transition-opacity duration-300 md:hidden ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        id="mobile-menu-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`fixed right-0 top-0 h-full w-full max-w-sm border-l border-white/30 bg-[linear-gradient(180deg,rgba(255,251,246,0.96),rgba(244,236,226,0.92))] shadow-[0_24px_80px_rgba(24,31,43,0.24)] backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-8 p-6">
          <div className="flex items-center justify-between gap-3">
            <p id={titleId} className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">{dialogTitle}</p>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                ref={closeButtonRef}
                type="button"
                variant="outline"
                size="icon"
                onClick={onClose}
                aria-label={closeLabel}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <nav className="flex flex-col space-y-5" aria-label={navigationAriaLabel}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-[rgba(24,31,43,0.08)] pb-3 text-2xl leading-none text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild size="lg" className="mt-6 w-full">
            <Link href="/#contact" onClick={onClose}>
              {ctaLabel}
            </Link>
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
