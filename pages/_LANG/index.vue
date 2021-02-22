<template>
  <div>
    <div class="left hide-mobile">
      <nuxt-link :to="`/${this.$i18n.locale}/ads`">
        <img src="~/assets/TEST_SIDE.png" />
      </nuxt-link>
    </div>
    <div class="right hide-mobile">
      <nuxt-link :to="`/${this.$i18n.locale}/ads`">
        <img src="~/assets/TEST_SIDE.png" />
      </nuxt-link>
    </div>
    <div class="container">
      <img src="~/assets/logo-medium.png" class="pure-img img" alt="ammobin logo" />
      <h1 class="m-b-30">{{ DOMAIN }}</h1>
      <h4>{{ $t('home.tagline') }}</h4>
      <h4>
        {{ $t('home.searching') }}
        <nuxt-link :to="{ path: 'about#supportedRetailers' }">{{ vendorCount }} retailers</nuxt-link>
        {{ $t('home.daily') }}
      </h4>
      <!-- <div class="pure-g row container">
        <nuxt-link :to="`/${this.$i18n.locale}/ads`" class="center show-mobile">
          <img class="pure-u-1 center" src="~/assets/TEST_top.png" />
        </nuxt-link>
      </div> -->
      <h2 class="m-t-30 cap">{{ $t('home.currentlyPopular') }}</h2>
      <div class="pure-g row">
        <div v-for="v in topCalibres" :key="v.subType" class="pure-u-md-1-3 pure-u-1 margin-y">
          <nuxt-link :to="{ path: `${v.itemType}/${v.subType}` }">{{ v.subType }}</nuxt-link>
        </div>
      </div>

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
declare const BASE_API_URL: string
declare const DOMAIN: string
@Component({
  head() {
    return {
      title: this.$t('home.tagline') + ` | ${DOMAIN}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('home.tagline'),
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
})
export default class HomePage extends Vue {
  vendorCount: number
  $t: any
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
