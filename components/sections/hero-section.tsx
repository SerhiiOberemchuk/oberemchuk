import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimationWrapper from "@/components/animation-wrapper"
import SmoothScrollLink from "@/components/smooth-scroll-link"
import { Link } from "@/i18n/navigation"
import EditorialOrbit from "@/components/editorial-orbit"

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
  const manifestoLabel = isEnglish ? "Engagement model" : "Формат взаємодії"
  const manifestoTitle = isEnglish ? "Independent partner for brands that need digital weight." : "Незалежний партнер для брендів, яким потрібна цифрова вага."
  const manifestoBody = isEnglish
    ? "Positioning, interface logic and launch discipline in one system."
    : "Позиціонування, логіка інтерфейсу і запуск в одній системі."
  const proofLabel = isEnglish ? "Working note" : "Робоча примітка"
  const proofBody = isEnglish
    ? "Authority, clarity, direction."
    : "Авторитет, ясність, напрям."
  const statement = isEnglish
    ? "Quiet authority for brands that need digital weight."
    : "Тиха впевненість для брендів, яким потрібна цифрова вага."
  const ctaNote = isEnglish ? "Selected projects." : "Вибіркові проєкти."
  const orbitLabel = isEnglish ? "Positioning field" : "Поле позиціонування"
  const directionNote = isEnglish
    ? "One accountable layer from structure to release."
    : "Один відповідальний контур від структури до релізу."

  return (
    <section className="relative -mt-16 overflow-hidden px-4 pb-20 pt-24 md:px-6 md:pt-32" aria-labelledby="hero-title">
      <div className="absolute inset-x-0 top-0 -z-10 h-[58rem] bg-[radial-gradient(circle_at_11%_12%,rgba(198,90,46,0.16),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(17,17,17,0.05),transparent_18%),linear-gradient(180deg,rgba(234,231,226,0.98)_0%,rgba(238,235,230,0.88)_58%,rgba(238,235,230,0)_100%)]" />
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="grid gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div className="pt-10">
              <div className="grid gap-8 lg:grid-cols-[0.26fr_0.74fr] lg:items-start">
                <div className="space-y-6 pt-2">
                  <Badge variant="secondary" className="w-fit">
                    {badge}
                  </Badge>
                  <div className="hidden lg:block editorial-divider pt-5">
                    <p className="editorial-kicker">{proofLabel}</p>
                    <p className="mt-4 max-w-[11rem] text-sm leading-7 text-[hsl(var(--muted-foreground))]">{proofBody}</p>
                  </div>
                </div>

                <div>
                  <h1
                    id="hero-title"
                    className="max-w-5xl text-[4.6rem] leading-[0.8] text-[hsl(var(--foreground))] md:text-[6.55rem] xl:text-[8.25rem]"
                  >
                    <span className="block">{titlePrefix}</span>
                    <span className="block text-[hsl(var(--primary))]">{titleHighlight}</span>
                    <span className="block">{titleSuffix}</span>
                  </h1>

                  <div className="mt-8 grid gap-8 md:grid-cols-[0.68fr_0.32fr] md:items-end">
                    <p className="max-w-xl text-[1rem] leading-8 text-[hsl(var(--muted-foreground))] md:text-[1.08rem]">
                      {description}
                    </p>
                    <div className="border-l border-[rgba(24,31,43,0.08)] pl-5">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[hsl(var(--muted-foreground))]">
                        {isEnglish ? "Direction" : "Напрям"}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[hsl(var(--foreground))]">
                        {directionNote}
                      </p>
                    </div>
                  </div>

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

                  <p className="mt-5 text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">
                    {ctaNote}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:pt-10">
              <div className="premium-panel min-h-[22rem] p-6 text-white md:p-8">
                <div className="premium-grid" />
                <div className="premium-glow" />
                <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/56">{orbitLabel}</p>
                    <p className="mt-5 max-w-sm text-[2.45rem] leading-[0.96] md:text-[3.15rem]">
                      {statement}
                    </p>
                  </div>
                  <div className="hero-orbit-wrap relative mx-auto flex w-full max-w-[24rem] items-center justify-center">
                    <EditorialOrbit className="w-full opacity-95" accentClassName="text-[rgba(217,111,58,0.95)]" />
                    <div className="absolute inset-[24%] border border-white/14" />
                  </div>
                </div>
              </div>

              <div className="editorial-divider pt-6">
                <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] lg:grid-cols-1">
                  <div>
                    <p className="editorial-kicker">
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

              <dl className="grid gap-0 border-y border-[rgba(24,31,43,0.12)] sm:grid-cols-2">
                {stats.map((stat, index) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className={`grid gap-3 py-5 md:grid-cols-[auto_1fr] md:items-end ${index > 1 ? "sm:border-t sm:border-[rgba(24,31,43,0.08)]" : ""} ${index % 2 === 1 ? "sm:border-l sm:border-[rgba(24,31,43,0.08)] sm:pl-6" : "sm:pr-6"} ${index === 1 ? "border-t sm:border-t-0" : ""} ${index === 2 || index === 3 ? "border-t border-[rgba(24,31,43,0.08)] sm:border-t-0" : ""}`}
                  >
                    <dd className="text-[2.9rem] leading-none text-[hsl(var(--foreground))] md:text-[3.9rem]">{stat.value}</dd>
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
