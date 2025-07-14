import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
// import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

// Fonction pour générer les métadonnées selon la langue
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  let metadata;
  try {
    metadata = (await import(`../../messages/${locale}/metadata.json`)).default;
  } catch (error) {
    // Fallback vers le français si la traduction n'existe pas
    metadata = (await import(`../../messages/fr/metadata.json`)).default;
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      url: "https://marabu.services",
      siteName: metadata.openGraph.siteName,
      images: [
        {
          url: "https://marabu.services/image/og-image.jpg",
          width: 1200,
          height: 630,
          alt: metadata.openGraph.alt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.twitter.title,
      description: metadata.twitter.description,
      site: "@marabuservices",
      images: ["https://marabu.services/image/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}/home.json`)).default;
  } catch (error) {
    // notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
