<template>
  <div id='search-banner' class='banner'>
    <h1 class='text-center mt-16 mb-8'>Filter search by Product</h1>
    <div class='block md:hidden flex justify-around flex-wrap'>
      <v-select class='w-full' v-model='selectedSearchProduct' :components='{OpenIndicator}'
                :options="['All Products', 'Canada', 'United States']"></v-select>
    </div>
    <SearchBar></SearchBar>
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
.search-bar {
  background-color: #E7E7E7;
  border: 1px solid transparent;
  max-width: 54.5rem;
}

input.search-bar:focus-visible {
  border: 1px solid black;
  border-right-color: transparent;
  outline: none;
}

input.search-bar:focus-visible + .search-bar {
  border: 1px solid black;
  border-left-color: transparent;
}
</style>
