<template>
  <nav id="side-navbar" class="fixed w-0 md:w-[35rem] h-full min-h-screen bg-black z-10 top-[7.5rem]" :class="manualMenuClass" :style="manualMenuStyle">
    <div v-if="$breakpoints.lMd" class='manual-menu-desktop-wrapper h-full hidden md:block'>
      <ManualMenuContent/>
    </div>
    <div v-else v-show="manualMenuOpen" class='manual-menu-mobile-wrapper block md:hidden h-full w-full bg-black text-white absolute'>
      <ManualMenuContent/>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
import ManualMenuContent from "~/components/ManualMenu/Content";

export default {
  name: 'ManualMenu',
  components: {ManualMenuContent },
  computed: {
    ...mapState('manual', ['manualMenuOpen', 'manual']),
    manualMenuClass() {
      return {
        'manual-menu-open': this.manualMenuOpen
      }
    },
    manualMenuStyle() {
      return {
        position: this.manualMenuOpen || this.$breakpoints.lMd ? 'sticky' : 'absolute'
      }
    }
  },
}
</script>

<style scoped>
#side-navbar.manual-menu-open {
  width: 100%;
}
</style>
