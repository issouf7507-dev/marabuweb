# Audit Qualité du Code — Marabuweb

**Statut : ✅ TOUS CORRIGÉS le 11 mai 2026** *(sauf CODE-02 invalidé et CODE-07 partiellement)*

---

## CODE-01 — Sheet de contact copié-collé 5 fois (CRITIQUE)

**Fichiers concernés :**
- `app/[locale]/(main)/page.tsx` (lignes 1905–2076)
- `app/components/header.tsx` (lignes 305–483)
- `app/[locale]/(main)/(routes)/apropos/page.tsx` (lignes 1265–1437)
- `app/[locale]/(main)/(routes)/solutions/page.tsx` (lignes 810–982)
- `app/[locale]/(main)/(routes)/actualites/[slug]/page.tsx` (lignes 453–624)

Le composant Sheet de contact (avec les 4 cards d'info + Google Maps + ContactForm + images de décoration) est **exactement identique** dans ces 5 fichiers, représentant ~200 lignes dupliquées × 5 = 1000 lignes de duplication.

**Solution :** Créer un composant `ContactSheet` dans `app/components/contact-sheet.tsx` :
```tsx
// app/components/contact-sheet.tsx
interface ContactSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ContactSheet({ open, onOpenChange }: ContactSheetProps) { ... }
```

---

## CODE-02 — Version Next.js inexistante dans package.json (ÉLEVÉ)

**Fichier :** `package.json:28`

```json
"next": "^16.0.8"
```

Next.js 16 n'existe pas. La version stable actuelle est 15.x. C'est probablement une faute de frappe (`^15.0.8` ou `^15.3.x`). Vérifier quelle version est réellement installée : `cat node_modules/next/package.json | grep '"version"'`.

---

## CODE-03 — Deux bibliothèques i18n installées en parallèle (ÉLEVÉ)

**Fichier :** `package.json:29`

```json
"next-i18next": "^15.4.2",  ← non utilisée
"next-intl": "^4.1.0",     ← utilisée
```

Le projet utilise `next-intl` mais `next-i18next` est aussi installée (2,5 MB supplémentaires dans le bundle). Il y a aussi un fichier `next-i18next.config.js` résiduel.

**Solution :** Supprimer `next-i18next` : `npm uninstall next-i18next` et supprimer `next-i18next.config.js`.

---

## CODE-04 — Imports non utilisés dans plusieurs fichiers (MOYEN)

**`app/[locale]/(main)/page.tsx:31`**
```tsx
import { experience, logosSlide, servicesData, slides } from "@/data/data";
// 'experience' et 'servicesData' ne sont jamais utilisés dans ce fichier
// (le contenu vient de translatedExpertise.experience depuis les traductions)
```

**`app/components/header.tsx:23`**
```tsx
import { CardFooter } from "@/components/ui/card";  // jamais utilisé
```

**Packages npm installés mais non utilisés :**
- `@google-cloud/translate` — non utilisé dans le code source
- `swiper` et `@types/swiper` — le projet utilise `embla-carousel`, pas swiper
- `split-type` — non utilisé dans les fichiers lus

---

## CODE-05 — JSX orphelin dans apropos/page.tsx (ÉLEVÉ)

**Fichier :** `app/[locale]/(main)/(routes)/apropos/page.tsx:1442-1445`

```tsx
export default Page;

<div className="w-56 h-60 bg-white shadow-2xl rounded-2xl relative">
  <div className="absolute -top-10 -right-10 bg-[#1D4851] w-56 h-60 rounded-2xl -z-10"></div>
</div>;
```

Du JSX est écrit **après** l'export du composant. Ce code est ignoré par React mais pollue le fichier. À supprimer.

---

## CODE-06 — `id` de l'article extrait du pathname au lieu des params (MOYEN)

**Fichier :** `app/[locale]/(main)/(routes)/actualites/[slug]/page.tsx:34`

```tsx
const id = pathname.split("/").pop();  // fragile
```

Le paramètre est disponible directement via `useParams()` qui est déjà importé :
```tsx
const params = useParams();
const id = params?.slug as string;  // correct
```

---

## CODE-07 — Type `any` utilisé massivement (MOYEN)

Exemples dans `apropos/page.tsx`, `actualites/page.tsx`, `actualites/[slug]/page.tsx` :
```tsx
.filter((profile: any) => profile.isActive)
.map((el: any, idx: number) => ...)
.filter((article: any) => article.id !== id)
```

Des interfaces TypeScript devraient être définies pour les types `Article`, `Profile`, `Pagination` pour profiter de la sécurité des types.

---

## CODE-08 — URL WordPress hardcodée dans apropos/page.tsx (MOYEN)

**Fichier :** `app/[locale]/(main)/(routes)/apropos/page.tsx:192`

```tsx
const res = await fetch(
  "https://main.marabu.services/wp-json/wp/v2/articles?acf_format=standard&_fields=id,title,acf,date,date_gmt"
);
```

Cette URL WordPress est hardcodée (pas dans les variables d'environnement) et utilise un format de données différent (`el?.acf?.large_image`) de l'API backend principale (`el?.featuredImage`). Le rendu affiche `el?.acf?.large_image` qui peut être `undefined` si l'API WordPress renvoie une structure différente.

**Solution :** Migrer vers l'API backend principale et supprimer la référence WordPress.

---

## CODE-09 — Section Magazine dans apropos utilise l'ancienne API WordPress (MOYEN)

**Fichier :** `app/[locale]/(main)/(routes)/apropos/page.tsx:1186-1243`

La section magazine dans `apropos` utilise `queryArticles` (API WordPress) avec le format `el?.acf?.large_image` et `el?.title?.rendered`, alors que toutes les autres pages utilisent `queryArticlesbyMarabu` (nouvelle API) avec `el?.featuredImage` et `el?.title`. C'est incohérent et peut afficher des images cassées.

---

## CODE-10 — Code commenté laissé dans les fichiers (BAS)

De nombreux blocs de code sont commentés et non supprimés dans les fichiers :
- `page.tsx` : sections entières de bouton CTA commentées (lignes 468-482)
- `apropos/page.tsx` : sections education, expertise, achievements commentées
- `header.tsx` : menu hardcodé commenté (lignes 33-55)
- `apropos/page.tsx` : section hidden vide (lignes 699-709)

Ces blocs devraient être supprimés ou trackés dans un système de tickets.

---

## CODE-11 — Typos dans les objets de données de traduction (BAS)

Dans les fichiers de traduction (non lus mais visibles à l'usage), les propriétés menu utilisent :
- `herf` au lieu de `href`
- `tilte` au lieu de `title`

Ces typos passent à cause du type `any` (CODE-07) et peuvent causer des bugs silencieux.
