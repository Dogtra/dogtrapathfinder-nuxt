<template>
  <div class='footer-banner-item px-8 py-8 md:py-0 w-fit mx-auto md:mx-0'>
    <img class='w-16 md:w-[5.2rem] h-16 md:h-[5.2rem] mx-auto my-4' :src='appIconUrl'>
    <p class='pb-4'>
      <span class='font-extrabold'> {{ app.name }} </span> APP
    </p>
    <div class='w-[16.6rem] md:w-[30rem] mx-auto flex gap-4'>
      <div class='w-1/2'><a :href='app.android_store_url'><img alt='Get it on Google Play' src='~/assets/images/mobile-app-android-white.webp'/></a></div>
      <div class='w-1/2'><a class='max-w-full' :href="app.apple_store_url"><img src="~/assets/images/mobile-app-apple-white.webp" alt="Download on the App Store"></a></div>
    </div>
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

<style>
.footer-banner-item + .footer-banner-item{
  border-left: 0;
  border-top: 1px solid white;
}

@media (min-width: 768px) {
  .footer-banner-item + .footer-banner-item{
    border-left: 1px solid white;
    border-top: 0;
  }
}

</style>
