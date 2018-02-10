
export function getUrl(base, page, calibre) {
  let res = base;
  if (page >= 1) {
    res += `?page=${page}`;
  }
  if (calibre) {
    if (page >= 1) {
      res += '&';
    } else {
      res += '?';
    }
    res += `calibre=${calibre}`
  }
  return res;
}

export function updateUrl(title, page, calibre) {
  history.pushState({}, title, getUrl(window.location.pathname, page, calibre));
}

export function isCrawler(req) {
  const userAgent = (req ? req.headers['user-agent'] : (typeof navigator !== 'undefined' ? navigator.userAgent : 'No user agent (generated)'));

  return [
    'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Yandex',
    'w3m' // let elite haxors see all content b/c they are too cool for JS
  ].some(bot => userAgent.indexOf(bot) >= 0);
}
