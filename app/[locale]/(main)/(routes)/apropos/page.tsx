"use client";

import { MoveRight, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "@/app/components/contact-form";

import Load from "@/components/load";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openContact, setOpenContact] = useState(false);

  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const t = useTranslations("apropos");

  const t2 = useTranslations("home");

  const t3 = useTranslations("contact");

  const translatedAbout = t.raw("about") as {
    headingup: string;
    heading: string;
    subheading: string;
    subheading2: string;
    heading2: string;

    lititle: string;
    lidescription: string;

    lititle2: string;
    lidescription2: string;

    lititle3: string;
    lidescription3: string;

    textdownn: string;

    cta: string;
  };

  const translatedMission = t.raw("mission") as {
    headingup: string;
    heading: string;
    subheading: string;
    subheading2: string;
  };

  const translatedTeam = t.raw("team") as {
    headingup: string;
    heading: string;
    subheading: string;
    teams: {
      id: string;
      name: string;
      params: string;
      role: string;
      image: string;
      social: {
        facebook: string;
        linkedin: string;
      };
      linkLinkedin: string;
    }[];
  };

  const translatedObjectif = t.raw("objectif") as {
    headingup: string;
    headingup2: string;

    subheading: string;

    step1: string;
    step2: string;
    step3: string;
    cta: string;
  };

  const translatedVisions = t.raw("visions") as {
    headingup: string;
    heading: string;
    subheading: string;
    subheading2: string;

    step1: string;
    step1value: string;
    step2: string;
    step2value: string;
    step3: string;
    step3value: string;
  };

  const translatedBoost = t2.raw("boost") as {
    heading: string;
    heading2: string;
    subheading1: string;
    subheading2: string;
    cta: string;
  };

  const translatedGrowth = t2.raw("growth") as {
    headingup: string;
    heading: string;
    subheading: string;
    statistics1: string;
    statistics2: string;
    statistics3: string;
    statistics4: string;
  };

  const translatedMagazine = t2.raw("magazine") as {
    headingup: string;
    heading: string;
    subheading: string;
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
    openingHoursText: string;
    openingHours1: string;
    subjectPlaceholder: string;
    openingHours2: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
  };

  const fetchProfilesbyMarabu = async () => {
    try {
      const res = await fetch(
        locale == "fr"
          ? `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/profiles?lang=fr`
          : `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/profiles?lang=en`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  };

  const queryProfilesbyMarabu = useQuery({
    queryKey: ["profilesbyMarabu", locale],
    queryFn: fetchProfilesbyMarabu,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const queryArticles = useQuery({
    queryKey: ["articles21"],
    queryFn: fetchArticles,
  });

  function decodeHtmlEntities(text: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  if (isLoading) {
    return <Load />;
  }

  return (
    <div className="font-light text-gray-500">
      <div className="h-40 bg-[#D9D9D9]"></div>
      {/* US */}

      <section className="py-20">
        <div className=" px-10   lg:max-w-[1350px]  w-full mx-auto ">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-full flex items-center"
            >
              <Image
                src="/persons/team-leaders.jpg"
                alt="La vision de Marabu"
                width={500}
                height={500}
                className="object-cover rounded-b-4xl rounded-tr-4xl w-full h-full"
                loading="lazy"
                quality={85}
              />
            </motion.div>
            <div className="flex flex-col justify-center h-full">
              <div className="">
                <motion.h2
                  variants={{
                    hidden: { x: -45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="uppercase "
                >
                  {translatedAbout.headingup}
                </motion.h2>
                <motion.h1
                  variants={{
                    hidden: { x: -45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-semibold text-[#1D4851] tracking-wider"
                >
                  {translatedAbout.heading}
                </motion.h1>
                <div>
                  <motion.p
                    variants={{
                      hidden: { x: -45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-3 text-justify"
                  >
                    {translatedAbout.subheading}
                  </motion.p>

                  <motion.p
                    variants={{
                      hidden: { x: -45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-3 text-justify"
                  >
                    {translatedAbout.subheading2}
                  </motion.p>
                  <motion.div
                    variants={{
                      hidden: { x: -45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-3 w-full"
                  >
                    <span className="font-bold text-[#1D4851]">
                      {translatedAbout.heading2}
                    </span>
                    <motion.ul
                      variants={{
                        hidden: { x: -45, opacity: 0 },
                        reveal: { x: 0, opacity: 1 },
                      }}
                      initial="hidden"
                      whileInView="reveal"
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="flex flex-col gap-2.5 mt-3 mb-2 w-full"
                    >
                      <li className="flex items-center gap-2 ">
                        <Image
                          width={20}
                          height={20}
                          src="/icons/check.svg"
                          alt="check"
                        />
                        <span className="">
                          <span className="font-semibold text-[#1D4851]">
                            {translatedAbout.lititle}
                          </span>
                          {translatedAbout.lidescription}
                        </span>
                      </li>

                      <li className="flex items-center gap-2">
                        <Image
                          width={20}
                          height={20}
                          src="/icons/check.svg"
                          alt="check"
                        />
                        <span className="w-full">
                          <span className="font-semibold text-[#1D4851]">
                            {translatedAbout.lititle2}
                          </span>
                          {translatedAbout.lidescription2}
                        </span>
                      </li>

                      <li className="flex items-center gap-2">
                        <Image
                          width={20}
                          height={20}
                          src="/icons/check.svg"
                          alt="check"
                        />
                        <span>
                          <span className="font-semibold text-[#1D4851]">
                            {translatedAbout.lititle3}
                          </span>
                          {translatedAbout.lidescription3}
                        </span>
                      </li>
                    </motion.ul>
                  </motion.div>
                </div>
                <div className="mt-3">
                  <h1>{translatedAbout.textdownn}</h1>
                </div>
                <div className="mt-4">
                  {/* <Link href="/apropos"> */}
                  <motion.span
                    variants={{
                      hidden: { x: 45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.5 }}
                    onClick={() => setOpenContact(true)}
                    className="inline-block py-2 px-4 bg-[#689D71] mt-4 font-semibold relative z-30 cursor-pointer text-white"
                  >
                    {translatedAbout.cta}
                  </motion.span>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ACCOMPLISSEMENT */}
      <section className="">
        <div className=" px-10  lg:max-w-[1350px]  w-full mx-auto ">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center h-full">
              <div className="">
                <motion.h2
                  variants={{
                    hidden: { x: -45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="uppercase "
                >
                  {translatedMission.headingup}
                </motion.h2>
                <motion.h1
                  variants={{
                    hidden: { x: -45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-semibold text-[#1D4851] tracking-wider"
                >
                  {translatedMission.heading}
                </motion.h1>
                <div>
                  <motion.p
                    variants={{
                      hidden: { x: -45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-3 text-justify"
                  >
                    {translatedMission.subheading}
                    <br />
                    <br />
                    {translatedMission.subheading2}
                  </motion.p>
                </div>
              </div>
            </div>

            <motion.div
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-full flex items-center"
            >
              <Image
                src="/persons/marabu-leaders.webp"
                alt="Les leaders de Marabu"
                width={550}
                height={550}
                className="object-cover rounded-b-4xl rounded-tr-4xl w-full h-full"
                loading="lazy"
                quality={85}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ÉQUIPE SECTION */}
      <section className="py-20">
        <div className="px-10 lg:max-w-[1350px] w-full mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              variants={{
                hidden: { y: 45, opacity: 0 },
                reveal: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="uppercase"
            >
              {translatedTeam.headingup}
            </motion.h2>
            <motion.h1
              variants={{
                hidden: { y: 45, opacity: 0 },
                reveal: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl font-semibold text-[#1D4851] tracking-wider"
            >
              {translatedTeam.heading}
            </motion.h1>
            <motion.p
              variants={{
                hidden: { y: 45, opacity: 0 },
                reveal: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-5"
            >
              {translatedTeam.subheading}
            </motion.p>
          </div>

          {queryProfilesbyMarabu.isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#689D71]"></div>
            </div>
          ) : queryProfilesbyMarabu.data &&
            Array.isArray(queryProfilesbyMarabu.data) &&
            queryProfilesbyMarabu.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-7">
              {queryProfilesbyMarabu.data
                .filter((profile: any) => profile.isActive)
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((profile: any, index: number) => (
                  <motion.div
                    key={profile.id}
                    variants={{
                      hidden: { y: 45, opacity: 0 },
                      reveal: { y: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                    className="bg-white shadow-lg rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <Link
                      href={`/equipes/${profile.id}`}
                      className="flex-1 group"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                          src={profile.photo || "/placeholder.jpg"}
                          alt={profile.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          quality={85}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                          <h3 className="text-white font-semibold text-lg line-clamp-1">
                            {profile.name}
                          </h3>
                          <p className="text-white/90 text-sm line-clamp-1">
                            {profile.title || "Membre de l'équipe"}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4 flex justify-center gap-4 mt-auto">
                      {profile.email && (
                        <a
                          href={`mailto:${profile.email}`}
                          className="p-2 rounded-full bg-[#689D71]/10 hover:bg-[#689D71]/20 text-[#689D71] transition-all duration-300 hover:scale-110"
                          title={profile.email}
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {profile.phone && (
                        <a
                          href={`tel:${profile.phone}`}
                          className="p-2 rounded-full bg-[#1D4851]/10 hover:bg-[#1D4851]/20 text-[#1D4851] transition-all duration-300 hover:scale-110"
                          title={profile.phone}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </a>
                      )}
                      {/* LinkedIn - si disponible dans les données futures */}
                      {profile.linkedin && (
                        <a
                          href={profile.linkedin}
                          className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all duration-300 hover:scale-110"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg font-medium">
                {locale === "fr"
                  ? "Aucun membre d'équipe disponible pour le moment."
                  : "No team members available at the moment."}
              </p>
            </div>
          )}
        </div>
      </section>
      {/* POURQUOI NOUS CHOISIR  */}
      <motion.section
        variants={{
          hidden: { opacity: 0 },
          reveal: { opacity: 1 },
        }}
        initial="hidden"
        whileInView="reveal"
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full h-full lg:h-[80vh] lg:bg-[url(/image/background_marabu.png)] bg-no-repeat bg-center bg-contain px-6 lg:max-w-[1350px] mx-auto mb-20"
      >
        <div className="h-full grid lg:grid-cols-2 place-items-center  gap-y-9">
          <div className="bg-[#1D4851] rounded-2xl py-16 px-5 md:px-10">
            <h1 className="text-white mb-6 text-2xl font-semibold">
              {translatedObjectif.headingup}
            </h1>

            <span className="block h-1 w-40 mb-6 rounded-full bg-[#EDF2D0]" />
            <p className="text-sm text-white mb-6 text-justify w-md">
              {translatedObjectif.subheading}
            </p>

            <div>
              <ul className="flex flex-col gap-10">
                <li className="flex items-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    src="/icons/check.svg"
                    alt="check icon"
                  />
                  <span className="text-sm text-white">
                    {translatedObjectif.step1}
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <Image width={20} height={20} src="/icons/check.svg" alt="" />
                  <span className="text-sm text-white">
                    {translatedObjectif.step2}
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    src="/icons/check.svg"
                    alt="check icon"
                  />
                  <span className="text-sm text-white">
                    {translatedObjectif.step3}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 ml-6">
              <button
                className="bg-white flex items-center gap-2 py-2 rounded-full px-2 font-semibold text-[#1D4851] cursor-pointer"
                onClick={() => setOpenContact(true)}
              >
                {translatedObjectif.cta}
                <Image
                  src="/icons/pluscircle.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain "
                />
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            {" "}
            {/* <Image
              src="/image/play.png"
              alt=""
              width={50}
              height={50}
              className="transition-all hover:scale-110"
            /> */}
          </div>
        </div>
      </motion.section>

      {/* Boostez */}

      <section>
        <div className="bg-[url(/image/booster_croissance_marabu.png)] w-full  bg-cover relative py-16 ">
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
              {translatedBoost.heading}
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
              {translatedBoost.subheading1}
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
            className="object-contain absolute right-20 top-0 z-40 hidden md:block"
          />
        </div>
      </section>

      {/* Objectif  */}
      <section className="py-20">
        <div className=" px-10   lg:max-w-[1350px]  w-full mx-auto ">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative place-items-center">
              <Image
                src="/persons/team-consultant.webp"
                alt="objectif image"
                width={650}
                height={550}
                className="object-cover rounded-b-4xl rounded-tr-4xl"
              />
            </div>
            <div>
              <div className="">
                <motion.h2
                  variants={{
                    hidden: { x: -45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="uppercase"
                >
                  {translatedVisions.headingup}
                </motion.h2>
                <motion.h1
                  variants={{
                    hidden: { x: -45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-semibold text-[#1D4851] tracking-wider"
                >
                  {translatedVisions.heading}
                </motion.h1>
                <div>
                  <motion.p
                    variants={{
                      hidden: { x: -45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-3 text-justify"
                  >
                    {translatedVisions.subheading}
                    <br />
                    <br />
                    {translatedVisions.subheading2}
                  </motion.p>
                </div>
                <div className="mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <motion.div
                      variants={{
                        hidden: { y: 45, opacity: 0 },
                        reveal: { y: 0, opacity: 1 },
                      }}
                      transition={{ duration: 0.5, delay: 0.3 }} // Déclenchement en séquence
                      initial="hidden"
                      whileInView="reveal"
                      className="w-full md:w-46 md:h-56 bg-white shadow-2xl rounded-2xl relative p-5"
                    >
                      <div className="absolute -top-3 -right-3 bg-[#1D4851] w-32 h-28  rounded-xl -z-10" />
                      <div className="absolute -bottom-3 -left-3  bg-[#1D4851] w-32 h-28  rounded-xl -z-10" />

                      <div>
                        <div
                          className="bg-[#1D4851] inline-block rounded-md p-2
                        "
                        >
                          <Image
                            src="/icons/ecoute_marabu.svg"
                            alt=""
                            width={30}
                            height={30}
                            className="object-contain"
                          />
                        </div>
                        <h1 className="text-sm font-semibold text-[#1D4851]">
                          {translatedVisions.step1}
                        </h1>

                        <p className="mt-3 text-sm">
                          {translatedVisions.step1value}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { y: 45, opacity: 0 },
                        reveal: { y: 0, opacity: 1 },
                      }}
                      transition={{ duration: 0.5, delay: 0.5 }} // Déclenchement en séquence
                      initial="hidden"
                      whileInView="reveal"
                      className="w-full md:w-46 md:h-56 bg-white shadow-2xl rounded-2xl relative p-5"
                    >
                      <div className="absolute -top-3 -right-3 bg-[#EDF2D0] w-32 h-28  rounded-xl -z-10"></div>
                      <div className="absolute -bottom-3 -left-3 bg-[#EDF2D0] w-32 h-28  rounded-xl -z-10"></div>

                      <div>
                        <div
                          className="bg-[#1D4851] inline-block rounded-md p-2
                        "
                        >
                          <Image
                            src="/icons/guide_marabu.svg"
                            alt=""
                            width={30}
                            height={30}
                            className="object-contain"
                          />
                        </div>
                        <h1 className="text-sm font-semibold text-[#1D4851]">
                          {translatedVisions.step2}
                        </h1>

                        <p className="mt-3 text-sm">
                          {translatedVisions.step2value}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { y: 45, opacity: 0 },
                        reveal: { y: 0, opacity: 1 },
                      }}
                      transition={{ duration: 0.5, delay: 0.7 }} // Déclenchement en séquence
                      initial="hidden"
                      whileInView="reveal"
                      className="w-full md:w-46 md:h-56 bg-white shadow-2xl rounded-2xl relative p-5"
                    >
                      <div className="absolute -top-3 -right-3 bg-[#1D4851] w-32 h-28  rounded-xl -z-10"></div>
                      <div className="absolute -bottom-3 -left-3 bg-[#1D4851] w-32 h-28  rounded-xl -z-10"></div>

                      <div>
                        <div
                          className="bg-[#1D4851] inline-block rounded-md p-2
                        "
                        >
                          <Image
                            src="/icons/meilleur_marabu.svg"
                            alt=""
                            width={30}
                            height={30}
                            className="object-contain"
                          />
                        </div>
                        <h1 className="text-sm font-semibold text-[#1D4851]">
                          {translatedVisions.step3}
                        </h1>

                        <p className="mt-3 text-sm">
                          {translatedVisions.step3value}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*   Notre Croissance  */}
      <section className="py-20 bg-[#1D4851] relative overflow-hidden">
        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={500}
          height={500}
          className="object-contain absolute left-0 -top-16 z-40"
          loading="lazy"
          quality={85}
        />

        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={500}
          height={500}
          className="object-contain absolute right-0 -top-16 z-40"
          loading="lazy"
          quality={85}
        />
        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={500}
          height={500}
          className="object-contain absolute right-72 -bottom-16 z-40 rotate-180"
          loading="lazy"
          quality={85}
        />

        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={500}
          height={500}
          className="object-contain absolute -left-96 -bottom-16 z-40 -rotate-90"
          loading="lazy"
          quality={85}
        />
        <div className=" px-10   lg:max-w-[1350px]  w-full mx-auto ">
          <div className="text-start ">
            <motion.h2
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white uppercase"
            >
              {translatedGrowth.headingup}
            </motion.h2>
            <motion.h1
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-3xl font-semibold text-white tracking-wider"
            >
              {translatedGrowth.heading}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-3 text-white"
            >
              {translatedGrowth.subheading}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 mt-11 gap-y-5">
            <div className="flex items-center justify-center flex-col">
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-white text-4xl lg:text-6xl font-bold"
              >
                +20
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-white uppercase"
              >
                {translatedGrowth.statistics1}
              </motion.p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-white text-4xl lg:text-6xl font-bold "
              >
                +100
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-white uppercase"
              >
                {translatedGrowth.statistics2}
              </motion.p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-white text-4xl lg:text-6xl font-bold"
              >
                +30
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-white uppercase"
              >
                {translatedGrowth.statistics3}
              </motion.p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 1 }}
                className="text-white text-4xl lg:text-6xl font-bold"
              >
                +45
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 1 }}
                className="text-white uppercase"
              >
                {translatedGrowth.statistics4}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* MAGAZINE SECTION   */}
      <section className="py-20">
        <div className=" px-10 lg:max-w-[1350px]  w-full mx-auto ">
          <div className="text-center">
            <motion.h2
              variants={{
                hidden: { y: 45, opacity: 0 },
                reveal: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="uppercase"
            >
              {translatedMagazine.headingup}
            </motion.h2>
            <motion.h1
              variants={{
                hidden: { y: 45, opacity: 0 },
                reveal: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl font-semibold text-[#1D4851] tracking-wider"
            >
              {translatedMagazine.heading}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { y: 45, opacity: 0 },
                reveal: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-5 font-medium italic text-gray-400"
            >
              {translatedMagazine.subheading}
            </motion.p>
          </div>

          <div className="mt-10">
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 
            "
            >
              {queryArticles?.data &&
                queryArticles?.data.slice(0, 3)?.map((el: any, idx: number) => (
                  <div className="bg-white shadow " key={idx}>
                    <Link
                      href={`/actualites/${el?.id}`}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col h-full">
                        {/* <div>
                          <Image
                            src={el?.acf?.large_image}
                            alt=""
                            width={400}
                            height={300}
                            className="object-contain"
                            loading="lazy"
                            quality={85}
                          />
                        </div> */}

                        <div className="h-[380px] relative">
                          <Image
                            src={el?.acf?.large_image}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1  flex flex-col justify-between">
                          <div className="px-4 mt-4 pb-3.5">
                            <h2 className="text-xs">
                              {new Date(el?.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </h2>
                            <h1 className="text-[#689D71] font-semibold">
                              {/* {el?.title?.rendered} */}
                              {decodeHtmlEntities(el?.title?.rendered)}
                            </h1>
                            <p className="text-sm">{el.desc}</p>
                          </div>
                          <div className="bg-[#689D71] px-4 flex items-center justify-between">
                            <span className="text-sm text-white block">
                              EN SAVOIR PLUS
                            </span>
                            <div>
                              <MoveRight className="text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Link href="/actualites">
              <motion.span
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5 }}
                className="inline-block py-2 px-4 bg-[#689D71] mt-4 font-semibold relative z-30 cursor-pointer text-white"
              >
                {translatedMagazine.cta}
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      <Sheet open={openContact} onOpenChange={setOpenContact}>
        <SheetContent className="w-[100vw] h-[100%] lg:w-3/4 py-8 overflow-y-auto overflow-x-hidden ">
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
                    {translatedContact.location1}
                    <br />
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                  <div className="lg:px-4 relative z-30">
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

<div className="w-56 h-60 bg-white shadow-2xl rounded-2xl relative">
  {/* Élément en arrière-plan */}
  <div className="absolute -top-10 -right-10 bg-[#1D4851] w-56 h-60 rounded-2xl -z-10"></div>
</div>;

export default Page;
