// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  // Type assertion needed: @nuxtjs/supabase module types not fully recognized in Nuxt 4
  // as ReturnType<typeof defineNuxtConfig> & { supabase: { redirectOptions: { login: string; callback: string; exclude: string[] } } }
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/dashboard',
      exclude: ['/'],
    },
  },
})
