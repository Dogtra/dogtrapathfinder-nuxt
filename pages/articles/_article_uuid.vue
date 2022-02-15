<template>
  <div>
  <div class="px-12 py-18 max-w-[71rem]">
    <div class="text-14 text-gray-400">
      <NuxtLink to='/videos'>Videos</NuxtLink>
      / {{ article.blog_category.title }}
      / {{ article.title }}
    </div>
    <p class="text-30 font-semibold">{{ article.title }}</p>
    <youtube class='py-8' :video-id='youtubeId' :player-vars='{control: 0}'></youtube>
    <div v-if="markedContent" v-dompurify-html="markedContent"
         class='prose text-16 text-black'></div>
  </div>
  <ContentBanner v-if='blogCategory' :category='blogCategory' />
  </div>
</template>

<script>
import { marked } from 'marked'
import axios from 'axios'
import { getIdFromURL } from 'vue-youtube-embed'
import blogArticleQuery from '~/apollo/queries/article/blog-article'
import blogCategoryQuery from '~/apollo/queries/blog-categories/blog-category'
import ContentBanner from '~/components/Banner/ContentBanner'

export default {
  components: { ContentBanner },
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
  data() {
    return {
      blogCategory: null
    }
  },
  head() {
    return {
      title: 'Article - ' + this.article.title
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
  async mounted() {
    axios.patch(process.env.strapiUrl + '/articles/' + this.article.id + '/view');

    const blogCategoryId = parseInt(this.article.blog_category.id)
    const { data } = await this.$apolloProvider.defaultClient.query({
      query: blogCategoryQuery,
      variables: {
        id: blogCategoryId,
      }
    })

    this.blogCategory = data.blogCategories[0]
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
