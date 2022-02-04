<template>
  <div class="px-12 py-18 max-w-[71rem]">
    <template v-if='article'>
      <div class="text-14 text-gray-400">
        <NuxtLink to='/content'>Videos</NuxtLink>
        / {{ article.blog_category.title }}
        / {{ article.title }}
      </div>
      <p class="text-30 font-semibold">{{ article.title }}</p>
      <youtube class='py-8' :video-id='youtubeId' :player-vars='{control: 0}'></youtube>
      <div v-if="markedContent" v-dompurify-html="markedContent"
           class='prose text-16 text-black'></div>
    </template>
  </div>
</template>

<script>
import { marked } from 'marked'
import axios from 'axios'
import { getIdFromURL } from 'vue-youtube-embed'
import blogArticleQuery from '~/apollo/queries/article/blog-article'

export default {
  async asyncData({ app, route, redirect, store }) {
    const articleResponse = await app.apolloProvider.defaultClient.query({
        query: blogArticleQuery,
        variables: {
          uuid: route.params.article_uuid,
        }
      })

    const article = articleResponse.data.articles[0];

    if (!article) {
      redirect('/')
    }

    store.commit('manual/setArticle', article)

    return {
      article,
    }
  },
  computed: {
    markedContent() {
      return marked(this.article.content);
    },
    youtubeId() {
      return getIdFromURL(this.article.youtube_url)
    }
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
