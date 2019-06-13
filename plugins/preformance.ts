import axios from 'axios'

declare const BASE_API_URL: string

if (!process.server) {
  window.onload = () => {
    const perfData = JSON.stringify({ preformance: window.performance.timing, href: window.location.href })
    setTimeout(() => {
      const endpoint = BASE_API_URL + 'track-performance'
      if (!navigator.sendBeacon) {
        axios.post(endpoint, perfData)
      } else {
        navigator.sendBeacon(endpoint, perfData)
      }
    }, 1000)
  }
}
