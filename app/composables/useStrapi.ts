interface GraphqlResponse<T> {
  data: T
  errors?: { message: string }[]
}

/** Runs a query against the Strapi v5 GraphQL endpoint. */
export async function strapiQuery<T = any>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await $fetch<GraphqlResponse<T>>(`${strapiConfig.url}/graphql`, {
    method: 'POST',
    body: { query, variables },
  })
  if (response.errors?.length) {
    throw createError({ statusCode: 502, statusMessage: response.errors.map(e => e.message).join(', ') })
  }
  return response.data
}

/**
 * useAsyncData wrapper for a Strapi GraphQL query. Results are embedded in the
 * prerendered payload, so static pages don't call Strapi again on hydration.
 */
export function useStrapiQuery<T = any>(key: string, query: string, variables: () => Record<string, unknown> = () => ({})) {
  return useAsyncData<T>(key, () => strapiQuery<T>(query, variables()))
}
