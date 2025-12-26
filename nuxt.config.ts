// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
      { code: 'nb', language: 'nb-NO', name: 'Norwegian', file: 'nb.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix'
  },
  css: ['@/assets/css/main.css']
})