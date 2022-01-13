import i18n from './config/i18n'
require('dotenv').config()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'dogtra-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/instant-meilisearch.js', mode:'client'},
    {src: '~/plugins/dompurify-html.js', mode:'client'},
    {src: '~/plugins/vue-select.js', mode:'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxtjs/strapi',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/google-fonts',
    'nuxt-material-design-icons',
    'nuxt-breakpoints',
    'nuxtjs-mdi-font'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  i18n: {
    vueI18nLoader: true,
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: i18n
  },

  strapi: {
    // Options
    entities: [
      {
        name: 'main-banner',
        type: 'single',
        url: process.env.STRAPI_URL
      },
      {
        name: 'manuals',
        url: process.env.STRAPI_URL
      },
      {
        name: 'articles',
        url: process.env.STRAPI_URL
      }
      ]
  },

  // Apollo module configuration
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.STRAPI_GRAPGQL_URL || "http://localhost:1337/graphql"
      }
    }
  },

  loading: {
    color: '#FFDD00',
    height: '5px'
  },

  env: {
    strapiUrl: process.env.STRAPI_URL,
    meiliUrl: process.env.MEILI_URL,
    meiliMasterKey: process.env.MEILI_MASTER_KEY,
    strapiMediaPrefix: process.env.STRAPI_MEDIA_PREFIX,
  },

  // Google Fonts module
  googleFonts: {
    families: {
      Montserrat: [500, 600, 700],
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  },
}
