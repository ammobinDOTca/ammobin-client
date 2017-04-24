<template>
  <div class="container">
    <h1>Shotgun</h1>
    <my-table v-bind:rows="rows"></my-table>
    <div v-if="error">failed to load ammo list: {{error}}</div>
  </div>
</template>

<script>
import MyTable from '~components/my-table.vue'
import { getShotgun } from '~/api.js';
export default {
  head: {
    title: 'Shotgun',
    meta: [
      { hid: 'description', name: 'description', content: 'shotgun ammo list' }
    ]
  },
  components: {
    MyTable
  },
  async asyncData() {
    try {
      let rows = await getShotgun();
      return { rows };
    } catch (error) {
      return { error }
    }
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
</style>