<template>
  <section id="bottom-navigation" class="block md:hidden h-[5.5rem] fixed inset-x-0 bottom-0 z-10 bg-black shadow">
    <div class="absolute h-5.5rem top-[-6.5rem] w-full bg-black px-10 py-6 rounded-t-2xl" :class='{hidden: !this.searchOpen}'>
      <SearchBar v-if='manual' background-color="#FFFFFF" v-model='searchText' :selected-products='[manual.title]'></SearchBar>
    </div>
    <div id="tabs" class="flex justify-between h-full">
      <a v-for="menuItem in menuItems"
         href="#"
         class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 flex flex-col"
         :key="menuItem.label"
         :class='{"text-yellow": menuItem.active }'
         @click='menuItem.action'>
        <span class="mdi text-[3.5rem] mt-[-1.3rem]" :class="['mdi-' + menuItem.icon]"></span>
        <span class="tab block text-xs mt-[-1.5rem] text-white" :class='{"text-yellow": menuItem.active }'>{{ menuItem.label }}</span>
      </a>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchBar from "~/components/SearchBar/SearchBar";

export default {
  name: 'MobileNavbar',
  components: {SearchBar},
  data() {
    return {
      searchOpen: false,
      prevActive: false,
      nextActive: false,
      searchText: ''
    }
  },
  computed: {
    ...mapState('manual', ['manualMenuOpen']),
    menuItems() {
      return [
        {
          label: 'Menu',
          icon: 'menu',
          action: this.toggleMenu,
          active: this.manualMenuOpen
        },
        {
          label: 'Search',
          icon: 'magnify',
          action: () => { this.searchOpen = !this.searchOpen},
          active: this.searchOpen
        },
        {
          label: 'Prev.',
          icon: 'chevron-left',
          action: () => { this.prevActive = !this.prevActive},
          active: this.prevActive
        },
        {
          label: 'Next',
          icon: 'chevron-right',
          action: () => { this.nextActive = !this.nextActive},
          active: this.nextActive
        },
      ]
    }
  },
  methods: {
    ...mapMutations('manual' , ['toggleMenu'])
  }
}
</script>
