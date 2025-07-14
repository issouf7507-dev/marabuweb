import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["fr", "en"], // Définir dans cette ligne les langues possibles pour la traduction
  defaultLocale: "fr", // Définir dans cette ligne la langue par défaut à afficher
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
