// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },

  experimental: {
    viewTransition: true
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    '@primevue/nuxt-module',
    '@formkit/nuxt',
    'nuxt-easy-lightbox',
    'nuxt-nodemailer'
  ],
  nodemailer: {
    from: process.env.SMTP_FROM,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },
  primevue: {
    options: {
      unstyled: true
    }
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
      { code: 'nb', language: 'nb-NO', name: 'Norwegian', file: 'nb.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix'
  },

  site: {
    url: 'https://loubnaphoto.no',
    name: 'Loubna Photo',
    description: 'Handcrafted Photography by Loubna Aleksandra Kubiak'
  },

  sitemap: {
    strictNuxtContentPaths: true,
    autoLastmod: true,
    exclude: ['/thank-you/**']
  },

  css: ['@/assets/css/main.css']
})