<template>
  <section id='bottom-navigation' class='block md:hidden h-[5.5rem] fixed inset-x-0 bottom-0 z-10 bg-black shadow z-20'>
    <div class='absolute h-5.5rem top-[-6.5rem] w-full bg-black px-10 py-6 rounded-t-2xl'
         :class='{hidden: !searchOpen}'>
      <SearchBar v-if='manual' v-model='searchText' background-color='#FFFFFF'
                 :selected-products='[manual.title]'></SearchBar>
    </div>
    <div id='tabs' class='flex justify-between h-full'>
      <template v-for='menuItem in menuItems'>
        <NuxtLink
          v-if='menuItem.to'
          :key='menuItem.label'
          href='#'
          class='w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 flex flex-col'
          :class='{"text-yellow": menuItem.active }'
          :to='localePath(menuItem.to)'
        >
          <span class='mdi text-[3.5rem] mt-[-1.3rem]' :class="['mdi-' + menuItem.icon]"></span>
          <span class='tab block text-xs mt-[-1.5rem] text-white'
                :class='{"text-yellow": menuItem.active }'>{{ menuItem.label }}</span>
        </NuxtLink>
        <a
          v-else
          :key='menuItem.label'
          href='#'
          class='w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 flex flex-col'
          :class='{"text-yellow": menuItem.active }'
          @click='menuItem.action'
        >
          <span class='mdi text-[3.5rem] mt-[-1.3rem]' :class="['mdi-' + menuItem.icon]"></span>
          <span class='tab block text-xs mt-[-1.5rem] text-white'
                :class='{"text-yellow": menuItem.active }'>{{ menuItem.label }}</span>
        </a>
      </template>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import SearchBar from '~/components/SearchBar/SearchBar'

export default {
  name: 'MobileNavbar',
  components: { SearchBar },
  data() {
    return {
      searchOpen: false,
      prevActive: false,
      nextActive: false,
      searchText: ''
    }
  },
  computed: {
    ...mapState('manual', [
      'manual',
      'manualMenuOpen'
    ]),
    ...mapGetters('manual', [
      'previousArticleUrl',
      'nextArticleUrl'
    ]),
    menuItems() {
      return [
        {
          label: 'Chapters',
          icon: 'menu',
          action: this.toggleMenu,
          active: this.manualMenuOpen,
          to: false
        },
        {
          label: 'Search',
          icon: 'magnify',
          action: () => { this.searchOpen = !this.searchOpen },
          active: this.searchOpen,
          to: false
        },
        {
          label: 'Prev.',
          icon: 'chevron-left',
          action: () => {
            this.prevActive = !this.prevActive
          },
          active: this.prevActive,
          to: this.previousArticleUrl
        },
        {
          label: 'Next',
          icon: 'chevron-right',
          action: () => {
            this.nextActive = !this.nextActive
          },
          active: this.nextActive,
          to: this.nextArticleUrl
        }
      ]
    }
  },
  methods: {
    ...mapMutations('manual', ['toggleMenu'])
  }
}
</script>
