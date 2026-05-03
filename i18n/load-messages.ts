import {messageNamespaces, type MessageNamespace} from "./message-namespaces";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeMessages(
  base: Record<string, unknown>,
  overrides: Record<string, unknown>
): Record<string, unknown> {
  const result = {...base};

  for (const [key, value] of Object.entries(overrides)) {
    const current = result[key];

    result[key] =
      isPlainObject(current) && isPlainObject(value)
        ? mergeMessages(current, value)
        : value;
  }

  return result;
}

export const clientMessageNamespaces = [
  "ContactForm",
  "CookieBanner",
  "HomeAbout",
  "HomeHero",
  "HomeServices",
  "LanguageSwitcher",
  "PortfolioShowcase",
  "ProjectsSlider",
  "ScrollToTop"
] as const satisfies readonly MessageNamespace[];

export async function loadMessages(
  locale: string,
  namespaces: readonly MessageNamespace[] = messageNamespaces
): Promise<Record<string, unknown>> {
  const [baseMessages, localeMessages] = await Promise.all([
    loadLocaleMessages("en", namespaces),
    locale === "en"
      ? Promise.resolve({})
      : loadLocaleMessages(locale, namespaces)
  ]);

  return locale === "en"
    ? baseMessages
    : mergeMessages(baseMessages, localeMessages);
}

async function loadLocaleMessages(
  locale: string,
  namespaces: readonly MessageNamespace[]
): Promise<Record<string, unknown>> {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const messages = (
        await import(`../messages/catalogs/${locale}/${namespace}.json`)
      ).default as Record<string, unknown>;

      return [namespace, messages] as const;
    })
  );

  return Object.fromEntries(entries);
}
