<template>
  <div class='bg-[#F8F7F5] pb-28'>
    <ImageBanner :banner='faqBanner'></ImageBanner>
    <div class='max-w-[64rem] rounded-box mx-4 md:mx-auto px-4 py-4 mt-28 bg-white'>
      <div class="search-banner-product-filter justify-center py-4 hidden md:flex w-fit mx-auto">
        <template v-for='manual in filteredManuals'>
          <SearchBannerFilterChoice :key='manual.id' :manual='manual' :selected-product='selectedSearchProduct' :change-selected-product='selectProduct'/>
        </template>
      </div>
      <div class='block md:hidden flex justify-around flex-wrap py-4 px-12 max-w-[42.5rem] mx-auto'>
        <v-select v-model='selectedSearchProduct' class='w-full' :components='{OpenIndicator}'
                  :options="options"></v-select>
      </div>
      <div>
        <ul class='flex justify-around flex-wrap select-none pb-8 pt-4'>
          <faq-category-item title='All' :selected-category='selectedCategory' :select-category='selectCategory' />
          <template v-for='category in filteredFaqCategoroes'>
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
import orderBy from 'lodash/orderBy'
import faqsQuery from '~/apollo/queries/faq/faqs'
import faqCategoriesQuery from '~/apollo/queries/faq-category/faq-categories'
import faqBannerQuery from '~/apollo/queries/faq-banner/faq-banner'
import manualsQuery from '~/apollo/queries/manual/manuals'
import FaqCategoryItem from '~/components/FAQ/FaqCategoryItem'
import FaqItem from '~/components/FAQ/FaqItem'
import ImageBanner from '~/components/Banner/ImageBanner'
import SearchBannerFilterChoice from '~/components/Banner/SearchBannerFilterChoice'

export default {
  components: { SearchBannerFilterChoice, ImageBanner, FaqItem, FaqCategoryItem },
  async asyncData({ app }) {
    const [ faqsResponse, faqCategoriesResponse, faqBannerResponse, manualsResponse ] = await Promise.all([
      app.apolloProvider.defaultClient.query({
        query: faqsQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: faqCategoriesQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: faqBannerQuery
      }),
      app.apolloProvider.defaultClient.query({
        query: manualsQuery
      }),
    ])

    return {
      faqs: orderBy(faqsResponse.data.faqs, 'order'),
      faqCategories: orderBy(faqCategoriesResponse.data.faqCategories, 'order'),
      faqBanner: faqBannerResponse.data.faqBanner,
      manuals: manualsResponse.data.manuals,
      selectedSearchProduct: manualsResponse.data.manuals.filter(manual => !manual.hidden)[0].title
    }
  },
  data() {
    return {
      OpenIndicator: {
        render: createElement => createElement('span', {class: {'mdi mdi-chevron-down text-20': true}}),
      },
      selectedCategory: 'All',
    }
  },
  head() {
    return {
      title: 'FAQ - Dogtra Pathfinder'
    }
  },
  computed: {
    filteredFaqCategoroes() {
      return this.faqCategories.filter(category => category.manual.title === this.selectedSearchProduct)
    },
    filteredFaqs() {
      if (this.selectedCategory === 'All') {
        return this.faqs.filter(faq => {
          if (!faq.faq_category) {
            return false
          }
          return faq.faq_category.manual.title === this.selectedSearchProduct
        })
      }
      return this.faqs.filter(faq => {
        if (!faq.faq_category) {
          return false
        }
        return faq.faq_category.title === this.selectedCategory
      })
    },
    filteredManuals() {
      return this.manuals.filter(manual => !manual.hidden)
    },
    options() {
      return this.filteredManuals.map(manual => manual.title)
    }
  },
  methods: {
    selectCategory(value) {
      this.selectedCategory = value
    },
    selectProduct(product) {
      this.selectedSearchProduct = product
    }
  }
}
</script>

