<template>
  <div>
    MANUALS
    <ProductUserGuideBanner :manuals='manuals'/>
    <SearchBanner />
    <PopularArticlesBanner />
  </div>
</template>

<script>
import manualsQuery from '~/apollo/queries/manual/manuals'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner'
import SearchBanner from '~/components/Banner/SearchBanner'
import PopularArticlesBanner from '~/components/Banner/PopularArticlesBanner'

export default {
  components: { PopularArticlesBanner, SearchBanner, ProductUserGuideBanner },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: manualsQuery,
    })

    return {
      manuals: data.manuals
    }
  },
}

</script>
