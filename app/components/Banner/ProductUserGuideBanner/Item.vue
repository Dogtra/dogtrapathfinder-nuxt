<template>
  <NuxtLink
    v-show="!manual.hidden"
    class="shadow-xl bg-white object-contain manual-slide max-w-[24.5rem] min-w-[21rem] last:mr-0 rounded-2xl p-4 flex flex-col justify-between"
    :to="localePath(`/manuals/${manual.slug}`)"
  >
    <img :src="strapiMediaUrl(manual.product_image?.url)" :alt="manual.product_image?.alternativeText || manual.title" class="mx-auto pb-4">
    <div class="mobile-slider-bottom flex items-center">
      <img :src="strapiMediaUrl(manual.app?.icon?.url)" :alt="manual.app?.icon?.alternativeText || ''" class="manual-app-logo max-h-18 md:max-h-24 md:h-24">
      <span class="pl-4 uppercase manual-slide-title text-18 md:text-20 font-semibold">{{ manual.title }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ manual: Record<string, any> }>()
const localePath = useLocalePath()
</script>

<style scoped>
.manual-slide-title {
  font-size: 2rem;
}
</style>
