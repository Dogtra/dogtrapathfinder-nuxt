<template>
  <div :key='article.id' class='max-w-[34rem] px-4'>
    <NuxtLink :to="'/articles/' + article.uuid">
      <div class='w-full h-[22rem] bg-white rounded-btn overflow-hidden'>
        <youtube :video-id='youtubeId' player-width='340' player-height='220' :player-vars='{control: 0}'></youtube>
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
