<template>
  <NuxtLink class='bg-red-50 object-contain manual-slide mr-12 rounded-2xl p-8' :to='manualUrl'>
    <img :src='productImageUrl' :alt='manual.alternativeText' class='mx-auto pb-4'>
    <div class='mobile-slider-bottom flex items-center'>
      <img :src='appIconUrl' :alt='manual.app.icon.url' class='manual-app-logo max-h-full max-w-full'>
      <span class='pl-4 uppercase manual-slide-title'>{{ manual.title }}</span>
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
.manual-slide {
  width: 24.6rem;
}

.manual-app-logo {
  height: 5.7rem;
}

.manual-slide-title {
  font-size: 2rem;
}
/*.manual-slide:first-child {*/
/*  margin-left: 1rem;*/
/*}*/
</style>
