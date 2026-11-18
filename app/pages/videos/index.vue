<template>
  <div v-if="data">
    <ImageBanner :banner="data.contentBanner" />
    <div class="search-banner-product-filter bg-black justify-center py-4 flex w-100 mx-auto">
      <SearchBannerFilterChoice
        v-for="manual in filteredManuals"
        :key="manual.documentId"
        :manual="manual"
        :selected-product="selectedSearchProduct"
        :change-selected-product="selectProduct"
        active-text-color="#FFDD00"
      />
    </div>
    <ContentBanner v-for="category in filteredBlogCategories" :key="category.documentId" :category="category" />
  </div>
</template>

<script setup lang="ts">
import contentBannerQuery from '~/graphql/content-banner/content-banner.gql?raw'
import blogCategoriesQuery from '~/graphql/blog-categories/blog-categories.gql?raw'
import manualsQuery from '~/graphql/manual/manuals.gql?raw'
import ImageBanner from '~/components/Banner/ImageBanner.vue'
import ContentBanner from '~/components/Banner/ContentBanner.vue'
import SearchBannerFilterChoice from '~/components/Banner/SearchBannerFilterChoice.vue'

const { data } = await useAsyncData('videos', async () => {
  const [banner, categories, manuals] = await Promise.all([
    strapiQuery(contentBannerQuery),
    strapiQuery(blogCategoriesQuery),
    strapiQuery(manualsQuery),
  ])
  return {
    contentBanner: banner.contentBanner ?? {},
    blogCategories: categories.blogCategories as any[],
    manuals: manuals.manuals as any[],
  }
})

const selectedSearchProduct = ref(data.value?.manuals[0]?.title ?? '')
const filteredManuals = computed(() => data.value?.manuals.filter(manual => !manual.hidden) ?? [])
const filteredBlogCategories = computed(() => data.value?.blogCategories
  .filter(category => category.manual?.title === selectedSearchProduct.value) ?? [])

function selectProduct(title: string) {
  selectedSearchProduct.value = title
}

useHead({ title: 'Videos - Dogtra Pathfinder' })
</script>
