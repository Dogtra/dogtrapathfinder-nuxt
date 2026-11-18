<template>
  <div v-if="data" class="text-black">
    <ImageBanner :banner="data.mainBanner" />
    <ProductUserGuideBanner :manuals="data.manuals" />
    <SearchBanner :manuals="data.manuals" />
    <PopularArticlesBanner />
    <FooterBanner :footer-banner="data.footerBanner" :apps="data.apps" />
  </div>
</template>

<script setup lang="ts">
import mainBannerQuery from '~/graphql/main-banner/main-banner.gql?raw'
import footerBannerQuery from '~/graphql/footer-banner/footer-banner.gql?raw'
import manualsQuery from '~/graphql/manual/manuals.gql?raw'
import appsQuery from '~/graphql/app/apps.gql?raw'
import SearchBanner from '~/components/Banner/SearchBanner.vue'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner/index.vue'
import PopularArticlesBanner from '~/components/Banner/PopularArticlesBanner.vue'
import ImageBanner from '~/components/Banner/ImageBanner.vue'
import FooterBanner from '~/components/Banner/FooterBanner.vue'

const { data } = await useAsyncData('home', async () => {
  const [main, manuals, footer, apps] = await Promise.all([
    strapiQuery(mainBannerQuery),
    strapiQuery(manualsQuery),
    strapiQuery(footerBannerQuery),
    strapiQuery(appsQuery),
  ])
  return {
    mainBanner: main.mainBanner ?? {},
    footerBanner: footer.footerBanner ?? {},
    manuals: manuals.manuals.filter((manual: any) => !manual.hidden),
    apps: apps.mobileApps,
  }
})

useHead({
  title: 'Home - Dogtra Pathfinder',
  meta: [
    { property: 'og:title', content: 'Dogtra Pathfinder' },
    { property: 'og:image', content: '/images/og_image.jpg' },
    {
      property: 'og:description',
      content: 'Complete GPS Dog Tracking and Training System by Dogtra. Explore the PATHFINDER SERIES manuals, products, video tutorials and FAQ\'S.',
    },
  ],
})
</script>

<style>
.vs__dropdown-toggle {
  border-bottom: 3px solid #888888;
}
</style>
