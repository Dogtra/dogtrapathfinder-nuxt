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

  // async asyncData({$strapi, params, redirect}) {
  //   const matchingManuals = await $strapi.find('manuals', {
  //     slug: params.slug
  //   })
  //
  //   if (matchingManuals) {
  //     return {
  //       manual: matchingManuals[0]
  //     }
  //   }
  //
  //   redirect('/')
  // },
  data(){
    return {
      manual: null
    }
  },
  apollo: {
    manual: {
      query: manualQuery,
      variables () {
        // Use vue reactive properties here
        return {
          slug: this.$route.params.slug,
        }
      },
      update: data => {
        return data.manuals[0]
      }
    },
  }
}
</script>
