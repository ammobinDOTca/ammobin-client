import axios from 'axios'
declare const BASE_API_URL: string

// track page changes
export default function({ route }) {
  // dont track server side page changes...
  if (process.server || window.navigator.doNotTrack) {
    return
  }

  try {
    const pageView = JSON.stringify({
      route: route.path,
    })
    const endpoint = 'track-pageview'
    if (typeof navigator === 'undefined' || !navigator.sendBeacon) {
      setImmediate(() =>
        axios.post(BASE_API_URL + endpoint, pageView).catch(e => console.error('axios track page view failed', e))
      )
    } else {
      navigator.sendBeacon(BASE_API_URL + endpoint, pageView)
    }
  } catch (e) {
    console.error('failed to track page change', e)
  }
}
