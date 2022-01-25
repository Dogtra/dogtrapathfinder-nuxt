<template>
  <NuxtLink class='shadow-xl object-contain manual-slide max-w-[24.5rem] min-w-[21rem] mr-12 last:mr-0 rounded-2xl p-4 flex flex-col justify-between' :to='manualUrl'>
    <img :src='productImageUrl' :alt='manual.alternativeText' class='mx-auto pb-4'>
    <div class='mobile-slider-bottom flex items-center'>
      <img :src='appIconUrl' :alt='manual.app.icon.url' class='manual-app-logo max-h-18 md:max-h-24 md:h-24'>
      <span class='pl-4 uppercase manual-slide-title text-18 md:text-20 font-semibold'>{{ manual.title }}</span>
    </div>
  </NuxtLink>
</template>
<script>
import { strapiMediaUrl } from '~/utils/strapi'

export default {
  name: 'ProductUserGuideBannerListItem',
  props: {
    manual: {
      type: Object,
      required: true
    }
  },
  computed: {
    productImageUrl() {
      return strapiMediaUrl(this.manual.product_image.url)
    },
    appIconUrl() {
      return strapiMediaUrl(this.manual.app.icon.url)
    },
    manualUrl() {
      return '/manuals/' + this.manual.slug
    }
  }
}
</script>
<style scoped>

.manual-slide-title {
  font-size: 2rem;
}
/*.manual-slide:first-child {*/
/*  margin-left: 1rem;*/
/*}*/
</style>
