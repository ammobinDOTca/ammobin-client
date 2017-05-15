<template>
  <div class="container">
    <h1>Rimfire</h1>
    <my-table v-bind:rows="rows"></my-table>
    <div v-if="error">failed to load ammo list: {{error}}</div>
  </div>
</template>

<script>
import MyTable from '~components/my-table.vue'
import { getRimfire } from '~/api.js';
export default {
  data() {
    return {
      error: null
    }
  },
  head: {
    title: 'Rimfire',
    meta: [
      { hid: 'description', name: 'description', content: 'rimfire ammo list' }
    ]
  },
  components: {
    MyTable
  },
  async asyncData({ error }) {
    try {
      let rows = await getRimfire();
      return { rows };
    } catch (e) {
      console.error(e)
      error({ statusCode: 500, message: 'Failed to load prices' });
    }
  }
}
</script>
>