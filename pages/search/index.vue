<template>
  <div class='text-black flex'>
    <div class="w-[35rem]">
      <div>
        <SearchBar></SearchBar>
      </div>
      <div>
        Filter Search by Product
      </div>

      <div>
        Filter Search by Format
      </div>
    </div>
    <div id='search-banner' class='p-12'>
      <p class='text-center'>Filter search by Product</p>
      <div class='flex justify-around flex-wrap mt-4'>
        <div class="product-badge rounded-full bg-gray-400 p-1 px-4">Pathfinder</div>
        <div class="product-badge rounded-full bg-gray-400 text-black p-1 px-4">Pathfinder mini</div>
      </div>

      <div class="text-black flex mt-4">
        <input type="text" placeholder="Look for assistance" class='search-bar flex-grow rounded-l-full py-1 pl-4'>
        <div class='search-bar rounded-r-full py-1 pr-4'><i class='yi-search'/></div>
      </div>
      <p class='text-center mt-4'>Popular searches</p>
    </div>
    <ais-instant-search-ssr>
      <ais-search-box />
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2>{{ item.title }}</h2>
        </div>
      </ais-hits>
    </ais-instant-search-ssr>
  </div>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import {
  AisInstantSearchSsr,
  AisHits,
  AisSearchBox,
  createServerRootMixin
} from 'vue-instantsearch';

import mainBannerQuery from '~/apollo/queries/main-banner/main-banner'
import SearchBar from "~/components/SearchBar/SearchBar";

const searchClient = instantMeiliSearch(
  process.env.meiliUrl,
  process.env.meiliMasterKey
);

export default {
  components: {
    SearchBar,
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
    const { data } = await app.apolloProvider.defaultClient.query({
      query: mainBannerQuery,
    })

    return {
      mainBanner: data.mainBanner
    }
  },
  data () {
    return {
      error: null,
    }
  },
  computed: {
    mainBannerStyle() {
      if (this.mainBanner) {
        return {
          backgroundImage: 'url("' + this.mainBanner.image.url + '")'
        }
      }
      return {}
    }
  },
}
</script>

<style>
.product-badge {
  background-color: #C4C4C4;
}
</style>
