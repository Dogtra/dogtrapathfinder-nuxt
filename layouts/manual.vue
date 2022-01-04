<template>
  <div class='min-h-screen bg-white'>
    <Navbar />
    <main class='text-black'>
      <Nuxt />
    </main>
    <DogtraFooter />
    <MobileNavbar/>
  </div>
</template>
<script>
import DogtraFooter from '~/components/Footer/DogtraFooter'
import Navbar from '~/components/Navbar/Navbar'
import MobileNavbar from "~/components/Navbar/MobileNavbar";

export default {
  components: {MobileNavbar, Navbar, DogtraFooter},
  head: {
    htmlAttrs: {
      'data-theme': 'dogtra'
    }
  }
}
</script>
