"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
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
import ContactForm from "./contact-form";

interface ContactSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactSheet({ open, onOpenChange }: ContactSheetProps) {
  const t = useTranslations("contact");

  const contact = t.raw("sheet") as {
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
    subjectPlaceholder?: string;
    messagePlaceholder: string;
    sendButton: string;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[100vw] h-[100vh] lg:w-3/4 py-8 overflow-y-auto overflow-x-hidden">
        <SheetHeader>
          <SheetTitle className="text-center">{contact.heading}</SheetTitle>
          <SheetDescription className="text-center">
            {contact.subheading}
          </SheetDescription>
        </SheetHeader>

        <Image
          src="/image/coris.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="absolute top-0 left-0"
        />
        <Image
          src="/image/coris.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="absolute top-0 right-0 rotate-90"
        />
        <Image
          src="/image/coris.png"
          alt=""
          aria-hidden="true"
          width={300}
          height={300}
          className="absolute top-0 right-[30%] -rotate-45 -translate-x-1/2"
        />

        <div className="mx-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="relative z-30">
              <CardHeader className="flex items-center justify-center flex-col">
                <CardTitle className="h-10">
                  <Image
                    width={24}
                    height={24}
                    src="/phoneicon.png"
                    alt="Téléphone"
                  />
                </CardTitle>
                <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                  {contact.telText}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="tel:+2250720777000"
                  className="text-center text-[14px] block hover:text-[#1D4851] transition-colors cursor-pointer font-semibold"
                >
                  {contact.telNumber}
                </Link>
              </CardContent>
            </Card>

            <Card className="relative z-30">
              <CardHeader className="flex items-center justify-center flex-col">
                <CardTitle className="h-10">
                  <Image
                    width={24}
                    height={24}
                    src="/sendicon.png"
                    alt="Email"
                  />
                </CardTitle>
                <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                  {contact.emailText}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="mailto:contact@marabu.services"
                  className="text-center text-[14px] block hover:text-[#1D4851] transition-colors cursor-pointer font-semibold"
                >
                  {contact.email}
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
                    alt="Localisation"
                  />
                </CardTitle>
                <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                  {contact.locationText}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  className="text-center text-[14px] block hover:text-[#1D4851] transition-colors cursor-pointer font-semibold"
                  href="https://www.google.ci/maps/place/Marabu/@5.3438891,-4.0126815,19z/data=!4m14!1m7!3m6!1s0xfc1eb0c78647443:0xb23bdc45be977419!2sPharmacie+du+Lyc%C3%A9e+Technique!8m2!3d5.3442276!4d-4.0114595!16s%2Fg%2F113fj5416!3m5!1s0xfc1eb65b2414379:0x1a1b717d3b74873f!8m2!3d5.3442708!4d-4.0120909!16s%2Fg%2F11y1xrw2cv?hl=fr&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.location1} <br />
                  {contact.location2}
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
                    alt="Horaires"
                  />
                </CardTitle>
                <CardDescription className="text-center text-[16px] font-bold text-[#1D4851]">
                  {contact.openingHoursText}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-[14px]">{contact.openingHours1}</p>
                <p className="text-center text-[14px]">{contact.openingHours2}</p>
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
                  title="Localisation Marabu"
                ></iframe>
              </div>
              <div>
                <div className="lg:px-4 relative z-30">
                  <ContactForm
                    onSuccess={() => {
                      setTimeout(() => onOpenChange(false), 2000);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Image
            src="/image/coris.png"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="absolute -bottom-10 right-[30%] -rotate-45 -translate-x-1/2"
          />
          <Image
            src="/image/coris.png"
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            className="absolute -bottom-10 right-0"
          />
          <Image
            src="/image/Ellipse.png"
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            className="absolute -bottom-80 left-0 rotate-180"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
