import {ArrowLeft, ArrowUpRight, Home, Layers3} from "lucide-react";
import {Button} from "@/components/ui/button";

type NotFoundPageShellProps = {
  eyebrow: string;
  status: string;
  title: string;
  description: string;
  nextStepLabel: string;
  nextStepTitle: string;
  backHome: string;
  viewServices: string;
  homeHref?: string;
  servicesHref?: string;
};

export default function NotFoundPageShell({
  eyebrow,
  status,
  title,
  description,
  nextStepLabel,
  nextStepTitle,
  backHome,
  viewServices,
  homeHref = "/",
  servicesHref = "/services",
}: NotFoundPageShellProps) {
  return (
    <section className="relative -mt-16 overflow-hidden px-4 pb-20 pt-24 md:px-6 md:pb-28 md:pt-32" aria-labelledby="not-found-title">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(239,244,249,0.92)_58%,rgba(239,244,249,0)_100%)]" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p className="caption mb-8">{eyebrow}</p>
          <p className="text-[8.5rem] font-semibold leading-[0.78] text-[hsl(var(--foreground))] md:text-[13rem] lg:text-[15rem]">
            404
          </p>
          <h1 id="not-found-title" className="mt-8 max-w-3xl text-5xl leading-[0.94] text-[hsl(var(--foreground))] md:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[hsl(var(--foreground))]/70 md:text-lg">
            {description}
          </p>
        </div>

        <div className="grid gap-8 border-y border-[rgba(24,31,43,0.16)] py-8 lg:mb-3">
          <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(24,31,43,0.12)] bg-[rgba(255,255,255,0.9)] text-[hsl(var(--foreground))] shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
              <Layers3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="caption">{status}</p>
              <p className="mt-4 max-w-2xl text-3xl leading-[1.08] text-[hsl(var(--foreground))] md:text-[2.7rem]">
                {nextStepTitle}
              </p>
            </div>
          </div>

          <div className="grid gap-4 border-t border-[rgba(24,31,43,0.12)] pt-6 sm:grid-cols-2">
            <div>
              <p className="caption mb-4">{nextStepLabel}</p>
              <p className="max-w-sm text-sm leading-7 text-[hsl(var(--foreground))]/64">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Button asChild size="lg" className="w-full sm:w-fit sm:min-w-[220px]">
                <a href={homeHref}>
                  <Home className="h-4 w-4" aria-hidden="true" />
                  {backHome}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-fit sm:min-w-[220px]">
                <a href={servicesHref}>
                  {viewServices}
                  <ArrowUpRight className="button-arrow-up-right h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <a
        href={homeHref}
        className="mx-auto mt-12 flex max-w-7xl items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))] transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {backHome}
      </a>
    </section>
  );
}
