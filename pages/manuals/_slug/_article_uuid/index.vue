<template>
  <div>
    {{ article.title }}
    <div class='prose' v-if="markedContent"
         v-html="markedContent"></div>

  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  async asyncData({$strapi, params, redirect}) {
    const matchingArticles = await $strapi.find('articles',{
      uuid: params.article_uuid
    })

    if (matchingArticles) {
      const article = matchingArticles[0];

      const manual = await $strapi.findOne('manuals', article.chapter.manual)

      if (manual.slug === params.slug) {
        return {
          article,
          manual
        };
      }
    }

    redirect('/')
  },
  computed: {
    markedContent() {
      return marked(this.article.content);
    }
  }
}
</script>
