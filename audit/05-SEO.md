# Audit SEO — Marabuweb

**Statut : ✅ TOUS CORRIGÉS le 11 mai 2026**

---

## SEO-01 — Pas de métadonnées spécifiques aux sous-pages (ÉLEVÉ)

Seul le layout `app/[locale]/layout.tsx` génère des métadonnées. Les pages suivantes n'ont pas de `generateMetadata` propre :

- `/solutions` — pas de title/description spécifique
- `/apropos` — pas de title/description spécifique
- `/actualites` — pas de title/description spécifique
- `/actualites/[slug]` — pas de title/description dynamique basée sur le titre de l'article (critique pour le SEO des articles)
- `/equipes/[id]` — pas de title/description basée sur le membre d'équipe

Chaque page devrait avoir ses propres métadonnées dynamiques, notamment les pages articles avec le titre et la description de l'article.

---

## SEO-02 — Sitemap statique vs contenu dynamique (MOYEN)

**Fichier :** `public/sitemap.xml`

Il existe un `sitemap.xml` statique dans `/public`. Cependant :
- Les articles sont créés dynamiquement depuis l'API backend
- Les profils d'équipe sont dynamiques
- Ces URLs ne sont pas dans le sitemap statique

Il y a aussi un script npm `"sitemap": "next-sitemap"` et un fichier `next-sitemap.config.js`, mais sans les routes dynamiques configurées.

**Solution :** Configurer `next-sitemap.config.js` avec des `additionalPaths` ou utiliser le système de sitemap natif de Next.js App Router (`app/sitemap.ts`).

---

## SEO-03 — `<html lang>` fixe (référence A11Y-01) (ÉLEVÉ)

Voir A11Y-01. L'attribut `lang` incorrect impacte aussi le SEO — Google utilise `lang` pour indexer le bon contenu dans les bonnes langues.

---

## SEO-04 — Slides hero non traduits (référence PERF-06) (MOYEN)

**Fichier :** `data/data.ts:8-33`

Le contenu du héro (heading, subheading) est en français hardcodé même sur la version anglaise. Ce contenu est indexé par Google et contribue au SEO de la page d'accueil. La version anglaise devrait avoir du contenu en anglais.

---

## SEO-05 — Texte "Lire la suite" hardcodé en français (BAS)

**Fichier :** `app/[locale]/(main)/(routes)/actualites/page.tsx:385`

```tsx
<span>Lire la suite</span>
```

Ce texte CTA est hardcodé en français sur la page qui est censée être bilingue. Les autres textes passent par `next-intl` mais certains sont oubliés.

---

## SEO-06 — `robots.txt` présent mais non vérifié (INFO)

**Fichier :** `public/robots.txt`

Un fichier `robots.txt` existe. Vérifier qu'il ne bloque pas des URLs importantes, notamment l'API ou des pages qu'on veut indexer.

---

## SEO-07 — Données structurées (Schema.org) absentes (MOYEN)

Aucune donnée structurée (JSON-LD) n'est présente pour :
- **Organization** — pour le cabinet Marabu
- **Article** — pour les articles de blog (très important pour l'apparition dans Google News)
- **Person** — pour les profils d'équipe
- **BreadcrumbList** — pour la navigation

Ces données permettent des "rich snippets" dans les résultats de recherche Google.
