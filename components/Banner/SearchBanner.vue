<template>
  <div id='search-banner' class='banner pt-8 md:pt-16 pb-16 md:pb-24 px-12'>
    <h1 class='text-center mb-8'>Filter search by Product</h1>
    <div class="search-banner-product-filter justify-center pb-8 hidden md:flex">
      <div class="product-filter-choice product-filter-choice-active uppercase text-center cursor-pointer">Pathfinder2 Mini TRX</div>
      <div class="product-filter-choice uppercase text-center cursor-pointer">Pathfinder2</div>
      <div class="product-filter-choice uppercase text-center cursor-pointer">Pathfidner2 TRX</div>
      <div class="product-filter-choice uppercase text-center cursor-pointer">Pathfinder</div>
    </div>
    <div class='block md:hidden flex justify-around flex-wrap pb-8'>
      <v-select class='w-full' v-model='selectedSearchProduct' :components='{OpenIndicator}'
                :options="['All Products', 'Canada', 'United States']"></v-select>
    </div>
    <SearchBar :max-width="'42.5rem'"></SearchBar>
  </div>
</template>
<script>
import SearchBar from '~/components/SearchBar/SearchBar'
export default {
  name: 'SearchBanner',
  components: { SearchBar },
  data() {
    return {
      OpenIndicator: {
        render: createElement => createElement('i', {class: {'yi-chevron-down': true}}),
      },
      selectedSearchProduct: 'All Products'
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

.product-filter-choice {
  width: 26.8rem;
  font-size: 2rem;
  color: #7C7C7C;
  border-bottom: 3px solid #7C7C7C;
}

.product-filter-choice.product-filter-choice-active {
  border-bottom: 3px solid #FFDD00;
  color: #121212;
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
