<template>
  <div class="mt-10 md:mt-12 bg-white p-0 md:px-24 md:py-12 md:mx-8 rounded-box md:rounded-3xl flex overflow-hidden shadow-xl">
    <div class="md:pr-24 w-full md:w-fit">
      <div class="flex items-center gap-4 relative">
        <div
          v-if="imagesURLs.length"
          class="absolute md:relative left-4 md:left-0 z-10 rounded-full bg-black w-12 h-12 flex items-center justify-center cursor-pointer"
          @click="slide(-1)"
        >
          <span class="mdi mdi-chevron-left text-white text-30" />
        </div>
        <div class="w-full md:w-[29rem]">
          <Carousel v-if="imagesURLs.length" v-model="currentSlide" :items-to-show="1" wrap-around>
            <Slide v-for="url in imagesURLs" :key="url">
              <img :src="url" :alt="product.title">
            </Slide>
          </Carousel>
          <Carousel
            v-if="imagesURLs.length"
            v-model="currentSlide"
            :items-to-show="Math.min(4, imagesURLs.length)"
            :wrap-around="imagesURLs.length > 4"
            snap-align="start"
            class="hidden md:block"
          >
            <Slide v-for="(url, index) in imagesURLs" :key="url">
              <img :src="url" :alt="product.title" class="cursor-pointer" @click="currentSlide = index">
            </Slide>
          </Carousel>
        </div>
        <div
          v-if="imagesURLs.length"
          class="absolute md:relative right-4 md:right-0 z-10 rounded-full bg-black w-12 h-12 flex items-center justify-center cursor-pointer"
          @click="slide(1)"
        >
          <span class="mdi mdi-chevron-right text-white text-30" />
        </div>
      </div>
      <div class="block md:hidden pt-8 p-6">
        <div class="uppercase flex justify-between items-center pb-6 font-bold border-b-1 border-solid border-[#888888]">
          <p class="text-18">
            {{ product.title }}
          </p>
          <div class="border-solid border-1 border-black bg-yellow rounded-full text-12 flex items-center h-10 pl-4">
            Shop now<span class="mdi mdi-chevron-right text-22" />
          </div>
        </div>
        <div class="flex py-6 justify-between flex-row-reverse">
          <p>$ {{ product.price }}</p>
        </div>
        <ReadMore more-str="read more" less-str="read less" :text="markedDescription" class="prose text-14 pt-4 pb-6" :max-chars="150" />
        <div class="flex gap-4 flex-wrap">
          <img v-for="feature in features" :key="feature.url" class="w-16" :src="feature.url" :alt="feature.alternativeText" :title="feature.title">
        </div>
      </div>
    </div>
    <div class="hidden md:flex flex-col justify-between">
      <div>
        <p class="text-24 uppercase font-bold">
          {{ product.title }}
        </p>
        <p class="text-14 pt-4">
          $ {{ product.price }}
        </p>
        <ReadMore more-str="read more" less-str="read less" :text="markedDescription" class="prose text-14 pt-4 pb-6" :max-chars="200" />
        <div class="flex gap-4 pb-12 flex-wrap">
          <img v-for="feature in features" :key="feature.url" class="w-16" :src="feature.url" :alt="feature.alternativeText" :title="feature.title">
        </div>
      </div>
      <a
        :href="product.shop_url"
        class="ml-auto border-solid border-1 border-black bg-yellow rounded-full text-12 flex items-center h-10 pl-4 w-fit float-right font-bold uppercase"
      >
        Shop now<span class="mdi mdi-chevron-right text-22" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import ReadMore from '~/components/ReadMore.vue'

const props = defineProps<{
  product: {
    title: string
    price?: number | null
    description?: string | null
    shop_url?: string
    images?: { url: string }[] | null
    features?: { title: string, icon?: { url: string, alternativeText?: string } | null }[]
  }
}>()

const currentSlide = ref(0)
const imagesURLs = computed(() => (props.product.images ?? []).map(image => strapiMediaUrl(image.url)))
const features = computed(() => (props.product.features ?? []).map(feature => ({
  url: strapiMediaUrl(feature.icon?.url),
  alternativeText: feature.icon?.alternativeText ?? '',
  title: feature.title,
})))
const markedDescription = computed(() => renderMarkdown(props.product.description))

function slide(offset: number) {
  const count = imagesURLs.value.length
  currentSlide.value = (currentSlide.value + offset + count) % count
}
</script>

<style scoped>
:deep(#readmore) {
  color: blue;
  text-decoration: underline;
}
</style>
