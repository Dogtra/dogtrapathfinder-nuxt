<template>
  <nav class="navbar justify-between fixed top-0 w-full shadow-lg bg-black text-white h-[7.5rem] py-6 pl-8 pr-10 md:px-24 lg:px-36 z-20">
    <div class=''>
      <NuxtLink :to="localePath('/')" title='Dogtra Europe'>
        <img class='logo img-responsive w-60'
             :src='require("~/static/images/pathfinder-logo.png")' alt='Dogtra Europe'>
      </NuxtLink>
    </div>
    <div class='relative'>
      <span class="mdi mdi-menu text-[3rem] block md:hidden" @click='showMenu = !showMenu'></span>
      <div class='hidden md:flex'>
        <NuxtLink :to="localePath('/manuals')" class="btn btn-ghost text-18">
          {{ $t('main.manuals') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/products')" class="btn btn-ghost text-18">
          {{ $t('main.products') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/videos')" class="btn btn-ghost text-18">
          {{ $t('main.videos') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/faq')" class="btn btn-ghost text-18">
          FAQ
        </NuxtLink>
        <div class='btn btn-ghost'>
          <LanguageSelector :hide-menu='hideMenu' />
        </div>
      </div>
    </div>
    <transition name='slide-fade'>
      <div v-show='showMenu' class="fixed inset-0 bottom-24 min-h-[calc(100%-7.5rem)] mt-[7.5rem] bg-black w-full block md:hidden px-12 py-4 text-18">
        <SearchBar v-model='searchText' :background-color="'#ffffff'"></SearchBar>
        <ul class="py-6 shadow-lg bg-black uppercase text-18 font-semibold">
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/manuals')" @click.native='hideMenu'>
              {{ $t('main.manuals') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/products')" @click.native='hideMenu'>
              {{ $t('main.products') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/videos')" @click.native='hideMenu'>
              {{ $t('main.videos') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/faq')" @click.native='hideMenu'>
              FAQ
            </NuxtLink>
          </li>
          <li class='border-b-2 border-white h-20 flex items-center'>
            <LanguageSelector :hide-menu='hideMenu' />
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script>
import SearchBar from '~/components/SearchBar/SearchBar'
import LanguageSelector from '~/components/Navbar/LanguageSelector'

export default {
  name: 'Navbar',
  components: { LanguageSelector, SearchBar},
  data() {
    return {
      showMenu: false,
      searchText: ''
    }
  },
  methods: {
    hideMenu() {
      this.showMenu = false
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
