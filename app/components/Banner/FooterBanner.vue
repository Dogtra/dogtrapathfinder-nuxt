<template>
  <div
    id="footer-banner"
    class="bg-cover bg-center h-auto text-white object-fill justify-center text-center flex-col py-10 md:py-20"
    :style="footerBannerStyle"
  >
    <p class="pt-4 text-20 uppercase">
      {{ footerBanner.title }}
    </p>
    <div class="flex justify-center flex-col md:flex-row">
      <FooterBannerImage v-for="app in filteredApps" :key="app.documentId" :app="app" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FooterBannerImage from '~/components/Banner/FooterBannerImage.vue'

const props = defineProps<{
  footerBanner: { title: string, image?: { url: string } | null }
  apps: Record<string, any>[]
}>()

const footerBannerStyle = computed(() => props.footerBanner.image
  ? { backgroundImage: `url("${strapiMediaUrl(props.footerBanner.image.url)}")` }
  : {})

// Apps are sorted by `order` in the query.
const filteredApps = computed(() => props.apps.filter(app => !app.manual?.hidden))
</script>
