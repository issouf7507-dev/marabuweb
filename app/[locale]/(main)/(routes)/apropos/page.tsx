"use client";

import { MoveRight, Linkedin, Mail, Facebook } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ContactSheet from "@/app/components/contact-sheet";
import { useParams } from "next/navigation";

const Page = () => {
  const [openContact, setOpenContact] = useState(false);

  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const t = useTranslations("apropos");

  const t2 = useTranslations("home");

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
    value1: string;
    value2: string;
    value3: string;
    value4: string;
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

  function decodeHtmlEntities(text: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
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
                  <p>{translatedAbout.textdownn}</p>
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
                          className="p-2 rounded-full hover:bg-[#689D71]/20 text-[#689D71] transition-all duration-300 hover:scale-110"
                          title={profile.email}
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {profile.phone && (
                        <a
                          href={`tel:${profile.phone}`}
                          className="p-2 rounded-full hover:bg-[#689D71]/20 text-[#689D71] transition-all duration-300 hover:scale-110"
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
                      {profile.linkedinUrl && (
                        <a
                          href={profile.linkedinUrl}
                          className="p-2 rounded-full hover:bg-[#689D71]/20 text-[#689D71] transition-all duration-300 hover:scale-110"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profile.facebookUrl && (
                        <a
                          href={profile.facebookUrl}
                          className="p-2 rounded-full hover:bg-[#689D71]/20 text-[#689D71] transition-all duration-300 hover:scale-110"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                        >
                          <Facebook className="w-5 h-5" />
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
        <span aria-hidden="true" className="absolute left-0 -top-16 z-40 w-[500px] h-[500px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat" />
        <span aria-hidden="true" className="absolute right-0 -top-16 z-40 w-[500px] h-[500px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat" />
        <span aria-hidden="true" className="absolute right-72 -bottom-16 z-40 w-[500px] h-[500px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat rotate-180" />
        <span aria-hidden="true" className="absolute -left-96 -bottom-16 z-40 w-[500px] h-[500px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat -rotate-90" />
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
                {translatedGrowth.value1}
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
                {translatedGrowth.value2}
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
                {translatedGrowth.value3}
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
                {translatedGrowth.value4}
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

          <div className="mt-10 flex justify-center">
            <Link href="/actualites">
              <motion.span
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  reveal: { y: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 py-3 px-6 bg-[#689D71] hover:bg-[#1D4851] transition-colors font-semibold text-white rounded-lg"
              >
                {translatedMagazine.cta}
                <MoveRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </div>

        </div>
      </section>

      <ContactSheet open={openContact} onOpenChange={setOpenContact} />
    </div>
  );
};

export default Page;
