<template>
  <div v-if="manual" id="manual-index-container" class="flex flex-col px-12 py-18 pb-8 text-center">
    <div id="manual-index-image">
      <img :src="strapiMediaUrl(manual.product_image?.url)" class="mx-auto" :alt="manual.title">
      <p class="uppercase font-semibold italic text-30">
        {{ manual.title }}
      </p>
    </div>
    <p class="pt-6 pb-10 text-18 uppercase font-medium">
      {{ $t('manuals.manual.title') }}
    </p>
    <div id="manual-index-search">
      <SearchBar v-model="searchText" max-width="42.5rem" class="mx-auto" :selected-products="[manual.title]" />
    </div>
    <NuxtLink
      v-if="manualFirstPageUrl"
      id="manual-index-first-page"
      class="w-fit mx-auto my-8 px-8 py-4 font-semibold rounded-btn bg-yellow text-black hover:bg-black hover:text-yellow"
      :to="localePath(manualFirstPageUrl)"
    >
      <span>{{ $t('manuals.manual.first-page') }}</span><span class="mdi mdi-chevron-right text-18" />
    </NuxtLink>
    <div v-if="manual.app" id="manual-index-app" class="max-w-[64rem] mx-auto">
      <div><img class="mx-auto w-24 pb-4" :src="strapiMediaUrl(manual.app.icon?.url)" alt=""></div>
      <div class="flex items-center px-10 py-4 border-solid border-1 border-[#E0E0E0] rounded-btn bg-[#F2F2F2] my-4 w-fit mx-auto gap-4">
        <span class="mdi mdi-alert" />
        <p v-if="manual.app.disclaimer" class="text-14" v-html="sanitizeHtml(manual.app.disclaimer)" />
      </div>
      <p class="text-20 font-medium" v-html="sanitizeHtml(manual.app.download)" />
      <p class="text-12" v-html="sanitizeHtml(manual.app.compatibility)" />
      <div class="app-badge-container flex gap-4 max-w-[33rem] mx-auto pt-10 pb-8">
        <div class="w-1/2">
          <a :href="manual.app.android_store_url"><img alt="Get it on Google Play" src="~/assets/images/mobile-android.webp"></a>
        </div>
        <div class="w-1/2">
          <a class="max-w-full" :href="manual.app.apple_store_url"><img src="~/assets/images/mobile-apple.webp" alt="Download on the App Store"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '~/components/SearchBar/SearchBar.vue'

definePageMeta({ layout: 'manual', middleware: 'manual' })

const localePath = useLocalePath()
const manualStore = useManualStore()
const searchText = ref('')

// Loaded by the `manual` middleware.
const manual = computed(() => manualStore.manual as any)

const manualFirstPageUrl = computed(() => {
  const firstArticle = manual.value?.chapters[0]?.articles[0]
  return firstArticle ? `/manuals/${manual.value.slug}/${firstArticle.uuid}` : ''
})

useHead({ title: () => manual.value?.title })
</script>
