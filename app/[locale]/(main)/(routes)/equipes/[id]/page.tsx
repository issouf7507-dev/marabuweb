"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const TeamMemberPage = () => {
  const params = useParams();
  // console.log(params.id);

  const local = useLocale();
  // console.log(local);

  const t = useTranslations("apropos");

  const teamMembers = t.raw("team.teamMembers") as {
    id: string;
    name: string;
    role: string;
    params: string;
    image: string;
    social: {
      facebook: string;
      linkedin: string;
    };
    linkLinkedin: string;
    cv: string;
    contact: {
      email: string;
      phone: string;
    };
    bio: string;
    education: string[];
    expertise: string[];
    skills: string[];
    achievements: string[];
  }[];

  const member = teamMembers.find((m) => m.params === params.id);

  if (!member) {
    return <div>Membre non trouvé</div>;
  }

  return (
    <div className="pt-20 font-medium text-gray-400 ">
      <div className="min-h-[80vh] bg-gray-50 py-10 flex justify-center items-center">
        <div className="max-w-[1550px] w-full mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <Card className="overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              </div>

              <div className="col-span-2 w-full relative">
                <div>
                  <h1 className="text-3xl font-bold text-[#1D4851]">
                    {member.name}
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">{member.role}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#1D4851]">
                    {local === "fr" ? "À propos" : "About"}
                  </h2>
                  <p className="text-gray-600">{member.bio}</p>
                </div>

                <div className="mt-5 grid md:grid-cols-2 items-start gap-5">
                  {member.education && member.education.length > 0 && (
                    <div className="space-y-4 m">
                      <h2 className="text-xl font-semibold text-[#1D4851]">
                        {local === "fr" ? "Formation" : "Education"}
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {member.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {member.expertise && member.expertise.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-[#1D4851]">
                        {local === "fr" ? "Expertise" : "Expertise"}
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {member.expertise.map((exp, index) => (
                          <li key={index}>{exp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  {member.achievements && member.achievements.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-[#1D4851]">
                        {local === "fr" ? "Réalisations" : "Achievements"}
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {member.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  {member.contact && (
                    <div className="space-y-4 mt-8">
                      <div className="text-gray-600 space-y-2 flex flex-col md:flex-row gap-3 items-start">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/sendicon.png"
                            alt="email icon"
                            width={20}
                            height={20}
                          />
                          <Link
                            href={`mailto:${member.contact.email}`}
                            className="hover:text-[#1D4851] transition-colors"
                          >
                            {member.contact.email}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <Image
                            src="/phoneicon.png"
                            alt="phone icon"
                            width={17}
                            height={17}
                          />
                          <Link
                            href={`tel:${member.contact.phone}`}
                            className="hover:text-[#1D4851] transition-colors"
                          >
                            {member.contact.phone}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
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
