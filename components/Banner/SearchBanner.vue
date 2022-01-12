<template>
  <div id='search-banner' class='banner pt-16 pb-20'>
    <h1 class='text-center mb-8'>Filter search by Product</h1>
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
