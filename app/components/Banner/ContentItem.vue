<template>
  <div class="max-w-[34rem] text-left">
    <NuxtLink :to="localePath('/articles/' + article.uuid)">
      <div class="w-full bg-white rounded-btn overflow-hidden">
        <img class="w-full" :src="`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`" :alt="article.title">
      </div>
      <p class="font-bold text-20 pt-6 pb-4">
        {{ article.title }}
      </p>
      <p class="font-medium text-14 text-[#808080] line-clamp-3">
        {{ article.content }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ article: { uuid: string, title: string, content?: string, youtube_url?: string } }>()
const localePath = useLocalePath()
const youtubeId = computed(() => getYoutubeId(props.article.youtube_url))
</script>
