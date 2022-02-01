<template>
  <div class="text-black flex search-bar rounded-btn h-14" :style="searchBarStyle">
    <form ref='search-form'
          class='w-full flex'
          method="post"
          @submit="searchForm">
      <input :value='searchText'
             type="text"
             name="search-text" :placeholder="placeholder"
             class='bg-transparent flex-grow placeholder-black'
             @input="$emit('change', $event.target.value)"
      >
    <span class="mdi mdi-magnify text-22" @click='searchForm'></span>
    </form>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  model: {
    prop: 'searchText',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    maxWidth: {
      type: String,
      required: false,
      default: 'none'
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#E7E7E7',
    },
    searchText: String,
    selectedProducts: {
      type: Array,
      required: false
    }
  },
  computed: {
    searchBarStyle() {
      return {
        maxWidth: this.maxWidth,
        backgroundColor: this.backgroundColor
      }
    }
  },
  methods: {
    searchForm(e) {
      e.preventDefault()

      const query = {
        searchText: this.searchText
      }

      if (this.selectedProducts) {
        query['products[]'] = this.selectedProducts
      }

      this.$nuxt.$options.router.push({
        path: this.localePath('search'),
        query
      })
    }
  }
}
</script>
<style scoped>
.search-bar {
  border: 1px solid transparent;
}

.yi-search::before {
  vertical-align: middle;
}
</style>
