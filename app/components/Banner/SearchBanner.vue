<template>
  <div id="search-banner" class="banner bg-[#F8F7F5] pt-8 md:pt-16 pb-16 md:pb-24 px-12">
    <h1 class="text-center mb-8 font-medium">
      Filter search by Product
    </h1>
    <div class="search-banner-product-filter justify-center pb-8 md:pb-20 hidden md:flex w-fit mx-auto">
      <SearchBannerFilterChoice
        v-for="manual in filteredManuals"
        :key="manual.documentId"
        :manual="manual"
        :selected-product="selectedSearchProduct"
        :change-selected-product="selectProduct"
      />
    </div>
    <div class="md:hidden flex justify-around flex-wrap pb-8 max-w-[42.5rem] mx-auto">
      <ClientOnly>
        <VSelect v-model="selectedSearchProduct" class="w-full" :components="{ OpenIndicator }" :options="options" />
      </ClientOnly>
    </div>
    <SearchBar v-model="searchText" max-width="42.5rem" class="mx-auto" :selected-products="[selectedSearchProduct]" />
  </div>
</template>

<script setup lang="ts">
import SearchBar from '~/components/SearchBar/SearchBar.vue'
import SearchBannerFilterChoice from '~/components/Banner/SearchBannerFilterChoice.vue'
import OpenIndicator from '~/components/SelectOpenIndicator.vue'

const props = withDefaults(defineProps<{ manuals?: { documentId: string, title: string, hidden?: boolean | null }[] }>(), {
  manuals: () => [],
})

const selectedSearchProduct = ref('All Products')
const searchText = ref('')

const filteredManuals = computed(() => props.manuals.filter(manual => !manual.hidden))
const options = computed(() => [...filteredManuals.value.map(manual => manual.title), 'All Products'])

function selectProduct(product: string) {
  selectedSearchProduct.value = product
}
</script>

<style scoped>
:deep(.search-bar input::placeholder) {
  text-align: center;
}
</style>
