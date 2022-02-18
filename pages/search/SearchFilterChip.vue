<template>
  <div class='rounded-full p-1 px-4 font-semibold cursor-pointer' :class='searchFilterChipClass' @click='toggle(manual.title)'>
    {{ manual.title }}
  </div>
</template>
<script>
export default {
  name: 'SearchFilterChip',
  props: {
    manual: {
      type: Object,
      required: true
    },
    checkedProductsFilter: {
      type: Array,
      required: true
    },
    toggle: {
      type: Function,
      required: true
    }
  },
  computed: {
    active() {
      return this.checkedProductsFilter.includes(this.manual.title);
    },
    searchFilterChipClass() {
      return {
        'bg-yellow': this.active,
        'bg-gray-400': !this.active,
        'block': this.active,
        'md:hidden': !this.active
      }
    }
  }
}
</script>
<style>

em {
  background-color: yellow;
}
</style>
