<template>
  <div @click="isCollapsed = !isCollapsed">
    <div class='uppercase border-b-1 border-yellow pl-4 h-20 flex items-center justify-between'>
      <span class="font-bold">{{chapter.title }}</span>
      <span v-show="isCollapsed" class="mdi-expand-more"></span>
      <span v-show="!isCollapsed" class="mdi-expand-less"></span>
    </div>
    <ul v-if="!isCollapsed" class='p-4'>
      <ManualMenuArticleItem v-for='article in chapter.articles' :key='article.id' :article='article' :manual='manual'/>
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
    return {
      isCollapsed: true
    }
  },
  mounted() {
    if (this.chapter.articles.some(article => {
      return article.uuid === this.$route.params.article_uuid
    })) {
      this.isCollapsed = false
    }
  }
}
</script>
