<template>
  <nav class="navbar justify-between fixed top-0 w-full shadow-lg bg-black text-white h-[7.5rem] py-6 pl-8 pr-10 md:px-24 lg:px-36 z-30">
    <div class=''>
      <NuxtLink :to="localePath('/')" title='Dogtra Europe'>
        <img
class='logo img-responsive w-60'
             src='/images/pathfinder-logo.png' alt='Dogtra Europe'>
      </NuxtLink>
    </div>
    <div class='relative'>
      <span class="mdi mdi-menu text-[3rem] block md:hidden" @click='showMenu = !showMenu' />
      <div class='hidden md:flex'>
        <div class="relative group">
          <div class="btn btn-ghost text-18">
            {{ $t('main.manuals') }}
          </div>
          <div class="absolute hidden group-hover:flex flex-col text-black bg-yellow w-max rounded-btn">
            <NuxtLink v-for="manual in manuals" :key="manual.documentId" :to="localePath('/manuals/' + manual.slug)" class="btn btn-ghost">
              {{ manual.title }}
            </NuxtLink>
          </div>
        </div>
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
        <SearchBar v-model='searchText' background-color="#ffffff" />
        <ul class="py-6 shadow-lg bg-black uppercase text-18 font-semibold">
          <li class="border-b-2 border-white flex flex-col items-center" @click="mobileManualMenuOpen = !mobileManualMenuOpen">
            <div class="flex justify-between w-full items-center">
              <span>
                {{ $t('main.manuals') }}
              </span>
              <span class="mdi mdi-chevron-down text-[2.8rem]" :class="{hidden: mobileManualMenuOpen}" />
              <span class="mdi mdi-chevron-up text-[2.8rem]" :class="{hidden: !mobileManualMenuOpen}" />
            </div>
            <ul class="w-full pl-12 list-disc" :class="{hidden: !mobileManualMenuOpen}">
              <li v-for="manual in manuals" :key="manual.documentId" class="p-3">
                <NuxtLink :to="localePath('/manuals/' + manual.slug)"  @click='hideMenu'>
                  {{ manual.title }}
                </NuxtLink>
              </li>
            </ul>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/products')" @click='hideMenu'>
              {{ $t('main.products') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/videos')" @click='hideMenu'>
              {{ $t('main.videos') }}
            </NuxtLink>
          </li>
          <li class="border-b-2 border-white h-20 flex items-center">
            <NuxtLink :to="localePath('/faq')" @click='hideMenu'>
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

<script setup lang="ts">
import SearchBar from '~/components/SearchBar/SearchBar.vue'
import LanguageSelector from '~/components/Navbar/LanguageSelector.vue'

const manualStore = useManualStore()
const localePath = useLocalePath()
const manuals = computed(() => manualStore.manuals)
const showMenu = ref(false)
const searchText = ref('')
const mobileManualMenuOpen = ref(false)

function hideMenu() {
  showMenu.value = false
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
