<template>
  <div>
    <ImageBanner :banner='manualBanner'></ImageBanner>
    <ProductUserGuideBanner :manuals='manuals'/>
    <SearchBanner :manuals='manuals' />
  </div>
</template>

<script>
import manualBannerQuery from '~/apollo/queries/manual-banner/manual-banner.gql'
import manualsQuery from '~/apollo/queries/manual/manuals'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner'
import SearchBanner from '~/components/Banner/SearchBanner'
import ImageBanner from '~/components/Banner/ImageBanner'

export default {
  components: { ImageBanner, SearchBanner, ProductUserGuideBanner },
  async asyncData({ app, route }) {
    const [manualsResponse, manualBannerResponse] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: manualsQuery,
      }),
      app.apolloProvider.defaultClient.query({
        query: manualBannerQuery,
      }),
    ])

    return {
      manuals: manualsResponse.data.manuals,
      manualBanner: manualBannerResponse.data.manualBanner
    }
  },
  head() {
    return {
      title: 'Manuals - Dogtra Pathfinder'
    }
  },
}

</script>
