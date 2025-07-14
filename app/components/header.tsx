"use client";
import { ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const Header = () => {
  const pathname = usePathname();
  const [openContact, setOpenContact] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // const menu = [
  //   {
  //     id: 1,
  //     tilte: "Accueil",
  //     herf: "/",
  //   },
  //   {
  //     id: 2,
  //     tilte: "Nos Solutions",
  //     herf: "/solutions",
  //   },

  //   {
  //     id: 3,
  //     tilte: "Qui sommes-nous",
  //     herf: "/apropos",
  //   },
  //   {
  //     id: 4,
  //     tilte: "Blog",
  //     herf: "/actualites",
  //   },
  // ];

  const t = useTranslations("header");
  const t2 = useTranslations("contact");

  const menu = t.raw("links");
  const cta = t.raw("cta");

  // console.log(menu2);

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
    openingHoursText: string;
    openingHours1: string;
    openingHours2: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="w-full h-4 bg-[#EDF2D0]"></div>

      <header className=" bg-[#1D4851] w-full h-16 flex items-center justify-center">
        <div className="flex items-center justify-between  max-w-[1450px] w-full mx-auto">
          <div className="lg:mr-0 ml-2">
            <Link href="/">
              <Image width={100} height={100} src="/logo.png" alt="" />
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <ul className="lg:flex items-center gap-6 text-white hidden">
              {menu.map((el: any) => (
                <li key={el.id}>
                  <Link
                    href={el.herf}
                    className={`tracking-wider transition-all ${
                      pathname == el.herf ? "font-semibold text-[#EDF2D0]" : ""
                    } hover:text-[#dfe7b3]`}
                  >
                    {el.tilte}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="lg:flex items-center gap-6 hidden">
              <ul className="flex items-center gap-4">
                <li>
                  <Link
                    href="https://www.facebook.com/marabuservices"
                    target="_blank"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/facebook_marabu.svg"
                      alt="Facebook Marabu"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://www.linkedin.com/company/marabuservices"
                    target="_blank"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/linkedincircle_marabu.svg"
                      alt="Linkedin Marabu"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.tiktok.com/@marabuservices?_t=ZM-8vpBeJRzm5e&_r=1"
                    target="_blank"
                  >
                    <Image
                      width={21}
                      height={21}
                      src="/icons/tiktok_marabu.svg"
                      alt="Tiktok Marabu"
                    />
                  </Link>
                </li>
              </ul>

              <div>
                <LanguageSwitcher />
              </div>

              <div className="mr-3">
                <span
                  onClick={() => setOpenContact(true)}
                  className="flex items-center gap-1 text-[#1D4851] bg-white py-1 px-2 rounded-2xl cursor-pointer font-bold text-sm hover:bg-[#EDF2D0] group"
                >
                  {cta}
                  <ChevronRight
                    width={18}
                    className="group-hover:translate-x-1  transition-all"
                  />
                </span>
              </div>
            </div>

            <div className="lg:hidden mr-3">
              <div className="flex items-center gap-2">
                <div className="">
                  <span
                    onClick={() => setOpenContact(true)}
                    className="flex items-center gap-1 text-[#1D4851] bg-white py-1 px-1 rounded-2xl cursor-pointer font-bold text-xs hover:bg-[#EDF2D0] group"
                  >
                    {cta}
                    <ChevronRight
                      width={18}
                      className="group-hover:translate-x-1  transition-all"
                    />
                  </span>
                </div>
                <div onClick={() => setOpenMenu(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9h16.5m-16.5 6.75h16.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sheet open={openMenu} onOpenChange={setOpenMenu}>
        <SheetContent className="w-[90vw] sm:max-w-sm bg-[#1D4851]">
          <SheetHeader>
            <SheetTitle className="text-[#1D4851]">Menu</SheetTitle>
            <div className="mt-8">
              <ul className="flex flex-col gap-6 z-40 relative">
                {menu.map((el: any) => (
                  <li key={el.id}>
                    <Link
                      href={el.herf}
                      onClick={() => setOpenMenu(false)}
                      className={`text-[#fff] text-lg font-medium tracking-wider transition-all ${
                        pathname == el.herf ? "text-[#d7e296]" : ""
                      } hover:text-[#e2f18c]`}
                    >
                      {el.tilte}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="flex items-center gap-3 mt-5">
                <Link
                  href="https://www.tiktok.com/@marabuservices?_t=ZM-8vpBeJRzm5e&_r=1"
                  target="_blank"
                >
                  <Image
                    width={21}
                    height={21}
                    src="/icons/tiktok.svg"
                    alt=""
                  />
                </Link>
                <li>
                  <Link
                    href="https://www.facebook.com/marabuservices"
                    target="_blank"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/facebook_marabu.svg"
                      alt="Facebook Marabu"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://www.linkedin.com/company/marabuservices"
                    target="_blank"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/linkedincircle_marabu.svg"
                      alt="Linkedin Marabu"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.tiktok.com/@marabuservices?_t=ZM-8vpBeJRzm5e&_r=1"
                    target="_blank"
                  >
                    <Image
                      width={21}
                      height={21}
                      src="/icons/tiktok_marabu.svg"
                      alt="Tiktok Marabu"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </SheetHeader>

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
            width={400}
            height={400}
            className="absolute bottom-0 right-0 "
          />
        </SheetContent>
      </Sheet>

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
                  <div className="flex flex-col gap-4 lg:px-4 relative  z-30">
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
                      placeholder={translatedContact.messagePlaceholder}
                      className="w-full h-12"
                    />
                    <Textarea
                      placeholder={translatedContact.messagePlaceholder}
                      // rows={9}
                      className="resize-none h-48"

                      // maxLength={1000}
                    />
                  </div>
                  <div className="lg:px-4 mt-8 flex items-end ">
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

export default Header;
// solutions
