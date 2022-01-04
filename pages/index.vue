<template>
  <div class='text-black'>
    <div id="main-banner" class="lg:h-96 md:h-80 sm:h-64 bg-cover bg-center h-auto text-white object-fill" :style='mainBannerStyle'></div>

    <div id="manual-banner">
      <h1 class="text-center">Product user guides</h1>
      <div class="manual-sliders flex overflow-x-scroll overflow-y-hidden">
        <template v-for="index in 10">
          <div class="bg-black h-60 object-contain manual-slide mr-4" :key="index">
            <img src="~/assets/images/manual_thumbnail.jpg">
          </div>
        </template>
      </div>
    </div>

    <div id='search-banner' class='p-12'>
      <h1 class='text-center'>Filter search by Product</h1>
      <div class='flex justify-around flex-wrap mt-4'>
        <v-select v-model="selectedSearchProduct" :components="{OpenIndicator}" :options="['All Products', 'Canada', 'United States']"></v-select>
      </div>

      <div class="text-black flex mt-4">
        <input type="text" placeholder="Look for assistance" class='search-bar flex-grow rounded-l-full py-1 pl-4'>
        <div class='search-bar rounded-r-full py-1 pr-4'><i class='yi-search'/></div>
      </div>
    </div>
    <ais-instant-search-ssr>
      <ais-search-box />
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2>{{ item.title }}</h2>
        </div>
      </ais-hits>
    </ais-instant-search-ssr>

    <div id="popular-articles-banner">
      <h1 class="text-center">Popular articles</h1>
      <div class="articles-sliders flex overflow-x-scroll overflow-y-hidden">
        <template v-for="index in 10">
          <div :key="index" class="bg-black h-40 object-contain manual-slide mr-4">
            <title>How to pair</title>
          </div>
        </template>
      </div>
    </div>
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

const searchClient = instantMeiliSearch(
  process.env.meiliUrl,
  process.env.meiliMasterKey
);

export default {
  components: {
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
  async asyncData({$strapi}) {
    const mainBanner = await $strapi.find('main-banner')

    return {mainBanner}
  },
  data () {
    return {
      error: null,
      OpenIndicator: {
        render: createElement => createElement('i', {class: {'yi-chevron-down': true}}),
      },
      selectedSearchProduct: 'All Products'
    }
  },
  computed: {
    mainBannerStyle() {
      if (this.mainBanner.image) {
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
.product-badge {
  background-color: #C4C4C4;
}
.search-bar {
  background-color: #E7E7E7;
  border: 1px solid transparent;
}

input.search-bar:focus-visible{
  border: 1px solid black;
  border-right-color: transparent;
  outline: none;
}
input.search-bar:focus-visible + .search-bar {
  border: 1px solid black;
  border-left-color: transparent;
}

.manual-slide {
  min-width: 150px;
}

.manual-slide:first-child {
  margin-left: 1rem;
}
</style>
