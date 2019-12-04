import { isCrawler } from '~/helpers'

const DEFAULT_STATE = {
  isCrawler: undefined as boolean,
  locales: ['en', 'fr'],
  locale: 'en' as string,
  graphql: {
    vendors: null as {}[],
    flatItems: new Map<string, any>()
  }
}
export const state = () => (DEFAULT_STATE)

declare type IState = typeof DEFAULT_STATE

export const mutations = {
  setCrawler(state: IState, val: boolean) {
    return (state.isCrawler = val)
  },
  SET_LANG(state: IState, locale: string) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  setVendors(state: IState, vendors: any[]) {
    state.graphql.vendors = vendors
  },
  setFlatItems(state: IState, query: string, flatItems: any) {
    state.graphql.flatItems.set(query, flatItems)
  }

}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    commit('setCrawler', isCrawler(req))
  }
}
