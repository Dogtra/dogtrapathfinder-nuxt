<template>
  <nav v-show="manualMenuOpen || $breakpoints.lMd" id="side-navbar" class="fixed w-full md:w-[35rem] h-[calc(100%-7.5rem)] min-h-[calc(100%-7.5rem)] bg-black z-10 top-[7.5rem]" :class="manualMenuClass">
    <div v-if="$breakpoints.lMd" class='manual-menu-desktop-wrapper h-full hidden md:block'>
      <ManualMenuContent/>
    </div>
    <div v-else v-show="manualMenuOpen" class='manual-menu-mobile-wrapper block md:hidden h-[calc(100%-5.5rem)] w-full bg-black text-white absolute'>
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
        'w-full': this.manualMenuOpen
      }
    },
  },
}
</script>
