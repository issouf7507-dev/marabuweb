"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
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
import ContactForm from "@/app/components/contact-form";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openContact, setOpenContact] = useState(false);

  const t = useTranslations("solutions");
  const t2 = useTranslations("home");
  const t3 = useTranslations("contact");

  const conseilTranslation = t.raw("conseil") as {
    heading: string;
    subheading: string;
    subheading2: string;
    subheading3: string;
    subheading4: string;
    heading2: string;
    subheading5: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    heading3: string;
    subheading6: string;
    step5: string;
    step6: string;
    step7: string;
    step8: string;
    heading4: string;
    subheading7: string;
    step9: string;
    step10: string;
    step11: string;
  };

  const servicesTranslation = t.raw("services") as {
    heading: string;
    subheading: string;
    heading2: string;
    subheading3: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    heading3: string;
    subheading4: string;
    step6: string;
    step7: string;
  };

  const intermediationTranslation = t.raw("intermediation") as {
    heading: string;
    subheading: string;
    heading2: string;
    subheading5: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    heading3: string;
    subheading6: string;
    step6: string;
    step7: string;
    step8: string;
    step9: string;
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
    openingHoursText: string;
    openingHours1: string;
    subjectPlaceholder: string;
    openingHours2: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Load />;
  }

  return (
    <div className="font-light text-gray-500 scroll-smooth">
      {/* Section conseil */}
      <section id="conseil">
        <div className="px-10 lg:max-w-[1350px] w-full mx-auto mt-32 relative">
          <Image
            src="/image/coris.png"
            alt=""
            width={200}
            height={200}
            className="absolute top-0 left-0"
            loading="lazy"
            quality={85}
          />

          <Image
            src="/image/coris.png"
            alt=""
            width={400}
            height={400}
            className="absolute top-100 right-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-1 md:p-10">
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-3xl font-bold mb-4 tracking-wider text-[#1D4851] uppercase"
              >
                {conseilTranslation.heading}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-justify font-medium italic text-gray-400"
              >
                {conseilTranslation.subheading}
                <span className="font-bold text-[#1D4851]">
                  {conseilTranslation.subheading2}
                </span>
                {conseilTranslation.subheading3}{" "}
                {conseilTranslation.subheading4}
              </motion.p>

              <div className="mt-4 mb-9">
                <motion.h1
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold mb-2 tracking-wider text-[#1D4851] uppercase"
                >
                  {conseilTranslation.heading2}
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-justify font-medium italic text-gray-400"
                >
                  {conseilTranslation.subheading5}
                </motion.p>
                <motion.ul
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="list-disc mt-1 ml-4 font-medium text-[#1D4851]"
                >
                  <li>
                    <p>{conseilTranslation.step1}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step2}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step3}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step4}</p>
                  </li>
                </motion.ul>
              </div>

              <Image
                src={"/persons/conseil_1_marabu.jpg"}
                alt=""
                width={600}
                height={400}
                className="object-contain rounded-tl-4xl rounded-b-4xl hidden md:block "
                loading="lazy"
                quality={85}
              />
            </div>

            <div className="p-1 md:p-10 flex flex-col gap-4">
              <Image
                src={"/persons/conseil_2_marabu.jpg"}
                alt=""
                width={600}
                height={400}
                className="object-contain rounded-b-4xl rounded-tr-4xl w-full"
                loading="lazy"
                quality={85}
              />

              <div className="mt-4">
                <motion.h1
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold mb-2 tracking-wider text-[#1D4851] uppercase"
                >
                  {conseilTranslation.heading3}
                </motion.h1>
                <motion.p
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-justify font-medium italic text-gray-400"
                >
                  {conseilTranslation.subheading6}
                </motion.p>
                <motion.ul
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="list-disc mt-1 ml-4 font-medium text-[#1D4851]"
                >
                  <li>
                    <p>{conseilTranslation.step5}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step6}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step7}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step8}</p>
                  </li>
                </motion.ul>
              </div>
              <div className="mt-4">
                <motion.h1
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold mb-2 tracking-wider text-[#1D4851] uppercase"
                >
                  {conseilTranslation.heading4}
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-justif font-medium italic text-gray-400"
                >
                  {conseilTranslation.subheading7}
                </motion.p>
                <motion.ul
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="list-disc mt-1 ml-4 font-medium text-[#1D4851]"
                >
                  <li>
                    <p>{conseilTranslation.step9}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step10}</p>
                  </li>
                  <li>
                    <p>{conseilTranslation.step11}</p>
                  </li>
                </motion.ul>
              </div>

              <Image
                src={"/persons/conseil_1_marabu.jpg"}
                alt=""
                width={600}
                height={400}
                className="object-contain rounded-tl-4xl rounded-b-4xl  md:hidden w-full"
                loading="lazy"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Section services */}
      <section>
        <div className="px-10 lg:max-w-[1350px] w-full mx-auto relative mt-10 md:mt-0">
          <Image
            src="/image/coris.png"
            alt="Coris Marabu"
            width={400}
            height={400}
            className="absolute top-0 -left-48"
          />

          <Image
            src="/image/coris.png"
            alt="Coris Marabu"
            width={400}
            height={400}
            className="absolute top-0 -right-48"
          />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-1 md:p-10">
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-3xl font-bold mb-4 tracking-wider text-[#1D4851] uppercase"
              >
                {servicesTranslation.heading}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-justify font-medium italic text-gray-400"
              >
                {servicesTranslation.subheading}
              </motion.p>

              <div className="mt-4">
                <motion.h1
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold mb-2 tracking-wider text-[#1D4851] uppercase"
                >
                  {servicesTranslation.heading2}
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-justify font-medium italic text-gray-400"
                >
                  {servicesTranslation.subheading3}
                </motion.p>
                <motion.ul
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="list-disc mt-1 ml-4 font-medium text-[#1D4851]"
                >
                  <li>
                    <p>{servicesTranslation.step1}</p>
                  </li>
                  <li>
                    <p>{servicesTranslation.step2}</p>
                  </li>
                  <li>
                    <p>{servicesTranslation.step3}</p>
                  </li>
                  <li>
                    <p>{servicesTranslation.step4}</p>
                  </li>
                  <li>
                    <p>{servicesTranslation.step5}</p>
                  </li>
                </motion.ul>

                <Image
                  src={"/persons/servive_1_marabu.jpg"}
                  alt="Services - Transformation & Innovation"
                  width={600}
                  height={400}
                  className="object-contain rounded-tl-4xl rounded-b-4xl mt-4 md:hidden w-full"
                  loading="lazy"
                  quality={85}
                />
              </div>

              <div className="mt-4">
                <motion.h1
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold mb-2 tracking-wider text-[#1D4851] uppercase"
                >
                  {servicesTranslation.heading3}
                </motion.h1>

                <motion.p
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-justify font-medium italic text-gray-400"
                >
                  {servicesTranslation.subheading4}
                </motion.p>
                <motion.ul
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="list-disc mt-1 ml-4 font-medium text-[#1D4851]"
                >
                  <li>
                    <p>{servicesTranslation.step6}</p>
                  </li>
                  <li>
                    <p>{servicesTranslation.step7}</p>
                  </li>
                </motion.ul>

                <iframe
                  src="https://www.youtube.com/embed/sldHA6wmq_g?autoplay=1&mute=1&loop=1&playlist=sldHA6wmq_g&controls=0&showinfo=0&rel=0"
                  width="100%"
                  height="300"
                  className="rounded-b-4xl rounded-tr-4xl  md:hidden mt-4 "
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="p-1 md:p-10 flex flex-col gap-4">
              <Image
                src={"/persons/servive_1_marabu.jpg"}
                alt="Services - Transformation & Innovation"
                width={600}
                height={400}
                className="object-contain rounded-b-4xl rounded-tr-4xl hidden md:block"
                loading="lazy"
                quality={85}
              />

              <iframe
                src="https://www.youtube.com/embed/sldHA6wmq_g?autoplay=1&mute=1&loop=1&playlist=sldHA6wmq_g&controls=0&showinfo=0&rel=0"
                width="100%"
                height="300"
                className="rounded-b-4xl rounded-tr-4xl hidden md:block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* Section intermediations */}
      <section>
        <div className="px-10 lg:max-w-[1350px] w-full mx-auto relative mt-10 md:mt-0">
          <Image
            src="/image/coris.png"
            alt="Coris Marabu"
            width={400}
            height={400}
            className="absolute top-0 -left-10 rotate-90"
          />
          <Image
            src="/image/coris.png"
            alt="Coris Marabu"
            width={400}
            height={400}
            className="absolute top-72 -right-10 rotate-90"
          />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-1 md:p-10 ">
              <motion.h1
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.3, delay: 0.4 }}
                // className="text-justify"
                className="text-3xl font-bold mb-4 tracking-wider text-[#1D4851] uppercase"
              >
                {intermediationTranslation.heading}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { x: 45, opacity: 0 },
                  reveal: { x: 0, opacity: 1 },
                }}
                initial="hidden"
                whileInView="reveal"
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-justify font-medium italic text-gray-400"
              >
                {intermediationTranslation.subheading}
              </motion.p>

              <div className="mt-4">
                <motion.h1
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold mb-2 tracking-wider text-[#1D4851] uppercase"
                >
                  {intermediationTranslation.heading2}
                </motion.h1>
                <motion.p
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-justify font-medium italic text-gray-400"
                >
                  {intermediationTranslation.subheading5}
                </motion.p>
                <motion.ul
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="list-disc mt-1 ml-4 font-medium text-[#1D4851]"
                >
                  <li>
                    <p>{intermediationTranslation.step1}</p>
                  </li>
                  <li>
                    <p>{intermediationTranslation.step2}</p>
                  </li>
                  <li>
                    <p>{intermediationTranslation.step3}</p>
                  </li>
                  <li>
                    <p>{intermediationTranslation.step4}</p>
                  </li>
                  <li>
                    <p>{intermediationTranslation.step5}</p>
                  </li>
                </motion.ul>
              </div>
            </div>

            <div className="p-1 md:p-10">
              <Image
                src={"/persons/intermediation_1_marabu.jpg"}
                alt=""
                width={1000}
                height={1000}
                className="object-contain rounded-b-4xl rounded-tr-4xl mt-4 md:mt-0"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-1 md:p-10">
              <Image
                src={"/persons/intermediation_2_marabu.jpg"}
                alt=""
                width={600}
                height={400}
                className="object-contain rounded-b-4xl rounded-tr-4xl hidden md:block"
                loading="lazy"
                quality={85}
              />
            </div>
            <div className="p-1 md:p-10 ">
              <div className="">
                <motion.h1
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold mb-2 tracking-wider text-[#1D4851] uppercase"
                >
                  {intermediationTranslation.heading3}
                </motion.h1>
                <motion.p
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-justify font-medium italic text-gray-400"
                >
                  {intermediationTranslation.subheading6}
                </motion.p>
                <motion.ul
                  variants={{
                    hidden: { x: 45, opacity: 0 },
                    reveal: { x: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="list-disc mt-1 ml-4 font-medium text-[#1D4851]"
                >
                  <li>
                    <p>{intermediationTranslation.step6}</p>
                  </li>
                  <li>
                    <p>{intermediationTranslation.step7}</p>
                  </li>
                  <li>
                    <p>{intermediationTranslation.step8}</p>
                  </li>
                  <li>
                    <p>{intermediationTranslation.step9}</p>
                  </li>
                </motion.ul>

                <Image
                  src={"/persons/intermediation_2_marabu.jpg"}
                  alt=""
                  width={600}
                  height={400}
                  className="object-contain rounded-b-4xl rounded-tr-4xl  md:hidden w-full mt-4"
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[url(/image/booster_croissance_marabu.png)] w-full  bg-cover  relative py-16 overflow-hidden">
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

      <Sheet open={openContact} onOpenChange={setOpenContact}>
        <SheetContent className="w-[100vw] h-[100%] lg:w-3/4 py-8 overflow-y-auto overflow-x-hidden">
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
                  <div className="px-4 relative z-30">
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
