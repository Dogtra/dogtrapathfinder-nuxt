<template>
  <div>
    {{ article }}
  </div>
</template>

<script>
export default {
  async asyncData({$strapi, params, redirect}) {
    const matchingArticles = await $strapi.find('articles',{
      uuid: params.uuid
    })

    // const matchingManuals = await $strapi.find('manuals', {
    //   slug: params.slug
    // })

    if (matchingArticles) {
      return {
        article: matchingArticles[0],
      };
    }

    // redirect('/')
  },
}
</script>
