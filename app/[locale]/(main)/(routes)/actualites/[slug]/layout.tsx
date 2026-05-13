import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isFr = locale === "fr";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles/${slug}?lang=${locale}`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const article = await res.json();
      const title = article?.title
        ? `${article.title} | Marabu`
        : isFr
        ? "Article | Marabu"
        : "Article | Marabu";
      const description =
        article?.excerpt ||
        article?.description ||
        (isFr
          ? "Lisez cet article de Marabu sur le conseil et le développement des entreprises."
          : "Read this Marabu article on consulting and business development.");

      return {
        title,
        description,
        openGraph: {
          title: article?.title || "Article | Marabu",
          description,
          url: `https://marabu.services/${locale}/actualites/${slug}`,
          images: article?.featuredImage
            ? [{ url: article.featuredImage, width: 1200, height: 630 }]
            : [],
          type: "article",
        },
      };
    }
  } catch {
    // fallback ci-dessous
  }

  return {
    title: isFr ? "Article | Marabu" : "Article | Marabu",
    description: isFr
      ? "Lisez cet article de Marabu."
      : "Read this Marabu article.",
  };
}

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let articleSchema = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles/${slug}?lang=${locale}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const article = await res.json();
      articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article?.title,
        description: article?.excerpt,
        image: article?.featuredImage,
        datePublished: article?.publishedAt || article?.createdAt,
        dateModified: article?.updatedAt || article?.publishedAt,
        author: { "@type": "Organization", name: "Marabu Services" },
        publisher: {
          "@type": "Organization",
          name: "Marabu Services",
          logo: { "@type": "ImageObject", url: "https://marabu.services/logo.png" },
        },
        url: `https://marabu.services/${locale}/actualites/${slug}`,
      };
    }
  } catch {
    // schema optionnel, on ignore les erreurs
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {children}
    </>
  );
}
