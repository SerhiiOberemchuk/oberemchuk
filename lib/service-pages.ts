import type {AppLocale} from "@/i18n/locales";
import enServicePages from "@/content/service-pages/en.json";
import itServicePages from "@/content/service-pages/it.json";
import ukServicePages from "@/content/service-pages/uk.json";

export type Locale = AppLocale;

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  priceFrom: string;
  keywords: string[];
  outcomes: string[];
  deliverables: string[];
  fitFor: string[];
  faq: Array<{question: string; answer: string}>;
};

const servicePagesByLocale = {
  uk: ukServicePages,
  en: enServicePages,
  it: itServicePages
} satisfies Record<AppLocale, ServicePage[]>;

export const servicePageSlugs = ukServicePages.map((service) => service.slug);
export const servicePages = ukServicePages;

export function getServicePages(locale: AppLocale): ServicePage[] {
  return servicePagesByLocale[locale];
}

export function getServicePage(slug: string): ServicePage | undefined;
export function getServicePage(locale: AppLocale, slug: string): ServicePage | undefined;
export function getServicePage(localeOrSlug: AppLocale | string, maybeSlug?: string): ServicePage | undefined {
  if (maybeSlug === undefined) {
    return ukServicePages.find((service) => service.slug === localeOrSlug);
  }

  return servicePagesByLocale[localeOrSlug as AppLocale].find(
    (service) => service.slug === maybeSlug
  );
}
