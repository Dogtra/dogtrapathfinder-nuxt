<template>
  <ais-instant-search-ssr>
  <div class='text-black flex'>
    <div class="w-[35rem] mt-24 ml-16">
      <div>
        <ais-search-box />
        <SearchBar v-model="textFilter"></SearchBar>
      </div>
      <div class="mt-12 leading-[3.5rem]">
        <div>
          <p class="h-18 flex items-center text-center font-bold text-18 border-b-1 border-[#E6E6E6] pl-8">Filter Search by Product</p>
          <ul>
            <li v-for="index in 4" :key="index">
              <input type="checkbox" :id="index" :value="index" v-model="checkedProductsFilter">
              <label>Pathfinder</label>
            </li>
          </ul>
        </div>
        <div class="pt-12">
          <p class="h-18 flex items-center text-center font-bold text-18 border-b-1 border-[#E6E6E6] pl-8">Filter Search by Format</p>
          <ul>
            <li v-for="index in 4" :key="index">
              <input type="checkbox" :id="index" :value="index" v-model="checkedProductsFilter">
              <label>Format</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class='p-12'>
      <p>Search result for "{{ textFilter }}" - {{ nbResults }} results</p>
      <div>
        <p>Filter search by Product</p>
        <div class='flex justify-around flex-wrap mt-4'>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder</div>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder mini</div>
        </div>
      </div>
      <div>
        <p>Filter search by Format</p>
        <div class='flex justify-around flex-wrap mt-4'>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder</div>
          <div class="bg-yellow rounded-full p-1 px-4">Pathfinder mini</div>
        </div>

        <div>
<!--        <template v-for="item in hits">-->
<!--          <search-result-item :item="item" :key="item.id" :manuals="manuals"/>-->
<!--        </template>-->
        </div>
      <ais-hits>
        <search-result-item :item="item" :key="item.id" :manuals="manuals"/>
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
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: manualsQuery,
    })

    return {
      manuals: data.manuals
    }
  },
  data () {
    return {
      error: null,
      checkedProductsFilter: [],
      textFilter: '',
      nbResults: 0,
    }
  },
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
