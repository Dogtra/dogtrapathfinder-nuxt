// Strapi endpoints, captured once by plugins/strapi.ts. Kept outside the Nuxt
// context so data helpers keep working after `await` in async handlers.
// The values are build-time constants, so sharing them across requests is safe.
export const strapiConfig = {
  url: '',
  mediaPrefix: '',
}
