import axios from 'axios'
import i18n from './config/i18n'
require('dotenv').config()

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    async routes() {
      const manualsResponse = await axios.get(process.env.STRAPI_URL + '/manuals')
      const articlesResponse = await axios.get(process.env.STRAPI_URL + '/articles' )

      const manualRoutes = manualsResponse.data.map(manual => {
        return {
          route: '/manuals/' + manual.slug,
          payload: manual
        }
      })

      const articleRoutes = articlesResponse.data.map(article => {
        switch (article.type) {
          case 'blog': {
            if (!article.blog_category) {
              return false
            }

            return {
              route: '/articles/' + article.uuid
            }
          }
          case 'manual': {
            if (!article.chapter || !!article.chapter.manual) {
              return false
            }
            const manual = manualsResponse.data.find(manual => manual.id === article.chapter.manual)

            if (!manual) {
              return false
            }

            return {
              route: '/manuals/' + manual.slug  + '/' + article.uuid
            }
          }
          default:
            return false
        }
      })

      return [...manualRoutes, ...articleRoutes];
    }
  },

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
    {src: '~/plugins/vue-youtube-embed.js', mode:'client'},
    {src: '~/plugins/vue-slick-carousel' },
    {src: '~/plugins/vue-read-more', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@aceforth/nuxt-netlify',
    '@nuxtjs/google-analytics',
    '@nuxt/image',
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
    icon: {
      source: 'static/android-chrome-512x512.png'
    },
    manifest: {
      'name': 'Dogtra Pathfinder',
      'short_name': 'Pathfinder',
      'theme_color': '#FFDD00',
      'background_color': '#000000',
      'display': 'standalone'
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
      Montserrat: [400, 500, 600, 700],
    }
  },

  netlify: {
    mergeSecurityHeaders: true,
    redirects: [
      {
        from: '/manual',
        to: '/manuals/pathfinder-series'
      },

      {
        from: '/manuals/pathfinder-2',
        to: '/manuals/pathfinder-2-series'
      },
    ]
  },

  googleAnalytics: {
    id: 'UA-126982276-1'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es', 'vue-youtube-embed'],
  },
}
