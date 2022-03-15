<template>
  <div>
    <div class='cursor-pointer bg-yellow text-black inline-block rounded-full px-4 md:px-6 py-1 md:py-3 flex items-center w-fit'
       @click='toggleModal'>
      <span class='material-icons align-bottom' style='font-size: 1.8rem'>picture_as_pdf</span><span
      class='text-12 uppercase font-extrabold'>Download as PDF</span>
    </div>
    <div v-show='isOpen'
         class='flex bg-opacity-80 bg-black overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center min-h-full md:inset-0'>
      <div class='relative px-4 w-full max-w-2xl h-full md:h-auto'>
        <!-- Modal content -->
        <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <!-- Modal header -->
          <div class='flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600'>
            <h3 class='text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white'>
              Choose product manual
            </h3>
            <button type='button'
                    class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    @click='toggleModal'>
              <svg class='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fill-rule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clip-rule='evenodd'></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class='p-6 space-y-6'>
            <div class='flex justify-around flex-wrap pb-8 max-w-[42.5rem] mx-auto'>
              <v-select v-model='selectedProduct' class='w-full' :components='{OpenIndicator}' placeholder='Choose a product'
                        :options="options"></v-select>
            </div>
          </div>
          <!-- Modal footer -->
          <div class='flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600'>
            <a :href='manualPdfLink' target='_blank' download="proposed_file_name"
                    class='text-black bg-yellow hover:bg-yellow-focus focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              Download
            </a>
            <button data-modal-toggle='defaultModal' type='button'
                    class='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600'>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { strapiMediaUrl } from '~/utils/strapi'

export default {
  name: 'DownloadPDF',
  props: {
    manual: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      selectedProduct: this.manual.products.filter(product => product.pdf)[0].title,
      OpenIndicator: {
        render: createElement => createElement('span', {class: {'mdi mdi-chevron-down text-20': true}}),
      },
    }
  },
  computed: {
    options() {
      return this.manual.products.filter(product => product.pdf).map(product => product.title)
    },
    productToDownload() {
      return this.manual.products.find(product => product.title === this.selectedProduct)
    },
    manualPdfLink() {
      if (!this.productToDownload || !this.productToDownload.pdf) {
        return
      }
      return strapiMediaUrl(this.productToDownload.pdf.url)
    },
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen
    },
  }
}
</script>
