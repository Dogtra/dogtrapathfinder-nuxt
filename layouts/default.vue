<template>
  <div class='min-h-screen bg-white'>
    <Navbar />
    <main class='text-black'>
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
