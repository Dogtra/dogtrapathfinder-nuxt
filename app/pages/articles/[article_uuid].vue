<template>
  <div v-if="article">
    <div class="px-12 py-18 max-w-[71rem]">
      <div class="text-14 text-gray-400">
        <NuxtLink :to="localePath('/videos')">
          {{ $t('main.videos') }}
        </NuxtLink>
        / {{ article.blog_category?.title }}
        / {{ article.title }}
      </div>
      <p class="text-30 font-semibold">
        {{ article.title }}
      </p>
      <YoutubeEmbed :video-id="youtubeId" :title="article.title" />
      <div v-if="markedContent" class="prose break-words text-16 text-black" v-html="markedContent" />
    </div>
    <ContentBanner v-if="blogCategory" :category="blogCategory" />
  </div>
</template>

<script setup lang="ts">
import blogArticleQuery from '~/graphql/article/blog-article.gql?raw'
import blogCategoryQuery from '~/graphql/blog-categories/blog-category.gql?raw'
import ContentBanner from '~/components/Banner/ContentBanner.vue'
import YoutubeEmbed from '~/components/YoutubeEmbed.vue'

const route = useRoute()
const localePath = useLocalePath()

const uuid = route.params.article_uuid as string
const { data } = await useAsyncData(`blog-article-${uuid}`, async () => {
  const [articles] = await Promise.all([
    strapiQuery(blogArticleQuery, { uuid }),
  ])
  const article = articles.articles[0]
  const categoryId = article?.blog_category?.documentId
  const blogCategory = categoryId
    ? (await strapiQuery(blogCategoryQuery, { documentId: categoryId })).blogCategory
    : null
  return { article, blogCategory }
})

const article = computed(() => data.value?.article)
const blogCategory = computed(() => data.value?.blogCategory)
if (!article.value) {
  await navigateTo('/')
}

const markedContent = computed(() => renderMarkdown(article.value?.content))
const youtubeId = computed(() => getYoutubeId(article.value?.youtube_url))

onMounted(() => {
  if (article.value) logArticleView(article.value.documentId)
})

useHead({ title: () => `Article - ${article.value?.title ?? ''}` })
</script>

<style scoped>
:deep(.prose img) {
  margin-left: auto;
  margin-right: auto;
}

:deep(.prose .note) {
  color: red;
  background-color: #fff5bf;
  padding: 1rem;
}

:deep(.prose .note strong) {
  color: red;
}

:deep(.prose .warning-note) {
  background-color: #f24f4f;
  color: white;
  padding: 1rem;
}

:deep(.prose .warning-note strong){
  font-size: 1.6rem;
  font-weight: bold;
  color: white;
}
</style>
