<template>
  <div class='mt-10 md:mt-12 bg-white p-0 md:px-24 md:py-12 rounded-box md:rounded-3xl flex overflow-hidden shadow-xl'>
    <div class='md:pr-24 w-full'>
      <div class='flex items-center gap-4 relative'>
        <div
          v-if='imagesURLs.length' class='absolute md:relative left-4 md:left-0 z-10 rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c1.prev()'>
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
            class='hidden md:block'
            @beforeChange='onBeforeChangeSlick'
          >
            <template v-for='url in imagesURLs'>
              <div :key='url'>
                <img :src='url'>
              </div>
            </template>
          </VueSlickCarousel>
        </div>
        <div
          v-if='imagesURLs.length' class='absolute md:relative right-4 md:right-0 z-10 rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c1.next()'>
          <span class='mdi mdi-chevron-right text-white text-30'></span>
        </div>
      </div>
      <div class='block md:hidden pt-8 p-6'>
        <div
          class='uppercase flex justify-between items-center pb-6 font-bold border-b-1 border-solid border-[#888888]'>
          <p class='text-18'>{{ product.title }}</p>
          <div class='border-solid border-1 border-black bg-yellow rounded-full text-12 flex items-center h-10 pl-4'>
            Shop now<span class='mdi mdi-chevron-right text-22'></span>
          </div>
        </div>
        <div class='flex py-6 flex justify-between flex-row-reverse'>
<!--          <p>ratings</p>-->
          <p>$ {{ product.price }}</p>
        </div>
        <read-more more-str="read more" less-str="read less" :text='markedDescription' class='pt-4 pb-6' maxChars='150'></read-more>
        <div class='flex gap-4 flex-wrap'>
          <template v-for='feature in features'>
            <img :key='feature.url' class='w-16' :src='feature.url' :alt='feature.alternativeText' :title='feature.title'>
          </template>
        </div>
      </div>
    </div>
    <div class='hidden md:block'>
      <p class='text-24 uppercase font-bold'>{{ product.title }}</p>
<!--      <div class='flex justify-between border-[#C5C5C5] border-b-1 border-solid pb-6'>-->
<!--        <div>ratings</div>-->
<!--        <div>ratings link</div>-->
<!--      </div>-->
      <p class='text-14 pt-4'>$ {{ product.price }}</p>
      <read-more more-str="read more" less-str="read less" :text='markedDescription' class='pt-4 pb-6' maxChars='200'></read-more>
      <div class='flex gap-4 pb-12 flex-wrap'>
          <template v-for='feature in features'>
            <img :key='feature.url' class='w-16' :src='feature.url' :alt='feature.alternativeText' :title='feature.title'>
          </template>
      </div>
      <a
        :href='product.shop_url'
        class='border-solid border-1 border-black bg-yellow rounded-full text-12 flex items-center h-10 pl-4 w-fit float-right font-bold uppercase'>
        Shop now<span class='mdi mdi-chevron-right text-22'></span>
      </a>
    </div>
  </div>
</template>
<script>
import { marked } from 'marked'
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
    },
    features() {
      return this.product.features.map(feature => {
        return {
          url: strapiMediaUrl(feature.icon.url),
          alternativeText: feature.icon.alternativeText,
          title: feature.title
        }
      })
    },
    markedDescription() {
      return marked(this.product.description)
    },
  },
  methods: {
    onBeforeChangeSlick(currentPosition, nextPosition) {
      if (!this.$refs.c1 || !this.$refs.c2) {
        return
      }
      this.$refs.c1.goTo(nextPosition)
      this.$refs.c2.goTo(nextPosition)
    }
  }
}
</script>

<style scoped>
>>> .slick-track {
  display: flex;
}

>>> .slick-list {
  overflow: hidden;
}

>>> #readmore {
  color: blue;
  text-decoration: underline;
}
</style>
