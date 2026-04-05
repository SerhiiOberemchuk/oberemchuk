import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimationWrapper from "@/components/animation-wrapper"
import ContactForm from "@/components/contact-form"
import { contactEmail, contactEmailHref, contactTelegram, contactTelegramHref } from "@/lib/contact-info"

type ContactItem = {
  label: string
  value: string
}

type ContactSectionProps = {
  badge: string
  title: string
  description: string
  infoTitle: string
  startTitle: string
  stackTitle: string
  emailCta: string
  telegramCta: string
  briefTitle: string
  briefDescription: string
  advantages: string[]
  contactItems: {
    email: ContactItem
    telegram: ContactItem
    workMode: ContactItem
    workRhythm: ContactItem
  }
}

export default function ContactSection({
  badge,
  title,
  description,
  infoTitle,
  startTitle,
  stackTitle,
  emailCta,
  telegramCta,
  briefTitle,
  briefDescription,
  advantages,
  contactItems
}: ContactSectionProps) {
  const isEnglish = title === "Let's discuss your project"
  const contactPitch = isEnglish
    ? "Direct communication, practical scope, strong next steps."
    : "Пряма комунікація, практичний scope і сильні наступні кроки."
  const briefBody = isEnglish
    ? "Share the task, business context and what success should look like. The conversation should start from substance, not from generic forms."
    : "Опишіть задачу, бізнес-контекст і те, яким має бути результат. Розмова має стартувати зі змісту, а не з формальності."
  const specializations = ["React", "Next.js", "TypeScript", "Node.js", "SEO", "E-commerce"]

  const infoItems = [
    {
      icon: Mail,
      label: contactItems.email.label,
      value: contactEmail || contactItems.email.value,
      href: contactEmailHref,
      external: false
    },
    {
      icon: MessageCircle,
      label: contactItems.telegram.label,
      value: contactTelegram || contactItems.telegram.value,
      href: contactTelegramHref,
      external: true
    },
    {
      icon: MapPin,
      label: contactItems.workMode.label,
      value: contactItems.workMode.value
    },
    {
      icon: Clock,
      label: contactItems.workRhythm.label,
      value: contactItems.workRhythm.value
    }
  ]

  return (
    <section id="contact" className="px-4 py-24 md:px-6" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-16 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Badge variant="secondary" className="mb-5">
                {badge}
              </Badge>
              <h2 id="contact-title" className="text-4xl text-[hsl(var(--foreground))] md:text-6xl">{title}</h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{description}</p>
          </div>
        </AnimationWrapper>

        <div className="grid gap-12 lg:grid-cols-[0.96fr_1.04fr]">
          <AnimationWrapper animation="slide-left">
            <div className="grid gap-10">
              <article className="border-t border-[rgba(24,31,43,0.14)] pt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">{infoTitle}</p>
                <p className="max-w-xl text-[2.25rem] leading-[1.04] text-[hsl(var(--foreground))] md:text-[3rem]">{contactPitch}</p>

                <ul className="mt-8 space-y-5">
                  {infoItems.map((info) => {
                    const Icon = info.icon
                    return (
                      <li key={`${info.label}-${info.value}`} className="flex items-center gap-4 border-b border-[rgba(24,31,43,0.08)] pb-5 last:border-b-0 last:pb-0">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(24,31,43,0.08)] bg-white">
                          <Icon className="h-5 w-5 text-[hsl(var(--foreground))]" />
                        </div>
                        <div>
                          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">{info.label}</div>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="mt-1 inline-flex items-center gap-2 text-base text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                              target={info.external ? "_blank" : undefined}
                              rel={info.external ? "noopener noreferrer" : undefined}
                            >
                              {info.value}
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : (
                            <div className="mt-1 text-base text-[hsl(var(--foreground))]">{info.value}</div>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </article>

              <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr]">
                <article className="border-t border-[rgba(24,31,43,0.14)] pt-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">{startTitle}</p>
                  <ul className="space-y-3">
                    {advantages.map((advantage) => (
                      <li key={advantage} className="border-b border-[rgba(24,31,43,0.08)] pb-3 text-sm leading-7 text-[hsl(var(--foreground))]">
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="border-l border-[rgba(24,31,43,0.08)] pl-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">{stackTitle}</p>
                  <ul className="flex flex-wrap gap-3">
                    {specializations.map((spec) => (
                      <li key={spec}>
                        <Badge variant="secondary">{spec}</Badge>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-4">
                    <Button asChild>
                      <a href={contactEmailHref}>{emailCta}</a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={contactTelegramHref} target="_blank" rel="noopener noreferrer">
                        {telegramCta}
                      </a>
                    </Button>
                  </div>
                </article>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="border-t border-[rgba(24,31,43,0.14)] pt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">{briefTitle}</p>
              <p className="max-w-2xl text-[2.3rem] leading-[1.04] text-[hsl(var(--foreground))] md:text-[3.2rem]">{briefDescription}</p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
                {briefBody}
              </p>

              <div className="mt-8 border border-[rgba(24,31,43,0.08)] bg-white p-6 shadow-[0_18px_60px_rgba(24,31,43,0.05)] md:p-8">
                <ContactForm />
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  )
}
