<template>
<div>
  <ImageBanner :banner='contentBanner'></ImageBanner>
  <ContentBanner title='How to Dogtra PATHFINDER' background-color='#303030' />
  <ContentBanner title='Troubleshooting' />
</div>
</template>

<script>
import contentBannerQuery from '~/apollo/queries/content-banner/content-banner'
import ImageBanner from '~/components/Banner/ImageBanner'
import ContentBanner from '~/components/Banner/ContentBanner'

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
