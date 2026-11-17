<template>
  <div class="text-black flex search-bar rounded-btn h-14" :style="{ maxWidth, backgroundColor }">
    <form class="w-full flex" method="post" @submit.prevent="searchForm">
      <input
        v-model="searchText"
        type="text"
        name="search-text"
        :placeholder="placeholder"
        class="bg-transparent flex-grow placeholder-black"
      >
      <span class="mdi mdi-magnify text-22 cursor-pointer" @click="searchForm" />
    </form>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string
  maxWidth?: string
  backgroundColor?: string
  selectedProducts?: string[]
}>(), {
  placeholder: '',
  maxWidth: 'none',
  backgroundColor: '#E7E7E7',
  selectedProducts: () => [],
})

const searchText = defineModel<string>({ default: '' })
const localePath = useLocalePath()

function searchForm() {
  const query: Record<string, string | string[]> = { searchText: searchText.value }
  const products = props.selectedProducts.filter(product => product && product !== 'All Products')
  if (products.length > 0) {
    query['products[]'] = products
  }
  navigateTo({ path: localePath('/search'), query })
}
</script>

<style scoped>
.search-bar {
  border: 1px solid transparent;
}
</style>
