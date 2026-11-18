<template>
  <div class="text-black flex pt-18 px-12">
    <div class="w-[45rem] mt-24 ml-16 hidden md:block">
      <div>
        <SearchBar v-model="searchText" />
      </div>
      <div class="mt-12 leading-[3.5rem]">
        <div>
          <p class="h-18 flex items-center text-center font-bold text-18 border-b-1 border-[#E6E6E6] pl-8">
            {{ $t('search.product-filter') }}
          </p>
          <ul class="pl-8 pt-2">
            <li v-for="manual in filteredManuals" :key="manual.documentId">
              <input :id="manual.documentId" v-model="checkedProductsFilter" type="checkbox" :value="manual.title">
              <label :for="manual.documentId">{{ manual.title }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-0 md:ml-20 md:mt-24 max-w-[80rem] w-full">
      <div class="block md:hidden mb-12">
        <SearchBar v-model="searchText" />
      </div>
      <!-- Search runs in the browser only: results depend on the query string. -->
      <ClientOnly>
        <AisInstantSearch :search-client="searchClient" index-name="article">
          <!-- camelCase on purpose: AisConfigure forwards $attrs verbatim as search parameters. -->
          <AisConfigure :query="searchText" :filters="filters" :restrictSearchableAttributes="['content']" />
          <div class="pb-2 border-b-2 border-black">
            <AisStats>
              <template #default="{ nbHits }">
                <p class="text-14 text-[#B4B4B4]">
                  {{ $t('search.search-result') }} "{{ searchText }}" - {{ nbHits }} {{ $t('search.results') }}
                </p>
              </template>
            </AisStats>
            <div>
              <p class="text-18 font-bold">
                {{ $t('search.product-filter') }}
              </p>
              <div class="flex justify-self-start gap-4 flex-wrap mt-8 pb-10">
                <SearchFilterChip
                  v-for="manual in filteredManuals"
                  :key="manual.documentId"
                  :manual="manual"
                  :checked-products-filter="checkedProductsFilter"
                  :toggle="toggleCheckedProductFilter"
                />
              </div>
            </div>
          </div>
          <div class="pt-12">
            <AisHits>
              <template #item="{ item }">
                <SearchResultItem
                  v-if="item.type === 'manual'"
                  :item="item"
                  :manuals="manuals"
                  :chapter-manuals="chapterManuals"
                  :checked-products-filter="checkedProductsFilter"
                />
                <template v-else>
                  {{ item }}
                </template>
              </template>
            </AisHits>
          </div>
        </AisInstantSearch>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisConfigure, AisHits, AisInstantSearch, AisStats } from 'vue-instantsearch/vue3/es'
import manualsQuery from '~/graphql/manual/manuals.gql?raw'
import chapterManualsQuery from '~/graphql/chapter/chapter-manuals.gql?raw'
import SearchBar from '~/components/SearchBar/SearchBar.vue'
import SearchResultItem from '~/components/Search/SearchResultItem.vue'
import SearchFilterChip from '~/components/Search/SearchFilterChip.vue'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const { meiliUrl, meiliSearchKey } = useRuntimeConfig().public

const { searchClient } = instantMeiliSearch(meiliUrl, meiliSearchKey)

const contentLocale = getLocaleToUse(locale.value)
const { data } = await useAsyncData(`search-${contentLocale}`, async () => {
  const [manuals, chapters] = await Promise.all([
    strapiQuery(manualsQuery, { locale: contentLocale }),
    strapiQuery(chapterManualsQuery, { locale: contentLocale }),
  ])
  return {
    manuals: manuals.manuals as { documentId: string, slug: string, title: string, tag?: string, hidden?: boolean | null }[],
    chapterManuals: Object.fromEntries(chapters.chapters
      .filter((chapter: any) => chapter.manual)
      .map((chapter: any) => [chapter.documentId, chapter.manual.documentId])) as Record<string, string>,
  }
})

const manuals = computed(() => data.value?.manuals ?? [])
const chapterManuals = computed(() => data.value?.chapterManuals ?? {})
const filteredManuals = computed(() => manuals.value.filter(manual => !manual.hidden))

const queryText = () => (typeof route.query.searchText === 'string' ? route.query.searchText : '')
const queryProducts = () => {
  const products = route.query['products[]']
  return (Array.isArray(products) ? products : products ? [products] : []).filter((p): p is string => !!p)
}

const searchText = ref(queryText())
const checkedProductsFilter = ref<string[]>(queryProducts())
// The index holds every locale (see the Strapi meilisearch plugin config): only show this one.
const filters = `type = manual AND locale = ${contentLocale}`

// The page is prerendered without a query string: Nuxt hydrates it on the bare path and only then
// switches to the real URL, so follow the query instead of reading it once.
watch(() => route.query, () => {
  if (queryText() !== searchText.value) searchText.value = queryText()
  const products = queryProducts()
  if (products.join('\n') !== checkedProductsFilter.value.join('\n')) checkedProductsFilter.value = products
})

// Keep the URL shareable: mirror the search text and product filters into the query string.
watch([searchText, checkedProductsFilter], () => {
  if (queryText() === searchText.value && queryProducts().join('\n') === checkedProductsFilter.value.join('\n')) return
  router.replace({ query: { 'searchText': searchText.value, 'products[]': checkedProductsFilter.value } })
}, { deep: true })

function toggleCheckedProductFilter(title: string) {
  const index = checkedProductsFilter.value.indexOf(title)
  if (index > -1) checkedProductsFilter.value.splice(index, 1)
  else checkedProductsFilter.value.push(title)
}

useHead({ title: 'Search - Dogtra Pathfinder' })
</script>

<style>
.product-badge {
  background-color: #C4C4C4;
}

em {
  background-color: yellow;
}
</style>
