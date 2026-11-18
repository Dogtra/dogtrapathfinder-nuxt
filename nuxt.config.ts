import { getPrerenderRoutes } from './scripts/prerender-routes'

const strapiUrl = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/+$/, '')

if (!process.env.MEILI_SEARCH_KEY && process.env.MEILI_MASTER_KEY) {
  console.warn(
    '[dogtra] MEILI_SEARCH_KEY is not set, falling back to MEILI_MASTER_KEY. '
    + 'This key is shipped to every visitor: create a search-only key and set MEILI_SEARCH_KEY.',
  )
}

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    'nuxt-gtag',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Dogtra Pathfinder',
      htmlAttrs: { 'data-theme': 'dogtra' },
      meta: [
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#FFDD00' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'Pathfinder' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Dogtra Pathfinder' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // Montserrat straight from Google Fonts, as before (self-hosted copies differ in spacing).
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' },
      ],
    },
  },

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'material-icons/iconfont/filled.css',
    'vue-select/dist/vue-select.css',
    'vue3-carousel/carousel.css',
    '~/assets/scss/main.scss',
  ],

  runtimeConfig: {
    public: {
      strapiUrl,
      // Strapi Cloud returns absolute media URLs; only relative ones get this prefix.
      strapiMediaPrefix: process.env.STRAPI_MEDIA_PREFIX || strapiUrl,
      meiliUrl: process.env.MEILI_URL || 'http://localhost:7700',
      meiliSearchKey: process.env.MEILI_SEARCH_KEY || process.env.MEILI_MASTER_KEY || '',
    },
  },

  compatibilityDate: '2026-11-01',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/fr'],
    },
  },

  hooks: {
    async 'prerender:routes'(ctx) {
      for (const route of await getPrerenderRoutes(strapiUrl)) {
        ctx.routes.add(route)
      }
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  gtag: {
    // Universal Analytics (UA-126982276-1) was shut down by Google; set a GA4 id to re-enable.
    enabled: !!process.env.GTAG_ID,
    id: process.env.GTAG_ID,
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Dogtra Pathfinder',
      short_name: 'Pathfinder',
      theme_color: '#FFDD00',
      background_color: '#000000',
      display: 'standalone',
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    generateSW: {
      // Precache the app shell assets only; pages always come from the network.
      globPatterns: ['**/*.{js,css,woff2,ico,png,svg,webp}'],
      globIgnores: ['**/_ipx/**', 'images/flags/**'],
      navigateFallback: null,
    },
  },
})
