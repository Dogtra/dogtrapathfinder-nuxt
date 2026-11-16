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
          <div v-if='markedIntroduction' v-dompurify-html='markedIntroduction'
               class='prose break-words text-16 text-black'></div>
          <div v-if='articleTabs.length' role='tablist' :aria-label='article.title'
               class='manual-tabs flex rounded-full bg-[#F5F5F5] text-12 md:text-16 my-8'>
            <button v-for='(tab, index) in articleTabs' :id='article.uuid + "-tab-" + index'
                    :key='index' ref='articleTabs' type='button' role='tab'
                    :aria-selected='activeTab === index' :aria-controls='article.uuid + "-panel"'
                    :tabindex='activeTab === index ? 0 : -1'
                    class='flex-1 min-w-0 px-4 py-0 rounded-full break-words appearance-none'
                    :class="activeTab === index ? 'bg-yellow font-bold text-black' : 'text-[#939393]'"
                    @click='activeTab = index' @keydown.left.prevent='selectTab(index - 1)'
                    @keydown.right.prevent='selectTab(index + 1)' @keydown.home.prevent='selectTab(0)'
                    @keydown.end.prevent='selectTab(articleTabs.length - 1)'>{{ tab.title }}</button>
          </div>
          <div v-if="markedContent || articleTabs.length" :id='articleTabs.length ? article.uuid + "-panel" : null'
               v-dompurify-html='markedContent'
               :role='articleTabs.length ? "tabpanel" : null'
               :tabindex='articleTabs.length ? 0 : null'
               :aria-labelledby='articleTabs.length ? article.uuid + "-tab-" + activeTab : null'
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
  data() {
    return { activeTab: 0 }
  },
  head() {
    return {
      title: this.article.title
    }
  },
  computed: {
    // Optional tab markers use the existing CMS content field.
    contentParts() {
      return (this.article.content || '').split(/<!--\s*tab:\s*([^\r\n<>]+?)\s*-->/g)
    },
    articleTabs() {
      const tabs = []
      for (let index = 1; index < this.contentParts.length; index += 2) {
        const title = this.contentParts[index].trim()
        if (!title) return []
        tabs.push({ title, content: this.contentParts[index + 1] })
      }
      return tabs
    },
    markedIntroduction() {
      return this.articleTabs.length ? marked(this.contentParts[0]) : ''
    },
    markedContent() {
      return marked(this.articleTabs.length ? this.articleTabs[this.activeTab].content : (this.article.content || ''));
    },
    ...mapGetters('manual', [
      'previousArticleUrl',
      'nextArticleUrl'
    ])
  },
  watch: {
    article() {
      this.activeTab = 0
    }
  },
  mounted() {
    axios.patch(process.env.strapiUrl + '/articles/' + this.article.id + '/view');
  },
  activated() {
    this.activeTab = 0
  },
  methods: {
    selectTab(index) {
      this.activeTab = (index + this.articleTabs.length) % this.articleTabs.length
      this.$nextTick(() => this.$refs.articleTabs[this.activeTab].focus())
    }
  },
}
</script>

<style scoped>
.manual-tabs {
  min-height: 2.8rem;
}

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

>>> .prose .gap-4 {
  column-gap: 1rem;
  row-gap: 1rem;
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
