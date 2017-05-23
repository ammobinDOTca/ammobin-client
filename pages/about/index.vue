<template>
  <div class="container">
    <h1>About</h1>
    <div>
      <a href="/">ammobin.ca</a> retreives public ammo prices daily from Canadian online retailers to aid in showing the best deals available.
      <br> No ammo is sold through this ammobin.ca, it only links to retailer's product page.
    </div>
  
    <h3>Supported Retailers</h3>
    <div>
      <div>
        <a href="http://www.cabelas.ca" target="_blank">Cabela's (all over Canada)</a>
      </div>
      <div>
        <a href="http://www.bullseyelondon.com" target="_blank">Bull's Eye (London, ON)</a>
      </div>
      <div>
        <a href="http://www.firearmsoutletcanada.com" target="_blank">Firearms Outlet Canada (Ajax, ON)</a>
      </div>
      <div>
        <a href="https://www.alflahertys.com" target="_blank">Al Flaherty's (Toronto, ON)</a>
      </div>
      <div>
        <a href="https://www.sail.ca/" target="_blank">Sail (ON + QC)</a>
      </div>
  
      <div>more to come...</div>
    </div>
  
    <h3>Contact</h3>
    <div>
      Found an issue? Want to review the source code? Feature sugestions? Need a retailer not listed here?
      <br> The web client is available at:
      <a href="https://github.com/nexus-uw/ammo-scrape-client">https://github.com/nexus-uw/ammo-scrape-client</a>
    </div>
  </div>
</template>

<script>
export default {
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