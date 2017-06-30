<template>
  <div class="container">
    <h1>Rimfire</h1>
    <my-table v-bind:rows="rows" v-bind:calibre="calibre"></my-table>
    <div v-if="error">failed to load ammo list</div>
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
    title: 'Rimfire Price List',
    meta: [
      { hid: 'description', name: 'description', content: 'The list of the best rimfire ammo prices across Canada.' }
    ]
  },
  components: {
    MyTable
  },
  async asyncData({ error, query }) {
    try {
      let rows = await getRimfire();
      return { rows, calibre: query.calibre || '' };
    } catch (e) {
      console.error(e);
      return { statusCode: 500, message: 'Failed to load prices', error: e };
    }
  },

}
</script>
>
