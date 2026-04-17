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
      <div className="premium-sheen mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-[rgba(24,31,43,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-4 py-2.5 shadow-[0_20px_70px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-xl md:px-5">
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
              className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--foreground))]/82 transition-colors hover:text-[hsl(var(--primary))]"
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
