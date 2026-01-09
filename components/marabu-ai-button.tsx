"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface MarabuAIButtonProps {
  onOpen: () => void;
}

export default function MarabuAIButton({ onOpen }: MarabuAIButtonProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const [isVisible, setIsVisible] = useState(false);

  // Afficher le bouton après un court délai
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-50 w-16 h-16  bg-[#1D4851] text-white rounded-full shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-110 border-2 border-white/20"
      aria-label={locale === "fr" ? "Ouvrir Marabu AI" : "Open Marabu AI"}
    >
      <div className="relative">
        <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#fff] rounded-full flex items-center justify-center">
          <span className="text-[8px] font-bold text-[#1D4851]">AI</span>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1D4851] text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        {locale === "fr" ? "Marabu AI" : "Marabu AI"}
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#1D4851]"></div>
      </div>
    </motion.button>
  );
}
