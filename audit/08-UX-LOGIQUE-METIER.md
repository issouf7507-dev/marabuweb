# Audit UX & Logique Métier — Marabuweb

**Statut : ✅ TOUS CORRIGÉS le 11 mai 2026**

---

## UX-01 — Loading de 2 secondes avant chaque page (référence PERF-01) (ÉLEVÉ)

Voir PERF-01. En plus de l'impact performance, c'est une expérience utilisateur dégradée : l'utilisateur attend 2 secondes sur un écran de chargement même quand le contenu est prêt.

---

## UX-02 — Slides hero avec textes en français sur la version anglaise (référence PERF-06) (ÉLEVÉ)

**Fichier :** `data/data.ts:8-33`

Les textes des slides du hero (`heading`, `subheading`) ne sont pas traduits. Sur la version `/en/`, le carousel du hero affiche du français.

---

## UX-03 — Bouton fermeture de la modal Marabu AI invisible (référence A11Y-04) (ÉLEVÉ)

**Fichier :** `app/[locale]/(main)/page.tsx:1782`

L'icône X de fermeture est commentée. Les utilisateurs ne peuvent pas facilement fermer la modal (ils doivent cliquer sur "Peut-être plus tard" mais le bouton de fermeture habituel en haut à droite n'est pas visible).

---

## UX-04 — La modal Marabu AI s'ouvre automatiquement mais ne respecte pas le choix de l'utilisateur sur le bouton flottant (MOYEN)

**Fichier :** `app/[locale]/(main)/page.tsx:301-313` et `:2079-2099`

La logique vérifie `localStorage.getItem("marabuAI_seen")` pour l'ouverture automatique après 5 secondes. Mais le bouton flottant (ligne 2083) appelle `setOpenMarabuAI(true)` **sans vérifier** ce localStorage. Si l'utilisateur a dit "Peut-être plus tard", la modal ne s'ouvre plus automatiquement, mais il peut la rouvrir via le bouton — c'est le comportement attendu.

Cependant, si l'utilisateur a cliqué "Oui, je veux tester" et a été redirigé vers `ai.marabu.services`, le bouton flottant réouvre la même modal au lieu de le rediriger directement. Incohérence.

---

## UX-05 — Les liens "Légal" dans le footer ne pointent vers rien (MOYEN)

**Fichier :** `app/components/footer.tsx:209-231`

```tsx
<Link href={"/#"}>{translatedFooter.link5}</Link>  // Mentions légales -> /#
<Link href={"/#"}>{translatedFooter.link6}</Link>  // Politique de confidentialité -> /#
<Link href={"/#"}>{translatedFooter.link7}</Link>  // CGV -> /#
```

Les liens légaux (Mentions légales, Politique de confidentialité, CGV) pointent vers `/#` — c'est un placeholder non implémenté. Ces pages sont souvent obligatoires légalement (RGPD, loi française).

---

## UX-06 — Section magazine dans la page "À propos" utilise des données WordPress potentiellement vides (MOYEN)

**Fichier :** `app/[locale]/(main)/(routes)/apropos/page.tsx:1186-1243`

La section magazine dans "À propos" fait appel à l'ancienne API WordPress (`main.marabu.services/wp-json/...`). Si cette API WordPress n'est plus active ou renvoie des données vides, la section s'affiche vide sans message d'erreur.

---

## UX-07 — Texte "EN SAVOIR PLUS" hardcodé en français dans apropos (BAS)

**Fichier :** `app/[locale]/(main)/(routes)/apropos/page.tsx:1231`

```tsx
<span className="text-sm text-white block">EN SAVOIR PLUS</span>
```

Hardcodé en français alors que la page est bilingue.

---

## UX-08 — Statistiques de croissance hardcodées (+20, +100, +30, +45) (BAS)

**Fichier :** `app/[locale]/(main)/page.tsx:1448, 1474, 1499, 1525`

Les chiffres statistiques sont hardcodés dans le JSX et ne passent pas par le CMS ou i18n. Si les chiffres changent, il faut modifier le code.

---

## UX-09 — Pas de page 404 personnalisée (BAS)

Il n'existe pas de fichier `app/not-found.tsx` pour une page 404 personnalisée. Quand un utilisateur accède à une URL inexistante, Next.js affiche sa page 404 par défaut (sans le design du site).

---

## UX-10 — Pas de gestion d'erreur sur les requêtes API échouées (MOYEN)

Dans plusieurs pages, si l'API backend est indisponible :
- La liste d'articles affiche "Aucun article disponible" — correct
- La liste d'équipes affiche "Aucun membre disponible" — correct
- Mais l'article individuel (`/actualites/[slug]`) n'a pas de gestion d'erreur si `queryArticlesbyMarabuById` échoue (ne vérifie que `isPending`, pas `isError`)
