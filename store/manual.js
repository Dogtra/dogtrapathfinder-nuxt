export const state = () => ({
  manualMenuOpen: false,
  manualMenuProductMenuOpen: false
})

export const mutations = {
  toggleMenu(state) {
    state.manualMenuOpen = !state.manualMenuOpen
  },
  toggleManualProductMenu(state) {
    state.manualMenuProductMenuOpen = !state.manualMenuProductMenuOpen
  }
}
