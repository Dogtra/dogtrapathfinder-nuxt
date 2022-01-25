<template>
  <ais-instant-search-ssr>
    <div class='text-black flex pt-18 px-12'>
      <div class="w-[35rem] mt-24 ml-16 hidden md:block">
        <div>
          <ais-search-box :value='searchText' class='hidden'/>
          <SearchBar v-model='searchText'></SearchBar>
        </div>
        <div class="mt-12 leading-[3.5rem]">
          <div>
            <p class="h-18 flex items-center text-center font-bold text-18 border-b-1 border-[#E6E6E6] pl-8">Filter
              Search by Product</p>
            <ul>
              <li v-for="manual in manuals" :key="manual.id">
                <input type="checkbox" :id="manual.id" :value="manual.title" v-model="checkedProductsFilter">
                <label>{{ manual.title }}</label>
              </li>
            </ul>
          </div>
<!--          <div class="pt-2">-->
<!--            <p class="h-18 flex items-center text-center font-bold text-18 border-b-1 border-[#E6E6E6] pl-8">Filter-->
<!--              Search by Format</p>-->
<!--            <ul>-->
<!--              <li v-for="index in 4" :key="index">-->
<!--                <input type="checkbox" :id="index" :value="index" v-model="checkedProductsFilter">-->
<!--                <label>Format</label>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </div>
      </div>
      <div class='m-0 md:ml-20 md:mt-24 max-w-[80rem] w-full'>
        <div class="block md:hidden mb-12">
          <SearchBar v-model='searchText'></SearchBar>
        </div>
        <div class="pb-2 border-b-2 border-black">
          <p class="text-14 text-[#B4B4B4]">Search result for "{{ searchText }}" - {{ nbResults }} results</p>
          <div>
            <p class="text-18 font-bold">Filter search by Product</p>
            <div class='flex justify-self-start gap-4 flex-wrap mt-8 pb-10'>
              <div class="bg-yellow rounded-full p-1 px-4 font-semibold" v-for='product in checkedProductsFilter' :key='product'>
                {{ product }}</div>
            </div>
          </div>
<!--          <div>-->
<!--            <p class="text-18 font-bold">Filter search by Format</p>-->
<!--            <div class='flex justify-self-start gap-4 flex-wrap mt-8 pb-10'>-->
<!--              <div class="bg-yellow rounded-full p-1 px-4 font-semibold">Pathfinder</div>-->
<!--              <div class="bg-yellow rounded-full p-1 px-4 font-semibold">Pathfinder mini</div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div class="pt-12">
<!--          <template v-for="item in hits">-->
<!--            <search-result-item :item="item" :key="item.id" :manuals="manuals"/>-->
<!--          </template>-->
          <ais-hits>
            <div slot="item" slot-scope="{ item }">
              <search-result-item :item="item" :manuals="manuals"/>
            </div>
          </ais-hits>
        </div>
      </div>
    </div>
  </ais-instant-search-ssr>
</template>

<script>
import {instantMeiliSearch} from '@meilisearch/instant-meilisearch';

import {AisHits, AisInstantSearchSsr, AisSearchBox, createServerRootMixin} from 'vue-instantsearch';

import manualsQuery from '~/apollo/queries/manual/manuals'
import SearchBar from "~/components/SearchBar/SearchBar";
import SearchResultItem from "~/components/Search/SearchResultItem";

const searchClient = instantMeiliSearch(
  process.env.meiliUrl,
  process.env.meiliMasterKey
);

export default {
  components: {
    SearchResultItem,
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.searchText = to.query.searchText
    })
  },
  async asyncData({app, route}) {
    const {data} = await app.apolloProvider.defaultClient.query({
      query: manualsQuery,
    })

    return {
      manuals: data.manuals
    }
  },
  data() {
    return {
      error: null,
      checkedProductsFilter: [],
      nbResults: 0,
      searchText: 'products',
    }
  },
  methods: {
    addParamsToLocation(params) {
      history.pushState(
        {},
        null,
        this.$route.path +
        '?' +
        Object.keys(params)
          .map(key => {
            return (
              encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            )
          })
          .join('&')
      )
    }
  },
  watch: {
    searchText(searchText) {
      this.addParamsToLocation({searchText})
    }
  }
}
</script>

<style>
.product-badge {
  background-color: #C4C4C4;
}

em {
  background-color: yellow;
}
</style>
