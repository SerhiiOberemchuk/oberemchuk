import type {AppLocale} from "@/i18n/locales";
import enSeoLandings from "@/content/seo-landings/en.json";
import itSeoLandings from "@/content/seo-landings/it.json";
import ukSeoLandings from "@/content/seo-landings/uk.json";

export type Locale = AppLocale;

export type SeoLanding = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  searchIntent: string;
  offerSummary: string;
  idealFor: string[];
  benefits: string[];
  deliverables: string[];
  faq: Array<{question: string; answer: string}>;
  relatedServiceSlugs: string[];
  relatedPostSlugs: string[];
  updatedAt: string;
};

const seoLandingsByLocale = {
  uk: ukSeoLandings,
  en: enSeoLandings,
  it: itSeoLandings
} satisfies Record<AppLocale, SeoLanding[]>;

export const seoLandingSlugs = ukSeoLandings.map((page) => page.slug);

export function getSeoLandings(locale: AppLocale): SeoLanding[] {
  return seoLandingsByLocale[locale];
}

export function getSeoLanding(slug: string): SeoLanding | undefined;
export function getSeoLanding(locale: AppLocale, slug: string): SeoLanding | undefined;
export function getSeoLanding(localeOrSlug: AppLocale | string, maybeSlug?: string): SeoLanding | undefined {
  if (maybeSlug === undefined) {
    return ukSeoLandings.find((page) => page.slug === localeOrSlug);
  }

  return seoLandingsByLocale[localeOrSlug as AppLocale].find(
    (page) => page.slug === maybeSlug
  );
}
