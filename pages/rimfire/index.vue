<template>
  <div class="container">
    <h1>Rimfire</h1>
    <my-table v-if="!error" v-bind:rows="rows" v-bind:calibre="calibre"></my-table>
    <div v-if="error">failed to load ammo list</div>
  </div>
</template>

<script>
import MyTable from '~/components/my-table.vue'

export default {
  data() {
    return {
      error: null,
      rows: [],
      calibre: ''
    }
  },

  head: {
    title: 'Rimfire Price List',
    meta: [
      {
        hid: 'description', name: 'description',
        content: 'The list of the best rimfire ammo prices across Canada.'
      }
    ]
  },
  components: {
    MyTable
  },
  async asyncData({ error, query, app }) {
    try {
      let res = await app.$axios.get(BASE_API_URL + 'rimfire');
      console.log('asdasd')
      return { rows: res.data, calibre: query.calibre || '' };
    } catch (e) {
      return { statusCode: 500, message: 'Failed to load prices', error: true };
    }
  },

}
</script>
>
