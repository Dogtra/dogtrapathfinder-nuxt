<template>
  <div v-if="article" class="h-[calc(100vh-7.5rem)]">
    <div class="bg-white">
      <div class="px-12 max-w-[71rem]">
        <div class="py-18">
          <div class="sticky top-[7.5rem] bg-white z-10">
            <div class="text-14 text-gray-400">
              <NuxtLink :to="localePath('/manuals')">
                Manuals
              </NuxtLink>
              /
              <NuxtLink :to="localePath(`/manuals/${article.chapter.manual.slug}`)">
                {{ article.chapter.manual.title }}
              </NuxtLink>
              /
              <NuxtLink :to="localePath(`/manuals/${article.chapter.manual.slug}/chapter/${article.chapter.uuid}`)">
                {{ article.chapter.title }}
              </NuxtLink>
              / {{ article.title }}
            </div>
            <p class="text-30 font-semibold break-words">
              {{ article.title }}
            </p>
          </div>
          <div v-if="markedIntroduction" class="prose break-words text-16 text-black" v-html="markedIntroduction" />
          <div
            v-if="articleTabs.length"
            role="tablist"
            :aria-label="article.title"
            class="manual-tabs flex rounded-full bg-[#F5F5F5] text-12 md:text-16 my-8"
          >
            <button
              v-for="(tab, index) in articleTabs"
              :id="`${article.uuid}-tab-${index}`"
              :key="index"
              ref="tabButtons"
              type="button"
              role="tab"
              :aria-selected="activeTab === index"
              :aria-controls="`${article.uuid}-panel`"
              :tabindex="activeTab === index ? 0 : -1"
              class="flex-1 min-w-0 px-4 py-0 rounded-full break-words appearance-none"
              :class="activeTab === index ? 'bg-yellow font-bold text-black' : 'text-[#939393]'"
              @click="activeTab = index"
              @keydown.left.prevent="selectTab(index - 1)"
              @keydown.right.prevent="selectTab(index + 1)"
              @keydown.home.prevent="selectTab(0)"
              @keydown.end.prevent="selectTab(articleTabs.length - 1)"
            >
              {{ tab.title }}
            </button>
          </div>
          <div
            v-if="markedContent || articleTabs.length"
            :id="articleTabs.length ? `${article.uuid}-panel` : undefined"
            :role="articleTabs.length ? 'tabpanel' : undefined"
            :tabindex="articleTabs.length ? 0 : undefined"
            :aria-labelledby="articleTabs.length ? `${article.uuid}-tab-${activeTab}` : undefined"
            class="prose break-words text-16 text-black"
            v-html="markedContent"
          />
          <div class="text-14 font-normal">
            <div class="py-28">
              <p class="underline">
                {{ $t('manuals.did-it-help') }}
              </p>
              <p>
                {{ $t('manuals.not-found') }}<NuxtLink class="underline text-blue-600" :to="localePath('/faq')">
                  FAQ
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
        <div class="sticky pb-4 bottom-0 flex justify-between text-16 font-bold">
          <NuxtLink :to="localePath(manualStore.previousArticleUrl ?? '/')" class="flex items-center rounded-btn bg-black text-yellow hover:bg-yellow hover:text-black pr-4">
            <span class="mdi mdi-chevron-left text-22" />{{ $t('manuals.previous') }}
          </NuxtLink>
          <NuxtLink :to="localePath(manualStore.nextArticleUrl ?? '/')" class="flex items-center rounded-btn bg-black text-yellow hover:bg-yellow hover:text-black pl-4">
            {{ $t('manuals.next') }}<span class="mdi mdi-chevron-right text-22" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import articleQuery from '~/graphql/article/article.gql?raw'

definePageMeta({ layout: 'manual', middleware: 'manual' })

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const manualStore = useManualStore()

const slug = route.params.slug as string
const uuid = route.params.article_uuid as string
const contentLocale = getLocaleToUse(locale.value)
const { data: article } = await useAsyncData(`manual-article-${contentLocale}-${slug}-${uuid}`,
  async () => (await strapiQuery(articleQuery, { uuid, slug, locale: contentLocale })).articles[0] ?? null)

if (!article.value) {
  await navigateTo('/')
}

// Optional tab markers (`<!-- tab: Title -->`) use the existing CMS content field.
const contentParts = computed<string[]>(() => (article.value?.content || '').split(/<!--\s*tab:\s*([^\r\n<>]+?)\s*-->/g))
const articleTabs = computed(() => {
  const tabs: { title: string, content: string }[] = []
  for (let index = 1; index < contentParts.value.length; index += 2) {
    const title = contentParts.value[index]!.trim()
    if (!title) return []
    tabs.push({ title, content: contentParts.value[index + 1] ?? '' })
  }
  return tabs
})
const activeTab = ref(0)
const tabButtons = ref<HTMLButtonElement[]>([])

const markedIntroduction = computed(() => (articleTabs.value.length ? renderMarkdown(contentParts.value[0]) : ''))
const markedContent = computed(() => renderMarkdown(
  articleTabs.value.length ? articleTabs.value[activeTab.value]?.content : article.value?.content,
))

function selectTab(index: number) {
  activeTab.value = (index + articleTabs.value.length) % articleTabs.value.length
  nextTick(() => tabButtons.value[activeTab.value]?.focus())
}

onMounted(() => {
  if (article.value) logArticleView(article.value.documentId)
})

useHead({ title: () => article.value?.title })
</script>

<style scoped>
.manual-tabs {
  min-height: 2.8rem;
}

:deep(.prose img) {
  margin-left: auto;
  margin-right: auto;
}

:deep(.prose .note) {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  background: #F2F2F2;
  margin-top: 1rem;
  margin-bottom: 1rem;
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

:deep(.prose .grid) {
  display: grid
}

:deep(.prose .grid-cols-1) {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

:deep(.prose .grid-cols-2) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

:deep(.prose .grid-cols-3) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

:deep(.prose .gap-4) {
  column-gap: 1rem;
  row-gap: 1rem;
}

:deep(.prose .gap-x-4) {
  column-gap: 1rem;
}

:deep(.prose .gap-x-8) {
  column-gap: 2rem;
}

:deep(.prose .bg-gray) {
  background-color: #C5C5C5;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.prose .bg-white) {
  background-color: #FFFFFF;
}

:deep(.prose .text-14) {
  font-size: 1.4rem;
}

:deep(.prose li .bg-gray),
:deep(.prose li .bg-white),
:deep(.prose li .note)
{
  margin-left: -1.75em;
}

:deep(.prose .grid.grid-img-w-64 img){
  width: 8rem;
}

:deep(.prose .dog-icons-table img) {
  height: 7rem;
  object-fit: cover;
  margin-top: 0;
  margin-bottom: 0;
}
:deep(.prose .dog-icons-table td) {
  min-width: 13rem;
}

@media (min-width: 768px) {
  :deep(.prose .md-grid-cols-2) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  :deep(.prose .md-grid-cols-3) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  :deep(.prose .md-grid-cols-4) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  :deep(.prose .md-grid-cols-5) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  :deep(.prose .md-grid-cols-6) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

:deep(.prose .bg-gray img) {
  margin-top: 0;
  margin-bottom: 0;
}

:deep(.prose .bg-gray p) {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
