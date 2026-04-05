import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { Link } from "@/i18n/navigation"

type HeroStat = {
  value: string
  label: string
}

type HeroSectionProps = {
  badge: string
  titlePrefix: string
  titleHighlight: string
  titleSuffix: string
  description: string
  primaryCta: string
  secondaryCta: string
  stats: HeroStat[]
}

export default function HeroSection({
  badge,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  description,
  primaryCta,
  secondaryCta,
  stats
}: HeroSectionProps) {
  const isEnglish = titlePrefix === "I build"
  const manifestoLabel = isEnglish ? "Positioning" : "Позиціонування"
  const manifestoTitle = isEnglish ? "Independent partner, not a commodity executor." : "Незалежний партнер, а не типовий виконавець."
  const manifestoBody = isEnglish
    ? "Strategy, interface thinking, development and launch are handled as one system."
    : "Стратегія, інтерфейсне мислення, розробка і запуск працюють як одна система."
  const proofLabel = isEnglish ? "Working logic" : "Логіка роботи"
  const proofBody = isEnglish
    ? "The goal is not visual noise. The goal is a digital presence that feels clear, controlled and commercially strong."
    : "Мета не у візуальному шумі. Мета у цифровій присутності, яка відчувається чіткою, керованою і сильною комерційно."

  return (
    <section className="relative -mt-16 overflow-hidden px-4 pb-18 pt-22 md:px-6 md:pt-30" aria-labelledby="hero-title">
      <div className="absolute inset-x-0 top-0 -z-10 h-[56rem] bg-[radial-gradient(circle_at_9%_14%,rgba(230,90,48,0.1),transparent_24%),radial-gradient(circle_at_88%_12%,rgba(89,110,145,0.12),transparent_18%),linear-gradient(180deg,rgba(252,254,255,0.99)_0%,rgba(247,250,252,0.96)_55%,rgba(247,250,252,0)_100%)]" />
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="grid gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:items-start">
            <div className="pt-8">
              <Badge variant="secondary" className="mb-8">
                {badge}
              </Badge>

              <h1
                id="hero-title"
                className="max-w-5xl text-[4.15rem] leading-[0.9] text-[hsl(var(--foreground))] md:text-[5.7rem] xl:text-[7.1rem]"
              >
                <span className="block">{titlePrefix}</span>
                <span className="block text-[hsl(var(--primary))]">{titleHighlight}</span>
                <span className="block">{titleSuffix}</span>
              </h1>

              <div className="mt-10 grid gap-8 lg:grid-cols-[0.76fr_0.24fr] lg:items-end">
                <div>
                  <p className="max-w-2xl text-[1.08rem] leading-8 text-[hsl(var(--muted-foreground))] md:text-[1.18rem]">
                    {description}
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button asChild size="lg" className="min-w-[220px]">
                      <SmoothScrollLink href="#contact">
                        {primaryCta}
                        <ArrowUpRight className="h-4 w-4" />
                      </SmoothScrollLink>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="min-w-[220px]">
                      <Link href="/portfolio">{secondaryCta}</Link>
                    </Button>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="border-t border-[rgba(24,31,43,0.14)] pt-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
                      {proofLabel}
                    </p>
                    <p className="mt-4 max-w-[12rem] text-sm leading-7 text-[hsl(var(--muted-foreground))]">{proofBody}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:pt-18">
              <div className="border-t border-[rgba(24,31,43,0.14)] pt-6">
                <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] lg:grid-cols-1">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
                      {manifestoLabel}
                    </p>
                    <p className="mt-4 text-[2.05rem] leading-[1.04] text-[hsl(var(--foreground))] md:text-[2.45rem]">
                      {manifestoTitle}
                    </p>
                  </div>
                  <p className="max-w-xl border-l border-[rgba(24,31,43,0.08)] pl-5 text-base leading-8 text-[hsl(var(--muted-foreground))]">
                    {manifestoBody}
                  </p>
                </div>
              </div>

              <dl className="grid gap-0 border-y border-[rgba(24,31,43,0.12)]">
                {stats.map((stat, index) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className={`grid gap-3 py-5 md:grid-cols-[auto_1fr] md:items-end ${index !== 0 ? "border-t border-[rgba(24,31,43,0.08)]" : ""}`}
                  >
                    <dd className="text-[2.75rem] leading-none text-[hsl(var(--foreground))] md:text-[3.55rem]">{stat.value}</dd>
                    <dt className="max-w-[16rem] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
