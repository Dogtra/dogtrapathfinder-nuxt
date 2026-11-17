<template>
  <section id="bottom-navigation" class="block md:hidden h-[5.5rem] fixed inset-x-0 bottom-0 bg-black shadow z-20">
    <div class="absolute top-[-6.5rem] w-full bg-black px-10 py-6 rounded-t-2xl" :class="{ hidden: !searchOpen }">
      <SearchBar v-if="manualStore.manual" v-model="searchText" background-color="#FFFFFF" :selected-products="[manualStore.manual.title]" />
    </div>
    <div id="tabs" class="flex justify-between h-full">
      <template v-for="menuItem in menuItems" :key="menuItem.label">
        <NuxtLink
          v-if="menuItem.to"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center text-center pt-2 pb-1 flex flex-col"
          :class="{ 'text-yellow': menuItem.active }"
          :to="localePath(menuItem.to)"
        >
          <span class="mdi text-[3.5rem] mt-[-1.3rem]" :class="['mdi-' + menuItem.icon]" />
          <span class="tab block text-xs mt-[-1.5rem] text-white" :class="{ 'text-yellow': menuItem.active }">{{ menuItem.label }}</span>
        </NuxtLink>
        <a
          v-else
          href="#"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center text-center pt-2 pb-1 flex flex-col"
          :class="{ 'text-yellow': menuItem.active }"
          @click.prevent="menuItem.action"
        >
          <span class="mdi text-[3.5rem] mt-[-1.3rem]" :class="['mdi-' + menuItem.icon]" />
          <span class="tab block text-xs mt-[-1.5rem] text-white" :class="{ 'text-yellow': menuItem.active }">{{ menuItem.label }}</span>
        </a>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchBar from '~/components/SearchBar/SearchBar.vue'

const manualStore = useManualStore()
const localePath = useLocalePath()
const searchOpen = ref(false)
const searchText = ref('')

const menuItems = computed(() => [
  { label: 'Chapters', icon: 'menu', action: () => manualStore.toggleMenu(), active: manualStore.manualMenuOpen, to: undefined },
  { label: 'Search', icon: 'magnify', action: () => { searchOpen.value = !searchOpen.value }, active: searchOpen.value, to: undefined },
  { label: 'Prev.', icon: 'chevron-left', action: () => {}, active: false, to: manualStore.previousArticleUrl },
  { label: 'Next', icon: 'chevron-right', action: () => {}, active: false, to: manualStore.nextArticleUrl },
])
</script>
