<template>
  <div id='manual-index-container' class='flex flex-col px-12 py-18 pb-8 text-center'>
    <div id='manual-index-image'>
      <img :src='manualProductImageUrl' class='mx-auto'>
      <p class='uppercase font-semibold italic text-30'>{{ manual.title }}</p>
    </div>
    <p class="pt-6 pb-10 text-18 uppercase font-medium">{{ $t('manuals.manual.title')}}</p>
    <div id='manual-index-search'>
      <SearchBar v-model='searchText' max-width="42.5rem" class="mx-auto" :selected-products='[manual.title]'/>
    </div>
    <NuxtLink v-if='hasFirstPage' id='manual-index-first-page' class='w-fit mx-auto my-8 px-8 py-4 font-semibold rounded-btn bg-yellow text-black hover:bg-black hover:text-yellow' :to='manualFirstPageUrl'>
      <span>{{ $t('manuals.manual.first-page')}}</span><i class='yi-chevron-right'></i>
    </NuxtLink>
    <div id='manual-index-app' class='max-w-[64rem] mx-auto'>
      <div><img class='mx-auto w-24 pt-8 pb-8' :src='manualAppIconUrl'></div>
      <p v-dompurify-html="manual.app.download" class="text-20 font-medium"></p>
      <p v-dompurify-html="manual.app.compatibility" class='text-12'></p>
      <div class='app-badge-container flex gap-4 max-w-[33rem] mx-auto pt-10 pb-8'>
        <div class='w-1/2'><a :href='manual.app.android_store_url'><img alt='Get it on Google Play' src='~/assets/images/mobile-android.webp'/></a></div>
        <div class='w-1/2'><a class='max-w-full' :href="manual.app.apple_store_url"><img src="~/assets/images/mobile-apple.webp" alt="Download on the App Store"></a></div>
      </div>
    </div>
  </div>
</template>

<script>
import manualQuery from '~/apollo/queries/manual/manual'
import SearchBar from '~/components/SearchBar/SearchBar'
import {strapiMediaUrl} from "~/utils/strapi";

export default {
  components: { SearchBar },
  layout: 'manual',
  async asyncData({ app, route, store}) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: manualQuery,
      variables: {
        slug: route.params.slug
      }
    })

    store.commit('manual/setManual', data.manuals[0])

    return {
      manual: data.manuals[0]
    }
  },
  data() {
    return {
      searchText: ''
    }
  },
  head() {
    return {
      title: this.manual.title
    }
  },
  computed: {
    hasFirstPage() {
      return !!(this.manual.chapters[0] && this.manual.chapters[0].articles[0])
    },
    manualFirstPageUrl() {
      if (!this.hasFirstPage) {
        return ''
      }

      return '/manuals/' + this.manual.slug + '/' + this.manual.chapters[0].articles[0].uuid
    },
    manualProductImageUrl() {
      return strapiMediaUrl(this.manual.product_image.url)
    },
    manualAppIconUrl() {
      return strapiMediaUrl(this.manual.app.icon.url)
    },
  },
}
</script>

<style scoped>
@font-face {
  unicode-range: U+30-39;
  color: #FFDD00;
}
</style>
