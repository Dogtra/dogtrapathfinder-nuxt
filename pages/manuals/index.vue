<template>
  <div>
    MANUALS
    <template v-for='manual in manuals'>
      {{ manual.title }}
    </template>
  </div>
</template>

<script>
import manualsQuery from '~/apollo/queries/manual/manuals'

export default {
  data() {
    return {
      manuals: []
    }
  },
  apollo: {
    manuals: {
      query: manualsQuery,
      update: data => {
        return data.manuals
      }
    }
  }
}

</script>
