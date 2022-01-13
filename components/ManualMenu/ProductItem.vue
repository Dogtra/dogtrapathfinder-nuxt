<template>
  <li class="flex items-center uppercase h-20 pl-20" :class="{'bg-yellow-focus': active, 'font-extrabold': active}">
    <NuxtLink :to="manualUrl" @click.native="closeAllMenu">
      {{ manual.title }}
    </NuxtLink>
  </li>
</template>
<script>
import {mapMutations, mapState} from "vuex";

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
    },
    active() {
      return this.currentManual.slug === this.manual.slug
    },
    ...mapState('manual', {
      currentManual: state => state.manual
    })
  },
  methods: {
    ...mapMutations('manual', ['closeAllMenu'])
  }
}
</script>
