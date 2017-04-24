
<template>
  <div class="container">
    <h1>Meta Ammo</h1>
    <h3>... a place to view all ammo prices across canada</h3>
    <p>
      <nuxt-link to="/rimfire">rimfire</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/centerfire">centerfire</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/shotgun">shotgun</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}

p {
  font-size: 20px;
}

a {
  color: #41B883;
}
</style>
