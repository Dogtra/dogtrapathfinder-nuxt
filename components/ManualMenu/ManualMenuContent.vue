<template>
  <div class='manual-menu-container h-full'>
    <div class='bg-yellow-300 text-black'><span class="material-icons">unfold_more</span>{{ manual.title }}</div>
    <div class="manual-menu-list bg-black text-white h-full p-8">
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
import {mapState} from "vuex";
import ManualMenuChapterItem from '~/components/ManualMenu/ChapterItem'

export default {
  name: 'ManualMenuContent',
  components: {ManualMenuChapterItem},
  computed: {
    ...mapState('manual', ['manualMenuOpen', 'manual'])
  },
}
</script>
