<template>
  <div class='min-h-screen bg-white'>
    <Navbar />
    <main class='text-black md:flex mt-[7.5rem]'>
      <ManualMenu></ManualMenu>
      <div id="manual-wrapper" class="flex-grow md:ml-[35rem]">
        <Nuxt keep-alive :keep-alive-props="{ exclude: ['ManualMenu'] }" />
      </div>
    </main>
    <MobileNavbar/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar/Navbar'
import MobileNavbar from "~/components/ManualMenu/MobileNavbar";
import ManualMenu from "~/components/ManualMenu";

export default {
  components: {ManualMenu, MobileNavbar, Navbar},
  head: {
    htmlAttrs: {
      'data-theme': 'dogtra'
    }
  },
}
</script>
