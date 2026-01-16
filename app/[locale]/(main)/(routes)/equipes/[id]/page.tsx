"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Load from "@/components/load";
import { Mail, Phone, Linkedin, ArrowLeft } from "lucide-react";

const TeamMemberPage = () => {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const id = params?.id as string;

  const fetchProfileById = async (profileId: string) => {
    try {
      const res = await fetch(
        locale == "fr"
          ? `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/profiles/${profileId}?lang=fr`
          : `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/profiles/${profileId}?lang=en`
      );
      if (!res.ok) {
        throw new Error("Profile not found");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      return null;
    }
  };

  const queryProfile = useQuery({
    queryKey: ["profileById", id, locale],
    queryFn: () => fetchProfileById(id ?? ""),
    enabled: !!id,
  });

  function decodeHtmlEntities(text: string) {
    if (typeof window === "undefined") return text;
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  if (queryProfile.isLoading) {
    return <Load />;
  }

  if (queryProfile.isError || !queryProfile.data) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1D4851] mb-4">
            {locale === "fr" ? "Profil non trouvé" : "Profile not found"}
          </h1>
          <Link
            href="/apropos"
            className="inline-flex items-center gap-2 text-[#689D71] hover:text-[#1D4851] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {locale === "fr" ? "Retour à l'équipe" : "Back to team"}
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const member = queryProfile.data;

  return (
    <div className="pt-20 font-medium text-gray-400">
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-[1550px] w-full mx-auto px-6 md:px-10">
          {/* Bouton retour */}
          <Link
            href="/apropos"
            className="inline-flex items-center gap-2 text-[#689D71] hover:text-[#1D4851] transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">
              {locale === "fr" ? "Retour à l'équipe" : "Back to team"}
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Photo du membre */}
              <div className="relative">
                <Card className="overflow-hidden  rounded-2xl">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={member.photo || "/placeholder.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      quality={90}
                    />
                  </div>
                </Card>
              </div>

              {/* Informations du membre */}
              <div className="col-span-2 w-full">
                <div className="bg-white rounded-2xl p-8">
                  {/* Nom et titre */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-bold text-[#1D4851] mb-2">
                      {member.name}
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                      {member.title || locale === "fr"
                        ? "Membre de l'équipe"
                        : "Team member"}
                    </p>
                  </div>

                  {/* À propos */}
                  {member.about && (
                    <div className="space-y-4 mb-8">
                      <h2 className="text-2xl font-semibold text-[#1D4851]">
                        {locale === "fr" ? "À propos" : "About"}
                      </h2>
                      <div
                        className="text-gray-600 leading-relaxed prose prose-sm max-w-none
                          prose-p:text-gray-600 prose-p:mb-4
                          prose-strong:text-[#1D4851] prose-strong:font-semibold
                          prose-ul:text-gray-600 prose-ul:ml-6
                          prose-ol:text-gray-600 prose-ol:ml-6"
                        dangerouslySetInnerHTML={{
                          __html: decodeHtmlEntities(member.about),
                        }}
                      />
                    </div>
                  )}

                  {/* Formation */}
                  {/* {member.education && member.education.length > 0 && (
                    <div className="space-y-4 mb-8">
                      <h2 className="text-2xl font-semibold text-[#1D4851]">
                        {locale === "fr" ? "Formation" : "Education"}
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {member.education.map((edu: string, index: number) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  )} */}

                  {/* Expertise */}
                  {/* {member.expertise && member.expertise.length > 0 && (
                    <div className="space-y-4 mb-8">
                      <h2 className="text-2xl font-semibold text-[#1D4851]">
                        {locale === "fr" ? "Expertise" : "Expertise"}
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {member.expertise.map((exp: string, index: number) => (
                          <li key={index}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                  )} */}

                  {/* Réalisations */}
                  {/* {member.achievements && member.achievements.length > 0 && (
                    <div className="space-y-4 mb-8">
                      <h2 className="text-2xl font-semibold text-[#1D4851]">
                        {locale === "fr" ? "Réalisations" : "Achievements"}
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {member.achievements.map(
                          (achievement: string, index: number) => (
                            <li key={index}>{achievement}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )} */}

                  {/* Contact */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h2 className="text-2xl font-semibold text-[#1D4851] mb-4">
                      {locale === "fr" ? "Contact" : "Contact"}
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-3 px-6 py-3 bg-[#689D71]/10 hover:bg-[#689D71]/20 text-[#689D71] rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          <Mail className="w-5 h-5" />
                          <span className="font-medium">{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-3 px-6 py-3 bg-[#1D4851]/10 hover:bg-[#1D4851]/20 text-[#1D4851] rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          <Phone className="w-5 h-5" />
                          <span className="font-medium">{member.phone}</span>
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          <Linkedin className="w-5 h-5" />
                          <span className="font-medium">LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPage;
