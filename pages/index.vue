<template>
  <div class='text-black'>
    <div id="main-banner" class="h-[55rem] md:h-[75rem] bg-cover bg-center text-white object-fill flex justify-center text-center flex-col" :style='mainBannerStyle'>
      <p class="main-banner-title text-32 md:text-40"><strong>PATHFINDER Manual</strong></p>
      <p class="main-banner-description text-18 md:text-20">The Dogtra PATHFINDER brings GPS and <br> e-collar technolory right to your smartphone</p>
    </div>
    <ProductUserGuideBanner :manuals='manuals'/>
    <SearchBanner />
    <ais-instant-search-ssr class="hidden">
      <ais-search-box />
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2>{{ item.title }}</h2>
        </div>
      </ais-hits>
    </ais-instant-search-ssr>
    <PopularArticlesBanner />
    <div id="footer-banner" class="lg:h-96 md:h-80 sm:h-64 bg-cover bg-center h-auto text-white object-fill flex justify-center text-center flex-col" :style='footerBannerStyle'>
    </div>
  </div>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisHits, AisInstantSearchSsr, AisSearchBox, createServerRootMixin } from 'vue-instantsearch'
import { strapiMediaUrl } from '~/utils/strapi'

import mainBannerQuery from '~/apollo/queries/main-banner/main-banner'
import footerBannerQuery from '~/apollo/queries/footer-banner/footer-banner'
import manualsQuery from '~/apollo/queries/manual/manuals'
import SearchBanner from '~/components/Banner/SearchBanner'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner'
import PopularArticlesBanner from '~/components/Banner/PopularArticlesBanner'

const searchClient = instantMeiliSearch(
  process.env.meiliUrl,
  process.env.meiliMasterKey
);

export default {
  components: {
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
    const [mainBannerResponse, manualsResponse, footerBannerResponse] = await Promise.all([
        app.apolloProvider.defaultClient.query({
          query: mainBannerQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: manualsQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: footerBannerQuery
        })
      ])

    return {
      mainBanner: mainBannerResponse.data.mainBanner,
      footerBanner: footerBannerResponse.data.footerBanner,
      manuals: manualsResponse.data.manuals
    }
  },
  data () {
    return {
      error: null,
    }
  },
  computed: {
    mainBannerStyle() {
      if (this.mainBanner.image) {
        return {
          backgroundImage: 'url("' + strapiMediaUrl(this.mainBanner.image.url) + '")'
        }
      }
      return {}
    },
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

<style>
.vs__dropdown-toggle {
  border-bottom: 3px solid #888888;
}
</style>
