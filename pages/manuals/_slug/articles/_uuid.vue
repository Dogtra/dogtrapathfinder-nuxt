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



    if (matchingArticles) {
      const article = matchingArticles[0];

      const manual = await $strapi.findOne('manuals', article.chapter.manual)

      if (manual.slug === params.slug) {

        return {
          article,
          manual
        };
      }
    }

    redirect('/')
  },
}
</script>
