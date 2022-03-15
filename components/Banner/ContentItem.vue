<template>
  <div :key='article.id' class='max-w-[34rem]'>
    <NuxtLink :to="localePath('/articles/' + article.uuid)">
      <div class='w-full bg-white rounded-btn overflow-hidden'>
        <img class='w-full' :src="'https://img.youtube.com/vi/' + youtubeId + '/mqdefault.jpg'"/>
<!--        <youtube :video-id='youtubeId' player-width='340' player-height='220' :player-vars='{control: 0}'></youtube>-->
      </div>
      <p class='font-bold text-20 pt-6 pb-4'>
        {{ article.title }}
      </p>
      <p class='font-medium text-14 text-[#808080] line-clamp-3'>
        {{ article.content }}
      </p>
    </NuxtLink>
  </div>
</template>
<script>
import { getIdFromURL } from 'vue-youtube-embed'

export default {
  name: 'ContentItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    youtubeId() {
      return getIdFromURL(this.article.youtube_url)
    }
  }
}
</script>
