import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutSection from "@/components/sections/about-section";
import ClientOutcomesSection from "@/components/sections/client-outcomes-section";
import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ServicesSection from "@/components/sections/services-section";
import FaqSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import type { AppLocale } from "@/i18n/locales";
import { contactEmail } from "@/lib/contact-info";
import { getLocalizedPath, getPageAlternates } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: AppLocale }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: getPageAlternates(locale),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: getLocalizedPath(locale),
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const pageT = await getTranslations({ locale, namespace: "HomePage" });
  const schemaT = await getTranslations({
    locale,
    namespace: "HomePage.schema",
  });
  const heroT = await getTranslations({ locale, namespace: "HomeHero" });
  const aboutT = await getTranslations({ locale, namespace: "HomeAbout" });
  const servicesT = await getTranslations({
    locale,
    namespace: "HomeServices",
  });
  const outcomesT = await getTranslations({
    locale,
    namespace: "HomeOutcomes",
  });
  const contactT = await getTranslations({ locale, namespace: "HomeContact" });
  const faqT = await getTranslations({ locale, namespace: "FaqSection" });
  const faqs = pageT.raw("faq.items") as FaqItem[];
  const heroStats = heroT.raw("stats") as Array<{
    value: string;
    label: string;
  }>;
  const aboutParagraphs = aboutT.raw("paragraphs") as string[];
  const aboutSkills = aboutT.raw("skills") as Array<{
    title: string;
    description: string;
  }>;
  const aboutProcess = aboutT.raw("process") as Array<{
    title: string;
    description: string;
  }>;
  const aboutSummaryStats = aboutT.raw("summaryStats") as Array<{
    value: string;
    label: string;
  }>;
  const serviceCards = servicesT.raw("services") as Array<{
    title: string;
    description: string;
    price: string;
    features: string[];
  }>;
  const serviceAdvantages = servicesT.raw("advantages") as Array<{
    title: string;
    description: string;
  }>;
  const clientOutcomes = outcomesT.raw("items") as Array<{
    title: string;
    description: string;
  }>;
  const contactAdvantages = contactT.raw("advantages") as string[];
  const contactItems = contactT.raw("contactItems") as {
    email: { label: string; value: string };
    telegram: { label: string; value: string };
    workMode: { label: string; value: string };
    workRhythm: { label: string; value: string };
  };

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Serhii Oberemchuk",
      jobTitle: "Fullstack Web Developer",
      description: schemaT("person.description"),
      url: "https://oberemchuk.online",
      sameAs: [
        "https://www.linkedin.com/in/serhii-oberemchuk",
        "https://github.com/oberemchuk",
        "https://t.me/oberemchuk",
      ],
      knowsAbout: schemaT.raw("person.knowsAbout") as string[],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Serhii Oberemchuk",
      description: schemaT("website.description"),
      url: "https://oberemchuk.online",
      author: { "@type": "Person", name: "Serhii Oberemchuk" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Serhii Oberemchuk - Digital Product and Web Development Services",
      description: schemaT("service.description"),
      url: "https://oberemchuk.online",
      telephone: "+393516648498",
      email: contactEmail,
      serviceType: schemaT.raw("service.serviceType") as string[],
      provider: { "@type": "Person", name: "Serhii Oberemchuk" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Product and Web Development Services",
        itemListElement: (
          schemaT.raw("service.offers") as Array<{
            name: string;
            description: string;
          }>
        ).map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.description,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <HeroSection
        badge={heroT("badge")}
        titlePrefix={heroT("titlePrefix")}
        titleHighlight={heroT("titleHighlight")}
        titleSuffix={heroT("titleSuffix")}
        description={heroT("description")}
        primaryCta={heroT("primaryCta")}
        secondaryCta={heroT("secondaryCta")}
        stats={heroStats}
      />
      <ServicesSection
        title={servicesT("title")}
        subtitle={servicesT("subtitle")}
        popularBadge={servicesT("popularBadge")}
        detailsCta={servicesT("detailsCta")}
        approachTitle={servicesT("approachTitle")}
        estimateTitle={servicesT("estimateTitle")}
        estimateDescription={servicesT("estimateDescription")}
        estimateCta={servicesT("estimateCta")}
        servicesContent={serviceCards}
        advantages={serviceAdvantages}
      />
      <PortfolioSection locale={locale} />
      <AboutSection
        title={aboutT("title")}
        subtitle={aboutT("subtitle")}
        valueTitle={aboutT("valueTitle")}
        skillsTitle={aboutT("skillsTitle")}
        processTitle={aboutT("processTitle")}
        technologiesTitle={aboutT("technologiesTitle")}
        paragraphs={aboutParagraphs}
        skills={aboutSkills}
        process={aboutProcess}
        summaryStats={aboutSummaryStats}
      />
      <ClientOutcomesSection
        title={outcomesT("title")}
        subtitle={outcomesT("subtitle")}
        cta={outcomesT("cta")}
        items={clientOutcomes}
      />
      <FaqSection
        label={faqT("label")}
        title={pageT("faq.title")}
        subtitle={pageT("faq.subtitle")}
        faqs={faqs}
      />
      <ContactSection
        badge={contactT("badge")}
        title={contactT("title")}
        description={contactT("description")}
        infoTitle={contactT("infoTitle")}
        infoDescription={contactT("infoDescription")}
        startTitle={contactT("startTitle")}
        stackTitle={contactT("stackTitle")}
        emailCta={contactT("emailCta")}
        telegramCta={contactT("telegramCta")}
        briefTitle={contactT("briefTitle")}
        briefDescription={contactT("briefDescription")}
        briefBody={contactT("briefBody")}
        advantages={contactAdvantages}
        contactItems={contactItems}
      />
    </>
  );
}
