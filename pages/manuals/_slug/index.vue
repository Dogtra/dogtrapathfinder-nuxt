<template>
  <div>
    <ManualMenu :manual='manual'></ManualMenu>
    <NuxtChild/>
  </div>
</template>

<script>
import manualQuery from '~/apollo/queries/manual/manual'
import ManualMenu from '~/components/ManualMenu'

export default {
  components: { ManualMenu },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: manualQuery,
      variables: {
        slug: route.params.slug
      }
    })

    return {
      manual: data.manuals[0]
    }
  },
}
</script>
