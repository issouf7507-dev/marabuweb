/**
 * Configuration PM2 pour marabu.services
 * Cette configuration gère le processus Next.js en production
 */
// pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "marabu-web",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/home/admin_marabu/apps/marabu_website/current",
      instances: 1, // Pour Next.js, 1 instance suffit généralement
      exec_mode: "fork", // 'fork' pour Next.js (pas 'cluster')
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0", // Écouter sur toutes les interfaces
      },
      // Options de redémarrage automatique
      autorestart: true,
      watch: false, // Désactivé en production
      max_memory_restart: "1G", // Redémarrer si la mémoire dépasse 1GB

      // Logs
      error_file:
        "/home/admin_marabu/apps/marabu_website/shared/logs/pm2-error.log",
      out_file:
        "/home/admin_marabu/apps/marabu_website/shared/logs/pm2-out.log",
      log_file:
        "/home/admin_marabu/apps/marabu_website/shared/logs/pm2-combined.log",
      time: true, // Ajouter un timestamp aux logs
      merge_logs: true,

      // Options de gestion des erreurs
      min_uptime: "10s", // Temps minimum avant de considérer l'app comme stable
      max_restarts: 10, // Nombre maximum de redémarrages
      restart_delay: 4000, // Délai entre les redémarrages (ms)
    },
  ],
};
