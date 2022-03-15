<template>
  <li>
    <NuxtLink class='text-22' :to='localePath(articleUrl)'>
      <span class='mdi mdi-chevron-right text-yellow text-24'></span>
      <span class='font-medium'>{{ article.title }}</span>
    </NuxtLink>
  </li>
</template>
<script>
export default {
  name: 'ChapterPageArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleUrl() {
      return '/manuals/' + this.$route.params.slug + '/' + this.article.uuid
    }
  }
}
</script>
