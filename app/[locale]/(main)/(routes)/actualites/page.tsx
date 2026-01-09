"use client";

import Load from "@/components/load";
import { useQuery } from "@tanstack/react-query";
import {
  MoveRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const [activeTab, setActiveTab] = useState("tous");
  const [currentPage, setCurrentPage] = useState(1);

  const params = useParams();

  // Pour récupérer dynamiquement la langue actuelle :
  const currentLocale = params?.locale ?? "fr"; // fallback au français

  // const locales = ["fr", "en"]; //

  const t = useTranslations("blog");
  const tabs = t.raw("tabsarticles") as {
    tabs: { id: string; label: string }[];
    cta: string;
  };

  const translatedBlog = t.raw("mm") as {
    headingup: string;
    heading: string;
    subheading: string;
    cta: string;
  };

  const fetchArticlesbyMarabu = async (page: number = 1, category?: string) => {
    try {
      let url =
        currentLocale == "fr"
          ? `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=${page}&lang=fr`
          : `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=${page}&lang=en`;
      if (category && category !== "tous") {
        url +=
          currentLocale == "fr"
            ? `&category=${category}&lang=fr`
            : `&category=${category}&lang=en`;
      }
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return { articles: [], pagination: null, categories: [] };
    }
  };

  const queryArticlesbyMarabu = useQuery({
    queryKey: ["articlesbyMarabu", currentPage, activeTab, currentLocale],
    queryFn: () => fetchArticlesbyMarabu(currentPage, activeTab),
  });

  function decodeHtmlEntities(text: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  // Réinitialiser à la page 1 quand on change de tab
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Réinitialiser à la page 1 quand on change de langue
  useEffect(() => {
    setCurrentPage(1);
  }, [currentLocale]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll vers la section des articles
    const articlesSection = document.querySelector("section.py-20");
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pagination = queryArticlesbyMarabu?.data?.pagination;

  if (queryArticlesbyMarabu.isLoading) {
    return <Load />;
  }

  // const tabs = [
  //   { id: "tous", label: "Tous les articles" },
  //   { id: "conseils", label: "Conseils" },
  //   { id: "intermediations", label: "Intermédiations" },
  //   { id: "services", label: "Services" },
  // ];

  return (
    <div className="font-light text-gray-500">
      <div className="h-40 bg-[#D9D9D9]"></div>

      <section className="py-20">
        <div className="px-6 md:px-10 lg:max-w-[1350px] w-full mx-auto">
          <div className="text-center mb-16">
            <h2 className="uppercase text-sm tracking-widest text-gray-500 mb-4">
              {translatedBlog.headingup}
            </h2>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1D4851] tracking-tight mb-6">
              {translatedBlog.heading}
            </h1>

            <p className="max-w-2xl mx-auto text-lg font-light text-gray-500 leading-relaxed">
              {translatedBlog.subheading}
            </p>
          </div>

          {/* Tabs Navigation - Style Magazine */}
          <div className="mt-12 mb-12">
            <div className="flex justify-center flex-wrap gap-3">
              {tabs.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? "text-[#689D71] border-[#689D71]"
                      : "text-gray-600 border-transparent hover:text-[#689D71] hover:border-[#689D71]/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            {queryArticlesbyMarabu?.data?.articles &&
            queryArticlesbyMarabu?.data?.articles.length > 0 ? (
              <>
                {/* Section Hero - Grand article + 2 petits */}
                <div className="grid lg:grid-cols-3 gap-6 mb-12">
                  {/* Grand article à gauche */}
                  {queryArticlesbyMarabu.data.articles[0] && (
                    <Link
                      href={`/actualites/${queryArticlesbyMarabu.data.articles[0]?.id}`}
                      className="lg:col-span-2 group"
                    >
                      <article className="relative h-[600px] rounded-lg overflow-hidden">
                        <Image
                          src={
                            queryArticlesbyMarabu.data.articles[0]
                              ?.featuredImage
                          }
                          alt={
                            decodeHtmlEntities(
                              queryArticlesbyMarabu.data.articles[0]?.title
                            ) || "Article image"
                          }
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay sombre */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                        {/* Badge jaune */}
                        <div className="absolute top-4 left-4 w-3 h-3 bg-[#FFD700] rounded-sm" />

                        {/* Contenu */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="flex items-center gap-3 mb-4 text-white/90 text-xs uppercase tracking-wider">
                            <User className="w-4 h-4" />
                            <span>MARABU</span>
                            <span>•</span>
                            <span>
                              {new Date(
                                queryArticlesbyMarabu.data.articles[0]
                                  ?.publishedAt ||
                                  queryArticlesbyMarabu.data.articles[0]
                                    ?.createdAt
                              ).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-3 group-hover:text-[#FFD700] transition-colors">
                            {decodeHtmlEntities(
                              queryArticlesbyMarabu.data.articles[0]?.title
                            )}
                          </h2>
                        </div>
                      </article>
                    </Link>
                  )}

                  {/* 2 petits articles à droite */}
                  <div className="space-y-6">
                    {queryArticlesbyMarabu.data.articles
                      .slice(1, 3)
                      .map((el: any, idx: number) => (
                        <Link
                          href={`/actualites/${el?.id}`}
                          key={el?.id || idx}
                          className="group block"
                        >
                          <article className="relative h-[290px] rounded-lg overflow-hidden">
                            <Image
                              src={el?.featuredImage}
                              alt={
                                decodeHtmlEntities(el?.title) || "Article image"
                              }
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Overlay sombre */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                            {/* Contenu */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <div className="flex items-center gap-2 mb-3 text-white/90 text-xs uppercase tracking-wider">
                                <User className="w-3 h-3" />
                                <span>MARABU</span>
                                <span>•</span>
                                <span>
                                  {new Date(
                                    el.publishedAt || el.createdAt
                                  ).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                                {decodeHtmlEntities(el?.title)}
                              </h3>
                            </div>
                          </article>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Grille d'articles secondaires */}
                {queryArticlesbyMarabu.data.articles.length > 3 && (
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {queryArticlesbyMarabu.data.articles
                      .slice(3, 6)
                      .map((el: any, idx: number) => (
                        <Link
                          href={`/actualites/${el?.id}`}
                          key={el?.id || idx}
                          className="group"
                        >
                          <article className="relative h-[350px] rounded-lg overflow-hidden">
                            <Image
                              src={el?.featuredImage}
                              alt={
                                decodeHtmlEntities(el?.title) || "Article image"
                              }
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                            />
                            {/* Overlay sombre */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                            {/* Badge jaune */}
                            <div className="absolute top-4 left-4 w-3 h-3 bg-[#FFD700] rounded-sm" />

                            {/* Contenu */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <div className="flex items-center gap-2 mb-3 text-white/90 text-xs uppercase tracking-wider">
                                <User className="w-3 h-3" />
                                <span>MARABU</span>
                                <span>•</span>
                                <span>
                                  {new Date(
                                    el.publishedAt || el.createdAt
                                  ).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                                {decodeHtmlEntities(el?.title)}
                              </h3>
                            </div>
                          </article>
                        </Link>
                      ))}
                  </div>
                )}

                {/* Section Editor's Picks */}
                {queryArticlesbyMarabu.data.articles.length > 6 && (
                  <div className="mb-12">
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                        {currentLocale == "fr"
                          ? "Explorez certains de nos articles préférés"
                          : "Explore some of our favorite articles"}
                      </p>
                      <h2 className="text-4xl font-bold text-[#1D4851]">
                        {currentLocale == "fr"
                          ? "Les articles de l'éditeur"
                          : "Editor's picks"}
                      </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Grand article à gauche */}
                      {queryArticlesbyMarabu.data.articles[6] && (
                        <Link
                          href={`/actualites/${queryArticlesbyMarabu.data.articles[6]?.id}`}
                          className="lg:col-span-2 group"
                        >
                          <article>
                            <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
                              <Image
                                src={
                                  queryArticlesbyMarabu.data.articles[6]
                                    ?.featuredImage
                                }
                                alt={
                                  decodeHtmlEntities(
                                    queryArticlesbyMarabu.data.articles[6]
                                      ?.title
                                  ) || "Article image"
                                }
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* Badge jaune */}
                              <div className="absolute top-4 left-4 w-3 h-3 bg-[#FFD700] rounded-sm" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1D4851] mb-3 group-hover:text-[#689D71] transition-colors line-clamp-2">
                              {decodeHtmlEntities(
                                queryArticlesbyMarabu.data.articles[6]?.title
                              )}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 uppercase tracking-wider">
                              <User className="w-3 h-3" />
                              <span>MARABU</span>
                              <span>•</span>
                              <span>
                                {new Date(
                                  queryArticlesbyMarabu.data.articles[6]
                                    ?.publishedAt ||
                                    queryArticlesbyMarabu.data.articles[6]
                                      ?.createdAt
                                ).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            {queryArticlesbyMarabu.data.articles[6]
                              ?.excerpt && (
                              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                {decodeHtmlEntities(
                                  queryArticlesbyMarabu.data.articles[6]
                                    ?.excerpt
                                )}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-[#689D71] font-semibold text-sm uppercase tracking-wide group-hover:gap-4 transition-all">
                              <span>Lire la suite</span>
                              <MoveRight className="w-4 h-4" />
                            </div>
                          </article>
                        </Link>
                      )}

                      {/* Liste verticale d'articles à droite */}
                      <div className="space-y-6">
                        {queryArticlesbyMarabu.data.articles
                          .slice(7, 10)
                          .map((el: any, idx: number) => (
                            <Link
                              href={`/actualites/${el?.id}`}
                              key={el?.id || idx}
                              className="group flex gap-4"
                            >
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={el?.featuredImage}
                                  alt={
                                    decodeHtmlEntities(el?.title) ||
                                    "Article image"
                                  }
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {idx === 2 && (
                                  <div className="absolute top-2 left-2 w-2 h-2 bg-[#FFD700] rounded-sm" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-base font-bold text-[#1D4851] mb-2 group-hover:text-[#689D71] transition-colors line-clamp-2">
                                  {decodeHtmlEntities(el?.title)}
                                </h4>
                                {el?.excerpt && (
                                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                    {decodeHtmlEntities(el.excerpt)}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                                  <span>
                                    {new Date(
                                      el.publishedAt || el.createdAt
                                    ).toLocaleDateString("fr-FR", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles restants en grille */}
                {queryArticlesbyMarabu.data.articles.length > 10 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {queryArticlesbyMarabu.data.articles
                      .slice(10)
                      .map((el: any, idx: number) => (
                        <Link
                          href={`/actualites/${el?.id}`}
                          key={el?.id || idx}
                          className="group"
                        >
                          <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#689D71]/30 hover:shadow-lg transition-all">
                            <div className="relative h-[250px] overflow-hidden">
                              <Image
                                src={el?.featuredImage}
                                alt={
                                  decodeHtmlEntities(el?.title) ||
                                  "Article image"
                                }
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                            <div className="p-6">
                              <h3 className="text-lg font-bold text-[#1D4851] mb-2 group-hover:text-[#689D71] transition-colors line-clamp-2">
                                {decodeHtmlEntities(el?.title)}
                              </h3>
                              {el?.excerpt && (
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                  {decodeHtmlEntities(el.excerpt)}
                                </p>
                              )}
                              <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                                <span>
                                  {new Date(
                                    el.publishedAt || el.createdAt
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
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">
                    Aucun article trouvé pour cette catégorie.
                  </p>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-3 flex-wrap">
                {/* Bouton Précédent */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={
                    !pagination.hasPrev || queryArticlesbyMarabu.isLoading
                  }
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                    !pagination.hasPrev || queryArticlesbyMarabu.isLoading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#689D71] text-white hover:bg-[#1D4851] hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Précédent</span>
                </button>

                {/* Numéros de page */}
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  )
                    .filter((page) => {
                      // Afficher la première page, la dernière page, la page courante et les pages adjacentes
                      return (
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, idx, array) => {
                      // Ajouter des ellipses si nécessaire
                      const showEllipsisBefore =
                        idx > 0 && array[idx - 1] < page - 1;
                      const showEllipsisAfter =
                        idx < array.length - 1 && array[idx + 1] > page + 1;

                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <span className="px-2 text-gray-500">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(page)}
                            disabled={queryArticlesbyMarabu.isLoading}
                            className={`min-w-[44px] px-4 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                              currentPage === page
                                ? "bg-[#1D4851] text-white font-bold shadow-lg scale-105"
                                : "bg-gray-100 text-[#1D4851] hover:bg-[#689D71] hover:text-white hover:shadow-md transform hover:-translate-y-0.5"
                            } ${
                              queryArticlesbyMarabu.isLoading
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                          >
                            {page}
                          </button>
                          {showEllipsisAfter && (
                            <span className="px-2 text-gray-500">...</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>

                {/* Bouton Suivant */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    !pagination.hasNext || queryArticlesbyMarabu.isLoading
                  }
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                    !pagination.hasNext || queryArticlesbyMarabu.isLoading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#689D71] text-white hover:bg-[#1D4851] hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  <span>Suivant</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Info de pagination */}
            {pagination && (
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 font-medium">
                  Page{" "}
                  <span className="text-[#689D71] font-bold">
                    {pagination.currentPage}
                  </span>{" "}
                  sur{" "}
                  <span className="text-[#1D4851] font-semibold">
                    {pagination.totalPages}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {pagination.totalItems} article
                  {pagination.totalItems > 1 ? "s" : ""} au total
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
