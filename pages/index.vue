
<template>
  <div class="container">
    <img src="~/assets/logo-medium.png" class="pure-img img" alt="ammobin.ca logo">
    <h1 class="m-b-30">AmmoBin.ca</h1>
    <h4>The place to view the best online ammo prices across Canada.</h4>
    <h4>
      Searching
      <nuxt-link :to="{ path: 'about#supportedRetailers'}">{{retailerCount}} retailers</nuxt-link> daily, with more to come.
    </h4>

    <h2 class="m-t-30"> Currently Popular</h2>
    <div class="pure-g row">
      <div class="pure-u-md-1-3 pure-u-1 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: '.223 / 5.56 NATO' }}">5.56 NATO </nuxt-link>
        <div> Starting at</div>
        <div>${{min556Price.toFixed(2)}} per round</div>
      </div>
      <div class="pure-u-md-1-3 pure-u-1 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: '7.62 X 39MM' }}">7.62 x 39mm </nuxt-link>
        <div> Starting at</div>
        <div>${{min762Price.toFixed(2)}} per round</div>
      </div>
      <div class="pure-u-md-1-3 pure-u-1 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: '9MM' }}">9mm</nuxt-link>
        <div>Starting at</div>
        <div>${{min9Price.toFixed(2)}} per round</div>
      </div>
    </div>

    <div class="margin-y m-t-30">
      <a href="http://www.thefirearmblog.com/blog/2017/08/13/%e2%9c%89tfbtv-mailbag-episode-4-new-hope?utm_src=ammobin.ca" target="_blank" rel="noopener" title="TFBTV Mailbag Episode 4: A New Hope">
        <img src="~/assets/aso-tfbtv2.svg" width="100px" />
      </a>
    </div>

    <div style="margin-top: 2rem">
      Looking for guns? Try
      <a href="http://gunsale.ca/?utm_source=ammobin.ca" target="_blank" rel="noopener" title="gunsale.ca">gunsale.ca</a>
    </div>

  </div>
</template>

<script>
import { getBestPopularPrices } from '~/api';
import SupportedRetailers from '~/components/supported-retailers.vue'
import { list } from '../components/retails'

export default {
  components: {
    SupportedRetailers
  },
  data() {
    return {
      failedToLoadMainPrices: false,
      retailerCount: list.length,
      min762Price: 0,
      min9Price: 0,
      min556Price: 0
    }
  },
  async asyncData({ error, app }) {
    try {
      let res = await app.$axios.get(BASE_API_URL + 'best-popular-prices');
      const mainPrices = res.data;
      return {
        min762Price: mainPrices['7.62 X 39MM'] || 0,
        min9Price: mainPrices['9MM'] || 0,
        min556Price: mainPrices['.223 / 5.56 NATO'] || 0
      };
    } catch (e) {
      console.error('Error: failed to get best popular prices', e); // ignore
      return { failedToLoadMainPrices: true }
    }
  },
  head() {
    return {
      title: 'The place to view the best online ammo prices across Canada.',
      meta: [
        { hid: 'description', name: 'description', content: 'The place to view the best online ammo prices across Canada.' }
      ]
    }
  }
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

