import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    return {
      locale: "fr",
      messages: (await import(`../../messages/fr/home.json`)).default,
      timeZone: "Africa/Abidjan",
    };
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}/home.json`)).default,
    timeZone: "Africa/Abidjan",
  };
});
