declare module 'vue-select' {
  import type { DefineComponent } from 'vue'

  const VueSelect: DefineComponent<any, any, any>
  export default VueSelect
}

declare module 'vue-instantsearch/vue3/es' {
  export const AisConfigure: any
  export const AisHits: any
  export const AisInstantSearch: any
  export const AisStats: any
}
