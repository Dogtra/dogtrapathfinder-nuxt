<template>
  <div>
    <div> {{ manual.title }} </div>
    <div>Download as PDF</div>
    <template v-for='chapter in manual.chapters'>
      <div :key='chapter.id'>

        <div> {{chapter.title }} </div>
        <template v-for='article in chapter.articles'>
          <ManualMenuArticleItem :key='article.id' :article='article' :manual='manual'/>
        </template>
      </div>
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
