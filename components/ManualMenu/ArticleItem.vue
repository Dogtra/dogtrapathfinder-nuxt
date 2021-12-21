<template>
  <div >
    <NuxtLink :to='articleHref'>{{ article.title }}</NuxtLink>
  </div>
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
