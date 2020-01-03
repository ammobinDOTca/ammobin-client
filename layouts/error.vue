<template>
  <div>
    <div class="container">
      <h1 v-if="error && error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <nuxt-link to="/">Home page</nuxt-link>
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
export default class FlatList extends Vue {
  @Prop()
  error: Error
}
</script>
