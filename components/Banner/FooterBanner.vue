<template>
  <div id='footer-banner'
       class='bg-cover bg-center h-auto text-white object-fill justify-center text-center flex-col py-10 md:py-20'
       :style='footerBannerStyle'>
    <div class='flex justify-center gap-[2.6rem]'>
      <template v-for='app in filteredApps'>
        <FooterBannerImage :key='app.icon.url' :app='app' />
      </template>
    </div>
    <p class='pt-4'>DOWNLOADING THE</p>
    <p class='pb-4'>
      <span class='font-extrabold'>PATHFINDER </span>
      <template v-if='filteredApps.length > 1'>
        or <span class='font-extrabold'>PATHFINDER2</span>
      </template>
      APP
    </p>
    <div class='w-[16.6rem] md:w-[20rem] mx-auto flex gap-4'>
      <div class='w-1/2'><a :href='filteredApps[0].android_store_url'><img alt='Get it on Google Play' src='~/assets/images/mobile-app-android-white.png'/></a></div>
      <div class='w-1/2'><a class='max-w-full' :href="filteredApps[0].apple_store_url"><img src="~/assets/images/mobile-app-apple-white.png" alt="Download on the App Store"></a></div>
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
      return this.apps.filter(app => !app.manual.hidden)
    },
  },
}
</script>
