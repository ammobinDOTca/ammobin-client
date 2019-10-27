<template>
  <div>
    <div class="container">
      <h1 v-if="error && error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <nuxt-link to="/">Home page</nuxt-link>
    </div>
    <footer class="footer">
      AmmoBin.ca {{ new Date().getFullYear() }}
      <a :href="mail">Contact</a>
      <div>
        <a href="https://github.com/ammobindotca" target="_blank" rel="noopener">github</a> |
        <a href="https://www.instagram.com/ammobin.ca" target="_blank" rel="noopener">instagram</a> |
        <a href="https://status.ammobin.ca/" target="_blank" rel="noopener">status</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>