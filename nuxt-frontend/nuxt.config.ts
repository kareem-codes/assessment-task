export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      {
        code: 'ar',
        iso: 'ar-SA',
        name: 'العربية',
        dir: 'rtl',
        file: 'ar.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        dir: 'ltr',
        file: 'en.json'
      }
    ],
    defaultLocale: 'ar',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },

  runtimeConfig: {
    backendUrl: process.env.BACKEND_URL || "http://localhost:3001",
  },

  css: [
    "~/assets/css/main.css",
    "~/assets/css/nds-tokens.css"
  ],
})
