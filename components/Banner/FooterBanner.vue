<template>
  <div id='footer-banner'
       class='bg-cover bg-center h-auto text-white object-fill justify-center text-center flex-col'
       :style='footerBannerStyle'>
    <div class='flex justify-center gap-[2.6rem]'>
      <template v-for='app in apps'>
        <FooterBannerImage :key='app.icon.url' :app='app' />
      </template>
    </div>
    <p class='pt-4'>DOWNLOADING THE</p>
    <p class='pb-4'><span class='font-extrabold'>PATHFINDER</span> or <span class='font-extrabold'>PATHFINDER2</span> APP</p>
    <div>
      <img class='w-[20rem] mx-auto' src='~/assets/images/mobile-apps.png'>
    </div>
  </div>
</template>
<script>
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
      type: Object,
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
    }
  },
}
</script>
