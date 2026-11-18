<template>
  <div
    class="product-filter-choice text-20 w-[26.8rem] uppercase text-center cursor-pointer font-semibold"
    :style="productFilterChoiceStyle"
    @click="changeSelectedProduct(manual.title)"
  >
    {{ manual.title }}
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  manual: { title: string, [key: string]: any }
  selectedProduct?: string
  changeSelectedProduct: (title: string) => void
  displayProp?: string
  notSelectedColor?: string
  activeTextColor?: string
}>(), {
  selectedProduct: '',
  displayProp: 'title',
  notSelectedColor: '#7C7C7C',
  activeTextColor: '#121212',
})

const isActive = computed(() => props.selectedProduct === props.manual[props.displayProp])
const productFilterChoiceStyle = computed(() => ({
  'border-bottom': `3px solid ${isActive.value ? '#FFDD00' : props.notSelectedColor}`,
  'color': isActive.value ? props.activeTextColor : props.notSelectedColor,
}))
</script>
