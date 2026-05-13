# Audit CI/CD & Déploiement — Marabuweb

---

## CICD-01 — Double build (local + VPS) inefficace (MOYEN)

**Fichier :** `.github/workflows/deploy.yml`

Le workflow actuel :
1. Build l'application localement sur GitHub Actions (ligne 14 : `npm run build`)
2. Déploie sur le VPS où l'application est reclonée et **rebuildée** (ligne 62 : `npm run build`)

Le build local ne sert qu'à validation (échoue si erreur de build) mais les artefacts sont abandonnés. Le VPS fait tout le travail de zéro. Cela double le temps de build.

**Solution :** Soit supprimer le build CI (ne garder que le build VPS), soit transférer les artefacts compilés depuis CI vers le VPS pour éviter de rebuilder.

---

## CICD-02 — `npm install` au lieu de `npm ci` dans le CI (MOYEN)

**Fichier :** `.github/workflows/deploy.yml:13`

```yaml
- name: Install dependencies
  run: npm install  # ← devrait être "npm ci"
```

`npm ci` est déterministe (utilise exactement le `package-lock.json`), plus rapide et plus sécurisé pour les environnements CI. `npm install` peut modifier le lock file.

---

## CICD-03 — IP du serveur en clair (référence SEC-03) (MOYEN)

**Fichier :** `.github/workflows/deploy.yml:32`

```yaml
host: 168.231.106.21  # ← à déplacer dans ${{ secrets.VPS_HOST }}
```

---

## CICD-04 — Gestion des sauvegardes VPS manuelle et fragile (BAS)

**Fichier :** `.github/workflows/deploy.yml:42-43`

```bash
if [ -d "current" ]; then
  mv current backup-$(date +%Y%m%d-%H%M%S)
fi
```

Les sauvegardes s'accumulent indéfiniment (sauf les 5 dernières gardées à la fin). Si le déploiement échoue après le `mv current`, le site est down et le rollback nécessite une intervention manuelle.

**Solution :** Utiliser une stratégie blue-green ou symlinks pour un rollback atomique.

---

## CICD-05 — Pas de tests automatisés dans le pipeline (INFO)

Le pipeline déploie sans aucun test (pas de tests unitaires, pas de tests E2E). En cas de régression, le code cassé est déployé en production.

**Recommandation :** Ajouter des tests basiques (TypeScript strict mode, lint) avant le déploiement.

---

## CICD-06 — Variables d'environnement non gérées pour le VPS (ÉLEVÉ)

Le déploiement clone le code depuis GitHub et installe les dépendances, mais :
- Le fichier `.env.local` est dans `.gitignore` — il n'est pas dans le dépôt
- Il n'y a aucune étape dans le workflow pour créer/copier le `.env.local` sur le VPS
- Sans `.env.local`, l'application ne fonctionnera pas (`NEXT_PUBLIC_BACK_END_URL_API` et la clé Brevo seront undefined)

**Solution :** Stocker les variables d'env comme secrets GitHub et les écrire dans un fichier `.env.production` pendant le déploiement, OU les définir directement sur le serveur VPS dans `/etc/environment` ou via PM2.
