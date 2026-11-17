# Dogtra Pathfinder (Nuxt 4)

Static site for the Dogtra Pathfinder manuals, products, videos and FAQ. Content comes from the
Strapi v5 GraphQL API at build time; search uses Meilisearch from the browser.

## Setup

Requires Node 24 (see `.nvmrc`).

```bash
cp .env.dist .env   # then fill in the values
yarn install
yarn dev            # http://localhost:3000
```

| Variable | Purpose |
| --- | --- |
| `STRAPI_URL` | Strapi v5 base URL, without `/api` (GraphQL is at `$STRAPI_URL/graphql`) |
| `STRAPI_MEDIA_PREFIX` | Optional. Prefix for relative media URLs; defaults to `STRAPI_URL` |
| `MEILI_URL` | Meilisearch URL used by the search page |
| `MEILI_SEARCH_KEY` | **Search-only** Meilisearch key (it is public). Falls back to `MEILI_MASTER_KEY` with a warning |
| `GTAG_ID` | Optional GA4 measurement id |

## Build

```bash
yarn generate   # static site in .output/public (Netlify publishes this, see netlify.toml)
yarn lint
yarn typecheck
```

`yarn generate` prerenders every page. Manual, chapter, article and video routes are listed from
Strapi in `scripts/prerender-routes.ts` for both locales, and the crawler finds the rest. Content
changes in Strapi need a rebuild (e.g. a Netlify build hook). Popular articles and search are the
only parts that query live data in the browser.

## Structure

- `app/pages`: routes (`[param]` folders); manual pages use the `manual` layout and middleware
- `app/middleware/manual.ts`: loads the current manual into the Pinia store before rendering
- `app/graphql/*.gql`: Strapi v5 GraphQL queries, imported with `?raw`
- `app/composables/useStrapi.ts`: `strapiQuery()` / `useStrapiQuery()`
- `app/stores/manual.ts`: manual menu state and previous/next article links
- `i18n/locales`: UI translations (en, fr)
- `public/_redirects`, `public/_headers`: Netlify redirects and security headers

Article content may contain optional tabs: `<!-- tab: Title -->` markers split an article into tabs.
