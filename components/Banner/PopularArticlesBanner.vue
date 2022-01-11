<template>
  <div id='popular-articles-banner' class="banner">
    <h1 class='text-center mt-16 mb-8 '>Popular articles</h1>
    <div class='articles-sliders flex overflow-x-scroll overflow-y-hidden justify-center'>
      <template v-for='index in 4'>
        <div :key='index' class='bg-red-50 h-40 object-contain article-slide rounded-lg py-12 mr-12 px-8'>
          <div>PF2 TRX MMINI</div>
          <p>How to pair my PATFINDER2 TRX MINI ?</p>
          <p>Learnhow to pair the PATHFINDER2 TRX MINI...</p>
          <div>Read more...</div>
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
