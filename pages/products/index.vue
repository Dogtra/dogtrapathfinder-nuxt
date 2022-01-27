<template>
  <div>
    <ImageBanner :banner='productsBanner'></ImageBanner>
    <div>
      <template v-for='product in products'>
        {{ product }}
      </template>
    </div>
  </div>
</template>

<script>
import productsBannerQuery from '~/apollo/queries/products-banner/products-banner'
import productsQuery from '~/apollo/queries/products/products'
import ImageBanner from '~/components/Banner/ImageBanner'

export default {
  components: { ImageBanner },
  async asyncData({ app }) {
    const [productsBannerResponse, productsResponse] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: productsBannerQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: productsQuery
      })
    ])

    return {
      products: productsResponse.data.products,
      productsBanner: productsBannerResponse.data.productsBanner
    }
  }
}
</script>
