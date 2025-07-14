"use client";

import Load from "@/components/load";
import { DataItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("tous");

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

  const fetchArticles = async () => {
    try {
      const res = await fetch(
        "https://main.marabu.services/wp-json/wp/v2/articles?acf_format=standard&_fields=id,title,acf,date,date_gmt,categorie&per_page=100"
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  };

  const queryArticles = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  // console.log(queryArticles.data);

  function decodeHtmlEntities(text: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  const filterArticles = (articles: any[]) => {
    if (activeTab === "tous") return articles;
    return articles.filter(
      (article) =>
        article.acf?.categorie?.name?.toLowerCase() === activeTab.toLowerCase()
    );
  };

  if (queryArticles.isLoading) {
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
              {queryArticles?.data &&
                filterArticles(queryArticles.data).map(
                  (el: any, idx: number) => (
                    <div
                      className="bg-white shadow hover:shadow-lg transition-shadow duration-300"
                      key={idx}
                    >
                      <Link
                        href={`/actualites/${el?.id}`}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col h-full">
                          <div className="h-[380px] relative">
                            <Image
                              src={el?.acf?.large_image}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div className="px-4 mt-4 pb-3.5">
                              <h2 className="text-xs">
                                {new Date(el.date).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </h2>
                              <h1 className="text-[#689D71] font-semibold">
                                {decodeHtmlEntities(el?.title?.rendered)}
                              </h1>
                              {/* <p className="text-sm">{el.desc}</p> */}
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
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
