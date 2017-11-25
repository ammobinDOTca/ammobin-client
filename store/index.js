import Vuex from 'vuex'
import { isCrawler } from '~/helpers';

const createStore = () => {
  return new Vuex.Store({
    state: {
      isCrawler: undefined,
      locales: ['en', 'fr'],
      locale: 'en'
    },
    mutations: {
      setCrawler(state, val) {
        return state.isCrawler = val;
      },
      SET_LANG(state, locale) {
        console.log('SET_LANG',locale)
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        commit('setCrawler', isCrawler(req))
      }
    }
  })
}

export default createStore
