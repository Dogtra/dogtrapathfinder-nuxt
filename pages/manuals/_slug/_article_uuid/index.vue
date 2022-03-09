<template>
  <div class="max-w-[71rem] px-12 h-[calc(100vh-7.5rem)]">
    <div class="py-18">
      <div class='sticky top-0 bg-white z-10'>
        <div class="text-14 text-gray-400">
          <NuxtLink to='/manuals'>Manuals</NuxtLink>
          /
          <NuxtLink :to='"/manuals/" + article.chapter.manual.slug'>{{ article.chapter.manual.title }}</NuxtLink>
          /
          <NuxtLink :to='"/manuals/" + article.chapter.manual.slug + "/chapter/" + article.chapter.id'>{{ article.chapter.title }}</NuxtLink>
          / {{ article.title }}
        </div>
        <p class="text-30 font-semibold">{{ article.title }}</p>
      </div>
      <div v-if="markedContent" v-dompurify-html="markedContent"
           class='prose text-16 text-black'></div>
      <div class='text-14 font-normal'>
        <div class='py-28'>
          <p class='underline'>{{ $t('manuals.did-it-help') }}</p>
          <p>{{ $t('manuals.not-found') }}<NuxtLink class='underline text-blue-600' to='/faq'>FAQ</NuxtLink></p>
        </div>
      </div>
    </div>
    <div class='sticky pb-4 bottom-0 flex justify-between text-16 font-bold'>
      <NuxtLink :to='previousArticleUrl' class='flex items-center rounded-btn bg-black text-yellow hover:bg-yellow hover:text-black pr-4'><span class='mdi mdi-chevron-left text-22'></span>{{ $t('manuals.previous') }}</NuxtLink>
      <NuxtLink :to='nextArticleUrl' class='flex items-center rounded-btn bg-black text-yellow hover:bg-yellow hover:text-black pl-4'>{{ $t('manuals.next') }}<span class='mdi mdi-chevron-right text-22'></span></NuxtLink>
    </div>
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
  head() {
    return {
      title: this.article.title
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

>>> .prose .grid {
  display: grid
}

>>> .prose .grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

>>> .prose .grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

>>> .prose .grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

>>> .prose .gap-x-4 {
  column-gap: 1rem;
}

>>> .prose .bg-gray {
  background-color: #C5C5C5;
}
@media (min-width: 768px) {
  >>> .prose .md-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  >>> .prose .md-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  >>> .prose .md-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  >>> .prose .md-grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  >>> .prose .md-grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>
