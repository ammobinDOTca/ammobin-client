<template>
  <a v-if="!linkToSponsorPage" :href="href" class="center" rel="sponsored" target="_blank" v-on:click="trackClick">
    <img
      :class="{
        'pure-u-1': true,
        sponsor: !homePage,
        homePageSponsor: homePage,
      }"
      :src="img"
      crossorigin="anonymous"
      alt="sponsored ad"
      decoding="async"
      loading="lazy"
      :height="homePage ? 600 : 60"
    />
  </a>

  <nuxt-link v-else class="center" :to="href">
    <img class="pure-u-1" :src="img" alt="sponsored ad" decoding="async" loading="lazy" height="60" />
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
  @Prop() homePage: boolean

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

<style>
.sponsor {
  max-height: 60px;
  max-width: 468px;
}

.homePageSponsor {
  max-height: 600px;
  max-width: 120px;
}
</style>
