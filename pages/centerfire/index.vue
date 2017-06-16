<template>
  <div class="container">
    <h1>Centerfire</h1>
    <my-table v-bind:rows="rows" v-bind:calibre="calibre"></my-table>
    <div v-if="error">failed to load ammo list: {{error}}</div>
  </div>
</template>

<script>
import MyTable from '~components/my-table.vue'
import { getCenterfire } from '~/api.js';
export default {
  head: {
    title: 'Centerfire',
    meta: [
      { hid: 'description', name: 'description', content: 'centerfire ammo list' }
    ]
  },
  components: {
    MyTable
  },
  data() {
    return {
      error: null
    }
  },
  async asyncData({ error, query }) {
    try {
      let rows = await getCenterfire();
      return { rows, calibre: query.calibre || '' };
    } catch (e) {
      console.error(e)
      error({ statusCode: 500, message: 'Failed to load prices' });
    }
  },

}
</script>

