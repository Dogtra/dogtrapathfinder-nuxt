<template>
  <div class='text-black'>
    <div id="main-banner" class="lg:h-96 md:h-80 sm:h-64 bg-cover bg-center h-auto text-white object-fill" :style='mainBannerStyle'></div>
    <div id='search-banner' class='p-12'>
      <p class='text-center'>Filter search by Product</p>
      <div class='flex justify-around flex-wrap mt-4'>
        <div class="product-badge rounded-full bg-gray-400 p-1 px-4">Pathfinder</div>
        <div class="product-badge rounded-full bg-gray-400 text-black p-1 px-4">Pathfinder mini</div>
      </div>

      <div class="text-black flex mt-4">
        <input type="text" placeholder="Look for assistance" class='search-bar flex-grow rounded-l-full py-1 pl-4'>
        <div class='search-bar rounded-r-full py-1 pr-4'><i class='yi-search'/></div>
      </div>
      <p class='text-center mt-4'>Popular searches</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainBanner: null,
      error: null,
      strapi: null
    }
  },
  computed: {
    mainBannerStyle() {
      if (this.mainBanner) {
        return {
          backgroundImage: 'url("' + this.mainBanner.image.url + '")'
        }
      }
      return {}
    }
  },
  async mounted () {
    try {
      this.strapi = this.$strapi;
      this.mainBanner = await this.$strapi.find('main-banner')
    } catch (error) {
      this.error = error
    }
  }
}
</script>

<style>
#main-banner {
  height: 350px;
}
@media (min-width: 640px) {
  #main-banner {
    height: 400px;
  }
}
@media (min-width: 768px) {
  #main-banner {
    height: 490px;
  }
}
@media (min-width: 1024px) {
  #main-banner {
    height: 690px;
  }
}
.product-badge {
  background-color: #C4C4C4;
}
.search-bar {
  background-color: #E7E7E7;
  border: 1px solid transparent;
}

input.search-bar:focus-visible{
  border: 1px solid black;
  border-right-color: transparent;
  outline: none;
}
input.search-bar:focus-visible + .search-bar {
  border: 1px solid black;
  border-left-color: transparent;
}
</style>
