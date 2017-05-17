
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
    <!--<div v-if="!failedToLoadMainPrices">
        <h2>Today's Price Info</h2>
        {{mainPrices}}
      </div>-->
    <div>
      <h2>Supported Retailers</h2>
  
      <!--<div>
                <a href="http://www.cabelas.ca">Cabela's (all over Canada)</a>
              </div>-->
      <div>
        <a href="http://www.bullseyelondon.com" target="_blank">Bull's Eye (London, ON)</a>
      </div>
      <div>
        <a href="http://www.firearmsoutletcanada.com" target="_blank">Firearms Outlet Canada (Ajax, ON)</a>
      </div>
      <div>
        <a href="https://www.alflahertys.com" target="_blank">Al Flaherty's (Toronto, ON)</a>
      </div>
  
      <div>more to come...</div>
    </div>
  </div>
</template>

<script>
import { getMainPrices } from '~/api';
export default {
  data() {
    return {
      failedToLoadMainPrices: false
    }
  },
  async asyncData({ error }) {
    try {
      let mainPrices = await getMainPrices();
      return { mainPrices };
    } catch (e) {
      console.error(e); // ignore
      return { failedToLoadMainPrices: true }
    }
  }
}
</script>
