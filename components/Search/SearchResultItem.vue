<template>
  <div :key="item.id">
    <p class="text-18 font-bold" v-dompurify-html="item._formatted.title"></p>
    <p class="text-14 font-normal text-[#B4B4B4] pt-4 pb-2">{{ manual.title }} > {{ item.chapter.title }}</p>
    <p class="line-clamp-4 font-normal mb-12" v-dompurify-html="item._formatted.content"></p>
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
