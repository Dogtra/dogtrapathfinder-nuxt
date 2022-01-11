<template>
  <div id='popular-articles-banner' class="banner">
    <h1 class='text-center mt-16 mb-8 '>Popular articles</h1>
    <div class='articles-sliders flex overflow-x-scroll overflow-y-hidden justify-center'>
      <template v-for='index in 10'>
        <div :key='index' class='bg-black h-40 object-contain manual-slide mr-4'>
          <p>How to pair</p>
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
