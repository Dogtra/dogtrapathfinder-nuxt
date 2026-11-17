<template>
  <div v-if="manual" class="manual-menu-container h-full text-18 flex flex-col">
    <div class="hidden bg-yellow md:block py-6 px-10 border-b-1 border-black">
      <SearchBar v-model="searchText" background-color="#FFFFFF" :selected-products="[manual.title]" />
    </div>
    <div class="bg-yellow text-black min-h-[5rem] flex">
      <div class="flex items-center pl-8 cursor-pointer flex-1" @click="manualStore.toggleManualProductMenu()">
        <span v-show="!manualStore.manualMenuProductMenuOpen" class="mdi mdi-unfold-more-horizontal text-[2.6rem]" />
        <span v-show="manualStore.manualMenuProductMenuOpen" class="mdi mdi-unfold-less-horizontal text-[2.6rem]" />
        <strong class="uppercase flex-grow">{{ manual.title }}</strong>
      </div>
      <div class="cursor-pointer pr-8 flex items-center" @click="manualStore.closeAllMenu()">
        <span class="mdi mdi-close text-[2.6rem]" />
      </div>
    </div>

    <div v-if="manualStore.manualMenuProductMenuOpen" class="manual-menu-product-list min-h-full bg-yellow text-black inset-0">
      <ul>
        <ManualMenuProductItem v-for="otherManual in manualStore.manuals" :key="otherManual.documentId" :manual="otherManual" />
      </ul>
    </div>
    <div v-else class="overflow-y-auto">
      <div class="manual-menu-chapter-list bg-black text-white h-fit px-12 md:px-16 py-8 md:py-10">
        <DownloadPDF v-if="manual.products?.some((product: any) => product.pdf)" :manual="manual" />
        <NuxtLink
          :to="localePath(`/manuals/${manual.slug}`)"
          class="bg-yellow mt-4 text-black rounded-full px-4 md:px-6 py-1 md:py-3 flex items-center w-fit"
          @click="manualStore.closeAllMenu()"
        >
          <span class="text-12 uppercase font-extrabold">Home</span>
        </NuxtLink>
        <ManualMenuChapterItem v-for="chapter in manual.chapters" :key="chapter.documentId" :chapter="chapter" :manual="manual" />
        <ManualMenuVideoTutorial v-if="manual.video_tutorial_category" :manual="manual" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ManualMenuChapterItem from '~/components/ManualMenu/ChapterItem.vue'
import ManualMenuProductItem from '~/components/ManualMenu/ProductItem.vue'
import SearchBar from '~/components/SearchBar/SearchBar.vue'
import DownloadPDF from '~/components/ManualMenu/DownloadPDF.vue'
import ManualMenuVideoTutorial from '~/components/ManualMenu/VideoTutorialCategory.vue'

const manualStore = useManualStore()
const localePath = useLocalePath()
const manual = computed(() => manualStore.manual as any)
const searchText = ref('')
</script>
