export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    backendUrl: process.env.BACKEND_URL || "http://localhost:3001",
  },

  css: [
    "~/assets/css/main.css",
    "~/assets/css/nds-tokens.css"
  ],
})
