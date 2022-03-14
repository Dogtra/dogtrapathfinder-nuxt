<template>
  <div class='bg-[#F8F7F5]'>
    <ImageBanner :banner='productsBanner'></ImageBanner>
    <div class='max-w-[114rem] mx-auto px-8 md:px-0 pb-16'>
      <template v-for='product in productsOrdered'>
        <ProductItem :key='product.id' :product='product' />
      </template>
    </div>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
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
  head() {
    return {
      title: 'Products - Dogtra Pathfinder'
    }
  },
  computed: {
    productsOrdered() {
      return orderBy(this.products, 'order')
    }
  },
}
</script>
