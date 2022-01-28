<template>
  <div class="px-12 py-18">
    <template v-if='article'>
      <div class="text-14 text-gray-400">
        <NuxtLink to='/manuals'>Manuals</NuxtLink>
        /
        <NuxtLink :to='"/manuals/" + article.chapter.manual.slug'>{{ article.chapter.manual.title }}</NuxtLink>
        / {{ article.chapter.title }} / {{ article.title }}
      </div>
      <p class="text-30 font-semibold">{{ article.title }}</p>
      <div v-if="markedContent" v-dompurify-html="markedContent"
           class='prose text-16 max-w-[71rem] text-black'></div>
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
  computed: {
    markedContent() {
      return marked(this.article.content);
    },

  },
  mounted() {
    axios.patch(process.env.strapiUrl + '/articles/' + this.article.id + '/view');
  },
}
</script>

<style scoped>
>>> .prose img {
  margin-left: auto;
  margin-right: auto;
}

>>> .prose .note {
  color: red;
  background-color: #fff5bf;
  padding: 1rem;
}

>>> .prose .note strong {
  color: red;
}
</style>
