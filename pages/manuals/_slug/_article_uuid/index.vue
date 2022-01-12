<template>
  <div>
    <template v-if='article'>
      <div><NuxtLink to='/manuals'>Manuals</NuxtLink> / <NuxtLink :to='"/manuals/" + article.chapter.manual.slug'>{{article.chapter.manual.title }}</NuxtLink> / {{ article.chapter.title}} / {{ article.title }}</div>
      <h1>{{ article.title }}</h1>
      <div v-if="markedContent" v-dompurify-html="markedContent"
           class='prose'></div>
    </template>
  </div>
</template>

<script>
import { marked } from 'marked';
import axios from 'axios'
import articleQuery from '~/apollo/queries/article/article'
import manualQuery from '~/apollo/queries/manual/manual'

export default {
  layout: 'manual',
  mounted() {

    // this.mainBanner = await this.$strapi.patch('main-banner')
    const matchingArticles = this.$strapi.find('articles',{
      uuid: this.$route.params.uuid
    })
    console.log(matchingArticles)

    // this.mainBanner = await this.$strapi.patch('main-banner')
    const matchingArticles2 = this.$strapi.$http.$patch(process.env.strapiUrl + '/manual/' + this.article.id + '/view')
    console.log(matchingArticles2)

    axios.patch(process.env.strapiUrl + '/manual/' + this.article.id + '/view').then(response => { console.log(response); });
  },
  async asyncData({ app, route, redirect, $strapi, store }) {
    const [articleResponse, manualResponse] = await Promise.all([
      app.apolloProvider.defaultClient.query({
      query: articleQuery,
      variables: {
        uuid: route.params.article_uuid,
      }
    }),
      app.apolloProvider.defaultClient.query({
      query: manualQuery,
      variables: {
        slug: route.params.slug
      }
    })
      ])

    const article = articleResponse.data.articles[0];
    const manual = manualResponse.data.manuals[0];

    if (!article || !manual || manual.slug !== article.chapter.manual.slug) {
      redirect('/')
    }

    store.commit('manual/setManual', manual)

    return {
      article: articleResponse.data.articles[0],
      manual: manualResponse.data.manuals[0]
    }
  },
  data(){
    return {
      // article: null
    }
  },
  computed: {
    markedContent() {
      return marked(this.article.content);
    }
  },
}
</script>
