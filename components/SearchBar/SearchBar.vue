<template>
  <div class="text-black flex search-bar rounded-btn h-16">
    <input type="text" placeholder="Look for assistance" class='bg-transparent flex-grow placeholder-black'>
    <i class='yi-search' />
  </div>
</template>
<script>
export default {
  name: 'SearchBar'
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
