// Lists every CMS-driven page so `nuxt generate` prerenders them even when no link
// to them is rendered (e.g. articles inside collapsed manual menus).

const LOCALES = ['en', 'fr'] as const
const DEFAULT_LOCALE = 'en'

const MANUAL_ROUTES_QUERY = /* GraphQL */ `
  query PrerenderManuals($locale: I18NLocaleCode) {
    manuals(locale: $locale, pagination: { limit: 1000 }) {
      slug
      chapters(pagination: { limit: 1000 }) {
        uuid
        articles(pagination: { limit: 1000 }) { uuid }
      }
      video_tutorial_category {
        articles(pagination: { limit: 1000 }) { uuid }
      }
    }
  }
`

const BLOG_ROUTES_QUERY = /* GraphQL */ `
  query PrerenderBlogArticles {
    articles(filters: { type: { eq: "blog" } }, pagination: { limit: 1000 }) {
      uuid
      blog_category { documentId }
    }
  }
`

interface ManualRoutes {
  slug: string
  chapters: { uuid: string | null, articles: { uuid: string | null }[] }[]
  video_tutorial_category: { articles: { uuid: string | null }[] } | null
}

async function graphql<T>(strapiUrl: string, query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`${strapiUrl}/graphql`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Strapi GraphQL request failed: ${res.status} ${res.statusText}`)
  const response = await res.json() as { data: T, errors?: { message: string }[] }
  if (response.errors?.length) {
    throw new Error(`Strapi GraphQL error: ${response.errors.map(e => e.message).join(', ')}`)
  }
  return response.data
}

export async function getPrerenderRoutes(strapiUrl: string): Promise<string[]> {
  const routes = new Set<string>()
  const prefix = (locale: string) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`)

  for (const locale of LOCALES) {
    const { manuals } = await graphql<{ manuals: ManualRoutes[] }>(strapiUrl, MANUAL_ROUTES_QUERY, { locale })
    for (const manual of manuals) {
      const base = `${prefix(locale)}/manuals/${manual.slug}`
      routes.add(base)
      for (const chapter of manual.chapters) {
        if (chapter.uuid) routes.add(`${base}/chapter/${chapter.uuid}`)
        for (const article of chapter.articles) {
          if (article.uuid) routes.add(`${base}/${article.uuid}`)
        }
      }
      for (const article of manual.video_tutorial_category?.articles ?? []) {
        if (article.uuid) routes.add(`${base}/videos/${article.uuid}`)
      }
    }
  }

  const { articles } = await graphql<{ articles: { uuid: string | null, blog_category: unknown }[] }>(strapiUrl, BLOG_ROUTES_QUERY)
  for (const article of articles) {
    if (!article.uuid || !article.blog_category) continue
    for (const locale of LOCALES) routes.add(`${prefix(locale)}/articles/${article.uuid}`)
  }

  return [...routes]
}
