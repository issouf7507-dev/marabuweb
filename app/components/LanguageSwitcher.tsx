"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();

  // Pour récupérer dynamiquement la langue actuelle :
  const currentLocale = params?.locale ?? "fr"; // fallback au français

  const locales = ["fr", "en"]; // liste des langues supportées

  return (
    <div className="flex gap-4">
      {locales.map((lng) => {
        if (lng === currentLocale) return null;
        // Extraire le chemin sans la locale
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
        const newPath = `/${lng}${pathWithoutLocale}`;
        return (
          <Link key={lng} href={newPath} className="flex items-center gap-2">
            {lng === "fr" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 3 2"
                  className="w-8 h-8"
                >
                  <rect fill="#CE1126" width="3" height="2" />
                  <rect fill="#fff" width="2" height="2" />
                  <rect fill="#002654" width="1" height="2" />
                </svg>
                <span className="text-white">Français</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 30"
                  width="30"
                  height="30"
                >
                  <clipPath id="t">
                    <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
                  </clipPath>
                  <path d="M0,0v30h50v-30z" fill="#012169" />
                  <path
                    d="M0,0 50,30M50,0 0,30"
                    stroke="#fff"
                    strokeWidth="6"
                  />
                  <path
                    d="M0,0 50,30M50,0 0,30"
                    clipPath="url(#t)"
                    stroke="#C8102E"
                    strokeWidth="4"
                  />
                  <path
                    d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z"
                    fill="#C8102E"
                    stroke="#FFF"
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-white">English</span>
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}
