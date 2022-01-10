<template>
  <div id='manual-banner'>
    <h1 class='text-center'>Product user guides</h1>
    <div class='manual-sliders flex overflow-x-scroll overflow-y-hidden'>
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
