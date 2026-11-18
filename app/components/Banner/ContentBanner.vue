<template>
  <div class="text-white even:bg-black odd:bg-[#303030]">
    <div class="mx-auto px-4 md:px-12 py-16 w-full max-w-[112rem]">
      <h1 v-if="showTitle" class="text-30 md:text-35 font-bold text-white text-center md:text-left md:inline-flex block">
        {{ category.title }}
        <span class="mx-auto md:mx-0 md:ml-8 mt-6 article-slide-tag rounded-full bg-yellow text-black flex justify-center items-center h-10 w-fit px-4 text-14 uppercase"><strong>{{ category.manual?.tag }}</strong></span>
      </h1>
      <div class="flex items-center">
        <div class="mr-2 rounded-full bg-black w-12 h-12 flex items-center justify-center cursor-pointer" @click="carousel?.prev()">
          <span class="mdi mdi-chevron-left text-white text-30" />
        </div>
        <div class="flex flex-grow gap-[2.7rem] flex-col md:flex-row pt-12 max-w-[100rem] min-w-0">
          <Carousel v-if="articles.length" ref="carousel" v-bind="settings" class="w-full">
            <Slide v-for="article in articles" :key="article.documentId">
              <ContentItem :article="article" />
            </Slide>
          </Carousel>
        </div>
        <div class="ml-2 rounded-full bg-black w-12 h-12 flex items-center justify-center cursor-pointer" @click="carousel?.next()">
          <span class="mdi mdi-chevron-right text-white text-30" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import ContentItem from '~/components/Banner/ContentItem.vue'

const props = withDefaults(defineProps<{
  category: { title: string, manual?: { tag?: string } | null, articles: any[] }
  showTitle?: boolean
  takeSideMenuInAccount?: boolean
}>(), { showTitle: true, takeSideMenuInAccount: false })

const carousel = ref<{ prev: () => void, next: () => void } | null>(null)
const articles = computed(() => props.category.articles ?? [])

// Same responsive steps as the former slick config (slick breakpoints were max-widths).
const settings = computed(() => {
  const count = articles.value.length
  const items = (n: number) => ({ itemsToShow: Math.min(n, count), itemsToScroll: Math.min(n, count) })
  const [small, medium] = props.takeSideMenuInAccount ? [1130, 1430] : [780, 1080]
  return {
    ...items(1),
    snapAlign: 'start' as const,
    wrapAround: count > 3,
    breakpoints: { [small + 1]: items(2), [medium + 1]: items(3) },
  }
})
</script>

<style scoped>
:deep(.carousel__slide) {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

@media (min-width: 768px) {
  :deep(.carousel__slide) {
    padding: 0 1rem;
  }
}

:deep(.carousel__slide > div) {
  max-width: 100%;
}
</style>
