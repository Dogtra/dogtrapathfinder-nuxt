<template>
  <div>
    <template v-for='chapter in manual.chapters'>
      <template v-for='article in chapter.articles'>
        <ManualMenuArticleItem :key='article.id' :article='article' :manual='manual'/>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ManualMenu',
  props: {
    manual: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
