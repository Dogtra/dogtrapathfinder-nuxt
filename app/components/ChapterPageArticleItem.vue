<template>
  <li>
    <NuxtLink class="text-22" :to="localePath(`/manuals/${route.params.slug}/${article.uuid}`)">
      <span class="mdi mdi-chevron-right text-yellow text-24" />
      <span class="font-medium">{{ article.title }}</span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
defineProps<{ article: { uuid: string, title: string } }>()
const route = useRoute()
const localePath = useLocalePath()
</script>
