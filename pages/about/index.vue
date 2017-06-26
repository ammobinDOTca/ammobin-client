<template>
  <div class="container">
    <img src="~assets/logo-medium.png" class="pure-img img" alt="ammobin.ca logo">
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
      <a href="https://github.com/ammobinDOTca/ammobin-client" target="_blank" rel="noopener">https://github.com/ammobinDOTca/ammobin-client</a>
  
      <br> Issues with miss classified calibres can be filed at:
      <a href="https://github.com/ammobinDOTca/ammobin-classifer" target="_blank" rel="noopener">https://github.com/ammobinDOTca/ammobin-classifer</a>
      
      <br> Backend source can be reviewed at:
      <a href="https://github.com/ammobinDOTca/ammobin-api" target="_blank" rel="noopener">https://github.com/ammobinDOTca/ammobin-api</a>
    </div>
  
    <h2> Disclaimer</h2>
    <div> As of June 15, 2017, ammobin.ca has been entirely funded out of pocket. It does not receive any kick backs from any retailer listed on this site.</div>
    <div> Additionally, ammobin.ca does not use any client side analytics or tracking software or external libraries. All site statics are collected from nginx server logs (ie: what your browser sends when it requests a page) and by using url redirection to track clicks to vendors.</div>
    
  
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
        content: 'All about ammobin.ca'
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
