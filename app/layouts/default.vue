<template>
  <div class="min-h-screen bg-white relative">
    <Navbar />
    <main class="text-black mt-[7.5rem] pb-[40rem] md:pb-80">
      <slot />
    </main>
    <DogtraFooter />
  </div>
</template>

<script setup lang="ts">
import DogtraFooter from '~/components/Footer/DogtraFooter.vue'
import Navbar from '~/components/Navbar/Navbar.vue'
</script>
