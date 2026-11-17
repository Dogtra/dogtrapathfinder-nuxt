import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // CMS responses are loosely typed GraphQL JSON.
    '@typescript-eslint/no-explicit-any': 'off',
    // Every v-html value goes through sanitizeHtml()/renderMarkdown() (DOMPurify).
    'vue/no-v-html': 'off',
  },
}, {
  files: ['app/pages/search/index.vue'],
  // AisConfigure forwards $attrs verbatim as Algolia/Meilisearch search parameters.
  rules: { 'vue/attribute-hyphenation': 'off' },
})
