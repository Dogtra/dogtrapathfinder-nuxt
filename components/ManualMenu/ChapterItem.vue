<template>
  <div>
    <div class='uppercase border-b-2 border-yellow-300'>
      {{chapter.title }}
      <i class='yi-chevron-down'></i>
      <i class='yi-chevron-up'></i>
    </div>
    <ul class='p-4'>
      <ManualMenuArticleItem v-for='article in chapter.articles' :key='article.id' :article='article' :manual='manual'/>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ManualMenuChapterItem',
  props: {
    chapter: {},
    manual: {}
  }
}
</script>
