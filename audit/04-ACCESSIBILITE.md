# Audit Accessibilité — Marabuweb

**Statut : ✅ TOUS CORRIGÉS le 11 mai 2026**

---

## A11Y-01 — `<html lang="en">` fixe alors que le site est bilingue (ÉLEVÉ)

**Fichier :** `app/layout.tsx:22`

```tsx
<html lang="en">  // ← toujours "en", même en version française
```

Les lecteurs d'écran et les moteurs de recherche utilisent l'attribut `lang` pour la langue de la page. En français, cela devrait être `lang="fr"`.

**Solution :** Passer `locale` en prop ou lire depuis les paramètres de route dans le root layout. Avec l'App Router, le mieux est de mettre le `<html>` dans le layout locale :
```tsx
// app/[locale]/layout.tsx
<html lang={locale}>
```

---

## A11Y-02 — Nombreuses images sans texte alternatif (ÉLEVÉ)

Images avec `alt=""` ou `alt` manquant sur des images non-décoratives :

**`app/components/header.tsx` :**
```tsx
<Image width={24} height={24} src="/phoneicon.png" alt="" />      // Icône téléphone
<Image width={24} height={24} src="/sendicon.png" alt="" />       // Icône email
<Image width={24} height={24} src="/localisationicon.png" alt="" />  // Icône lieu
<Image width={24} height={24} src="/horlogeicon.png" alt="" />    // Icône horaires
```

**`app/[locale]/(main)/page.tsx` :**
```tsx
<Image src="/boostvector.png" alt="" ... />      // Image décorative mais devrait être aria-hidden
<Image src="/pluscircle.svg" alt="" ... />       // Icône bouton
<Image src="/image/coris.png" alt="" ... />      // Multiple fois
```

Les images décoratives doivent avoir `alt=""` (déjà fait) **ET** `aria-hidden="true"`. Les icônes fonctionnelles (dans des boutons) doivent avoir un `alt` descriptif ou être accompagnées d'un `aria-label`.

---

## A11Y-03 — Hiérarchie des titres incorrecte (ÉLEVÉ)

Dans toutes les pages, `<h1>` est utilisé pour du contenu qui n'est pas le titre principal :

```tsx
// page.tsx - section "qui sommes nous"
<h1 className="..."> {translatedUs.textdownn} </h1>  // h1 pour un texte secondaire

// page.tsx - section clients
<h1 className="font-bold">{translatedClients.clients1[0].name}</h1>  // h1 pour un nom
```

La bonne structure serait :
- `<h1>` — Titre principal de la page (1 seul par page)
- `<h2>` — Titres de sections
- `<h3>` — Titres de sous-sections

---

## A11Y-04 — Bouton de fermeture invisible dans la modal Marabu AI (MOYEN)

**Fichier :** `app/[locale]/(main)/page.tsx:1782-1789`

```tsx
<button
  onClick={() => handleMarabuAIResponse(false)}
  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10..."
>
  {/* <X className="w-5 h-5 text-white" /> */}  // ← icône commentée !
</button>
```

Le bouton de fermeture n'a pas d'icône (commentée) et pas de texte. Il est invisible pour les utilisateurs et les lecteurs d'écran. C'est un problème d'accessibilité et d'UX.

**Solution :** Décommenter l'import `X` de lucide-react et l'icône, et ajouter `aria-label="Fermer"`.

---

## A11Y-05 — Photos de témoignages wrappées dans `<Link href="/">` (MOYEN)

**Fichier :** `app/[locale]/(main)/page.tsx:1066, 1105, 1144, ...`

```tsx
<Link href="/">
  <Image src={translatedClients.clients1[0].image} ... />
</Link>
```

Les photos des témoignages clients sont des liens vers `/` (la page d'accueil). C'est trompeur pour les utilisateurs et pour les lecteurs d'écran (lien sans destination significative). Soit supprimer le `<Link>`, soit pointer vers le profil de la personne.

---

## A11Y-06 — Bouton flottant Marabu AI sans taille fixe définie (BAS)

**Fichier :** `app/[locale]/(main)/page.tsx:2079-2099`

```tsx
className="fixed bottom-6 right-6 z-50 w-18 h-18 ..."
```

`w-18` et `h-18` ne sont pas des classes Tailwind standard (les valeurs standard s'arrêtent à `w-16`). Le bouton peut ne pas avoir la taille attendue selon la version de Tailwind utilisée.

---

## A11Y-07 — Liens de réseaux sociaux sans aria-label (BAS)

**Fichier :** `app/components/header.tsx:115-155` et `app/components/footer.tsx`

Les liens vers les réseaux sociaux contiennent uniquement des images :
```tsx
<Link href="https://www.facebook.com/marabuservices" target="_blank">
  <Image width={24} height={24} src="/facebook_marabu.svg" alt="Facebook Marabu" />
</Link>
```

L'`alt` sur l'image est correct, mais les liens `target="_blank"` devraient avoir `rel="noopener noreferrer"` pour la sécurité (seulement le footer en a besoin — le header n'a pas `rel` sur tous les liens sociaux).
