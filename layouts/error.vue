<template>
  <div>
    <div class="container">
      <h1 v-if="error.statusCode === 404">HTTP 404: Page not found</h1>
      <h1 v-else-if="error.statusCode > 0">HTTP {{ error.statusCode }}</h1>
      <h1 v-else>Unknown Error</h1>
      <h4><nuxt-link to="/">Go to Home page (and try again?)</nuxt-link></h4>
      <br />
      <div>
        feel free to complain to
        <a :href="mailto">contact@ammobin.ca</a>
        about this error.
        <br />please include the time + which browser + which page + error displayed below in your email
      </div>
      <code>
        <pre>{{ error.message }}</pre>
      </code>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import axios from 'axios'

declare const BASE_API_URL: string

@Component({
  mounted: function() {
    try {
      const message = JSON.stringify({
        msg: this.error ? this.error.message : 'error page view',
        url: window.location.href,
        error: JSON.stringify(this.error),
      })
      const endpoint = BASE_API_URL + 'errors'

      if (!navigator.sendBeacon) {
        axios.post(endpoint, message)
      } else {
        navigator.sendBeacon(endpoint, message)
      }
    } catch (e) {
      console.error('failed to report error', e)
    }
  },
})
export default class ErrorPage extends Vue {
  @Prop()
  error: { statusCode: number; message: string }

  get mailto() {
    const subject = encodeURI('Encountered Error Page')
    const body = encodeURI(
      `saw the error page

      today=${new Date().toDateString()} for

      browser=${process.server ? 'SERVER' : navigator.userAgent}

      error=${this.error.statusCode}
      ${this.error.message}`
    )
    return `mailto:contact@ammobin.ca?subject=${subject}&body=${body}`
  }
}
</script>
