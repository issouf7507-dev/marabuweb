# Audit Sécurité — Marabuweb

**Priorité : CRITIQUE**
**Statut : ✅ TOUS CORRIGÉS le 11 mai 2026**

---

## SEC-01 — Clé API Brevo exposée côté client (CRITIQUE)

**Fichier :** `.env.local` + `app/api/contact/route.ts:27`

La variable `NEXT_PUBLIC_SMTP_KEY_BREVO` est préfixée `NEXT_PUBLIC_`, ce qui signifie que Next.js l'injecte dans le bundle JavaScript envoyé au navigateur. N'importe qui peut lire cette clé dans les devtools.

```
NEXT_PUBLIC_SMTP_KEY_BREVO=xkeysib-ce2996...  ← EXPOSÉE DANS LE BUNDLE CLIENT
```

**Solution :** Renommer en `BREVO_API_KEY` (sans `NEXT_PUBLIC_`). La route API est côté serveur, elle n'a pas besoin de la version publique.

---

## SEC-02 — Clé API réelle présente dans le dépôt (CRITIQUE)

**Fichier :** `.env.local`

La vraie clé API Brevo `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` est présente dans le fichier `.env.local`. Si ce dépôt est public ou si le fichier `.env.local` a déjà été commité, la clé est compromise.

**Actions immédiates :**
1. Vérifier l'historique git : `git log --all --full-history -- .env.local`
2. Révoquer et régénérer la clé sur le tableau de bord Brevo
3. Vérifier que `.env.local` est bien dans `.gitignore` (c'est le cas, mais vérifier qu'il n'a pas été commité)

---

## SEC-03 — IP du serveur VPS en clair dans le workflow CI/CD (MOYEN)

**Fichier :** `.github/workflows/deploy.yml:32`

```yaml
host: 168.231.106.21  ← IP serveur exposée publiquement
```

**Solution :** Utiliser un secret GitHub `${{ secrets.VPS_HOST }}` au lieu de l'IP en dur.

---

## SEC-04 — Injection XSS via dangerouslySetInnerHTML sans sanitization (ÉLEVÉ)

**Fichiers :**
- `app/[locale]/(main)/(routes)/actualites/[slug]/page.tsx:266`
- `app/[locale]/(main)/(routes)/equipes/[id]/page.tsx:140`

Le contenu HTML venant directement de l'API est injecté sans sanitization :

```tsx
// article slug page - contenu brut de l'API
dangerouslySetInnerHTML={{ __html: queryArticlesbyMarabuById.data?.content }}

// equipe page - about du membre
dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(member.about) }}
```

Si l'API backend est compromise ou que du contenu malveillant y est inséré, l'XSS est possible.

**Solution :** Installer et utiliser `DOMPurify` ou `isomorphic-dompurify` pour sanitiser avant injection :
```tsx
import DOMPurify from 'isomorphic-dompurify';
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
```

---

## SEC-05 — URLs malformées dans les données partenaires (BAS)

**Fichier :** `data/data.ts:73` et `data/data.ts:79`

```ts
href: "/https://www.emploi.gouv.ci/"  // ← "/" parasite avant "https://"
href: "/https://telecom.gouv.ci/"     // ← idem
```

Ces liens ne fonctionnent pas (redirigent vers `/https://...` en relatif au lieu d'ouvrir l'URL externe).

**Solution :**
```ts
href: "https://www.emploi.gouv.ci/"
href: "https://telecom.gouv.ci/"
```
