// Loads the current manual into the store before rendering. The manual layout
// (side menu, mobile prev/next bar) renders alongside the page, so the data has
// to be there before the page's own setup runs — this was asyncData in Nuxt 2.
export default defineNuxtRouteMiddleware(async (to) => {
  // Resolve Nuxt/Pinia context before awaiting: afterwards, on the server, the
  // global active Pinia may belong to another request.
  const nuxtApp = useNuxtApp()
  const manualStore = useManualStore()

  const slug = to.params.slug as string
  const { data } = await useManualData(slug, contentLocaleForPath(to.path))
  if (!data.value) {
    return nuxtApp.runWithContext(() => navigateTo('/'))
  }
  manualStore.setManual(data.value)
  manualStore.setArticleUuid((to.params.article_uuid as string | undefined) ?? null)
})
