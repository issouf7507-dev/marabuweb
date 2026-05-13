import type { MetadataRoute } from "next";

const BASE_URL = "https://marabu.services";
const LOCALES = ["fr", "en"];

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/apropos", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/actualites", priority: 0.8, changeFrequency: "weekly" as const },
];

async function fetchArticleIds(locale: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=1&limit=200&lang=${locale}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.articles ?? []).map((a: { id: string }) => a.id);
  } catch {
    return [];
  }
}

async function fetchProfileIds(locale: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/profiles?lang=${locale}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (Array.isArray(data) ? data : [])
      .filter((p: { isActive: boolean }) => p.isActive)
      .map((p: { id: string }) => p.id);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Pages statiques pour chaque langue
  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  // Articles dynamiques (FR uniquement — les EN sont les mêmes IDs)
  const articleIds = await fetchArticleIds("fr");
  for (const id of articleIds) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/actualites/${id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Profils équipe
  const profileIds = await fetchProfileIds("fr");
  for (const id of profileIds) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/equipes/${id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
