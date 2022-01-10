<template>
  <NuxtLink class='bg-red-50 h-60 object-contain manual-slide mr-4 p-1' :to='manualUrl'>
    <img :src='productImageUrl' :alt='manual.alternativeText' class='max-h-44 mx-auto'>
    <div class='mobile-slider-bottom h-14 flex items-center justify-between'>
      <img :src='appIconUrl' :alt='manual.app.icon.url' class='max-h-full max-w-full'>
      <span>{{ manual.title }}</span>
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
  min-width: 150px;
}

.manual-slide:first-child {
  margin-left: 1rem;
}
</style>
