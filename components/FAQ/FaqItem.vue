<template>
  <div class='border-1 border-gray-200 border-solid border-b-0 last:border-b-1'>
    <div class='p-8 cursor-pointer flex justify-between' @click='isExpanded = !isExpanded'>
      <p class='font-semibold'>
        {{ faq.title }}
      </p>
      <p>
        <span v-show='!isExpanded' class='mdi mdi-chevron-down'></span>
        <span v-show='isExpanded' class='mdi mdi-chevron-up'></span>
      </p>
    </div>
    <div v-show='isExpanded' v-dompurify-html='markedContent' class='prose text-14 border-t-1 p-8'>
    </div>
  </div>
</template>
<script>
import { marked } from 'marked'

export default {
  name: 'FaqItem',
  props: {
    faq: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    markedContent() {
      return marked(this.faq.description);
    },
  }
}
</script>
