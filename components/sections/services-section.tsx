import {
  ArrowUpRight,
  Globe,
  Monitor,
  ShoppingCart,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import AnimationWrapper from "@/components/animation-wrapper";
import SmoothScrollLink from "@/components/smooth-scroll-link";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type ServiceItem = {
  title: string;
  description: string;
  price: string;
  features: string[];
};

type AdvantageItem = {
  title: string;
  description: string;
};

type ServicesSectionProps = {
  title: string;
  subtitle: string;
  popularBadge: string;
  detailsCta: string;
  approachTitle: string;
  estimateTitle: string;
  estimateDescription: string;
  estimateCta: string;
  servicesContent: ServiceItem[];
  advantages: AdvantageItem[];
};

export default function ServicesSection({
  title,
  subtitle,
  popularBadge,
  detailsCta,
  approachTitle,
  estimateTitle,
  estimateDescription,
  estimateCta,
  servicesContent,
  advantages,
}: ServicesSectionProps) {
  const t = useTranslations("HomeServices");

  const services = [
    {
      icon: Monitor,
      href: "/services/landing-pages",
      popular: false,
      ...servicesContent[0],
    },
    {
      icon: Sparkles,
      href: "/services/corporate-websites",
      popular: true,
      ...servicesContent[1],
    },
    {
      icon: ShoppingCart,
      href: "/services/ecommerce-development",
      popular: false,
      ...servicesContent[2],
    },
    {
      icon: Workflow,
      href: "/services/web-app-development",
      popular: false,
      ...servicesContent[3],
    },
  ];

  const advantageIcons = [Globe, Sparkles, Workflow];

  return (
    <section
      id="services"
      className="px-4 py-24 md:px-6"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-7xl">
        <AnimationWrapper animation="fade-in">
          <div className="mb-16 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {t("labels.section")}
              </p>
              <h2
                id="services-title"
                className="text-4xl text-[hsl(var(--foreground))] md:text-6xl"
              >
                {title}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <AnimationWrapper animation="slide-left">
            <div className="grid gap-8">
              <article className="border-t border-[rgba(24,31,43,0.18)] pt-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {services[1].price}
                    </p>
                    <h3 className="mt-3 text-[3.4rem] leading-[0.95] text-[hsl(var(--foreground))] md:text-[4.8rem]">
                      {services[1].title}
                    </h3>
                  </div>
                  <span className="inline-flex w-fit rounded-full border border-[rgba(24,31,43,0.14)] bg-[rgba(255,255,255,0.78)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--foreground))]/62">
                    {popularBadge}
                  </span>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[0.88fr_0.12fr]">
                  <div>
                    <p className="max-w-2xl text-base leading-8 text-[hsl(var(--foreground))]/68">
                      {services[1].description}
                    </p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {services[1].features.map((feature) => (
                        <li
                          key={feature}
                          className="border-b border-[rgba(24,31,43,0.12)] pb-3 text-sm leading-7 text-[hsl(var(--foreground))]"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:flex lg:justify-end">
                    <Button asChild className="w-fit">
                      <Link
                        href={services[1].href}
                        aria-label={`${detailsCta}: ${services[1].title}`}
                      >
                        {services[1].title}
                        <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>

              <div className="grid gap-0 border-y border-[rgba(24,31,43,0.16)]">
                {[services[0], services[2], services[3]].map(
                  (service, index) => {
                    const Icon = service.icon;
                    return (
                      <article
                        key={service.href}
                        className={`grid gap-6 py-6 md:grid-cols-[auto_1fr_auto] md:items-start ${index !== 0 ? "border-t border-[rgba(24,31,43,0.12)]" : ""}`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(24,31,43,0.12)] bg-[rgba(255,255,255,0.94)] text-[hsl(var(--foreground))] shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            {service.price}
                          </p>
                          <h3 className="mt-2 text-[1.85rem] leading-tight text-[hsl(var(--foreground))]">
                            {service.title}
                          </h3>
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--foreground))]/68">
                            {service.description}
                          </p>
                        </div>
                        <Link
                          href={service.href}
                          aria-label={`${detailsCta}: ${service.title}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))] transition-colors hover:text-primary"
                        >
                          {service.title}
                          <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                        </Link>
                      </article>
                    );
                  },
                )}
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slide-right">
            <div className="grid gap-10">
              <article className="border-t border-[rgba(24,31,43,0.18)] pt-8">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {approachTitle}
                </p>
                <ul className="space-y-5">
                  {advantages.map((advantage, index) => {
                    const Icon = advantageIcons[index] ?? Globe;
                    return (
                      <li key={advantage.title} className="grid gap-3 border-b border-[rgba(24,31,43,0.12)] pb-5 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(24,31,43,0.1)] bg-[rgba(24,31,43,0.04)] text-[hsl(var(--foreground))]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="text-xl text-[hsl(var(--foreground))]">
                            {advantage.title}
                          </h3>
                        </div>
                        <p className="pl-13 text-sm leading-7 text-[hsl(var(--foreground))]/68">
                          {advantage.description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </article>

              <article className="border-l border-[rgba(24,31,43,0.12)] pl-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {estimateTitle}
                </p>
                <p className="text-3xl leading-[1.06] text-[hsl(var(--foreground))] md:text-[2.7rem]">
                  {t("labels.estimatePitch")}
                </p>
                <p className="mt-5 text-base leading-8 text-[hsl(var(--foreground))]/68">
                  {estimateDescription}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <SmoothScrollLink href="#contact">
                    {estimateCta}
                    <ArrowUpRight className="button-arrow-up-right h-4 w-4" />
                  </SmoothScrollLink>
                </Button>
              </article>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
