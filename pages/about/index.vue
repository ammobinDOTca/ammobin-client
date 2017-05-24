<template>
  <div class="container">
    <img src="~assets/logo-medium.png" class="pure-img img">
    <h1>About</h1>
    <div>
      <a href="/">ammobin.ca</a> retreives public ammo prices daily from Canadian online retailers to aid in showing the best deals available.
    </div>
    <div>
      Prices are updated every morning.
    </div>
    <div>
      No ammo is sold through this site, it only links to retailer's product page.
    </div>
  
    <h2>Contact</h2>
    <div>
      Found an issue?
      <br>Want to review the source code?
      <br> Feature sugestions?
      <br>Need a retailer not yet listed here?
      <br> File an issue agains the web client source code at:
      <a href="https://github.com/nexus-uw/ammo-bin-client">https://github.com/nexus-uw/ammo-bin-client</a>
    </div>
  
    <h2>Supported Retailers</h2>
    <supported-retailers></supported-retailers>
  </div>
</template>

<script>
import SupportedRetailers from '~components/supported-retailers.vue'

export default {
  components: {
    SupportedRetailers
  },
  head: {
    title: 'About AmmoBin.ca',
    meta: [
      {
        hid: 'description', name: 'description',
        content: 'About Meta Ammo'
      }
    ]
  }
};
</script>
<style>
.img {
  display: block;
  margin: auto;
}
</style>
