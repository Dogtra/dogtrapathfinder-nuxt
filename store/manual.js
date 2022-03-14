import orderBy from 'lodash/orderBy'

export const state = () => ({
  manual: null,
  manuals: [],
  manualMenuOpen: false,
  manualMenuProductMenuOpen: false,
  article: null
})

export const mutations = {
  setManual(state, manual) {
    const chapters = manual.chapters.map(chapter => {
      chapter.articles = orderBy(chapter.articles, 'order')
      return chapter
    })
    manual.chapters = orderBy(chapters, 'order');
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
  setArticle(state, article) {
    state.article = article
  }
}


export const getters = {
  allArticles(state) {
    if (!state.manual) {
      return []
    }
    return state.manual.chapters.flatMap(chapter => chapter.articles)
  },
  currentArticleIndex(state, getters) {
    if (!state.article) {
      return
    }
    return getters.allArticles.findIndex(article => article.id === state.article.id)
  },
  previousArticleUrl(state, getters) {
    if (!state.article) {
      return
    }
    if (!getters.allArticles[getters.currentArticleIndex - 1]) {
      return '/manuals/' + state.manual.slug
    }
    return '/manuals/' + state.manual.slug + '/' + getters.allArticles[getters.currentArticleIndex - 1].uuid
  },
  nextArticleUrl(state, getters) {
    if (!state.article) {
      return
    }
    if (!getters.allArticles[getters.currentArticleIndex + 1]) {
      return '/manuals/' + state.manual.slug
    }
    return '/manuals/' + state.manual.slug + '/' + getters.allArticles[getters.currentArticleIndex + 1].uuid
  }
}
