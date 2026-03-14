import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import SeoSection from "@/components/sections/seo-section";
import ServicesSection from "@/components/sections/services-section";
import FaqSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import {contactEmail} from "@/lib/contact-info";
import {getPageAlternates} from "@/lib/seo";

type HomePageProps = {
  params: Promise<{locale: string}>;
};

type FaqItem = {
  question: string;
  answer: string;
};

export const dynamic = "force-static";

export async function generateMetadata({params}: HomePageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "HomePage.metadata"});

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: getPageAlternates(locale as "uk" | "en"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: locale === "en" ? "/en" : "/",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt")
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-image.png"]
    }
  };
}

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;
  const pageT = await getTranslations({locale, namespace: "HomePage"});
  const schemaT = await getTranslations({locale, namespace: "HomePage.schema"});
  const faqs = pageT.raw("faq.items") as FaqItem[];

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Serhii Oberemchuk",
      jobTitle: "Fullstack Web Developer",
      description: schemaT("person.description"),
      url: "https://www.oberemchuk.site",
      sameAs: [
        "https://www.linkedin.com/in/serhii-oberemchuk",
        "https://github.com/oberemchuk",
        "https://t.me/oberemchuk"
      ],
      knowsAbout: schemaT.raw("person.knowsAbout") as string[]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Serhii Oberemchuk",
      description: schemaT("website.description"),
      url: "https://www.oberemchuk.site",
      author: {
        "@type": "Person",
        name: "Serhii Oberemchuk"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Serhii Oberemchuk - Web Development Services",
      description: schemaT("service.description"),
      url: "https://www.oberemchuk.site",
      telephone: "+393516648498",
      email: contactEmail,
      areaServed: [
        {"@type": "Place", name: "Europe"},
        {"@type": "Place", name: "European Union"}
      ],
      serviceType: schemaT.raw("service.serviceType") as string[],
      provider: {
        "@type": "Person",
        name: "Serhii Oberemchuk"
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: (schemaT.raw("service.offers") as Array<{name: string; description: string}>).map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.description
          }
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SeoSection />
      <ContactSection />
      <FaqSection title={pageT("faq.title")} subtitle={pageT("faq.subtitle")} faqs={faqs} />
    </>
  );
}
