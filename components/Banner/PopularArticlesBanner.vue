<template>
  <div id='popular-articles-banner' class="banner">
    <h1 class='text-center mt-16 mb-8 '>Popular Articles</h1>
    <div class="manual-sliders-wrapper overflow-x-auto flex md:justify-center">
      <div class='articles-sliders flex px-12 pb-20 w-fit'>
        <template v-for='article in popularArticles'>
          <PopularArticleItem :key="article.id" :article="article"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import PopularArticleItem from "~/components/Banner/PopularArticleItem";

export default {
  name: 'PopularArticlesBanner',
  components: {PopularArticleItem},
  props: {
    popularArticles: {
      type: Array,
      required: true
    }
  }
}
</script>
