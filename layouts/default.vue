<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <a href="/" class="pure-menu-heading pure-menu-link">AmmoBin.ca</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/rimfire">Rimfire</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/centerfire">Enterfire</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/shotgun">Shotgun</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/about">About</nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  head: {
    title: 'AmmoBin.ca',
    meta: [
      {
        hid: 'description', name: 'description',
        content: ' A place to view online ammo prices across Canada'
      }
    ]
  }
};
</script>