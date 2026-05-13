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
      ? "Qui sommes-nous — L'équipe Marabu | Marabu Services"
      : "About Us — The Marabu Team | Marabu Services",
    description: isFr
      ? "Découvrez Marabu, cabinet de conseil stratégique et d'intermédiation en Afrique de l'Ouest. Notre équipe d'experts accompagne entreprises et institutions dans leur croissance."
      : "Discover Marabu, a strategic consulting and intermediation firm in West Africa. Our team of experts supports businesses and institutions in their growth.",
    openGraph: {
      title: isFr ? "Qui sommes-nous | Marabu" : "About Us | Marabu",
      description: isFr
        ? "Notre équipe d'experts accompagne votre croissance en Afrique de l'Ouest."
        : "Our team of experts supports your growth in West Africa.",
      url: `https://marabu.services/${locale}/apropos`,
    },
  };
}

export default function AproposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
