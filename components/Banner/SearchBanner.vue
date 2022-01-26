<template>
  <div id='search-banner' class='banner pt-8 md:pt-16 pb-16 md:pb-24 px-12'>
    <h1 class='text-center mb-8 font-medium'>Filter search by Product</h1>
    <div class="search-banner-product-filter justify-center pb-8 md:pb-20 hidden md:flex w-fit mx-auto">
      <template v-for='manual in manuals'>
        <SearchBannerFilterChoice :key='manual.id' :manual='manual' :selected-product='selectedSearchProduct' :change-selected-product='selectProduct'/>
      </template>
    </div>
    <div class='block md:hidden flex justify-around flex-wrap pb-8'>
      <v-select v-model='selectedSearchProduct' class='w-full' :components='{OpenIndicator}'
                :options="['All Products', 'Canada', 'United States']"></v-select>
    </div>
    <SearchBar v-model='searchText' :max-width="'42.5rem'" :selected-products='[selectedSearchProduct]'></SearchBar>
  </div>
</template>
<script>
import SearchBar from '~/components/SearchBar/SearchBar'
import SearchBannerFilterChoice from '~/components/Banner/SearchBannerFilterChoice'

export default {
  name: 'SearchBanner',
  components: { SearchBannerFilterChoice, SearchBar },
  props: {
    manuals: {
      type: Array,
      required: false,
    }
  },
  data() {
    return {
      OpenIndicator: {
        render: createElement => createElement('i', {class: {'yi-chevron-down': true}}),
      },
      selectedSearchProduct: 'All Products',
      searchText: ''
    }
  },
  methods: {
    selectProduct(product) {
      this.selectedSearchProduct = product
    }
  }
}
</script>
<style scoped>
#search-banner {
  background-color: #F8F7F5;
}

#search-banner {
  background-color: #F8F7F5;
}

.search-bar {
  background-color: #E7E7E7;
  border: 1px solid transparent;
  max-width: 54.5rem;
  margin: auto;
}

>>> .yi-search {
  font-size: 2.5rem;
}

>>> .search-bar input::placeholder {
  text-align: center;
}
</style>
