
<template>
  <div class="container">
    <img src="~assets/logo-medium.png" class="pure-img img" alt="ammobin.ca logo">
    <h1>AmmoBin.ca</h1>
    <h3>The place to view the best online ammo prices across Canada.</h3>
  
    <div class="pure-g row">
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link :to="{ path: 'rimfire', query: { calibre: '.22 LR' }}">.22LR</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: '9MM' }}">9mm</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: '5.56 NATO' }}">5.56 NATO</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: '7.62 X 39MM' }}">7.62 x 39mm</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link :to="{ path: 'centerfire', query: { calibre: '7.62 NATO' }}">7.62 NATO</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link :to="{ path: 'shotgun', query: { calibre: '12 GA' }}">12 GA</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link to="/rimfire">All Rimfire</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1-2 margin-y">
        <nuxt-link to="/centerfire">All Centerfire</nuxt-link>
      </div>
      <div class="pure-u-lg-1-3 pure-u-1 margin-y">
        <nuxt-link to="/shotgun">All Shotgun</nuxt-link>
      </div>
  
    </div>
  
    <div>
      <h2>Supported Retailers</h2>
      <supported-retailers></supported-retailers>
    </div>
  
    <div style="margin-top: 2rem">
      Looking for guns? Try
      <a href="http://gunsale.ca/?utm_source=ammobin.ca" target="_blank" rel="noopener">gunsale.ca</a>
    </div>
  </div>
</template>

<script>
import { getMainPrices } from '~/api';
import SupportedRetailers from '~components/supported-retailers.vue'

export default {
  components: {
    SupportedRetailers
  },
  data() {
    return {
      failedToLoadMainPrices: false
    }
  },
  async asyncData({ error }) {
    // try {
    //   let mainPrices = await getMainPrices();
    //   return { mainPrices };
    // } catch (e) {
    //   console.error(e); // ignore
    //   return { failedToLoadMainPrices: true }
    // }
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
</style>

