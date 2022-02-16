<template>
  <div id='footer-banner'
       class='bg-cover bg-center h-auto text-white object-fill justify-center text-center flex-col py-10 md:py-20'
       :style='footerBannerStyle'>
    <p class='pt-4 text-20'>DOWNLOADING THE APP</p>
    <div class='flex justify-center flex-col md:flex-row'>
      <template v-for='app in filteredApps'>
        <FooterBannerImage :key='app.icon.url' :app='app' />
      </template>
    </div>
  </div>
</template>
<script>
import { orderBy } from 'lodash'
import { strapiMediaUrl } from '~/utils/strapi'
import FooterBannerImage from '~/components/Banner/FooterBannerImage'

export default {
  name: 'FooterBanner',
  components: { FooterBannerImage },
  props: {
    footerBanner: {
      type: Object,
      required: true
    },
    apps: {
      type: Array,
      required: true
    }
  },
  computed: {
    footerBannerStyle() {
      if (this.footerBanner.image) {
        return {
          backgroundImage: 'url("' + strapiMediaUrl(this.footerBanner.image.url) + '")'
        }
      }
      return {}
    },
    filteredApps() {
      return orderBy(this.apps.filter(app => !app.manual.hidden), 'order')
    },
  },
}
</script>
