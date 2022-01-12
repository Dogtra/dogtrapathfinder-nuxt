<template>
  <li>
    <NuxtLink :to="manualUrl" @click.native="closeAllMenu">
      {{ manual.title }}
    </NuxtLink>
  </li>
</template>
<script>
import {mapMutations} from "vuex";

export default {
  name: 'ManualMenuProductItem',
  props: {
    manual: {
      type: Object,
      required: true
    }
  },
  computed: {
    manualUrl() {
      return '/manuals/' + this.manual.slug
    }
  },
  methods: {
    ...mapMutations('manual', ['closeAllMenu'])
  }
}
</script>
