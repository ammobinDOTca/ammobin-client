<template>
  <div class="container">
    <h1>Centerfire</h1>
    <my-table v-if="!error" v-bind:rows="rows" v-bind:calibre="calibre"></my-table>
    <div v-if="error">failed to load ammo list.</div>
  </div>
</template>

<script>
import MyTable from '~/components/my-table.vue'

export default {
  head: {
    title: 'Centerfire Price List',
    meta: [
      { hid: 'description', name: 'description', content: 'The list of the best centerfire ammo prices across Canada.' }
    ]
  },
  components: {
    MyTable
  },
  data() {
    return {
      error: null,
      rows: [],
      calibre: ''
    }
  },
  async asyncData({ error, query, app }) {
    try {
      let res = await app.$axios.get(BASE_API_URL + 'centerfire');
      return { rows: res.data, calibre: query.calibre || '' };
    } catch (e) {
      console.error(e);
      return { statusCode: 500, message: 'Failed to load prices', error: true };
    }
  },

}
</script>

