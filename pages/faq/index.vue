<template>
  <div class='bg-[#F8F7F5] py-28'>
    <div class='max-w-[64rem] mx-auto px-4 py-12 bg-white'>
      <h1 class='uppercase text-center font-semibold'>
        FAQ & Troubleshooting
      </h1>
      <div>
        <ul class='flex justify-around flex-wrap select-none py-8'>
          <faq-category-item title='All' :selected-category='selectedCategory' :select-category='selectCategory' />
          <template v-for='category in faqCategories'>
            <faq-category-item :key='category.id' :title='category.title' :selected-category='selectedCategory' :select-category='selectCategory'/>
          </template>
        </ul>
      </div>
      <div>
        <template v-for='faq in filteredFaqs'>
          <faq-item :key='faq.id' :faq='faq' />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import faqsQuery from '~/apollo/queries/faq/faqs'
import faqCategoriesQuery from '~/apollo/queries/faq-category/faq-categories'
import FaqCategoryItem from '~/pages/faq/FaqCategoryItem'
import FaqItem from '~/pages/faq/FaqItem'

export default {
  components: { FaqItem, FaqCategoryItem },
  async asyncData({ app }) {
    const [ faqsResponse, faqCategoriesResponse ] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: faqsQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: faqCategoriesQuery
      }),
    ])

    return {
      faqs: faqsResponse.data.faqs,
      faqCategories: faqCategoriesResponse.data.faqCategories
    }
  },
  data() {
    return {
      selectedCategory: 'All'
    }
  },
  computed: {
    filteredFaqs() {
      if (this.selectedCategory === 'All') {
        return this.faqs
      }
      return this.faqs.filter(faq => {
        if (!faq.faq_category) {
          return false
        }
        return faq.faq_category.title === this.selectedCategory
      })
    }
  },
  methods: {
    selectCategory(value) {
      this.selectedCategory = value
    },
  }
}
</script>

