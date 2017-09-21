import Vuex from 'vuex'
import { isCrawler } from '~/helpers';
const createStore = () => {
  return new Vuex.Store({
    state: {
      isCrawler: undefined
    },
    mutations: {
      setCrawler(state, val) {
        console.log(state, val)
        return state.isCrawler = val;
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