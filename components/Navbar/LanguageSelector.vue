<template>
  <div class='flex relative justify-center items-center'>
    <div class='flex' @click='showLanguageSelector = !showLanguageSelector'>
      <span class='mdi mdi-web text-22'></span>
      <img class='w-10 ml-2' :src='getLocalFlag(currentLocale)' :alt='currentLocale' />
    </div>
    <div v-show='showLanguageSelector' class='absolute top-20 left-0 rounded-btn bg-white text-black shadow-lg'>
      <NuxtLink class='block p-4 hover:bg-gray-400 rounded-btn rounded-b-none flex w-full mr-16'
                :to="switchLocalePath('en')" @click.native='clickSelector'>
        <NuxtImg width='25' :src='getLocalFlag("en")' alt='English' /><span class='block ml-4'>English</span>
      </NuxtLink>
      <NuxtLink class='block p-4 hover:bg-gray-400 rounded-btn rounded-t-none flex w-full mr-16'
                :to="switchLocalePath('fr')" @click.native='clickSelector'>
        <NuxtImg width='25' :src='getLocalFlag("fr")' alt='Français' /><span class='block ml-4'>Français</span>
      </NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LanguageSelector',
  props: {
    hideMenu: {
      type: Function,
      required: true
    }
  },
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
    clickSelector() {
      this.showLanguageSelector = false
      this.hideMenu()
    },
    getLocalFlag(locale) {
      if (locale === 'fr') {
        return "/images/flags/" + locale + ".svg"
      }

      return "/images/flags/us.svg";
    },
  }
}
</script>
