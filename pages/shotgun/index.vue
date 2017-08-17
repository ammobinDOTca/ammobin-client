<template>
  <div class="container">
    <h1>Shotgun</h1>
    <my-table v-bind:rows="rows" v-bind:calibre="calibre"></my-table>
    <div v-if="error">failed to load ammo list</div>
  </div>
</template>

<script>
import MyTable from '~/components/my-table.vue'
import { getShotgun } from '~/api.js';
export default {
  head: {
    title: 'Shotgun Prices',
    meta: [
      { hid: 'description', name: 'description', content: 'The place to view the best shotgun shell prices across Canada.' }
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
      let rows = await getShotgun();
      return { rows, calibre: query.calibre || '' };
    } catch (e) {
      console.error(e);
      return { statusCode: 500, message: 'Failed to load prices', error: e };
    }
  },
}
</script>
