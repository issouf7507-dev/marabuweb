"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useParams } from "next/navigation";

import Load from "@/components/load";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "@/app/components/contact-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { User, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const Page = () => {
  const pathname = usePathname();

  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const id = pathname.split("/").pop();
  const [currentArticleIndex, setCurrentArticleIndex] = React.useState(0);
  const [openContact, setOpenContact] = useState(false);

  const currentLocaleData = locale === "fr" ? "fr-FR" : "en-US";
  // const currentLocale = params?.locale ?? "fr"; // fallback au français

  const t = useTranslations("blog");

  const t2 = useTranslations("home");
  const t3 = useTranslations("contact");

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

  const translatedContact = t3.raw("sheet") as {
    heading: string;
    subheading: string;
    telText: string;
    telNumber: string;
    emailText: string;
    email: string;
    locationText: string;
    location1: string;
    location2: string;
    subjectPlaceholder: string;
    openingHoursText: string;
    openingHours1: string;
    openingHours2: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
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
          ? `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=1&limit=100&lang=fr`
          : `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=1&limit=100&lang=en`
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
                  __html:
                    queryArticlesbyMarabuById.data &&
                    queryArticlesbyMarabuById.data?.content,
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

      <Sheet open={openContact} onOpenChange={setOpenContact}>
        <SheetContent className="w-screen h-screen lg:w-3/4 py-8 overflow-y-auto overflow-x-hidden">
          <SheetHeader>
            <SheetTitle className="text-center">
              {translatedContact.heading}
            </SheetTitle>
            <SheetDescription className="text-center">
              {translatedContact.subheading}
            </SheetDescription>
          </SheetHeader>

          <Image
            src="/image/coris.png"
            alt=""
            width={400}
            height={400}
            className="absolute top-0 left-0"
          />

          <Image
            src="/image/coris.png"
            alt=""
            width={400}
            height={400}
            className="absolute top-0 right-0 rotate-90"
          />

          <Image
            src="/image/coris.png"
            alt=""
            width={300}
            height={300}
            className="absolute top-0 right-[30%] -rotate-45 -translate-x-1/2"
          />

          <div className="mx-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
              <Card className="relative z-30">
                <CardHeader className="flex items-center justify-center flex-col">
                  <CardTitle className="h-10">
                    <Image width={24} height={24} src="/phoneicon.png" alt="" />
                  </CardTitle>
                  <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                    {translatedContact.telText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href="tel:+2250720777000"
                    className="text-center text-[14px] block hover:text-[#1D4851] transition-colors cursor-pointer font-semibold"
                  >
                    {translatedContact.telNumber}
                  </Link>
                </CardContent>
              </Card>
              <Card className="relative z-30">
                <CardHeader className="flex items-center justify-center flex-col">
                  <CardTitle className="h-10">
                    <Image width={24} height={24} src="/sendicon.png" alt="" />
                  </CardTitle>
                  <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                    {translatedContact.emailText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <p className="text-center text-[14px]">
                   */}
                  <Link
                    href="mailto:contact@marabu.services"
                    className="text-center text-[14px] block hover:text-[#1D4851] transition-colors cursor-pointer font-semibold"
                  >
                    {translatedContact.email}
                  </Link>
                </CardContent>
              </Card>
              <Card className="relative z-30">
                <CardHeader className="flex items-center justify-center flex-col">
                  <CardTitle className="h-10">
                    <Image
                      width={24}
                      height={24}
                      src="/localisationicon.png"
                      alt=""
                    />
                  </CardTitle>
                  <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                    {translatedContact.locationText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    className="text-center text-[14px] block hover:text-[#1D4851] transition-colors cursor-pointer font-semibold"
                    href="https://www.google.ci/maps/place/Marabu/@5.3438891,-4.0126815,19z/data=!4m14!1m7!3m6!1s0xfc1eb0c78647443:0xb23bdc45be977419!2sPharmacie+du+Lyc%C3%A9e+Technique!8m2!3d5.3442276!4d-4.0114595!16s%2Fg%2F113fj5416!3m5!1s0xfc1eb65b2414379:0x1a1b717d3b74873f!8m2!3d5.3442708!4d-4.0120909!16s%2Fg%2F11y1xrw2cv?hl=fr&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                  >
                    {translatedContact.location1} <br />
                    {translatedContact.location2}
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-center flex-col">
                  <CardTitle className="h-10">
                    <Image
                      width={24}
                      height={24}
                      src="/horlogeicon.png"
                      alt=""
                    />
                  </CardTitle>
                  <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                    {translatedContact.openingHoursText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-[14px]">
                    {translatedContact.openingHours1}
                  </p>
                  <p className="text-center text-[14px]">
                    {translatedContact.openingHours2}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="w-full h-full mt-24">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4746952966943!2d-4.014665825016398!3d5.344270794634366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb65b2414379%3A0x1a1b717d3b74873f!2sMarabu!5e0!3m2!1sen!2sci!4v1744293171315!5m2!1sen!2sci"
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div>
                  <div className="px-4">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/image/coris.png"
              alt=""
              width={300}
              height={300}
              className="absolute -bottom-10 right-[30%] -rotate-45 -translate-x-1/2"
            />

            <Image
              src="/image/coris.png"
              alt=""
              width={400}
              height={400}
              className="absolute -bottom-10 right-0 "
            />

            <Image
              src="/image/Ellipse.png"
              alt=""
              width={400}
              height={400}
              className="absolute -bottom-80 left-0 rotate-180"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Page;
// a
