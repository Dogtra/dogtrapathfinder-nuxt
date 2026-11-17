<template>
  <div v-if="data">
    <ImageBanner :banner="data.manualBanner" />
    <ProductUserGuideBanner :manuals="data.manuals" />
    <SearchBanner :manuals="data.manuals" />
  </div>
</template>

<script setup lang="ts">
import manualBannerQuery from '~/graphql/manual-banner/manual-banner.gql?raw'
import manualsQuery from '~/graphql/manual/manuals.gql?raw'
import ProductUserGuideBanner from '~/components/Banner/ProductUserGuideBanner/index.vue'
import SearchBanner from '~/components/Banner/SearchBanner.vue'
import ImageBanner from '~/components/Banner/ImageBanner.vue'

const { data } = await useAsyncData('manuals', async () => {
  const [manuals, banner] = await Promise.all([strapiQuery(manualsQuery), strapiQuery(manualBannerQuery)])
  return { manuals: manuals.manuals, manualBanner: banner.manualBanner ?? {} }
})

useHead({ title: 'Manuals - Dogtra Pathfinder' })
</script>
