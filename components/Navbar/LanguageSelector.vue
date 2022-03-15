<template>
  <div class='flex relative justify-center items-center'>
    <div class='flex' @click='showLanguageSelector = !showLanguageSelector'>
      <span class='mdi mdi-web text-22'></span>
      <img class='w-10 ml-2' :src='getLocalFlag(currentLocale)' :alt='currentLocale' />
    </div>
    <div v-show='showLanguageSelector' class='absolute top-20 rounded-btn bg-white text-black'>
      <NuxtLink class='block p-4 hover:bg-gray-400 rounded-btn rounded-b-none flex w-max w-full'
                :to="switchLocalePath('en')" @click.native='showLanguageSelector = false'>
        <NuxtImg width='25' :src='getLocalFlag("en")' alt='English' /><span class='block ml-4'>English</span>
      </NuxtLink>
      <NuxtLink class='block p-4 hover:bg-gray-400 rounded-btn rounded-t-none flex w-max w-full'
                :to="switchLocalePath('fr')" @click.native='showLanguageSelector = false'>
        <NuxtImg width='25' :src='getLocalFlag("fr")' alt='Français' /><span class='block ml-4'>Français</span>
      </NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LanguageSelector',
  data() {
    return {
      showLanguageSelector: false,
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
  },
  methods: {
    getLocalFlag(locale) {
      if (locale === 'fr') {
        return "/images/flags/" + locale + ".svg"
      }

      return "/images/flags/us.svg";
    },
  }
}
</script>
