<template>
  <div>
    <div class="left hide-mobile">
      <sponsorship />
    </div>
    <div class="right hide-mobile">
      <sponsorship />
    </div>
    <div class="container">
      <img :src="require(`~/assets/logo-medium-${REGION}.png`)" class="pure-img img" alt="ammobin logo" />
      <h1 class="m-b-30">{{ DOMAIN }}</h1>
      <h4>{{ $t('home.tagline', { country: getCountry() }) }}</h4>
      <h4>
        {{ $t('home.searching') }}
        <nuxt-link :to="{ path: 'about#supportedRetailers' }">{{ vendorCount }} retailers</nuxt-link>
        {{ $t('home.daily') }}
      </h4>
      <!-- <div class="pure-g row container">
        <sponsorship />
      </div> -->
      <h2 class="m-t-30 cap">{{ $t('home.currentlyPopular') }}</h2>
      <div class="pure-g row">
        <div v-for="v in topCalibres" :key="v.subType" class="pure-u-md-1-3 pure-u-1 margin-y">
          <nuxt-link :to="{ path: `${v.itemType}/${v.subType}` }">{{ v.subType }}</nuxt-link>
        </div>
      </div>
      <h4>
        {{ $t('home.alternativeRegion', { country: altCountry }) }}
        <a :href="altDomain">{{ altDomain }}</a>
      </h4>

      <div class="margin-y m-t-30">
        <a
          href="https://www.thefirearmblog.com/blog/2017/08/13/%e2%9c%89tfbtv-mailbag-episode-4-new-hope?utm_src=ammobin.ca"
          target="_blank"
          rel="noopener"
          title="TFBTV Mailbag Episode 4: A New Hope"
        >
          <img src="~/assets/aso-tfbtv2.svg" width="100px" alt="as seen on TFBTV" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import '~/types'
import { MetaInfo } from 'vue-meta'
import { getCountry } from '~/helpers'
import Sponsorship from '~/components/sponsorship.vue'

declare const BASE_API_URL: string
declare const DOMAIN: string
declare const REGION: string
@Component({
  head() {
    return {
      title: this.$t('home.tagline', { country: getCountry() }) + ` | ${DOMAIN}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('home.tagline', { country: getCountry() }),
        },
      ],
    } as MetaInfo
  },
  async asyncData({ $axios }) {
    try {
      const f = await $axios.get(BASE_API_URL + 'graphql', {
        params: { query: `{vendors{background}}`, opName: 'vendors' },
      })
      return {
        vendorCount: f.data.data.vendors.length,
      }
    } catch (e) {
      console.error('landing error', e)
    }
  },
  components: { Sponsorship },
})
export default class HomePage extends Vue {
  vendorCount: number
  $t: any
  private getCountry = getCountry
  private REGION = REGION
  private DOMAIN = DOMAIN
  private topCalibres = [
    ...[
      '9MM',
      '7.62X39MM',
      '5.56 NATO',
      '7.62 NATO',
      '6.5MM CREEDMOOR',
      '7MM-08 REMINGTON',
      '.300 WEATHERBY MAGNUM',
    ].map(subType => ({ itemType: 'centerfire', subType })),
    { itemType: 'rimfire', subType: '.22 LR' },
    { itemType: 'shotgun', subType: '12 GA' },
  ]
  private altCountry = getCountry() === 'Canada' ? 'USA' : 'Canada'
  private altDomain = `https://ammobin.${getCountry() === 'Canada' ? 'us' : 'ca'}`
}
</script>

<style>
.img {
  display: block;
  margin: auto;
}

.margin-y {
  margin-bottom: 15px;
  margin-top: 15px;
}

.m-b-30 {
  margin-bottom: 30px;
}

.m-t-30 {
  margin-top: 30px;
}

.cap {
  text-transform: capitalize;
}
.left {
  float: left;
}

.right {
  float: right;
}

.show-mobile {
  display: none;
}

@media screen and (max-width: 48em) {
  .hide-mobile {
    display: none;
  }
  .show-mobile {
    display: inherit;
  }
}
</style>
