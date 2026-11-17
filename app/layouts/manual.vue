<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main class="text-black md:flex pt-[7.5rem] pb-[5.5rem] md:pb-0">
      <ManualMenu />
      <div id="manual-wrapper" class="flex-grow md:ml-[35rem] md:max-w-[calc(100%-35rem)]">
        <slot />
      </div>
    </main>
    <MobileNavbar />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar/Navbar.vue'
import MobileNavbar from '~/components/ManualMenu/MobileNavbar.vue'
import ManualMenu from '~/components/ManualMenu/index.vue'
</script>
