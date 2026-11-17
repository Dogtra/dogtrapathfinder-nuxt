<template>
  <div id="popular-articles-banner" class="banner">
    <h1 class="text-center pt-16 mb-8 font-medium">
      Popular Searches
    </h1>
    <div class="flex mx-auto items-center justify-center">
      <div class="ml-4 cursor-pointer min-w-[3rem] min-h-[3rem] rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300" @click="carousel?.prev()">
        <span class="mdi mdi-chevron-left" />
      </div>
      <div class="flex gap-12 pb-20 min-w-0 flex-grow max-w-[150rem]">
        <Carousel v-if="popularArticles.length" ref="carousel" v-bind="settings" class="w-full">
          <Slide v-for="article in popularArticles" :key="article.documentId">
            <PopularArticleItem :article="article" />
          </Slide>
        </Carousel>
      </div>
      <div class="mr-4 cursor-pointer min-w-[3rem] min-h-[3rem] rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300" @click="carousel?.next()">
        <span class="mdi mdi-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import PopularArticleItem from '~/components/Banner/PopularArticleItem.vue'
import popularArticlesQuery from '~/graphql/article/popularArticles.gql?raw'

const carousel = ref<{ prev: () => void, next: () => void } | null>(null)

// View counts change constantly, so this stays a live client-side request (as before).
const { data } = useLazyAsyncData('popular-articles',
  () => strapiQuery<{ articles: any[] }>(popularArticlesQuery, { limit: 5 }),
  { server: false })
const popularArticles = computed(() => data.value?.articles ?? [])

// Same responsive steps as the former slick config (slick breakpoints were max-widths).
const settings = computed(() => {
  const count = popularArticles.value.length
  const items = (n: number) => ({ itemsToShow: Math.min(n, count), itemsToScroll: Math.min(n, count) })
  return {
    ...items(1),
    snapAlign: 'center' as const,
    breakpoints: { 473: items(2), 810: items(3), 1071: items(4), 1399: items(5) },
  }
})
</script>

<style scoped>
:deep(.carousel__slide) {
  display: flex;
  justify-content: center;
  align-items: stretch;
}
</style>
