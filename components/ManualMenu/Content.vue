<template>
  <div class='manual-menu-container h-full text-18 flex flex-col'>
    <div class="hidden bg-yellow md:block py-6 px-10 border-b-1 border-black">
      <SearchBar v-model='searchText' :background-color="'#FFFFFF'" :selected-products='[manual.title]'></SearchBar>
    </div>
    <div class='bg-yellow text-black min-h-[5rem] flex'>
      <div class='flex items-center pl-8 cursor-pointer flex-1' @click="toggleManualProductMenu">
        <span v-show="!manualMenuProductMenuOpen" class="mdi mdi-unfold-more-horizontal text-[2.6rem]"></span>
        <span v-show="manualMenuProductMenuOpen" class="mdi mdi-unfold-less-horizontal text-[2.6rem]"></span>
        <strong class="uppercase flex-grow">{{ manual.title }}</strong>
      </div>
      <div class='cursor-pointer pr-8 flex items-center' @click='closeAllMenu'>
        <span class="mdi mdi-close text-[2.6rem]"></span>
      </div>
    </div>

    <div v-if="manualMenuProductMenuOpen" class="manual-menu-product-list min-h-full bg-yellow text-black inset-0">
      <ul>
        <ManualMenuProductItem v-for="otherManual in manuals" :key="otherManual.id" :manual="otherManual"/>
      </ul>
    </div>
    <div v-else class='overflow-y-auto'>
      <div class="manual-menu-chapter-list bg-black text-white h-fit px-12 md:px-16 py-8 md:py-10">
        <DownloadPDF v-if='manual.products.some(product => product.pdf)' :manual='manual' />
        <NuxtLink :to='localePath(manualIndexUrl)' class='bg-yellow mt-4 text-black inline-block rounded-full px-4 md:px-6 py-1 md:py-3 flex items-center w-fit' @click.native="closeAllMenu">
          <span class="text-12 uppercase font-extrabold">Home</span>
        </NuxtLink>
        <template v-for='chapter in manual.chapters'>
          <ManualMenuChapterItem :key='chapter.id' :chapter='chapter' :manual='manual'/>
        </template>
        <ManualMenuVideoTutorial v-if='manual.video_tutorial_category' :manual='manual' />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import ManualMenuChapterItem from '~/components/ManualMenu/ChapterItem'
import ManualMenuProductItem from '~/components/ManualMenu/ProductItem'
import SearchBar from '~/components/SearchBar/SearchBar'
import DownloadPDF from '~/components/ManualMenu/DownloadPDF'
import ManualMenuVideoTutorial from '~/components/ManualMenu/VideoTutorialCategory'

export default {
  name: 'ManualMenuContent',
  components: { ManualMenuVideoTutorial, DownloadPDF, SearchBar, ManualMenuProductItem, ManualMenuChapterItem},
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapState('manual', [
      'manualMenuOpen',
      'manual',
      'manuals',
      'manualMenuProductMenuOpen',
    ]),
    manualIndexUrl() {
      return '/manuals/' + this.manual.slug
    }
  },
  methods: {
    ...mapMutations('manual', [
      'toggleManualProductMenu',
      'closeAllMenu'
    ])
  }
}
</script>
