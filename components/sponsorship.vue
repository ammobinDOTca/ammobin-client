<template>
  <a v-if="!linkToSponsorPage" :href="href" class="center" rel="sponsored" target="_blank" v-on:click="trackClick">
    <img class="pure-u-1" :src="img" />
  </a>

  <nuxt-link v-else class="center" :to="href">
    <img class="pure-u-1" :src="img" />
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getConfig } from '~/ads'
import axios from 'axios'

declare const DOMAIN: string
declare const BASE_API_URL: string

@Component({})
export default class ItemsTable extends Vue {
  config = getConfig(this.$route.name, this.$route.params)

  get href() {
    return this.config.href
  }

  get img() {
    return this.config.img
  }
  get linkToSponsorPage() {
    return this.config.href.startsWith(DOMAIN)
  }

  trackClick() {
    if (window.navigator.doNotTrack) {
      return
    }
    const endpoint = BASE_API_URL + 'track-sponsor-click'

    const data = {
      href: window.location.href,
      target: this.href,
      ua: navigator.userAgent,
    }
    if (!navigator.sendBeacon) {
      axios.post(endpoint, data)
    } else {
      navigator.sendBeacon(endpoint, JSON.stringify(data))
    }
  }
}
</script>

<style></style>
