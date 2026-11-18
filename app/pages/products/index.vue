<template>
  <div v-if="data" class="bg-[#F8F7F5]">
    <ImageBanner :banner="data.productsBanner" />
    <div class="max-w-[114rem] mx-auto px-8 md:px-0 pb-16">
      <ProductItem v-for="product in data.products" :key="product.documentId" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import productsBannerQuery from '~/graphql/products-banner/products-banner.gql?raw'
import productsQuery from '~/graphql/products/products.gql?raw'
import ImageBanner from '~/components/Banner/ImageBanner.vue'
import ProductItem from '~/components/Products/ProductItem.vue'

// The query only returns active products, sorted by `order`.
const { data } = await useAsyncData('products', async () => {
  const [banner, products] = await Promise.all([strapiQuery(productsBannerQuery), strapiQuery(productsQuery)])
  return { productsBanner: banner.productsBanner ?? {}, products: products.products }
})

useHead({ title: 'Products - Dogtra Pathfinder' })
</script>
