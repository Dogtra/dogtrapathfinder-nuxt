<template>
  <li class='list-square'>
    <NuxtLink :to='articleHref' class='capitalize block'>{{ article.title }}</NuxtLink>
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
    }
  }
}
</script>
