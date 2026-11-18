<template>
  <div class="rounded-full p-1 px-4 font-semibold cursor-pointer" :class="searchFilterChipClass" @click="toggle(manual.title)">
    {{ manual.title }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  manual: { title: string }
  checkedProductsFilter: string[]
  toggle: (title: string) => void
}>()

const searchFilterChipClass = computed(() => {
  const active = props.checkedProductsFilter.includes(props.manual.title)
  return { 'bg-yellow': active, 'bg-gray-400': !active, 'block': active, 'md:hidden': !active }
})
</script>

<style>
em {
  background-color: yellow;
}
</style>
