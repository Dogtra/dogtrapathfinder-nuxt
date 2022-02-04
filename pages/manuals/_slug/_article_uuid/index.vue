<template>
  <div class="px-12 py-18 max-w-[71rem]">
    <template v-if='article'>
      <div class="text-14 text-gray-400">
        <NuxtLink to='/manuals'>Manuals</NuxtLink>
        /
        <NuxtLink :to='"/manuals/" + article.chapter.manual.slug'>{{ article.chapter.manual.title }}</NuxtLink>
        /
        <NuxtLink :to='"/manuals/" + article.chapter.manual.slug + "/chapter/" + article.chapter.id'>{{ article.chapter.title }}</NuxtLink>
        / {{ article.title }}
      </div>
      <p class="text-30 font-semibold">{{ article.title }}</p>
      <div v-if="markedContent" v-dompurify-html="markedContent"
           class='prose text-16 text-black'></div>
      <div class='text-14 font-normal'>
        <div class='py-28'>
          <p class='underline'>Did it help ?</p>
          <p>Didn't find what you were looking for? Try looking on the <NuxtLink class='underline text-blue-600' to='/faq'>FAQ</NuxtLink></p>
        </div>
        <div class='flex justify-between text-16 font-bold'>
          <NuxtLink :to='previousArticleUrl' class='flex items-center rounded-btn hover:bg-gray-300 pr-4'><span class='mdi mdi-chevron-left text-22'></span>Previous</NuxtLink>
          <NuxtLink :to='nextArticleUrl' class='flex items-center rounded-btn hover:bg-gray-300 pl-4'>Next<span class='mdi mdi-chevron-right text-22'></span></NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { marked } from 'marked'
import { mapGetters } from 'vuex'
import axios from 'axios'
import articleQuery from '~/apollo/queries/article/article'
import manualQuery from '~/apollo/queries/manual/manual'

export default {
  layout: 'manual',
  async asyncData({ app, route, redirect, store }) {
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
    store.commit('manual/setArticle', article)

    return {
      article,
      manual
    }
  },
  computed: {
    markedContent() {
      return marked(this.article.content);
    },
    ...mapGetters('manual', [
      'previousArticleUrl',
      'nextArticleUrl'
    ])
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

>>> .prose .warning-note {
  background-color: #f24f4f;
  color: white;
  padding: 1rem;
}

>>> .prose .warning-note strong{
  font-size: 1.6rem;
  font-weight: bold;
  color: white;
}
</style>
