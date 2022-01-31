<template>
  <div>
    <img class='w-16 md:w-[5.2rem] h-16 md:h-[5.2rem]' :src='appIconUrl'>
  </div>
</template>
<script>
import { strapiMediaUrl } from '~/utils/strapi'

export default {
  name: 'FooterBannerImage',
  props: {
    app: {
      type: Object,
      required: false
    }
  },
  computed: {
    appIconUrl() {
      return strapiMediaUrl(this.app.icon.url)
    }
  }
}
</script>
