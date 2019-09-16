import axios from 'axios'

declare const BASE_API_URL: string

/**
 * send un-caught client side errors to back to server...
 */
if (!process.server) {
  window.onerror = function(msg, url, lineNo, columnNo, error) {
    const message = JSON.stringify({
      msg,
      url,
      lineNo,
      columnNo,
      error: JSON.stringify(error),
    })
    const endpoint = BASE_API_URL + 'errors'

    if (!navigator.sendBeacon) {
      axios.post(endpoint, message)
    } else {
      navigator.sendBeacon(endpoint, message)
    }

    return false
  }
}
