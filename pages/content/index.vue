<template>
<div>
  <ImageBanner :banner='contentBanner'></ImageBanner>
  <div>
    <template></template>
  </div>
</div>
</template>

<script>
import contentBannerQuery from '~/apollo/queries/content-banner/content-banner'
import ImageBanner from '~/components/Banner/ImageBanner'

export default {
  components: { ImageBanner },
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
