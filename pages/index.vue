<template>
  <div class='text-black'>
    <div id="main-banner" class="lg:h-96 md:h-80 sm:h-64 bg-cover bg-center h-auto text-white object-fill flex justify-center text-center flex-col" :style='mainBannerStyle'>
      <p class="main-banner-title"><strong>PATHFINDER Manual</strong></p>
      <p class="main-banner-description">The Dogtra PATHFINDER brings GPS and <br> e-collar technolory right to your smartphone</p>
    </div>
    <ProductUserGuideBanner :manuals='manuals'/>
    <SearchBanner />
    <ais-instant-search-ssr>
      <ais-search-box />
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2>{{ item.title }}</h2>
        </div>
      </ais-hits>
    </ais-instant-search-ssr>
    <PopularArticlesBanner />
  </div>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisHits, AisInstantSearchSsr, AisSearchBox, createServerRootMixin } from 'vue-instantsearch'
import { strapiMediaUrl } from '~/utils/strapi'

import mainBannerQuery from '~/apollo/queries/main-banner/main-banner'
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
    const [mainBannerResponse, manualsResponse] = await Promise.all([
        app.apolloProvider.defaultClient.query({
          query: mainBannerQuery
        }),
        app.apolloProvider.defaultClient.query({
          query: manualsQuery
        })
      ])

    return {
      mainBanner: mainBannerResponse.data.mainBanner,
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
    }
  },
}
</script>

<style>
.vs__dropdown-toggle {
  border-bottom: 1px solid;
}
</style>

<style scoped>
#main-banner {
  height: 350px;
}
@media (min-width: 640px) {
  #main-banner {
    height: 400px;
  }
}
@media (min-width: 768px) {
  #main-banner {
    height: 490px;
  }
}
@media (min-width: 1024px) {
  #main-banner {
    height: 690px;
  }
}

.main-banner-title {
  font-size: 4.2rem;
}

.main-banner-description {
  font-size: 2rem;
}

</style>
