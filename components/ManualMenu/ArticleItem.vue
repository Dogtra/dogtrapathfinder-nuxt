<template>
  <li class='list-disc list-inside px-4 text-16'>
    <NuxtLink :to='articleHref' class='capitalize' :class="articleItemClass">{{ article.title }}</NuxtLink>
  </li>
</template>
<script>
export default {
  name: 'ManualMenuArticle',
  props: {
    article: {
      type: Object,
      required: true
    },
    manual: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleHref() {
      return '/manuals/' + this.manual.slug + '/' + this.article.uuid
    },
    articleItemClass() {
      return {
        'underline': this.$route.params.article_uuid === this.article.uuid
      }
    }
  },
}
</script>
