"use client";
import { ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import ContactSheet from "./contact-sheet";

const Header = () => {
  const pathname = usePathname();
  const [openContact, setOpenContact] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const t = useTranslations("header");

  const menu = t.raw("links");
  const cta = t.raw("cta");

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="w-full h-4 bg-[#EDF2D0]"></div>

      <header className=" bg-[#1D4851] w-full h-16 flex items-center justify-center">
        <div className="flex items-center justify-between  max-w-[1450px] w-full mx-auto">
          <div className="lg:mr-0 ml-2">
            <Link href="/">
              <Image width={100} height={100} src="/logo.png" alt="Marabu Services" />
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <ul className="lg:flex items-center gap-6 text-white hidden">
              {menu.map((el: any) => (
                <li key={el.id}>
                  <Link
                    href={el.href}
                    className={`tracking-wider transition-all ${
                      pathname == el.href ? "font-semibold text-[#EDF2D0]" : ""
                    } hover:text-[#dfe7b3]`}
                  >
                    {el.title}
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
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
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
                      href={el.href}
                      onClick={() => setOpenMenu(false)}
                      className={`text-[#fff] text-lg font-medium tracking-wider transition-all ${
                        pathname == el.href ? "text-[#d7e296]" : ""
                      } hover:text-[#e2f18c]`}
                    >
                      {el.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="flex items-center gap-3 mt-5">
                <Link
                  href="https://www.tiktok.com/@marabuservices?_t=ZM-8vpBeJRzm5e&_r=1"
                  target="_blank"
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
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

      <ContactSheet open={openContact} onOpenChange={setOpenContact} />
    </div>
  );
};

export default Header;
// solutions
