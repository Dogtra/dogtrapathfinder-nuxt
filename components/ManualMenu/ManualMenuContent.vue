<template>
  <div class='manual-menu-container h-full'>
    <div class='bg-yellow-300 text-black cursor-pointer' @click="toggleManualProductMenu"><span class="material-icons">unfold_more</span>{{ manual.title }}</div>

    <div v-show="manualMenuProductMenuOpen" class="manual-menu-product-list absolute bg-yellow-300 text-black inset-0 mt-12">
      <ul>
        <ManualMenuProductItem v-for="otherManual in manuals" :manual="otherManual" :key="otherManual.id"/>
      </ul>
    </div>

    <div class="manual-menu-chapter-list bg-black text-white h-full p-8">
      <div class='bg-yellow-300 text-black inline-block rounded-full px-4 py-2'>
        <span class="material-icons align-bottom">picture_as_pdf</span><span>Download as PDF</span>
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
import ManualMenuProductItem from "~/components/ManualMenu/ManualMenuProductItem";

export default {
  name: 'ManualMenuContent',
  components: {ManualMenuProductItem, ManualMenuChapterItem},
  computed: {
    ...mapState('manual', [
      'manualMenuOpen',
      'manual',
      'manuals',
      'manualMenuProductMenuOpen',
    ]),
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
