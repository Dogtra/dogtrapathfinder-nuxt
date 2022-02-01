<template>
  <div class='mt-10 md:mt-12 bg-white p-0 md:px-24 md:py-12 rounded-box md:rounded-3xl flex overflow-hidden shadow-xl'>
    <div class='md:pr-24'>
      <div class='w-full md:w-[29rem]'>
        <img class='w-full' :src='imageUrl'>
      </div>
      <div class='block md:hidden pt-8 p-6'>
        <div class='uppercase flex justify-between items-center pb-6 font-bold border-b-1 border-solid border-[#888888]'>
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
      <div class='border-solid border-1 border-black rounded-full text-12 flex items-center h-10 pl-4 w-fit float-right font-bold uppercase'>
        Shop now<span class='mdi mdi-chevron-right text-22'></span>
      </div>
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
