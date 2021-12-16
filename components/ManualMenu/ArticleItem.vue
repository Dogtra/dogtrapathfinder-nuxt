<template>
  <div >
    <NuxtLink :to='articleHref'>Click here</NuxtLink>
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
