export default defineNuxtPlugin({
  name: 'strapi-config',
  enforce: 'pre',
  setup() {
    const { strapiUrl, strapiMediaPrefix } = useRuntimeConfig().public
    strapiConfig.url = strapiUrl
    strapiConfig.mediaPrefix = strapiMediaPrefix
  },
})
