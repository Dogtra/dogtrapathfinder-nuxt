<template>
<div class='p-8'>
<!--  {{ chapter }}-->
  <div class='border-b-4 border-black border-solid w-fit text-24 uppercase font-semibold'>
    {{ chapter.title }}
  </div>
  <ul class='pt-4'>
    <template v-for='article in chapter.articles'>
      <ChapterPageArticleItem :key='article.id' :article='article' />
    </template>
  </ul>
</div>
</template>

<script>
import manualQuery from '~/apollo/queries/manual/manual'
import chapterQuery from '~/apollo/queries/chapter/chapter'
import ChapterPageArticleItem from '~/components/ChapterPageArticleItem'

export default {
  components: { ChapterPageArticleItem },
  layout: 'manual',
  async asyncData({ app, route, redirect, store }) {
    const [chapterResponse, manualResponse] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: chapterQuery,
        variables: {
          chapterId: route.params.chapter_id,
        }
      }),
      app.apolloProvider.defaultClient.query({
        query: manualQuery,
        variables: {
          slug: route.params.slug
        }
      })
    ])

    const chapter = chapterResponse.data.chapter;
    const manual = manualResponse.data.manuals[0];

    if (!chapter || !manual || manual.slug !== chapter.manual.slug) {
      redirect('/')
    }

    store.commit('manual/setManual', manual)

    return {
      chapter,
      manual
    }
  },
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>
