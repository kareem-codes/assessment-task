export default defineNuxtConfig({
    devtools: { enabled: true },

    future: {
        compatibilityVersion: 4,
    },

    modules: ["@nuxtjs/i18n"],

    i18n: {
        locales: [
            {
                code: "ar",
                iso: "ar-SA",
                name: "العربية",
                dir: "rtl",
                file: "ar.json",
            },
            {
                code: "en",
                iso: "en-US",
                name: "English",
                dir: "ltr",
                file: "en.json",
            },
        ],
        defaultLocale: "ar",
        strategy: "no_prefix",
        langDir: "locales",
        detectBrowserLanguage: false,
    },

    runtimeConfig: {
        backendUrl: process.env.BACKEND_URL || "http://localhost:3001",
    },

    css: ["~/assets/css/main.css", "~/assets/css/nds-tokens.css"],

    app: {
        head: {
            link: [
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
                },
                {
                    rel: "icon",
                    type: "image/jpeg",
                    href: "/images/saudi-swords-symbol.png",
                },
            ],
        },
    },
});
