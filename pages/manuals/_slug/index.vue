<template>
  <div id='manual-index-container' class='flex flex-col px-12 py-18 pb-8 text-center'>
    <div id='manual-index-image'>
      <img :src='manualProductImageUrl' class='mx-auto'>
    </div>
    <p class="pt-6 pb-10 text-18 uppercase font-medium">User manual</p>
    <div id='manual-index-search'>
      <SearchBar max-width="42.5rem" class="mx-auto" v-model='searchText' :selected-products='[manual.title]'/>
    </div>
    <div id='manual-index-app'>
      <div><img class='mx-auto w-36 pt-20 pb-8' :src='manualAppIconUrl'></div>
      <p v-dompurify-html="manual.app.download" class="text-30 font-medium"></p>
      <p v-dompurify-html="manual.app.compatibility"></p>
      <div class='app-badge-container flex gap-4 max-w-[33rem] mx-auto pt-10 pb-8'>
<!--        <img src='~/assets/images/mobile-apps-black.png' />-->
        <div class='w-1/2'><a href='https://play.google.com/store/apps/details?id=com.dogtra.gspathfinder&hl=fr&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='~/assets/images/mobile-android.png'/></a></div>
        <div class='w-1/2'><a class='max-w-full' href="https://apps.apple.com/us/app/dogtra-pathfinder/id1167878156?itsct=apps_box_badge&amp;itscg=30200"><img src="~/assets/images/mobile-apple.png" alt="Download on the App Store"></a></div>
      </div>
    </div>
    <NuxtLink v-if='hasFirstPage' id='manual-index-first-page' :to='manualFirstPageUrl'><span class='underline'>Go to first page of Manual</span><i class='yi-chevron-right text-yellow'></i></NuxtLink>
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
      return strapiMediaUrl(this.manual.product_with_title_image.url)
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
