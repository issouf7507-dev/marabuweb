# Audit Performance — Marabuweb

**Statut : ✅ TOUS CORRIGÉS le 11 mai 2026** *(sauf PERF-04 refactoring composants — travail continu)*

---

## PERF-01 — Loading artificiel de 2 secondes sur chaque page (ÉLEVÉ)

**Fichiers :**
- `app/[locale]/(main)/page.tsx:294-299`
- `app/[locale]/(main)/(routes)/apropos/page.tsx:181-187`
- `app/[locale]/(main)/(routes)/solutions/page.tsx:121-127`

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000);  // ← 2 secondes d'attente artificielle !
  return () => clearTimeout(timer);
}, []);
```

Chaque page attend 2 secondes avant d'afficher le contenu, **même si les données sont déjà chargées**. C'est une très mauvaise pratique UX et impacte directement les Core Web Vitals (LCP).

**Solution :** Supprimer ces timers. Si un écran de chargement est voulu, le montrer uniquement le temps du vrai chargement des données.

---

## PERF-02 — Optimisation des images désactivée globalement (ÉLEVÉ)

**Fichier :** `next.config.ts:14`

```ts
unoptimized: true, // Bypass image optimization to allow private IP resolution
```

Cela désactive l'optimisation automatique des images de Next.js (conversion WebP/AVIF, redimensionnement, lazy loading optimisé). Les images sont servies telles quelles, ce qui impacte fortement les Core Web Vitals (LCP, TBT).

**Solution :** Utiliser un loader d'image compatible ou configurer un `loader` personnalisé plutôt que de tout désactiver. Si le problème est lié aux images privées, les servir via une URL publique ou un proxy.

---

## PERF-03 — 100 articles chargés pour la navigation dans les articles (MOYEN)

**Fichier :** `app/[locale]/(main)/(routes)/actualites/[slug]/page.tsx:103`

```tsx
const res = await fetch(
  `${process.env.NEXT_PUBLIC_BACK_END_URL_API}/api/articles?page=1&limit=100&lang=fr`
);
```

100 articles sont chargés côté client uniquement pour pouvoir naviguer entre les articles (précédent/suivant). C'est très inefficace.

**Solution :** L'API devrait retourner les IDs `previousArticle` et `nextArticle` dans la réponse d'un article individuel, évitant ce chargement massif.

---

## PERF-04 — Page home de 2103 lignes (MOYEN)

**Fichier :** `app/[locale]/(main)/page.tsx`

La page d'accueil fait 2103 lignes dans un seul fichier. C'est un composant monolithique qui devrait être découpé en composants séparés :
- `HeroSection`
- `ServicesSection`
- `PartnairesSection`
- `AboutUsSection`
- `ExpertiseSection`
- `BoostSection`
- `TestimonialsSection`
- `GrowthSection`
- `MagazineSection`

Cela améliorerait la lisibilité, la maintenabilité et permettrait du code splitting si nécessaire.

---

## PERF-05 — QueryClient créé dans un Client Component Layout (MOYEN)

**Fichier :** `app/[locale]/(main)/layout.tsx`

```tsx
"use client";
const queryClient = new QueryClient();
```

Bien que le QueryClient soit au niveau module (singleton), la recommandation officielle de TanStack Query pour Next.js App Router est d'utiliser `useState` pour garantir que chaque requête SSR crée sa propre instance :

```tsx
const [queryClient] = useState(() => new QueryClient());
```

La configuration actuelle peut causer des fuites de données entre utilisateurs en SSR.

---

## PERF-06 — Slides hero avec textes hardcodés non traduits (BAS)

**Fichier :** `data/data.ts:8-33`

Les objets `slides` contiennent des textes en français hardcodés :
```ts
heading: "Des stratégies innovantes \n pour une croissance \n durable..."
```

Ces textes ne sont pas traduits (contrairement aux autres contenus qui passent par `next-intl`). Sur la version anglaise, le hero affiche du français.

---

## PERF-07 — 4 images line1.svg chargées dans la section croissance (BAS)

**Fichier :** `app/[locale]/(main)/page.tsx:1365-1393`

La même image SVG `line1.svg` est chargée 4 fois avec `<Image>` :
```tsx
<Image src="/icons/line1.svg" alt="line1" width={1000} height={1000} ... />
<Image src="/icons/line1.svg" alt="line1" width={1000} height={1000} ... />
<Image src="/icons/line1.svg" alt="line1" width={1000} height={1000} ... />
<Image src="/icons/line1.svg" alt="line1" width={1000} height={1000} ... />
```

Pour des SVG décoratifs, utiliser directement du CSS (`background-image`) ou des `<img>` simples.
