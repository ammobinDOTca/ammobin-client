import { isCrawler } from '~/helpers'

export const state = () => ({
  isCrawler: undefined,
  locales: ['en', 'fr'],
  locale: 'en',
})

export const mutations = {
  setCrawler(state, val) {
    return (state.isCrawler = val)
  },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    commit('setCrawler', isCrawler(req))
  },
}
