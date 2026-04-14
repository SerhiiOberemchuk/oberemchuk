import {
  ArrowUpRight,
  Globe,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/components/animation-wrapper";
import SmoothScrollLink from "@/components/smooth-scroll-link";
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
  const isEnglish = title === "Services";
  const sectionLabel = isEnglish ? "Engagement formats" : "Формати співпраці";
  const estimatePitch = isEnglish
    ? "Defined scope, clean packaging and a realistic path to release."
    : "Чіткий scope, зібране пакування і реалістичний шлях до релізу.";
  const getDetailsLabel = (serviceTitle: string) =>
    isEnglish ? `View ${serviceTitle}` : `Переглянути ${serviceTitle}`;

  const services = [
    {
      href: "/services/landing-pages",
      ...servicesContent[0],
    },
    {
      href: "/services/corporate-websites",
      popular: true,
      ...servicesContent[1],
    },
    {
      href: "/services/ecommerce-development",
      ...servicesContent[2],
    },
    {
      href: "/services/web-app-development",
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
              <p className="mb-4 editorial-kicker">{sectionLabel}</p>
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
              <article className="editorial-divider pt-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {services[1].price}
                    </p>
                    <h3 className="mt-3 text-[3.3rem] leading-[0.93] text-[hsl(var(--foreground))] md:text-[4.85rem]">
                      {services[1].title}
                    </h3>
                  </div>
                  <span className="inline-flex w-fit border border-[rgba(45,34,24,0.12)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {popularBadge}
                  </span>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[0.88fr_0.12fr]">
                  <div>
                    <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                      {services[1].description}
                    </p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {services[1].features.map((feature) => (
                        <li
                          key={feature}
                          className="border-b border-[rgba(45,34,24,0.08)] pb-3 text-sm leading-7 text-[hsl(var(--foreground))]"
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
                        aria-label={services[1].description}
                      >
                        {getDetailsLabel(services[1].title)}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>

              <div className="grid gap-0 border-y border-[rgba(45,34,24,0.12)]">
                {[services[0], services[2], services[3]].map(
                  (service, index) => {
                    return (
                      <article
                        key={service.href}
                        className={`grid gap-6 py-6 md:grid-cols-[auto_1fr_auto] md:items-start ${index !== 0 ? "border-t border-[rgba(45,34,24,0.08)]" : ""}`}
                      >
                        <p className="pt-1 text-[0.9rem] font-semibold tracking-[0.18em] text-[hsl(var(--primary))]">
                          0{index + 1}
                        </p>
                        <div>
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            {service.price}
                          </p>
                          <h3 className="mt-2 text-[1.85rem] leading-tight text-[hsl(var(--foreground))]">
                            {service.title}
                          </h3>
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                        <Link
                          href={service.href}
                          aria-label={service.description}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))] transition-colors hover:text-primary"
                        >
                          {getDetailsLabel(service.title)}
                          <ArrowUpRight className="h-4 w-4" />
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
              <article className="editorial-divider pt-8">
                <p className="mb-6 editorial-kicker">{approachTitle}</p>
                <ul className="space-y-5">
                  {advantages.map((advantage, index) => {
                    const Icon = advantageIcons[index] ?? Globe;
                    return (
                      <li
                        key={advantage.title}
                        className="grid gap-3 border-b border-[rgba(45,34,24,0.08)] pb-5 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center border border-[rgba(45,34,24,0.08)] bg-white/50 text-[hsl(var(--foreground))]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="text-xl text-[hsl(var(--foreground))]">
                            {advantage.title}
                          </h3>
                        </div>
                        <p className="pl-13 text-sm leading-7 text-muted-foreground">
                          {advantage.description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </article>

              <article className="editorial-surface p-6 md:p-7">
                <p className="mb-4 editorial-kicker">{estimateTitle}</p>
                <p className="text-3xl leading-[1.06] text-[hsl(var(--foreground))] md:text-[2.7rem]">
                  {estimatePitch}
                </p>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  {estimateDescription}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <SmoothScrollLink href="#contact">
                    {estimateCta}
                    <ArrowUpRight className="h-4 w-4" />
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
