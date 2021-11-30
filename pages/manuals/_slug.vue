<template>
  <div>
    {{ manual }}
  </div>
</template>

<script>
export default {
  async asyncData({$strapi, params, redirect}) {
    const matchingManuals = await $strapi.find('manuals', {
      slug: params.slug
    })

    if (matchingManuals) {
      return {
        manual: matchingManuals[0]
      }
    }

    redirect('/')
  },
}
</script>
