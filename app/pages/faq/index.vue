<template>
  <div v-if="data" class="bg-[#F8F7F5] pb-28">
    <ImageBanner :banner="data.faqBanner" />
    <div class="max-w-[64rem] rounded-box mx-4 md:mx-auto px-4 py-4 mt-28 bg-white">
      <div class="search-banner-product-filter justify-center py-4 hidden md:flex w-fit mx-auto">
        <SearchBannerFilterChoice
          v-for="manual in filteredManuals"
          :key="manual.documentId"
          :manual="manual"
          :selected-product="selectedSearchProduct"
          :change-selected-product="selectProduct"
        />
      </div>
      <div class="md:hidden flex justify-around flex-wrap py-4 px-12 max-w-[42.5rem] mx-auto">
        <ClientOnly>
          <VSelect v-model="selectedSearchProduct" class="w-full" :components="{ OpenIndicator }" :options="options" />
        </ClientOnly>
      </div>
      <div>
        <ul class="flex justify-around flex-wrap select-none pb-8 pt-4">
          <FaqCategoryItem title="All" :selected-category="selectedCategory" :select-category="selectCategory" />
          <FaqCategoryItem
            v-for="category in filteredFaqCategories"
            :key="category.documentId"
            :title="category.title"
            :selected-category="selectedCategory"
            :select-category="selectCategory"
          />
        </ul>
      </div>
      <div>
        <FaqItem v-for="faq in filteredFaqs" :key="faq.documentId" :faq="faq" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import faqsQuery from '~/graphql/faq/faqs.gql?raw'
import faqCategoriesQuery from '~/graphql/faq-category/faq-categories.gql?raw'
import faqBannerQuery from '~/graphql/faq-banner/faq-banner.gql?raw'
import manualsQuery from '~/graphql/manual/manuals.gql?raw'
import FaqCategoryItem from '~/components/FAQ/FaqCategoryItem.vue'
import FaqItem from '~/components/FAQ/FaqItem.vue'
import ImageBanner from '~/components/Banner/ImageBanner.vue'
import SearchBannerFilterChoice from '~/components/Banner/SearchBannerFilterChoice.vue'
import OpenIndicator from '~/components/SelectOpenIndicator.vue'

// Categories are sorted by `order` in their query. A FAQ's `order` is its position
// within its category, so FAQs are grouped by category order first (stable sort).
const byCategoryOrder = (a: any, b: any) =>
  (a.faq_category?.order ?? Infinity) - (b.faq_category?.order ?? Infinity)
const { locale } = useI18n()
const contentLocale = getLocaleToUse(locale.value)
const { data } = await useAsyncData(`faq-${contentLocale}`, async () => {
  const variables = { locale: contentLocale }
  const [faqs, categories, banner, manuals] = await Promise.all([
    strapiQuery(faqsQuery, variables),
    strapiQuery(faqCategoriesQuery, variables),
    strapiQuery(faqBannerQuery, variables),
    strapiQuery(manualsQuery, variables),
  ])
  return {
    faqs: [...faqs.faqs].sort(byCategoryOrder) as any[],
    faqCategories: categories.faqCategories as any[],
    faqBanner: banner.faqBanner ?? {},
    manuals: manuals.manuals as any[],
  }
})

const filteredManuals = computed(() => data.value?.manuals.filter(manual => !manual.hidden) ?? [])
const options = computed(() => filteredManuals.value.map(manual => manual.title))
const selectedSearchProduct = ref<string>(filteredManuals.value[0]?.title ?? '')
const selectedCategory = ref('All')

const filteredFaqCategories = computed(() => data.value?.faqCategories
  .filter(category => category.manual?.title === selectedSearchProduct.value) ?? [])

const filteredFaqs = computed(() => (data.value?.faqs ?? []).filter((faq) => {
  if (!faq.faq_category) return false
  return selectedCategory.value === 'All'
    ? faq.faq_category.manual?.title === selectedSearchProduct.value
    : faq.faq_category.title === selectedCategory.value
}))

function selectCategory(value: string) {
  selectedCategory.value = value
}

function selectProduct(product: string) {
  selectedSearchProduct.value = product
}

useHead({ title: 'FAQ - Dogtra Pathfinder' })
</script>
