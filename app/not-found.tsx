import {ArrowLeft} from "lucide-react";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[hsl(var(--foreground))] text-white shadow-[0_40px_120px_rgba(24,31,43,0.22)]">
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(10,14,24,0.98)_8%,rgba(10,14,24,0.88)_52%,rgba(16,23,36,0.76)_100%)]" />
          <div className="absolute -left-12 top-12 h-72 w-72 rounded-full bg-[rgba(230,90,48,0.18)] blur-3xl" />
          <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-[rgba(108,132,173,0.15)] blur-3xl" />

          <div className="relative z-10 grid gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:px-14 lg:py-24">
            <div>
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/54">
                Not found
              </p>
              <div className="max-w-xl">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                  Missing page
                </p>
                <h1 className="mt-4 max-w-[10ch] text-5xl leading-[0.92] text-white md:text-7xl">
                  Page not found
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                  The link may be outdated, the page may have been moved, or this route no longer exists in the current structure.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                  Next step
                </p>
                <p className="mt-4 max-w-[30rem] text-[2rem] leading-[1.02] text-white md:text-[2.6rem]">
                  Return to the main navigation and continue from a stable entry point.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="min-w-[220px] bg-white text-[hsl(var(--foreground))] hover:bg-white/92">
                  <a href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[220px] border-white/14 bg-white/6 text-white hover:bg-white/10 hover:text-white">
                  <a href="/services">View services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


