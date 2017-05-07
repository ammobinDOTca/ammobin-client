<template>
  <div class="main">
    <div class="pure-menu pure-menu-horizontal">
      <a href="/" class="pure-menu-heading pure-menu-link">AmmoBin.ca</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" :class="{'pure-menu-selected': currentPage === '/rimfire'}" to="/rimfire">Rimfire</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" :class="{'pure-menu-selected': currentPage === '/centerfire'}" to="/centerfire">Centerfire</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" :class="{'pure-menu-selected': currentPage === '/shotgun'}" to="/shotgun">Shotgun</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" :class="{'pure-menu-selected': currentPage === '/about'}" to="/about">About</nuxt-link>
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
  },
  computed: {
    currentPage() {
      return this.$router.path
    }
  }
};
</script>