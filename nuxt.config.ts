// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxthub/core",
    "nuxt-auth-utils",
    "@nuxt/eslint",
  ],

  // Nuxt Hub configuration
  hub: {
    db: {
      dialect: "postgresql",
      casing: "snake_case", // Maps camelCase to snake_case in database
    },
  },

  // Runtime configuration
  runtimeConfig: {
    // Public configuration (exposed to client)
    public: {
      appName: "ReportFlow",
    },
  },

  // TypeScript strict mode
  typescript: {
    strict: true,
  },
});
