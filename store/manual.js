export const state = () => ({
  manual: null,
  manuals: [],
  manualMenuOpen: false,
  manualMenuProductMenuOpen: false
})

export const mutations = {
  setManual(state, manual) {
    state.manual = manual
  },
  setManuals(state, manuals) {
    state.manuals = manuals
  },
  toggleMenu(state) {
    state.manualMenuOpen = !state.manualMenuOpen
  },
  toggleManualProductMenu(state) {
    state.manualMenuProductMenuOpen = !state.manualMenuProductMenuOpen
  },
  closeAllMenu(state) {
    state.manualMenuOpen = false
    state.manualMenuProductMenuOpen = false
  },
}
