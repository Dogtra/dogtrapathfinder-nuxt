<template>
  <div class='manual-menu-container h-full text-18'>
    <div class="hidden bg-yellow md:block py-6 px-10 border-b-1 border-black">
      <SearchBar :background-color="'#FFFFFF'" v-model='searchText'></SearchBar>
    </div>
    <div class='bg-yellow text-black cursor-pointer h-20 flex items-center px-8' @click="toggleManualProductMenu">
      <span v-show="!manualMenuProductMenuOpen" class="mdi mdi-unfold-more-horizontal text-[2.6rem]"></span>
      <span v-show="manualMenuProductMenuOpen" class="mdi mdi-unfold-less-horizontal text-[2.6rem]"></span>
      <strong class="uppercase flex-grow">{{ manual.title }}</strong>
      <span class="mdi mdi-close text-[2.6rem]"></span>
    </div>

    <div v-show="manualMenuProductMenuOpen" class="manual-menu-product-list absolute bg-yellow text-black inset-0 mt-20">
      <ul>
        <ManualMenuProductItem v-for="otherManual in manuals" :manual="otherManual" :key="otherManual.id"/>
      </ul>
    </div>

    <div class="manual-menu-chapter-list bg-black text-white h-full px-12 md:px-16 py-8 md:py-10">
      <div class='bg-yellow text-black inline-block rounded-full px-4 md:px-6 py-1 md:py-3 flex items-center w-fit'>
        <span class="material-icons align-bottom" style="font-size: 1.8rem">picture_as_pdf</span><span class="text-12 uppercase font-extrabold">Download as PDF</span>
      </div>
      <template v-for='chapter in manual.chapters'>
        <ManualMenuChapterItem :key='chapter.id' :chapter='chapter' :manual='manual'/>
      </template>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapState} from "vuex";
import ManualMenuChapterItem from '~/components/ManualMenu/ChapterItem'
import manualsQuery from '~/apollo/queries/manual/manuals'
import ManualMenuProductItem from "~/components/ManualMenu/ProductItem";
import SearchBar from "~/components/SearchBar/SearchBar";

export default {
  name: 'ManualMenuContent',
  components: {SearchBar, ManualMenuProductItem, ManualMenuChapterItem},
  computed: {
    ...mapState('manual', [
      'manualMenuOpen',
      'manual',
      'manuals',
      'manualMenuProductMenuOpen',
    ]),
  },
  data() {
    return {
      searchText: ''
    }
  },
  async mounted() {
    const { data } = await this.$apollo.provider.defaultClient.query({
      query: manualsQuery
    })

    this.setManuals(data.manuals)
  },
  methods: {
    ...mapMutations('manual', ['setManuals', 'toggleManualProductMenu'])
  }
}
</script>
