import Image from "next/image";
import {Link} from "@/i18n/navigation";
import LanguageSwitcher from "./language-switcher";
import {Button} from "@/components/ui/button";
import HeaderMobileControls from "./header-mobile-controls";

type HeaderProps = {
  ctaLabel: string;
  logoAlt: string;
  menuLabel: string;
  navigationAriaLabel: string;
  dialogTitle: string;
  closeLabel: string;
  navItems: Array<{href: string; label: string}>;
};

export default function Header({
  ctaLabel,
  logoAlt,
  menuLabel,
  navigationAriaLabel,
  dialogTitle,
  closeLabel,
  navItems
}: HeaderProps) {
  const desktopNavItems = navItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-2 font-medium">
            <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
              <Image
                src="/LogoSO.png"
                alt={logoAlt}
                width={140}
                height={48}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
                loading="eager"
              />
            </div>
          </Link>

          <nav className="hidden gap-6 md:flex" aria-label={navigationAriaLabel}>
            {desktopNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm text-sm font-medium transition-colors hover:text-green-600 focus-visible:text-green-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Button asChild>
              <Link href="/#contact">{ctaLabel}</Link>
            </Button>
          </div>

          <HeaderMobileControls
            ctaLabel={ctaLabel}
            closeLabel={closeLabel}
            dialogTitle={dialogTitle}
            menuLabel={menuLabel}
            navigationAriaLabel={navigationAriaLabel}
            navItems={navItems}
          />
        </div>
      </div>
    </header>
  );
}
