<template>
  <div class='min-h-screen bg-white relative'>
    <Navbar />
    <main class='text-black mt-[7.5rem] pb-[40rem] md:pb-80'>
      <Nuxt />
    </main>
    <DogtraFooter />
  </div>
</template>
<script>
import DogtraFooter from '~/components/Footer/DogtraFooter'
import Navbar from '~/components/Navbar/Navbar'

export default {
  components: { Navbar, DogtraFooter},
  head: {
    htmlAttrs: {
      'data-theme': 'dogtra'
    }
  }
}
</script>
