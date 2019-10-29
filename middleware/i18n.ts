export default function({ isHMR, app, store, route, params, error, redirect, res }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }
  // Get locale from params. hack home page picking up lang
  const locale = route.path === '/fr/' ? 'fr' : params.LANG || 'en'

  // todo: set lang to users current accept-lang header (if param not set)
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language

  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }

  if (process.server) {
    res.setHeader('Content-Language', `${locale}-CA`)
  }

  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // If route is /en/... -> redirect to /...
  if (locale === 'en' && route.fullPath.indexOf('/en') === 0) {
    return redirect(route.fullPath.replace(/^\/en/, '/'))
  }
}
