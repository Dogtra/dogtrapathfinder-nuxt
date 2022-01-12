export const state = () => ({
  manual: null,
  manualMenuOpen: false,
  manualMenuProductMenuOpen: false
})

export const mutations = {
  setManual(state, manual) {
    state.manual = manual
  },
  toggleMenu(state) {
    state.manualMenuOpen = !state.manualMenuOpen
  },
  toggleManualProductMenu(state) {
    state.manualMenuProductMenuOpen = !state.manualMenuProductMenuOpen
  }
}
