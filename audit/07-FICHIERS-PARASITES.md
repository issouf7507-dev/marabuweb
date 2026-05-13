# Audit Fichiers Parasites — Marabuweb

**Statut : ✅ TOUS TRAITÉS le 11 mai 2026**

---

## FILES-01 — Fichiers avec espaces et timestamps dans les noms (ÉLEVÉ)

Ces fichiers ont des noms invalides (avec espaces et timestamps) qui peuvent causer des problèmes sur certains systèmes :

```
app/favicon.ico 12-27-41-361.ico          ← doublon avec favicon.ico
public/sendicon.png 12-21-18-378.png      ← doublon
public/services.png 12-21-18-415.png      ← fichier inconnu
public/us2.png 12-21-18-450.png           ← fichier inconnu
```

Ces fichiers semblent être des copies accidentelles créées lors de la sauvegarde. À supprimer.

---

## FILES-02 — PDF dans le dossier d'icônes (MOYEN)

**Fichier :** `public/icons/twitter.pdf`

Un fichier PDF se trouve dans le dossier d'icônes SVG. Ce n'est probablement pas intentionnel. À supprimer ou déplacer.

---

## FILES-03 — Doublons d'images (MOYEN)

Deux versions de la même image existent :
- `public/boostvector.png` et `public/image/boostvector.png`
- `public/logos/cie.png` et `public/logos/Logo_CIE_marabu.jpg` (même logo CIE en double)
- `public/logos/yango.png` et `public/logos/Yango_marabu.png` (même logo Yango en double)

**Solution :** Supprimer les doublons et utiliser une seule version cohérente.

---

## FILES-04 — Fichier `proxy.ts` non utilisé (BAS)

**Fichier :** `proxy.ts` (à la racine du projet)

Ce fichier semble être un artefact de configuration de proxy de développement. Il n'est référencé nulle part dans le code. À supprimer s'il est inutile.

---

## FILES-05 — Fichier `text.json` non utilisé (BAS)

**Fichier :** `text.json` (à la racine du projet, 4408 octets)

Ce fichier JSON n'est référencé nulle part dans le code source. À identifier et supprimer si c'est un artefact.

---

## FILES-06 — Fichier `next-i18next.config.js` résiduel (BAS)

**Fichier :** `next-i18next.config.js`

Le projet utilise `next-intl` mais ce fichier de configuration pour l'ancienne bibliothèque `next-i18next` est encore présent. À supprimer.

---

## FILES-07 — `.DS_Store` présents dans plusieurs dossiers (BAS)

Des fichiers `.DS_Store` (métadonnées macOS) sont présents dans :
- `/` (racine)
- `app/`
- `public/`
- `public/image/`
- `public/persons/`

Ils sont normalement ignorés par `.gitignore` (la règle `.DS_Store` y est), mais si le `.gitignore` a été ajouté après un premier commit, ils peuvent déjà être trackés.

**Vérification :** `git ls-files | grep .DS_Store`

**Solution si trackés :**
```bash
git rm -r --cached .DS_Store
git rm -r --cached **/.DS_Store
git commit -m "Remove .DS_Store files"
```

---

## FILES-08 — Logo avec accent dans le nom de fichier (BAS)

**Fichier :** `public/logos/Logo_Ministère de l'emploi.jpg`

Ce fichier a un espace et des caractères spéciaux dans le nom. Il y a déjà une version correctement nommée `Logo_Ministère_de_l_emploi_marabu.png`. L'ancien fichier peut être supprimé.

---

## FILES-09 — Fichier `webhook.php` à la racine (INFO)

**Fichier :** `webhook.php`

Un fichier PHP est présent à la racine d'un projet Next.js. Il semble être un webhook de déploiement. Vérifier s'il est encore utilisé et s'il est sécurisé (authentification du webhook).
