"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import Load from "@/components/load";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop();
  const [currentArticleIndex, setCurrentArticleIndex] = React.useState(0);
  const [openContact, setOpenContact] = useState(false);
  const articlesPerPage = 3;

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

  const fetchArticles = async () => {
    try {
      const res = await fetch(
        "https://main.marabu.services/wp-json/wp/v2/articles?acf_format=standard&_fields=id,title,acf,date,date_gmt"
      );
      const data = await res.json(); // Lire la réponse brute

      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  };

  const fetchArticlesById = async (id: number) => {
    try {
      const res = await fetch(
        `https://main.marabu.services/wp-json/wp/v2/articles/${id}?acf_format=standard&_fields=id,title,acf,date,date_gmt`
      );
      const data = await res.json(); // Lire la réponse brute

      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  };

  const fetchArticlesbyMarabuById = async (id: string) => {
    try {
      const res = await fetch(
        `https://adminer.marabu.services/api/articles/${id}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  };

  function decodeHtmlEntities(text: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  const queryArticlesById = useQuery({
    queryKey: ["articlesbyid"],
    queryFn: () => fetchArticlesById(parseInt(id ?? "0") as number),
  });

  const queryArticlesbyMarabuById = useQuery({
    queryKey: ["articlesbyidmarabu"],
    queryFn: () => fetchArticlesbyMarabuById(id ?? "Mzd8NWEwYg"),
  });

  console.log(queryArticlesbyMarabuById.data);

  const queryArticles = useQuery({
    queryKey: ["articles2"],
    queryFn: fetchArticles,
  });

  const totalPages = Math.ceil(
    (queryArticles.data?.length || 0) / articlesPerPage
  );

  const handleNextArticle = () => {
    if (
      queryArticles.data &&
      currentArticleIndex < queryArticles.data.length - 1
    ) {
      const nextArticle = queryArticles.data[currentArticleIndex + 1];
      router.push(`/actualites/${nextArticle.id}`);
    }
  };

  const handlePrevArticle = () => {
    if (queryArticles.data && currentArticleIndex > 0) {
      const prevArticle = queryArticles.data[currentArticleIndex - 1];
      router.push(`/actualites/${prevArticle.id}`);
    }
  };

  // Trouver l'index de l'article courant dans la liste complète
  React.useEffect(() => {
    if (queryArticles.data && id) {
      const index = queryArticles.data.findIndex(
        (article: any) => article.id === parseInt(id)
      );
      if (index !== -1) {
        setCurrentArticleIndex(index);
      }
    }
  }, [queryArticles.data, id]);

  if (queryArticlesById.isPending) {
    return <Load />;
  }

  return (
    <div className="font-light text-gray-500">
      {/* <div className="h-40 bg-[#D9D9D9]"></div> */}
      <section className="w-full ">
        <motion.div
          className="w-full h-screen bg-no-repeat bg-cover bg-center flex items-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${queryArticlesbyMarabuById.data?.featuredImage})`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] z-10"></div>
          <div className="px-10  lg:max-w-[1450px] w-full mx-auto flex justify-between items-center">
            <div>
              <motion.h1 className="text-4xl md:text-7xl text-[#EDF2D0] font-bold tracking-wider relative z-30">
                <motion.span>
                  {decodeHtmlEntities(queryArticlesbyMarabuById.data?.title)}
                </motion.span>
              </motion.h1>

              <p className="text-lg font-bold text-[#EDF2D0]  mt-4 relative z-30">
                {new Date(
                  queryArticlesbyMarabuById.data?.createdAt
                ).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-4 z-30">
              <button
                onClick={handlePrevArticle}
                disabled={currentArticleIndex === 0}
                className={`p-4 rounded-full ${
                  currentArticleIndex === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#689D71] text-white hover:bg-[#1D4851]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={handleNextArticle}
                disabled={
                  currentArticleIndex === (queryArticles.data?.length || 0) - 1
                }
                className={`p-4 rounded-full ${
                  currentArticleIndex === (queryArticles.data?.length || 0) - 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#689D71] text-white hover:bg-[#1D4851]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid lg:grid-cols-4 lg:max-w-[1400px] w-full mx-auto z-40 relative py-10">
        <div className="lg:col-span-3 ">
          <div className="px-4 lg:px-10  w-full mx-auto z-40 relative py-10 border border-[#1b8398] ">
            <div
              className="text-lg text-[#1D4851] h-svh overflow-auto"
              dangerouslySetInnerHTML={{
                __html:
                  queryArticlesbyMarabuById.data &&
                  queryArticlesbyMarabuById.data?.content,
              }}
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Link href="/solutions">
              <motion.span
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5 }}
                className="inline-block py-2 px-10 bg-[#689D71] mt-4 font-semibold relative z-30 cursor-pointer text-white"
              >
                {tabs.cta2}
              </motion.span>
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:col-span-1 px-4  w-full">
          <div className="sticky top-24 w-full">
            <h2 className="text-xl font-semibold text-[#1D4851] mb-6">
              {tabs.recent}
            </h2>
            <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {/* {currentArticles?.map((article: any) => ( */}
              {queryArticles.data?.slice(0, 3).map((article: any) => (
                <Link
                  href={`/actualites/${article.id}`}
                  key={article.id}
                  className="block group w-full"
                >
                  <div className="relative h-40 mb-2 overflow-hidden rounded-lg w-full">
                    <Image
                      src={article.acf?.large_image || "/placeholder.jpg"}
                      alt={article.title?.rendered}
                      className="object-cover  transition-transform duration-300 group-hover:scale-110"
                      fill
                    />
                  </div>
                  <h3 className="text-[#1D4851] font-medium group-hover:text-[#689D71] transition-colors">
                    {decodeHtmlEntities(article.title?.rendered)}
                  </h3>
                  <p className="text-sm text-gray-950 mt-1">
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handlePrevArticle}
                disabled={currentArticleIndex === 0}
                className={`px-4 py-2 rounded-md ${
                  currentArticleIndex === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#689D71] text-white hover:bg-[#1D4851]"
                }`}
              >
                {tabs.previous}
              </button>
              <span className="text-[#1D4851]">
                Page {currentArticleIndex + 1} sur {totalPages}
              </span>
              <button
                onClick={handleNextArticle}
                disabled={
                  currentArticleIndex === (queryArticles.data?.length || 0) - 1
                }
                className={`px-4 py-2 rounded-md ${
                  currentArticleIndex === (queryArticles.data?.length || 0) - 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#689D71] text-white hover:bg-[#1D4851]"
                }`}
              >
                {tabs.next}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10  w-full mx-auto z-40 relative  py-10">
        <div className="grid grid-cols-2 gap-10">
          <div
            className="text-sm text-[#1D4851]"
            dangerouslySetInnerHTML={{
              __html:
                // decodeHtmlEntities(
                queryArticlesById.data &&
                queryArticlesById.data?.acf?.sammury_1,
              // ),
            }}
          />
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
        <SheetContent className="w-[100vw] h-[100vh] lg:w-3/4 py-8 overflow-y-auto overflow-x-hidden">
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
                  <div className="flex flex-col gap-4 px-4">
                    <Input
                      type="text"
                      placeholder={translatedContact.namePlaceholder}
                      className="w-full h-12"
                    />
                    <Input
                      type="email"
                      placeholder={translatedContact.emailPlaceholder}
                      className="w-full h-12"
                    />
                    <Input
                      type="text"
                      placeholder={translatedContact.subjectPlaceholder}
                      className="w-full h-12"
                    />
                    <Textarea
                      placeholder={translatedContact.messagePlaceholder}
                      // rows={9}
                      className="resize-none h-48"

                      // maxLength={1000}
                    />
                  </div>
                  <div className="px-4 mt-8 flex items-end ">
                    <Button className=" h-8 rounded-full hover:bg-[#1D4851] hover:text-white cursor-pointer bg-[#EDF2D0] text-[#1D4851]">
                      {translatedContact.sendButton}
                    </Button>
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
