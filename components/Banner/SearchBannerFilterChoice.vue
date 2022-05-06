<template>
  <div class='product-filter-choice text-20 w-[26.8rem] uppercase text-center cursor-pointer font-semibold' :style='productFilterChoiceStyle' @click='changeSelectedProduct(manual.title)'>
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
    displayProp: {
      type: String,
      required: false,
      default: 'title'
    },
    notSelectedColor: {
      type: String,
      required: false,
      default: '#7C7C7C'
    },
    activeTextColor: {
      type: String,
      required: false,
      default: '#121212'
    }
  },
  computed: {
    isActive() {
      return this.selectedProduct === this.manual[this.displayProp]
    },

    productFilterChoiceStyle() {
      return {
        'border-bottom': '3px solid ' + (this.isActive ? '#FFDD00' : this.notSelectedColor),
        'color': (this.isActive ? this.activeTextColor : this.notSelectedColor)
      }
    }
  }
}
</script>
