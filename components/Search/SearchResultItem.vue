<template>
  <div v-show='checkedProductsFilter.length < 1 || (manual && !manual.hidden && checkedProductsFilter.includes(manual.title))'>
    <div v-if='manual' :key="item.id" class='pb-12'>
      <NuxtLink v-dompurify-html="item._highlightResult.title.value" class="text-18 font-bold" :to='localePath(articleUrl)'></NuxtLink>
      <p class="text-14 font-normal text-[#B4B4B4] pt-4 pb-2"><NuxtLink v-if="manual" :to='localePath(manualUrl)'>{{ manual.title }}</NuxtLink> > <span v-dompurify-html='chapter.title'></span></p>
      <NuxtLink :to='localePath(articleUrl)'>
        <p v-dompurify-html="item._highlightResult.content_plain_text.value" class="line-clamp-6 md:line-clamp-4 font-normal"></p>
      </NuxtLink>
        <span class="mt-6 article-slide-tag rounded-full bg-black text-yellow flex justify-center items-center h-10 w-fit px-4 text-14 uppercase"><strong v-if="manual">{{ manual.tag }}</strong></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchResultItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    manuals: {
      type: Array,
      required: true
    },
    checkedProductsFilter: {
      type: Array,
      required: true
    }
  },
  computed: {
    manualUrl() {
      return this.manual ? '/manuals/' + this.manual.slug : ''
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
