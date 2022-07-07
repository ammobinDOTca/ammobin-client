export function getUrl(base, page, calibre) {
  let res = base
  if (page >= 1) {
    res += `?page=${page}`
  }
  if (calibre) {
    if (page >= 1) {
      res += '&'
    } else {
      res += '?'
    }
    res += `calibre=${calibre}`
  }
  return res
}

export function updateUrl(title, page, calibre) {
  history.pushState({}, title, getUrl(window.location.pathname, page, calibre))
}

export function isCrawler(req) {
  // let userAgent = 'No user agent (generated)'
  // if (req && req.headers['user-agent']) {
  //   userAgent = req.headers['user-agent']
  // } else if (typeof navigator !== 'undefined' && navigator.userAgent) {
  //   userAgent = navigator.userAgent
  // }

  // return [
  //   'Googlebot',
  //   'Bingbot',
  //   'Slurp',
  //   'DuckDuckBot',
  //   'Yandex',
  //   'w3m', // let elite haxors see all content b/c they are too cool for JS
  // ].some(bot => userAgent.indexOf(bot) >= 0)
  return false
}

export function provinceCodeToName(code) {
  // todo implement
  return code
}

declare const REGION: string

export function getCountry() {
  switch (REGION) {
    case 'CA':
      return 'Canada'
    case 'US':
      return 'USA'
    default:
      throw new Error('unknown region: ' + REGION)
  }
}

export function getNationality() {
  switch (REGION) {
    case 'CA':
      return 'Canadian'
    case 'US':
      return 'American'
    default:
      throw new Error('unknown region: ' + REGION)
  }
}
