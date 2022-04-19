<template>
  <div class='text-black'>
    <ImageBanner :banner='mainBanner' />
    <ProductUserGuideBanner :manuals='manuals'/>
    <SearchBanner :manuals="manuals" />
    <PopularArticlesBanner />
    <FooterBanner :footer-banner='footerBanner' :apps='apps' />
  </div>
</template>

<script>
import mainBannerQuery from '~/apollo/queries/main-banner/main-banner'
import footerBannerQuery from '~/apollo/queries/footer-banner/footer-banner'
import manualsQuery from '~/apollo/queries/manual/manuals'
import appsQuery from '~/apollo/queries/app/apps'

import SearchBanner from '~/components/Banner/SearchBanner'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner'
import PopularArticlesBanner from '~/components/Banner/PopularArticlesBanner'
import ImageBanner from '~/components/Banner/ImageBanner'
import FooterBanner from '~/components/Banner/FooterBanner'


export default {
  components: {
    FooterBanner,
    ImageBanner,
    PopularArticlesBanner,
    ProductUserGuideBanner,
    SearchBanner,
  },
  async asyncData({ app, route }) {
    const [mainBannerResponse, manualsResponse, footerBannerResponse, appsResponse] = await Promise.all([
        app.apolloProvider.defaultClient.query({
          query: mainBannerQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: manualsQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: footerBannerQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: appsQuery
        }),
      ])

    const filteredManuals = manualsResponse.data.manuals.filter(manual => !manual.hidden)

    return {
      mainBanner: mainBannerResponse.data.mainBanner,
      footerBanner: footerBannerResponse.data.footerBanner,
      manuals: filteredManuals,
      apps: appsResponse.data.mobileApps
    }
  },
  data () {
    return {
      error: null,
    }
  },
  head() {
    return {
      title: 'Home - Dogtra Pathfinder',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Dogtra Pathfinder',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `/images/og_image.jpg`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Complete GPS Dog Tracking and Training System by Dogtra. Explore the PATHFINDER SERIES manuals, products, video tutorials and FAQ\'S.',
        },
      ]
    }
  }
}
</script>

<style>
.vs__dropdown-toggle {
  border-bottom: 3px solid #888888;
}
</style>
