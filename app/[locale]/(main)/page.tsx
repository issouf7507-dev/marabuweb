"use client";
import {
  CircleChevronRight,
  MoveRight,
  User,
  Clock,
  Sparkles,
  CheckCircle,
  X,
} from "lucide-react";
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
import { logosSlide, slides } from "@/data/data";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ContactSheet from "@/app/components/contact-sheet";

export default function Home() {
  const t = useTranslations("home");

  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const currentLocaleData = locale === "fr" ? "fr-FR" : "en-US";

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
      tagline: string;
      description: string;
      offerings: string[];
      cta: string;
    }[];
    cta2: string;
  };

  const translatedCardServices = t.raw("solutions.cardservices") as {
    id: number;
    title: string;
    tagline: string;
    description: string;
    offerings: string[];
    cta: string;
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
    value1: string;
    value2: string;
    value3: string;
    value4: string;
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

  const [openContact, setOpenContact] = useState(false);
  const [openYoutube, setOpenYoutube] = useState(false);
  const [openMarabuAI, setOpenMarabuAI] = useState(false);
  const [index, setIndex] = useState(0);

  const currentSlide = translatedSlides[index];
  const headingAnimed = splitStringUsing(currentSlide?.heading);
  const subheadingAnimed = splitStringUsing(currentSlide?.subheading);
  const cta = currentSlide?.cta;

  const fetchArticlesbyMarabu = async () => {
    try {
      const res = await fetch(
        locale == "fr"
          ? `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?lang=fr`
          : `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?lang=en`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      return [];
    }
  };

  const queryArticlesbyMarabu = useQuery({
    queryKey: ["articlesbyMarabu", locale],
    queryFn: fetchArticlesbyMarabu,
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

  // Afficher la modal Marabu AI après 5 secondes
  useEffect(() => {
    const hasSeenMarabuAI = localStorage.getItem("marabuAI_seen");
    if (hasSeenMarabuAI) return;

    const timer = setTimeout(() => {
      setOpenMarabuAI(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleMarabuAIResponse = (wantsToTest: boolean) => {
    // Sauvegarder le choix de l'utilisateur
    localStorage.setItem("marabuAI_seen", "true");
    localStorage.setItem("marabuAI_wantsToTest", wantsToTest.toString());
    setOpenMarabuAI(false);

    // Si l'utilisateur veut tester, rediriger vers la page Marabu AI
    if (wantsToTest) {
      // Vous pouvez rediriger vers une page dédiée ou ouvrir un formulaire
      // window.location.href = `/marabu-ai`;
      // Ou ouvrir un formulaire de contact avec un sujet spécifique
      window.location.href = "https://ai.marabu.services/welcome";
      // setOpenContact(true);
    }
  };

  return (
    <div className="w-full font-light text-gray-500">
      {/* HERO SECTION */}
      <section className="w-full">
        <div className="w-full h-screen relative flex items-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slides[index].image}
              alt=""
              aria-hidden="true"
              fill
              priority
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
                {translatedCardServices.map((el, index) => {
                  const anchor = el.id === 1 ? "conseil" : el.id === 2 ? "services" : "intermediation";
                  const isHighlighted = el.id === 2;
                  return (
                    <Link href={`/solutions#${anchor}`} key={el.id} className="group">
                      <motion.div
                        className={`rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl ${
                          isHighlighted
                            ? "bg-[#689D71] shadow-xl"
                            : "bg-white shadow-lg border border-gray-100"
                        }`}
                        variants={{ hidden: { y: 40, opacity: 0 }, reveal: { y: 0, opacity: 1 } }}
                        transition={{ duration: 0.45, delay: index * 0.15 }}
                        initial="hidden"
                        whileInView="reveal"
                        viewport={{ once: true }}
                      >
                        {/* Accent top */}
                        <div className={`h-1 ${isHighlighted ? "bg-white/30" : "bg-[#689D71]"}`} />

                        <div className="p-7 flex flex-col flex-1">
                          {/* Numéro */}
                          <span className={`text-xs font-bold tracking-widest uppercase mb-3 ${isHighlighted ? "text-white/60" : "text-gray-300"}`}>
                            0{el.id}
                          </span>

                          {/* Titre */}
                          <h3 className={`text-2xl font-bold tracking-wide mb-1 ${isHighlighted ? "text-white" : "text-[#1D4851]"}`}>
                            {el.title}
                          </h3>

                          {/* Tagline */}
                          <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isHighlighted ? "text-white/70" : "text-[#689D71]"}`}>
                            {el.tagline}
                          </p>

                          {/* Description */}
                          <p className={`text-sm leading-relaxed mb-5 ${isHighlighted ? "text-white/90" : "text-gray-500"}`}>
                            {el.description}
                          </p>

                          {/* Séparateur */}
                          <div className={`w-10 h-px mb-5 ${isHighlighted ? "bg-white/30" : "bg-gray-200"}`} />

                          {/* Offres clés */}
                          <ul className="space-y-2 flex-1">
                            {el.offerings.map((item, i) => (
                              <li key={i} className={`flex items-start gap-2 text-sm ${isHighlighted ? "text-white/90" : "text-gray-600"}`}>
                                <span className={`mt-0.5 text-xs flex-shrink-0 font-bold ${isHighlighted ? "text-white" : "text-[#689D71]"}`}>✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <div className={`mt-6 flex items-center gap-2 text-sm font-semibold ${isHighlighted ? "text-white" : "text-[#1D4851]"}`}>
                            <span>{el.cta}</span>
                            <CircleChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
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
                          <Link href={el.href as string} target="_blank"
                    rel="noopener noreferrer">
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
                  <p> {translatedUs.textdownn}</p>
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
                              <Image
                                src={translatedClients.clients1[0].image}
                                alt={translatedClients.clients1[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients1[0].name}
                            </p>
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
                              <Image
                                src={translatedClients.clients2[0].image}
                                alt={translatedClients.clients2[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients2[0].name}
                            </p>
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
                              <Image
                                src={translatedClients.clients3[0].image}
                                alt={translatedClients.clients3[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients3[0].name}
                            </p>
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
                              <Image
                                src={translatedClients.clients4[0].image}
                                alt={translatedClients.clients4[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients4[0].name}
                            </p>
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
                              <Image
                                src={translatedClients.clients5[0].image}
                                alt={translatedClients.clients5[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients5[0].name}
                            </p>
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
                              <Image
                                src={translatedClients.clients6[0].image}
                                alt={translatedClients.clients6[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients6[0].name}
                            </p>
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
                              <Image
                                src={translatedClients.clients7[0].image}
                                alt={translatedClients.clients7[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients7[0].name}
                            </p>
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
                              <Image
                                src={translatedClients.clients8[0].image}
                                alt={translatedClients.clients8[0].alt}
                                width={80}
                                height={80}
                                className="object-cover w-20 h-20 rounded-full"
                                loading="lazy"
                                quality={85}
                              />
                          </div>
                          <div className="text-center">
                            <p className="font-bold">
                              {translatedClients.clients8[0].name}
                            </p>
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
        <span aria-hidden="true" className="absolute left-0 -top-16 z-40 w-[1000px] h-[1000px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat" />
        <span aria-hidden="true" className="absolute right-0 -top-16 z-40 w-[1000px] h-[1000px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat" />
        <span aria-hidden="true" className="absolute right-72 -bottom-16 z-40 w-[1000px] h-[1000px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat rotate-180" />
        <span aria-hidden="true" className="absolute -left-96 -bottom-16 z-40 w-[1000px] h-[1000px] bg-[url('/icons/line1.svg')] bg-contain bg-no-repeat -rotate-90" />
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

      {/* MAGAZINE SECTION - Style Moderne */}
      <section className="py-20">
        <div className="px-6 md:px-10 lg:max-w-[1350px] w-full mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              variants={{
                hidden: { y: 45, opacity: 0 },
                reveal: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="reveal"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="uppercase text-sm tracking-widest text-gray-500 mb-4"
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
              className="text-4xl md:text-5xl font-bold text-[#1D4851] tracking-tight mb-6"
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
              className="max-w-2xl mx-auto text-lg font-light text-gray-500 leading-relaxed"
            >
              {translatedMagazine.subheading}
            </motion.p>
          </div>

          {queryArticlesbyMarabu?.data &&
          queryArticlesbyMarabu?.data?.articles &&
          queryArticlesbyMarabu?.data?.articles.length > 0 ? (
            <div className="mt-10">
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
                          queryArticlesbyMarabu.data.articles[0]?.featuredImage
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
                      <div className="absolute top-4 left-4 w-3 h-3 bg-[#ffffff] rounded-sm" />

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
                            ).toLocaleDateString(currentLocaleData, {
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
                                ).toLocaleDateString(currentLocaleData, {
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

              {/* Grille d'articles secondaires (si plus de 3 articles) */}
              {queryArticlesbyMarabu.data.articles.length > 3 && (
                <div className="grid md:grid-cols-3 gap-6">
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
                                ).toLocaleDateString(currentLocaleData, {
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
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg font-medium">
                Aucun article disponible pour le moment.
              </p>
            </div>
          )}

          {/* CTA Button modernisé */}
          <div className="mt-12 flex items-center justify-center">
            <Link href="/actualites">
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
                <span>{translatedMagazine.cta}</span>
                <MoveRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal Marabu AI */}
      <Dialog open={openMarabuAI} onOpenChange={setOpenMarabuAI}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-[#1D4851]  border-none">
          <div className="relative">
            <button
              onClick={() => handleMarabuAIResponse(false)}
              aria-label={locale === "fr" ? "Fermer" : "Close"}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Contenu de la modal */}
            <div className="p-8 md:p-12 text-white">
              {/* Icône AI avec animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#ffffff] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-[#1D4851]">AI</span>
                  </div>
                </div>
              </motion.div>

              {/* Titre */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-center mb-4"
              >
                {locale === "fr" ? "Découvrez Marabu AI" : "Discover Marabu AI"}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-white/90 mb-6 leading-relaxed"
              >
                {locale === "fr"
                  ? "Notre intelligence artificielle révolutionnaire qui rédige des rapports détaillés et professionnels sur n'importe quel sujet que vous souhaitez aborder."
                  : "Our revolutionary artificial intelligence that writes detailed and professional reports on any topic you want to address."}
              </motion.p>

              {/* Fonctionnalités */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 mb-8"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ffffff] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">
                    {locale === "fr"
                      ? "Rapports détaillés et structurés"
                      : "Detailed and structured reports"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ffffff] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">
                    {locale === "fr"
                      ? "Analyse approfondie de votre sujet"
                      : "In-depth analysis of your topic"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ffffff] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">
                    {locale === "fr"
                      ? "Rédaction professionnelle et précise"
                      : "Professional and precise writing"}
                  </p>
                </div>
              </motion.div>

              {/* Boutons d'action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => handleMarabuAIResponse(true)}
                  className="flex-1 bg-white text-[#1D4851] font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {locale === "fr"
                    ? "Oui, je veux tester"
                    : "Yes, I want to try"}
                </button>
                <button
                  onClick={() => handleMarabuAIResponse(false)}
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30"
                >
                  {locale === "fr" ? "Peut-être plus tard" : "Maybe later"}
                </button>
              </motion.div>

              {/* Note discrète */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-white/60 text-center mt-6"
              >
                {locale === "fr"
                  ? "Vous pourrez toujours y accéder plus tard"
                  : "You can always access it later"}
              </motion.p>
            </div>

            {/* Décoration en bas */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#1D4851]"></div>
          </div>
        </DialogContent>
      </Dialog>

      <ContactSheet open={openContact} onOpenChange={setOpenContact} />

      {/* Bouton flottant Marabu AI */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => {
          const wantsToTest = localStorage.getItem("marabuAI_wantsToTest") === "true";
          if (wantsToTest) {
            window.location.href = "https://ai.marabu.services/welcome";
          } else {
            setOpenMarabuAI(true);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#1D4851] text-white rounded-full shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-110"
        aria-label={locale === "fr" ? "Ouvrir Marabu AI" : "Open Marabu AI"}
      >
        <div className="relative">
          <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -top-3 -right-3 w-4 h-4 bg-[#fffff] rounded-full flex items-center justify-center">
            <span className="text-[8px] font-bold text-[#1D4851]">AI</span>
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1D4851] text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          {locale === "fr" ? "Marabu AI" : "Marabu AI"}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#1D4851]"></div>
        </div>
      </motion.button>
    </div>
  );
}
