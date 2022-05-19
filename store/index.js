import manualsQuery from '~/apollo/queries/manual/manuals'

export const actions = {
  async nuxtServerInit({ commit }) {
    const { data } = await this.app.apolloProvider.defaultClient.query({
        query: manualsQuery
      })

  commit('manual/setManuals', data.manuals)
}
}