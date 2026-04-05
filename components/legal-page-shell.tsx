import type {ReactNode} from "react";
import {ArrowLeft} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
  footerTitle: string;
  footerDescription: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref: string;
  secondaryHref: string;
};

export default function LegalPageShell({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
  footerTitle,
  footerDescription,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref
}: LegalPageShellProps) {
  return (
    <div className="px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] text-white shadow-[0_40px_120px_rgba(24,31,43,0.22)]">
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(10,14,24,0.98)_8%,rgba(10,14,24,0.88)_52%,rgba(16,23,36,0.76)_100%)]" />
          <div className="absolute -left-12 top-10 h-72 w-72 rounded-full bg-[rgba(230,90,48,0.18)] blur-3xl" />
          <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-[rgba(108,132,173,0.15)] blur-3xl" />

          <div className="relative z-10 grid gap-10 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:px-14 lg:py-14">
            <div>
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">
                {eyebrow}
              </p>
              <div className="max-w-xl">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                  {lastUpdated}
                </p>
                <h1 className="mt-4 max-w-[12ch] text-5xl leading-[0.92] text-white md:text-7xl">
                  {title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                Reference
              </p>
              <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                Clear policy language, stable structure and a direct path back to the main site.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[rgba(24,31,43,0.08)] bg-white p-8 shadow-[0_24px_80px_rgba(24,31,43,0.06)] md:p-10">
          <div className="legal-prose max-w-none">{children}</div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] px-8 py-10 text-white shadow-[0_34px_100px_rgba(24,31,43,0.2)] md:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
            <div>
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/44">
                Navigation
              </p>
              <h2 className="max-w-3xl text-4xl leading-[0.96] md:text-5xl">
                {footerTitle}
              </h2>
            </div>
            <div>
              <p className="text-base leading-8 text-white/70">{footerDescription}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-[hsl(var(--foreground))] hover:bg-white/92">
                  <Link href={primaryHref}>
                    <ArrowLeft className="h-4 w-4" />
                    {primaryCta}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/14 bg-white/6 text-white hover:bg-white/10 hover:text-white">
                  <Link href={secondaryHref}>{secondaryCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
