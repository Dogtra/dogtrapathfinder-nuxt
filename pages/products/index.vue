<template>
  <div class='bg-[#F8F7F5]'>
    <ImageBanner :banner='productsBanner'></ImageBanner>
    <div class='max-w-[106rem] mx-auto'>
      <template v-for='product in products'>
        <ProductItem :key='product.id' :product='product' />
      </template>
    </div>
  </div>
</template>

<script>
import productsBannerQuery from '~/apollo/queries/products-banner/products-banner'
import productsQuery from '~/apollo/queries/products/products'
import ImageBanner from '~/components/Banner/ImageBanner'
import ProductItem from '~/components/Products/ProductItem'

export default {
  components: { ProductItem, ImageBanner },
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
  },
}
</script>
