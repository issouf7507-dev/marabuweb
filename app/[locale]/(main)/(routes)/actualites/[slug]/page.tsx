"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import ContactSheet from "@/app/components/contact-sheet";

import Load from "@/components/load";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { User, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const id = params?.slug as string | undefined;
  const [currentArticleIndex, setCurrentArticleIndex] = React.useState(0);
  const [openContact, setOpenContact] = useState(false);

  const currentLocaleData = locale === "fr" ? "fr-FR" : "en-US";
  // const currentLocale = params?.locale ?? "fr"; // fallback au français

  const t = useTranslations("blog");

  const t2 = useTranslations("home");

  const tabs = t.raw("tabsarticles") as {
    tabs: { id: string; label: string }[];
    cta: string;
    recent: string;
    next: string;
    previous: string;
    cta2: string;
  };

  const translatedBoost = t2.raw("boost") as {
    heading: string;
    heading2: string;
    subheading1: string;
    subheading2: string;
    cta: string;
  };

  const fetchArticlesbyMarabuById = async (id: string) => {
    try {
      const res = await fetch(
        locale == "fr"
          ? `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles/${id}?lang=fr`
          : `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles/${id}?lang=en`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return null;
    }
  };

  const fetchArticlesbyMarabu = async () => {
    try {
      const res = await fetch(
        locale == "fr"
          ? `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=1&limit=20&lang=fr`
          : `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=1&limit=20&lang=en`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return { articles: [], pagination: null };
    }
  };

  function decodeHtmlEntities(text: string) {
    if (typeof window === "undefined") return text;
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  const queryArticlesbyMarabuById = useQuery({
    queryKey: ["articlesbyidmarabu", id, locale],
    queryFn: () => fetchArticlesbyMarabuById(id ?? ""),
    enabled: !!id,
  });

  const queryArticles = useQuery({
    queryKey: ["articlesbyMarabuList", locale],
    queryFn: fetchArticlesbyMarabu,
  });

  const articles = queryArticles.data?.articles || [];
  const totalPages = articles.length;

  const handleNextArticle = () => {
    if (articles && currentArticleIndex < articles.length - 1) {
      const nextArticle = articles[currentArticleIndex + 1];
      router.push(`/${locale}/actualites/${nextArticle.id}`);
    }
  };

  const handlePrevArticle = () => {
    if (articles && currentArticleIndex > 0) {
      const prevArticle = articles[currentArticleIndex - 1];
      router.push(`/${locale}/actualites/${prevArticle.id}`);
    }
  };

  // Trouver l'index de l'article courant dans la liste complète
  useEffect(() => {
    if (articles && id) {
      const index = articles.findIndex((article: any) => article.id === id);
      if (index !== -1) {
        setCurrentArticleIndex(index);
      }
    }
  }, [articles, id, locale]);

  if (queryArticlesbyMarabuById.isPending) {
    return <Load />;
  }

  if (queryArticlesbyMarabuById.isError || !queryArticlesbyMarabuById.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        <h1 className="text-4xl font-bold text-[#1D4851] mb-4">
          {locale === "fr" ? "Article introuvable" : "Article not found"}
        </h1>
        <p className="text-gray-500 mb-8">
          {locale === "fr"
            ? "Cet article n'existe pas ou a été supprimé."
            : "This article does not exist or has been deleted."}
        </p>
        <a
          href={`/${locale}/actualites`}
          className="px-6 py-3 bg-[#689D71] text-white font-semibold rounded-lg hover:bg-[#1D4851] transition-colors"
        >
          {locale === "fr" ? "Voir tous les articles" : "See all articles"}
        </a>
      </div>
    );
  }

  return (
    <div className="font-light text-gray-500">
      {/* <div className="h-40 bg-[#D9D9D9]"></div> */}
      <section className="w-full relative">
        <motion.div
          className="w-full h-screen bg-no-repeat bg-cover bg-center flex items-end relative overflow-hidden"
          style={{
            backgroundImage: `url(${queryArticlesbyMarabuById.data?.featuredImage})`,
          }}
        >
          {/* Overlay gradient moderne */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10"></div>

          {/* Badge jaune style magazine */}
          <div className="absolute top-8 left-8 w-4 h-4 bg-[#FFD700] rounded-sm z-30"></div>

          <div className="px-6 md:px-10 lg:max-w-[1450px] w-full mx-auto pb-16 relative z-30">
            <div className="max-w-4xl">
              {/* Métadonnées style magazine */}
              <div className="flex items-center gap-3 mb-6 text-white/90 text-sm uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>MARABU</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(
                      queryArticlesbyMarabuById.data?.publishedAt ||
                        queryArticlesbyMarabuById.data?.createdAt
                    ).toLocaleDateString(currentLocaleData, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Titre */}
              <motion.h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight mb-8 leading-tight">
                <motion.span>
                  {decodeHtmlEntities(queryArticlesbyMarabuById.data?.title)}
                </motion.span>
              </motion.h1>

              {/* Navigation Controls modernisée */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={handlePrevArticle}
                  disabled={currentArticleIndex === 0 || articles.length === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    currentArticleIndex === 0 || articles.length === 0
                      ? "bg-white/20 text-white/50 cursor-not-allowed"
                      : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-semibold">{tabs.previous}</span>
                </button>
                <span className="text-white/80 text-sm font-medium px-4">
                  {currentArticleIndex + 1} / {totalPages}
                </span>
                <button
                  onClick={handleNextArticle}
                  disabled={
                    currentArticleIndex === articles.length - 1 ||
                    articles.length === 0
                  }
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    currentArticleIndex === articles.length - 1 ||
                    articles.length === 0
                      ? "bg-white/20 text-white/50 cursor-not-allowed"
                      : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <span className="font-semibold">{tabs.next}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid lg:grid-cols-4 lg:max-w-[1400px] w-full mx-auto z-40 relative py-12 px-6 md:px-10">
        <div className="lg:col-span-3">
          <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 md:px-12 py-10 md:py-16">
              <div
                className="prose prose-lg max-w-none text-[#1D4851] leading-relaxed
                  prose-headings:text-[#1D4851] prose-headings:font-bold
                  prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                  prose-p:text-lg prose-p:leading-8 prose-p:mb-6
                  prose-a:text-[#689D71] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#1D4851] prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6
                  prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6
                  prose-li:mb-2 prose-li:text-lg
                  prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                  prose-blockquote:border-l-4 prose-blockquote:border-[#689D71] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    queryArticlesbyMarabuById.data?.content ?? ""
                  ),
                }}
              />
            </div>
          </article>

          {/* CTA Button modernisé */}
          <div className="mt-8 flex items-center justify-center">
            <Link href="/solutions">
              <motion.button
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  reveal: { y: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#689D71] hover:bg-[#1D4851] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>{tabs.cta2}</span>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:col-span-1 px-4 w-full">
          <div className="sticky top-24 w-full">
            {/* Header de la sidebar */}
            <div className="mb-8 pb-4 border-b-2 border-[#689D71]">
              <h2 className="text-2xl font-bold text-[#1D4851] uppercase tracking-wider">
                {tabs.recent}
              </h2>
            </div>

            {/* Articles récents modernisés */}
            <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {articles
                .filter((article: any) => article.id !== id)
                .slice(0, 3)
                .map((article: any, idx: number) => (
                  <Link
                    href={`/actualites/${article.id}`}
                    key={article.id}
                    className="block group w-full"
                  >
                    <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#689D71]/50 hover:shadow-lg transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.featuredImage || "/placeholder.jpg"}
                          alt={decodeHtmlEntities(article.title)}
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          fill
                        />
                        {/* Overlay au survol */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Badge jaune sur le premier */}
                        {idx === 0 && (
                          <div className="absolute top-3 left-3 w-3 h-3 bg-[#FFD700] rounded-sm z-10" />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-bold text-[#1D4851] mb-2 group-hover:text-[#689D71] transition-colors line-clamp-2">
                          {decodeHtmlEntities(article.title)}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(
                              article.publishedAt || article.createdAt
                            ).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
            </div>

            {/* Navigation Controls modernisée */}
            {articles.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrevArticle}
                    disabled={currentArticleIndex === 0}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold ${
                      currentArticleIndex === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#689D71] text-white hover:bg-[#1D4851] hover:shadow-md"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{tabs.previous}</span>
                  </button>
                  <span className="text-[#1D4851] font-semibold text-sm px-3">
                    {currentArticleIndex + 1} / {totalPages}
                  </span>
                  <button
                    onClick={handleNextArticle}
                    disabled={currentArticleIndex === articles.length - 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold ${
                      currentArticleIndex === articles.length - 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#689D71] text-white hover:bg-[#1D4851] hover:shadow-md"
                    }`}
                  >
                    <span>{tabs.next}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[url(/image/booster_croissance_marabu.png)] w-full  bg-cover  relative py-16 ">
          <div className="bg-[#0000006b] absolute w-full h-full top-0 left-0 z-10"></div>
          <div className="px-10  lg:max-w-[1350px] w-full mx-auto z-40 relative ">
            <motion.h1
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-white text-2xl md:text-[51px] tracking-wider font-bold"
            >
              {translatedBoost.heading} <br /> {translatedBoost.heading2}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-3 md:mt-9 text-white text-sm md:text-base"
            >
              {translatedBoost.subheading1} <br /> {translatedBoost.subheading2}
            </motion.p>

            <div className="mt-4">
              <motion.button
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white flex items-center gap-2 py-2 rounded-full px-2 font-semibold text-[#1D4851] cursor-pointer"
                onClick={() => setOpenContact(true)}
              >
                {translatedBoost.cta}
                <Image
                  src="/pluscircle.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain "
                />
              </motion.button>
            </div>
          </div>
          <Image
            src="/boostvector.png"
            alt=""
            width={600}
            height={600}
            className="object-contain absolute right-20 top-0 z-40"
          />
        </div>
      </section>

      <ContactSheet open={openContact} onOpenChange={setOpenContact} />
    </div>
  );
};

export default Page;
// a
