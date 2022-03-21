<template>
  <div class='product-filter-choice w-[26.8rem] uppercase text-center cursor-pointer font-semibold' :class='productFilterChoiceClass' @click='changeSelectedProduct(manual.title)'>
    {{ manual.title }}
  </div>
</template>
<script>
export default {
  name: 'SearchBannerFilterChoice',
  props: {
    manual: {
      type: Object,
      required: true
    },
    selectedProduct: {},
    changeSelectedProduct: {
      required: true,
      type: Function
    },
  },
  computed: {
    productFilterChoiceClass() {
      return {
        'product-filter-choice-active': this.selectedProduct === this.manual.title
      }
    }
  }
}
</script>
<style scoped>

.product-filter-choice {
  font-size: 2rem;
  color: #7C7C7C;
  border-bottom: 3px solid #7C7C7C;
}

.product-filter-choice.product-filter-choice-active {
  border-bottom: 3px solid #FFDD00;
  color: #121212;
}

>>> .search-bar input::placeholder {
  text-align: center;
}
</style>
