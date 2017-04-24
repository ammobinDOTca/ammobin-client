<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <a href="/" class="pure-menu-heading pure-menu-link">
                                    Meta Ammo
                                  </a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/rimfire">rimfire</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/centerfire">centerfire</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/shotgun">shotgun</nuxt-link>
        </li>
        <li class="pure-menu-item">
          <nuxt-link class="pure-menu-link" to="/about">about</nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Meta Ammo',
    meta: [
      {
        hid: 'description', name: 'description',
        content: 'Meta Ammo home page'
      }
    ]
  }
};
</script>