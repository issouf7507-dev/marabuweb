import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  let metadata;
  try {
    metadata = (await import(`../../messages/${locale}/metadata.json`)).default;
  } catch {
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
  } catch {
    messages = (await import(`../../messages/fr/home.json`)).default;
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Marabu Services",
    url: "https://marabu.services",
    logo: "https://marabu.services/logo.png",
    description:
      locale === "fr"
        ? "Cabinet de conseil stratégique et d'intermédiation spécialisé dans l'accompagnement des entreprises en Afrique de l'Ouest."
        : "Strategic consulting and intermediation firm specializing in supporting businesses in West Africa.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CI",
      addressLocality: "Abidjan",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2250720777000",
      contactType: "customer service",
      email: "contact@marabu.services",
    },
    sameAs: [
      "https://www.facebook.com/marabuservices",
      "https://www.linkedin.com/company/marabuservices",
      "https://www.instagram.com/marabuservices/",
      "https://x.com/marabuservices",
      "https://www.youtube.com/@Marabuservices",
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JZ18NLYGRV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JZ18NLYGRV');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
