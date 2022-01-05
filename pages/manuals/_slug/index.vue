<template>
  <div>
    <ManualMenu :manual='manual'></ManualMenu>
    <div id='manual-index-container' class='flex flex-col'>
      <div id='manual-index-image'>
        <img src='~/assets/images/manual_thumbnail.jpg/' class='mx-auto'>
      </div>
      <div id='manual-index-search'>
        <div class="text-black flex mt-4">
          <input type="text" placeholder="Look for assistance" class='search-bar flex-grow rounded-l-full py-1 pl-4'>
          <div class='search-bar rounded-r-full py-1 pr-4'><i class='yi-search'/></div>
        </div>
      </div>
      <div id='manual-index-app'>
        <h1>Downloading the Pathfinder2 App</h1>
        <div><img src='~/assets/images/dogtra-pathfinder.jpg'></div>
        <p>PF2 app is compatible with iOS 9.1 and up, and Android 6.0 and up. Watch integration currently avilable only on Apple Watch Series 5 and up. *Check with phone manufacturer for Bluetooth 5.0 to operate</p>
        <div><a href='https://play.google.com/store/apps/details?id=com.dogtra.gspathfinder&hl=fr&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a></div>
        <div><a href="https://apps.apple.com/us/app/dogtra-pathfinder/id1167878156?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1478044800&h=9156e4252abdaa6e424d4337e768f382" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a></div>
      </div>
      <NuxtLink :to='manualFirstPageUrl' id='manual-index-first-page'><span class='underline'>Go to first page of Manual</span><i class='yi-chevron-right text-yellow-400'></i></NuxtLink>
    </div>
    <NuxtChild/>
  </div>
</template>

<script>
import manualQuery from '~/apollo/queries/manual/manual'
import ManualMenu from '~/components/ManualMenu'

export default {
  layout: 'manual',
  components: { ManualMenu },
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
    manualFirstPageUrl() {
      return '/manuals/' + this.manual.slug + '/' + this.manual.chapters[0].id
    }
  }
}
</script>
