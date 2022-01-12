<template>
  <div class='min-h-screen bg-white'>
    <Navbar />
    <main class='text-black md:flex'>
      <ManualMenu></ManualMenu>
      <div id="manual-wrapper" class="flex-grow">
        <Nuxt />
        <DogtraFooter />
      </div>
    </main>
    <MobileNavbar/>
  </div>
</template>

<script>
import DogtraFooter from '~/components/Footer/DogtraFooter'
import Navbar from '~/components/Navbar/Navbar'
import MobileNavbar from "~/components/Navbar/MobileNavbar";
import ManualMenu from "~/components/ManualMenu";

export default {
  components: {ManualMenu, MobileNavbar, Navbar, DogtraFooter},
  head: {
    htmlAttrs: {
      'data-theme': 'dogtra'
    }
  },
}
</script>
