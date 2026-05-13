import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const t = useTranslations("footer");

  const translatedFooter = t.raw("navigation") as {
    heading: string;
    subheading: string;
    title1: string;
    link1: string;
    link2: string;
    link3: string;
    link4: string;
    title3: string;
    telNumber: string;
    email: string;
    location: string;
    title2: string;
    link5: string;
    link6: string;
    link7: string;
  };

  return (
    <footer className="bg-[#1D4851] relative overflow-hidden">
      <Image
        src="/footerEffect.png"
        alt=""
        width={600}
        height={600}
        className="object-contain absolute -right-0 top-0 z-30 "
      />
      <div className="px-10 lg:max-w-[1450px]  w-full mx-auto relative z-30">
        <div className=" py-10">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-20">
            <div>
              <h2 className="text-white text-4xl font-bold">
                {translatedFooter.heading}
              </h2>
              <p className="text-white mt-5 text-lg">
                {translatedFooter.subheading}
              </p>
              <ul className="flex items-center gap-4 mt-5">
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
                <li>
                  <Link
                    href="https://www.instagram.com/marabuservices/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/icons/insta_marabu.svg"
                      alt="Instagram Marabu"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/marabuservices" target="_blank"
                    rel="noopener noreferrer">
                    <Image
                      width={21}
                      height={21}
                      src="/icons/x_marabu.svg"
                      alt="X Marabu"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/@Marabuservices"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/icons/youtube_marabu.svg"
                      alt="Youtube Marabu"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 grid md:grid-cols-3">
              <div className="mb-3">
                <h3 className="text-white uppercase font-semibold">
                  {translatedFooter.title1}
                </h3>
                <div className="mt-5">
                  <ul className="flex gap-5 flex-col">
                    <li>
                      <Link
                        href={"/"}
                        className="text-white text-sm transition hover:text-[#dfe7b3]"
                      >
                        {translatedFooter.link1}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/solutions"}
                        className="text-white text-sm transition hover:text-[#dfe7b3]"
                      >
                        {translatedFooter.link2}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/apropos"}
                        className="text-white text-sm transition hover:text-[#dfe7b3]"
                      >
                        {translatedFooter.link3}
                      </Link>
                    </li>

                    <li>
                      <Link
                        href={"/actualites"}
                        className="text-white text-sm transition hover:text-[#dfe7b3]"
                      >
                        {translatedFooter.link4}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-3">
                <h3 className="text-white uppercase font-semibold">
                  {translatedFooter.title3}
                </h3>
                <div className="mt-5">
                  <ul className="flex gap-5 flex-col">
                    <li>
                      <Link
                        href="tel:+2250720777000"
                        className="text-white text-sm transition hover:text-[#dfe7b3]"
                      >
                        {translatedFooter.telNumber}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="mailto:contact@marabu.services"
                        className="text-white text-sm transition hover:text-[#dfe7b3]"
                      >
                        {translatedFooter.email}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.google.ci/maps/place/Marabu/@5.3438891,-4.0126815,19z/data=!4m14!1m7!3m6!1s0xfc1eb0c78647443:0xb23bdc45be977419!2sPharmacie+du+Lyc%C3%A9e+Technique!8m2!3d5.3442276!4d-4.0114595!16s%2Fg%2F113fj5416!3m5!1s0xfc1eb65b2414379:0x1a1b717d3b74873f!8m2!3d5.3442708!4d-4.0120909!16s%2Fg%2F11y1xrw2cv?hl=fr&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                        className="text-white text-sm transition hover:text-[#dfe7b3]"
                      >
                        {translatedFooter.location}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative z-40">
                <p className="text-white uppercase font-semibold">
                  {translatedFooter.title2}
                </p>
                <div className="mt-5">
                  <ul className="flex gap-5 flex-col">
                    <li>
                      <span className="text-white text-sm">{translatedFooter.link5}</span>
                    </li>
                    <li>
                      <span className="text-white text-sm">{translatedFooter.link6}</span>
                    </li>
                    <li>
                      <span className="text-white text-sm">{translatedFooter.link7}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#edf2d088] h-7  w-full flex flex-col items-center justify-center overflow-hidden relative z-40">
        <p className="text-white text-sm">MARABU © 2025 designed by MARABU</p>
      </div>
    </footer>
  );
};

export default Footer;
