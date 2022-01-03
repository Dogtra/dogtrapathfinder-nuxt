<template>
  <div>
    MANUALS
    <template v-for='manual in manuals'>
      <ManualThumbnail :key='manual.id' :manual='manual' />
    </template>
  </div>
</template>

<script>
import manualsQuery from '~/apollo/queries/manual/manuals'
import ManualThumbnail from '~/components/Thumbnails/ManualThumbnail'

export default {
  components: { ManualThumbnail },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: manualsQuery,
    })

    return {
      manuals: data.manuals
    }
  },
}

</script>
