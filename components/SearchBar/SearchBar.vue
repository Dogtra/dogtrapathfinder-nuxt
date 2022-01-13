<template>
  <div class="text-black flex search-bar rounded-btn h-14" :style="searchBarStyle">
    <input type="text" :placeholder="placeholder" class='bg-transparent flex-grow placeholder-black'>
    <span class="mdi mdi-magnify text-22"></span>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
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
    }
  },
  computed: {
    searchBarStyle() {
      return {
        maxWidth: this.maxWidth,
        backgroundColor: this.backgroundColor
      }
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
