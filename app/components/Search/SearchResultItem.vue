<template>
  <div v-show="checkedProductsFilter.length < 1 || (manual && !manual.hidden && checkedProductsFilter.includes(manual.title))">
    <div v-if="manual" class="pb-12">
      <NuxtLink class="text-18 font-bold" :to="localePath(articleUrl)">
        <span v-html="highlighted('title')" />
      </NuxtLink>
      <p class="text-14 font-normal text-[#B4B4B4] pt-4 pb-2">
        <NuxtLink :to="localePath(manualUrl)">
          {{ manual.title }}
        </NuxtLink> > <span v-html="chapterTitle" />
      </p>
      <NuxtLink :to="localePath(articleUrl)">
        <p class="line-clamp-6 md:line-clamp-4 font-normal" v-html="highlighted('content_plain_text')" />
      </NuxtLink>
      <span class="mt-6 article-slide-tag rounded-full bg-black text-yellow flex justify-center items-center h-10 w-fit px-4 text-14 uppercase"><strong>{{ manual.tag }}</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: Record<string, any>
  manuals: { documentId: string, slug: string, title: string, tag?: string, hidden?: boolean | null }[]
  /** chapter documentId → manual documentId (the Meilisearch document only embeds the chapter). */
  chapterManuals: Record<string, string>
  checkedProductsFilter: string[]
}>()

const localePath = useLocalePath()

const manual = computed(() => {
  const chapter = props.item.chapter
  const manualDocumentId = chapter?.manual?.documentId ?? props.chapterManuals[chapter?.documentId]
  return props.manuals.find(manual => manual.documentId === manualDocumentId)
})
const manualUrl = computed(() => (manual.value ? `/manuals/${manual.value.slug}` : ''))
const articleUrl = computed(() => `${manualUrl.value}/${props.item.uuid}`)

function highlighted(attribute: string) {
  return sanitizeHtml(props.item._highlightResult?.[attribute]?.value ?? props.item[attribute] ?? '')
}

const chapterTitle = computed(() => sanitizeHtml(
  props.item._highlightResult?.chapter?.title?.value ?? props.item.chapter?.title ?? '',
))
</script>
