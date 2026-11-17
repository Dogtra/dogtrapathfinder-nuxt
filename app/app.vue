<template>
  <NuxtPwaManifest />
  <NuxtLoadingIndicator color="#FFDD00" :height="5" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import manualsQuery from '~/graphql/manual/manuals.gql?raw'
import type { Manual } from '~/stores/manual'

// Replaces Vuex nuxtServerInit: the navbar needs the manual list on every page.
const manualStore = useManualStore()
const { data } = await useStrapiQuery<{ manuals: Manual[] }>('nav-manuals', manualsQuery)
manualStore.setManuals(data.value?.manuals ?? [])
</script>
