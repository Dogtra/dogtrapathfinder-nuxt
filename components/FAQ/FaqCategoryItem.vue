<template>
  <li class='rounded-btn px-6 py-3 cursor-pointer' :class='faqCategoryItemClass' @click='selectThisCategory'>
    {{ title }}
  </li>
</template>
<script>
export default {
  name: 'FaqCategoryItem',
  props: {
    title: {
      type: String,
      required: true
    },
    selectedCategory: {
      type: String,
      required: true
    },
    selectCategory: {
      type: Function,
      required: true
    }
  },
  computed: {
    isSelected() {
      return this.selectedCategory === this.title
    },
    faqCategoryItemClass() {
      return {
        'bg-gray-100': this.isSelected
      }
    }
  },
  methods: {
    selectThisCategory() {
      this.selectCategory(this.title)
    }
  }
}
</script>
