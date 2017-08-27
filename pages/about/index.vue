<template>
  <div class="container">
    <img src="~/assets/logo-medium.png" class="pure-img img" alt="ammobin.ca logo">
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

    <hr>

    <h2>
      Contact Info
    </h2>
    <div>
      Found an issue?
      <div>Want to review the source code?</div>
      <div> Feature sugestions?</div>
      <div>Need a retailer not yet listed here?</div>

      <div style="margin-top:10px;"> Submit an issue or PR at
        <a href="https://github.com/ammobinDOTca" target="_blank" rel="noopener">https://github.com/ammobindotca</a>
      </div>
      <div>
        or send me an email at
        <a v-bind:href="mail">{{email}}</a>
      </div>

    </div>

    <hr>

    <h2> Disclaimer</h2>
    <p> As of June 15, 2017, ammobin.ca has been entirely funded out of pocket. It does not receive any kick backs from any retailer listed on this site. Additionally, ammobin.ca does not use any client side analytics or tracking software or external libraries. All site statistics are collected from nginx server logs (ie: what your browser sends when it requests a page) and by using url redirection to track clicks to vendors.</p>

    <hr>

    <h2 id="supportedRetailers">Supported Retailers</h2>
    <supported-retailers></supported-retailers>

    <hr>

    <div style="margin-top: 2rem">
      Looking for guns? Try
      <a href="http://gunsale.ca/?utm_source=ammobin.ca" target="_blank" rel="noopener">gunsale.ca</a>
    </div>
    <div style="margin-top: 2rem">
      <!-- TODO: only display this link if user ip is from USA + track clicks-->
      <!-- not in any way connected with wikiarms, chosen b/c they have a mobile friendly website + https + display cost per round -->
      Looking for ammo/guns in the land of free and brave? Consider
      <a href="https://www.wikiarms.com/?utm_source=ammobin.ca" target="_blank" rel="noopener">wikiarms.com</a>
    </div>

  </div>
</template>

<script>
import SupportedRetailers from '~/components/supported-retailers.vue'

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
  },
  data() {
    return {
      email: 'contact' + '@' + 'ammobin.ca',
      mail: 'mailto:' + 'contact' + '@' + 'ammobin.ca' // this probably will do nothing to stop bots...
    }
  }
};
</script>
<style>
.img {
  display: block;
  margin: auto;
}
</style>
