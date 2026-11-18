import manualQuery from '~/graphql/manual/manual.gql?raw'

/** The full manual (chapters, articles, app, products) for a slug, shared by the manual layout and pages. */
export function useManualData(slug: string, contentLocale: string) {
  return useAsyncData(`manual-${contentLocale}-${slug}`,
    async () => (await strapiQuery(manualQuery, { slug, locale: contentLocale })).manuals[0] ?? null)
}

/** Content locale for a route (only en/fr content exists). */
export function contentLocaleForPath(path: string) {
  return getLocaleToUse(path === '/fr' || path.startsWith('/fr/') ? 'fr' : 'en')
}
