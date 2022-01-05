<template>
  <div>
    <div class='hidden md:block'>
      <div> {{ manual.title }} </div>
      <div>Download as PDF</div>
      <template v-for='chapter in manual.chapters'>
        <ManualMenuChapterItem :key='chapter.id' :chapter='chapter' :manual='manual' />
      </template>
    </div>
    <div class='block md:hidden w-full bg-black text-white'>
      <div class='manual-menu-mobile-container'>
        <div class='bg-yellow-300 text-black'> {{ manual.title }} </div>
        <div class='bg-yellow-300 text-black inline-block rounded-btn'>
          Download as PDF
        </div>
        <template v-for='chapter in manual.chapters'>
          <ManualMenuChapterItem :key='chapter.id' :chapter='chapter' :manual='manual' />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ManualMenuChapterItem from '~/components/ManualMenu/ChapterItem'

export default {
  name: 'ManualMenu',
  components: { ManualMenuChapterItem },
  props: {
    manual: {
      type: Object,
      required: true
    }
  }
}
</script>

