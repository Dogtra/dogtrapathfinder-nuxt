<template>
  <div id='popular-articles-banner' class="banner">
    <h1 class='text-center mt-16 mb-8 '>Popular Articles</h1>
    <div class="manual-sliders-wrapper overflow-x-auto flex md:justify-center">
      <div class='articles-sliders flex px-12 pb-20 w-fit'>
        <template v-for='index in 4'>
          <div :key='index' class='article-slide shadow-xl rounded-lg py-8 md:py-10 mr-12 px-4 md:px-8 w-80 md:w-[25rem]'>
            <span class="article-slide-tag rounded-full bg-black text-yellow flex justify-center items-center h-10 w-fit px-4 text-14"><strong>PF2 TRX MINI</strong></span>
            <p class="article-slide-title pt-4 pb-2 text-18 md:text-20"><strong>How to pair my PATFINDER2 TRX MINI ?</strong></p>
            <p>Learnhow to pair the PATHFINDER2 TRX MINI...</p>
            <div class="text-right text-14 underline pt-4">Read more...</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PopularArticlesBanner'
}
</script>
<style scoped>
.article-slide {
  max-width: 24.6rem;
}


</style>
