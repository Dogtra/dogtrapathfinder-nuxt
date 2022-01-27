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
    <div id="footer-banner" class="lg:h-96 md:h-80 sm:h-64 bg-cover bg-center h-auto text-white object-fill flex justify-center text-center flex-col" :style='footerBannerStyle'>
    </div>
  </div>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisHits, AisInstantSearchSsr, AisSearchBox, createServerRootMixin } from 'vue-instantsearch'
import axios from 'axios'
import { strapiMediaUrl } from '~/utils/strapi'

import mainBannerQuery from '~/apollo/queries/main-banner/main-banner'
import footerBannerQuery from '~/apollo/queries/footer-banner/footer-banner'
import manualsQuery from '~/apollo/queries/manual/manuals'
import SearchBanner from '~/components/Banner/SearchBanner'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner'
import PopularArticlesBanner from '~/components/Banner/PopularArticlesBanner'
import ImageBanner from '~/components/Banner/ImageBanner'

const searchClient = instantMeiliSearch(
  process.env.meiliUrl,
  process.env.meiliMasterKey
);

export default {
  components: {
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
    const [mainBannerResponse, manualsResponse, footerBannerResponse] = await Promise.all([
        app.apolloProvider.defaultClient.query({
          query: mainBannerQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: manualsQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: footerBannerQuery
        }),

      ])

    return {
      mainBanner: mainBannerResponse.data.mainBanner,
      footerBanner: footerBannerResponse.data.footerBanner,
      manuals: manualsResponse.data.manuals,
    }
  },
  data () {
    return {
      error: null,
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
  async mounted() {
    const manualsResponse = await axios.get(process.env.STRAPI_URL + '/manuals' )
    const articleRoutes = await axios.get(process.env.STRAPI_URL + '/articles' )

    console.log(articleRoutes.data.map(article => {
      const manual = manualsResponse.data.find(manual => manual.id === article.chapter.manual)
      return {
        route: '/manuals/' + manual.slug  + '/' + article.uuid
      }
    }))
  },
}
</script>

<style>
.vs__dropdown-toggle {
  border-bottom: 3px solid #888888;
}
</style>
