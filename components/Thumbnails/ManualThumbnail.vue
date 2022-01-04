<template>
  <div>
    <NuxtLink :to='manualLink'>
      {{ manual.title }}
      {{manual}}
    </NuxtLink>
  </div>
</template>
<script>
export default {
  name: 'ManualThumbnail',
  props: {
    manual: {
      type: Object,
      required: true
    }
  },
  computed: {
    manualLink() {
      return '/manuals/' + this.manual.slug
    }
  }
}
</script>
