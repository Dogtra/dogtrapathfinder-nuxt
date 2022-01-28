<template>
  <div class='shadow-xl rounded-lg py-8 md:py-10 mr-12 px-4 md:px-8 min-w-[20rem] md:min-w-[24.5rem] max-w-[20rem] md:max-w-[24.5rem] w-[20rem] md:w-[24.5rem]'>
    <span
        class="article-slide-tag rounded-full bg-black text-yellow flex justify-center items-center h-10 w-fit px-4 text-14"><strong>PF2 TRX MINI</strong></span>
    <p class="article-slide-title pt-4 pb-2 text-18 md:text-20"><strong>{{ article.title }}</strong></p>
    <p class="line-clamp-3">{{ article.content_plain_text }}</p>
    <div class="text-right text-14 underline pt-4"><NuxtLink :to="articleUrl">Read more...</NuxtLink></div>
  </div>
</template>
<script>
export default {
  name: 'PopularArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleUrl() {
      return '/manuals/' + this.article.chapter.manual.slug + '/' + this.article.uuid
    }
  }
}
</script>
