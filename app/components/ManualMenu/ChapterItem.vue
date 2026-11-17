<template>
  <div>
    <div class="uppercase border-b-1 border-yellow pl-4 flex items-center justify-between cursor-pointer" @click="isCollapsed = !isCollapsed">
      <span class="font-bold">{{ chapter.title }}</span>
      <span v-show="isCollapsed" class="mdi mdi-chevron-down text-[2.8rem]" />
      <span v-show="!isCollapsed" class="mdi mdi-chevron-up text-[2.8rem]" />
    </div>
    <ul v-if="!isCollapsed" class="p-4 leading-[3.2rem]">
      <ManualMenuArticleItem v-for="article in chapter.articles" :key="article.documentId" :article="article" :manual="manual" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ManualMenuArticleItem from '~/components/ManualMenu/ArticleItem.vue'

const props = defineProps<{
  chapter: { title: string, articles: { documentId: string, uuid: string, title: string }[] }
  manual: { slug: string }
}>()

const route = useRoute()
const isCollapsed = ref(!props.chapter.articles.some(article => article.uuid === route.params.article_uuid))
</script>
