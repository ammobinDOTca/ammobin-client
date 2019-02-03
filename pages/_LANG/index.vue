
<template>
  <div class="container">
    <img src="~/assets/logo-medium.png" class="pure-img img" alt="ammobin.ca logo">
    <h1 class="m-b-30">AmmoBin.ca</h1>
    <h4>{{ $t('home.tagline') }}</h4>
    <h4>
      {{ $t('home.searching') }}
      <nuxt-link :to="{ path: 'about#supportedRetailers'}">{{vendorCount}} retailers</nuxt-link>
      {{ $t('home.daily') }}
    </h4>

    <h2 class="m-t-30">{{ $t('home.currentlyPopular') }}</h2>
    <div class="pure-g row">
      <div v-for="v in bestPrices" class="pure-u-md-1-3 pure-u-1 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: v.calibre }}">{{v.calibre}}</nuxt-link>
        <div>{{$t('home.startingAt')}}</div>
        <div>${{v.unitCost.toFixed(2)}} {{$t('home.perRound')}}</div>
      </div>
    </div>

    <div class="margin-y m-t-30">
      <a
        href="https://www.thefirearmblog.com/blog/2017/08/13/%e2%9c%89tfbtv-mailbag-episode-4-new-hope?utm_src=ammobin.ca"
        target="_blank"
        rel="noopener"
        title="TFBTV Mailbag Episode 4: A New Hope"
      >
        <img src="~/assets/aso-tfbtv2.svg" width="100px">
      </a>
    </div>
    <div style="margin-top: 2rem">
      {{$t('home.gunsaleLink')}}
      <a
        href="http://gunsale.ca/?utm_source=ammobin.ca"
        target="_blank"
        rel="noopener"
        title="gunsale.ca"
      >gunsale.ca</a>
    </div>
  </div>
</template>

<script lang="ts">
import { getBestPopularPrices } from '~/api'
import gql from 'graphql-tag'

declare const BASE_API_URL: string

export default {
  apollo: {
    bestPrices: {
      query: gql`
        query getBestPrices {
           bestPrices(calibres:["9MM",".223 / 5.56 NATO", "7.62 X 39MM" ]){
             calibre
             unitCost
           }
        }
      `,
      prefetch: () => ({}), // trigger serverside lookup
    },
    vendors: {
      query: gql`
        query getVendors {
          vendors {
            background # just need to get a list, picked this because just a boolean
          }
        }
      `,
      prefetch: () => ({}), // trigger serverside lookup
    },
  },
  computed: {
    vendorCount() {
      return this.vendors ? this.vendors.length : null
    },
  },
  async asyncData({  }) {
  },
  head() {
    return {
      title: 'The place to view the best online ammo prices across Canada.', //TODO: en francais
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('home.tagline'),
        },
      ],
    }
  },
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
</style>
