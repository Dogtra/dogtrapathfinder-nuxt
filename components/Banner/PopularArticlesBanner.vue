<template>
  <div id='popular-articles-banner' class="banner">
    <h1 class='text-center mt-16 mb-8 font-medium'>Popular Articles</h1>
    <div class="manual-sliders-wrapper overflow-x-auto flex">
      <div class='articles-sliders flex px-12 pb-20 w-fit md:max-w-[100rem] mx-auto'>
        <template v-for='article in popularArticles'>
          <PopularArticleItem :key="article.id" :article="article"/>
        </template>
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
        limit: 7,
        sort: "view_count:DESC"
      }
    })

    this.popularArticles = data.articles
  }
}
</script>
