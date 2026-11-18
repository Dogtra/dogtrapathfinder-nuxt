<template>
  <NuxtLink :to="localePath(`/manuals/${manual.slug}/videos/${article.uuid}`)" class="capitalize" @click="manualStore.closeAllMenu()">
    <li class="list-disc list-inside px-4 text-16 list-outside ml-8">
      <span :class="{ underline: route.params.article_uuid === article.uuid }">{{ article.title }}</span>
    </li>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ article: { uuid: string, title: string }, manual: { slug: string } }>()
const route = useRoute()
const localePath = useLocalePath()
const manualStore = useManualStore()
</script>
