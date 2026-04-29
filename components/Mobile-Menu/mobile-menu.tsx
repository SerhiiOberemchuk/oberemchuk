"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useId, useRef, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import styles from "./mobile-menu.module.css";
import LanguageSwitcher from "../language-switcher";

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
  navItems,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();
    const isInsidePanel =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInsidePanel) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu-dialog"
      aria-labelledby={titleId}
      className={`${styles.dialog} md:hidden`}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <div className="flex flex-col space-y-8 p-6">
          <div className="flex items-center justify-between gap-3">
            <p
              id={titleId}
              className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]"
            >
              {dialogTitle}
            </p>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
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

          <nav
            className="flex flex-col space-y-5"
            aria-label={navigationAriaLabel}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-[rgba(24,31,43,0.12)] pb-3 text-2xl leading-none text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]"
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
    </dialog>
  );
}
