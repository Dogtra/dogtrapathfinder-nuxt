<template>
  <div class='h-[40rem] md:h-[55rem] bg-cover bg-center text-white object-fill flex justify-center text-center flex-col px-12'
       :style='bannerStyle'>
    <p class='text-32 md:text-40'><strong>{{ banner.title }}</strong></p>
    <p class='text-18 md:text-20 max-w-[50rem] mx-auto'>{{ banner.description }}</p>
  </div>
</template>
<script>
import { strapiMediaUrl } from '~/utils/strapi'

export default {
  name: 'ImageBanner',
  props: {
    banner: {
      type: Object,
      required: true
    }
  },
  computed: {
    bannerStyle() {
      if (this.banner.image) {
        return {
          backgroundImage: 'url("' + strapiMediaUrl(this.banner.image.url) + '")'
        }
      }
      return {}
    },
  }
}
</script>
