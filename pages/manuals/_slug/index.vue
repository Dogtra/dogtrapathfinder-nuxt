<template>
  <div>
    <ManualMenu :manual='manual'></ManualMenu>
    <div id='manual-index-container' class='flex flex-col px-3 text-center'>
      <div id='manual-index-image'>
        <img src='~/assets/images/manual_thumbnail.jpg/' class='mx-auto'>
      </div>
      <p>USER MANUAL</p>
      <div id='manual-index-search'>
        <SearchBar />
      </div>
      <div id='manual-index-app'>
        <div><img class='mx-auto w-16' src='~/assets/images/dogtra-pathfinder.jpg'></div>
        <h1><strong v-dompurify-html="manual.app.download"></strong></h1>
        <p v-dompurify-html="manual.app.compatibility"></p>
        <div class='app-badge-container flex'>
          <div class='w-1/2'><a href='https://play.google.com/store/apps/details?id=com.dogtra.gspathfinder&hl=fr&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a></div>
          <div class='w-1/2'><a class='max-w-full' href="https://apps.apple.com/us/app/dogtra-pathfinder/id1167878156?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1478044800&h=9156e4252abdaa6e424d4337e768f382" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;" class='p-1'></a></div>
        </div>
      </div>
      <NuxtLink v-if='hasFirstPage' :to='manualFirstPageUrl' id='manual-index-first-page'><span class='underline'>Go to first page of Manual</span><i class='yi-chevron-right text-yellow-400'></i></NuxtLink>
    </div>
    <NuxtChild/>
  </div>
</template>

<script>
import manualQuery from '~/apollo/queries/manual/manual'
import ManualMenu from '~/components/ManualMenu'
import SearchBar from '~/components/SearchBar/SearchBar'

export default {
  components: { SearchBar, ManualMenu },
  layout: 'manual',
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: manualQuery,
      variables: {
        slug: route.params.slug
      }
    })

    return {
      manual: data.manuals[0]
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
    }
  }
}
</script>

<style scoped>
@font-face {
  unicode-range: U+30-39;
  color: yellow;
}
</style>
