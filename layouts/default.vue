<template>
  <div class="main">
    <a class="fork-me-hard-dady" href="https://github.com/ammobindotca" target="_blank" rel="noopener">
      <img style="position: absolute; top: 0; right: 0; border: 0;" src="~/assets/fork.png" alt="Fork me on GitHub" title="Fork me on GitHub">
    </a>
    <div class="pure-menu pure-menu-horizontal pure-menu-scrollable light-grey">
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
    <footer class="footer">
      AmmoBin.ca {{new Date().getFullYear()}}
      <a v-bind:href="mail">Contact</a>
    </footer>
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
      },

    ]
  },
  computed: {
    currentPage() {
      return this.$router.path
    }
  },
  data() {
    return {
      mail: 'mailto:' + 'contact' + '@' + 'ammobin.ca' // this probably will do nothing to stop bots...
    }
  }
};
</script>

<style>
.footer {
  text-align: center;
  margin-top: 100px;
}

.light-grey {
  background-color: #f1f1f1;
}



/* hide fork me link on mobile*/

@media screen and (max-width: 35.5em) {
  .fork-me-hard-dady {
    display: none;
  }
}
</style>
