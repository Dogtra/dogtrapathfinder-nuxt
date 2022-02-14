<template>
  <div>
    <div @click="isCollapsed = !isCollapsed" class='uppercase border-b-1 border-yellow pl-4 flex items-center justify-between'>
      <span class="font-bold">{{chapter.title }}</span>
      <span v-show="isCollapsed" class="mdi mdi-chevron-down text-[2.8rem]"></span>
      <span v-show="!isCollapsed" class="mdi mdi-chevron-up text-[2.8rem]"></span>
    </div>
    <ul v-if="!isCollapsed" class='p-4 leading-[3.2rem]'>
      <ManualMenuArticleItem v-for="article in chapter.articles" :key='article.id' :article='article' :manual='manual'/>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ManualMenuChapterItem',
  props: {
    chapter: {
      type: Object,
      required: true
    },
    manual: {
      type: Object,
      required: true
    }
  },
  data() {
    const uuid = this.$route.params.article_uuid;
    return {
      isCollapsed: !this.chapter.articles.some(article => {
        return article.uuid === uuid
      })
    }
  },
}
</script>
