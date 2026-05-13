import createMiddleware from "next-intl/middleware";
import { routing } from "./app/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Toutes les routes sauf _next, fichiers statiques et API
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
