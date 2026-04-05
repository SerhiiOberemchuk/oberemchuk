import {Link} from "@/i18n/navigation";
import LanguageSwitcher from "./language-switcher";
import {Button} from "@/components/ui/button";
import HeaderMobileControls from "./header-mobile-controls";
import BrandLogo from "./brand-logo";

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
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/90 bg-[rgba(255,255,255,0.8)] px-4 py-2.5 shadow-[0_18px_60px_rgba(24,31,43,0.06)] backdrop-blur-xl md:px-5">
        <Link href="/" className="group flex items-center gap-3 font-medium">
          <BrandLogo
            alt={logoAlt}
            className="transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={navigationAriaLabel}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button asChild className="px-6">
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
    </header>
  );
}
