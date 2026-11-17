<template>
  <div v-if="chapter" class="p-8">
    <div class="border-b-4 border-black border-solid w-fit text-24 uppercase font-semibold">
      {{ chapter.title }}
    </div>
    <ul class="pt-4">
      <ChapterPageArticleItem v-for="article in chapter.articles" :key="article.documentId" :article="article" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import chapterQuery from '~/graphql/chapter/chapter.gql?raw'
import ChapterPageArticleItem from '~/components/ChapterPageArticleItem.vue'

definePageMeta({ layout: 'manual', middleware: 'manual' })

const route = useRoute()
const { locale } = useI18n()

const slug = route.params.slug as string
const chapterUuid = route.params.chapter_id as string
const contentLocale = getLocaleToUse(locale.value)
const { data: chapter } = await useAsyncData(`chapter-${contentLocale}-${slug}-${chapterUuid}`,
  async () => (await strapiQuery(chapterQuery, { uuid: chapterUuid, slug, locale: contentLocale })).chapters[0] ?? null)

if (!chapter.value) {
  await navigateTo('/')
}

useHead({ title: () => chapter.value?.title })
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
