<template>
  <div class="border-1 border-gray-200 border-solid border-b-0 last:border-b-1">
    <div class="p-8 cursor-pointer flex justify-between" @click="isExpanded = !isExpanded">
      <p class="font-semibold">
        {{ faq.title }}
      </p>
      <p>
        <span v-show="!isExpanded" class="mdi mdi-chevron-down" />
        <span v-show="isExpanded" class="mdi mdi-chevron-up" />
      </p>
    </div>
    <div v-show="isExpanded" class="prose text-14 border-t-1 p-8" v-html="markedContent" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ faq: { title: string, description?: string | null } }>()
const isExpanded = ref(false)
const markedContent = computed(() => renderMarkdown(props.faq.description))
</script>
