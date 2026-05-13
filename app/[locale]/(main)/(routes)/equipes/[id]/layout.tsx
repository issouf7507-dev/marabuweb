import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const isFr = locale === "fr";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/profiles/${id}?lang=${locale}`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const member = await res.json();
      const name = member?.name || (isFr ? "Membre de l'équipe" : "Team member");
      const role = member?.title || "";

      return {
        title: `${name}${role ? ` — ${role}` : ""} | Marabu`,
        description: member?.about
          ? member.about.replace(/<[^>]+>/g, "").slice(0, 160)
          : isFr
          ? `Découvrez le profil de ${name}, membre de l'équipe Marabu.`
          : `Discover the profile of ${name}, a member of the Marabu team.`,
        openGraph: {
          title: `${name} | Marabu`,
          description: role || (isFr ? "Équipe Marabu" : "Marabu Team"),
          url: `https://marabu.services/${locale}/equipes/${id}`,
          images: member?.photo
            ? [{ url: member.photo, width: 400, height: 533 }]
            : [],
        },
      };
    }
  } catch {
    // fallback ci-dessous
  }

  return {
    title: isFr ? "Profil | Marabu" : "Profile | Marabu",
    description: isFr ? "Membre de l'équipe Marabu." : "Marabu team member.",
  };
}

export default function EquipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
