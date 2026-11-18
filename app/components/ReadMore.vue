<!-- Port of vue-read-more: truncates (sanitized) HTML to `maxChars` with a toggle. -->
<template>
  <div>
    <!-- div, not p: the text itself contains <p> elements. -->
    <div v-html="formatted" />
    <span v-show="text.length > maxChars">
      <a v-show="!expanded" id="readmore" href="#" @click.prevent="expanded = true">{{ moreStr }}</a>
      <a v-show="expanded" id="readmore" href="#" @click.prevent="expanded = false">{{ lessStr }}</a>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ text: string, maxChars?: number, moreStr?: string, lessStr?: string }>(), {
  maxChars: 100,
  moreStr: 'read more',
  lessStr: '',
})

const expanded = ref(false)
const formatted = computed(() => sanitizeHtml(
  !expanded.value && props.text.length > props.maxChars
    ? `${props.text.substring(0, props.maxChars)}...`
    : props.text,
))
</script>
