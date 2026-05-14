"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ContactSheet from "@/app/components/contact-sheet";

type BadgeType = "green" | "gold" | "muted" | "";

interface Product {
  ref: string;
  badge: string;
  badgeType: BadgeType;
  name: string;
  hook: string;
  desc: string;
  items: string[];
  proofs: string[];
  price: string;
  targets: string[];
}

interface Section {
  title: string;
  products: Product[];
}

interface Pole {
  heading: string;
  subheading: string;
  notice?: string;
  sections: Section[];
}

const POLES = [
  { id: "conseil", num: "01", image: "/persons/conseil_2_marabu.jpg" },
  { id: "services", num: "02", image: "/persons/servive_1_marabu.jpg" },
  { id: "intermediation", num: "03", image: "/persons/intermediation_1_marabu.jpg" },
] as const;

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      variants={{ hidden: { y: 24, opacity: 0 }, reveal: { y: 0, opacity: 1 } }}
      initial="hidden"
      whileInView="reveal"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-[#689D71]/40
                 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="flex flex-1 flex-col p-6 gap-4">

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {product.badge && (
              <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2
                ${product.badgeType === "green" ? "bg-[#689D71]/15 text-[#689D71]"
                  : product.badgeType === "gold" ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-500"}`}>
                {product.badge}
              </span>
            )}
            <h3 className="text-base font-bold text-[#1D4851] leading-snug">
              {product.name}
            </h3>
            <p className="text-sm italic text-gray-400 mt-0.5">{product.hook}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">{product.desc}</p>

        <ul className="space-y-2">
          {product.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#689D71] shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{item}</span>
            </li>
          ))}
        </ul>

        {product.proofs.length > 0 && (
          <div className="rounded-xl bg-[#1D4851]/4 border-l-[3px] border-[#689D71] pl-4 pr-3 py-3">
            <p className="text-[10px] font-bold text-[#689D71] uppercase tracking-widest mb-1.5">
              Missions réalisées
            </p>
            <ul className="space-y-1">
              {product.proofs.slice(0, 2).map((proof, i) => (
                <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#689D71] shrink-0" />
                  {proof}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {product.targets.map((t, i) => (
            <span key={i} className="text-[10px] font-semibold uppercase tracking-wide
               bg-[#1D4851]/6 text-[#1D4851] px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function SolutionsPage() {
  const [openContact, setOpenContact] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("conseil");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const t = useTranslations("solutions");
  const t2 = useTranslations("home");
  const locale = useLocale();

  const poles: Record<string, Pole> = {
    conseil: t.raw("conseil") as Pole,
    services: t.raw("services") as Pole,
    intermediation: t.raw("intermediation") as Pole,
  };

  const translatedBoost = t2.raw("boost") as {
    heading: string; heading2: string;
    subheading1: string; subheading2: string; cta: string;
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    POLES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      sectionRefs.current[id] = el;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white">

      {/* ── Sticky Tab Nav ── */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-[1350px] mx-auto px-6 md:px-10 flex gap-0">
          {POLES.map(({ id, num }) => {
            const pole = poles[id];
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors duration-200
                  ${isActive ? "text-[#1D4851]" : "text-gray-400 hover:text-gray-600"}`}
              >
                <span className={`text-xs font-bold ${isActive ? "text-[#689D71]" : "text-gray-300"}`}>
                  {num}
                </span>
                <span className="uppercase tracking-wider">{pole.heading}</span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#689D71]"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Poles ── */}
      {POLES.map(({ id, num, image }, poleIdx) => {
        const pole = poles[id];
        const totalProducts = pole.sections.reduce((s, sec) => s + sec.products.length, 0);

        return (
          <section key={id} id={id} className="scroll-mt-32">

            {/* Pole hero */}
            <div className="relative h-[360px] md:h-[420px] overflow-hidden">
              <Image
                src={image}
                alt={pole.heading}
                fill
                className="object-cover"
                loading={poleIdx === 0 ? "eager" : "lazy"}
                quality={85}
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#1D4851]/90 via-[#1D4851]/70 to-transparent" />

              <div className="absolute inset-0 flex items-end pb-10 px-6 md:px-10 max-w-[1350px] mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#689D71] text-sm font-bold uppercase tracking-widest">
                      Pôle {num}
                    </span>
                    <span className="h-px w-8 bg-[#689D71]" />
                    <span className="text-white/50 text-xs">
                      {totalProducts} {locale === "fr" ? "offres" : "offerings"}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                    {pole.heading}
                  </h2>

                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
                    {pole.subheading}
                  </p>

                  {pole.notice && (
                    <div className="mt-4 bg-[#689D71]/20 border border-[#689D71]/40 rounded-xl px-4 py-3 text-sm text-white/90 max-w-lg">
                      {pole.notice}
                    </div>
                  )}
                </motion.div>

                {/* Big number watermark */}
                <span className="absolute right-8 bottom-4 text-[120px] md:text-[160px] font-black text-white/4 leading-none select-none pointer-events-none">
                  {num}
                </span>
              </div>
            </div>

            {/* Sections + cards */}
            <div className="max-w-[1350px] mx-auto px-6 md:px-10 py-12 space-y-14">
              {pole.sections.map((section, secIdx) => (
                <div key={section.title}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <span className="text-2xl font-black text-gray-100 select-none">
                      {String(secIdx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#689D71]">
                        {section.title}
                      </h3>
                      <div className="h-0.5 w-12 bg-[#689D71]/30 mt-1" />
                    </div>
                  </motion.div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.products.map((product, i) => (
                      <ProductCard key={product.ref} product={product} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Inter-pole divider (sauf dernier) */}
            {poleIdx < POLES.length - 1 && (
              <div className="max-w-[1350px] mx-auto px-6 md:px-10">
                <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
              </div>
            )}
          </section>
        );
      })}

      {/* ── CTA Boost ── */}
      <section className="mt-16">
        <div className="bg-[url(/image/booster_croissance_marabu.png)] w-full bg-cover relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#1D4851]/75 z-10" />
          <div className="relative z-20 max-w-[1350px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[#689D71] text-sm font-bold uppercase tracking-widest mb-2"
              >
                {locale === "fr" ? "Un projet en tête ?" : "A project in mind?"}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                {translatedBoost.heading}
                <br />
                <span className="text-[#689D71]">{translatedBoost.heading2}</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-sm mt-3 max-w-md"
              >
                {translatedBoost.subheading1}
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              onClick={() => setOpenContact(true)}
              className="shrink-0 flex items-center gap-3 bg-white text-[#1D4851] font-bold
                         px-6 py-4 rounded-xl hover:bg-[#689D71] hover:text-white transition-all duration-300 group"
            >
              {translatedBoost.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      <ContactSheet open={openContact} onOpenChange={setOpenContact} />
    </div>
  );
}
