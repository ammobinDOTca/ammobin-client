export default function ({ isHMR, app, store, route, params, error, redirect, res }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }
  // Get locale from params. hack home page picking up lang
  let locale = route.path === '/fr/' ? 'fr' : params.LANG || 'en'

  // todo: set lang to users current accept-lang header (if param not set)
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language

  if (store.state.locales.indexOf(locale) === -1) {
    //return error({ message: 'This page could not be found.', statusCode: 404 })
    locale = 'en'
  }

  // if running on server (and not part of nuxt generate)
  if (process.server && res) {
    res.setHeader('Content-Language', `${locale}-CA`)
  }

  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // If route is /en/... -> redirect to /...
  if (locale === 'en' && route.fullPath.indexOf('/en') === -1) {
    return redirect('/en' + route.fullPath)
  }
}
