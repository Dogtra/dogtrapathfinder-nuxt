<template>
<div>
  <ImageBanner :banner='contentBanner'></ImageBanner>
  <ContentBanner title='How to Dogtra PATHFINDER' />
  <ContentBanner title='Troubleshooting' background-color='#808080' />
</div>
</template>

<script>
import contentBannerQuery from '~/apollo/queries/content-banner/content-banner'
import ImageBanner from '~/components/Banner/ImageBanner'
import ContentBanner from '~/pages/content/ContentBanner'

export default {
  components: { ContentBanner, ImageBanner },
  async asyncData({ app }) {
    const contentBannerResponse = await app.apolloProvider.defaultClient.query({
      query: contentBannerQuery
    })

    return {
      contentBanner: contentBannerResponse.data.contentBanner
    }
  }
}
</script>
