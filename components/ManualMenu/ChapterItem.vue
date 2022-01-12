<template>
  <div @click="isCollapsed = !isCollapsed">
    <div class='uppercase border-b-2 border-yellow-300 pl-4'>
      <span>{{chapter.title }}</span>
      <span v-show="isCollapsed" class='material-icons float-right cursor-pointer'>expand_more</span>
      <span v-show="!isCollapsed" class='material-icons float-right cursor-pointer'>expand_less</span>
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
