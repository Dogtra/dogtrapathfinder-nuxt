<template>
  <div class="flex relative justify-center items-center">
    <div class="flex" @click="showLanguageSelector = !showLanguageSelector">
      <span class="mdi mdi-web text-22" />
      <img class="w-10 ml-2" :src="getLocalFlag(locale)" :alt="locale">
    </div>
    <div v-show="showLanguageSelector" class="absolute top-20 left-0 rounded-btn bg-white text-black shadow-lg">
      <NuxtLink class="p-4 hover:bg-gray-400 rounded-btn rounded-b-none flex w-full mr-16" :to="switchLocalePath('en')" @click="clickSelector">
        <NuxtImg width="25" :src="getLocalFlag('en')" alt="English" /><span class="block ml-4">English</span>
      </NuxtLink>
      <NuxtLink class="p-4 hover:bg-gray-400 rounded-btn rounded-t-none flex w-full mr-16" :to="switchLocalePath('fr')" @click="clickSelector">
        <NuxtImg width="25" :src="getLocalFlag('fr')" alt="Français" /><span class="block ml-4">Français</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ hideMenu: () => void }>()

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const showLanguageSelector = ref(false)

function clickSelector() {
  showLanguageSelector.value = false
  props.hideMenu()
}

function getLocalFlag(code: string) {
  return code === 'fr' ? '/images/flags/fr.svg' : '/images/flags/us.svg'
}
</script>
