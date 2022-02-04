<template>
  <div class='text-white' :style='{backgroundColor: category.color}'>
    <div class='mx-auto px-12 py-16 w-fit'>
      <h1 class='text-30 md:text-35 font-bold text-white'>{{ category.title }}</h1>
      <div class='flex gap-[2.7rem] flex-col md:flex-row pt-12 overflow-x-auto'>
        <template v-for='article in articles'>
          <ContentItem :key='article.id' :article='article' />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { orderBy } from 'lodash'
import ContentItem from '~/components/Banner/ContentItem'

export default {
  name: 'ContentBanner',
  components: { ContentItem },
  props: {
    category: {
      type: Object,
      required: true
    },
  },
  computed: {
    articles() {
      return orderBy(this.category.articles, 'order')
    }
  }
}
</script>
