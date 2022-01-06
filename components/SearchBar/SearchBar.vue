<template>
  <div class="text-black flex mt-4 search-bar rounded-btn p-1">
    <input type="text" placeholder="Look for assistance" class='flex-grow placeholder-black'>
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
  border: 1px solid black;
}
.yi-search::before {
  vertical-align: middle;
}
</style>
