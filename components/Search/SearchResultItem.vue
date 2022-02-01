<template>
  <div :key="item.id" class='pb-12'>
    <NuxtLink class="text-18 font-bold" v-dompurify-html="item._highlightResult.title.value" :to='articleUrl'></NuxtLink>
    <p class="text-14 font-normal text-[#B4B4B4] pt-4 pb-2"><NuxtLink :to='manualUrl'>{{ manual.title }}</NuxtLink> > <span v-dompurify-html='chapter.title'></span></p>
    <p class="line-clamp-6 md:line-clamp-4 font-normal" v-dompurify-html="item._highlightResult.content.value"></p>
    <span class="mt-6 article-slide-tag rounded-full bg-black text-yellow flex justify-center items-center h-10 w-fit px-4 text-14 uppercase"><strong>{{ manual.tag }}</strong></span>
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
    manualUrl() {
      return '/manuals/' + this.manual.slug
    },
    articleUrl() {
      return this.manualUrl + '/' + this.item.uuid
    },
    manual() {
      return this.manuals.find(manual =>
        parseInt(manual.id) === this.item.chapter.manual
      )
    },
    chapter() {
      return JSON.parse(this.item._highlightResult.chapter.value.replaceAll('&quot;', '"'))
    }
  }
}
</script>
