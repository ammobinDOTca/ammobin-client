// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
//ie: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5
function getPreferredLang(acceptLangs: string = ''): 'en' | 'fr' {
  const mainLangs = acceptLangs
    .split(';')[0]
    .split(',')
    .map(s => s.split('-')[0].toLowerCase())
  const enIndex = mainLangs.indexOf('en')
  const frIndex = mainLangs.indexOf('fr')
  // if fr is present, and it comes before en OR en is not set
  // user probably wants fr, give it to them
  if (frIndex !== -1 && (frIndex < enIndex || enIndex === -1)) {
    return 'fr'
  } else {
    return 'en'
  }
}

export default function({ isHMR, app, store, route, params, error, redirect, req, res }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }
  let lang = 'en'
  if (params.LANG) {
    lang = params.LANG
  } else if (process.server && req) {
    lang = getPreferredLang(req.headers['Accept-Language'])
  }

  // Get locale from params. hack home page picking up lang
  let locale = route.path.startsWith('/fr') ? 'fr' : 'en'

  // todo: set lang to users current accept-lang header (if param not set)
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language

  if (store.state.locales.indexOf(locale) === -1) {
    //return error({ message: 'This page could not be found.', statusCode: 404 })
    locale = 'en'
  }

  if (process.server && res) {
    res.setHeader('Content-Language', `${locale}-CA`)
  }

  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // If route is /en/... -> redirect to /...
  // leave route alone (need it for generate command and new visitors), will default to english
  if (locale === 'en' && !route.fullPath.startsWith('/en') && route.fullPath !== '/') {
    return redirect('/en' + route.fullPath)
  }
}
