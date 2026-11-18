<template>
  <li class="rounded-btn px-6 py-3 cursor-pointer" :class="{ 'bg-gray-100': selectedCategory === title }" @click="selectCategory(title)">
    {{ title }}
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  selectedCategory: string
  selectCategory: (title: string) => void
}>()
</script>
