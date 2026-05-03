import type {AppLocale} from "@/i18n/locales";
import enBlogPosts from "@/content/blog-posts/en.json";
import itBlogPosts from "@/content/blog-posts/it.json";
import ukBlogPosts from "@/content/blog-posts/uk.json";

export type Locale = AppLocale;

export type BlogSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  heroTitle: string;
  heroDescription: string;
  keywords: string[];
  sections: BlogSection[];
  relatedLandingSlug: string;
};

const blogPostsByLocale = {
  uk: ukBlogPosts,
  en: enBlogPosts,
  it: itBlogPosts
} satisfies Record<AppLocale, BlogPost[]>;

export const blogPostSlugs = ukBlogPosts.map((post) => post.slug);

export function getBlogPosts(locale: AppLocale): BlogPost[] {
  return blogPostsByLocale[locale];
}

export function getBlogPost(slug: string): BlogPost | undefined;
export function getBlogPost(locale: AppLocale, slug: string): BlogPost | undefined;
export function getBlogPost(localeOrSlug: AppLocale | string, maybeSlug?: string): BlogPost | undefined {
  if (maybeSlug === undefined) {
    return ukBlogPosts.find((post) => post.slug === localeOrSlug);
  }

  return blogPostsByLocale[localeOrSlug as AppLocale].find(
    (post) => post.slug === maybeSlug
  );
}
