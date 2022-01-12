<template>
  <div id='popular-articles-banner' class="banner">
    <h1 class='text-center mt-16 mb-8 '>Popular Articles</h1>
    <div class='articles-sliders flex overflow-x-auto overflow-y-hidden justify-center pb-20'>
      <template v-for='index in 4'>
        <div :key='index' class='article-slide shadow-xl rounded-lg py-12 mr-12 px-8'>
          <span class="article-slide-tag rounded-full bg-black text-yellow-400 px-4"><strong>PF2 TRX MINI</strong></span>
          <p class="article-slide-title pt-10 pb-6"><strong>How to pair my PATFINDER2 TRX MINI ?</strong></p>
          <p>Learnhow to pair the PATHFINDER2 TRX MINI...</p>
          <div class="text-right underline pt-4">Read more...</div>
        </div>
      </template>
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
