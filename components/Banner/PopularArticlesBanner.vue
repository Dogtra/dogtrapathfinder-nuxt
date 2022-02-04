<template>
  <div id='popular-articles-banner' class="banner">
    <h1 class='text-center pt-16 mb-8 font-medium'>Popular Searches</h1>
    <div class="flex mx-auto items-center justify-center">
      <div class='cursor-pointer min-w-[3rem] min-h-[3rem] rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300' @click='scrollLeft'>
        <span class="mdi mdi-chevron-left"></span>
      </div>
      <div ref='slider' class='articles-sliders overflow-x-auto flex px-8 gap-12 pb-20 w-fit'>
        <template v-for='article in popularArticles'>
          <PopularArticleItem :key="article.id + index" :article="article"/>
        </template>
      </div>
      <div class='cursor-pointer min-w-[3rem] min-h-[3rem] rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300' @click='scrollRight'>
        <span class="mdi mdi-chevron-right"></span>
      </div>
    </div>
  </div>
</template>
<script>
import PopularArticleItem from "~/components/Banner/PopularArticleItem";
import popularArticlesQuery from "~/apollo/queries/article/popularArticles";

export default {
  name: 'PopularArticlesBanner',
  components: {PopularArticleItem},
  data() {
    return {
      popularArticles: []
    }
  },
  async mounted() {
    const { data } = await this.$apolloProvider.defaultClient.query({
      query: popularArticlesQuery,
      variables: {
        limit: 5,
        sort: "view_count:DESC",
        where: {
          type: "manual"
        }
      }
    })

    this.popularArticles = data.articles
  },
  methods: {
    scrollRight() {
      this.$refs.slider.scroll(this.$refs.slider.scrollLeft + this.$refs.slider.offsetWidth/2,0)
    },
    scrollLeft() {
      this.$refs.slider.scroll(this.$refs.slider.scrollLeft - this.$refs.slider.offsetWidth/2,0)
    },
  }
}
</script>
