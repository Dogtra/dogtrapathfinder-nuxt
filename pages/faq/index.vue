<template>
  <div class='bg-[#F8F7F5] pb-28'>
    <ImageBanner :banner='faqBanner'></ImageBanner>
    <div class='max-w-[64rem] rounded-box mx-auto px-4 py-4 mt-28 bg-white'>
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
import { orderBy } from 'lodash'
import faqsQuery from '~/apollo/queries/faq/faqs'
import faqCategoriesQuery from '~/apollo/queries/faq-category/faq-categories'
import faqBannerQuery from '~/apollo/queries/faq-banner/faq-banner'
import FaqCategoryItem from '~/components/FAQ/FaqCategoryItem'
import FaqItem from '~/components/FAQ/FaqItem'
import ImageBanner from '~/components/Banner/ImageBanner'

export default {
  components: { ImageBanner, FaqItem, FaqCategoryItem },
  async asyncData({ app }) {
    const [ faqsResponse, faqCategoriesResponse, faqBannerResponse ] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: faqsQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: faqCategoriesQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: faqBannerQuery
      }),
    ])

    return {
      faqs: orderBy(faqsResponse.data.faqs, 'order'),
      faqCategories: orderBy(faqCategoriesResponse.data.faqCategories, 'order'),
      faqBanner: faqBannerResponse.data.faqBanner
    }
  },
  data() {
    return {
      selectedCategory: 'All'
    }
  },
  head() {
    return {
      title: 'FAQ'
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

