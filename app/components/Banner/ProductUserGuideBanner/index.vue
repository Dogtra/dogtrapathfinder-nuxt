<template>
  <div id="manual-banner" class="banner">
    <h1 class="text-center pt-8 md:pt-16 md:mb-12 capitalize font-medium">
      {{ $t('product-guide-banner.title') }}
    </h1>
    <div class="manual-sliders-wrapper overflow-x-auto flex md:justify-center">
      <div class="manual-sliders flex w-fit px-12 pb-16 md:pb-20 mx-auto">
        <ProductUserGuideBannerItem v-for="manual in manuals" :key="manual.documentId" :manual="manual" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductUserGuideBannerItem from './Item.vue'

defineProps<{ manuals: Record<string, any>[] }>()
</script>

<style scoped>
:deep(.manual-slide + .manual-slide) {
  margin-left: 2rem;
}
</style>

<style>
.banner h1 {
  font-size: 3.2rem;
  line-height: 3.6rem;
}

@media (min-width: 768px) {
  .banner h1 {
    font-size: 4rem;
    line-height: 4.9rem;
  }
}
</style>
