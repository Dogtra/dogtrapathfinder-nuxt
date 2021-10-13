<template>
  <div class='h-screen bg-white'>
    <Navbar />
    <main>
      <Nuxt />
    </main>
    <DogtraFooter />
  </div>
</template>
<script>
import DogtraFooter from '~/components/Footer/DogtraFooter'
import Navbar from '~/components/Navbar/Navbar'

export default {
  components: { Navbar, DogtraFooter}
}
</script>
