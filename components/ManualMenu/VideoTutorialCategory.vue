<template>
  <div>
    <div class='uppercase border-b-1 border-yellow pl-4 flex items-center justify-between'
         @click='isCollapsed = !isCollapsed'>
      <span class='font-bold'>Video Tutorial</span>
      <span v-show='isCollapsed' class='mdi mdi-chevron-down text-[2.8rem]'></span>
      <span v-show='!isCollapsed' class='mdi mdi-chevron-up text-[2.8rem]'></span>
    </div>
    <ul v-if='!isCollapsed' class='p-4 leading-[3.2rem]'>
      <ManualMenuVideoTutorialArticle v-for='article in manual.video_tutorial_category.articles' :key='article.id' :article='article' :manual='manual'/>
<!--      <ManualMenuArticleItem v-for='article in chapter.articles' :key='article.id' :article='article'-->
<!--                             :manual='manual' />-->
    </ul>
  </div>
</template>
<script>
import ManualMenuVideoTutorialArticle from '~/components/ManualMenu/VideoTutorialArticle'

export default {
  name: 'ManualMenuVideoTutorial',
  components: { ManualMenuVideoTutorialArticle },
  props: {
    manual: {
      type: Object,
      required:true,
    }
  },
  data() {
    return {
      isCollapsed: false
    }
  }
}
</script>
