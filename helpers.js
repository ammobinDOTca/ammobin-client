
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