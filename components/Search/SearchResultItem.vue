<template>
  <div :key="item.id">
    <p class="text-18 font-bold" v-dompurify-html="item._formatted.title"></p>
    <p class="text-14 font-normal">{{ manual.title }} / {{ item.chapter.title }}</p>
    <p class="line-clamp-4" v-dompurify-html="item._formatted.content_plain_text"></p>
  </div>
</template>
<script>
export default {
  name: 'search-result-item',
  props: {
    item: {
      type: Object,
      required: true
    },
    manuals: {
      type: Array,
      required: true
    }
  },
  computed: {
    manual() {
      return this.manuals.find(manual => parseInt(manual.id) === this.item.chapter.manual)
    }
  }
}
</script>
