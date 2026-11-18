<template>
  <li v-show="!manual.hidden" class="flex items-center uppercase h-20 pl-20" :class="{ 'bg-yellow-focus': active, 'font-extrabold': active }">
    <NuxtLink :to="localePath(`/manuals/${manual.slug}`)" @click="manualStore.closeAllMenu()">
      {{ manual.title }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{ manual: { slug: string, title: string, hidden?: boolean | null } }>()
const localePath = useLocalePath()
const manualStore = useManualStore()
const active = computed(() => manualStore.manual?.slug === props.manual.slug)
</script>
