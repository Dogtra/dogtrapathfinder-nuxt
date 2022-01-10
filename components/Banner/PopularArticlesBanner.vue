<template>
  <div id='popular-articles-banner'>
    <h1 class='text-center'>Popular articles</h1>
    <div class='articles-sliders flex overflow-x-scroll overflow-y-hidden'>
      <template v-for='index in 10'>
        <div :key='index' class='bg-black h-40 object-contain manual-slide mr-4'>
          <title>How to pair</title>
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
