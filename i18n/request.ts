import {getRequestConfig} from "next-intl/server";
import {loadMessages} from "./load-messages";
import {resolveAppLocale} from "./locales";

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = resolveAppLocale(requested);

  return {
    locale,
    messages: await loadMessages(locale)
  };
});
