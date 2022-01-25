<template>
  <div id='manual-banner' class='banner'>
    <h1 class='text-center mt-8 md:mt-16 md:mb-12 capitalize font-medium'>Product user guides</h1>
    <div class="manual-sliders-wrapper overflow-x-auto flex md:justify-center">
      <div class='manual-sliders flex w-fit px-12 pb-16 md:pb-20'>
        <ProductUserGuideBannerListItem v-for='manual in manuals' :key='manual.id' :manual='manual' />
      </div>
    </div>
  </div>
</template>
<script>
import ProductUserGuideBannerListItem from './Item'

export default {
  name: 'ProductUserGuideBanner',
  components: { ProductUserGuideBannerListItem },
  props: {
    manuals: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.banner h1 {
  font-size: 3.2rem;
  line-height: 3.6rem;
}

@media (min-width: 768px) {
  .banner h1 {
    font-size: 4rem;
    line-height: 4.9rem;
  }
}

</style>
