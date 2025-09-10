import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const webhook = env.VITE_DISCORD_WEBHOOK_URL;

  return {
    plugins: [react(), tailwindcss()],
    server: webhook
      ? {
          proxy: {
            "/api/discord": {
              target: webhook,
              changeOrigin: true,
              secure: true,
              rewrite: (path) => path.replace(/^\/api\/discord/, ""),
            },
          },
        }
      : undefined,
  };
});
