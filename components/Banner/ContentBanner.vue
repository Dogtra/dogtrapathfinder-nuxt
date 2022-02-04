<template>
  <div class='text-white' :style='{backgroundColor: category.color}'>
    <div class='mx-auto px-12 py-16 w-full max-w-[112rem]'>
      <h1 class='text-30 md:text-35 font-bold text-white'>{{ category.title }}</h1>
      <div class='flex items-center'>
        <div
          class='rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c1.prev()'>
          <span class='mdi mdi-chevron-left text-white text-30'></span>
        </div>
        <div class='flex flex-grow gap-[2.7rem] flex-col md:flex-row pt-12 max-w-[100rem] min-w-0'>
          <VueSlickCarousel
            v-if='articles.length'
            ref='c1'
            v-bind='settings'
          >
            <template v-for='article in articles'>
              <ContentItem :key='article.id' :article='article' />
            </template>
          </VueSlickCarousel>
        </div>
        <div
          class='rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c1.next()'>
          <span class='mdi mdi-chevron-right text-white text-30'></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderBy } from 'lodash'
import ContentItem from '~/components/Banner/ContentItem'

export default {
  name: 'ContentBanner',
  components: { ContentItem },
  props: {
    category: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      settings: {
        "arrows": false,
        "slidesToShow": Math.min(3, this.category.articles.length),
        "slidesToScroll": Math.min(3, this.category.articles.length),
        "focusOnSelect": true,
        "responsive": [
          {
            "breakpoint": 1080,
            "settings": {
              "slidesToShow": Math.min(2, this.category.articles.length),
              "slidesToScroll": Math.min(2, this.category.articles.length),
              "initialSlide": 2
            }
          },
          {
            "breakpoint": 780,
            "settings": {
              "slidesToShow": Math.min(1, this.category.articles.length),
              "slidesToScroll": Math.min(1, this.category.articles.length)
            }
          }
        ]
      }
    }
  },
  computed: {
    articles() {
      return orderBy(this.category.articles, 'order')
    }
  }
}
</script>

<style scoped>
>>> .slick-track {
  display: flex;
}

>>> .slick-list {
  overflow: hidden;
}

>>> .slick-slider {
  max-width: 100%;
}

>>> .slick-slide {
  display: flex;
  justify-content: center;
}
</style>
