<template>
  <div class='mt-12 bg-white px-24 py-12 rounded-box flex'>
    <div class='w-29rem'>
      <img :src='imageUrl'>
    </div>
    <div>
      {{ product }}
    </div>
  </div>
</template>
<script>
import { strapiMediaUrl } from '~/utils/strapi'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      return strapiMediaUrl(this.product.image[0].url)
    }
  }
}
</script>
