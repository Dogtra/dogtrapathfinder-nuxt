<template>
  <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 bg-black shadow">
    <div id="tabs" class="flex justify-between">
      <a href="#"
         class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <i class="yi-menu"></i>
        <span class="tab tab-home block text-xs">Menu</span>
      </a>
      <a href="#"
         class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <i class="yi-search"></i>
        <span class="tab tab-kategori block text-xs">Category</span>
      </a>
      <a href="#"
         class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <i class="yi-arrow-left"></i>
        <span class="tab tab-explore block text-xs">Explore</span>
      </a>
      <a href="#"
         class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <i class="yi-arrow-right"></i>
        <span class="tab tab-whishlist block text-xs">Whishlist</span>
      </a>
    </div>
  </section>
</template>
<script>
export default {
  name: 'MobileNavbar'
}
</script>