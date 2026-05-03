"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MobileMenuProps } from "./Mobile-Menu/mobile-menu";

const MobileMenu = dynamic(() => import("./Mobile-Menu/mobile-menu"));
type HeaderMobileControlsProps = Pick<
  MobileMenuProps,
  "closeLabel" | "ctaLabel" | "dialogTitle" | "navigationAriaLabel" | "navItems"
> & {
  menuLabel: string;
};

export default function HeaderMobileControls({
  ctaLabel,
  closeLabel,
  dialogTitle,
  menuLabel,
  navigationAriaLabel,
  navItems,
}: HeaderMobileControlsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setIsMenuOpen((current) => !current)}
        aria-label={menuLabel}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu-dialog"
        aria-haspopup="dialog"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isMenuOpen ? (
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          ctaLabel={ctaLabel}
          closeLabel={closeLabel}
          dialogTitle={dialogTitle}
          navigationAriaLabel={navigationAriaLabel}
          navItems={navItems}
        />
      ) : null}
    </>
  );
}
