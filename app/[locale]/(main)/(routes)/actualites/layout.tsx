import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Actualités & Magazine — Insights Marabu | Marabu Services"
      : "News & Magazine — Marabu Insights | Marabu Services",
    description: isFr
      ? "Restez informé avec les dernières actualités, analyses et insights de Marabu sur le conseil, les services et le développement des entreprises en Afrique de l'Ouest."
      : "Stay informed with the latest news, analysis and insights from Marabu on consulting, services and business development in West Africa.",
    openGraph: {
      title: isFr ? "Actualités Marabu" : "Marabu News",
      description: isFr
        ? "Les dernières actualités et analyses de Marabu."
        : "The latest news and analysis from Marabu.",
      url: `https://marabu.services/${locale}/actualites`,
    },
  };
}

export default function ActualitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
