<template>
  <div>
    {{ article.title }}
    <div v-if="markedContent" class='prose'
         v-html="markedContent"></div>

  </div>
</template>

<script>
import { marked } from 'marked';
import articleQuery from '~/apollo/queries/article/article'

export default {
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
  },
  computed: {
    markedContent() {
      return marked(this.article.content);
    }
  }
}
</script>
