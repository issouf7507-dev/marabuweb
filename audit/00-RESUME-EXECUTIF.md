# Audit Complet — Marabuweb
# Résumé Exécutif

**Date :** 11 mai 2026  
**Projet :** Site web Marabu Services (Next.js 15, next-intl, TanStack Query)  
**Branche auditée :** `test-dev`

---

## Tableau de bord

| Catégorie | Problèmes Critiques | Élevés | Moyens | Bas |
|-----------|--------------------:|-------:|-------:|----:|
| Sécurité | 2 | 1 | 1 | 1 |
| Qualité Code | 1 | 3 | 4 | 3 |
| Performance | 0 | 2 | 3 | 2 |
| Accessibilité | 0 | 3 | 2 | 2 |
| SEO | 0 | 2 | 3 | 2 |
| CI/CD | 0 | 1 | 3 | 2 |
| Fichiers parasites | 0 | 1 | 2 | 6 |
| UX / Logique métier | 0 | 3 | 4 | 3 |
| **TOTAL** | **3** | **16** | **22** | **21** |

---

## Actions immédiates (Critiques — à corriger aujourd'hui)

### 🔴 SEC-01 + SEC-02 — Clé API Brevo exposée
La clé `NEXT_PUBLIC_SMTP_KEY_BREVO` est exposée côté client. La vraie clé API est présente dans `.env.local`.

**Actions :**
1. Révoquer immédiatement la clé sur le dashboard Brevo
2. Générer une nouvelle clé
3. Renommer la variable en `BREVO_API_KEY` (sans `NEXT_PUBLIC_`)
4. Vérifier que `.env.local` n'est pas dans l'historique git

### 🔴 CODE-01 — 1000 lignes de code dupliqué (Sheet contact × 5)
Le composant Sheet de contact est copié-collé 5 fois. Tout bug corrigé dans une copie doit être corrigé dans les 4 autres manuellement.

---

## Top 5 priorités (à corriger cette semaine)

| Priorité | Problème | Impact |
|----------|----------|--------|
| 1 | **SEC-01/02** — Clé API exposée | Compromission de compte email |
| 2 | **PERF-01** — Loading 2s artificiel | -2s LCP sur chaque page |
| 3 | **CODE-01** — Sheet contact dupliqué × 5 | Maintenance impossible |
| 4 | **A11Y-01** — `lang="en"` fixe | SEO et accessibilité |
| 5 | **SEC-04** — XSS via dangerouslySetInnerHTML | Injection de code si API compromise |

---

## Fichiers de détail

| Fichier | Contenu |
|---------|---------|
| `01-SECURITE.md` | 5 problèmes de sécurité |
| `02-QUALITE-CODE.md` | 11 problèmes de qualité |
| `03-PERFORMANCE.md` | 7 problèmes de performance |
| `04-ACCESSIBILITE.md` | 7 problèmes d'accessibilité |
| `05-SEO.md` | 7 problèmes de SEO |
| `06-CICD-DEPLOIEMENT.md` | 6 problèmes CI/CD |
| `07-FICHIERS-PARASITES.md` | 9 fichiers/dossiers à nettoyer |
| `08-UX-LOGIQUE-METIER.md` | 10 problèmes UX |

---

## Points positifs

- Structure de projet Next.js App Router bien organisée (`[locale]/(main)/(routes)/`)
- Internationalisation (next-intl) correctement configurée pour FR/EN
- Formulaire de contact avec validation double (client + serveur)
- Système d'analytics Google Tag Manager en place
- Fichier `sitemap.xml` et `robots.txt` présents
- Protection CSRF native via Next.js API Routes
- Animations fluides avec Framer Motion
- Images lazily loaded avec quality={85} dans la plupart des cas
- CI/CD automatisé avec GitHub Actions vers VPS

---

## Estimation de correction

| Effort | Problèmes couverts |
|--------|-------------------|
| 1 jour | Sécurité (SEC-01 à SEC-05), fichiers parasites (FILES) |
| 1 semaine | Performance (PERF-01, PERF-02), accessibilité (A11Y-01 à A11Y-04), refactoring ContactSheet |
| 2-4 semaines | SEO (métadonnées dynamiques, sitemap), TypeScript strict, composants découplés |
