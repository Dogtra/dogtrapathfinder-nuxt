<template>
  <div class='text-black'>
    <ImageBanner :banner='mainBanner' />
    <ProductUserGuideBanner :manuals='manuals'/>
    <SearchBanner :manuals="manuals" />
    <ais-instant-search-ssr class="hidden">
      <ais-search-box />
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2>{{ item.title }}</h2>
        </div>
      </ais-hits>
    </ais-instant-search-ssr>
    <PopularArticlesBanner />
    <FooterBanner :footer-banner='footerBanner' :apps='apps' />
  </div>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisHits, AisInstantSearchSsr, AisSearchBox, createServerRootMixin } from 'vue-instantsearch'

import mainBannerQuery from '~/apollo/queries/main-banner/main-banner'
import footerBannerQuery from '~/apollo/queries/footer-banner/footer-banner'
import manualsQuery from '~/apollo/queries/manual/manuals'
import appsQuery from '~/apollo/queries/app/apps'
import SearchBanner from '~/components/Banner/SearchBanner'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner'
import PopularArticlesBanner from '~/components/Banner/PopularArticlesBanner'
import ImageBanner from '~/components/Banner/ImageBanner'
import FooterBanner from '~/components/Banner/FooterBanner'

const searchClient = instantMeiliSearch(
  process.env.meiliUrl,
  process.env.meiliMasterKey
);

export default {
  components: {
    FooterBanner,
    ImageBanner,
    PopularArticlesBanner,
    ProductUserGuideBanner,
    SearchBanner,
    AisInstantSearchSsr,
    AisSearchBox,
    AisHits
  },
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: 'article',
    }),
  ],
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

    return {
      mainBanner: mainBannerResponse.data.mainBanner,
      footerBanner: footerBannerResponse.data.footerBanner,
      manuals: manualsResponse.data.manuals,
      apps: appsResponse.data.mobileApps
    }
  },
  data () {
    return {
      error: null,
    }
  },
}
</script>

<style>
.vs__dropdown-toggle {
  border-bottom: 3px solid #888888;
}
</style>
