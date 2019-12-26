import axios from 'axios'
declare const BASE_API_URL: string

// track page changes
export default function ({ route }) {
  const pageView = JSON.stringify({
    route: route.path
  })
  const endpoint = 'track-pageview'
  if (!navigator || !navigator.sendBeacon) {
    setImmediate(() => axios.post(BASE_API_URL + endpoint, pageView))
  } else {
    navigator.sendBeacon(BASE_API_URL + endpoint, pageView)
  }
}
