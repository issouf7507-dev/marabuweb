import {
  DataItem,
  experienceType,
  logosSlideTypes,
  servicesDataTypes,
} from "@/types";

export const slides = [
  {
    image: "/image/marabu_conseil_accueil.jpg",
    heading:
      "Des stratégies innovantes \n pour une croissance \n durable et performante",
    subheading: `Marabu est un cabinet de conseil stratégique et d'intermédiation spécialisé  dans l'accompagnement \n des entreprises et des institutions pour relever leurs défis  de croissance et d'optimisation. \n Grâce à notre expertise approfondie,  nous proposons des solutions  adaptées aux PME, \n grandes entreprises et institutions souhaitant maximiser leur performance`,
    buttonLink: "/solutions#conseil",
    alt: "Marabu conseil accueil",
  },
  {
    image: "/image/marabu_services_accueil.png",
    heading: "Des services optimisés \n pour votre développement",
    subheading: `Nous facilitons la mise en relation avec des partenaires stratégiques, 
    fournisseurs et investisseurs pour accélérer votre croissance et maximiser vos opportunités d'affaires. 
    Notre approche garantit des transactions fluides et des collaborations fructueuses.`,
    buttonLink: "/solutions#services",
    alt: "Marabu services accueil",
  },
  {
    image: "/image/marabu_intermediation_accueil.png",
    heading: "Un réseau puissant \n pour une intermédiation efficace",
    subheading: `Nous aidons les entreprises et investisseurs à réussir leur implantation en Afrique de l’Ouest en identifiant les meilleures opportunités.`,
    buttonLink: "/solutions#intermediation",
    alt: "Marabu intermediation accueil",
  },
];

export const logosSlide: logosSlideTypes[] = [
  {
    id: 1,
    logo: "/logos/Yango_marabu.png",
    href: "https://yango.com/",
  },
  {
    id: 2,
    logo: "/logos/Logo_CIE_marabu.jpg",
    href: "https://cie.ci/",
  },
  {
    id: 3,
    logo: "/logos/logo-guce_marabu.png",
    href: "https://guce.gouv.ci/",
  },
  {
    id: 4,
    logo: "/logos/Amcham-ci_marabu.png",
    href: "https://amcham-ci.org/",
  },

  {
    id: 5,
    logo: "/logos/CADERAC_marabu.png",
    href: "https://www.caderac.com/",
  },

  {
    id: 6,
    logo: "/logos/GUDE_PME_marabu.png",
    href: "https://www.gudepme.ci/",
  },

  {
    id: 7,
    logo: "/logos/Logo_Ministère_de_l_emploi_marabu.png",
    href: "/https://www.emploi.gouv.ci/",
  },

  {
    id: 8,
    logo: "/logos/ministere_de_la_transition_numerique_et_de_la_digitalisation_marabu.png",
    href: "/https://telecom.gouv.ci/",
  },

  {
    id: 9,
    logo: "/logos/ministere_du_commerce_marabu.png",
    href: "https://www.commerce.gouv.ci/",
  },
  {
    id: 10,
    logo: "/logos/Visa_marabu.png",
    href: "https://africa.visa.com/",
  },
  {
    id: 11,
    logo: "/logos/logo_vitib_marabu.png",
    href: "https://www.vitib.ci/",
  },
  // {
  //   id: 9,
  //   logo: "/logos/ministere_du_commerce.png",
  //   href: "https://guce.gouv.ci/",
  // },
];
export const servicesData: servicesDataTypes[] = [
  {
    id: 1,
    title: "Conseil",
    description:
      "Nos solutions de conseil sont conçues pour vous accompagner dans vos défis. Nous proposons des stratégies personnalisées et innovantes axées sur la transformation, l'optimisation des processus et la conduite du changement tout en intégrant des approches sur mesure pour moderniser les structures et renforcer les compétences, pour moderniser les structures et renforcer les compétences",
  },
  {
    id: 2,
    title: "Services",
    description:
      "Nos solutions d'intermédiation visent à créer des synergies efficaces entre vous et vos partenaires clés. Nous facilitons les connexions, favorisons les collaborations fructueuses et accompagnons la mise en œuvre de vos projets innovants. Grâce à notre expertise, nous optimisons les échanges et assurons des partenariats durables pour maximiser votre impact.",
  },
  {
    id: 3,
    title: "Intermédiation",
    description:
      "Nos services sont conçus pour faciliter vos projets et accélérer votre croissance. Nous vous accompagnons dans la mise en œuvre de solutions pragmatiques et efficaces. Grâce à des approches sur mesure, nous favorisons la gestion optimisée des opérations pour concrétiser vos ambitions.",
  },
];

export const experience: experienceType[] = [
  {
    id: 1,
    step: "Etape 1",
    title: "Capacité d'Innovation ",
    desc: "Nous nous appuyons sur une forte capacité d'innovation pour anticiper les tendances du marché et nous adaptons aux besoins spécifiques de chaque client, garantissant des solutions fiable.",
    icons: "/icons/innovation_marabu.svg",
    alt: "Innovation Marabu",
  },
  {
    id: 2,
    step: "Etape 2",
    title: "Crédibilité et Réputation",
    desc: "Marabu bénéficie d'une solide crédibilité et réputation dans l'accompagnement des entreprises, grâce à notre expertise reconnue et notre approche axée sur la réussite à long terme de nos clients.",
    icons: "/icons/reputation_marabu.svg",
    alt: "Réputation Marabu",
  },
  {
    id: 3,
    step: "Etape 3",
    title: "Offre de Services Structurée",
    desc: "Nous offrons une gamme complète de services structurés, allant de la stratégie marketing à la transformation digitale, en passant par la gestion de la réputation et le branding.",
    icons: "/icons/services_structuree_marabu.svg",
    alt: "Services Structurée Marabu",
  },
  {
    id: 4,
    step: "Etape 4",
    title: "Méthodologie et Outils",
    desc: "Nous appliquons une méthodologie rigoureuse, soutenue par des outils de pointe, pour garantir une gestion optimale des projets et une exécution fluide, tout en maximisant la performance.",
    icons: "/icons/methodologie_outils_marabu.svg",
    alt: "Methodologie et Outils Marabu",
  },
];

export const fakeData: DataItem[] = [
  {
    date: "2025-02-24",
    title: "Pe est laborum pe est laborumpe",
    desc: "Est laborum. Sed ut pe est laborum. Sed ut pe est laborum.",
  },
  {
    date: "2025-02-23",
    title: "Lorem Ipsum Dolor",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    date: "2025-02-22",
    title: "Aliquam Erat Volutpat",
    desc: "Aliquam erat volutpat. Fusce auctor, justo eget tincidunt sagittis.",
  },
  {
    date: "2025-02-22",
    title: "Aliquam Erat Volutpat",
    desc: "Aliquam erat volutpat. Fusce auctor, justo eget tincidunt sagittisq.",
  },
];
