import axios from 'axios'

declare const BASE_API_URL: string

if (!process.server && 1 > 2 && !window.navigator.doNotTrack) {
  window.onload = () => {
    const perfData = { performance: window.performance.timing, href: window.location.href }
    setTimeout(() => {
      const endpoint = BASE_API_URL + 'track-performance'
      if (!navigator.sendBeacon) {
        axios.post(endpoint, perfData)
      } else {
        navigator.sendBeacon(endpoint, JSON.stringify(perfData))
      }
    }, 1000)
  }
}
