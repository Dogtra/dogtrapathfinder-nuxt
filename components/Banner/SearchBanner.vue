<template>
  <div id='search-banner' class='banner bg-[#F8F7F5] pt-8 md:pt-16 pb-16 md:pb-24 px-12'>
    <h1 class='text-center mb-8 font-medium'>Filter search by Product</h1>
    <div class="search-banner-product-filter justify-center pb-8 md:pb-20 hidden md:flex w-fit mx-auto">
      <template v-for='manual in filteredManuals'>
        <SearchBannerFilterChoice :key='manual.id' :manual='manual' :selected-product='selectedSearchProduct' :change-selected-product='selectProduct'/>
      </template>
    </div>
    <div class='block md:hidden flex justify-around flex-wrap pb-8 max-w-[42.5rem] mx-auto'>
      <v-select v-model='selectedSearchProduct' class='w-full' :components='{OpenIndicator}'
                :options="options"></v-select>
    </div>
    <SearchBar v-model='searchText' :max-width="'42.5rem'" class='mx-auto' :selected-products='[selectedSearchProduct]'></SearchBar>
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
        render: createElement => createElement('span', {class: {'mdi mdi-chevron-down text-20': true}}),
      },
      selectedSearchProduct: 'All Products',
      searchText: ''
    }
  },
  computed: {
    filteredManuals() {
      return this.manuals.filter(manual => !manual.hidden)
    },
    options() {
      return [...this.filteredManuals.map(manual => manual.title), 'All Products']
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
>>> .search-bar input::placeholder {
  text-align: center;
}
</style>
