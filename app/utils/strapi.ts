/** Absolute URL for a Strapi media `url` (Strapi Cloud already returns absolute URLs). */
export function strapiMediaUrl(url?: string | null): string {
  if (!url) return ''
  if (/^https?:\/\//.test(url)) return url
  return strapiConfig.mediaPrefix + url
}

/** Increments an article's view counter (custom Strapi route). Fire-and-forget. */
export function logArticleView(documentId: string) {
  $fetch(`${strapiConfig.url}/api/articles/${documentId}/view`, { method: 'PATCH' }).catch(() => {})
}
