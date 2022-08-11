<template>
  <div class="h-[calc(100vh-7.5rem)]">
    <div class='bg-white'>
      <div class='px-12 max-w-[71rem]'>
        <div class="py-18">
          <div class='sticky top-[7.5rem] bg-white z-10'>
            <div class="text-14 text-gray-400">
              <NuxtLink :to="localePath('/manuals')">Manuals</NuxtLink>
              /
              <NuxtLink :to='localePath("/manuals/" + article.chapter.manual.slug)'>{{ article.chapter.manual.title }}</NuxtLink>
              /
              <NuxtLink :to='localePath("/manuals/" + article.chapter.manual.slug + "/chapter/" + article.chapter.uuid)'>{{ article.chapter.title }}</NuxtLink>
              / {{ article.title }}
            </div>
            <p class="text-30 font-semibold break-words">{{ article.title }}</p>
          </div>
          <div v-if="markedContent" v-dompurify-html="markedContent"
               class='prose break-words text-16 text-black'></div>
          <div class='text-14 font-normal'>
            <div class='py-28'>
              <p class='underline'>{{ $t('manuals.did-it-help') }}</p>
              <p>{{ $t('manuals.not-found') }}<NuxtLink class='underline text-blue-600' :to='localePath("/faq")'>FAQ</NuxtLink></p>
            </div>
          </div>
        </div>
        <div class='sticky pb-4 bottom-0 flex justify-between text-16 font-bold'>
          <NuxtLink :to='localePath(previousArticleUrl)' class='flex items-center rounded-btn bg-black text-yellow hover:bg-yellow hover:text-black pr-4'><span class='mdi mdi-chevron-left text-22'></span>{{ $t('manuals.previous') }}</NuxtLink>
          <NuxtLink :to='localePath(nextArticleUrl)' class='flex items-center rounded-btn bg-black text-yellow hover:bg-yellow hover:text-black pl-4'>{{ $t('manuals.next') }}<span class='mdi mdi-chevron-right text-22'></span></NuxtLink>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { marked } from 'marked'
import { mapGetters } from 'vuex'
import axios from 'axios'
import articleQuery from '~/apollo/queries/article/article'
import manualQuery from '~/apollo/queries/manual/manual'
import { getLocaleToUse } from '~/utils/getLocaleToUse'

export default {
  layout: 'manual',
  async asyncData({ app, route, redirect, store }) {
    const locale = getLocaleToUse(app.i18n.locale)

    const [articleResponse, manualResponse] = await Promise.all([
      app.apolloProvider.defaultClient.query({
      query: articleQuery,
      variables: {
        uuid: route.params.article_uuid,
        locale
      }
    }),
      app.apolloProvider.defaultClient.query({
      query: manualQuery,
      variables: {
        slug: route.params.slug,
        locale
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
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  background: #F2F2F2;
  margin-top: 1rem;
  margin-bottom: 1rem;
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

>>> .prose .gap-x-8 {
  column-gap: 2rem;
}

>>> .prose .bg-gray {
  background-color: #C5C5C5;
  display: flex;
  align-items: center;
  justify-content: center;
}

>>> .prose .bg-white {
  background-color: #FFFFFF;
}

>>> .prose .text-14 {
  font-size: 1.4rem;
}

>>> .prose li .bg-gray,
>>> .prose li .bg-white,
>>> .prose li .note
{
  margin-left: -1.75em;
}

>>> .prose .grid.grid-img-w-64 img{
  width: 8rem;
}

>>> .prose .dog-icons-table img {
  height: 7rem;
  object-fit: cover;
  margin-top: 0;
  margin-bottom: 0;
}
>>> .prose .dog-icons-table td {
  min-width: 13rem;
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

>>> .prose .bg-gray img {
  margin-top: 0;
  margin-bottom: 0;
}

>>> .prose .bg-gray p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
