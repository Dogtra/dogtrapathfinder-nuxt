<template>
  <NuxtLink :to='localePath(articleUrl)' class='capitalize' @click.native="closeAllMenu">
    <li class='list-disc list-inside px-4 text-16 list-outside ml-8'>
      <span :class="articleItemClass">{{ article.title }}</span>
    </li>
  </NuxtLink></template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ManualMenuVideoTutorialArticle',
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
    articleUrl() {
      return '/manuals/' + this.manual.slug + '/videos/' + this.article.uuid
    },
    articleItemClass() {
      return {
        'underline': this.$route.params.article_uuid === this.article.uuid
      }
    }
  },
  methods: {
    ...mapMutations('manual', ['closeAllMenu'])
  }
}
</script>
