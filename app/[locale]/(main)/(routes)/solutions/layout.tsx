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
      ? "Nos Solutions — Conseil, Services & Intermédiation | Marabu"
      : "Our Solutions — Consulting, Services & Intermediation | Marabu",
    description: isFr
      ? "Découvrez les solutions de Marabu : conseil stratégique, services opérationnels et intermédiation pour accompagner la croissance des entreprises en Afrique de l'Ouest."
      : "Discover Marabu's solutions: strategic consulting, operational services and intermediation to support business growth in West Africa.",
    openGraph: {
      title: isFr
        ? "Nos Solutions | Marabu"
        : "Our Solutions | Marabu",
      description: isFr
        ? "Conseil, Services et Intermédiation par Marabu en Afrique de l'Ouest."
        : "Consulting, Services and Intermediation by Marabu in West Africa.",
      url: `https://marabu.services/${locale}/solutions`,
    },
  };
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
