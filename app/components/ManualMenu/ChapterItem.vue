<template>
  <div>
    <!-- A real button: reachable with Tab, toggles with Enter/Space, and announces its state. -->
    <button
      type="button"
      class="chapter-toggle w-full text-left uppercase border-b-1 border-yellow pl-4 flex items-center justify-between cursor-pointer"
      :aria-expanded="!isCollapsed"
      :aria-controls="listId"
      @click="isCollapsed = !isCollapsed"
    >
      <span class="font-bold">{{ chapter.title }}</span>
      <span v-show="isCollapsed" class="mdi mdi-chevron-down text-[2.8rem]" aria-hidden="true" />
      <span v-show="!isCollapsed" class="mdi mdi-chevron-up text-[2.8rem]" aria-hidden="true" />
    </button>
    <ul v-if="!isCollapsed" :id="listId" class="p-4 leading-[3.2rem]">
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
const listId = useId()
const isCollapsed = ref(!props.chapter.articles.some(article => article.uuid === route.params.article_uuid))
</script>

<style scoped>
.chapter-toggle:focus-visible {
  outline: 2px solid #FFDD00;
  outline-offset: 2px;
}
</style>
