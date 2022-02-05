<template>
<div>
  <ImageBanner :banner='contentBanner'></ImageBanner>
  <template v-for='category in blogCategories'>
    <ContentBanner :key='category.id' :category='category' />
  </template>
</div>
</template>

<script>
import contentBannerQuery from '~/apollo/queries/content-banner/content-banner'
import blogCategoriesQuery from '~/apollo/queries/blog-categories/blog-categories'
import ImageBanner from '~/components/Banner/ImageBanner'
import ContentBanner from '~/components/Banner/ContentBanner'

export default {
  components: { ContentBanner, ImageBanner },
  async asyncData({ app }) {
    const [ contentBannerResponse, blogCategoriesResponse ] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: contentBannerQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: blogCategoriesQuery
      })
    ])

    return {
      contentBanner: contentBannerResponse.data.contentBanner,
      blogCategories: blogCategoriesResponse.data.blogCategories
    }
  },
  head() {
    return {
      title: 'Videos'
    }
  },
}
</script>
