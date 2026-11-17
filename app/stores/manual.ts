import { defineStore } from 'pinia'


export interface ManualArticle {
  documentId: string
  uuid: string
  title: string
  [key: string]: any
}

export interface Manual {
  documentId: string
  slug: string
  title: string
  hidden?: boolean | null
  chapters?: { documentId: string, articles: ManualArticle[], [key: string]: any }[]
  [key: string]: any
}

/** Neighbouring article URL, or the manual index at either end (as in the former Vuex getters). */
function siblingArticleUrl(manual: Manual | null, sibling: ManualArticle | undefined, hasArticle: boolean) {
  if (!hasArticle || !manual) return undefined
  const manualUrl = `/manuals/${manual.slug}`
  return sibling ? `${manualUrl}/${sibling.uuid}` : manualUrl
}

export const useManualStore = defineStore('manual', {
  state: () => ({
    manual: null as Manual | null,
    manuals: [] as Manual[],
    manualMenuOpen: false,
    manualMenuProductMenuOpen: false,
    /** uuid of the article being displayed (manual or video article), if any. */
    articleUuid: null as string | null,
  }),
  getters: {
    allArticles(state): ManualArticle[] {
      return state.manual?.chapters?.flatMap(chapter => chapter.articles) ?? []
    },
    currentArticleIndex(state): number {
      return this.allArticles.findIndex(article => article.uuid === state.articleUuid)
    },
    previousArticleUrl(state): string | undefined {
      return siblingArticleUrl(state.manual, this.allArticles[this.currentArticleIndex - 1], !!state.articleUuid)
    },
    nextArticleUrl(state): string | undefined {
      return siblingArticleUrl(state.manual, this.allArticles[this.currentArticleIndex + 1], !!state.articleUuid)
    },
  },
  actions: {
    setManual(manual: Manual) {
      this.manual = manual
    },
    setManuals(manuals: Manual[]) {
      this.manuals = manuals
    },
    setArticleUuid(uuid: string | null) {
      this.articleUuid = uuid
    },
    toggleMenu() {
      this.manualMenuOpen = !this.manualMenuOpen
    },
    toggleManualProductMenu() {
      this.manualMenuProductMenuOpen = !this.manualMenuProductMenuOpen
    },
    closeAllMenu() {
      this.manualMenuOpen = false
      this.manualMenuProductMenuOpen = false
    },
  },
})
