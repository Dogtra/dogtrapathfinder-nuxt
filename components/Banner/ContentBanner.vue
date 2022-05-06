<template>
  <div class='text-white'>
    <div class='mx-auto px-4 md:px-12 py-16 w-full max-w-[112rem]'>
      <h1 v-if='showTitle' class='text-30 md:text-35 font-bold text-white text-center md:text-left md:inline-flex block'>
        {{ category.title }}
        <span class="mx-auto md:mx-0 md:ml-8 mt-6 article-slide-tag rounded-full bg-yellow text-black flex justify-center items-center h-10 w-fit px-4 text-14 uppercase"><strong>{{ category.manual.tag }}</strong></span>
      </h1>
      <div class='flex items-center'>
        <div
          class='mr-2 rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c1.prev()'>
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
          class='ml-2 rounded-full bg-black w-12 h-12 flex items-center justify-center' @click='$refs.c1.next()'>
          <span class='mdi mdi-chevron-right text-white text-30'></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import orderBy from 'lodash/orderBy'
import ContentItem from '~/components/Banner/ContentItem'

export default {
  name: 'ContentBanner',
  components: { ContentItem },
  props: {
    category: {
      type: Object,
      required: true
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    takeSideMenuInAccount: {
      type: Boolean,
      required: false,
      default: false
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
            "breakpoint": this.takeSideMenuInAccount ? 1430 : 1080,
            "settings": {
              "slidesToShow": Math.min(2, this.category.articles.length),
              "slidesToScroll": Math.min(2, this.category.articles.length),
              "initialSlide": 2
            }
          },
          {
            "breakpoint": this.takeSideMenuInAccount ? 1130 : 780,
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

@media (min-width: 768px) {
  >>> .slick-slide {
    padding: 0 1rem;
  }
}


>>> .slick-slide > div {
  max-width: 100%;
}
</style>
