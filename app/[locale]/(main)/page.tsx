"use client";
import { CircleChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import splitStringUsing from "@/utils/splitStringRegex";
import { useEffect, useState } from "react";
import { experience, logosSlide, servicesData, slides } from "@/data/data";
import Link from "next/link";
import Load from "@/components/load";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const t = useTranslations("home");
  const t2 = useTranslations("contact");

  // Récupérer toutes les slides traduites
  const translatedSlides = t.raw("slider") as {
    heading: string;
    subheading: string;
    cta: string;
  }[];

  const translatedSolutions = t.raw("solutions") as {
    headingup: string;
    heading: string;
    subheading: string;
    cta1: string;
    cardservices: {
      id: number;
      title: string;
      description: string;
    }[];
    cta2: string;
  };

  const translatedContact = t2.raw("sheet") as {
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

  const translatedCardServices = t.raw("solutions.cardservices") as {
    id: number;
    title: string;
    description: string;
  }[];

  const translatedPartners = t.raw("partners") as {
    headingup: string;
    heading: string;
    heading2: string;

    subheading1: string;
    subheading2: string;
  };

  const translatedUs = t.raw("us") as {
    headingup: string;
    heading: string;
    subheading1: string;
    subheading2: string;
    subheading3: string;
    lititle: string;
    lidescription: string;
    lititle2: string;
    lidescription2: string;
    lititle3: string;
    lidescription3: string;
    textdownn: string;
    cta: string;
  };

  const translatedExpertise = t.raw("expertise") as {
    headingup: string;
    heading: string;
    subheading: string;
    experience: {
      id: number;
      step: string;
      title: string;
      desc: string;
      icons: string;
      alt: string;
    }[];
  };

  const translatedBoost = t.raw("boost") as {
    heading: string;
    heading2: string;
    subheading1: string;
    subheading2: string;
    cta: string;
  };

  const translatedClients = t.raw("clients") as {
    headingup: string;
    heading1: string;
    heading2: string;
    clients1: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
    clients2: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
    clients3: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
    clients4: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
    clients5: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
    clients6: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
    clients7: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
    clients8: {
      id: number;
      name: string;
      comment: string;
      image: string;
      alt: string;
      position1: string;
      position2: string;
    }[];
  };

  const translatedGrowth = t.raw("growth") as {
    headingup: string;
    heading: string;
    subheading: string;
    statistics1: string;
    statistics2: string;
    statistics3: string;
    statistics4: string;
  };

  const translatedMagazine = t.raw("magazine") as {
    headingup: string;
    heading: string;
    subheading: string;
    cta: string;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [openContact, setOpenContact] = useState(false);
  const [openYoutube, setOpenYoutube] = useState(false);
  const [index, setIndex] = useState(0);

  const currentSlide = translatedSlides[index];
  const headingAnimed = splitStringUsing(currentSlide?.heading);
  const subheadingAnimed = splitStringUsing(currentSlide?.subheading);
  const cta = currentSlide?.cta;

  const fetchArticlesbyMarabu = async () => {
    try {
      const res = await fetch("https://adminer.marabu.services/api/articles");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  };

  const queryArticlesbyMarabu = useQuery({
    queryKey: ["articlesbyMarabu"],
    queryFn: fetchArticlesbyMarabu,
  });

  // console.log(queryArticlesbyMarabu?.data);
  const fetchArticles = async () => {
    try {
      // c est
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Load />
      </div>
    );
  }

  return (
    <div className="w-full font-light text-gray-500">
      {/* HERO SECTION */}
      <section className="w-full">
        <div className="w-full h-screen relative flex items-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slides[index].image}
              alt={slides[index].alt}
              fill
              priority // très important pour la première image
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* s */}
          {/* Overlay sombre */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#000000b4] z-10"></div>

          {/* Contenu principal */}
          <div className="px-10 lg:max-w-[1350px] w-full mx-auto relative z-20">
            <motion.h1
              className="text-4xl md:text-7xl text-[#EDF2D0] font-bold tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {headingAnimed}
            </motion.h1>

            <motion.p
              key={slides[index].subheading}
              className="text-[#EDF2D0] mt-4 text-[14px] md:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subheadingAnimed}
            </motion.p>

            <Link href={slides[index].buttonLink}>
              <motion.span
                className="inline-block py-2 px-4 bg-[#EDF2D0] mt-4 font-semibold"
                style={{ cursor: "pointer" }}
              >
                {cta}
              </motion.span>
            </Link>
          </div>

          <div className="w-[350px] h-40 bg-[url(/marabu-introduction-bg.png)] absolute right-20 bottom-10 rounded-2xl items-center justify-center cursor-pointer md:flex hidden z-40">
            <Dialog open={openYoutube} onOpenChange={setOpenYoutube}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Image
                    src="/image/marabu_play_icon.png"
                    alt="play button"
                    width={50}
                    height={50}
                    className="transition-all hover:scale-110"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0">
                <DialogTitle className="sr-only">Video Player</DialogTitle>
                <iframe
                  width="100%"
                  height="450"
                  src="https://www.youtube.com/embed/Jh2rcLx4a8M"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative mt-14 pb-10">
        <div className="flex justify-center items-center w-full h-full ">
          <div className="px-10 lg:max-w-[1350px] w-full mx-auto ">
            <div className="">
              <motion.h2
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.4 }}
                className="uppercase text-xs"
              >
                {translatedSolutions.headingup}
              </motion.h2>
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-3xl font-semibold text-[#1D4851] tracking-wider"
                dangerouslySetInnerHTML={{
                  __html: translatedSolutions.heading,
                }}
              >
                {/* {translatedSolutions.heading} */}
              </motion.h1>

              <div className="flex flex-col items-start justify-between xl:flex-row">
                <motion.p
                  className="mt-3"
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {translatedSolutions.subheading}
                </motion.p>

                {/* <motion.div className="bg-[#689D71] flex items-center gap-2 rounded-full pr-2 mt-3 xl:mt-0 cursor-pointer relative z-30">
                  <span
                    className="block bg-[#1D4851] rounded-full py-2 px-3 text-white text-[14px] font-semibold "
                    onClick={() => setOpenContact(true)}
                  >
                    {translatedSolutions.cta1}
                  </span>
                  <Image
                    src="/image/plus.png"
                    alt="plus button"
                    width={25}
                    height={25}
                    className="transition-all hover:scale-110"
                  />
                </motion.div> */}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 w-full  place-items-center mt-16">
                {translatedCardServices.map((el, index) => (
                  <Link
                    href={`/solutions#${
                      el.id === 1
                        ? "conseil"
                        : el.id === 2
                        ? "services"
                        : "intermediation"
                    }`}
                    key={el.id}
                  >
                    <motion.div
                      className={`shadow-xl rounded-xl py-12  w-[342px] h-[480px] ${
                        el.id == 2 ? "bg-[#689D71]" : "bg-white"
                      }`}
                      variants={{
                        hidden: { y: 45, opacity: 0 },
                        reveal: { y: 0, opacity: 1 },
                      }}
                      transition={{ duration: 0.5, delay: index * 0.3 }}
                      initial="hidden"
                      whileInView="reveal"
                    >
                      <h1
                        className={`text-center text-4xl font-bold mb-9 tracking-wider ${
                          el.id == 2 ? "text-white" : "text-[#689D71]"
                        }`}
                      >
                        {el.title}
                      </h1>
                      <div className="px-7">
                        <p
                          className={`text-center ${
                            el.id == 2 ? "text-white" : "text-[#689D71]"
                          }`}
                        >
                          {el.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-center w-full mt-10 ">
                <Link href="/solutions">
                  <motion.span
                    variants={{
                      hidden: { y: 45, opacity: 0 },
                      reveal: { y: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-[#689D71] rounded-3xl py-2 px-4 text-white flex items-center gap-2"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {translatedSolutions.cta2}
                    <CircleChevronRight />
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/image/coris.png"
          alt="coris"
          width={400}
          height={400}
          className="absolute top-0 left-0"
        />

        <Image
          src="/image/Ellipse.png"
          alt="ellipse"
          width={400}
          height={400}
          className="absolute top-0 right-0"
        />
      </section>

      {/* PARTENAIRES SECTION*/}
      <motion.section
        variants={{
          hidden: { opacity: 0 },
          reveal: { opacity: 1 },
        }}
        transition={{ duration: 0.8, delay: 0.5 }} // Déclenchement en séquence
        initial="hidden"
        whileInView="reveal"
        className="py-10 bg-[#1d485113] flex items-center"
      >
        <div className="px-10 lg:max-w-[1350px] w-full mx-auto">
          <div className="">
            <h2 className="uppercase">{translatedPartners.headingup}</h2>
            <h1 className="text-3xl font-semibold text-[#1D4851] tracking-wider">
              {translatedPartners.heading}
              <br />
              {translatedPartners.heading2}
            </h1>

            <div className="flex flex-col lg:items-center justify-between gap-10 w-full lg:flex-row">
              <p className="mt-3">
                {translatedPartners.subheading1}
                <br />
                {translatedPartners.subheading2}
                {/*  */}
                {/* ut pelaborum. Sed ut pe Sed ut pe laborum. Sed ut pelaborum. */}
              </p>

              <div className="flex-1 w-full relative mt-20 lg:mt-0">
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2300,
                    }),
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                    duration: 1000,
                  }}
                  className="w-full "
                >
                  <CarouselContent className="flex items-center ">
                    {logosSlide.map((el) => (
                      <CarouselItem
                        key={el.id}
                        className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <div className="p-1">
                          <Link href={el.href as string} target="_blank">
                            <Image
                              src={el.logo}
                              alt=""
                              width={200}
                              height={200}
                              className="object-contain"
                              loading="lazy"
                              quality={85}
                            />
                          </Link>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious
                    className="-top-16 right-10 border-[#689D71] text-[#689D71]"
                    // style={{ position: "absolute", right: 0, top: 0 }}
                  />
                  <CarouselNext className="-top-16 right-0 border-[#689D71] text-[#689D71]" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* US SECTION   */}
      <section className="py-20">
        <div className=" px-10 lg:max-w-[1350px]  w-full mx-auto ">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              variants={{
                hidden: { x: 45, opacity: 0 },
                reveal: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative place-items-center"
            >
              <Image
                src="/image/qui_sommes_nous_marabu.png"
                alt="qui sommes nous image marabu"
                width={550}
                height={550}
                className="object-cover rounded-b-4xl rounded-tr-4xl"
                loading="lazy"
                quality={85}
                priority={false}
              />
            </motion.div>
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
                  className="uppercase "
                >
                  {translatedUs.headingup}
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
                  {translatedUs.heading}
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
                    {translatedUs.subheading1}
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
                    {translatedUs.subheading2}
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
                      {translatedUs.subheading3}
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
                            {translatedUs.lititle}
                          </span>
                          {translatedUs.lidescription}
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
                            {translatedUs.lititle2}
                          </span>
                          {translatedUs.lidescription2}
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
                            {translatedUs.lititle3}
                          </span>
                          {translatedUs.lidescription3}
                        </span>
                      </li>
                    </motion.ul>
                  </motion.div>
                </div>
                <div className="mt-3">
                  <h1> {translatedUs.textdownn}</h1>
                </div>
                <div className="mt-4">
                  <Link href="/apropos">
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
                      {translatedUs.cta}
                    </motion.span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="px-10 lg:max-w-[1350px] w-full mx-auto">
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
              {translatedExpertise.headingup}
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
              {translatedExpertise.heading}
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
              {translatedExpertise.subheading}
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="grid items-center justify-center gap-10 w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {translatedExpertise.experience.map((el, index) => (
                <motion.div
                  className={`border border-[#689D71] w-full relative ${
                    el.id === 1 ? "rounded-tl-2xl rounded-bl-2xl" : ""
                  } ${el.id === 4 ? "rounded-tr-2xl rounded-br-2xl" : ""}`}
                  key={el.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5 },
                    reveal: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.3, delay: index * 0.4 }}
                  initial="hidden"
                  whileInView="reveal"
                >
                  <div className="flex items-center justify-center flex-col h-[480px]">
                    <div className="bg-[#689d7163] w-24 h-24 rounded-full flex items-center justify-center">
                      <Image
                        src={el.icons}
                        alt="icon"
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-8">
                      <h1 className="text-center text-[#689d71] font-semibold">
                        {el.title}
                      </h1>
                    </div>
                    <div className="px-5 mt-7">
                      <p className="text-center">{el.desc}</p>
                    </div>
                    <div className="mt-10">
                      <Image
                        src="/line_marabu.png"
                        alt="Line Marabu"
                        width={70}
                        height={70}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="absolute -top-3 left-[50%] translate-x-[-50%] bg-[#689D71] text-white px-3 py-1 uppercase">
                    {el.step}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Boostez */}

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
              {translatedBoost.heading}
              <br />
              {translatedBoost.heading2}
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
              <br />
              {translatedBoost.subheading2}
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

      {/* Retours d'expérience */}
      <section className="py-40 flex items-center bg-white ">
        <div className="bg-[#1d485113] w-full pb-10 relative">
          <Image
            src="/icons/Vector.svg"
            alt="vector"
            width={200}
            height={200}
            className="object-contain absolute top-[40%] translate-y-[-40%] left-56"
          />
          <div className="px-10 lg:max-w-[1350px] w-full mx-auto md:-mt-10 ">
            <div className="">
              <div className="flex flex-col lg:items-center justify-between gap-10 w-full lg:flex-row">
                <div className="">
                  <motion.h2
                    variants={{
                      hidden: { x: 45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="uppercase"
                  >
                    {translatedClients.headingup}
                  </motion.h2>
                  <motion.h1
                    variants={{
                      hidden: { x: 45, opacity: 0 },
                      reveal: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    whileInView="reveal"
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="text-2xl font-semibold text-[#1D4851] tracking-wider"
                  >
                    {translatedClients.heading1}
                    <br />
                    {translatedClients.heading2}
                  </motion.h1>
                </div>
                <motion.div
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex-1 w-full relative  lg:mt-0"
                >
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                      }),
                    ]}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full "
                  >
                    <CarouselContent className="flex items-center ">
                      <CarouselItem
                        // key={el.id}
                        className="md:basis-1/2 lg:basis-1/3 "
                      >
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients1[0].comment}
                            </p>

                            {/* <div className="mt-4"></div> */}
                          </div>

                          <div className="text-center">
                            {/* <span className="w-10 h-10 bg-amber-100 rounded-full block"></span> */}
                            <Link href="/">
                              <Image
                                src={translatedClients.clients1[0].image}
                                alt={translatedClients.clients1[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients1[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients1[0].position1}
                              <br />
                              {translatedClients.clients1[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>

                      <CarouselItem
                        // key={el.id}
                        className="md:basis-1/2 lg:basis-1/3 "
                      >
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients2[0].comment}
                            </p>

                            {/* <div className="mt-4"></div> */}
                          </div>

                          <div className="text-center">
                            {/* <span className="w-10 h-10 bg-amber-100 rounded-full block"></span> */}
                            <Link href="/">
                              <Image
                                src={translatedClients.clients2[0].image}
                                alt={translatedClients.clients2[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients2[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients2[0].position1}
                              <br />
                              {translatedClients.clients2[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                      <CarouselItem
                        // key={el.id}
                        className="md:basis-1/2 lg:basis-1/3 "
                      >
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients3[0].comment}
                            </p>

                            {/* <div className="mt-4"></div> */}
                          </div>

                          <div className="text-center">
                            {/* <span className="w-10 h-10 bg-amber-100 rounded-full block"></span> */}
                            <Link href="/">
                              <Image
                                src={translatedClients.clients3[0].image}
                                alt={translatedClients.clients3[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients3[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients3[0].position1}
                              <br />
                              {translatedClients.clients3[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                      <CarouselItem
                        // key={el.id}
                        className="md:basis-1/2 lg:basis-1/3 "
                      >
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients4[0].comment}
                            </p>
                          </div>

                          <div className="text-center">
                            <Link href="/">
                              <Image
                                src={translatedClients.clients4[0].image}
                                alt={translatedClients.clients4[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients4[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients4[0].position1}
                              <br />
                              {translatedClients.clients4[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>

                      <CarouselItem
                        // key={el.id}
                        className="md:basis-1/2 lg:basis-1/3 "
                      >
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients5[0].comment}
                            </p>
                          </div>

                          <div className="text-center">
                            <Link href="/">
                              <Image
                                src={translatedClients.clients5[0].image}
                                alt={translatedClients.clients5[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients5[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients5[0].position1}
                              <br />
                              {translatedClients.clients5[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                      <CarouselItem
                        // key={el.id}
                        className="md:basis-1/2 lg:basis-1/3 "
                      >
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients6[0].comment}
                            </p>
                          </div>

                          <div className="text-center">
                            <Link href="/">
                              <Image
                                src={translatedClients.clients6[0].image}
                                alt={translatedClients.clients6[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients6[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients6[0].position1}
                              <br />
                              {translatedClients.clients6[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>

                      <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients7[0].comment}
                            </p>
                          </div>

                          <div className="text-center">
                            {/* <span className="w-10 h-10 bg-amber-100 rounded-full block"></span> */}
                            <Link href="/">
                              <Image
                                src={translatedClients.clients7[0].image}
                                alt={translatedClients.clients7[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients7[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients7[0].position1}
                              <br />
                              {translatedClients.clients7[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>

                      <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
                        <div className="p-1 flex flex-col items-center gap-5">
                          <div className="bg-white flex items-center justify-center rounded-[15px] px-6 py-5 shadow-xl h-56">
                            <p className="text-[14px] text-center">
                              {translatedClients.clients8[0].comment}
                            </p>
                          </div>

                          <div className="text-center">
                            {/* <span className="w-10 h-10 bg-amber-100 rounded-full block"></span> */}
                            <Link href="/">
                              <Image
                                src={translatedClients.clients8[0].image}
                                alt={translatedClients.clients8[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                            </Link>
                          </div>
                          <div className="text-center">
                            <h1 className="font-bold ">
                              {translatedClients.clients8[0].name}
                            </h1>
                            <p className="text-xs">
                              {translatedClients.clients8[0].position1}
                              <br />
                              {translatedClients.clients8[0].position2}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    </CarouselContent>

                    <CarouselPrevious
                      className="-top-10 right-10 border-[#689D71] text-[#689D71] cursor-pointer"
                      // style={{ position: "absolute", right: 0, top: 0 }}
                    />
                    <CarouselNext className="-top-10 right-0 border-[#689D71] text-[#689D71] cursor-pointer" />
                  </Carousel>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Croissance  */}
      <section className="py-20 bg-[#1D4851] relative overflow-hidden">
        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={1000}
          height={1000}
          className="object-contain absolute left-0 -top-16 z-40"
        />

        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={1000}
          height={1000}
          className="object-contain absolute right-0 -top-16 z-40"
        />
        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={1000}
          height={1000}
          className="object-contain absolute right-72 -bottom-16 z-40 rotate-180"
        />

        <Image
          src="/icons/line1.svg"
          alt="line1"
          width={1000}
          height={1000}
          className="object-contain absolute -left-96 -bottom-16 z-40 -rotate-90"
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
              {/* {queryArticles?.data &&
                queryArticles?.data.slice(0, 3)?.map((el: any, idx: number) => (
                  <div className="bg-white shadow " key={idx}>
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
                ))} */}

              {/* backoffice */}
              {queryArticlesbyMarabu?.data &&
                queryArticlesbyMarabu?.data?.articles
                  .slice(0, 3)
                  .map((el: any, idx: number) => (
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
                              <span className="text-sm text-white block"></span>
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
                  <div className="flex flex-col gap-4 px-4  relative  z-30 ">
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
}
