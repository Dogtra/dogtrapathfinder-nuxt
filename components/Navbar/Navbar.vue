<template>
  <nav class="navbar fixed top-0 w-full shadow-lg bg-black text-white h-[7.5rem] md:h-auto py-6 pl-8 pr-10 md:px-24 lg:px-36 z-10">
    <div class='navbar-start'>
      <NuxtLink :to="localePath('/')" title='Dogtra Europe'>
        <img class='logo img-responsive w-60'
             :src='require("~/static/images/pathfinder-logo.png")' alt='Dogtra Europe'>
      </NuxtLink>
    </div>
    <div class='navbar-end relative'>
      <span class="mdi mdi-menu text-[3rem] block md:hidden" @click='showMenu = !showMenu'></span>
      <div class='hidden md:block'>
        <NuxtLink :to="localePath('/manuals')" class="btn btn-ghost text-18">
          {{ $t('main.manuals') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/products')" class="btn btn-ghost text-18">
          {{ $t('main.products') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/content')" class="btn btn-ghost text-18">
          {{ $t('main.videos') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/faq')" class="btn btn-ghost text-18">
          FAQ
        </NuxtLink>
      </div>
    </div>
    <transition name='slide-fade'>
      <div v-show='showMenu' class="fixed inset-0 bottom-24 min-h-[calc(100%-7.5rem)] mt-[7.5rem] bg-black w-full block md:hidden px-12 py-4 text-18">
        <SearchBar v-model='searchText' :background-color="'#ffffff'"></SearchBar>
        <ul class="py-6 shadow-lg bg-black uppercase text-18 font-semibold">
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/manuals')" @click.native='showMenu = false'>
              {{ $t('main.manuals') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/products')" @click.native='showMenu = false'>
              {{ $t('main.products') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/content')" @click.native='showMenu = false'>
              {{ $t('main.videos') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/faq')" @click.native='showMenu = false'>
              FAQ
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script>
import SearchBar from "~/components/SearchBar/SearchBar";
export default {
  name: 'Navbar',
  components: {SearchBar},
  data() {
    return {
      showMenu: false,
      searchText: ''
    }
  }
}
</script>

<style>
.btn {
  height: 3em;
  font-size: .875em;
  line-height: 1.25em;
  padding-left: 1em;
  padding-right: 1em;
  min-height: 3em;
}
</style>
