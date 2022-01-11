<template>
  <div id='manual-banner' class='banner'>
    <h1 class='text-center mt-16 mb-8 capitalize'>Product user guides</h1>
    <div class='manual-sliders flex overflow-x-scroll overflow-y-hidden flex justify-center pb-20'>
      <ProductUserGuideBannerListItem v-for='manual in manuals' :key='manual.id' :manual='manual' />
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
  font-size: 4rem;
  line-height: 1;
}
</style>
