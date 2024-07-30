<template>
<div>
  <ImageBanner :banner='contentBanner'></ImageBanner>
  <div class="search-banner-product-filter bg-black justify-center py-4 flex w-100 mx-auto">
    <template v-for='manual in filteredManuals'>
      <SearchBannerFilterChoice :key='manual.id' :manual='manual' :selected-product='selectedSearchProduct' :change-selected-product='selectProduct' :active-text-color='"#FFDD00"'/>
    </template>
  </div>
  <template v-for='category in filteredBlogCategories'>
    <ContentBanner :key='category.id' :category='category' />
  </template>
</div>
</template>

<script>
import contentBannerQuery from '~/apollo/queries/content-banner/content-banner'
import blogCategoriesQuery from '~/apollo/queries/blog-categories/blog-categories'
import ImageBanner from '~/components/Banner/ImageBanner'
import ContentBanner from '~/components/Banner/ContentBanner'
import SearchBannerFilterChoice from '~/components/Banner/SearchBannerFilterChoice'
import manualsQuery from '~/apollo/queries/manual/manuals.gql'

export default {
  components: { SearchBannerFilterChoice, ContentBanner, ImageBanner },
  async asyncData({ app }) {
    const [ contentBannerResponse, blogCategoriesResponse, manualsResponse ] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: contentBannerQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: blogCategoriesQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: manualsQuery
      }),
    ])

    return {
      contentBanner: contentBannerResponse.data.contentBanner,
      blogCategories: blogCategoriesResponse.data.blogCategories,
      manuals: manualsResponse.data.manuals
    }
  },
  data() {
    return {
      selectedSearchProduct: ''
    }
  },
  head() {
    return {
      title: 'Videos - Dogtra Pathfinder'
    }
  },
  computed: {
    filteredManuals() {
      return this.manuals.filter(manual => !manual.hidden)
    },
    filteredBlogCategories() {
      return this.blogCategories.filter(blog => !!blog.manual && blog.manual.title === this.selectedSearchProduct)
    }
  },
  mounted() {
    this.selectedSearchProduct = this.manuals[0].title
  },
  methods: {
    selectProduct(title) {
      this.selectedSearchProduct = title
    }
  }
}
</script>
