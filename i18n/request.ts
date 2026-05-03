import {getRequestConfig} from "next-intl/server";
import {loadMessages} from "./load-messages";
import {routing} from "./routing";
import {isAppLocale} from "./locales";

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = isAppLocale(requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale)
  };
});
