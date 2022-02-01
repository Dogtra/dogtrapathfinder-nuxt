<template>
  <div class='mt-10 md:mt-12 bg-white p-0 md:px-24 md:py-12 rounded-box flex overflow-hidden'>
    <div>
      <div class='w-29rem'>
        <img :src='imageUrl'>
      </div>
      <div class='block md:hidden pt-8 p-6'>
        <div class='uppercase flex justify-between items-center pb-6 font-bold border-b-1 border-solid border-[#888888]'>
          <p class='text-18'>{{ product.title }}</p>
          <div>
            <div class='border-solid border-1 border-black rounded-full text-12 flex items-center h-10 pl-4'>
              Shop now<span class='mdi mdi-chevron-right text-22'></span>
            </div>
          </div>
        </div>
        <div class='flex py-6'>
          <div>ratings</div>
          <div>{{ product.price }}</div>
        </div>
        <div>
          <template v-for='feature in product.features'>
            {{feature}}
          </template>
        </div>
      </div>
    </div>
    <div class='hidden md:block'>
      {{ product }}
    </div>
  </div>
</template>
<script>
import { strapiMediaUrl } from '~/utils/strapi'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      return strapiMediaUrl(this.product.image[0].url)
    }
  }
}
</script>
