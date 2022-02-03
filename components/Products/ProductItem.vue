<template>
  <div class='mt-10 md:mt-12 bg-white p-0 md:px-24 md:py-12 rounded-box md:rounded-3xl flex overflow-hidden shadow-xl'>
    <div class='md:pr-24'>
      <div class='flex items-center gap-4'>
        <div class='rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c2.prev()'>
          <span class='mdi mdi-chevron-left text-white text-30'></span>
        </div>
        <div class='w-full md:w-[29rem]'>
          <VueSlickCarousel
            v-if='imagesURLs.length'
            ref='c1'
            :arrows='false'
            :as-nav-for='$refs.c2'
            :focus-on-select='true'
            @beforeChange='onBeforeChangeSlick'
          >
            <template v-for='url in imagesURLs'>
              <div :key='url'>
                <img :src='url'>
              </div>
            </template>
          </VueSlickCarousel>
          <VueSlickCarousel
            v-if='imagesURLs.length'
            ref='c2'
            :arrows='false'
            :as-nav-for='$refs.c1'
            :slides-to-show='4'
            :focus-on-select='true'
            @beforeChange='onBeforeChangeSlick'
          >
            <template v-for='url in imagesURLs'>
              <div :key='url'>
                <img :src='url'>
              </div>
            </template>
          </VueSlickCarousel>
        </div>
        <div class='rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c2.next()'>
          <span class='mdi mdi-chevron-right text-white text-30'></span>
        </div>
      </div>
      <div class='block md:hidden pt-8 p-6'>
        <div
          class='uppercase flex justify-between items-center pb-6 font-bold border-b-1 border-solid border-[#888888]'>
          <p class='text-18'>{{ product.title }}</p>
          <div class='border-solid border-1 border-black rounded-full text-12 flex items-center h-10 pl-4'>
            Shop now<span class='mdi mdi-chevron-right text-22'></span>
          </div>
        </div>
        <div class='flex py-6 flex justify-between'>
          <p>ratings</p>
          <p>$ {{ product.price }}</p>
        </div>
        <div>
          <template v-for='feature in product.features'>
            {{ feature.title }}
          </template>
        </div>
      </div>
    </div>
    <div class='hidden md:block'>
      <p class='text-24 uppercase font-bold'>{{ product.title }}</p>
      <div class='flex justify-between border-[#C5C5C5] border-b-1 border-solid pb-6'>
        <div>ratings</div>
        <div>ratings link</div>
      </div>
      <p class='text-14 pt-4'>$ {{ product.price }}</p>
      <p class='pt-4 pb-6'>{{ product.description }}</p>
      <div>
        <template v-for='feature in product.features'>
          {{ feature.title }}
        </template>
      </div>
      <div
        class='border-solid border-1 border-black rounded-full text-12 flex items-center h-10 pl-4 w-fit float-right font-bold uppercase'>
        Shop now<span class='mdi mdi-chevron-right text-22'></span>
      </div>
    </div>
  </div>
</template>
<script>
// import ProductItemSlick from '~/components/Products/ProductItemSlick'

import { strapiMediaUrl } from '~/utils/strapi'

export default {
  name: 'ProductItem',
  // components: { ProductItemSlick },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    imagesURLs() {
      return this.product.images.map(image => strapiMediaUrl(image.url))
    }
  },
  methods: {
    onBeforeChangeSlick(currentPosition, nextPosition) {
      this.$refs.c1.goTo(nextPosition)
      this.$refs.c2.goTo(nextPosition)
    }
  }
}
</script>

<style scoped>
>>> .slick-track {
  display: flex;
  gap: 1rem;
}

>>> .slick-list {
  overflow: hidden;
}
</style>
