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
import articleQuery from '~/apollo/queries/article/article'

export default {
  layout: 'manual',
  // async asyncData({$strapi, params, redirect}) {
  //   const matchingArticles = await $strapi.find('articles',{
  //     uuid: params.article_uuid
  //   })
  //
  //   if (matchingArticles) {
  //     const article = matchingArticles[0];
  //
  //     const manual = await $strapi.findOne('manuals', article.chapter.manual)
  //
  //     if (manual.slug === params.slug) {
  //       return {
  //         article,
  //         manual
  //       };
  //     }
  //   }
  //
  //   redirect('/')
  // },
  data(){
    return {
      article: null
    }
  },
  computed: {
    markedContent() {
      return marked(this.article.content);
    }
  },
  mounted() {
    // if (!this.article || this.article.chapter.manual.slug !== this.$route.params.slug) {
    //   this.$router.push('/')
    // }
  },
  apollo: {
    article: {
      query: articleQuery,
      variables () {
        // Use vue reactive properties here
        return {
          uuid: this.$route.params.article_uuid,
        }
      },
      update: data => {
        return data.articles[0]
      }
    },
  }
}
</script>
