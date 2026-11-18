<template>
  <!-- Always visible from md up; on mobile only while the "Chapters" menu is open. -->
  <nav
    id="side-navbar"
    class="z-20 fixed w-full md:w-[35rem] h-[calc(100%-7.5rem)] min-h-[calc(100%-7.5rem)] bg-black top-[7.5rem]"
    :class="manualStore.manualMenuOpen ? 'block' : 'hidden md:block'"
  >
    <div class="manual-menu-desktop-wrapper h-full hidden md:block">
      <ManualMenuContent />
    </div>
    <div v-if="manualStore.manualMenuOpen" class="manual-menu-mobile-wrapper block md:hidden h-[calc(100%-5.5rem)] w-full bg-black text-white absolute">
      <ManualMenuContent />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ManualMenuContent from '~/components/ManualMenu/Content.vue'

const manualStore = useManualStore()
</script>
