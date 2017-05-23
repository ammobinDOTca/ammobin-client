
<template>
  <div class="container">
    <h1>AmmoBin.ca</h1>
    <h3> A place to view the best online ammo prices across Canada.</h3>
    <p>
      <nuxt-link to="/rimfire">Rimfire</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/centerfire">Centerfire</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/shotgun">Shotgun</nuxt-link>
    </p>
    <div>
      <h2>Supported Retailers</h2>
      <supported-retailers></supported-retailers>
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
  }
}
</script>
