"use client";

import Load from "@/components/load";
import { useQuery } from "@tanstack/react-query";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("tous");
  const [currentPage, setCurrentPage] = useState(1);

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
      let url = `https://adminer.marabu.services/api/articles?page=${page}`;
      if (category && category !== "tous") {
        url += `&category=${category}`;
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
    queryKey: ["articlesbyMarabu", currentPage, activeTab],
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
        <div className="px-10 lg:max-w-[1350px] w-full mx-auto">
          <div className="text-center">
            <h2 className="uppercase">{translatedBlog.headingup}</h2>

            <h1 className="text-3xl font-semibold text-[#1D4851] tracking-wider">
              {translatedBlog.heading}
            </h1>

            <p className="mt-5 font-medium italic text-gray-400">
              {translatedBlog.subheading}
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mt-10 mb-10">
            <div className="flex justify-center space-x-4">
              {tabs.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-[#689D71]"
                      : "text-gray-500 hover:text-[#689D71]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#689D71] transform origin-left transition-transform duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              {/* backoffice */}
              {queryArticlesbyMarabu?.data?.articles &&
              queryArticlesbyMarabu?.data?.articles.length > 0 ? (
                queryArticlesbyMarabu.data.articles.map(
                  (el: any, idx: number) => (
                    <div
                      className="bg-white shadow hover:shadow-lg transition-shadow duration-300"
                      key={el?.id || idx}
                    >
                      <Link
                        href={`/actualites/${el?.id}`}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col h-full">
                          <div className="h-[380px] relative">
                            <Image
                              src={el?.featuredImage}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div className="px-4 mt-4 pb-3.5">
                              <h2 className="text-xs">
                                {new Date(
                                  el.publishedAt || el.createdAt
                                ).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </h2>
                              <h1 className="text-[#689D71] font-semibold mb-2">
                                {decodeHtmlEntities(el?.title)}
                              </h1>
                              {el?.excerpt && (
                                <p className="text-sm text-gray-600 line-clamp-3">
                                  {decodeHtmlEntities(el.excerpt)}
                                </p>
                              )}
                            </div>
                            <div className="bg-[#689D71] px-4 flex items-center justify-between">
                              <span className="text-sm text-white block">
                                {tabs.cta}
                              </span>
                              <div>
                                <MoveRight className="text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                )
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 text-lg">
                    Aucun article trouvé pour cette catégorie.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                {/* Bouton Précédent */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={
                    !pagination.hasPrev || queryArticlesbyMarabu.isLoading
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                    !pagination.hasPrev || queryArticlesbyMarabu.isLoading
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#689D71] text-white hover:bg-[#1D4851]"
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
                            className={`px-4 py-2 rounded-md transition-all duration-300 ${
                              currentPage === page
                                ? "bg-[#1D4851] text-white font-semibold"
                                : "bg-gray-100 text-[#1D4851] hover:bg-[#689D71] hover:text-white"
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                    !pagination.hasNext || queryArticlesbyMarabu.isLoading
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#689D71] text-white hover:bg-[#1D4851]"
                  }`}
                >
                  <span>Suivant</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Info de pagination */}
            {pagination && (
              <div className="mt-6 text-center text-sm text-gray-500">
                Page {pagination.currentPage} sur {pagination.totalPages} (
                {pagination.totalItems} article
                {pagination.totalItems > 1 ? "s" : ""})
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
