<template>
  <div class="container">
    <h1>Centerfire</h1>
    <my-table v-if="!error" v-bind:rows="rows" :calibre.sync="calibre" :page.sync="page"></my-table>
    <div v-if="error">failed to load ammo list.</div>
  </div>
</template>

<script>
import MyTable from '~/components/my-table.vue'

function updateUrl(page, calibre) {
  history.pushState({}, 'Best-centerfire-prices', window.location.pathname + `?calibre=${encodeURIComponent(calibre)}&page=${page}`);
}

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
      calibre: '',
      page: 1
    }
  },
  watch: {
    page: function() {
      updateUrl(this.page, this.calibre)
    },
    calibre: function() {
      updateUrl(this.page, this.calibre)
    }
  },
  async asyncData({ error, query, app }) {
    try {
      let res = await app.$axios.get(BASE_API_URL + 'centerfire');
      const rows = res.data;
      const page = parseInt(query.page || '1');
      return { rows, calibre: query.calibre || '', page };
    } catch (e) {
      console.error(e);
      return { statusCode: 500, message: 'Failed to load prices', error: true };
    }
  },

}
</script>

