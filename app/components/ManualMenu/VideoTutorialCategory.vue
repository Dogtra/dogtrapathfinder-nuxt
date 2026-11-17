<template>
  <div>
    <div class="uppercase border-b-1 border-yellow pl-4 flex items-center justify-between cursor-pointer" @click="isCollapsed = !isCollapsed">
      <span class="font-bold">Video Tutorial</span>
      <span v-show="isCollapsed" class="mdi mdi-chevron-down text-[2.8rem]" />
      <span v-show="!isCollapsed" class="mdi mdi-chevron-up text-[2.8rem]" />
    </div>
    <ul v-if="!isCollapsed" class="p-4 leading-[3.2rem]">
      <ManualMenuVideoTutorialArticle
        v-for="article in manual.video_tutorial_category.articles"
        :key="article.documentId"
        :article="article"
        :manual="manual"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ManualMenuVideoTutorialArticle from '~/components/ManualMenu/VideoTutorialArticle.vue'

defineProps<{ manual: { slug: string, video_tutorial_category: { articles: { documentId: string, uuid: string, title: string }[] } } }>()
const isCollapsed = ref(true)
</script>
