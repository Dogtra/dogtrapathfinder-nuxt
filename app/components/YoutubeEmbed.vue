<template>
  <div class="youtube-container my-8 pt-[56.25%] w-full overflow-hidden relative">
    <iframe
      v-if="videoId"
      :src="`https://www.youtube.com/embed/${videoId}?controls=0`"
      :title="title"
      class="absolute inset-0 w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ videoId: string, title?: string }>()
</script>
