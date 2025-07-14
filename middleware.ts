import createMiddleware from "next-intl/middleware";
// import { routing } from "./src/i18n/routing";
import { routing } from "./app/i18n/routing";
// import { routing } from  "./app/i18n/routing" ;

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "fr",
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files (images, etc)
  // - favicon.ico
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
